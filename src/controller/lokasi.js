function formatOutput(data, res) {
    return res.json({
        message: data ? 'success' : 'failed',
        data,
    });
}

function createLokasi(app, lokasi) {
    app.get('/lokasi', (req, res) => {
        lokasi
            .viewAllLokasi()
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
    app.post('/lokasi', (req, res) => {
        const data = {
            name: req.body.name,
            longi: req.body.longi,
            lati: req.body.lati,
        };
        lokasi
            .createLokasi(data)
            .then(result => formatOutput(result))
            .catch(err => formatOutput(err, res));
    });
    app.get('/lokasi/:id', (req, res) => {
        lokasi
            .getLokasi(req.params.id)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
    app.put('/lokasi/:id', (req, res) => {
        const data = {
            name: req.body.name,
            longi: req.body.longi,
            lati: req.body.lati,
        };
        lokasi
            .updateLokasi(req.params.id, data)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
    app.delete('/lokasi/:id', (req, res) => {
        lokasi
            .delLokasi(req.params.id)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
}

module.exports = createLokasi;
