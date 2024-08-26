"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _multer2 = _interopRequireDefault(require("./config/multer"));

var _auth = _interopRequireDefault(require("./app/middlewares/auth"));

var _UserControllers = _interopRequireDefault(require("./app/controllers/UserControllers"));

var _SessionController = _interopRequireDefault(require("./app/controllers/SessionController"));

var _ProductController = _interopRequireDefault(require("./app/controllers/ProductController"));

var _CategoryController = _interopRequireDefault(require("./app/controllers/CategoryController"));

var _OrderController = _interopRequireDefault(require("./app/controllers/OrderController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = new _express.Router();
var upload = (0, _multer["default"])(_multer2["default"]);
routes.post("/users", _UserControllers["default"].store);
routes.post("/session", _SessionController["default"].store);
routes.use(_auth["default"]);
routes.post("/products", upload.single("file"), _ProductController["default"].store);
routes.get("/products", _ProductController["default"].index);
routes.put("/products/:id", upload.single("file"), _ProductController["default"].update);
routes.post("/categories", upload.single("file"), _CategoryController["default"].store);
routes.get("/categories", _CategoryController["default"].index);
routes.put("/categories/:id", upload.single("file"), _CategoryController["default"].update);
routes.post("/orders", _OrderController["default"].store);
routes.get("/orders", _OrderController["default"].index);
routes.put("/orders/:id", _OrderController["default"].update);
var _default = routes;
exports["default"] = _default;