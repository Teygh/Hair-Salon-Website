module.exports = function (sequelize, DataTypes) {
  var Customers = sequelize.define('Customers', {

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true
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
    userType :{
      type: DataTypes.STRING,
      defaultValue: 'customer'
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
    tableName: 'Customers',
    paranoid: true
    
  });
  
  Customers.associate = function (models) {
    // Providers has many Services
    Customers.hasMany(models.Appointments, {
      
    });

    //I dont see how customers should belong to anything
    // Customers.belongsToMany(models.Providers, {as: "Client",  through: 'Appointments' });

  };
  return Customers;
};