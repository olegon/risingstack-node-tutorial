'use strict';


(function expressServer2() {
    const app = require('./app')
    const port = process.env.PORT || 3000

    app.listen(port, function(err) {
        if (err) {
            throw err
        }

        console.log(`server is listening on ${port}...`)
    })

    return app
})();



(function expressServer() {
    return;

    const path = require('path');
    const express = require('express');
    const exphbs = require('express-handlebars');
    const request = require('request-promise');

    const CONFIG = {
        PORT: 8080
    };

    const app = express();

    (function templateEngineSetup() {
        app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            extname: '.hbs',
            layoutsDir: path.join(__dirname, 'views/layouts')
        }));
        app.set('view engine', '.hbs');
        app.set('views', path.join(__dirname, 'views'));
    })();

    (function exampleMiddleware() {
        return;

        // Log Middleware
        app.use((req, res, next) => {
            // console.log(req.headers);
            next();
        });
    })();

    app.use('/static', express.static('static'));

    app.get('/', (req, res) => {
        res.render('home', {
            name: req.query.name || 'User'
        });
    });

    app.get('/json', (req, res) => {
        res.json({
            random: Math.ceil(Math.random() * 100)
        });
    });

    app.get('/joke', (req, res) => {
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

    // Error middleware.
    // Observe que o callback recebe 4 argumentos, sendo o primeiro um erro.
    //
    // - The error handler function should be the last function added with app.use.
    // - The error handler has a next callback - it can be used to chain multiple error handlers.
    app.use((err, req, res, next) => {
        console.log(err);
        res.status(500).send('Something broken!');
    });


    app.listen(CONFIG.PORT, (err) => {
        if (err) {
            console.log(`Não foi possível iniciar o servidor.`);
        } else {
            console.log(`O servidor está escutando na porta ${CONFIG.PORT}`);
        }
    });

    return app;
})();


(function httpServer() {
    return;

    const http = require('http');

    const CONFIG = {
        PORT: 8080
    };

    const server = http.createServer((req, res) => {
        console.log(req.url);

        res.end('Hello!');
    });

    server.listen(CONFIG.PORT, (err) => {
        if (err) {
            console.log(`Não foi possível iniciar o servidor.`);
        } else {
            console.log(`O servidor está escutando na porta ${CONFIG.PORT}`);
        }
    });
})();

(function nodeCallbacksAndPromises() {
    return;

    const fs = require('fs');

    function stat(filename) {
        return new Promise((resolve, reject) => {
            fs.stat(filename, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    Promise.all([
            stat('index.js'),
            stat('package.json'),
        ])
        .then((datas) => {
            console.log(datas);
        })
        .catch((err) => {
            console.log(datas);
        });
})();

(function moduleLoading() {
    return;

    const app = require('./app');

    app.runREPL();
})();
