---

### `docs/CMS.md`
```markdown
# Content Management System (Admin Panel)

The `/admin` directory contains a secure, React-based dashboard designed specifically for managing the portfolio's content without touching the codebase.

## Features
- **Secure Login:** JWT-based authentication system.
- **Dashboard Overview:** Quick stats on total projects and recent updates.
- **Project Manager:** 
  - Create new projects.
  - Edit existing project details, tags, and links.
  - Delete outdated projects.
- **Live Preview Integration:** Changes made in the CMS instantly reflect on the public frontend via the FastAPI connection.

## Image Handling Workflow
Currently, images are served statically. To add a new project image:
1. Place the optimized `.png` or `.jpg` file inside `frontend/public/images/`.
2. In the CMS Project creation form, set the Image URL field to the relative path (e.g., `/images/my-new-app.png`).

## Local Development
To run the CMS locally:
```bash
cd admin
npm install
npm run dev