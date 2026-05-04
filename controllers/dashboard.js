'use strict';
//importing all the necessary stores and the logger
import logger from "../utils/logger.js";
import animalstore from '../models/animal-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';

// Defining the dashboard object
const dashboard = {
  //method to create the view
createView(request, response) {
  logger.info("Dashboard page loading!");
  const loggedInUser = accounts.getCurrentUser(request);

  if (loggedInUser) {
    const searchTerm = request.query.searchTerm || "";

const animals = searchTerm
  ? animalstore.searchUserAnimals(searchTerm, loggedInUser.id)
  : animalstore.getUserSpecies(loggedInUser.id);

    const sortField = request.query.sort;
    const order = request.query.order === "desc" ? -1 : 1;

    let sorted = animals;

    if (sortField) {
      sorted = animals.slice().sort((a, b) => {
        if (sortField === "species") {
          return a.species.localeCompare(b.species) * order;
        }
        if (sortField === "count") {
          return (a.animals.length - b.animals.length) * order;
        }
        return 0;
      });
    }

    const viewData = {
      title: "Animal info",
      animalCollection: sortField ? sorted : animals,
      search: searchTerm,
      speciesSelected: request.query.sort === "species",
      countSelected: request.query.sort === "count",
      ascSelected: request.query.order === "asc",
      descSelected: request.query.order === "desc",
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };

    logger.debug(viewData.animalCollection);
    response.render('dashboard', viewData);
  } else {
    response.redirect('/');
  }
},
addSpecies(request, response) {
  const loggedInUser = accounts.getCurrentUser(request);
  const timestamp = new Date();
  const newSpecies = {
    id: uuidv4(),
    userid: loggedInUser.id,
    species: request.body.species,
    date: timestamp,
    animals: [],
  };
  animalstore.addSpecies(newSpecies, request.files.image, function() {
    response.redirect("/dashboard");
  });
},

deleteSpecies(request, response) {
  const speciesId = request.params.id;
  logger.debug(`Deleting Species ${speciesId}`);
  animalstore.removeSpecies(speciesId, function() {
    response.redirect("/dashboard");
  });
},

};
//Exporting for routing
export default dashboard;

