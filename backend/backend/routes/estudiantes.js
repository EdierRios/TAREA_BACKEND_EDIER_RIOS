// C:\proyectos\school-management\backend\backend\routes\estudiantes.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// Obtener todos los estudiantes
router.get('/', async (req, res) => {
  try {
    const estudiantes = await db.Estudiante.findAll({
      include: [{ model: db.Grupo, as: 'HistorialGrupos' }]
    });
    res.json(estudiantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un estudiante
router.post('/', async (req, res) => {
  try {
    const estudiante = await db.Estudiante.create(req.body);
    res.status(201).json(estudiante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
