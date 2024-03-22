const Pool = require('pg').Pool;
const pool = new Pool({
    user: '21CS30027',
    host: '10.5.18.70',
    database: '21CS30027',
    password: 'monuammu'
});

// pool.query('SET search_path TO studynest', (err, result) => {
//     if (err) {
//         console.error('Error setting search_path:', err);
//     } else {
//         console.log('search_path set successfully');
//         // Now you can execute queries with the desired search_path
//     }
// })

module.exports = {
    query: (text, params) => {
        return pool.query(text, params);
    },
};