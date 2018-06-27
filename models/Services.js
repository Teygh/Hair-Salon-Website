module.exports = function (sequelize, DataTypes)  {
  var Services = sequelize.define('Services', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    }, 

    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    duration: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    price: {
      type: DataTypes.DECIMAL, // We need it to show a Dollar Sign on the webpage
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },

    photolinks: {
      type: DataTypes.STRING, // We need t ohave data type array here since we are going to have many links to images. (Ask DAN!)
      allowNull: true,

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
    tableName: 'Services',
    paranoid: true,
    // underscored: true,
  });

  Services.associate = function (models) {
    //The services belong to Providers
    //We can not have  a  Service  without having a Provider.

    Services.belongsTo(models.Providers, {
      // as: 'provider_id',
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Services;
};