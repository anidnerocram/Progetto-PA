import * as Middleware from './middleware';

/** 
*Catene di middleware
**/

export const authentication = [
    Middleware.checkHeader,
    Middleware.checkToken,
    Middleware.verifyAndAuthenticate
]

export const noAuthentication = [
    Middleware.checkPayloadHeader,
    Middleware.checkJSONPayload
]

export const showAssociations = [
    Middleware.checkUserExist,
    Middleware.checkRemainingToken
]

export const create_vehicle = [
    Middleware.checkAdmin,
    Middleware.checkOnwner_cf
]

export const create_geofence = [
    Middleware.checkAdmin,
]

export const showPosition = [
    Middleware.checkVehicleExist
]

export const refill = [
    Middleware.checkAdmin,
    Middleware.checkUserExistRefill

]

export const showToken = [
    Middleware.checkUserExist,
    Middleware.checkRemainingToken

]

export const create_geofences_vehicles = [
    Middleware.checkAdmin,
    Middleware.checkGeofenceArrayExist,
    Middleware.checkVehicleArrayExist
]

export const catchError = [
    Middleware.logErrors,
    Middleware.errorHandler
]

export const delete_association = [
    Middleware.checkAdmin,
    Middleware.checkVehicleExist,
    Middleware.checkGeofenceExist,
    Middleware.checkAssociationExist
]

export const sendPosition = [
    Middleware.checkUserExist,
    Middleware.checkVehicleExist,
    Middleware.checkOwnerVehicle,
    Middleware.checkRemainingTokenPosition,
    Middleware.checkPosition
]