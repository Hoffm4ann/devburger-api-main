"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Yup = _interopRequireWildcard(require("yup"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _Order = _interopRequireDefault(require("../schemas/Order"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrderController =
/*#__PURE__*/
function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, [{
    key: "store",
    value: function store(request, response) {
      var schema, products, productsIds, findProducts, formattedProducts, order, createdOrder;
      return regeneratorRuntime.async(function store$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              schema = Yup.object({
                products: Yup.array().required().of(Yup.object({
                  id: Yup.number().required(),
                  quantity: Yup.number().required()
                }))
              });
              _context.prev = 1;
              schema.validateSync(request.body, {
                abortEarly: false
              });
              _context.next = 8;
              break;

            case 5:
              _context.prev = 5;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", response.status(400).json({
                error: _context.t0.errors
              }));

            case 8:
              products = request.body.products;
              productsIds = products.map(function (product) {
                return product.id;
              });
              _context.next = 12;
              return regeneratorRuntime.awrap(_Product["default"].findAll({
                where: {
                  id: productsIds
                },
                include: [{
                  model: _Category["default"],
                  as: "category",
                  attributes: ["name"]
                }]
              }));

            case 12:
              findProducts = _context.sent;
              formattedProducts = findProducts.map(function (product) {
                var productIndex = products.findIndex(function (item) {
                  return item.id === product.id;
                });
                var newProduct = {
                  id: product.id,
                  name: product.name,
                  category: product.category.name,
                  price: product.price,
                  url: product.url,
                  quantity: products[productIndex].quantity
                };
                return newProduct;
              });
              order = {
                user: {
                  id: request.userId,
                  name: request.userName
                },
                products: formattedProducts,
                status: "Pedido Realizado"
              };
              _context.next = 17;
              return regeneratorRuntime.awrap(_Order["default"].create(order));

            case 17:
              createdOrder = _context.sent;
              return _context.abrupt("return", response.status(201).json(createdOrder));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 5]]);
    }
  }, {
    key: "index",
    value: function index(request, response) {
      var orders;
      return regeneratorRuntime.async(function index$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(_Order["default"].find());

            case 2:
              orders = _context2.sent;
              return _context2.abrupt("return", response.json(orders));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "update",
    value: function update(request, response) {
      var schema, _ref, isAdmin, id, status;

      return regeneratorRuntime.async(function update$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              schema = Yup.object({
                status: Yup.string().required()
              });
              _context3.prev = 1;
              schema.validateSync(request.body, {
                abortEarly: false
              });
              _context3.next = 8;
              break;

            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", response.status(400).json({
                error: _context3.t0.errors
              }));

            case 8:
              _context3.next = 10;
              return regeneratorRuntime.awrap(_User["default"].findByPk(request.userId));

            case 10:
              _ref = _context3.sent;
              isAdmin = _ref.admin;

              if (isAdmin) {
                _context3.next = 14;
                break;
              }

              return _context3.abrupt("return", response.status(401).json());

            case 14:
              id = request.params.id;
              status = request.body.status;
              _context3.prev = 16;
              _context3.next = 19;
              return regeneratorRuntime.awrap(_Order["default"].updateOne({
                _id: id
              }, {
                status: status
              }));

            case 19:
              _context3.next = 24;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t1 = _context3["catch"](16);
              return _context3.abrupt("return", response.status(400).json({
                error: _context3.t1.message
              }));

            case 24:
              return _context3.abrupt("return", response.json({
                message: "Status updated sucessfully"
              }));

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[1, 5], [16, 21]]);
    }
  }]);

  return OrderController;
}();

var _default = new OrderController();

exports["default"] = _default;