function formatOutput(data, res) {
    return res.json({
        message: data ? 'success' : 'failed',
        data,
    });
}

function createPegawai(app, pegawai) {
    app.get('/pegawai', (req, res) => {
        pegawai
            .viewAllPegawai()
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
    app.post('/pegawai', (req, res) => {
        const data = {
            id: req.body.id,
            name: req.body.name,
            nidn: req.body.nidn,
            pangkat: req.body.pangkat,
            jabatan: req.body.jabatan,
            programStudi: req.body.programStudi,
            id_lokasi: req.body.id_lokasi,
            id_face: req.body.id_face,
        };
        pegawai
            .createPegawai(data)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
    app.get('/pegawai/:id', (req, res) => {
        pegawai
            .getPegawai(req.params.id)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
    app.put('/pegawai/:id', (req, res) => {
        const data = {
            name: req.body.name,
            nidn: req.body.nidn,
            pangkat: req.body.pangkat,
            jabatan: req.body.jabatan,
            programStudi: req.body.programStudi,
            id_lokasi: req.body.id_lokasi,
            id_face: req.body.id_face,
        };
        pegawai
            .updatePegawai(req.params.id, data)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
    app.delete('/pegawai/:id', (req, res) => {
        pegawai
            .delPegawai(req.params.id)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
}

module.exports = createPegawai;
