// var Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  var Appointments = sequelize.define('Appointments', {

    appointStart: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: true,
      }

    },
    appointEnd: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
      }
    },

    duration: {
      type: DataTypes.TIME,

    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    'createdAt': {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
    },
    'updatedAt': {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.NOW,
    },
  }, {
    timestamps: true,
    tableName: 'Appointments',
    paranoid: true
  });
  Appointments.associate = models => {

    Appointments.belongsTo(models.Customers,{
      foreignKey : {
        allowNull : false
      }
    });

    Appointments.belongsTo(models.Providers,{
      foreignKey : {
        allowNull : false
      }
    });      
    Appointments.belongsTo(models.Schedules,{
      foreignKey : {
        allowNull : false
      }
    });
      
    };
  return Appointments;
 
};


