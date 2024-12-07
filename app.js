const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");

app.use(morgan('dev'));
app.use(express.json());

const router = require('./routes/index');

app.use('/', router);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
