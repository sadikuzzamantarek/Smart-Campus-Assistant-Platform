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
      console.error("getting all event error: " + error);
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
      console.error("getting single event error: " + error);
      return responseReturn(
        res,
        false,
        500,
        "Server error while fetching event",
        error.message,
      );
    }
  };

  //update event details
  updateEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return responseReturn(res, false, 400, "Invalid event ID format");
      }

      delete updates._id;
      delete updates.createdAt;
      delete updates.__v;

      const existingEvent = await Event.findById(id);
      if (!existingEvent) {
        return responseReturn(res, false, 404, "Event not found");
      }

      // Prepare updated dates
      let eventDate = updates.eventDate
        ? new Date(updates.eventDate)
        : existingEvent.eventDate;
      let regDeadline = updates.registrationDeadline
        ? new Date(updates.registrationDeadline)
        : existingEvent.registrationDeadline;
      let eventEndDate = updates.eventEndDate
        ? new Date(updates.eventEndDate)
        : existingEvent.eventEndDate;

      if (regDeadline > eventDate) {
        return responseReturn(
          res,
          false,
          400,
          "Registration deadline must be on or before event start date",
        );
      }
      if (eventDate > eventEndDate) {
        return responseReturn(
          res,
          false,
          400,
          "Event start date must be on or before event end date",
        );
      }

      // Auto‑status if not manually set
      if (!updates.status) {
        const now = new Date();
        if (now < regDeadline) updates.status = "upcoming";
        else if (now >= eventDate && now <= eventEndDate)
          updates.status = "running";
        else updates.status = "closed";
      }

      updates.modifiedAt = new Date();

      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true, runValidators: true },
      );

      return responseReturn(
        res,
        true,
        200,
        "Event updated successfully",
        updatedEvent,
      );
    } catch (error) {
      console.error("event update error: " + error);
      return responseReturn(
        res,
        false,
        500,
        "Server error while updating event",
        error.message,
      );
    }
  };

  deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return responseReturn(res, false, 400, "Invalid event ID format");
      }

      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
        return responseReturn(res, false, 404, "Event not found");
      }

      return responseReturn(
        res,
        true,
        200,
        "Event deleted successfully",
        deletedEvent,
      );
    } catch (error) {
      console.error(error);
      return responseReturn(
        res,
        false,
        500,
        "Server error while deleting event",
        error.message,
      );
    }
  };
}
