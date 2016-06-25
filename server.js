'use strict';

const Hapi = require('hapi');
const server = new Hapi.Server();

const mongoose = require('mongoose');
const Zipcode = require('./models/zipcodes');

mongoose.connect('mongodb://localhost/ahoy_aggregate_example');

server.connection({
  host: 'localhost',
  port: 5555
});

server.route({
  path: '/',
  method: 'GET',
  handler: (req, reply) => {
    reply({message: 'ok'});
  }
});

server.route({
  path: '/zips',
  method: 'GET',
  handler: (req, reply) => {
    Zipcode
    .find({})
    .limit(100)
    .exec((err, result) => {
      if (err) return reply(err);

      return reply(result);
    })
  }
})

server.start(() => {
  console.log(`Server is running at ${server.info.uri}`);
});