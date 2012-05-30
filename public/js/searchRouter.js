define([
    'backbone',
    'views/search',
    'views/alternatives',
    'models/search',
    'collections/alternatives'
], function(Backbone,
    SearchView, AlternativesView,
    SearchModel, alternativesCollection) {
    'use strict';
        
    var SearchRouter = Backbone.Router.extend({
            routes: {
                // Define some URL routes
                '': 'index',
                'search/application/:name/': 'search',
        
                // Default
                '*actions': 'defaultAction'
            },
            
            initialize: function() {
                this.searchModel = new SearchModel();
                this.searchView = new SearchView({
                    model: this.searchModel
                }).on('search', function(search) {
                    this.navigate('search/application/' +
                        search.get('name') + '/', { trigger: true });
                }, this);
                
                this.alternativesView = new AlternativesView({
                    collection: alternativesCollection        
                }).on('selection', function(alternative) {
                    this.navigate('search/application/' +
                        alternative.get('ID') + '/', { trigger: true });
                }, this);
            },
            index: function() {
                this.searchView.render();
                alternativesCollection.reset();
            },
            search: function(name) {
                this.searchModel.set({ name: name });
                alternativesCollection.query = name;
                alternativesCollection.fetch({ data: { count: 15 } });
            },
            defaultAction: function(actions) {
                // We have no matching route, lets just log what the URL was
                console.log('No route:', actions);
            }
        });
    
    return SearchRouter;
});
