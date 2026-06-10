# Event Management API Documentation

## Base URL

```http id="evb1"
{BASE_URL}/api
```

Example:

```http id="evb2"
http://localhost:5000/api
```

---

# Event Routes Overview

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| GET    | `/get-all-events`       | Get all events (with filters) |
| GET    | `/get-single-event/:id` | Get single event by ID        |
| POST   | `/create-event`         | Create a new event            |
| PUT    | `/update-event/:id`     | Update an event               |
| DELETE | `/delete-event/:id`     | Delete an event               |

---

# 1. Create Event

Create a new event with automatic status handling.

## Endpoint

```http id="evc1"
POST /create-event
```

## Request Body

```json id="evc2"
{
  "title": "Tech Fest 2026",
  "category": "Technology",
  "origin": "BAUST",
  "eventDate": "2026-07-10",
  "registrationDeadline": "2026-07-01",
  "eventEndDate": "2026-07-12",
  "status": "upcoming"
}
```

## Required Fields

| Field                | Type   |
| -------------------- | ------ |
| title                | String |
| category             | String |
| origin               | String |
| eventDate            | Date   |
| registrationDeadline | Date   |
| eventEndDate         | Date   |

## Optional Fields

| Field  | Type   | Default         |
| ------ | ------ | --------------- |
| status | String | Auto-calculated |

---

## Status Auto Rules

If `status` is not provided:

* If current date < registrationDeadline → `upcoming`
* If event is running → `running`
* If event ended → `closed`

---

## Success Response

```json id="evc3"
{
  "success": true,
  "statusCode": 201,
  "message": "Event created successfully",
  "data": {
    "_id": "66c9a1f2e123456789abcd01",
    "title": "Tech Fest 2026",
    "category": "Technology",
    "origin": "BAUST",
    "eventDate": "2026-07-10T00:00:00.000Z",
    "registrationDeadline": "2026-07-01T00:00:00.000Z",
    "eventEndDate": "2026-07-12T00:00:00.000Z",
    "status": "upcoming"
  }
}
```

---

## Validation Errors

### Missing Fields

```json id="evc4"
{
  "success": false,
  "statusCode": 400,
  "message": "Please provide all required fields: title, category, origin, eventDate, registrationDeadline, eventEndDate"
}
```

### Date Rule Violation

```json id="evc5"
{
  "success": false,
  "statusCode": 400,
  "message": "Registration deadline must be before or on the event start date"
}
```

---

# 2. Get All Events

Fetch all events with optional filters.

## Endpoint

```http id="eva1"
GET /get-all-events
```

## Query Parameters (Filters)

| Query     | Description                 |
| --------- | --------------------------- |
| status    | upcoming / running / closed |
| category  | Event category              |
| origin    | Event origin                |
| startDate | Filter from date            |
| endDate   | Filter to date              |

---

## Example Request

```http id="eva2"
GET /api/get-all-events?status=upcoming&category=Technology
```

---

## Success Response

```json id="eva3"
{
  "success": true,
  "statusCode": 200,
  "message": "Events retrieved successfully",
  "data": [
    {
      "_id": "66c9a1f2e123456789abcd01",
      "title": "Tech Fest 2026",
      "category": "Technology",
      "origin": "BAUST",
      "eventDate": "2026-07-10T00:00:00.000Z",
      "registrationDeadline": "2026-07-01T00:00:00.000Z",
      "eventEndDate": "2026-07-12T00:00:00.000Z",
      "status": "upcoming"
    }
  ]
}
```

---

## No Data Response

```json id="eva4"
{
  "success": true,
  "statusCode": 200,
  "message": "No Events Yet",
  "data": []
}
```

---

# 3. Get Single Event

Retrieve a single event by ID.

## Endpoint

```http id="evs1"
GET /get-single-event/:id
```

## Example

```http id="evs2"
GET /api/get-single-event/66c9a1f2e123456789abcd01
```

---

## Success Response

```json id="evs3"
{
  "success": true,
  "statusCode": 200,
  "message": "Event retrieved successfully",
  "data": {
    "_id": "66c9a1f2e123456789abcd01",
    "title": "Tech Fest 2026",
    "category": "Technology",
    "origin": "BAUST",
    "eventDate": "2026-07-10T00:00:00.000Z",
    "registrationDeadline": "2026-07-01T00:00:00.000Z",
    "eventEndDate": "2026-07-12T00:00:00.000Z",
    "status": "upcoming"
  }
}
```

---

## Error Response

```json id="evs4"
{
  "success": false,
  "statusCode": 404,
  "message": "Event not found"
}
```

---

# 4. Update Event

Update event details with validation and auto status recalculation.

## Endpoint

```http id="evu1"
PUT /update-event/:id
```

---

## Example Request

```http id="evu2"
PUT /api/update-event/66c9a1f2e123456789abcd01
```

---

## Request Body

Send only fields you want to update:

```json id="evu3"
{
  "title": "Updated Tech Fest 2026",
  "eventDate": "2026-07-11",
  "status": "running"
}
```

---

## Protected Fields

These fields cannot be updated:

```text id="evu4"
_id
createdAt
__v
```

---

## Validation Rules

* Registration deadline must be ≤ event start date
* Event start date must be ≤ event end date

---

## Success Response

```json id="evu5"
{
  "success": true,
  "statusCode": 200,
  "message": "Event updated successfully",
  "data": {
    "_id": "66c9a1f2e123456789abcd01",
    "title": "Updated Tech Fest 2026",
    "status": "running"
  }
}
```

---

# 5. Delete Event

Delete an event by ID.

## Endpoint

```http id="evd1"
DELETE /delete-event/:id
```

---

## Example Request

```http id="evd2"
DELETE /api/delete-event/66c9a1f2e123456789abcd01
```

---

## Success Response

```json id="evd3"
{
  "success": true,
  "statusCode": 200,
  "message": "Event deleted successfully",
  "data": {
    "_id": "66c9a1f2e123456789abcd01"
  }
}
```

---

## Error Response

```json id="evd4"
{
  "success": false,
  "statusCode": 404,
  "message": "Event not found"
}
```

---

# Event Data Model

```json id="evm1"
{
  "_id": "ObjectId",
  "title": "String",
  "category": "String",
  "origin": "String",
  "eventDate": "Date",
  "registrationDeadline": "Date",
  "eventEndDate": "Date",
  "status": "upcoming | running | closed",
  "createdAt": "Date",
  "modifiedAt": "Date"
}
```

---

# Status Logic Summary

| Condition                      | Status   |
| ------------------------------ | -------- |
| Now < registrationDeadline     | upcoming |
| eventDate ≤ now ≤ eventEndDate | running  |
| now > eventEndDate             | closed   |

---

# HTTP Status Codes

| Code | Meaning      |
| ---- | ------------ |
| 200  | Success      |
| 201  | Created      |
| 400  | Bad Request  |
| 404  | Not Found    |
| 500  | Server Error |

```
```
