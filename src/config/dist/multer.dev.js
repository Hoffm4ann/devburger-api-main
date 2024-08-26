"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _uuid = require("uuid");

var _nodePath = require("node:path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  storage: _multer["default"].diskStorage({
    destination: (0, _nodePath.resolve)(__dirname, "..", "..", "uploads"),
    filename: function filename(request, file, callback) {
      return callback(null, (0, _uuid.v4)() + (0, _nodePath.extname)(file.originalname));
    }
  })
};
exports["default"] = _default;