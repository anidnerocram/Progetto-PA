/** 
*
*Utilizzo del design pattern "Factory" per la gestione efficiente degli errori
*
**/

/** 
*Interfaccia utilizzata da tutte le classi sottostanti per definire il messaggio di errore
**/

interface Msg {
    getMsg():{status: number, msg: string};
}

class ErrTokenHeader implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 400,
            msg: "Error token header"
        }
    }
}

class ErrJWT implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 400,
            msg: "Missing token"
        }
    }
}

class ErrJSONPayload implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 400,
            msg: "Malformed payload"
        }
    }
}

class ErrPayloadHeader implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 400,
            msg: "Payload header error"
        }
    }
}

class ErrNotAdmin implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 401,
            msg: "User is not admin"
        }
    }
}


class ErrCheckAdmin implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 404,
            msg: "Admin not found"
        }
    }
}



class ErrOwner implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 400,
            msg: "Vehicle has no owner"
        }
    }
}

class ErrUser implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 404,
            msg: "User not found"
        }
    }
}

class ErrVehicle implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 404,
            msg: "Vehicle not found"
        }
    }
}

class ErrGeofenceArea implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 404,
            msg: "Geofence area not found"
        }
    }
}

class ErrAssociation implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 404,
            msg: "Association geofence-vehicle not found"
        }
    }
}

class ErrPosition implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 400,
            msg: "Invalid Position"
        }
    }
}

class ErrInsufficientToken implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 401,
            msg: "Unauthorized"
        }
    }
}

class ErrRouteNotFound implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 404,
            msg: "Route not found"
        }
    }
}

class ErrServer implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 500,
            msg: "Server error"
        }
    }
}

class ErrUserNotOwner implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 400,
            msg: "User and vehicle do not match"
        }
    }
}

export class Success implements Msg {
    getMsg(): { status: number; msg: string; } {
        return {
            status: 200,
            msg: "Successful operation"
        }
    }
}

/*
*Enumerazione per identificare i diversi tipi di errore
*/

export enum ErrorEnum {
    ErrTokenHeader,
    MissingToken,
    MalformedPayload,
    ErrPayloadHeader,
    ErrCheckAdmin,
    ErrNotAdmin,
    ErrOwner,
    ErrUser,
    ErrVehicle,
    ErrGeofenceArea,
    ErrAssociation,
    ErrPosition,
    ErrInsufficientToken,
    ErrRouteNotFound,
    ErrServer,
    ErrUserNotOwner
}

/** 
*Funzione che permette di restituire un oggetto in base all'enum in input
**/
export function getError(type: ErrorEnum): Msg{
    let val: Msg;
    switch (type){
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
    return val;}