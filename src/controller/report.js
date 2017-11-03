function formatOutput(data, res) {
    return res.json({
        message: data ? 'success' : 'failed',
        data,
    });
}

function createReport(app, report) {
    app.get('/report/:id', (req, res) => {
        report
            .reportDocuments(req.params.id)
            .then(result => formatOutput(result, res))
            .catch(err => formatOutput(err, res));
    });
}

module.exports = createReport;
