"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../../config/auth"));

var _sequelize = require("sequelize");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function authMiddleware(request, response, next) {
  var authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      error: "Token not Provided"
    });
  }

  var token = authToken.split(' ')[1];

  try {
    _jsonwebtoken["default"].verify(token, _auth["default"].secret, function (err, decoded) {
      if (err) {
        throw new _sequelize.Error();
      }

      request.userId = decoded.id;
      request.userName = decoded.name;
    });
  } catch (err) {
    return response.status(401).json({
      error: "Token is invalid"
    });
  }

  return next();
}

var _default = authMiddleware;
exports["default"] = _default;