"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes2 = _interopRequireDefault(require("./routes"));

require("./database");

var _nodePath = require("node:path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    this.app = (0, _express["default"])();
    this.middlewares();
    this.routes();
  }

  _createClass(App, [{
    key: "middlewares",
    value: function middlewares() {
      this.app.use(_express["default"].json());
      this.app.use("/product-file", _express["default"]["static"]((0, _nodePath.resolve)(__dirname, "..", "uploads")));
      this.app.use("/category-file", _express["default"]["static"]((0, _nodePath.resolve)(__dirname, "..", "uploads")));
    }
  }, {
    key: "routes",
    value: function routes() {
      this.app.use(_routes2["default"]);
    }
  }]);

  return App;
}();

var _default = new App().app;
exports["default"] = _default;