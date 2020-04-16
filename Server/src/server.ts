import express from 'express';
import routes from './routes';
import 'reflect-metadata';
import './database';

const server = express();

server.use(express.json())
server.use(routes)

server.listen(3333)
