// C:\proyectos\school-management\backend\backend\routes\grupos.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// Obtener todos los grupos
router.get('/', async (req, res) => {
  try {
    const grupos = await db.Grupo.findAll({
      include: [
        { model: db.Profesor, as: 'ProfesorGuia' },
        { model: db.Estudiante, as: 'EstudiantesAsignados' }
      ]
    });
    res.json(grupos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un grupo
router.post('/', async (req, res) => {
  try {
    const grupo = await db.Grupo.create(req.body);
    res.status(201).json(grupo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;