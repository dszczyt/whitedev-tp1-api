const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000, routes: { cors: true } });

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

var liste = [
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
    name: 'Les garçons'
  }
];

server.route({
  method: 'GET',
  path: '/users',
  handler: function(request, reply) {
    reply(liste);
  }
});
