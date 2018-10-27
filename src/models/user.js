const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'www.neo-patch.com',
    user: 'neopatch_inv_app',
    password: 'Semperfi1',
    database: 'neopatch_inventario',
    port: 3306
});

let userModel = {};

userModel.getUsers = (callback) => {
    if (connection) {
        connection.query(
            'SELECT * FROM users ORDER BY id',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        )
    }
};

userModel.insertUser = (userData, callback) => {
    if (connection) {
        connection.query(
            'INSERT INTO users SET ?', userData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId
                    })
                }
            }
        )
    }
};

userModel.updateUser = (userData, callback) => {
    if (connection) {
        const sql = `
            UPDATE users SET
            username = ${connection.escape(userData.username)},
            password = ${connection.escape(userData.password)}
            WHERE id = ${connection.escape(userData.id)}
        `

        connection.query(sql, (err, result) => {
            if (err) {
                console.log(sql);
                throw err;
            } else {
                callback(null, {
                    "msg": "success"
                });
            }
        })
    }
};

userModel.deleteUser = (id, callback) => {
    if (connection) {
        let sql = `
            SELECT * FROM users WHERE id = ${connection.escape(id)}
        `;

        connection.query(sql, (err, row) => {
            if (row) {
                let sql = `
                    DELETE FROM users WHERE id = ${id}
                `;
                connection.query(sql, (err, res) => {
                    if (err) {
                        throw (err);
                    } else {
                        callback(null, {
                            msg: 'eliminado'
                        })
                    }
                })
            } else {
                callback(null, {
                    msg: 'No existe usuario'
                })
            }
        })
    }
}

module.exports = userModel;