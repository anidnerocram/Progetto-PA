"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.checkOwnerVehicle = exports.checkRemainingTokenPosition = exports.checkRemainingToken = exports.checkPosition = exports.checkAssociationExist = exports.checkGeofenceArrayExist = exports.checkVehicleArrayExist = exports.checkGeofenceExist = exports.checkVehicleExist = exports.checkUserExistRefill = exports.checkUserExist = exports.checkOnwner_cf = exports.checkAdmin = exports.errorHandler = exports.logErrors = exports.routeNotFound = exports.checkPayloadHeader = exports.checkJSONPayload = exports.verifyAndAuthenticate = exports.checkToken = exports.checkHeader = void 0;
var jwt = require("jsonwebtoken");
var Controller = require("../controller/controller");
var is_valid_coordinates = require("is-valid-coordinates");
var factory_1 = require("../factory/factory");
var model_1 = require("../model/model");
/**
*Funzione che controlla la presenza dell'header nella richiesta
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkHeader(req, res, next) {
    var authHeader = req.headers.authorization;
    if (authHeader) {
        next();
    }
    else {
        next(factory_1.ErrorEnum.ErrTokenHeader);
    }
}
exports.checkHeader = checkHeader;
/**
*Funzione che controlla la presenza del JWT nella richiesta
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkToken(req, res, next) {
    var bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        var bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    }
    else {
        next(factory_1.ErrorEnum.MissingToken);
    }
}
exports.checkToken = checkToken;
/**
*Funzione che controlla se nel JWT è stata utilizzata una chiave che corrisponda a quella presente nel file dove sono contenute le variabili di ambiente
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function verifyAndAuthenticate(req, res, next) {
    var decoded = jwt.verify(req.token, process.env.SECRET_KEY);
    if (decoded !== null)
        req.bearer = decoded;
    next();
}
exports.verifyAndAuthenticate = verifyAndAuthenticate;
/**
*Funzione che controlla se nella richiesta è presente un payload JSON ben formato
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkJSONPayload(req, res, next) {
    try {
        req.body = JSON.parse(JSON.stringify(req.body));
        next();
    }
    catch (error) {
        next(factory_1.ErrorEnum.MalformedPayload);
    }
}
exports.checkJSONPayload = checkJSONPayload;
/**
*Funzione utilizzata per verificare il content-type
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkPayloadHeader(req, res, next) {
    if (req.headers["content-type"] == "application/json") {
        console.log("This is req " + req.content);
        next();
    }
    else
        next(factory_1.ErrorEnum.ErrPayloadHeader);
    console.log(req.headers);
}
exports.checkPayloadHeader = checkPayloadHeader;
/**
*Funzione utilizzata per le rotte inesistenti
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function routeNotFound(req, res, next) {
    next(factory_1.ErrorEnum.ErrRouteNotFound);
}
exports.routeNotFound = routeNotFound;
/**
*Funzione utilizzata per loggare gli errori
*
*@param err -> errore
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function logErrors(err, req, res, next) {
    var new_err = (0, factory_1.getError)(err).getMsg();
    console.log(new_err);
    next(new_err);
}
exports.logErrors = logErrors;
/**
*Funzione che si occupa di ritornare lo stato e il messaggio di errore
*
*@param err -> errore
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function errorHandler(err, req, res, next) {
    res.status(err.status).json({ error: err.status, message: err.msg });
}
exports.errorHandler = errorHandler;
/**
*Funzione che si occupa di controllare se l'utente nella richiesta sia effettivamente admin
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkAdmin(req, res, next) {
    Controller.checkUser(req.bearer.req_email, res).then(function (user) {
        if (user) {
            Controller.getRole(req.bearer.req_email, res).then(function (role) {
                if (role == 'admin')
                    next();
                else
                    next(factory_1.ErrorEnum.ErrNotAdmin);
            });
        }
        else
            next(factory_1.ErrorEnum.ErrCheckAdmin);
    });
}
exports.checkAdmin = checkAdmin;
/**
*Funzione che si occupa di controllare se l'utente nella richiesta abbia associato un veicolo o meno
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkOnwner_cf(req, res, next) {
    Controller.checkUserCf(req.body.owner_cf, res).then(function (owner_cf) {
        if (owner_cf)
            next();
        else
            next(factory_1.ErrorEnum.ErrOwner);
    });
}
exports.checkOnwner_cf = checkOnwner_cf;
/**
*Funzione che si occupa di controllare se l'utente nella richiesta esista o meno
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkUserExist(req, res, next) {
    Controller.checkUser(req.bearer.email, res).then(function (email) {
        if (email)
            next();
        else
            next(factory_1.ErrorEnum.ErrUser);
    });
}
exports.checkUserExist = checkUserExist;
/**
*Funzione uguale a quella soprastante, cambia solo il fatto di prendere l'email non dal token ma dal body della richiesta.
*Viene utilizzata solamente dalla rotta refill che necessita il controllo sull'email dell'utente da ricaricare.
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkUserExistRefill(req, res, next) {
    Controller.checkUser(req.body.email, res).then(function (email) {
        if (email)
            next();
        else
            next(factory_1.ErrorEnum.ErrUser);
    });
}
exports.checkUserExistRefill = checkUserExistRefill;
/**
*Funzione che si occupa di controllare se il veicolo nella richiesta esista o meno
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkVehicleExist(req, res, next) {
    Controller.checkVehicle(req.body.license_plate, res).then(function (license_plate) {
        if (license_plate)
            next();
        else
            next(factory_1.ErrorEnum.ErrVehicle);
    });
}
exports.checkVehicleExist = checkVehicleExist;
/**
*Funzione che si occupa di controllare se la geofence area nella richiesta esista o meno
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkGeofenceExist(req, res, next) {
    Controller.checkGeofence(req.body.geofence_id, res).then(function (geofence_id) {
        if (geofence_id)
            next();
        else
            next(factory_1.ErrorEnum.ErrGeofenceArea);
    });
}
exports.checkGeofenceExist = checkGeofenceExist;
/**
*Funzione che si occupa di controllare se tutti i veicoli nella richiesta esistano o meno
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkVehicleArrayExist(req, res, next) {
    var vehiclesArray = req.body.vehicles.split(",");
    Controller.checkVehicleArray(vehiclesArray, res).then(function (item) {
        if (item)
            next();
        else
            next(factory_1.ErrorEnum.ErrVehicle);
    });
}
exports.checkVehicleArrayExist = checkVehicleArrayExist;
/**
*Funzione che si occupa di controllare se tutte le geofence area nella richiesta esistano o meno
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkGeofenceArrayExist(req, res, next) {
    var geofencesArray = req.body.geofences.split(",");
    Controller.checkGeofenceArray(geofencesArray, res).then(function (item) {
        if (item)
            next();
        else
            next(factory_1.ErrorEnum.ErrGeofenceArea);
    });
}
exports.checkGeofenceArrayExist = checkGeofenceArrayExist;
/**
*Funzione che si occupa di controllare se l'associazione geofence area - veicolo nella richiesta esista o meno
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkAssociationExist(req, res, next) {
    Controller.checkAssociation(req.body.geofence_id, req.body.license_plate, res).then(function (element) {
        if (element)
            next();
        else
            next(factory_1.ErrorEnum.ErrAssociation);
    });
}
exports.checkAssociationExist = checkAssociationExist;
/**
*Funzione che si occupa di controllare se i valori inviati come posizione del veicoli siano ammissibili o meno
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkPosition(req, res, next) {
    if (is_valid_coordinates(req.body.longitude, req.body.latitude)) {
        if (req.body.speed > 0 && req.body.speed <= 130) {
            if (req.body.altitude >= 0 && req.body.altitude <= 8000) {
                next();
            }
            else
                next(factory_1.ErrorEnum.ErrPosition);
        }
        else
            next(factory_1.ErrorEnum.ErrPosition);
    }
    else
        next(factory_1.ErrorEnum.ErrPosition);
}
exports.checkPosition = checkPosition;
/**
*Funzione che si occupa di controllare se l'utente che effettua una richiesta abbia token sufficienti
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkRemainingToken(req, res, next) {
    Controller.getToken(req.bearer.email, res).
        then(function (token) {
        console.log(token);
        if (token >= 0.05)
            next();
        else
            next(factory_1.ErrorEnum.ErrInsufficientToken);
    });
}
exports.checkRemainingToken = checkRemainingToken;
/**
*Funzione che si occupa di controllare se l'utente che effettua una richiesta abbia token sufficienti.
*Questa funzione è una variante di quella soprastante e viene usata solamente per la rotta "sendPosition".
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkRemainingTokenPosition(req, res, next) {
    Controller.getOwnerCf(req.body.license_plate, res).then(function (item) {
        Controller.getTokenCf(item, res).
            then(function (token) {
            if (token >= 0.05)
                next();
            else
                next(factory_1.ErrorEnum.ErrInsufficientToken);
        });
    });
}
exports.checkRemainingTokenPosition = checkRemainingTokenPosition;
/**
*Funzione che si occupa di controllare se l'utente che effettua una richiesta sia associato al veicolo.
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function checkOwnerVehicle(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, owner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, model_1.Users.findByPk(req.bearer.email, { raw: true })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, Controller.getOwnerCf(req.body.license_plate, res)];
                case 2:
                    owner = _a.sent();
                    if (user.cf == owner)
                        next();
                    else {
                        next(factory_1.ErrorEnum.ErrUserNotOwner);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkOwnerVehicle = checkOwnerVehicle;
