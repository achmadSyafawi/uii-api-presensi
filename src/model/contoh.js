const createUserModel = require('./user');

function createReportModel(conn) {
    const userModel = createUserModel(conn);
    return {
        getAllReport: () => {
            const operations = [
                userModel.getReports(),
                pegawaiModel.getReports(),
            ];
            return Promise.all(operations);
        },
    };
}

module.exports = createReportModel;
