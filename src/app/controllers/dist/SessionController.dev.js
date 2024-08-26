"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Yup = _interopRequireWildcard(require("yup"));

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _auth = _interopRequireDefault(require("../../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SessionController =
/*#__PURE__*/
function () {
  function SessionController() {
    _classCallCheck(this, SessionController);
  }

  _createClass(SessionController, [{
    key: "store",
    value: function store(request, response) {
      var schema, isValid, emailOrPasswordIncorrect, _request$body, email, password, user, isSamePassword;

      return regeneratorRuntime.async(function store$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              schema = Yup.object({
                email: Yup.string().email().required(),
                password: Yup.string().min(6).required()
              });
              _context.next = 3;
              return regeneratorRuntime.awrap(schema.isValid(request.body));

            case 3:
              isValid = _context.sent;

              emailOrPasswordIncorrect = function emailOrPasswordIncorrect() {
                return response.status(401).json({
                  error: "Make sure your email or password are correct"
                });
              };

              if (isValid) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", emailOrPasswordIncorrect());

            case 7:
              _request$body = request.body, email = _request$body.email, password = _request$body.password;
              _context.next = 10;
              return regeneratorRuntime.awrap(_User["default"].findOne({
                where: {
                  email: email
                }
              }));

            case 10:
              user = _context.sent;

              if (user) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", emailOrPasswordIncorrect());

            case 13:
              _context.next = 15;
              return regeneratorRuntime.awrap(user.checkPassword(password));

            case 15:
              isSamePassword = _context.sent;

              if (isSamePassword) {
                _context.next = 18;
                break;
              }

              return _context.abrupt("return", emailOrPasswordIncorrect());

            case 18:
              return _context.abrupt("return", response.status(201).json({
                id: user.id,
                name: user.name,
                email: email,
                admin: user.admin,
                token: _jsonwebtoken["default"].sign({
                  id: user.id,
                  name: user.name
                }, _auth["default"].secret, {
                  expiresIn: _auth["default"].expiresIn
                })
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }]);

  return SessionController;
}();

var _default = new SessionController();

exports["default"] = _default;