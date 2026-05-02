'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';
import { v2 as cloudinary } from "cloudinary";
const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },
  
  getUserById(id) {
    return this.store.findOneBy(this.collection, (user => user.id === id));
  },
  
  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, (user => user.email === email));
  },
  
async addUser(user, picture, callback) {
  try {
    const result = await cloudinary.uploader.upload(picture.tempFilePath);
    user.picture = result.url;
    user.pictureId = result.public_id;
    this.store.addCollection(this.collection, user);
    callback();
  } catch (error) {
    logger.error('Cloudinary upload error: ' + error);
    callback(error);
  }
},

};

export default userStore;
