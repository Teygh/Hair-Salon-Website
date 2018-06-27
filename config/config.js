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
    "username": "jnbvs30ub7p1zpn0",
    "password": "bxuf4tvcrh4gi9kl",
    "database": "yviehaflh0ltlud9",
    "host": "wm63be5w8m7gs25a.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
}
