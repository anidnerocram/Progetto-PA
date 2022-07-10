# Progetto Programmazione Avanzata 2022 Ciavarella, Rendina
## Obiettivo del progetto
Il sistema back-end consente di gestire un insieme di veicoli che sono tracciati mediante localizzatore GPS. 
In particolare, il sistema permette di effettuare chiamate per:
* Creare delle geofence area
* Creare un veicolo
* Associare una o più geofence area ad uno o più veicoli
* Disassociare una geofence area ad un veicolo
* Elencare le associazioni tra veicoli e geofence area
* Inviare dati istantanei del veicolo
* Elencare per ogni veicolo le geofence area in cui si trova e il tempo di permanenza
* Elencare le posizioni di un veicolo in un determinato intervallo temporale
* Restituire il credito residuo di un utente
* Ricaricare il credito di un utente


Le chiamate vengono gestite tramite richieste HTTP (GET o POST) e in alcuni casi viene richiesta l'autenticazione tramite JWT.
## Use case diagram
![Use case diagram](https://user-images.githubusercontent.com/67785591/178142813-887db6fc-0384-41d6-b30b-06ebf18a582a.png)
## Rotte
### /create-geofence
La richiesta può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
Viene gestita tramite richiesta POST.
La geofence area viene rappresentata come un poligono in un file GEOJSON e per definirla un vettore di coordinate dei punti del poligono viene passato nella richiesta.
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
![Sequence diagram-createGeofence](https://user-images.githubusercontent.com/67785591/178141699-ebafa502-bff1-4a21-a1d8-6e9ba81cbc2e.png)

### /create-vehicle
La richiesta può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
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
![Sequence diagram-createvehicle](https://user-images.githubusercontent.com/67785591/178141751-c63177fa-f90a-4688-a640-d129be08c1fc.png)

### /create-geofences_vehicles
La richiesta può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
Viene gestita tramite richiesta POST. Nella richiesta possono essere inseriti più veicoli e geofence contemporaneamente.
```json
{
    "geofences": "geo1,geo3",
    "vehicles": "FF,OA"
}
```
![Sequence diagram-creategeofencevehicles](https://user-images.githubusercontent.com/67785591/178141828-0ae61da5-7a4b-49d2-99e9-aa380d06435b.png)

### /delete-geofence_vehicle
La richiesta può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
Viene gestita tramite richiesta POST. Per eliminare un'associazione si inserisce l'id della geofence area e la license_plate del veicolo.
```json
{
    "geofence_id":"geo1",
    "license_plate":"FF"
}
```
![Sequence diagram-deleteGeofenceVehicle-1](https://user-images.githubusercontent.com/67785591/178141849-cab9c6bc-602a-42e2-9f86-710388bdc36d.png)
![Sequence diagram-deleteGeofenceVehicle-2](https://user-images.githubusercontent.com/67785591/178141851-0e0bac60-0cbf-4dca-a718-a0aa0d9cdc51.png)

### /show-associations
La richiesta può essere eseguita sia da un admin che da un utente ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email.
Viene gestita tramite richiesta POST. In particolare, l'admin ha la possibilità di ottenre l'elenco completo di tutte le associazioni,
mentre l'utente può vedere solo il proprio insieme di veicoli e geofence area associate.


![Sequence diagram-shoAssociations](https://user-images.githubusercontent.com/67785591/178141915-a24b1679-5b67-4378-90e2-650656a1f493.png)
Caso utente:


![Sequence diagram-showAssociation2-user](https://user-images.githubusercontent.com/67785591/178141924-04ebb81b-bea0-4035-9ae1-677955bb2434.png)
Caso admin:


![Sequence diagram-showAssociation2-admin](https://user-images.githubusercontent.com/67785591/178141927-1ccd6eb4-1459-470a-b17c-96d2131ccb09.png)

### /send-position
La richiesta può essere eseguita da un utente ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email.
Viene gestita tramite richiesta POST. Questa richiesta permette all'utente di inviare la posizione istantenea del proprio veicolo.
Nel body vengono inseriti diversi dati, ossia la longitudine, la latitudine, l'altitudine e la velocità.
Successivamente viene verificato se i dati di posizione inviati per quel veicolo rientrano all’interno di una geofence area. Nel caso in cui l’utente entra in una geofence area ad esso associata questo evento deve essere memorizzato. Stessa situazione per quanto riguarda l’uscita da una geofence area.
Deve essere eventualmente verificato anche se la velocità all’interno della geo-fence area è superiore a quella consentita.
Ad ogni utente è associato un credito. Per ogni invio di dati deve essere scalato un credito pari a 0.05 token.
```json
{
    "license_plate":"FP",
    "longitude":15.633673667907717,
    "latitude":41.711703581962624,
    "altitude":12,
    "speed": 47
}
```
![Sequence diagram-sendPosition1](https://user-images.githubusercontent.com/67785591/178142103-b0eba0ae-0a10-4a24-8b91-18916a283726.png)
![Sequence diagram-sendPositions2](https://user-images.githubusercontent.com/67785591/178142108-dd7a79de-449e-4e13-ad43-71d6b0dad6c0.png)

### /show-vehicles
La richiesta può essere eseguita da un qualsiasi utente, pertanto non è richiesta l'autenticazione tramite JWT.
Viene gestita tramite richiesta GET. Questa richiesta permette di ritornare per ogni veicolo se questo si trova all’interno o all’esterno di una geofence area. 
Per i veicoli che sono all’interno della geofence area ritornare anche il tempo di permanenza.


![Sequence diagram-showVehicles](https://user-images.githubusercontent.com/67785591/178142722-647f5175-a18e-4a9e-b1dd-3207dc3b5984.png)

### /show-position
La richiesta può essere eseguita da un qualsiasi utente, pertanto non è richiesta l'autenticazione tramite JWT.
Viene gestita tramite richiesta GET. Questa richeista ritorna l’insieme delle posizioni di un veicolo in un dato intervallo temporale, l’utente può specificare la data di inizio ed opzionalmente la data di fine.


![Sequence diagram-showPositions](https://user-images.githubusercontent.com/67785591/178142734-517c5563-aae0-4f79-b951-bd30cb83d167.png)

### /show-token
La richiesta può essere eseguita da un utente ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email. Viene gestita tramite richiesta POST. Questa richiesta restituisce il credito residuo di un utente.


![Sequence diagram-showToken(1)](https://user-images.githubusercontent.com/67785591/178142754-137a1326-6b49-4182-913d-1105d4766299.png)

### /refill
La richiesta può essere eseguita solo da admin ed è necessaria l'autenticazione tramite JWT, in cui viene specificata l'email dell'admin.
Viene gestita tramite richiesta POST. Questa richiesta permette di ricaricare il credito di un utente.
```json
{
    "email":"dario@email.com",
    "token":20
}
```
![Sequence diagram-refill](https://user-images.githubusercontent.com/67785591/178142776-8c911b72-2336-4b96-ad21-1538d9407fcc.png)

## Pattern utilizzati

### Singleton

Il “Singleton” è un creational pattern che garantisce che ci sia una sola istanza di una classe e fornisce un punto di accesso globale a tale istanza. In questo progetto è stato necessario il suo utilizzo per poter creare una sola connessione al database. 

### Factory

Il “Factory method” è un creational pattern che descrive un approccio di programmazione con il quale creare oggetti senza bisogno di dover specificare la loro classe. Ciò permette di cambiare comodamente e in maniera flessibile l’oggetto creato. In questo progetto è stato utilizzato per gestire in maniera efficiente la creazione dei messaggi in caso di errore.

### Chain of Responsability 

Chain of Responsability è un Catena di responsabilità è behavioral design pattern che consente di trasmettere le richieste lungo una catena di gestori delle stesse. Alla ricezione di una richiesta, ciascun gestore decide di elaborare la richiesta o di passarla al successivo anello della catena. Il vantaggio è che, in caso di errore, il flusso di esecuzione si interrompe.
Per il nostro progetto questo pattern, che è stato utilizzando insieme alle funzionalità del middleware, è stato utile per la validazione delle richieste e per la gestione degli errori.

## Avvio del progetto

Per avviare la demo dell’applicazione è necessaria l’installazione di Docker.
Dopo aver clonato il repository sulla propria macchina e dopo aver avviato Docker bisogna posizionarsi nella cartella che ospita il file docker-compose.yml. A questo punto digitare: docker-compose up
### Testing
È possibile effettuare dei test predefiniti del progetto importando all’interno di Postman la collection situata all'interno di questa repository. I token JWT sono stati generati utilizzando [jwt.io](https://jwt.io/), tramite la chiave “qwertyuiopasdfghjklzxcvbnm123456”.
## Software utilizzati
* [Visual Studio Code](https://code.visualstudio.com/)
* [Docker](https://www.docker.com/)
* [Postman](https://www.postman.com/)
## Librerie e Framework
* [NodeJs](https://nodejs.org/it/)
* [Sequelize](https://sequelize.org/)
* [Postgis](https://postgis.net/)
* [Express](https://expressjs.com/it/)

