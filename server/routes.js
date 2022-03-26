const controller = require('./controller');
const router = require('express').Router();

router.get('/movies', controller.get);

router.get('/movies/search', controller.get);

router.post('/movies', controller.post);

router.put('/movies', controller.put);

module.exports = router;