var http = require('http');

/*
 * GET /search
 */

exports.index = function(req, res) {
    res.render('search/index', { title: 'AlternativeTo' });
};

/*
 * GET /search/about
 */

exports.about = function(req, res) {
    res.send('<p>A very simple AlternativeTo frontend written with Backbone.js.</p>');
};

/*
 * GET /search/application/:name
 */

exports.application = function(req, res) {
    var name = req.param('name'),
        req = http.request({
            host: 'api.alternativeto.net',
            path: '/software/' + name + '?count=15',
            method: 'GET'
        }, function(response) {
            var body = '';
            response.on('data', function(chunk) {
                body += chunk;
            });
            response.on('end', function() {
                res.render('search/application',
                {
                    title: 'AlternativeTo - ' + name,
                    name: name,
                    alternatives: JSON.stringify(JSON.parse(body).Items)
                });
            });
        });
    req.end();
};
