
const express = require('express');
const cors = require('cors');
const db = require('./backend/models');
const estudianteRoutes = require('./backend/routes/estudiantes');
const grupoRoutes = require('./backend/routes/grupos');

const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/grupos', grupoRoutes);


app.get('/', (req, res) => {
  res.send('¡Servidor de gestión escolar funcionando!');
});


db.sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos sincronizada');
  app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error al conectar con la base de datos:', err);
});