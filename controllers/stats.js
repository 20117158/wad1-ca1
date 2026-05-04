"use strict";
import logger from "../utils/logger.js";
import animalstore from "../models/animal-store.js";
import accounts from './accounts.js';
import userStore from '../models/user-store.js';

const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Stats page loading!");

      // all species stats
      const allSpecies = animalstore.getAllAnimals();
      const userSpecies = animalstore.getUserSpecies(loggedInUser.id);

      const numSpecies = allSpecies.length;
      const numAnimals = allSpecies.reduce((total, species) => total + species.animals.length, 0);
      const avgAnimals = numSpecies > 0 ? (numAnimals / numSpecies).toFixed(2) : 0;

      const maxSize = allSpecies.length > 0 ? Math.max(...allSpecies.map(s => s.animals.length)) : 0;
      const minSize = allSpecies.length > 0 ? Math.min(...allSpecies.map(s => s.animals.length)) : 0;
      const largestSpecies = allSpecies.filter(s => s.animals.length === maxSize).map(s => s.species);
      const smallestSpecies = allSpecies.filter(s => s.animals.length === minSize).map(s => s.species);

      const numUsers = userStore.getAllUsers().length;

      // user specific stats
      const numUserSpecies = userSpecies.length;
      const numUserAnimals = userSpecies.reduce((total, species) => total + species.animals.length, 0);
      const avgUserAnimals = numUserSpecies > 0 ? (numUserAnimals / numUserSpecies).toFixed(2) : 0;

      const userMaxSize = userSpecies.length > 0 ? Math.max(...userSpecies.map(s => s.animals.length)) : 0;
      const userMinSize = userSpecies.length > 0 ? Math.min(...userSpecies.map(s => s.animals.length)) : 0;
      const userLargestSpecies = userSpecies.filter(s => s.animals.length === userMaxSize).map(s => s.species);
      const userSmallestSpecies = userSpecies.filter(s => s.animals.length === userMinSize).map(s => s.species);

      const statistics = {
        numSpecies,
        numAnimals,
        avgAnimals,
        maxSize,
        minSize,
        largestSpecies,
        smallestSpecies,
        numUsers,
        numUserSpecies,
        numUserAnimals,
        avgUserAnimals,
        userMaxSize,
        userMinSize,
        userLargestSpecies,
        userSmallestSpecies,
      };

      const viewData = {
        title: "Zoo Statistics",
        stats: statistics,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
      };

      response.render("stats", viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default stats;