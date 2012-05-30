define([
    'backbone'
], function(Backbone) {
    'use strict';
    
    var Search = Backbone.Model.extend({
            defaults: {
                name: ''
            },
            
            validate: function(attrs) {
                if (!attrs.name) {
                    return "The name is mandatory.";
                }
            }
        });
        
    return Search;
});
