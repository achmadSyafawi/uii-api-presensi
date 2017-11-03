function formatOutput(data, res) {
    return res.json({
        message: data ? 'success' : 'failed',
        data,
    });
}

function authController(app, auth) {
    app.post('/cekToken', (req, res) => {
        const { token } = req.body;
        auth
            .cekToken(token)
            .then(() => res.json({ message: 'OK' }))
            .catch(err => res.status(401).json({ message: err.message }));
    });
    app.post('/login', (req, res) => {
        const { nidn, password } = req.body;
        auth
            .login(nidn, password)
            .then(result => res.json(result))
            .catch((err) => {
                res.status(401).json({ message: err.message });
            });
    });
}

module.exports = authController;
