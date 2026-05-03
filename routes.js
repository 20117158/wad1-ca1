'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import animals from './controllers/animals.js';
import accounts from './controllers/accounts.js';

router.get('/', accounts.index);
router.get('/dashboard', dashboard.createView);
router.post('/dashboard/addspecies', dashboard.addSpecies);
router.get('/about', about.createView);
router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/animals/:id', animals.createView);
router.get('/animals/:id/addanimal', animals.addAnimalView);
router.post('/animals/:id/addanimal', animals.addAnimal);
router.get('/animals/:id/deleteanimal/:animalid', animals.deleteAnimal);
router.get('/dashboard/deletespecies/:id', dashboard.deleteSpecies);
router.post('/animals/:id/updateanimal/:animalid', animals.updateAnimal);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
export default router;
