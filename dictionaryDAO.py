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

import hmac
import random
import string
import hashlib
import pymongo


# The Dictionary  Data Access Object handles all interactions with the 
# dictionary collection.
class DictionaryDAO:

    def __init__(self, db):
        self.db = db
        self.dictionary = self.db.dictionary

    def find_word(self, query):
        results = []
        #TODO: can we use map reduce ?
        for letter in query:
            jsonArray = self.dictionary.find({'word':{'$regex':letter}}, {'_id':0, 'meaning':0})
            data = json.loads(jsonArray)
            # print data
            words = []
            for element in data:
                if len(element['word']) < 6:
                    words.append(element['word'])
                    inputList = list(query)
                    for word in words:
                        if all(x in inputList for x in list(word)):
                            for letter in word:
                                inputList.remove(letter)
                            results.append(word)
        #fetch the meanings of all words in result
        for word in results:
                jsonResult = self.dictionary.find({'word':word}, {'_id':0})
        #TODO: validate the query 
        #return  self.dictionary.find({'word':{'$regex':query}},{'_id':0})

