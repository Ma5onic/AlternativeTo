require.config({
    paths: {
        jquery: 'libs/jquery-1.7.2',
        underscore: 'libs/underscore',
        json: 'libs/json2',
        backbone: 'libs/backbone'
    }
});

define([
    'order!jquery',
    'order!libs/bootstrap',
    'order!backbone',
    'order!searchRouter'
], function($, bootstrap, Backbone, SearchRouter) {
    'use strict';
    new SearchRouter();
    
    return {
        start: function(options) {
            $(function() {
                Backbone.history.start(options);
            });
        }
    };
});
