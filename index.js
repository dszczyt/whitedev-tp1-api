const Hapi = require('hapi');
const _ = require('lodash');
const Joi = require('joi');

const server = new Hapi.Server();
server.connection({ port: 3000, routes: { cors: true } });

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

var users = [
  {
    id: 1,
    name: 'Hélène'
  },
  {
    id: 2,
    name: 'Cédric'
  },
  {
    id: 3,
    name: 'Rémi'
  },
  {
    id: 4,
    name: 'Clément'
  },
  {
    id: 5,
    name: 'Grég'
  },
  {
    id: 6,
    name: 'Damien'
  }
];

server.route([
  {
    method: 'GET',
    path: '/users',
    handler: function(request, reply) {
      reply(users);
    }
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: function(request, reply) {
      const user = _.find(
        users,
        {
          id: parseInt(request.params.id)
        }
      );
      if (user) {
        reply(user);
      } else {
        reply("Not found").code(404);
      }
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: function(request, reply) {
      const user = {
        id: _.max(_.map(users, 'id')) + 1,
        name: request.payload.name
      };
      users.push(user);
      reply(user);
    },
    config: {
      validate: {
        payload: {
          name: Joi.string().required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: function(request, reply) {
      var user = _.find(
        users,
        {
          id: parseInt(request.params.id)
        }
      );
      user.name = request.payload.name;
      if (user) {
        reply(user);
      } else {
        reply("Not found").code(404);
      }
    },
    config: {
      validate: {
        payload: {
          name: Joi.string().required()
        }
      }
    }
  }
]);
