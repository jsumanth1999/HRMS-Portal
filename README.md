
# Leaves Management API Documentation

This documentation provides an overview of the RESTful API for managing leave types, leave counts, and user leave applications. The API is designed for both administrators and users, with specific roles determining access to various endpoints.

---

## **Table of Contents**

1. [Leave Types Collection](#leave-types-collection)
2. [Leaves Count Collection](#leaves-count-collection)
3. [Leaves](#leaves)

---

## **1. Leave Types Collection**
Endpoints for managing leave types (admin-only access).

### **Endpoints**

#### **POST** `/leaves/types` (Admin)
- **Description**: Create a new leave type.
- **Request Body**:
  ```json
  {
      "status": "active/inactive", // Optional, defaults to "active"
      "name": "string",           // Name of the leave type
      "count": "number"           // Default leave count for this type
  }
  ```

#### **GET** `/leaves/types` (Admin)
- **Description**: Retrieve a list of all leave types.

#### **GET By ID** `/leaves/types/:id` (Admin)
- **Description**: Retrieve details of a specific leave type by its ID.

#### **PATCH** `/leaves/types/:id` (Admin)
- **Description**: Update details of a specific leave type.

#### **DELETE** `/leaves/types/:id` (Admin)
- **Description**: Delete a leave type by its ID.

---

## **2. Leaves Count Collection**
Endpoints for managing leave balances and leave activity logs for users.

### **Endpoints**

#### **POST** `/leaves/count` (Admin)
- **Description**: Initialize or update a user's leave balance.
- **Request Body**:
  ```json
  {
      "userId": "string",         // ID of the user
      "typeId": "string",         // ID of the leave type
      "opening": "number",        // Opening balance of leaves
      "accured": "number",        // Accrued leaves over time
      "applied": "number",        // Total applied leaves
      "approved": "number",       // Approved leaves
      "rejected": "number",       // Rejected leaves
      "cancelled": "number",      // Cancelled leave applications
      "encashed": "number",       // Encashed leaves
      "lapsed": "number",         // Lapsed leaves
      "balance": "number"         // Current leave balance
  }
  ```

#### **GET** `/leaves/count` (Admin/User)
- **Description**: Retrieve leave balances and activity logs for users.

#### **GET By ID** `/leaves/count/:id` (Admin)
- **Description**: Retrieve details of a specific leave count by its ID.

#### **PATCH** `/leaves/count/:id` (Admin)
- **Description**: Update a specific leave count record.

#### **DELETE** `/leaves/count/:id` (Admin)
- **Description**: Delete a specific leave count record.

---

## **3. Leaves**
Endpoints for managing leave applications for users and handling admin actions.

### **Endpoints**

#### **POST** `/leaves/apply` (User)
- **Description**: Submit a leave application.
- **Request Body**:
  ```json
  {
      "typeId": "string",          // ID of the leave type
      "fromDate": "YYYY-MM-DD",   // Start date of the leave
      "toDate": "YYYY-MM-DD",     // End date of the leave
      "reasonForApplying": "string", // Reason for applying
      "status": "string"           // Leave status (optional)
  }
  ```

#### **GET** `/leaves` (User)
- **Description**: Retrieve a list of the user's leave applications.

#### **GET By ID** `/leaves/:id` (User)
- **Description**: Retrieve details of a specific leave application by its ID.

#### **PUT** `/leaves/:id` (User)
- **Description**: Update a specific leave application.

#### **DELETE** `/leaves/:id` (User)
- **Description**: Cancel a leave application.

#### **POST** `/leaves/:id/action` (Admin)
- **Description**: Perform actions (approve/reject) on a leave application.
- **Request Body**:
  ```json
  {
      "status": "approved/rejected", // Status of the action
      "approveReason": "string",     // Reason for approval (if applicable)
      "approvedBy": "string",        // Admin who approved
      "approvedAt": "datetime",      // Approval timestamp
      "rejectReason": "string",      // Reason for rejection (if applicable)
      "rejectedBy": "string",        // Admin who rejected
      "rejectedAt": "datetime"       // Rejection timestamp
  }
  ```

---

## **Access Control**
- **Admin**: Has access to all endpoints to manage leave types, leave counts, and actions on leave applications.
- **User**: Limited access to managing and viewing their own leave applications.

---

## **Error Responses**
- **400 Bad Request**: Invalid request parameters or body.
- **401 Unauthorized**: User is not authenticated.
- **403 Forbidden**: User does not have the required permissions.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: An unexpected server error occurred.

---

## **Notes**
- Dates should follow the `YYYY-MM-DD` format.
- Status values for leave applications and actions must be validated against allowed values.
- Ensure role-based access control is enforced on all endpoints.

