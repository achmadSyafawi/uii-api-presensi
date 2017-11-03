const fs = require('fs');
const moment = require('moment');
const jwt = require('jsonwebtoken');
// const geolib = require('geolib');

const cert = 'topsecret';

function formatOutput(data, res) {
    return res.json({
        message: data ? 'success' : 'failed',
        data,
    });
}

function createAbsensi(app, absensi) {
    app.post('/absen', (req, res) => {
        // distance in meters
        // 1st argument for current location 2nd argument for destination
        // const b = geolib.getDistance({ latitude: -7.6938904, longitude: 110.4168026 }, { latitude: -7.6910862, longitude: 110.4159975 });
        const token = jwt.verify(req.headers.token, cert);
        const imageName = `${token.nidn}_${req.body.timestamp}.jpg`;
        const data = {
            tgl: moment(parseInt(req.body.timestamp, 10)).format(
                'YYYY-MM-DD HH:mm',
            ),
            foto: imageName,
            waktu: moment(parseInt(req.body.timestamp, 10)).format('HH:mm'),
            type: req.body.type,
            nidn: token.nidn,
            id_lokasi: req.body.id_lokasi,
        };
        fs.writeFile(
            `${__dirname}/../../uploads/${imageName}`,
            req.body.photo,
            'base64',
            (err) => {
                if (err) throw err;
                // return res.status(200).json({ message: 'OK!' });
            },
        );
        // console.log(data);
        absensi
            .createAbsensi(data)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });

    app.get('/absensi', (req, res) => {
        absensi
            .viewAllAbsensi()
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });

    app.post('/absensi', (req, res) => {
        const data = {
            tgl: req.body.tgl,
            masuk: req.body.masuk,
            keluar: req.body.keluar,
            ijin: req.body.ijin,
            foto: req.body.foto,
            id_lokasi: req.body.id_lokasi,
            id_pegawai: req.body.id_pegawai,
        };
        absensi
            .createAbsensi(data)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });

    app.get('/absensi/:id', (req, res) => {
        absensi
            .getAbsensi(req.params.id)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });

    app.put('/absensi/:id', (req, res) => {
        const data = {
            tgl: req.body.tgl,
            masuk: req.body.masuk,
            keluar: req.body.keluar,
            ijin: req.body.ijin,
            foto: req.body.foto,
            id_lokasi: req.body.id_lokasi,
            id_pegawai: req.body.id_pegawai,
        };
        absensi
            .updateAbsensi(req.params.id, data)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
    app.post('/absensi/cekLokasi', (req, res) => {
        absensi
            .cekLokasi(req.body.lat, req.body.lng)
            .then(result => res.json(result))
            .catch(err => res.status(401).json({ message: err.message }));
    });
    app.post('/checkHoliday', (req, res) => {
        const { timestamp } = req.body;
        absensi
            .checkHoliday(timestamp)
            .then(result => res.json(result))
            .catch(err => res.status(401).json({ message: err.message }));
    });
    app.delete('/absensi/:id', (req, res) => {
        absensi
            .delAbsensi(req.params.id)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
}

module.exports = createAbsensi;
