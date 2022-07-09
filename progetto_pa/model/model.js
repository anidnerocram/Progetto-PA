"use strict";
exports.__esModule = true;
exports.Event = exports.Geofence_Vehicle = exports.Geofence = exports.Vehicle = exports.Position = exports.Users = exports.sequelize = void 0;
var connection_1 = require("../connection/connection");
var sequelize_1 = require("sequelize");
exports.sequelize = connection_1.PostgresSingleton.getConnection();
/**
*Definizione dell'ORM attraverso "Sequelize" per l'interazione con il database
**/
exports.Users = exports.sequelize.define('users', {
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true,
        autoIncrement: true
    },
    cf: {
        type: sequelize_1.DataTypes.STRING(100),
        unique: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    surname: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    token: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'users',
    timestamps: false,
    freezeTableName: true
});
exports.Position = exports.sequelize.define('position', {
    vehicle_license_plate: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true
    },
    timestamp: {
        type: sequelize_1.DataTypes.FLOAT,
        primaryKey: true
    },
    latitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    longitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    altitude: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    speed: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    point: {
        type: sequelize_1.DataTypes.GEOMETRY
    }
}, {
    modelName: 'position',
    freezeTableName: true,
    timestamps: false
});
exports.Vehicle = exports.sequelize.define('vehicle', {
    license_plate: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true,
        autoIncrement: true
    },
    brand: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    model: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    owner_cf: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    modelName: 'vehicle',
    timestamps: false,
    freezeTableName: true
});
exports.Geofence = exports.sequelize.define('geofence', {
    id: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true,
        autoIncrement: true
    },
    coordinates: {
        type: sequelize_1.DataTypes.GEOMETRY,
        allowNull: false
    },
    max_speed: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    modelName: 'geofence',
    timestamps: false,
    freezeTableName: true
});
exports.Geofence_Vehicle = exports.sequelize.define('geofence_vehicle', {
    license_plate: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true
    },
    geofence_id: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true
    }
}, {
    modelName: 'geofence_vehicle',
    timestamps: false,
    freezeTableName: true
});
exports.Event = exports.sequelize.define('event', {
    license_plate: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true
    },
    geofence_id: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true
    },
    timestamp: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    modelName: 'event',
    freezeTableName: true,
    timestamps: false
});
