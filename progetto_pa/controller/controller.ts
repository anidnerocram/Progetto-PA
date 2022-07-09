import { Users, Vehicle, Geofence, Geofence_Vehicle, sequelize, Position, Event } from '../model/model';
const { Op } = require('sequelize');
import { ErrorEnum, getError, Success} from '../factory/factory';
import * as sequelizeQueries from './sequelizeQueries'

/**
*Funzione che permette di verificare che l'utente esista data la sua email
*
*@param email -> email utente
*@param res -> risposta da parte del server
*@returns true se utente esiste, false se non esiste
*
**/

export async function checkUser(email: string, res: any): Promise<boolean> {
    let result: any;
    try {
        result = await Users.findByPk(email, { raw: true });
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    return result;
}

/** 
*Funzione che permette di verificare che l'utente esista dato il suo codice fiscale associato al veicolo
*
*@param owner_cf -> codice fiscale utente associato al veicolo
*@param res -> risposta da parte del server
*@returns true se utente esiste, false se non esiste
*
**/

export async function checkUserCf(owner_cf: string, res: any): Promise<boolean> {
    let result: any;
    try {
        result = await Users.findOne({ where: { cf: owner_cf } });
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    return result;
}

/** 
*Funzione che restituisce il ruolo dell'utente data la sua email
*
*@param email -> email utente
*@param res -> risposta da parte del server
*@returns ruolo utente (admin/user)
*
**/

export async function getRole(email: string, res: any): Promise<string> {
    let result: any;
    try {
        result = await Users.findByPk(email, { raw: true });
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    return result.role;
}

/** 
*Funzione che restituisce il codice fiscale associato al veicolo data la targa
*
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*@returns codice fiscale 
*
**/

export async function getOwnerCf(license_plate: string, res: any): Promise<string> {
    let result: any;
    try {
        result = await Vehicle.findByPk(license_plate, { raw: true });
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    return result.owner_cf;
}

/** 
*Funzione che restituisce i token rimanenti dell'utente data la sua email
*
*@param email -> email utente
*@param res -> risposta da parte del server
*@returns token utente
*
**/

export async function getToken(email: string, res: any): Promise<number> {
    let result: any;
    try {
        result = await Users.findByPk(email, {raw:true});
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    };
    return result.token;
}

/** 
*Funzione che restituisce i token rimanenti dell'utente dato il suo codice fiscale
*
*@param cf -> codice fiscale utente
*@param res -> risposta da parte del server
*@returns token utente
*
**/

export async function getTokenCf(cf: string, res: any): Promise<number> {
    let result: any;
    try {
        result = await Users.findOne({ where: { cf: cf }, raw: true });
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    return result.token;
}

/**  
*Funzione che permette di creare un veicolo
*
*@param vehicle -> oggetto contenente gli attributi necessari per la creazione del veicolo
*@param res -> risposta da parte del server
*
**/

export function createVehicle(vehicle: any, res: any): void {
    Vehicle.create(vehicle).then(()=>{
        const new_res = new Success().getMsg();
        res.status(new_res.status).json({status:new_res.status, message:new_res.msg});
    })
        .catch((error) => {
            controllerErrors(ErrorEnum.ErrServer, error, res);
        })
};

/** 
*Funzione che permette di creare una geofence area; vengono sfruttate le funzionalità GIS di postgis 
*
*@param geofence -> oggetto contenente gli attributi necessari per la creazione della geofence area
*@param res -> risposta da parte del server
*
**/

export function createGeofence(geofence: any, res: any): void {
    Geofence.create({id:geofence.id, coordinates:{ type: 'Polygon', coordinates: geofence.coordinates, crs: { type: 'name', properties: { name: 'EPSG:0'} }}, max_speed:geofence.max_speed})
    .then(()=>{
        const new_res = new Success().getMsg();
        res.status(new_res.status).json({status:new_res.status, message:new_res.msg});
    })
    .catch((error) => {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    })
}

/** 
*Funzione che permette di mostrare i token rimanenti di un utente data la sua email
*
*@param geofence -> email utente
*@param res -> risposta da parte del server
*
**/

export function showToken(email: string, res: any): void {
    Users.findByPk(email, { raw: true }).then((item: any) => {
        res.send("Remaining token: " + item.token)
    }).catch((error) => {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    })
}

/** 
*Funzione che permette di verificare che il veicolo esista data la sua targa
*
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*@returns true se veicolo esiste, false se non esiste
*
**/

export async function checkVehicle(license_plate: string, res: any): Promise<boolean> {
    let result: any;
    try {
        result = await Vehicle.findByPk(license_plate, { raw: true });
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    return result;
}

/** 
*Funzione che permette di verificare che una geofence area esista dato il suo id
*
*@param id -> id geofence
*@param res -> risposta da parte del server
*@returns true se geofence area esiste, false se non esiste
*
**/

export async function checkGeofence(id: string, res: any): Promise<boolean> {
    let result: any;
    try {
        result = await Geofence.findByPk(id, { raw: true });
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    return result;
}

/** 
*Funzione che permette di verificare che tutte le geofence area all'interno della richiesta di associazione con uno o più veicoli esistano o meno
*
*@param geofence -> array contenente gli id delle geofence area
*@param res -> risposta da parte del server
*@returns true se le geofence area esistono, false se non esistono
*
**/

export async function checkGeofenceArray(geofences: string[], res: any): Promise<boolean> {
    let result: any;
    let array: string[] = [];
    try {
        for (const element of geofences) {
            result = await Geofence.findByPk(element, { raw: true });
            if (result) {
                array.push(element)
            }
        }
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    if (geofences.length == array.length) return true; else return false;
}

/** 
*Funzione che permette di verificare che tutti i veicoli all'interno della richiesta di associazione con una o più geofence area esistano o meno
*
*@param vehicles -> array contenente le targhe dei veicoli
*@param res -> risposta da parte del server
*@returns true se i veicoli esistono, false se non esistono
*
**/

export async function checkVehicleArray(vehicles: string[], res: any): Promise<boolean> {
    let result: any;
    let array: string[] = [];
    try {
        for (const element of vehicles) {
            result = await Vehicle.findByPk(element, { raw: true });
            if (result) {
                array.push(element)
            }
        }
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    if (vehicles.length == array.length) return true; else return false;
}

/** 
*Funzione che permette di creare le associazioni geofence area - veicoli
*
*@param geofences -> id geofence area
*@param vehicles -> targhe veicoli
*@param res -> risposta da parte del server
*
**/


export function createGeofenceVehicle(geofences: string, vehicles: string, res: any): void {
    try {
        let geofencesArray = geofences.split(",");
        let vehiclesArray = vehicles.split(",");
        for (const g of geofencesArray) {
            for (const v of vehiclesArray) {
                Geofence_Vehicle.create({ license_plate: v, geofence_id: g })
            }
        }
        const new_res = new Success().getMsg();
        res.status(new_res.status).json({status:new_res.status, message:new_res.msg});      
    }
    catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
}

/** 
*Funzione che permette di verificare che un'associazione geofence area - veicolo esista 
*
*@param geofence_id -> id geofence
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*@returns true se geofence area esiste, false se non esiste
*
**/

export async function checkAssociation(geofence_id: string, license_plate: string, res: any): Promise<boolean> {
    let result: any;
    try {
        result = await Geofence_Vehicle.findOne({
            where: { geofence_id: geofence_id, license_plate: license_plate }
        });
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
    return result;
}

/** 
*Funzione che permette di eliminare un'associazione geofence area - veicolo 
*
*@param geofence_id -> id geofence
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*
**/

export function deleteGeofenceVehicle(geofence_id: string, license_plate: string, res: any): void {
    try {
        Geofence_Vehicle.destroy({ where: { license_plate: license_plate, geofence_id: geofence_id } }).then(() => {
        const new_res = new Success().getMsg();
        res.status(new_res.status).json({status:new_res.status, message:new_res.msg}); 
        })
    }
    catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }
}

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

export function sendPosition(license_plate: string, longitude: number, latitude: number, altitude: number, speed: number, res: any, next: any): void {
    const time = Date.now();
    Position.create({ vehicle_license_plate: license_plate, longitude: longitude, latitude: latitude, altitude: altitude, speed: speed, timestamp: time, point: { type: 'Point', coordinates: [longitude, latitude], crs: { type: 'name', properties: { name: 'EPSG:0' } } } })
        .catch((error) => {
            controllerErrors(ErrorEnum.ErrServer, error, res);
        })

    sequelizeQueries.queryContains(longitude, latitude)
        .then((result) => {
            if (result[0].length == 0) { 
                                const new_res = new Success().getMsg();
                                res.status(new_res.status).json({status:new_res.status, message:"The point is not present in any geofence", });
                                }
            else {
                for (let element of result[0]) {
                    Geofence_Vehicle.findAll({ where: { license_plate: license_plate, geofence_id: element.id }, raw: true })
                        .then((item) => {
                            if (item.length != 0) {
                                sequelizeQueries.getMaxSpeed(element.id).then((sp) => {
                                    if (sp[0][0].max_speed != null) {
                                        if (speed > sp[0][0].max_speed) { console.log("Maximum speed exceeded") }
                                    }
                                })

                                /*
                                *Se si trova la relazione tra veicolo e geofence area ed è già presente nella tabella "event" si richiama la funzione "queryEnterExit", 
                                *altrimenti si crea una nuova relazione nella tabella "event"                                
                                */

                                Event.findAll({ where: { license_plate: license_plate }, raw: true })
                                    .then((item) => {

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
                                            sequelizeQueries.queryEnterExit(license_plate).then((result) => {
                                                if (result[0][0].type == "Enter" || result[0][0].type == "Inside") {
                                                    if (result[0][0].geofence_id == element.id) {
                                                        Event.create({ license_plate: license_plate, geofence_id: element.id, timestamp: time, type: "Inside" })
                                                        const new_res = new Success().getMsg();
                                                        res.status(new_res.status).json({status:new_res.status, message:new_res.msg});
                                                    } else {
                                                        Event.create({ license_plate: license_plate, geofence_id: result[0][0].geofence_id, timestamp: time-1, type: "Exit" })
                                                        Event.create({ license_plate: license_plate, geofence_id: element.id, timestamp: time, type: "Enter" })
                                                        const new_res = new Success().getMsg();
                                                        res.status(new_res.status).json({status:new_res.status, message:new_res.msg});
                                                    }
                                                } else {
                                                    Event.create({ license_plate: license_plate, geofence_id: element.id, timestamp: time, type: "Enter" })
                                                    const new_res = new Success().getMsg();
                                                    res.status(new_res.status).json({status:new_res.status, message:new_res.msg});
                                                }
                                            })
                                        } else {
                                            Event.create({ license_plate: license_plate, geofence_id: element.id, timestamp: time, type: "Enter" })
                                            const new_res = new Success().getMsg();
                                            res.status(new_res.status).json({status:new_res.status, message:new_res.msg});
                                        }
                                   }
                                    )
                            } else { 
                                const new_res = new Success().getMsg();
                                res.status(new_res.status).json({status:new_res.status, message:"No associated geofences", }); }
                        })
                }
            }
        }
        ).catch((error) => {
            controllerErrors(ErrorEnum.ErrServer, error, res);
        })
}

/** 
*Funzione che permette di ricaricare il credito dell'utente
*
*@param email -> email utente
*@param token -> nuovo credito da inserire
*@param res -> risposta da parte del server
*
**/

export function refill(email: string, token: number, res: any): void {
    Users.update({ token: token }, { where: { email: email } })
    .then(()=>{
        const new_res = new Success().getMsg();
        res.status(new_res.status).json({status:new_res.status, message:new_res.msg});
    })
        .catch((error) => {
            controllerErrors(ErrorEnum.ErrServer, error, res);
        })
}

/** 
*Funzione che permette di aggiornare il credito dell'utente a causa dell'invio della posizione
*
*@param license_plate -> targa veicolo
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function updateToken(email: string, res: any, next: any) {
     getToken(email, res).then((token) => { Users.update({ token: token - 0.05 }, { where: { email: email }})}) 
        .catch((error) => {
            controllerErrors(ErrorEnum.ErrServer, error, res);
        })
    next()
}

/** 
*Funzione che consente di ritornare l’insieme delle posizioni di un veicolo in un dato intervallo temporale
*
*@param license_plate -> targa veicolo
*@param start -> data inizio intervallo
*@param end -> data fine intervallo
*@param res -> risposta da parte del server
*
**/

export function showPositions(license_plate: string, start: string, end: string, res: any): void {
    let newStart = Math.floor(new Date(start).getTime());
    let newEnd: any;

    if (end == "") {
        newEnd = Date.now()        
    } else {newEnd = Math.floor(new Date(end).getTime())};
    
    Position.findAll({ where: { vehicle_license_plate: license_plate, timestamp: { [Op.gt]: newStart, [Op.lt]: newEnd } }, raw: true })
        .then((items: any[]) => {
            let arrayPosition: any[] = [];

            for (let item of items) {
                let coordinates = JSON.parse(JSON.stringify(item));
                let newArray = [Number(coordinates.longitude), Number(coordinates.latitude)]
                arrayPosition.push(newArray);
            }

            let json: any[] = [];
            for (let element of arrayPosition) {
                let a = JSON.parse(JSON.stringify({
                    "type": "Point",
                    "coordinates": element
                }))
                const value = {
                    "type": "Feature",
                    "properties": {},
                    "geometry": a
                }
                json.push(value)
            }
            let geojson = {
                "type": "FeatureCollection",
                "features": json
            }
            res.send(geojson)
        }).catch((error) => {
            controllerErrors(ErrorEnum.ErrServer, error, res);
        })
}

/** 
*Funzione che consente di ritornare per ogni veicolo se questo si trova all’interno o all’esterno di una geofence area.
*Per i veicoli che sono all’interno della geofence viene ritornato anche il tempo di permanenza. 
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*
**/

export async function showVehicles(req: any, res: any) {
    try {
        let items: any[] = await Vehicle.findAll({ raw: true }) 
        let json: any[] = [];
        for (let item of items) {  
            let point: any[] = await sequelizeQueries.queryPoint(item.license_plate);
            if (point[0].length != 0) {  
                let geofence_id: any[] = await sequelizeQueries.queryCheckContains(point[0][0].point.coordinates)
                if (geofence_id[0].length != 0) {
                    let timestamp_vehicle: any[] = await sequelizeQueries.queryTimestamp(item.license_plate, geofence_id[0][0].id)                    
                    let a = JSON.parse(JSON.stringify({
                    "license_plate": item.license_plate,
                    "geofence_id": geofence_id[0][0].id,
                    "tempo di permanenza": ((Date.now() - timestamp_vehicle[0][0].timestamp) / 60000).toFixed(2) + " min"
                }))  
                json.push(a)
                } else {
                    let b = JSON.parse(JSON.stringify({
                        "license_plate": item.license_plate,
                        "geofence_id": ""
                    }))
                    json.push(b)
                }                  
            } else {
                let c = JSON.parse(JSON.stringify({
                    "license_plate": item.license_plate,
                    "geofence_id": ""
                }))
                json.push(c)
            }
        }
        res.send(json)

    } catch (error){
        controllerErrors(ErrorEnum.ErrServer, error, res);
    } 
}



/** 
*Funzione che permette di elencare l’insieme dei veicoli e delle geofence area a loro associate 
*(utente admin può ottenere elenco completo; un utente può vedere solo il proprio insieme di veicoli e geofence area associate).
*
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*
**/

export async function showAssociations(req: any, res: any) {
    try {
        if (await getRole(req.bearer.email, res) == "admin") {
            let all: any[] = await Geofence_Vehicle.findAll({
                raw: true, order: [
                    ['license_plate', 'ASC']
                ]
            })
            res.send(all)    
        } else {   
            let cf: any = await Users.findByPk(req.bearer.email, { raw: true })   
            let vehicles: any[] = await Vehicle.findAll({ where: { owner_cf: cf.cf }, raw: true })
    
            for (const element of vehicles) {
                let associations: any = await Geofence_Vehicle.findAll({ where: { license_plate: element.license_plate }, raw: true })
                res.write(JSON.stringify(associations))
            }
            res.end()
        }
    } catch (error) {
        controllerErrors(ErrorEnum.ErrServer, error, res);
    }  
}

/**
 * Funzione che viene richiamata dalle altre funzioni del Controller in caso di errori. 
 * 
 *@param enum_error -> enum che identifica il tipo di errore
 *@param err -> errore che si presenta
 *@param res -> risposta da parte del server
 *
 **/

function controllerErrors(enum_error: ErrorEnum, err: Error, res: any): void {
    const new_err = getError(enum_error).getMsg();
    console.log(err);
    res.status(new_err.status).json({error: new_err.status, message: new_err.msg});
}