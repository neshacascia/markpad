# markpad
> Markpad is an in-browser markdown editor application. Users can create and access their markdown documents as needed. As they edit, they can instantly view a formatted preview alongside the markdown content. App is optimized for saving the formatted documents as PDFs.

## Demo
[Live Demo](https://markpad.up.railway.app/)

<img src="./client/public/assets/screenshot.png" alt="" border="0" width="100%">

## Built with
- React, Vite
- Flask, Python
- MySQL
- Flask-JWT-Extended
- React-Markdown
- HTML2PDF.js
- TailwindCSS
- HTML5/CSS3
- Hosted on Railway

## Features
#### Home Page:
- Call to action buttons for signing up and logging into an account
- Explore Demo button to allow users to test out the application as a demo user

#### Auth Page:
- User authentication supported with Flask JWT Extended with email and password encryption using Bcrypt password-hashing
- Custom form validation for login and sign up pages

#### Document Page:
- Create, read, update, and delete markdown documents
- Name and save documents to be accessed as needed
- Edit the markdown of a document and see the formatted preview of the content
- View a full-page preview of the formatted content
- Save the formatted documents as PDFs
- Hide/show the board sidebar
- Toggle the theme between light/dark modes

## Optimizations
### Cookies and Security Enhancements
For secure authentication, I decided to use Flask-JWT-Extended for managing JSON Web Tokens. I configured the app to use cookies for storing JWTs because they can only be sent over HTTPS. This ensures they cannot be accidentally sent and compromised over an unsecure connection. After successful signup or login, the token is stored in an HTTP-Only cookie, enhancing security over XSS attacks as the cookie cannot be accessed via JavaScript.

This extension also provided additional protection against Cross-Site Request Forgery attacks by implementing double submit verification. This requires all requests to include an `X-CSRF-TOKEN` header containing the value of the double submit token. The server then validates this token against the one stored in the JWT; if it doesn't match it results in the request being kicked out as invalid. To streamline this, I implemented a reusable `getCookie` utility function so it can imported wherever needed, allowing easy retrieval of the CSRF token from the cookies to ensure it is present in the request headers.

### Implicitly Refreshing JWTs
To address the issue of token expiration and ensure a seamless user experience, I implemented automatic token refreshing in the app. Following Flask-JWT's recommended approach, I set up a mechanism to implicitly refresh tokens that are within 30 minutes of expiring. I implemented this logic within the `create_app` function, ensuring the user's session is extended. When a token is refreshed, the new token is stored in the response cookies, allowing the frontend to continue operating with updated credentials and users remain authenticated and authorized without being prompted to log in again.

## Running this Project Locally
#### Server
In one terminal:
1. Create `.env` variables `SECRET_KEY` and `JWT_SECRET_KEY`
2. Run `pip install -r requirements.txt` to install all relevant packages and dependencies
3. Run `source bin/activate` to activate the virtual environment
4. Run `flask run` to start a dev server and view the project in your browser

#### Client
In a second terminal:
1. `cd` to the `client` directory
2. Run `npm install` to install all relevant dependencies
3. Run `npm run dev` to start a dev server and view the project in your browser
