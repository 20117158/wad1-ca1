'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const employees = {

  store: new JsonStore('./models/employees-store.json', { info: {}}),
  collection: 'employees',
  

  getAppInfo() {
    return this.store.findAll(this.collection);
  },

};

export default employees;