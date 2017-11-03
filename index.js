const path = require('path');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const conn = mysql.createConnection(config);
const app = express();

// Middlewares
app.use(
    bodyParser.json({
        limit: '10mb',
    }),
);
app.use(
    '/public',
    express.static(path.join(__dirname, 'uploads'), { maxAge: '365d' }),
);

// Models
const createUserModel = require('./src/model/user');
const createPegawaiModel = require('./src/model/pegawai');
const createLokasiModel = require('./src/model/lokasi');
const createAbsensiModel = require('./src/model/absensi');
const createReportModel = require('./src/model/report');
const createAuthModel = require('./src/model/auth');

const userModel = createUserModel(conn);
const pegawaiModel = createPegawaiModel(conn);
const lokasiModel = createLokasiModel(conn);
const absensiModel = createAbsensiModel(conn);
const reportModel = createReportModel(conn);
const authModel = createAuthModel(conn);

// Controllers
const userController = require('./src/controller/user');
const pegawaiController = require('./src/controller/pegawai');
const lokasiController = require('./src/controller/lokasi');
const absensiController = require('./src/controller/absensi');
const reportController = require('./src/controller/report');
const authController = require('./src/controller/auth');

userController(app, userModel, authModel);
pegawaiController(app, pegawaiModel);
lokasiController(app, lokasiModel);
absensiController(app, absensiModel, authModel);
reportController(app, reportModel);
authController(app, authModel, pegawaiModel);

// running
app.listen(3000, () => {
    console.log('app running in port 3000');
});
