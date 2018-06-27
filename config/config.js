module.exports =  {
  "development": {
    "username": "root",
    "password": process.env.MYSQL_PW,
    "database": "hairsalon_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "liu3ynu8r8jwh8d0",
    "password": "e6v45bd0cxyz7njn",
    "database": "pjwm8cr2mcho4tfa",
    "host": "q57yawiwmnaw13d2.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
}
