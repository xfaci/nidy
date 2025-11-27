# NIDY - Student Nightlife Platform

NIDY is a modern web platform for discovering student events in Île-de-France.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Supabase (Auth, Database, Storage)
- **State**: React Query
- **Maps**: React Leaflet

## Getting Started

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Copy `.env.example` to `.env.local` and fill in your Supabase credentials.
   ```bash
   cp .env.example .env.local
   ```

4. **Database Setup**
   Run the SQL queries in `src/lib/supabase/schema.sql` in your Supabase SQL Editor to create the tables and policies.

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Liquid Glass Design**: Modern UI with glassmorphism and neon gradients.
- **Event Discovery**: Filter by date, city, price.
- **Interactive Map**: Visualize events on a map.
- **Organizer Dashboard**: Create and manage events.
- **Authentication**: Secure login/signup with Supabase.

## Project Structure

- `src/app`: App Router pages and layouts
- `src/components`: Reusable UI components
- `src/lib`: Utilities and Supabase client
- `public`: Static assets

## License

MIT
