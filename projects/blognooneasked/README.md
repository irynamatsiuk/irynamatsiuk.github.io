# Project: Blog "No One Asked"

### Curriculum: The Odin Project, Full Stack JavaScript path

### Course: NodeJS, chapter: "APIs"

## Description:

**No One Asked** is a full-stack blog platform built as three separate applications that work together to create a clean, modular, and scalable architecture:

1. Backend API – Node.js, Express, Prisma ORM, JWT
2. Admin Front-End – Vanilla JavaScript + pure CSS
3. Public Front-End (currently in development)

Splitting the platform into three independent projects keeps logic separated from presentation, enforces clearer boundaries, and allows the same backend to support multiple clients (web admin panel, public site, or even future mobile apps).

Live Demo: [No One Asked | Admin](https://irynamatsiuk.github.io/projects/blognooneasked/adminFrontend/index.html)  
_Note: this app is deployed on [render.com](https://render.com/) and it may take up to 60 seconds to load the app.  
Thanks, for your patience_

## Project Overview

This project is my deeper dive into building a fully modular full-stack application featuring:

- an Express/Prisma REST API
- a custom admin dashboard built entirely without frameworks
- a separate public-facing blog interface (in progress)
- full authentication using JWT tokens stored in cookies
- protected routes and input validation

#### Functionality

With the Admin Front-End, administrators can:

- authenticate
- create, edit, publish, and remove posts
- organize posts by status (drafts, published)
- moderate comments
- access detailed post views with associated comments
- work comfortably across mobile, tablet, and desktop screens
