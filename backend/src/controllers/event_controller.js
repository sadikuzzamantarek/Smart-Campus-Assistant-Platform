import mongoose from "mongoose";
import Event from "../models/event_model.js";
import { updateEventStatus } from "../utils/helpers.js";
import { responseReturn } from "../utils/response.js";

export default class EventController {
  //creating an event
  createEvent = async (req, res) => {
    try {
      const {
        title,
        category,
        origin,
        eventDate,
        registrationDeadline,
        eventEndDate,
        status,
      } = req.body;

      // Validation
      if (
        !title ||
        !category ||
        !origin ||
        !eventDate ||
        !registrationDeadline ||
        !eventEndDate
      ) {
        return responseReturn(
          res,
          false,
          400,
          "Please provide all required fields: title, category, origin, eventDate, registrationDeadline, eventEndDate",
        );
      }

      // Date validation
      const eventDateObj = new Date(eventDate);
      const regDeadlineObj = new Date(registrationDeadline);
      const eventEndDateObj = new Date(eventEndDate);

      if (regDeadlineObj > eventDateObj) {
        return responseReturn(
          res,
          false,
          400,
          "Registration deadline must be before or on the event start date",
        );
      }

      if (eventDateObj > eventEndDateObj) {
        return responseReturn(
          res,
          false,
          400,
          "Event start date must be before or on event end date",
        );
      }

      // Auto-calculate status if not provided
      let finalStatus = status;
      if (!finalStatus) {
        const now = new Date();
        if (now < regDeadlineObj) finalStatus = "upcoming";
        else if (now >= eventDateObj && now <= eventEndDateObj)
          finalStatus = "running";
        else finalStatus = "closed";
      }

      const newEvent = new Event({
        title,
        category,
        origin,
        eventDate: eventDateObj,
        registrationDeadline: regDeadlineObj,
        eventEndDate: eventEndDateObj,
        status: finalStatus,
      });

      const savedEvent = await newEvent.save();

      return responseReturn(
        res,
        true,
        201,
        "Event created successfully",
        savedEvent,
      );
    } catch (error) {
      console.error("Create event error:", error);
      return responseReturn(
        res,
        false,
        500,
        error.message || "Server Error While Creating Event",
      );
    }
  };

  // getting all event
  getAllEvents = async (req, res) => {
    try {
      const { status, category, origin, startDate, endDate } = req.query;
      let filter = {};
      if (status) filter.status = status;
      if (category) filter.category = category;
      if (origin) filter.origin = origin;
      if (startDate || endDate) {
        filter.eventDate = {};
        if (startDate) filter.eventDate.$gte = new Date(startDate);
        if (endDate) filter.eventDate.$lte = new Date(endDate);
      }

      const events = await Event.find(filter).sort({ eventDate: 1 });
      return responseReturn(
        res,
        true,
        200,
        "Events retrieved successfully",
        events,
      );
    } catch (error) {
      console.error(error);
      return responseReturn(
        res,
        false,
        500,
        "Server error while fetching events",
        error.message,
      );
    }
  };

  //get single event
  getEventById = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return responseReturn(res, false, 400, "Invalid event ID format");
      }

      const event = await Event.findById(id);
      if (!event) {
        return responseReturn(res, false, 404, "Event not found");
      }

      // Update status if dates have changed (optional consistency)
      const currentStatus = updateEventStatus(event);
      if (currentStatus !== event.status) {
        event.status = currentStatus;
        await event.save();
      }

      return responseReturn(
        res,
        true,
        200,
        "Event retrieved successfully",
        event,
      );
    } catch (error) {
      console.error(error);
      return responseReturn(
        res,
        false,
        500,
        "Server error while fetching event",
        error.message,
      );
    }
  };
}
