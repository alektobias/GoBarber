import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import cors from 'cors';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import upload from '@config/upload';

const server = express();

server.use(cors());
server.use(express.json());
server.use('/files', express.static(upload.directory));
server.use(routes);
server.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);
server.listen(3333);
