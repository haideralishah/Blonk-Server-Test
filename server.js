/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
const express = require('express')


const route = express.Router()

route.use('/user', require('./routes/users'))
route.use('/jobs', require('./routes/createJob'))
// route.use('/posts', require('./index'))



module.exports = route