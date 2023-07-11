const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306, 
  user: 'root',
  password: '@nonimouS',
  database: 'registro'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.stack);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Endpoint para insertar un registro de cliente
app.post('/nueva-hora', (req, res) => {
  const { nombre, latitud, longitud, ipaddress } = req.body;

  const query = 'INSERT INTO horas (nombre, latitud, longitud, ipaddress) VALUES (?, ?, ?, ?, ?)';
  const values = [nombre, latitud, longitud, ipaddress];

  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error al insertar el registro: ' + error);
      res.status(500).send('Error al insertar el registro');
      return;
    }

    res.status(200).send('Registro insertado correctamente');
  });
});

// Endpoint para consultar todos los registros almacenados en la tabla horas
app.get('/horas', (req, res) => {
  const query = 'SELECT * FROM horas';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al consultar los registros: ' + error);
      res.status(500).send('Error al consultar los registros');
      return;
    }

    res.status(200).json(results);
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
