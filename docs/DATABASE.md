# Database Architecture

The project uses **MongoDB** as its NoSQL database, optimized for read-heavy frontend queries and flexible schema updates via the CMS.

## Collections

### 1. `projects`
Stores all portfolio project data.
```json
{
  "_id": "ObjectId",
  "title": "String (Required)",
  "slug": "String (Unique, URL-friendly)",
  "description": "String",
  "techStack": "String (Comma-separated values)",
  "imageUrl": "String (Path to /public/images/ or external URL)",
  "githubLink": "String (URL)",
  "liveLink": "String (URL)",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}