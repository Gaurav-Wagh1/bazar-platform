const express = require('express');
const router = express.Router();

const v1ApiRouter = require('./v1/index');

router.use('/v1', v1ApiRouter);

module.exports = router;