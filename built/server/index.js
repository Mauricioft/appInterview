/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _reactEngine = __webpack_require__(4);

	var _reactEngine2 = _interopRequireDefault(_reactEngine);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// iniciamos nuestra aplicación de express
	const app = (0, _express2.default)();
	const server = __webpack_require__(2).createServer(app);

	// carga de ficheros estaticos
	app.set('port', ({"NODE_ENV":"development"}).PORT || 3000);

	// acá indicamos la ubicación de nuestro archivo con las rutas
	app.engine('.jsx', _reactEngine2.default.server.create({
	  reactRoutes: _path2.default.join(__dirname, 'routes.jsx')
	}));
	app.set('views', _path2.default.join(__dirname, 'pages'));
	app.set('view engine', 'jsx');
	app.set('view', _reactEngine2.default.expressView);

	// definimos nuestra ruta en el servidor, al pasar req.url como primer
	// parámetro de res.render react-engine usa react-route para
	// renderizar la ruta que corresponda, como segundo parámetro podríamos
	// pasar un objeto con los datos (props) que queramos pasar a nuestra vista.
	app.get('/', (req, res) => {
	  res.render(req.url, {
	    title: 'Titulo'
	  });
	});

	// Decimos en que puerto queremos escuchar (el 8000)
	server.listen(app.get('port'), () => {
	  console.log("Escuchando en el puerto " + app.get('port'));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react-engine");

/***/ }
/******/ ]);