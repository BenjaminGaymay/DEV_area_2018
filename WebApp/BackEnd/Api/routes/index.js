import { Router } from 'express';

const router = new Router();

router.get('/gmail', (req, res) => {
    res.send('gmail');
});

router.get('/', (req, res) => {
    res.send('slt');
});

export default router;