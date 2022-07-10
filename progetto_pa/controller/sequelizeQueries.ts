import { sequelize} from '../model/model';

/** 
*Funzione che permette restituire la velocità massima della geofence area dato il suo id
*
*@param geofence_id -> id geofence area
*@returns max_speed geofence area
*
**/

export async function getMaxSpeed(geofence_id: string): Promise<any> {
    let result = sequelize.query("SELECT max_speed FROM geofence WHERE id = '" + geofence_id + "'",
        {
            raw: true
        });
    return result
}

/** 
*Funzione che permette restituire l'id della geofence area e il tipo dell'ultimo evento del veicolo in ordine temporale data la sua targa
*
*@param license_plate -> targa veicolo
*@returns max_speed geofence area
*
**/

export async function queryEnterExit(license_plate: string): Promise<any> {
    let result = sequelize.query("SELECT geofence_id, type FROM event WHERE license_plate = '" + license_plate + "' ORDER BY timestamp DESC LIMIT 1",
        {
            raw: true
        });
    return result
}

/** 
*Funzione che permette restituire l'id (se esiste) della geofence area contenente la posizione del veicolo
*
*@param longitude -> longitude veicolo
*@param latitude -> latitudine veicolo
*@returns id geofence area
**/

export async function queryContains(longitude: number, latitude: number): Promise<any> {
    let result = sequelize.query("SELECT id FROM geofence WHERE ST_Contains(geofence.coordinates, ST_Point(" + Number(longitude) + "," + Number(latitude) + "))",
        {
            raw: true
        });

    return result
}

/**
* Funzione che ritorna la posizione del veicolo più recente dal punto di vista temporale
* 
*@param license_plate -> targa del veicolo
*@return point -> posizione veicolo
*
**/

export async function queryPoint(license_plate: string) {
    let point = sequelize.query("SELECT point FROM position WHERE vehicle_license_plate='" + license_plate + "' ORDER BY timestamp DESC LIMIT 1", {
        raw: true
    })
    return point
}

/**
*Funzione che permette di restituire l'id (se esiste) della geofence area contenente la posizione del veicolo 
* 
*@param point -> posizione veicolo
*@returns id geofence area
*
**/

export async function queryCheckContains(point: any) {
    let result = sequelize.query("SELECT id FROM geofence WHERE ST_Contains(geofence.coordinates, ST_Point(" + Number(point[0]) + "," + Number(point[1]) + "))",
        {
            raw: true
        })
    return result

}

/**
*Funzione che permette di restituire il timestamp dell'evento di tipo "Enter" del veicolo associato ad uno specifico geofence_id
* 
*@param license_plate -> targa veicolo
*@param geofence_id -> id geofence
*@returns timestamp
*
**/

export async function queryTimestamp(license_plate: string, geofence_id: string) {
    let result = sequelize.query("SELECT timestamp FROM event WHERE license_plate = '" + license_plate + "' and geofence_id = '" + geofence_id + "' and type ='Enter' ORDER BY timestamp DESC LIMIT 1",
        {
            raw: true
        })

    return result
}
