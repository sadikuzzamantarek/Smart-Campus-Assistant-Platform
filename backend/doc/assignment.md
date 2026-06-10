# Assignment Management API

## Base URL

```http
{BASE_URL}/api
```

Example:

```http
http://localhost:5000/api
```

---

# Endpoints Overview

| Method | Endpoint                     | Description                    |
| ------ | ---------------------------- | ------------------------------ |
| GET    | `/get-all-assignments`       | Retrieve all assignments       |
| GET    | `/get-single-assignment/:id` | Retrieve a specific assignment |
| POST   | `/create-assignment`         | Create a new assignment        |
| PUT    | `/update-assignment/:id`     | Update an existing assignment  |
| DELETE | `/delete-assignment/:id`     | Delete an assignment           |

---

# 1. Get All Assignments

Returns all assignments stored in the database.

## Endpoint

```http
GET /get-all-assignments
```

## Example Request

```http
GET /api/get-all-assignments
```

## Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Assignments fetched successfully",
  "data": [
    {
      "_id": "684f8f2c1234567890abcdef",
      "assignment_title": "Database Project",
      "assignment_no": 1,
      "course_code": "CSE-3100",
      "course_title": "Database Management System",
      "description": "Design a database system",
      "deadline_date": "2026-06-30T00:00:00.000Z",
      "level_term": "Level-3 Term-1",
      "status": "pending"
    }
  ]
}
```

## No Assignments Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "No Assignment Yet",
  "data": []
}
```

---

# 2. Get Assignment By ID

Returns a single assignment using its MongoDB ID.

## Endpoint

```http
GET /get-single-assignment/:id
```

## Example Request

```http
GET /api/get-single-assignment/684f8f2c1234567890abcdef
```

## Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Assignment fetched successfully",
  "data": {
    "_id": "684f8f2c1234567890abcdef",
    "assignment_title": "Database Project",
    "assignment_no": 1,
    "course_code": "CSE-3100",
    "course_title": "Database Management System",
    "description": "Design a database system",
    "deadline_date": "2026-06-30T00:00:00.000Z",
    "level_term": "Level-3 Term-1",
    "status": "pending"
  }
}
```

## Error Response

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Assignment not found"
}
```

---

# 3. Create Assignment

Creates a new assignment.

## Endpoint

```http
POST /create-assignment
```

## Request Body

```json
{
  "assignment_title": "Database Project",
  "assignment_no": 1,
  "course_code": "CSE-3100",
  "course_title": "Database Management System",
  "description": "Design and implement a database system",
  "deadline_date": "2026-06-30",
  "level_term": "Level-3 Term-1",
  "status": "pending"
}
```

## Required Fields

| Field            | Type   |
| ---------------- | ------ |
| assignment_title | String |
| assignment_no    | Number |
| course_code      | String |
| course_title     | String |
| description      | String |
| deadline_date    | Date   |
| level_term       | String |

## Optional Fields

| Field  | Type   | Default |
| ------ | ------ | ------- |
| status | String | pending |

## Success Response

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Assignment created successfully",
  "data": {
    "_id": "684f8f2c1234567890abcdef",
    "assignment_title": "Database Project",
    "assignment_no": 1,
    "course_code": "CSE-3100",
    "course_title": "Database Management System",
    "description": "Design and implement a database system",
    "deadline_date": "2026-06-30T00:00:00.000Z",
    "level_term": "Level-3 Term-1",
    "status": "pending"
  }
}
```

## Missing Fields Response

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Missing required fields"
}
```

## Duplicate Assignment Response

```json
{
  "success": false,
  "statusCode": 403,
  "message": "Assignment already existed with the same number. Same course can not have multiple same assignment numbers."
}
```

---

# 4. Update Assignment

Updates an existing assignment.

## Endpoint

```http
PUT /update-assignment/:id
```

## Example Request

```http
PUT /api/update-assignment/684f8f2c1234567890abcdef
```

## Request Body

Only include the fields you want to update.

```json
{
  "assignment_title": "Updated Database Project",
  "description": "Updated project requirements",
  "status": "completed"
}
```

## Protected Fields

The following fields cannot be updated:

```text
_id
assigned_date
modified_date
```

## Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Assignment updated successfully",
  "data": {
    "_id": "684f8f2c1234567890abcdef",
    "assignment_title": "Updated Database Project",
    "status": "completed"
  }
}
```

## Error Responses

### Assignment Not Found

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Assignment not found"
}
```

### Duplicate Assignment Number

```json
{
  "success": false,
  "statusCode": 403,
  "message": "Assignment already existed with the same number. Same course can not have multiple same assignment numbers."
}
```

---

# 5. Delete Assignment

Deletes an assignment using its ID.

## Endpoint

```http
DELETE /delete-assignment/:id
```

## Example Request

```http
DELETE /api/delete-assignment/684f8f2c1234567890abcdef
```

## Success Response

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Assignment deleted successfully"
}
```

## Error Response

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Assignment not found"
}
```

---

# Assignment Object Schema

```json
{
  "_id": "ObjectId",
  "assignment_title": "String",
  "assignment_no": "Number",
  "course_code": "String",
  "course_title": "String",
  "description": "String",
  "deadline_date": "Date",
  "level_term": "String",
  "status": "pending | completed | ongoing"
}
```

---

# Business Rules

### Assignment Uniqueness

Assignments are unique based on:

```text
course_code + assignment_no
```

Example:

```json
{
  "course_code": "CSE-3100",
  "assignment_no": 1
}
```

A course cannot contain multiple assignments with the same assignment number.

### Default Status

If no status is provided during creation:

```json
{
  "status": "pending"
}
```

will be assigned automatically.

---

# HTTP Status Codes

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | Success               |
| 201         | Resource Created      |
| 400         | Bad Request           |
| 403         | Duplicate Assignment  |
| 404         | Assignment Not Found  |
| 500         | Internal Server Error |

```
```
