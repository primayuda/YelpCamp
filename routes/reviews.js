const express = require('express');
const router = express.Router({mergeParams: true});

const Campground = require('../models/campground');
const Review = require('../models/review');

const reviews = require('../controllers/reviews');

const { reviewSchema } = require('../schemas.js');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const wrapAsync = require('../utils/wrapAsync');

router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview));

module.exports = router;