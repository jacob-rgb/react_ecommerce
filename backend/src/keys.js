module.exports = {
    database: {
       host: 'localhost',
       user: 'root',
       password: process.env.DATABASE_PASS_DEV,
       database: 'react_commerce'
    },
    databaseProd: {
       host: 'byug8iiz4vaqneehmfvw-mysql.services.clever-cloud.com',
       user: 'uqxitgv9dkmzoqiy',
       password: process.env.DATABASE_PASS_PROD,
       database: 'byug8iiz4vaqneehmfvw'
    }
}