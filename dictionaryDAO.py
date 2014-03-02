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
        #TODO: validate the query 
        return  self.dictionary.find({'word':{'$regex':query}},{'_id':0})

