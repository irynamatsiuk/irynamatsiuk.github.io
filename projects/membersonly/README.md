# Project: Members Only App "Friends"

### Curriculum: The Odin Project, Full Stack JavaScript path

### Course: NodeJS, chapter: "Authentication"

#### Description:

Full-stack project built using backend framework **Express**, **PostgreSQL** database, **EJS** templating engine, and **SASS** for styling, implementing user authentication with **Passport.js** (LocalStrategy), validation and sanitization with **Express-validator** and role-based access control.

Live: [Friends](https://imatsiuk-membersonly.onrender.com/)  
_Note: this app is deployed on [render.com](https://render.com/) and most of the time it takes 30 to 60 seconds to load the app.  
Thanks, for your patience_

---

## 🔐 Features

### 🧑‍🤝‍🧑 Role-Based Access Control

- **Guest**
  - Can view all messages (author and timestamp hidden)
  - Can sign up using full name, username, and password
  - Can reset a database to the default state

- **Logged-in User**
  - Can create messages
  - Can upgrade status to:
    - **Member** – by checking a box
    - **Admin** – by entering a secret code: `4321`

- **Member**
  - Can see message author and publication timestamp
  - Can become an **Admin** or leave the membership

- **Admin**
  - Can delete any message
  - Can become a Member or give up **Admin** privileges.

### 👥 Try It

You can create your own user or register one of these:  
_(Note: reset the database if needed)_

| Username       | Password  | First Name | Last Name |
| -------------- | --------- | ---------- | --------- |
| fashionqueen   | Gr33nPa55 | Rachel     | Green     |
| chandlerBing77 | Ch4nB1ng  | Chandler   | Bing      |

---

## 🔑 User Authentication

- Passwords are securely hashed using **bcrypt**
- Authentication handled by **Passport.js** with LocalStrategy

---

## ✅ Form Validation & Sanitization

Using **express-validator**, the following checks are made on sign-up:

- **Username**: must not already exist
- **Password**:
  - 5–20 characters
  - At least one uppercase letter, one lowercase letter, and one digit
- **First & Last Names**:
  - Required
  - Letters only
  - Trimmed (no leading/trailing whitespace)
  - Escaped using `.escape()` to prevent HTML/script injection

---

## 🎨 Styling with SASS

Although the original assignment didn't require styling, this project uses **SASS** for clean, modular, and maintainable CSS.  
SASS is compiled to CSS and served alongside server-rendered EJS views.
