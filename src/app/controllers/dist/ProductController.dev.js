"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Yup = _interopRequireWildcard(require("yup"));

var _Product = _interopRequireDefault(require("../models/Product"));

var _Category = _interopRequireDefault(require("../models/Category"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var productController =
/*#__PURE__*/
function () {
  function productController() {
    _classCallCheck(this, productController);
  }

  _createClass(productController, [{
    key: "store",
    value: function store(request, response) {
      var schema, _ref, isAdmin, path, _request$body, name, price, category_id, offer, product;

      return regeneratorRuntime.async(function store$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              schema = Yup.object({
                name: Yup.string().required(),
                price: Yup.number().required(),
                category_id: Yup.number().required(),
                offer: Yup["boolean"]()
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
              _context.next = 10;
              return regeneratorRuntime.awrap(_User["default"].findByPk(request.userId));

            case 10:
              _ref = _context.sent;
              isAdmin = _ref.admin;

              if (isAdmin) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return", response.status(401).json());

            case 14:
              path = request.file.filename;
              _request$body = request.body, name = _request$body.name, price = _request$body.price, category_id = _request$body.category_id, offer = _request$body.offer;
              _context.next = 18;
              return regeneratorRuntime.awrap(_Product["default"].create({
                name: name,
                price: price,
                category_id: category_id,
                path: path,
                offer: offer
              }));

            case 18:
              product = _context.sent;
              return _context.abrupt("return", response.status(201).json({
                product: product
              }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 5]]);
    }
  }, {
    key: "update",
    value: function update(request, response) {
      var schema, _ref2, isAdmin, id, findProduct, path, _request$body2, name, price, category_id, offer;

      return regeneratorRuntime.async(function update$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              schema = Yup.object({
                name: Yup.string(),
                price: Yup.number(),
                category_id: Yup.number(),
                offer: Yup["boolean"]()
              });
              _context2.prev = 1;
              schema.validateSync(request.body, {
                abortEarly: false
              });
              _context2.next = 8;
              break;

            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", response.status(400).json({
                error: _context2.t0.errors
              }));

            case 8:
              _context2.next = 10;
              return regeneratorRuntime.awrap(_User["default"].findByPk(request.userId));

            case 10:
              _ref2 = _context2.sent;
              isAdmin = _ref2.admin;

              if (isAdmin) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", response.status(401).json());

            case 14:
              id = request.params.id;
              _context2.next = 17;
              return regeneratorRuntime.awrap(_Product["default"].findByPk(id));

            case 17:
              findProduct = _context2.sent;

              if (findProduct) {
                _context2.next = 20;
                break;
              }

              return _context2.abrupt("return", response.status(400).json({
                error: "Make sure your product ID is correct"
              }));

            case 20:
              if (request.file) {
                path = request.file.filename;
              }

              _request$body2 = request.body, name = _request$body2.name, price = _request$body2.price, category_id = _request$body2.category_id, offer = _request$body2.offer;
              _context2.next = 24;
              return regeneratorRuntime.awrap(_Product["default"].update({
                name: name,
                price: price,
                category_id: category_id,
                path: path,
                offer: offer
              }, {
                where: {
                  id: id
                }
              }));

            case 24:
              return _context2.abrupt("return", response.status(200).json());

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 5]]);
    }
  }, {
    key: "index",
    value: function index(request, response) {
      var products;
      return regeneratorRuntime.async(function index$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(_Product["default"].findAll({
                include: [{
                  model: _Category["default"],
                  as: "category",
                  attributes: ["id", "name"]
                }]
              }));

            case 2:
              products = _context3.sent;
              return _context3.abrupt("return", response.json(products));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  }]);

  return productController;
}();

var _default = new productController();

exports["default"] = _default;