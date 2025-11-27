-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT CHECK (role IN ('student', 'bde', 'bar', 'admin')) NOT NULL DEFAULT 'student',
  school_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  address TEXT,
  city TEXT DEFAULT 'Paris',
  latitude FLOAT,
  longitude FLOAT,
  price_min INTEGER,
  price_max INTEGER,
  image_url TEXT,
  external_ticket_link TEXT,
  organizer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  organizer_type TEXT CHECK (organizer_type IN ('bde', 'bar')),
  status TEXT CHECK (status IN ('draft', 'published', 'boosted')) DEFAULT 'draft',
  boost_expires_at TIMESTAMP WITH TIME ZONE,
  views_count INTEGER DEFAULT 0,
  interested_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_interests table
CREATE TABLE user_interests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, event_id)
);

-- Create boosts table
CREATE TABLE boosts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  plan TEXT CHECK (plan IN ('day', 'week', 'month', 'banner')) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE boosts ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Events Policies
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Organizers can insert events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update own events"
  ON events FOR UPDATE
  USING (auth.uid() = organizer_id);

CREATE POLICY "Organizers can delete own events"
  ON events FOR DELETE
  USING (auth.uid() = organizer_id);

-- User Interests Policies
CREATE POLICY "User interests are viewable by everyone"
  ON user_interests FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own interest"
  ON user_interests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own interest"
  ON user_interests FOR DELETE
  USING (auth.uid() = user_id);

-- Boosts Policies
CREATE POLICY "Boosts are viewable by everyone"
  ON boosts FOR SELECT
  USING (true);

CREATE POLICY "Organizers can insert boosts for their events"
  ON boosts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_id
      AND events.organizer_id = auth.uid()
    )
  );

CREATE POLICY "Organizers can update boosts for their events"
  ON boosts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE events.id = event_id
      AND events.organizer_id = auth.uid()
    )
  );

-- Storage Bucket for Event Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Event images are publicly accessible"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'event-images' );

CREATE POLICY "Authenticated users can upload event images"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'event-images' AND auth.role() = 'authenticated' );
