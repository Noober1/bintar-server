const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/user')
const packageRoutes = require('../routes/package')


router.get('/', (req, res) => res.send('OK'));

router.use('/users', userRoutes);
router.use('/packages', packageRoutes);

module.exports = router;