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
exports.showAssociations = exports.showVehicles = exports.showPositions = exports.updateToken = exports.refill = exports.sendPosition = exports.deleteGeofenceVehicle = exports.checkAssociation = exports.createGeofenceVehicle = exports.checkVehicleArray = exports.checkGeofenceArray = exports.checkGeofence = exports.checkVehicle = exports.showToken = exports.createGeofence = exports.createVehicle = exports.getTokenCf = exports.getToken = exports.getOwnerCf = exports.getRole = exports.checkUserCf = exports.checkUser = void 0;
var model_1 = require("../model/model");
var Op = require('sequelize').Op;
var factory_1 = require("../factory/factory");
var sequelizeQueries = require("./sequelizeQueries");
/**
*Funzione che permette di verificare che l'utente esista data la sua email
*
*@param email -> email utente
*@param res -> risposta da parte del server
*@returns true se utente esiste, false se non esiste
*
**/
function checkUser(email, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.Users.findByPk(email, { raw: true })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_1, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
exports.checkUser = checkUser;
/**
*Funzione che permette di verificare che l'utente esista dato il suo codice fiscale associato al veicolo
*
*@param owner_cf -> codice fiscale utente associato al veicolo
*@param res -> risposta da parte del server
*@returns true se utente esiste, false se non esiste
*
**/
function checkUserCf(owner_cf, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.Users.findOne({ where: { cf: owner_cf } })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_2, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
exports.checkUserCf = checkUserCf;
/**
*Funzione che restituisce il ruolo dell'utente data la sua email
*
*@param email -> email utente
*@param res -> risposta da parte del server
*@returns ruolo utente (admin/user)
*
**/
function getRole(email, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.Users.findByPk(email, { raw: true })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_3, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result.role];
            }
        });
    });
}
exports.getRole = getRole;
/**
*Funzione che restituisce il codice fiscale associato al veicolo data la targa
*
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*@returns codice fiscale
*
**/
function getOwnerCf(license_plate, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.Vehicle.findByPk(license_plate, { raw: true })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_4, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result.owner_cf];
            }
        });
    });
}
exports.getOwnerCf = getOwnerCf;
/**
*Funzione che restituisce i token rimanenti dell'utente data la sua email
*
*@param email -> email utente
*@param res -> risposta da parte del server
*@returns token utente
*
**/
function getToken(email, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.Users.findByPk(email, { raw: true })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_5, res);
                    return [3 /*break*/, 3];
                case 3:
                    ;
                    return [2 /*return*/, result.token];
            }
        });
    });
}
exports.getToken = getToken;
/**
*Funzione che restituisce i token rimanenti dell'utente dato il suo codice fiscale
*
*@param cf -> codice fiscale utente
*@param res -> risposta da parte del server
*@returns token utente
*
**/
function getTokenCf(cf, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.Users.findOne({ where: { cf: cf }, raw: true })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_6 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_6, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result.token];
            }
        });
    });
}
exports.getTokenCf = getTokenCf;
/**
*Funzione che permette di creare un veicolo
*
*@param vehicle -> oggetto contenente gli attributi necessari per la creazione del veicolo
*@param res -> risposta da parte del server
*
**/
function createVehicle(vehicle, res) {
    model_1.Vehicle.create(vehicle).then(function () {
        var new_res = new factory_1.Success().getMsg();
        res.status(new_res.status).json({ status: new_res.status, message: new_res.msg });
    })["catch"](function (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    });
}
exports.createVehicle = createVehicle;
;
/**
*Funzione che permette di creare una geofence area; vengono sfruttate le funzionalità GIS di postgis
*
*@param geofence -> oggetto contenente gli attributi necessari per la creazione della geofence area
*@param res -> risposta da parte del server
*
**/
function createGeofence(geofence, res) {
    model_1.Geofence.create({ id: geofence.id, coordinates: { type: 'Polygon', coordinates: geofence.coordinates, crs: { type: 'name', properties: { name: 'EPSG:0' } } }, max_speed: geofence.max_speed })
        .then(function () {
        var new_res = new factory_1.Success().getMsg();
        res.status(new_res.status).json({ status: new_res.status, message: new_res.msg });
    })["catch"](function (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    });
}
exports.createGeofence = createGeofence;
/**
*Funzione che permette di mostrare i token rimanenti di un utente data la sua email
*
*@param geofence -> email utente
*@param res -> risposta da parte del server
*
**/
function showToken(email, res) {
    model_1.Users.findByPk(email, { raw: true }).then(function (item) {
        res.send("Remaining token: " + item.token);
    })["catch"](function (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    });
}
exports.showToken = showToken;
/**
*Funzione che permette di verificare che il veicolo esista data la sua targa
*
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*@returns true se veicolo esiste, false se non esiste
*
**/
function checkVehicle(license_plate, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.Vehicle.findByPk(license_plate, { raw: true })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_7, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
exports.checkVehicle = checkVehicle;
/**
*Funzione che permette di verificare che una geofence area esista dato il suo id
*
*@param id -> id geofence
*@param res -> risposta da parte del server
*@returns true se geofence area esiste, false se non esiste
*
**/
function checkGeofence(id, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.Geofence.findByPk(id, { raw: true })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_8 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_8, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
exports.checkGeofence = checkGeofence;
/**
*Funzione che permette di verificare che tutte le geofence area all'interno della richiesta di associazione con uno o più veicoli esistano o meno
*
*@param geofence -> array contenente gli id delle geofence area
*@param res -> risposta da parte del server
*@returns true se le geofence area esistono, false se non esistono
*
**/
function checkGeofenceArray(geofences, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, array, _i, geofences_1, element, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    array = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    _i = 0, geofences_1 = geofences;
                    _a.label = 2;
                case 2:
                    if (!(_i < geofences_1.length)) return [3 /*break*/, 5];
                    element = geofences_1[_i];
                    return [4 /*yield*/, model_1.Geofence.findByPk(element, { raw: true })];
                case 3:
                    result = _a.sent();
                    if (result) {
                        array.push(element);
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_9 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_9, res);
                    return [3 /*break*/, 7];
                case 7:
                    if (geofences.length == array.length)
                        return [2 /*return*/, true];
                    else
                        return [2 /*return*/, false];
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkGeofenceArray = checkGeofenceArray;
/**
*Funzione che permette di verificare che tutti i veicoli all'interno della richiesta di associazione con una o più geofence area esistano o meno
*
*@param vehicles -> array contenente le targhe dei veicoli
*@param res -> risposta da parte del server
*@returns true se i veicoli esistono, false se non esistono
*
**/
function checkVehicleArray(vehicles, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, array, _i, vehicles_1, element, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    array = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    _i = 0, vehicles_1 = vehicles;
                    _a.label = 2;
                case 2:
                    if (!(_i < vehicles_1.length)) return [3 /*break*/, 5];
                    element = vehicles_1[_i];
                    return [4 /*yield*/, model_1.Vehicle.findByPk(element, { raw: true })];
                case 3:
                    result = _a.sent();
                    if (result) {
                        array.push(element);
                    }
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_10 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_10, res);
                    return [3 /*break*/, 7];
                case 7:
                    if (vehicles.length == array.length)
                        return [2 /*return*/, true];
                    else
                        return [2 /*return*/, false];
                    return [2 /*return*/];
            }
        });
    });
}
exports.checkVehicleArray = checkVehicleArray;
/**
*Funzione che permette di creare le associazioni geofence area - veicoli
*
*@param geofences -> id geofence area
*@param vehicles -> targhe veicoli
*@param res -> risposta da parte del server
*
**/
function createGeofenceVehicle(geofences, vehicles, res) {
    try {
        var geofencesArray = geofences.split(",");
        var vehiclesArray = vehicles.split(",");
        for (var _i = 0, geofencesArray_1 = geofencesArray; _i < geofencesArray_1.length; _i++) {
            var g = geofencesArray_1[_i];
            for (var _a = 0, vehiclesArray_1 = vehiclesArray; _a < vehiclesArray_1.length; _a++) {
                var v = vehiclesArray_1[_a];
                model_1.Geofence_Vehicle.create({ license_plate: v, geofence_id: g });
            }
        }
        var new_res = new factory_1.Success().getMsg();
        res.status(new_res.status).json({ status: new_res.status, message: new_res.msg });
    }
    catch (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    }
}
exports.createGeofenceVehicle = createGeofenceVehicle;
/**
*Funzione che permette di verificare che un'associazione geofence area - veicolo esista
*
*@param geofence_id -> id geofence
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*@returns true se geofence area esiste, false se non esiste
*
**/
function checkAssociation(geofence_id, license_plate, res) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, model_1.Geofence_Vehicle.findOne({
                            where: { geofence_id: geofence_id, license_plate: license_plate }
                        })];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_11 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_11, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
