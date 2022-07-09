# Progetto Programmazione Avanzata 2022 Ciavarella, Rendina
## Obiettivo del progetto
Il sistema back-end consente di gestire un insieme di veicoli che sono tracciati mediante localizzatore GPS. 
In particolare, il sistema permette di effettuare chiamate per:
* Creare delle geofence areas
* Creare un veicolo
* Associare una o più geo-fence areas ad uno o più veicoli
* Disassociare una geofence area ad un veicolo
* Elencare le associazioni tra veicoli e geofence areas
* Inviare dati istantanei del veicolo
* Elencare per ogni veicolo le geofence areas in cui si trova e il tempo di permanenza
* Elencare le posizioni di un veicolo in un determinato intervallo temporale
* Restituire il credito residuo di un utente
* Ricaricare il credito di un utente


Le chiamate vengono gestite tramite richieste HTTP(GET o POST) e in alcuni casi viene richiesta l'autenticazione tramite JWT
vedere meglio c
## Chiamate
### /create-geofence
La richeista può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
Viene gestita tramite richiesta POST.
La geofence area viene rappresentata come un poligono in un file GEOJSON e per definirla un vettore di coordiante dei punti del poligono viene passato nella richiesta.
```json
{
"id": "geo4",
"coordinates": [
          [
            [
              15.72763681411743,
              41.69989708362879
            ],
            [
              15.73362350463867,
              41.701707447298666
            ],
            [
              15.730662345886229,
              41.70471926684249
            ],
            [
              15.725598335266113,
              41.704350807131654
            ],
            [
              15.724890232086182,
              41.70212398393942
            ],
            [
              15.72763681411743,
              41.69989708362879
            ]
          ]
        ],
"max_speed": 30
}
```
### /create-vehicle
La richeista può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
Viene gestita tramite richiesta POST. Nel body della richiesta vengono inserite le informazioni del veicolo. Tra queste anche
l'utente a cui è associato il veicolo.
```json
{
"license_plate": "TR4",
"brand": "Toyota",
"model": "RAV4",
"owner_cf": "MHLCVR97"
}
```

### /create-geofences_vehicles
La richeista può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
Viene gestita tramite richiesta POST. Nella richiesta possono essere inseriti più veicoli e geofence contemporaneamente.
```json
{
    "geofences": "geo1,geo3",
    "vehicles": "FF,OA"
}
```
### /delete-geofence_vehicle
La richeista può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
Viene gestita tramite richiesta POST. Per eliminare un'associazione si inserisce l'id della geofence area e la license_plate
del veicolo.
```json
{
    "geofence_id":"geo2",
    "license_plate":"FF"
}
```
### /show-associations
La richeista può essere eseguita sia da un admin che da un utente ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email.
Viene gestita tramite richiesta POST. In particolare, l'adim ha la possibilità di ottenre l'elenco completo di tutte le associazioni,
mentre l'utente può vedere solo il proprio insieme di veicoli e geo-fence area associate.

### /send-position
La richeista può essere eseguita da un utente ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email.
Viene gestita tramite richiesta POST. Questa richiesta permette all'utente di inviare la posizione istantenea del prorpio veicolo.
Nel body vengono inseriti diversi dati, come la longitudine latitudine e altitudine, la velocità, l'istante di tempo. 
```json
{
    "license_plate":"FP",
    "longitude":15.633673667907717,
    "latitude":41.711703581962624,
    "altitude":12,
    "speed": 47
}
```
### /show-vehicles
La richeista può essere eseguita da un qualsiasi utente, pertanto non è richiesta l'autenticazione tramite JWT.
Viene gestita tramite richiesta GET. Questa richiesta permette di ritornare per ogni veicolo se questo si trova all’interno 
o all’esterno di una geo-fence area. 
Per i veicoli che sono all’interno della geo-fence area ritornare anche il tempo di permanenza. 
### /show-position
La richeista può essere eseguita da un qualsiasi utente, pertanto non è richiesta l'autenticazione tramite JWT.
Viene gestita tramite richiesta GET. Questa richeista ritorna l’insieme delle posizioni di un veicolo in un dato intervallo temporale, 
l’utente può specificare la data di inizio ed opzionalmente la data di fine.

### /show-token
La richeista può essere eseguita da un utente ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email.
Viene gestita tramite richiesta POST. Questa richiesta restituisce il credito residuo di un utente.

### /refill
La richeista può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
Viene gestita tramite richiesta POST. Questa richiesta permette di ricaricare il credito di un utente.
```json
{
    "email":"dario@email.com",
    "token":20
}
```
