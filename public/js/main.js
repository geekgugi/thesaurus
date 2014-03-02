/**
 * Copyright (c) 2014 Sagar Gugwad <http://sagargugwad.co.nr>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// Filename: main.js
// Require.js allows us to configure shortcut alias
require.config({
  paths: {
    // disabling cache in browsers
    // TODO : remove this  for production
    urlArgs: 'cb=' + Math.random(),
    // TODO : bring jquery, underscore, backbone here
    templates: '../templates',
    backbone: ['//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min', 'libs/backbone-min'],
    underscore: ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min', 'libs/underscore-min'],
    jquery: ['//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min', 'libs/jquery-min'],
    'jquery.validate': ['//cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.11.1/jquery.validate.min', 'libs/jquery.validate.min'],
    bootstrap: ['//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min', 'libs/bootstrap-min'],
    typeahead: ['libs/bootstrap-typeahead'],
    combobox: ['libs/bootstrap-combobox'],
    fullcalendar: ['//cdnjs.cloudflare.com/ajax/libs/fullcalendar/1.6.4/fullcalendar.min', 'libs/fullcalendar.min'],
    'jquery-ui': ['libs/jquery-ui.custom.min'],
    'jquery.datetimeentry' : ['libs/jquery.datetimeentry.min'],
    'jquery.dateentry' : ['libs/jquery.dateentry.min']
  },
  waitSeconds: 15,
  shim: {
  	'backbone': {
  		deps: ['underscore', 'jquery'],
  		exports: 'Backbone'
  	},
  	'underscore': {
  		exports: '_'
  	},
  	'jquery': {
  		exports: '$'
  	},
  	'jquery.validate': {
  		deps: ['jquery'],
  		exports: 'jQuery.fn.validate'
  	},
  	'util' : {
		deps: ['jquery', 'bootstrap']
  	},
  	'bootstrap' : {
  		deps: ['jquery']
  	},
  	'typeahead' : {
  		deps: ['jquery'],
  		exports: 'jQuery.fn.typeahead'
  	},
  	'combobox' : {
  		deps: ['jquery', 'typeahead'],
  		exports: 'jQuery.fn.combobox'
  	},
  	'fullcalendar' : {
  		deps: ['jquery', 'jquery-ui'],
  		exports: 'jQuery.fn.fullCalendar'
  	},
  	'jquery-ui' : {
  		deps: ['jquery']
  	},
  	'jquery.datetimeentry' : {
  		deps: ['jquery']
  	},
  	'validator': {
  		deps: ['jquery', 'jquery.validate']
  	},
  	'jquery.dateentry': {
  		deps: ['jquery']
  	}
  }
});

require([
  // Load our app module and pass it to our definition function
  'app',

], function(App){
  // The "app" dependency is passed in as "App"
  // Again, the other dependencies passed in are not "AMD" 
  // therefore don't pass a parameter to this function
  App.initialize();
});
