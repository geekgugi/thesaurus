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
import json
import re


# The Dictionary  Data Access Object handles all interactions with the 
# dictionary collection.
class DictionaryDAO:

    def __init__(self, db):
        self.db = db
        self.dictionary = self.db.dictionary
        self.results = []

    def find_word(self, query):
        #TODO: can we use map reduce ?
        for letter in query:
            # is it better to query again rather than carrying unwanted data
            # all arround ? No need if 'meaning' as of now,  will query again
            jsonArray = self.dictionary.find({'word':{'$regex':letter}}, {'_id':0, 'meaning':0})
            data = json.loads(jsonArray)
            inputList = list(query)
            process_input(inputList, data)
        #fetch the meanings of all words in result
        jsonArrayResult = []
        for word in results:
            jsonArrayResult.append(self.dictionary.find_one({'word':word}, {'_id':0}))
        # meanings  of the filtered words
        return json.dumps(jsonArrayResult) 
            
    def process_input(inputList, data):
        words = []
        for element in data:
            # I guess this was the requirement
            if len(element['word']) < 6:
                words.append(element['word'])
                filter_words(words, inputList)

    def filter_words(self, words, inputList):
        for word in words:
            # extract word and filter the inputList
            if all(x in inputList for x in list(word)):
                for letter in word:
                    inputList.remove(letter)
                # for test cases
                print word
                self.results.append(word)

