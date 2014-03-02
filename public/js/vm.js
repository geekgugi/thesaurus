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
define([], function(){
    var views = {};
    var create = function (context, name, View, options) {
        // View clean up isn't actually implemented yet but will simply call
        // .clean, .remove and .unbind
        if(typeof views[name] !== 'undefined') {
            views[name].undelegateEvents();
            if(typeof views[name].clean === 'function') {
                views[name].clean();
            }
            delete views[name];
        }
        var view = new View(options);
        views[name] = view;
        if(typeof context.children === 'undefined'){
            context.children = {};
            context.children[name] = view;
        } else {
            context.children[name] = view;
        }
        return view;
    };
    return {
        create: create
    };
});
