const multer = require("multer");
const path = require("path");
const { EndEvent } = require("../model/eventCreationSchema");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "public", "uploads");
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
    );
  },
});

const multipleFileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      "multipleUploads"
    );
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
    );
  },
});

const uploadToStorage = multer({ storage: storage });
const uploadToMultipleFileStorage = multer({ storage: multipleFileStorage });

//save image
async function handleUploadedFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
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

    const splitedSwagItems = swagItems.split(",");
    const splitedDates = eventDates.split(",");
    const splitedTimes = eventTimes.split(",");
    const splitedSpeakers = speaker.split(",");

    // const orgFiles = req.files["orgThumbnail"];
    // const orgThumbnails = orgFiles.map((item) => item.filename);

    // console.log("Received orgThumbnail files:", orgFiles);

    const event = new EndEvent({
      eventTitle: eventTitle,
      eventThumbnail: req.file.filename,
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

    console.log(`newevent: ${event}`);

    // Save the event to the database
    await event.save();
    res.status(200).json({ message: "Event created successfully!" });
  } catch (error) {
    console.error(`Er: ${error}`);
    res.status(500).json({
      error: {
        message: "Internal server error",
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
      console.log(event);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      return res.status(200).json(event);
    }
    const events = await EndEvent.find();
    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching events" });
  }
}

//edit event
async function updateEvents(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (req.file) {
      updateData.eventThumbnail = req.file.filename;
    }
    const updatedEvent = await EndEvent.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Server error" });
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
        .json({ success: true, message: "Event deleted successfully!" });
    } else {
      res.status(404).json({ success: false, message: "Event not found!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

module.exports = {
  uploadToStorage,
  uploadToMultipleFileStorage,
  handleUploadedFile,
  getEventDetails,
  updateEvents,
  deleteEvent,
};
