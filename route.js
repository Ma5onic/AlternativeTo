var routePattern = /^\/(?:(\w+)(?:\/(\w+))?)?/,
    routes = [
        { method: 'get', path: '/' },
        { method: 'get', path: '/search/about' },
        { method: 'get', path: '/search/application/:name' }
    ];

exports.register = function(app) {
    routes.forEach(function(route) {
        var result = routePattern.exec(route.path),
            controller = result[1] || 'search',
            action = result[2] || 'index',
            module = require('./controllers/' + controller);

        console.log('%s: %s -> %s.%s',
            route.method, route.path, controller, action);
            
        app[route.method](route.path, module[action]);
    });
};
