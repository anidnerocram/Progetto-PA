"use strict";
exports.__esModule = true;
exports.sendPosition = exports.delete_association = exports.catchError = exports.create_geofences_vehicles = exports.showToken = exports.refill = exports.showPosition = exports.create_geofence = exports.create_vehicle = exports.showAssociations = exports.noAuthentication = exports.authentication = void 0;
var Middleware = require("./middleware");
/**
*Catene di middleware
**/
exports.authentication = [
    Middleware.checkHeader,
    Middleware.checkToken,
    Middleware.verifyAndAuthenticate
];
exports.noAuthentication = [
    Middleware.checkPayloadHeader,
    Middleware.checkJSONPayload
];
exports.showAssociations = [
    Middleware.checkUserExist,
    Middleware.checkRemainingToken
];
exports.create_vehicle = [
    Middleware.checkAdmin,
    Middleware.checkOnwner_cf
];
exports.create_geofence = [
    Middleware.checkAdmin,
];
exports.showPosition = [
    Middleware.checkVehicleExist
];
exports.refill = [
    Middleware.checkAdmin,
    Middleware.checkUserExistRefill
];
exports.showToken = [
    Middleware.checkUserExist,
    Middleware.checkRemainingToken
];
exports.create_geofences_vehicles = [
    Middleware.checkAdmin,
    Middleware.checkGeofenceArrayExist,
    Middleware.checkVehicleArrayExist
];
exports.catchError = [
    Middleware.logErrors,
    Middleware.errorHandler
];
exports.delete_association = [
    Middleware.checkAdmin,
    Middleware.checkVehicleExist,
    Middleware.checkGeofenceExist,
    Middleware.checkAssociationExist
];
exports.sendPosition = [
    Middleware.checkUserExist,
    Middleware.checkVehicleExist,
    Middleware.checkOwnerVehicle,
    Middleware.checkRemainingTokenPosition,
    Middleware.checkPosition
];
