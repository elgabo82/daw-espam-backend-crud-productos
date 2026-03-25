/*
 Despliegue de los endpoint's
*/

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const manejadorErrores = require('./middlewares/error.middleware');

const app = express();

app.set('trust proxy', 1);

//app.use(cors());
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://localhost:4200'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.json({
        ok: true,
        mensaje: 'API del backend funcionando.',
        protocolo: req.protocol
    });
});

app.use('/api/v1', routes);

app.use(manejadorErrores);

module.exports = app;