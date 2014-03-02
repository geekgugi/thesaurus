/**
 * Copyright (c) 2008 - 2014 Sagar Gugwad <http://sagargugwad.co.nr>
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
define([
    'text!templates/MainTemplate.html',
    'router'
], 
function(MainTemplate, Router) {

    var MainView = Backbone.View.extend({

        el:'.page',
        initialize: function() {
            _.bindAll(this, 'render');
            this.render();	
        },
        render: function() {
            var template = _.template(MainTemplate, {});
            this.$el.html(template);
            require(['views/SearchView', 'vm'], function( SearchView, VM) {
                self.searchView  = VM.create({}, 'searchView', SearchView, {el: '#childView'});
            });
        }
    });
    return MainView;		
});
