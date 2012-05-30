define([
    'underscore',
    'backbone',
    'models/alternative'
], function(_, Backbone, AlternativeModel) {
    'use strict';
    
    var Alternatives = Backbone.Collection.extend({
            model: AlternativeModel,
            
            url: function() {
                return 'http://api.alternativeto.net/software/' +
                    this.query + '/?callback=?';
            },
            parse: function(resp, xhr) {
                return resp.Items;
            }
        });
        
    return new Alternatives();
});
