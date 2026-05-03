'use strict';
//importing all the necessary stores and the logger
import logger from "../utils/logger.js";
import animalstore from '../models/animal-store.js';
import { v4 as uuidv4 } from 'uuid';

// Defining the dashboard object
const dashboard = {
  //method to create the view
createView(request, response) {
  logger.info("Dashboard page loading!");
  const searchTerm = request.query.searchTerm || "";

  const animals = searchTerm
    ? animalstore.searchAnimals(searchTerm)
    : animalstore.getAllAnimals();

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
  };

  logger.debug(viewData.animalCollection);
  response.render('dashboard', viewData);
},
addSpecies(request, response) {
  const newSpecies = {
    id: uuidv4(),
    species: request.body.species,
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

