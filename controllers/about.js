'use strict';

import logger from "../utils/logger.js";
import employees from "../models/employees-store.js";
import info from "../models/app-store.js";
import accounts from './accounts.js';

const about = {
  createView(request, response) {
    logger.info("About page loading!");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "About",
      employees: employees.getAppInfo(),
      info: info.getAppInfo(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };
    response.render('about', viewData);
  },
};

export default about;