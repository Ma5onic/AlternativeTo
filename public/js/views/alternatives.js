define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/alternatives.html'
], function($, _, Backbone, alternativesTemplate) {
    'use strict';
    
    var Alternatives = Backbone.View.extend({
            el: '#alternatives',
            template: _.template(alternativesTemplate),
            events: {
                'click ul.unstyled': 'selection'
            },
            
            initialize: function() {
                this.collection.on('reset', this.render, this);
            },
            render: function() {
                this.$el.html(this.template({
                    alternatives: this.collection.toJSON()
                }));
                return this;
            },
            selection: function(event) {
                var target = event.target,
                    alternativeId = $(target)
                        .closest('li')
                        .find(':hidden:first')
                        .val();
                
                if (alternativeId) {
                    this.trigger('selection',
                        this.collection.find(function(alternative) {
                            return alternative.get('ID') === alternativeId;
                        }));
                }
            }
        });
        
    return Alternatives;
});
