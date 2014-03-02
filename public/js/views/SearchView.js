
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
    'typeahead',
    'combobox',
    'collections/DictionaryCollection',
    'text!templates/SearchTemplate.html',
    'vm'
], function(TypeAhead, Combobox, DictionaryCollection, SearchTemplate, VM) {

    var SearchView = Backbone.View.extend({
        events:{
            'click #word-clear': 'clearAll'
        },
        initialize: function(){
            _.bindAll(this, 'render', 'initializeSearch'); 
            this.render();
            this.initializeSearch();
        },
        render: function(){
            var template = _.template(SearchTemplate, {});
            this.$el.html(template);
        },
        clearAll: function(){
            this.$('#word-details').addClass('hide');
            this.$('#word-search').val('');
        },
        searchWord: function(query, process) {
            var that = this;
            that.dictionaryCollection = new DictionaryCollection();
            that.dictionaryCollection.url = 'word?q=' +$('#word-search').val()

            return that.dictionaryCollection.fetch({
                success: function(wordList) {
                    var array = [];
                    _.each(wordList.models, function(model) {
                        model.set('display', model.get('word'));
                        array.push(model.get('display'));
                    });
                    return process(array);
                },
                error: function(wordList, response, options) {
                    console.log(response);
                }
            });
        },
        initializeSearch: function() {
            var that = this;
            $('#word-search').typeahead({
                source: function(query, process) {
                    if(that.timeout)
                        clearTimeout(that.timeout);
                    that.timeout = setTimeout(function(){
                        that.searchWord(query, process)}, 500 );
                },
                updater: function(selection) {
                    $('#word-search').val(selection);
                    var model = null;
                    _.every(that.dictionaryCollection.models, function(model){
                        if( model.get('display') == $('#word-search').val()){
                            curModel = model;
                            return false;
                        }
                        return true;
                    });
                    if(curModel != null) {
                        that.showDetails(curModel);
                    }
                    return selection;
                }
            });
        },
        showDetails: function(wordModel) {
            $(this.el).find('li').remove();
            this.$('#word-details').removeClass('hide');
            _.each(wordModel.get('meaning'), function(value){
                var li = '<li class="list-group-item">'+value+'</li>';
                this.$('#meaning').append(li);
            });
        }
    });
    return SearchView;
});
