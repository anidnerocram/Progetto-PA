import * as jwt from 'jsonwebtoken';
import * as Controller from '../controller/controller';
import * as is_valid_coordinates from 'is-valid-coordinates';
import {ErrorEnum, getError} from '../factory/factory';
import * as dotenv from'dotenv'
import { Users } from '../model/model';

/**
*Funzione che controlla la presenza dell'header nella richiesta
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkHeader (req:any, res:any, next:any){
  const authHeader = req.headers.authorization;
  if (authHeader) {
      next();
  }else{
      next(ErrorEnum.ErrTokenHeader);
  }
}

/**
*Funzione che controlla la presenza del JWT nella richiesta
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkToken(req: any, res: any, next: any) {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1]; 
    req.token = bearerToken;
    next();
  } else {
    next(ErrorEnum.MissingToken);
  }
}

/**
*Funzione che controlla se nel JWT è stata utilizzata una chiave che corrisponda a quella presente nel file dove sono contenute le variabili di ambiente
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function verifyAndAuthenticate(req: any, res: any, next: any) {
  let decoded = jwt.verify(req.token, process.env.SECRET_KEY); 
  if (decoded !== null)
    req.bearer = decoded;
  next();
}

/**
*Funzione che controlla se nella richiesta è presente un payload JSON ben formato
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkJSONPayload(req: any, res: any, next: any): void {
  try {
    req.body = JSON.parse(JSON.stringify(req.body));
    next();
  } catch (error) {
    next(ErrorEnum.MalformedPayload)
  }
}

/**
*Funzione utilizzata per verificare il content-type 
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkPayloadHeader(req: any, res: any, next: any): void {
  if (req.headers["content-type"] == "application/json") { console.log("This is req " + req.content); next(); }
  else next(ErrorEnum.ErrPayloadHeader);
  console.log(req.headers)
}

/**
*Funzione utilizzata per le rotte inesistenti
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function routeNotFound(req: any, res: any, next: any){
  next(ErrorEnum.ErrRouteNotFound);
}

/**
*Funzione utilizzata per loggare gli errori
* 
*@param err -> errore
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function logErrors(err: any, req: any, res: any, next: any) {
  const new_err = getError(err).getMsg();
  console.log(new_err);
  next(new_err);  
}

/**
*Funzione che si occupa di ritornare lo stato e il messaggio di errore
* 
*@param err -> errore
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function errorHandler(err: any, req: any, res: any, next: any) {
  res.status(err.status).json({error: err.status, message: err.msg});
}

/**
*Funzione che si occupa di controllare se l'utente nella richiesta sia effettivamente admin
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkAdmin(req: any, res: any, next: any): void {
  Controller.checkUser(req.bearer.req_email, res).then((user) => {
    if (user) {
      Controller.getRole(req.bearer.req_email, res).then((role: string) => {
        if (role == 'admin') next()
        else next(ErrorEnum.ErrNotAdmin);
      });
    } else next(ErrorEnum.ErrCheckAdmin);
  });
}

/**
*Funzione che si occupa di controllare se l'utente nella richiesta abbia associato un veicolo o meno
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkOnwner_cf(req: any, res: any, next: any): void {
  Controller.checkUserCf(req.body.owner_cf, res).then((owner_cf) => {
    if (owner_cf) next()
    else next(ErrorEnum.ErrOwner);
  })
}

/**
*Funzione che si occupa di controllare se l'utente nella richiesta esista o meno
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkUserExist(req: any, res: any, next: any): void {
  Controller.checkUser(req.bearer.email, res).then((email) => {
    if (email) next()
    else next(ErrorEnum.ErrUser);
  })
}

/**
*Funzione uguale a quella soprastante, cambia solo il fatto di prendere l'email non dal token ma dal body della richiesta. 
*Viene utilizzata solamente dalla rotta refill che necessita il controllo sull'email dell'utente da ricaricare.
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkUserExistRefill(req: any, res: any, next: any): void {
  Controller.checkUser(req.body.email, res).then((email) => {
    if (email) next()
    else next(ErrorEnum.ErrUser);
  })
}

/**
*Funzione che si occupa di controllare se il veicolo nella richiesta esista o meno
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkVehicleExist(req: any, res: any, next: any): void {
  Controller.checkVehicle(req.body.license_plate, res).then((license_plate) => {
    if (license_plate) next()
    else next(ErrorEnum.ErrVehicle);
  })
}

/**
*Funzione che si occupa di controllare se la geofence area nella richiesta esista o meno
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkGeofenceExist(req: any, res: any, next: any): void {
  Controller.checkGeofence(req.body.geofence_id, res).then((geofence_id) => {
    if (geofence_id) next()
    else next(ErrorEnum.ErrGeofenceArea);
  })
}

/**
*Funzione che si occupa di controllare se tutti i veicoli nella richiesta esistano o meno
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkVehicleArrayExist(req: any, res: any, next: any): void {
  let vehiclesArray = req.body.vehicles.split(",");
  Controller.checkVehicleArray(vehiclesArray, res).then((item) => {
    if (item) next()
    else next(ErrorEnum.ErrVehicle)
  })
}

/**
*Funzione che si occupa di controllare se tutte le geofence area nella richiesta esistano o meno
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkGeofenceArrayExist(req: any, res: any, next: any): void {
  let geofencesArray = req.body.geofences.split(",");
  Controller.checkGeofenceArray(geofencesArray, res).then((item) => {
    if (item) next()
    else next(ErrorEnum.ErrGeofenceArea)
  })
}

/**
*Funzione che si occupa di controllare se l'associazione geofence area - veicolo nella richiesta esista o meno
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkAssociationExist(req: any, res: any, next: any): void {
  Controller.checkAssociation(req.body.geofence_id, req.body.license_plate, res).then((element) => {
    if (element) next()
    else next(ErrorEnum.ErrAssociation);
  })
}

/**
*Funzione che si occupa di controllare se i valori inviati come posizione del veicoli siano ammissibili o meno
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkPosition(req: any, res: any, next: any): void {
  if (is_valid_coordinates(req.body.longitude, req.body.latitude)) {
    if (req.body.speed > 0 && req.body.speed <= 130) {
      if (req.body.altitude >= 0 && req.body.altitude <= 8000) {
        next()
      } else next(ErrorEnum.ErrPosition);
    } else next(ErrorEnum.ErrPosition);
  } else next(ErrorEnum.ErrPosition);
}

/**
*Funzione che si occupa di controllare se l'utente che effettua una richiesta abbia token sufficienti
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkRemainingToken(req: any, res: any, next: any): void {
  Controller.getToken(req.bearer.email, res).
    then((token) => {
      console.log(token);
      if (token >= 0.05) next()
      else next(ErrorEnum.ErrInsufficientToken)
    })
  }


/**
*Funzione che si occupa di controllare se l'utente che effettua una richiesta abbia token sufficienti. 
*Questa funzione è una variante di quella soprastante e viene usata solamente per la rotta "sendPosition".
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export function checkRemainingTokenPosition(req: any, res: any, next: any): void {
  Controller.getOwnerCf(req.body.license_plate, res).then((item) => {
    Controller.getTokenCf(item, res).
    then((token) => {
      if (token >= 0.05) next()
      else next(ErrorEnum.ErrInsufficientToken)
    })
  })
}

/**
*Funzione che si occupa di controllare se l'utente che effettua una richiesta è associato al veicolo. 
* 
*@param req -> richiesta del client
*@param res -> risposta da parte del server
*@param next -> riferimento al middleware successivo
*
**/

export async function checkOwnerVehicle(req: any, res: any, next: any){
  let user: any = await Users.findByPk(req.bearer.email,{raw:true})
    let owner = await Controller.getOwnerCf(req.body.license_plate,res)
    if(user.cf==owner ) next(); 
    else{
      next(ErrorEnum.ErrUserNotOwner)

    }
}
  


