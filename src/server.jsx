import express from 'express';
import engine from 'react-engine';
import path from 'path';

// iniciamos nuestra aplicación de express
const app = express();
const server = require('http').createServer(app);

// carga de ficheros estaticos
app.set('port', process.env.PORT || 3000);

// acá indicamos la ubicación de nuestro archivo con las rutas
app.engine('.jsx', engine.server.create({
  reactRoutes: path.join(__dirname, 'routes.jsx'),
}));
app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'jsx');
app.set('view', engine.expressView);

// definimos nuestra ruta en el servidor, al pasar req.url como primer
// parámetro de res.render react-engine usa react-route para
// renderizar la ruta que corresponda, como segundo parámetro podríamos
// pasar un objeto con los datos (props) que queramos pasar a nuestra vista.
app.get('/', (req, res) => {
  res.render(req.url, {
    title: 'Titulo',
  });
})

// Decimos en que puerto queremos escuchar (el 8000)
server.listen(app.get('port'), () => {
  console.log("Escuchando en el puerto " + app.get('port'));
});