/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type express from 'express';
import morgan from 'morgan';

import { logger } from './';

morgan.token('id', (_req, res: express.Response) => String(res.locals.error.id));

const infoIncomingMessage = (
  tokens: morgan.TokenIndexer,
  req: express.Request,
  res: express.Response,
) => {
  return [tokens.method(req, res), tokens.url(req, res)].join(' ');
};

const errorIncomingMessage = (
  tokens: morgan.TokenIndexer,
  req: express.Request,
  res: express.Response,
) => {
  return [
    tokens.id(req, res),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    res.locals.error.name + ':',
    res.locals.error.message + '\n',
    res.locals.error.stack,
  ].join(' ');
};

const infoStream = {
  write: (message: string) => logger.info(message),
};

const errorStream = {
  write: (message: string) => logger.error(message),
};

export const infoMorgan = morgan(infoIncomingMessage, {
  stream: infoStream,
  immediate: true,
});

export const errorMorgan = morgan(
  (tokens, req: express.Request, res: express.Response) => {
    return errorIncomingMessage(tokens, req, res);
  },
  {
    stream: errorStream,
    skip(_req: express.Request, res: express.Response): boolean {
      return res.statusCode < 400;
    },
  },
);
