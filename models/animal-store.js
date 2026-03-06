'use strict';

import JsonStore from './json-store.js';

const animalstore = {
  store: new JsonStore('./models/animal-store.json', { animals: [] }),
  collection: 'animals',

  getAllAnimal() {
    return this.store.findAll(this.collection); // should return array of species
  },

  getAnimal(id) {
    return this.store.findOneBy(this.collection, (animal) => animal.id === id);
  },
};

export default animalstore;