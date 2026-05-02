'use strict';

import JsonStore from './json-store.js';
import logger from '../utils/logger.js';
const animalstore = {
  store: new JsonStore('./models/animal-store.json', { zooanimals: [] }),
  collection: 'zooanimals',
  array: 'animals',

  getAllAnimals() {
    return this.store.findAll(this.collection); // should return array of species
  },

  getAnimal(id) {
    return this.store.findOneBy(this.collection, (animal) => animal.id === id);
  },
async addAnimal(speciesId, animal, file, response) {
  try {
    animal.image = await this.store.addToCloudinary(file);
    this.store.addItem(this.collection, speciesId, this.array, animal);
    response();
  } catch (error) {
    logger.error("Error processing animal:", error);
    response(error);
  }
},
  removeAnimal(speciesId, animalId) {
    this.store.removeItem(this.collection, speciesId, "animals", animalId);
  },
async updateAnimal(speciesId, animalId, updatedAnimal, file, response) {
  try {
    if (file) {
      updatedAnimal.image = await this.store.addToCloudinary(file);
    } else {
      const existing = this.store.findOneBy(this.collection, (s) => s.id === speciesId);
      const existingAnimal = existing.animals.find((a) => a.id === animalId);
      updatedAnimal.image = existingAnimal.image;
    }
    this.store.editItem(this.collection, speciesId, animalId, this.array, updatedAnimal);
    if (response) response();
  } catch (error) {
    logger.error("Error updating animal:", error);
    if (response) response(error);
  }
},
  async addSpecies(species, file, response) {
    try {
      species.image = await this.store.addToCloudinary(file);
      this.store.addCollection(this.collection, species);
      response();
    } catch (error) {
      logger.error("Error processing species:", error);
      response(error);
    }
  },

  async removeSpecies(id, response) {
    const species = this.store.findOneBy(this.collection, (s) => s.id === id);
    if (species.image && species.image.public_id) {
      try {
        await this.store.deleteFromCloudinary(species.image.public_id);
        logger.info("Cloudinary image deleted");
      } catch (err) {
        logger.error("Failed to delete Cloudinary image:", err);
      }
    }
    this.store.removeCollection(this.collection, species);
    response();
  },
};

export default animalstore;