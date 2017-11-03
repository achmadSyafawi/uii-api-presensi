const Promise = require('bluebird');

function formatOutput(data, res) {
    return res.json(data);
}

function createUser(app, user, auth) {
    app.get('/users', (req, res) => {
        // user.viewAllUsers(data => {
        //     return formatOutput(data, res);
        // })
        user
            .viewAllUsers()
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });

    app.post('/user', (req, res) => {
        Promise.all([
            user.createUser(req.body.nidn),
            auth.createAuth(req.body.nidn),
        ])
            .spread(() => res.json({ message: 'sukses' }))
            .catch(err => formatOutput(err, res));
    });

    app.get('/user/:id', (req, res) => {
        user
            .getUser(req.params.id)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });

    app.put('/user/:id', (req, res) => {
        const data = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        };
        user
            .updateUser(req.params.id, data)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });

    app.delete('/user/:id', (req, res) => {
        user
            .delUser(req.params.id)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });

    app.post('/user/:nidn/savePassword', (req, res) => {
        Promise.all([
            user.makePassword(req.params.nidn, req.body.password),
            auth.verified(req.params.nidn),
        ])
            .spread(() => res.json({ message: 'verified' }))
            .catch(err => formatOutput(err, res));
    });
}

module.exports = createUser;
