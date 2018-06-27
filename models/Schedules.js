module.exports = function (sequelize, DataTypes) {
  var Schedules = sequelize.define('Schedules', {

    startTime: {

      type: DataTypes.DATE,
      allowNull: false,
    },

    endTime: {

      type: DataTypes.DATE,
      allowNull: false,
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
    tableName: 'Schedules',
    paranoid: true,
    // underscored: true,

  });
  Schedules.associate = function (models) {

        // Schedules belongs to Providers
        Schedules.belongsTo(models.Providers, {
          foreignKey: {
            allowNull: false
          }
        });
    

        
        Schedules.hasMany(models.Appointments, {

        });
    
    
   

  };
  return Schedules;
};

 