-- Create staff schedules table
CREATE TABLE IF NOT EXISTS staff_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  shift_date DATE NOT NULL,
  shift_start TIME NOT NULL,
  shift_end TIME NOT NULL,
  position TEXT NOT NULL,
  location TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create park analytics table
CREATE TABLE IF NOT EXISTS park_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  total_visitors INTEGER DEFAULT 0,
  ticket_revenue DECIMAL(10, 2) DEFAULT 0,
  merchandise_sales DECIMAL(10, 2) DEFAULT 0,
  food_beverage_sales DECIMAL(10, 2) DEFAULT 0,
  weather TEXT,
  peak_hours TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample schedules for the next 7 days
DO $$
DECLARE
  sample_date DATE;
  day_offset INTEGER;
BEGIN
  FOR day_offset IN 0..6 LOOP
    sample_date := CURRENT_DATE + day_offset;
    
    -- Morning shift
    INSERT INTO staff_schedules (user_id, shift_date, shift_start, shift_end, position, location, status)
    SELECT 
      id,
      sample_date,
      '08:00',
      '16:00',
      CASE 
        WHEN day_offset % 3 = 0 THEN 'Ride Operator'
        WHEN day_offset % 3 = 1 THEN 'Guest Services'
        ELSE 'Food & Beverage'
      END,
      CASE 
        WHEN day_offset % 2 = 0 THEN 'Main Entrance'
        ELSE 'Food Court'
      END,
      CASE 
        WHEN sample_date < CURRENT_DATE THEN 'completed'
        ELSE 'scheduled'
      END
    FROM auth.users
    LIMIT 1;
    
    -- Afternoon shift
    INSERT INTO staff_schedules (user_id, shift_date, shift_start, shift_end, position, location, status)
    SELECT 
      id,
      sample_date,
      '14:00',
      '22:00',
      CASE 
        WHEN day_offset % 3 = 0 THEN 'Security'
        WHEN day_offset % 3 = 1 THEN 'Maintenance'
        ELSE 'Ticket Sales'
      END,
      CASE 
        WHEN day_offset % 2 = 0 THEN 'Parking Lot'
        ELSE 'Rides Area'
      END,
      CASE 
        WHEN sample_date < CURRENT_DATE THEN 'completed'
        ELSE 'scheduled'
      END
    FROM auth.users
    LIMIT 1;
  END LOOP;
END $$;

-- Insert sample analytics for the past 30 days
DO $$
DECLARE
  analytics_date DATE;
  day_offset INTEGER;
  base_visitors INTEGER;
  weekend_multiplier DECIMAL;
BEGIN
  FOR day_offset IN 1..30 LOOP
    analytics_date := CURRENT_DATE - day_offset;
    base_visitors := 800 + FLOOR(RANDOM() * 400)::INTEGER;
    
    -- Increase visitors on weekends
    IF EXTRACT(DOW FROM analytics_date) IN (0, 6) THEN
      weekend_multiplier := 1.5;
    ELSE
      weekend_multiplier := 1.0;
    END IF;
    
    INSERT INTO park_analytics (
      date,
      total_visitors,
      ticket_revenue,
      merchandise_sales,
      food_beverage_sales,
      weather,
      peak_hours
    ) VALUES (
      analytics_date,
      FLOOR(base_visitors * weekend_multiplier)::INTEGER,
      FLOOR((base_visitors * weekend_multiplier * 25 + RANDOM() * 5000))::DECIMAL(10, 2),
      FLOOR((base_visitors * weekend_multiplier * 8 + RANDOM() * 2000))::DECIMAL(10, 2),
      FLOOR((base_visitors * weekend_multiplier * 12 + RANDOM() * 3000))::DECIMAL(10, 2),
      CASE 
        WHEN RANDOM() > 0.8 THEN 'Rainy'
        WHEN RANDOM() > 0.6 THEN 'Cloudy'
        ELSE 'Sunny'
      END,
      ARRAY['11:00-13:00', '15:00-17:00']
    );
  END LOOP;
END $$;

-- Enable Row Level Security
ALTER TABLE staff_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE park_analytics ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own schedules"
  ON staff_schedules FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view all schedules"
  ON staff_schedules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert schedules"
  ON staff_schedules FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update schedules"
  ON staff_schedules FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view analytics"
  ON park_analytics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert analytics"
  ON park_analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_staff_schedules_user_id ON staff_schedules(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_schedules_shift_date ON staff_schedules(shift_date);
CREATE INDEX IF NOT EXISTS idx_park_analytics_date ON park_analytics(date);
