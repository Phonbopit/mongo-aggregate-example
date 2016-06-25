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
    .aggregate([
      { $group:
        {
          _id: { state: "$state", city: "$city" },
          pop: { $sum: "$pop" },
          totalCity: { $sum: 1 }
        }
      },
      { $sort: { totalCity: 1 } },
      { $group:
        {
          _id : "$_id.state",
          biggestCity:  { $last: "$_id.city" },
          biggestPop:   { $last: "$pop" },
          smallestCity: { $first: "$_id.city" },
          smallestPop:  { $first: "$pop" },
          totalCity: { $sum: "$totalCity" }
        }
      },

      // the following $project is optional, and
      // modifies the output format.
      { $project:
        { _id: 0,
          state: "$_id",
          totalCity: "$totalCity",
          biggestCity:  { name: "$biggestCity",  pop: "$biggestPop" },
          smallestCity: { name: "$smallestCity", pop: "$smallestPop" },
        }
      }
    ], (err, result) => {

      if (err) return reply(err);

      return reply(result);
    });
  }
})

server.start(() => {
  console.log(`Server is running at ${server.info.uri}`);
});