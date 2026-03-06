'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

// add your own routes below

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js';
import animals from './controllers/animals.js';

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/about', about.createView);

router.get('/error', (request, response) => response.status(404).end('Page not found.'));
router.get('/animals/:id', animals.createView);

export default router;
