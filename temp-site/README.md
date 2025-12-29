# Phronos Temporary Landing Site

A temporary landing page for **www.phronos.org** while the full platform is under development.

## Overview

This is a static site with a serverless email capture endpoint, deployed on Vercel with Supabase as the database.

## Features

- Landing page with Phronos branding
- Full Constitution page
- Email subscription capture (stored in Supabase)
- Responsive design
- PHRONOS visual identity (Cormorant Garamond, Fira Code, brutalist grid)

## Tech Stack

- **Hosting**: Vercel
- **Database**: Supabase (PostgreSQL)
- **API**: Vercel Serverless Functions (TypeScript)

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to the SQL Editor and run:

```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  source TEXT DEFAULT 'temp_landing',
  metadata JSONB
);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon key (for the serverless function)
CREATE POLICY "Allow public insert" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Allow reading for authenticated users only (admin)
CREATE POLICY "Allow authenticated read" ON subscribers
  FOR SELECT USING (auth.role() = 'authenticated');
```

3. Get your credentials from Settings > API:
   - `SUPABASE_URL`: Your project URL
   - `SUPABASE_ANON_KEY`: Your anon/public key

### 2. Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. From the `temp-site` directory:
   ```bash
   cd temp-site
   vercel
   ```

3. Follow the prompts to link to your Vercel account

4. Add environment variables in Vercel Dashboard (or via CLI):
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_ANON_KEY
   ```

5. Deploy to production:
   ```bash
   vercel --prod
   ```

### 3. Configure Custom Domain

1. In Vercel Dashboard, go to your project > Settings > Domains
2. Add `www.phronos.org`
3. In your DNS provider, add a CNAME record:
   - Name: `www`
   - Value: `cname.vercel-dns.com`
4. SSL is configured automatically

## Local Development

```bash
# Install dependencies
npm install

# Run locally with Vercel dev server
npm run dev
```

Visit `http://localhost:3000` to see the site.

## File Structure

```
temp-site/
├── index.html           # Landing page
├── constitution.html    # Full constitution
├── api/
│   └── subscribe.ts     # Email capture endpoint
├── package.json         # Dependencies
├── vercel.json          # Vercel config
└── README.md            # This file
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## API Endpoints

### POST /api/subscribe

Subscribe an email address.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (success - new subscriber):**
```json
{
  "message": "You are on the list.",
  "status": "new"
}
```

**Response (success - existing subscriber):**
```json
{
  "message": "You are already on the list.",
  "status": "existing"
}
```

**Response (error):**
```json
{
  "error": "Invalid email format"
}
```

## Post-MVP Migration

When the full MVP launches on Railway:

1. Update DNS to point `www.phronos.org` to Railway
2. Export subscribers from Supabase:
   ```sql
   SELECT email, subscribed_at, source FROM subscribers;
   ```
3. Import into the main PostgreSQL database
4. Optionally keep Supabase as a backup/CRM

## Related Documents

- [Project Plan: Workstream E](../project%20plan/MVP_PARALLEL_WORKSTREAMS.md)
- [Constitution Source](../vision/CONSTITUTION.md)
