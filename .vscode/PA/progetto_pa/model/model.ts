import { PostgresSingleton } from "../connection/connection";
import { DataTypes, Sequelize } from 'sequelize';

export const sequelize: Sequelize = PostgresSingleton.getConnection();

/** 
*Definizione dell'ORM attraverso "Sequelize" per l'interazione con il database
**/

export const Users = sequelize.define('users', {
    email: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        autoIncrement: true
    },
    cf: {
        type: DataTypes.STRING(100),
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    token: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        modelName: 'users',
        timestamps: false,
        freezeTableName: true
    });

export const Position = sequelize.define('position', {
    vehicle_license_plate: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    timestamp: {
        type: DataTypes.FLOAT,
        primaryKey: true
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    altitude: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    speed: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    point:{
        type: DataTypes.GEOMETRY

    }
},
    {
        modelName: 'position',
        freezeTableName: true,
        timestamps: false
    });

export const Vehicle = sequelize.define('vehicle', {
    license_plate: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    model: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    owner_cf: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},
    {
        modelName: 'vehicle',
        timestamps: false,
        freezeTableName: true
    });

export const Geofence = sequelize.define('geofence', {
    id: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        autoIncrement: true
    },
    coordinates: {
        type: DataTypes.GEOMETRY,
        allowNull: false
    },
    max_speed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
},
    {
        modelName: 'geofence',
        timestamps: false,
        freezeTableName: true
    });

export const Geofence_Vehicle = sequelize.define('geofence_vehicle', {
    license_plate: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    geofence_id: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
},
    {
        modelName: 'geofence_vehicle',
        timestamps: false,
        freezeTableName: true
    });

export const Event = sequelize.define('event', {
    license_plate: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    geofence_id: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    timestamp: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING(100),   //type può assumere i valori di "Enter" (il veicolo entra nella geofence area), "Inside" (il veicolo si trova ancora all'interno della geofence area) o "Exit" (il veicolo esce dalla geofence area)
        allowNull: false
    }

},
    {
        modelName: 'event',
        freezeTableName: true,
        timestamps: false
    });