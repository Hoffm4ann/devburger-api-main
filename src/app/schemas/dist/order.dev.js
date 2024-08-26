"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var OrderSchema = new _mongoose["default"].Schema({
  user: {
    id: {
      type: String,
      require: true
    },
    name: {
      type: String,
      require: true
    }
  },
  products: [{
    id: {
      type: Number,
      require: true
    },
    name: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    category: {
      type: String,
      require: true
    },
    url: {
      type: String,
      require: true
    },
    quantity: {
      type: String,
      require: true
    }
  }],
  status: {
    type: String,
    require: true
  }
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Order", OrderSchema);

exports["default"] = _default;