"use strict";
/**
*
*Utilizzo del design pattern "Factory" per la gestione efficiente degli errori
*
**/
exports.__esModule = true;
exports.getError = exports.ErrorEnum = exports.Success = void 0;
var ErrTokenHeader = /** @class */ (function () {
    function ErrTokenHeader() {
    }
    ErrTokenHeader.prototype.getMsg = function () {
        return {
            status: 400,
            msg: "Error token header"
        };
    };
    return ErrTokenHeader;
}());
var ErrJWT = /** @class */ (function () {
    function ErrJWT() {
    }
    ErrJWT.prototype.getMsg = function () {
        return {
            status: 400,
            msg: "Missing token"
        };
    };
    return ErrJWT;
}());
var ErrJSONPayload = /** @class */ (function () {
    function ErrJSONPayload() {
    }
    ErrJSONPayload.prototype.getMsg = function () {
        return {
            status: 400,
            msg: "Malformed payload"
        };
    };
    return ErrJSONPayload;
}());
var ErrPayloadHeader = /** @class */ (function () {
    function ErrPayloadHeader() {
    }
    ErrPayloadHeader.prototype.getMsg = function () {
        return {
            status: 400,
            msg: "Payload header error"
        };
    };
    return ErrPayloadHeader;
}());
var ErrNotAdmin = /** @class */ (function () {
    function ErrNotAdmin() {
    }
    ErrNotAdmin.prototype.getMsg = function () {
        return {
            status: 401,
            msg: "User is not admin"
        };
    };
    return ErrNotAdmin;
}());
var ErrCheckAdmin = /** @class */ (function () {
    function ErrCheckAdmin() {
    }
    ErrCheckAdmin.prototype.getMsg = function () {
        return {
            status: 404,
            msg: "Admin not found"
        };
    };
    return ErrCheckAdmin;
}());
var ErrOwner = /** @class */ (function () {
    function ErrOwner() {
    }
    ErrOwner.prototype.getMsg = function () {
        return {
            status: 400,
            msg: "Vehicle has no owner"
        };
    };
    return ErrOwner;
}());
var ErrUser = /** @class */ (function () {
    function ErrUser() {
    }
    ErrUser.prototype.getMsg = function () {
        return {
            status: 404,
            msg: "User not found"
        };
    };
    return ErrUser;
}());
var ErrVehicle = /** @class */ (function () {
    function ErrVehicle() {
    }
    ErrVehicle.prototype.getMsg = function () {
        return {
            status: 404,
            msg: "Vehicle not found"
        };
    };
    return ErrVehicle;
}());
var ErrGeofenceArea = /** @class */ (function () {
    function ErrGeofenceArea() {
    }
    ErrGeofenceArea.prototype.getMsg = function () {
        return {
            status: 404,
            msg: "Geofence area not found"
        };
    };
    return ErrGeofenceArea;
}());
var ErrAssociation = /** @class */ (function () {
    function ErrAssociation() {
    }
    ErrAssociation.prototype.getMsg = function () {
        return {
            status: 404,
            msg: "Association geofence-vehicle not found"
        };
    };
    return ErrAssociation;
}());
var ErrPosition = /** @class */ (function () {
    function ErrPosition() {
    }
    ErrPosition.prototype.getMsg = function () {
        return {
            status: 400,
            msg: "Invalid Position"
        };
    };
    return ErrPosition;
}());
var ErrInsufficientToken = /** @class */ (function () {
    function ErrInsufficientToken() {
    }
    ErrInsufficientToken.prototype.getMsg = function () {
        return {
            status: 401,
            msg: "Unauthorized"
        };
    };
    return ErrInsufficientToken;
}());
var ErrRouteNotFound = /** @class */ (function () {
    function ErrRouteNotFound() {
    }
    ErrRouteNotFound.prototype.getMsg = function () {
        return {
            status: 404,
            msg: "Route not found"
        };
    };
    return ErrRouteNotFound;
}());
var ErrServer = /** @class */ (function () {
    function ErrServer() {
    }
    ErrServer.prototype.getMsg = function () {
        return {
            status: 500,
            msg: "Server error"
        };
    };
    return ErrServer;
}());
var ErrUserNotOwner = /** @class */ (function () {
    function ErrUserNotOwner() {
    }
    ErrUserNotOwner.prototype.getMsg = function () {
        return {
            status: 400,
            msg: "User and vehicle do not match"
        };
    };
    return ErrUserNotOwner;
}());
var Success = /** @class */ (function () {
    function Success() {
    }
    Success.prototype.getMsg = function () {
        return {
            status: 200,
            msg: "Successful operation"
        };
    };
    return Success;
}());
exports.Success = Success;
/*
*Enumerazione per identificare i diversi tipi di errore
*/
var ErrorEnum;
(function (ErrorEnum) {
    ErrorEnum[ErrorEnum["ErrTokenHeader"] = 0] = "ErrTokenHeader";
    ErrorEnum[ErrorEnum["MissingToken"] = 1] = "MissingToken";
    ErrorEnum[ErrorEnum["MalformedPayload"] = 2] = "MalformedPayload";
    ErrorEnum[ErrorEnum["ErrPayloadHeader"] = 3] = "ErrPayloadHeader";
    ErrorEnum[ErrorEnum["ErrCheckAdmin"] = 4] = "ErrCheckAdmin";
    ErrorEnum[ErrorEnum["ErrNotAdmin"] = 5] = "ErrNotAdmin";
    ErrorEnum[ErrorEnum["ErrOwner"] = 6] = "ErrOwner";
    ErrorEnum[ErrorEnum["ErrUser"] = 7] = "ErrUser";
    ErrorEnum[ErrorEnum["ErrVehicle"] = 8] = "ErrVehicle";
    ErrorEnum[ErrorEnum["ErrGeofenceArea"] = 9] = "ErrGeofenceArea";
    ErrorEnum[ErrorEnum["ErrAssociation"] = 10] = "ErrAssociation";
    ErrorEnum[ErrorEnum["ErrPosition"] = 11] = "ErrPosition";
    ErrorEnum[ErrorEnum["ErrInsufficientToken"] = 12] = "ErrInsufficientToken";
    ErrorEnum[ErrorEnum["ErrRouteNotFound"] = 13] = "ErrRouteNotFound";
    ErrorEnum[ErrorEnum["ErrServer"] = 14] = "ErrServer";
    ErrorEnum[ErrorEnum["ErrUserNotOwner"] = 15] = "ErrUserNotOwner";
})(ErrorEnum = exports.ErrorEnum || (exports.ErrorEnum = {}));
/**
*Funzione che permette di restituire un oggetto in base all'enum in input
**/
function getError(type) {
    var val;
    switch (type) {
        case ErrorEnum.ErrTokenHeader:
            val = new ErrTokenHeader();
            break;
        case ErrorEnum.MissingToken:
            val = new ErrJWT();
            break;
        case ErrorEnum.MalformedPayload:
            val = new ErrJSONPayload();
            break;
        case ErrorEnum.ErrPayloadHeader:
            val = new ErrPayloadHeader();
            break;
        case ErrorEnum.ErrNotAdmin:
            val = new ErrNotAdmin();
            break;
        case ErrorEnum.ErrCheckAdmin:
            val = new ErrCheckAdmin();
            break;
        case ErrorEnum.ErrOwner:
            val = new ErrOwner();
            break;
        case ErrorEnum.ErrUser:
            val = new ErrUser();
            break;
        case ErrorEnum.ErrVehicle:
            val = new ErrVehicle();
            break;
        case ErrorEnum.ErrGeofenceArea:
            val = new ErrGeofenceArea();
            break;
        case ErrorEnum.ErrAssociation:
            val = new ErrAssociation();
            break;
        case ErrorEnum.ErrPosition:
            val = new ErrPosition();
            break;
        case ErrorEnum.ErrInsufficientToken:
            val = new ErrInsufficientToken();
            break;
        case ErrorEnum.ErrRouteNotFound:
            val = new ErrRouteNotFound();
            break;
        case ErrorEnum.ErrServer:
            val = new ErrServer();
            break;
        case ErrorEnum.ErrUserNotOwner:
            val = new ErrUserNotOwner();
            break;
    }
    return val;
}
exports.getError = getError;
