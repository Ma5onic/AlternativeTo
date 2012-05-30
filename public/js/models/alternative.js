define([
    'backbone'
], function(Backbone) {
    'use strict';
    
    var Alternative = Backbone.Model.extend({
            initialize: function() {
                this.initializeLicenseLabel();
            },
            initializeLicenseLabel: function() {
                var licenseLabel = '';
                switch (this.get('License')) {
                    case 'Free':
                        licenseLabel = 'label-info';
                        break;
                    case 'Open Source':
                        licenseLabel = 'label-success';
                        break;
                    case 'Commercial':
                        licenseLabel = 'label-warning';
                        break;
                }
                this.set({ LicenseLabel: licenseLabel }, { silent: true });
            }
        });
        
    return Alternative;
});
