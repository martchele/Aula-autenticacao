import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => { res.send('Hello World!') });

router.get('/rota-protegida', (req: Request, res: Response) => { res.send('Rota protegida, se você está vendo essa mensagem é porque está autenticado no sistema') });

export { router }