const mysql=require('mysql2');


const conn= ()=>{
   var mysqlConnection= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "profiles"
})

return mysqlConnection ;
}


module.exports.getConnection=conn;