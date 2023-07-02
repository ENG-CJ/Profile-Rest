const mysql=require('mysql2');


const conn= ()=>{
   var mysqlConnection = mysql.createConnection({
     host: process.env.DB_HOST,
     user: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     connectionLimit: 1000,
     connectTimeout: 30000
    
   });

return mysqlConnection ;
}


module.exports.getConnection=conn;