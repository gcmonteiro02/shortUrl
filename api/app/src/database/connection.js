const knex = require('knex');

const connection = knex({
    client: 'mysql',
    connection: {
            host: 'shorturl_mysqldb_1',
            user: 'root',
            password: '12345678',
            database: 'shorturl',
            port: 3306
    },
    pool: { min: 0, max: 50 }
});

module.exports = connection;