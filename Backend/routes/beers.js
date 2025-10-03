const express = require('express');
const router = express.Router();
const beerController = require('../controllers/beers');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/add-beer', verifyToken, upload.single('image'), beerController.addBeer);
router.get('/beers', beerController.getAllBeer);
router.get('/beer/:beerId', beerController.getOneBeer);

module.exports = router;
