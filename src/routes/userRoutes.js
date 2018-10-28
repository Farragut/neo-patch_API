const User = require('../models/user');


module.exports = function(app) {
    app.get('/users', (req, res) => {
        User.getUsers((err, data) => {
            res.status(200).json(data);
        });
    });

    app.get('/users/:username', (req, res) => {
        const userData = {
            username: req.params.username
        };
        User.getSelectedUser(userData, (err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/users', (req, res) => {
        const userData = {
            id: null,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10)
        };

        User.insertUser(userData, (err, data) => {
            if (data && data.insertId) {
                res.json({
                    success: true,
                    msg: 'Usario Insertado',
                    data: data
                })
            } else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });

    app.put('/users/:id', (req, res) => {
        const userData = {
            id: req.params.id,
            username: req.body.username,
            password: req.body.password
        };
        User.updateUser(userData, (err, data) => {
            if (data && data.msg) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: 'error'
                })
            }
        })
    });

    app.delete('/users/:id', (req, res) => {
        User.deleteUser(req.params.id, (err, data) => {
            if (data && data.msg === 'eliminado' || data.msg === 'No existe usuario') {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: 'Error'
                })
            }
        })
    });

}