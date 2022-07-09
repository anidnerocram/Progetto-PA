import * as express from 'express';
import * as Controller from '../controller/controller';
import * as Middleware_CoR from '../middleware/middleware_CoR';
import * as Middleware from '../middleware/middleware';

const app = express();
app.use(express.json());
app.get('/', function (req:any, res:any){
    res.send("Homepage")
})

/*
*Rotta per la creazione di un veicolo
*/

app.post('/create-vehicle', Middleware_CoR.authentication, Middleware_CoR.create_vehicle, Middleware_CoR.catchError, function (req: any, res: any) {
    Controller.createVehicle(req.body, res);
});

/*
*Rotta per la creazione di una geofence area
*/

app.post('/create-geofence', Middleware_CoR.authentication, Middleware_CoR.create_geofence, Middleware_CoR.catchError, function (req: any, res: any) {
    Controller.createGeofence(req.body, res);
});

/*
*Rotta per associare una o più geo-fence areas ad uno o più veicoli
*/

app.post('/create-geofences_vehicles', Middleware_CoR.authentication, Middleware_CoR.create_geofences_vehicles, Middleware_CoR.catchError, function (req: any, res: any) {
    Controller.createGeofenceVehicle(req.body.geofences, req.body.vehicles, res)
});

/*
*Rotta per disassociare una geofence area ad un veicolo
*/

app.post('/delete-geofence_vehicle', Middleware_CoR.authentication, Middleware_CoR.delete_association, Middleware_CoR.catchError, function (req: any, res: any) {
    Controller.deleteGeofenceVehicle(req.body.geofence_id, req.body.license_plate, res)
});

/*
*Rotta per elencare l’insieme dei veicoli e delle geofence area a loro associate
*/

app.post('/show-associations', Middleware_CoR.authentication, Middleware_CoR.showAssociations, Middleware_CoR.catchError,function(req:any,res:any){Controller.showAssociations(req,res)});

/*
*Rotta per inviare i dati instantanei di posizione, velocità e timestamp
*/

app.post('/send-position', Middleware_CoR.authentication, Middleware_CoR.sendPosition, Middleware_CoR.catchError, function (req: any, res: any, next: any) {
    Controller.updateToken(req.bearer.email, res, next)
}, function (req: any, res: any, next:any) {
    Controller.sendPosition(req.body.license_plate, req.body.longitude, req.body.latitude, req.body.altitude, req.body.speed, res, next)
});

/*
*Rotta che consente di ritornare per ogni veicolo se questo si trova all’interno o all’esterno di una geofence area
*/

app.get('/show-vehicles', function(req:any, res:any){Controller.showVehicles(req,res)});  // no jwt

/*
*Rotta che consente di ritornare l’insieme delle posizioni di un veicolo in un dato intervallo temporale
*/

app.get('/show-position', Middleware_CoR.noAuthentication, Middleware_CoR.showPosition, Middleware_CoR.catchError, function (req: any, res: any) {
    Controller.showPositions(req.body.license_plate, req.body.start, req.body.end, res)
});  //no jwt

/*
*Rotta che consente di ritornare i token rimanenti di un utente
*/

app.post('/show-token', Middleware_CoR.authentication, Middleware_CoR.showToken, Middleware_CoR.catchError, function (req: any, res: any) {
    Controller.showToken(req.bearer.email, res)
});

/*
*Rotta che consente di ricaricare i token di un utente
*/

app.post('/refill', Middleware_CoR.authentication, Middleware_CoR.refill, Middleware_CoR.catchError, function (req: any, res: any) {
    Controller.refill(req.body.email, req.body.token, res)
});

/*
Rotte non esistenti
*/

app.get('*', Middleware.routeNotFound, Middleware_CoR.catchError);
app.post('*', Middleware.routeNotFound, Middleware_CoR.catchError);

app.listen(3000);