exports.checkAssociation = checkAssociation;
/**
*Funzione che permette di eliminare un'associazione geofence area - veicolo
*
*@param geofence_id -> id geofence
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*
**/
function deleteGeofenceVehicle(geofence_id, license_plate, res) {
    try {
        model_1.Geofence_Vehicle.destroy({ where: { license_plate: license_plate, geofence_id: geofence_id } }).then(function () {
            var new_res = new factory_1.Success().getMsg();
            res.status(new_res.status).json({ status: new_res.status, message: new_res.msg });
        });
    }
    catch (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    }
}
exports.deleteGeofenceVehicle = deleteGeofenceVehicle;
/**
*Funzione che permette inviare i dati instantanei di posizione, velocità e timestamp.
*
*Deve essere verificato se i dati di posizione inviati per quel veicolo rientrano all’interno di una geofence area: per farlo è stata utilizzata la query "queryContains"
*
*Nel caso in cui l’utente entra in una geo-fence area associata questo evento deve essere memorizzato.
*Stessa situazione per quanto riguarda l’uscita da una geo-fence area.
*
*Deve essere eventualmente verificato anche se la velocità all’interno della geo-fence area
*è superiore a quella consentita (la velocità massima all’interno della geo-fence area è opzionale).
*
*@param license_plate -> targa veicolo
*@param longitude -> longitudine veicolo
*@param latitude -> latitudine veicolo
*@param altitude -> altitudine veicolo
*@param speed -> velocità veicolo
*@param res -> risposta da parte del server
*
**/
function sendPosition(license_plate, longitude, latitude, altitude, speed, res, next) {
    var time = Date.now();
    model_1.Position.create({ vehicle_license_plate: license_plate, longitude: longitude, latitude: latitude, altitude: altitude, speed: speed, timestamp: time, point: { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:0' } } } })["catch"](function (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    });
    sequelizeQueries.queryContains(longitude, latitude)
        .then(function (result) {
        if (result[0].length == 0) {
            var new_res = new factory_1.Success().getMsg();
            res.status(new_res.status).json({ status: new_res.status, message: "The point is not present in any geofence" });
        }
        else {
            var _loop_1 = function (element) {
                model_1.Geofence_Vehicle.findAll({ where: { license_plate: license_plate, geofence_id: element.id }, raw: true })
                    .then(function (item) {
                    if (item.length != 0) {
                        sequelizeQueries.getMaxSpeed(element.id).then(function (sp) {
                            if (sp[0][0].max_speed != null) {
                                if (speed > sp[0][0].max_speed) {
                                    console.log("Maximum speed exceeded");
                                }
                            }
                        });
                        /*
                        *Se si trova la relazione tra veicolo e geofence area ed è già presente nella tabella "event" si richiama la funzione "queryEnterExit",
                        *altrimenti si crea una nuova relazione nella tabella "event"
                        */
                        model_1.Event.findAll({ where: { license_plate: license_plate }, raw: true })
                            .then(function (item) {
                            /*
                            *La seguente funzione verifica che il tipo dell'ultimo evento in ordine cronologico registrato del veicolo corrente
                            *sia un "Enter" (entrata nella geofence area) , un "Inside" (il veicolo si trova ancora all'interno della geofence area) o un "Exit" (uscita dalla geofence area).
                            *--Se l'ultimo evento è di tipo "Enter" o "Inside" e la nuova geofence_id e quella già presente corrispondon allora:
                            *si inserisce un nuovo evento "Enter" con la stessa geofence_id, mentre se non corrispondono si inseriscono due nuove righe:
                            *-la prima avrà come geofence_id quello già presente e come tipo "Exit" (quindi il veicolo è uscito dalla geofence area);
                            *-la seconda avrà come geofence_id quello nuovo e come tipo "Enter" (il veicolo è entrato in una nuova geofence area)
                            *--Se l'ultimo evento è di tipo "Exit" allora il veicolo sta entrando in una nuova geofence area e quindi
                            *si inserisce una nuova riga che ha come geofence_id quello nuovo e come tipo "Enter".
                            */
                            if (item.length != 0) {
                                sequelizeQueries.queryEnterExit(license_plate).then(function (result) {
                                    if (result[0][0].type == "Enter" || result[0][0].type == "Inside") {
                                        if (result[0][0].geofence_id == element.id) {
                                            model_1.Event.create({ license_plate: license_plate, geofence_id: element.id, timestamp: time, type: "Inside" });
                                            var new_res = new factory_1.Success().getMsg();
                                            res.status(new_res.status).json({ status: new_res.status, message: new_res.msg });
                                        }
                                        else {
                                            model_1.Event.create({ license_plate: license_plate, geofence_id: result[0][0].geofence_id, timestamp: time - 1, type: "Exit" });
                                            model_1.Event.create({ license_plate: license_plate, geofence_id: element.id, timestamp: time, type: "Enter" });
                                            var new_res = new factory_1.Success().getMsg();
                                            res.status(new_res.status).json({ status: new_res.status, message: new_res.msg });
                                        }
                                    }
                                    else {
                                        model_1.Event.create({ license_plate: license_plate, geofence_id: element.id, timestamp: time, type: "Enter" });
                                        var new_res = new factory_1.Success().getMsg();
                                        res.status(new_res.status).json({ status: new_res.status, message: new_res.msg });
                                    }
                                });
                            }
                            else {
                                model_1.Event.create({ license_plate: license_plate, geofence_id: element.id, timestamp: time, type: "Enter" });
                                var new_res = new factory_1.Success().getMsg();
                                res.status(new_res.status).json({ status: new_res.status, message: new_res.msg });
                            }
                        });
                    }
                    else {
                        var new_res = new factory_1.Success().getMsg();
                        res.status(new_res.status).json({ status: new_res.status, message: "No associated geofences" });
                    }
                });
            };
            for (var _i = 0, _a = result[0]; _i < _a.length; _i++) {
                var element = _a[_i];
                _loop_1(element);
            }
        }
    })["catch"](function (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    });
}
exports.sendPosition = sendPosition;
/**
*Funzione che permette di ricaricare il credito dell'utente
*
*@param email -> email utente
*@param token -> nuovo credito da inserire
*@param res -> risposta da parte del server
*
**/
function refill(email, token, res) {
    model_1.Users.update({ token: token }, { where: { email: email } })
        .then(function () {
        var new_res = new factory_1.Success().getMsg();
        res.status(new_res.status).json({ status: new_res.status, message: new_res.msg });
    })["catch"](function (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    });
}
exports.refill = refill;
/**
*Funzione che permette di aggiornare il credito dell'utente a causa dell'invio della posizione
*
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/
function updateToken(email, res, next) {
    getToken(email, res).then(function (token) { model_1.Users.update({ token: token - 0.05 }, { where: { email: email } }); })["catch"](function (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    });
    next();
}
exports.updateToken = updateToken;
/**
*Funzione che consente di ritornare l’insieme delle posizioni di un veicolo in un dato intervallo temporale
*
*@param license_plate -> targa veicolo
*@param start -> data inizio intervallo
*@param end -> data fine intervallo
*@param res -> risposta da parte del server
*
**/
function showPositions(license_plate, start, end, res) {
    var _a;
    var newStart = Math.floor(new Date(start).getTime());
    var newEnd;
    if (end == "") {
        newEnd = Date.now();
    }
    else {
        newEnd = Math.floor(new Date(end).getTime());
    }
    ;
    model_1.Position.findAll({ where: { vehicle_license_plate: license_plate, timestamp: (_a = {}, _a[Op.gt] = newStart, _a[Op.lt] = newEnd, _a) }, raw: true })
        .then(function (items) {
        var arrayPosition = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var coordinates = JSON.parse(JSON.stringify(item));
            var newArray = [Number(coordinates.longitude), Number(coordinates.latitude)];
            arrayPosition.push(newArray);
        }
        var json = [];
        for (var _a = 0, arrayPosition_1 = arrayPosition; _a < arrayPosition_1.length; _a++) {
            var element = arrayPosition_1[_a];
            var a = JSON.parse(JSON.stringify({
                "type": "Point",
                "coordinates": element
            }));
            var value = {
                "type": "Feature",
                "properties": {},
                "geometry": a
            };
            json.push(value);
        }
        var geojson = {
            "type": "FeatureCollection",
            "features": json
        };
        res.send(geojson);
    })["catch"](function (error) {
        controllerErrors(factory_1.ErrorEnum.ErrServer, error, res);
    });
}
exports.showPositions = showPositions;
/**
*Funzione che consente di ritornare per ogni veicolo se questo si trova all’interno o all’esterno di una geofence area.
*Per i veicoli che sono all’interno della geofence viene ritornato anche il tempo di permanenza.
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*
**/
function showVehicles(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var items, json, _i, items_2, item, point, geofence_id, timestamp_vehicle, a, b, c, error_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, model_1.Vehicle.findAll({ raw: true })];
                case 1:
                    items = _a.sent();
                    json = [];
                    _i = 0, items_2 = items;
                    _a.label = 2;
                case 2:
                    if (!(_i < items_2.length)) return [3 /*break*/, 10];
                    item = items_2[_i];
                    return [4 /*yield*/, sequelizeQueries.queryPoint(item.license_plate)];
                case 3:
                    point = _a.sent();
                    if (!(point[0].length != 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, sequelizeQueries.queryCheckContains(point[0][0].point.coordinates)];
                case 4:
                    geofence_id = _a.sent();
                    if (!(geofence_id[0].length != 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, sequelizeQueries.queryTimestamp(item.license_plate, geofence_id[0][0].id)];
                case 5:
                    timestamp_vehicle = _a.sent();
                    a = JSON.parse(JSON.stringify({
                        "license_plate": item.license_plate,
                        "geofence_id": geofence_id[0][0].id,
                        "tempo di permanenza": ((Date.now() - timestamp_vehicle[0][0].timestamp) / 60000).toFixed(2) + " min"
                    }));
                    json.push(a);
                    return [3 /*break*/, 7];
                case 6:
                    b = JSON.parse(JSON.stringify({
                        "license_plate": item.license_plate,
                        "geofence_id": ""
                    }));
                    json.push(b);
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    c = JSON.parse(JSON.stringify({
                        "license_plate": item.license_plate,
                        "geofence_id": ""
                    }));
                    json.push(c);
                    _a.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 2];
                case 10:
                    res.send(json);
                    return [3 /*break*/, 12];
                case 11:
                    error_12 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_12, res);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.showVehicles = showVehicles;
/**
*Funzione che permette di elencare l’insieme dei veicoli e delle geofence area a loro associate
*(utente admin può ottenere elenco completo; un utente può vedere solo il proprio insieme di veicoli e geofence area associate).
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*
**/
function showAssociations(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var all, cf, vehicles, _i, vehicles_2, element, associations, error_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, getRole(req.bearer.email, res)];
                case 1:
                    if (!((_a.sent()) == "admin")) return [3 /*break*/, 3];
                    return [4 /*yield*/, model_1.Geofence_Vehicle.findAll({
                            raw: true, order: [
                                ['license_plate', 'ASC']
                            ]
                        })];
                case 2:
                    all = _a.sent();
                    res.send(all);
                    return [3 /*break*/, 10];
                case 3: return [4 /*yield*/, model_1.Users.findByPk(req.bearer.email, { raw: true })];
                case 4:
                    cf = _a.sent();
                    return [4 /*yield*/, model_1.Vehicle.findAll({ where: { owner_cf: cf.cf }, raw: true })];
                case 5:
                    vehicles = _a.sent();
                    _i = 0, vehicles_2 = vehicles;
                    _a.label = 6;
                case 6:
                    if (!(_i < vehicles_2.length)) return [3 /*break*/, 9];
                    element = vehicles_2[_i];
                    return [4 /*yield*/, model_1.Geofence_Vehicle.findAll({ where: { license_plate: element.license_plate }, raw: true })];
                case 7:
                    associations = _a.sent();
                    res.write(JSON.stringify(associations));
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 6];
                case 9:
                    res.end();
                    _a.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_13 = _a.sent();
                    controllerErrors(factory_1.ErrorEnum.ErrServer, error_13, res);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
exports.showAssociations = showAssociations;
/**
 * Funzione che viene richiamata dalle altre funzioni del Controller in caso di errori.
 *
 *@param enum_error -> enum che identifica il tipo di errore
 *@param err -> errore che si presenta
 *@param res -> risposta da parte del server
 *
 **/
function controllerErrors(enum_error, err, res) {
    var new_err = (0, factory_1.getError)(enum_error).getMsg();
    console.log(err);
    res.status(new_err.status).json({ error: new_err.status, message: new_err.msg });
}
