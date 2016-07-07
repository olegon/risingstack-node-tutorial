const request = require('request-promise')

module.exports = function(app) {
    app.get('/joke', function(req, res) {
        request({
                uri: 'http://api.icndb.com/jokes/random',
                qs: {
                    firstName: req.query.nome || 'Chuck',
                    lastName: req.query.sobrenome || 'Norris',
                },
                json: true
            })
            .then((joke) => {
                res.render('joke', joke.value);
            })
            .catch((err) => {
                res.render('error');
            });
    })
};
