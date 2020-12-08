const express = require('express');
const router = express.Router();
const controller = require('../controllers/package')
const { authToken } = require('../middlewares/auth')

/**
 * Tampilkan daftar paket soal
 * @APIget - Tampilkan paket soal berdasarkan id tunggal atau JSON array id
 * @APIpatch - Update data berdasarkan id
 * @public
 */
router
  .route('/')
  .get(authToken, controller.list)

/**
 * Tampilkan paket soal berdasarkan id
 * @APIget - Tampilkan paket soal berdasarkan id tunggal atau JSON array id
 * @public
 */
router
  .route('/id')
  .get(authToken, controller.getById)

/**
 * Tampilkan paket soal berdasarkan kode server
 * @APIget - Tampilkan paket soal berdasarkan id tunggal atau JSON array id
 * @public
 */
router
  .route('/server')
  .get(authToken, controller.getByServer)

router
  .route('/:packageId')
  .patch(authToken, controller.updateById)

module.exports = router;