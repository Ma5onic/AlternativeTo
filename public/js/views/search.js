define([
    'underscore',
    'backbone',
    'text!/templates/search.html'
], function(_, Backbone, searchTemplate) {
    'use strict';
    
    var SearchView = Backbone.View.extend({
            el: '#search',
            template: _.template(searchTemplate),
            events: {
                'click .btn': 'search',
                'keydown .search-query': 'clearError'
            },
            
            initialize: function() {
                this.model.on('change', function() {
                        if (!this.isViewChange) {
                            this.render();
                        }
                    }, this);
            },
            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },
            search: function(event) {
                var $searchQuery = this.$el.find('.search-query'),
                    that = this,
                    isValid;
                    
                event.preventDefault();
                    
                this.isViewChange = true;
                isValid = this.model.set({ name: $searchQuery.val() },
                {
                    error: function(model, error) {
                        $searchQuery.focus();
                        that.$el.find('.help-block')
                            .text(error)
                            .removeClass('off')
                            .parent().addClass('error');
                    }
                });
                this.isViewChange = false;
                
                if (isValid) {
                    this.clearError();
                    this.trigger('search', this.model);
                }
            },
            clearError: function() {
                this.$el.find('.help-block')
                    .addClass('off')
                    .parent().removeClass('error');
            }
        });
        
    return SearchView;
});
