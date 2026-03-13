Employee Insights Dashboard
Overview

The Employee Insights Dashboard is a React-based application built to demonstrate frontend engineering concepts such as authentication, performance optimization, browser hardware interaction, and custom data visualization.

The application consists of four screens:

Login Page – Secure authentication with session persistence

Employee List Page – High-performance virtualized employee grid

Details Page – Camera capture and signature verification

Analytics Page – Salary distribution visualization using SVG

The project follows the engineering constraints defined in the assignment.

Tech Stack

React

React Router

Tailwind CSS

HTML5 Canvas API

MediaDevices Camera API

SVG for visualization

No UI component libraries (MUI, Bootstrap, Ant Design) or virtualization libraries were used.

Features
1. Secure Authentication

Login credentials:

Username: testuser
Password: Test123

Implementation:

React Context API for global authentication state

Session persistence using localStorage

Protected routes using a PrivateRoute component

Redirects unauthorized users to login

If a user tries to access:

/list

without logging in, they are redirected to:

/

2. Employee List (Custom Virtualized Grid)

Employee data is fetched from the API:

POST https://backend.jotish.in/backend_dev/gettabledata.php

Payload:

username=test
password=123456

Since datasets can be large, the list uses custom virtualization so only visible rows are rendered in the DOM.

This significantly improves performance and reduces unnecessary rendering.

Virtualization Logic

Key variables:

rowHeight

scrollTop

containerHeight

Calculation:

startIndex = Math.floor(scrollTop / rowHeight)

visibleRows = Math.ceil(containerHeight / rowHeight)

endIndex = startIndex + visibleRows

Rows are rendered using:

employees.slice(startIndex, endIndex)

Each row is positioned using:

top = index * rowHeight

This preserves scroll height while rendering only visible rows.

3. Identity Verification (Details Page)

Accessible via:

/details/:id

Features implemented:

Camera Capture

Uses the browser MediaDevices API to capture a profile photo.

navigator.mediaDevices.getUserMedia()

The captured frame is drawn onto a canvas and converted to Base64.

Signature Canvas

Users sign their name directly on an HTML5 canvas using mouse or touch events.

Canvas events used:

mousedown

mousemove

mouseup

The signature is stored as a Base64 image.

Image Merge

The captured photo and signature are merged into a single image.

Process:

Create a new canvas

Draw the captured photo

Overlay the signature

Export the result using canvas.toDataURL()

The final output is displayed as the Merged Audit Image.

4. Analytics Page

The analytics screen visualizes salary distribution per city using raw SVG elements.

SVG elements used:

<rect>

<text>

Bar heights are calculated relative to the maximum salary value.

No chart libraries (Chart.js, D3, etc.) were used.

Intentional Bug

As required by the assignment, one intentional performance vulnerability is included.

Location:
src/components/CameraCapture.jsx

Issue:

The camera stream obtained using:

navigator.mediaDevices.getUserMedia()

is never stopped after capturing the photo.

The correct implementation should call:

stream.getTracks().forEach(track => track.stop())

However this cleanup is intentionally omitted.

Impact:

The camera continues running in the background

Causes a potential memory leak

This bug is intentionally included to demonstrate awareness of browser resource management.

Running the Project

Install dependencies:

npm install

Start the development server:

npm start

Open the application in the browser:

http://localhost:3000

Application Flow

Login using provided credentials

View the employee list

Scroll through the virtualized grid

Open employee details

Capture photo

Add signature

Merge image

View analytics chart
