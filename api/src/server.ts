import express from 'express';
import cors from 'cors';
import { router } from './router';

const server = express();

server.use(router);
server.use(express.json());
server.use(cors());

export { server }