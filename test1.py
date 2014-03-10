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


# This sample unit test case for the method inside dictionaryDAO class.
input = "abcatoleaksave"

words  = ['cat', 'leak', 'to', 'save']
inputList = list(input)

connection_string = "mongodb://localhost"
connection = pymongo.MongoClient(connection_string)
database = connection.word

dictionary = dictionaryDAO.DictionaryDAO(database)
dictionary.filter_words(words, inputList)

