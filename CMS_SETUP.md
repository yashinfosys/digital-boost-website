# Digital Boost CMS Setup

## What Is Included

- Public React + Tailwind website with React Router routes.
- React admin dashboard at `/admin/login`.
- Node.js + Express REST API.
- MongoDB models for pages, services, packages, portfolio, blogs, gallery, testimonials, FAQ, inquiries, settings, media and admins.
- JWT authentication, bcrypt password hashing, role-based admin access, rate limiting, CORS and image upload validation.
- Protected Yash Infosystems developer credit in the settings API.

## Install

```bash
npm install
```

## Environment

Copy `.env.example` to `.env` and update values:

```bash
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/digital_boost_cms
JWT_SECRET=change-this-secret-in-production
CLIENT_URL=http://127.0.0.1:5173
SUPER_ADMIN_EMAIL=admin@yashinfosystem.in
SUPER_ADMIN_PASSWORD=ChangeMe@12345
```

For frontend API URL, create `.env.local` if needed:

```bash
VITE_API_URL=http://127.0.0.1:5000/api
```

## Seed CMS Data

Start MongoDB, then run:

```bash
npm run seed
```

Default admin:

- Email: `admin@yashinfosystem.in`
- Password: `ChangeMe@12345`

Change this password after first login.

## Run Development

Terminal 1:

```bash
npm run server
```

Terminal 2:

```bash
npm run dev
```

Public website:

```text
http://127.0.0.1:5173
```

Admin panel:

```text
http://127.0.0.1:5173/admin/login
```

## Production Build

```bash
npm run build
```

Upload the `dist` folder to static hosting and deploy the `server` folder/API separately on a Node hosting provider. Set environment variables on the server.

For React Router hosting, configure all routes to fall back to `index.html`.

## API Routes

- `/api/auth`
- `/api/pages`
- `/api/services`
- `/api/packages`
- `/api/portfolio`
- `/api/blogs`
- `/api/gallery`
- `/api/testimonials`
- `/api/faqs`
- `/api/inquiries`
- `/api/settings`
- `/api/media`
- `/api/admins`
- `/api/dashboard`

## Developer Credit Protection

The API enforces:

```text
Designed & Developed by Yash Infosystems
Website: yashinfosystem.in
```

Admins cannot remove this credit. The settings route restores it server-side.
