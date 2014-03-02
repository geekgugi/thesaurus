#
# Copyright (c) 2014 Sagar Gugwad <http://sagargugwad.co.nr>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
#
import pymongo
import bottle
import cgi
import re
import dictionaryDAO
from flask import json
from bottle import route, request
from bson import json_util
from bson.json_util import dumps
from bottle import static_file

__author__ = 'Sagar Gugwad'


# This program implements  a restful api to  return synonyms for a word.
# This controller file defines a bunch of http routes.

# This route is the main page of the application.

@bottle.route('/')
def blog_index():
    return bottle.template('index')


@bottle.get('/public/:filename#.+#')
def get_static_file(filename):
    # Send static files from ./public folder. ''
    return static_file(filename, root='./public')

@bottle.get("/word")
def find_word():
    # get the query parameter from the request
    # TODO: Validating the query parameter
    # send error code response 
    query = request.GET.get("q")
    word = dictionary.find_word(query)
    return dumps(word)


connection_string = "mongodb://localhost"
connection = pymongo.MongoClient(connection_string)
database = connection.word

dictionary = dictionaryDAO.DictionaryDAO(database)

bottle.debug(True)
# Start the webserver running and wait for requests
bottle.run(host='localhost', port=8082)         
