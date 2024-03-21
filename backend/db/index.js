const Pool = require('pg').Pool;
const pool = new Pool({
    user: '21CS30027',
    host: '10.5.18.70',
    database: '21CS30027',
    password: 'monuammu',
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params);
    },
};