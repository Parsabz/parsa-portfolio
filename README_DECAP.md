Setup Decap CMS with GitHub OAuth
=================================

1) Create a GitHub OAuth App
----------------------------
- Homepage URL: http://localhost:3000
- Authorization callback URL: http://localhost:3000/api/decap/oauth/callback

Copy Client ID and Client Secret.

2) Configure environment
------------------------
Create a `.env.local` in project root with:

NEXT_PUBLIC_SITE_URL=http://localhost:3000
GITHUB_CLIENT_ID=YOUR_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET

3) Update CMS repo target
-------------------------
Open `public/admin/config.yml` and set:

backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
  branch: main

4) Run locally
--------------
npm run dev
Open http://localhost:3000/admin and log in with GitHub.

Notes
-----
- The CMS writes content into `content/` and media into `public/uploads/` via PRs/commits on your repo.
- Adjust collections/fields in `public/admin/config.yml` as needed.

