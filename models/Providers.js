module.exports = function (sequelize, DataTypes) {
  var Providers = sequelize.define('Providers', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    experience: {
      type: DataTypes.INTEGER, // We need to convert the years inserted by the user to months
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Employee'
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    photoLink: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        // Need to make sure it's a link
      }
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
    tableName: 'Providers',
    paranoid: true
    
  });
  
  Providers.associate = function(models) {

        // Associating Providers with Services
    // When a Provider  is deleted, also delete any associated Services
    Providers.hasMany(models.Services, {
      // as: 'provider_id',
      onDelete: "cascade"
    });
    
    Providers.hasMany(models.Schedules, {

    });
    

  };
  return Providers;
};

