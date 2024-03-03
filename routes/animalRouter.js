const express = require('express');
const router = express.Router();

const { updateAnimalQuantity, getAnimalRatio, getAnimalByAnswer, getAnimalQuestionList } = require('../controllers/animalController');

router
    .route('/')
    .get(getAnimalQuestionList)
    .post(updateAnimalQuantity);

router
    .route('/result/:answer')
    .get(getAnimalByAnswer);


router
    .route('/ratio')
    .get(getAnimalRatio);

module.exports = router