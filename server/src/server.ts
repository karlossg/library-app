import Hapi from 'hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';

import { BookRoutePlugin } from './routes/bookRoutes';

export async function getServer() {
  const port = 8080;

  const validationOptions = {
    allowUnknown: false,
    convert: true,
    stripUnknown: { objects: true },
  };

  const server = new Hapi.Server({
    port,
    routes: {
      cors: true,
      response: {
        modify: true,
        options: validationOptions,
      },
      validate: {
        options: validationOptions,
        async failAction(_request, _h, err) {
          throw err;
        },
      },
    },
  });

  server.events.on({ name: 'request', channels: 'error' }, (_request, event, _tags) => {
    console.error(event.error);
  });

  const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: 'Library App api docs',
    },
    reuseDefinitions: false,
  };

  await server.register([
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger, options: swaggerOptions
    }
  ] as any);

  await server.register({ plugin: BookRoutePlugin }, {
    routes: {
      prefix: '/books',
    },
  });

  return server;
}