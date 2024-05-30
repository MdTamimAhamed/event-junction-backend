const express = require('express');
const router = express.Router();
const { signupAdmin, loginAdmin } = require('../controller/userController');
const {
	adminSignupValidators,
	adminSignupValidatorsErrorHandler,
} = require('../validators/signupValidator');

const {
	adminLoginValidators,
	adminLoginValidatorErrorHandler,
} = require('../validators/loginValidator');

const {
	uploadToStorage,
	handleUploadedFile,
	getEventDetails,
	updateEvents,
	deleteEvent,
} = require('../controller/eventController');

//routes
router.post(
	'/signup',
	adminSignupValidators,
	adminSignupValidatorsErrorHandler,
	signupAdmin
);
router.post(
	'/login',
	adminLoginValidators,
	adminLoginValidatorErrorHandler,
	loginAdmin
);

router.post(
	'/add-event',
	uploadToStorage.single('eventThumbnail'),
	handleUploadedFile
);

router.patch(
	'/update-event/:id',
	uploadToStorage.single('eventThumbnail'),
	updateEvents
);

router.get('/get-event', getEventDetails);
router.delete('/get-event', deleteEvent);

module.exports = router;
