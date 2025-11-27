const { Router } = require('express');
const router = Router();

router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API funcionando' });
});

module.exports = router;
