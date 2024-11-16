const { EndEvent } = require('../model/eventCreationSchema');
const { v4: uuidv4 } = require('uuid');
const {cloudinaryUpload} = require("../utils/cloudinary");

//save image
async function handleUploadedFile(req, res) {
	try {
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded!' });
		}

		const {
			eventTitle,
			swagItems,
			eventType,
			eventDates,
			eventTimes,
			venue,
			speaker,
			authorId,
			eventDetails,
			organizerDetails,
		} = req.body;

		const splitedSwagItems = swagItems.split(',');
		const splitedDates = eventDates.split(',');
		const splitedTimes = eventTimes.split(',');
		const splitedSpeakers = speaker.split(',');


		const uniqueId =`thumbnail_${uuidv4()}`;
		const uploadResponse = await cloudinaryUpload(req.file.buffer, uniqueId);

		const event = new EndEvent({
			eventTitle: eventTitle,
			eventThumbnail: uploadResponse.secure_url,
			eventType: eventType,
			swagItems: splitedSwagItems,
			dates: splitedDates,
			times: splitedTimes,
			venue: venue,
			speaker: splitedSpeakers,
			author: authorId,
			eventDetails: eventDetails,
			organizer: organizerDetails,
		});



		await event.save();
		res.status(200).json({ message: 'Event published successfully!' });
	} catch (error) {

		res.status(500).json({
			error: {
				message: 'Internal server error',
			},
		});
	}
}

//find details
async function getEventDetails(req, res) {
	const { authorId, eventId } = req.query;
	try {
		if (authorId) {
			const events = await EndEvent.find({ author: authorId });
			return res.status(200).json(events);
		}
		if (eventId) {
			const event = await EndEvent.findById(eventId);

			if (!event) {
				return res.status(404).json({ error: 'Event not found' });
			}
			return res.status(200).json(event);
		}
		const events = await EndEvent.find();
		return res.status(200).json(events);
	} catch (error) {

		return res.status(500).json({ error: 'Error fetching events' });
	}
}

//edit event
async function updateEvents(req, res) {
	const { id } = req.params;
	const updateData = {};

	try {
		updateData.eventTitle = req.body.eventTitle || "";

		if (req.file) {
			const uniqueId = `thumbnail_${uuidv4()}`;
			const uploadResponse = await cloudinaryUpload(req.file.buffer, uniqueId);
			updateData.eventThumbnail = uploadResponse.secure_url;
		}

		updateData.eventType = req.body.eventType || "";
		updateData.venue = req.body.venue || "";
		updateData.eventDetails = req.body.eventDetails || "";
		updateData.organizer = req.body.organizerDetails || "";

		if (req.body.swagItems) {
			updateData.swagItems = req.body.swagItems.split(',') || [];
		}

		if (req.body.eventDates) {
			updateData.dates = req.body.eventDates.split(',') || [];
		}
		if (req.body.eventTimes) {
			updateData.times = req.body.eventTimes.split(',') || [];
		}

		if (req.body.speaker) {
			updateData.speaker = req.body.speaker.split(',') || [];
		}
		const updatedEvent = await EndEvent.findByIdAndUpdate(id, updateData, {
			new: true,
		});

		if (!updatedEvent) {
			return res.status(404).json({ message: 'Event not found' });
		}

		res.status(200).json({ message: 'Event updated successfully', updatedEvent });
	} catch (error) {
		console.error('Error updating event:', error);
		res.status(500).json({ error: 'Server error' });
	}
}




//delete event
async function deleteEvent(req, res) {
	const { eventId } = req.query;
	try {
		const deletedEvent = await EndEvent.findByIdAndDelete(eventId);
		if (deletedEvent) {
			res
				.status(200)
				.json({ success: true, message: 'Event deleted successfully!' });
		} else {
			res.status(404).json({ success: false, message: 'Event not found!' });
		}
	} catch (error) {
		res.status(500).json({ success: false, message: 'Internal server error!' });
	}
}

module.exports = {
	handleUploadedFile,
	getEventDetails,
	updateEvents,
	deleteEvent,
};
