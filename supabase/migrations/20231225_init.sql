-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE rn_05_property_status AS ENUM ('available', 'sold', 'rented');
CREATE TYPE rn_05_property_type AS ENUM ('house', 'apartment', 'villa', 'land');

-- Create tables
CREATE TABLE IF NOT EXISTS rn_05_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    location VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    bedrooms INTEGER,
    bathrooms INTEGER,
    area DECIMAL(10,2),
    category rn_05_property_type NOT NULL,
    status rn_05_property_status DEFAULT 'available',
    features JSONB,
    images JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE IF NOT EXISTS rn_05_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES rn_05_properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE IF NOT EXISTS rn_05_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES rn_05_properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, property_id)
);

-- Create indexes
CREATE INDEX idx_rn_05_properties_category ON rn_05_properties(category);
CREATE INDEX idx_rn_05_properties_status ON rn_05_properties(status);
CREATE INDEX idx_rn_05_properties_price ON rn_05_properties(price);
CREATE INDEX idx_rn_05_reviews_property_id ON rn_05_reviews(property_id);
CREATE INDEX idx_rn_05_reviews_user_id ON rn_05_reviews(user_id);
CREATE INDEX idx_rn_05_bookmarks_user_id ON rn_05_bookmarks(user_id);
CREATE INDEX idx_rn_05_bookmarks_property_id ON rn_05_bookmarks(property_id);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION rn_05_trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_rn_05_properties
    BEFORE UPDATE ON rn_05_properties
    FOR EACH ROW
    EXECUTE FUNCTION rn_05_trigger_set_timestamp();

CREATE TRIGGER set_timestamp_rn_05_reviews
    BEFORE UPDATE ON rn_05_reviews
    FOR EACH ROW
    EXECUTE FUNCTION rn_05_trigger_set_timestamp();

-- Insert sample data
INSERT INTO rn_05_properties (
    title,
    description,
    price,
    location,
    address,
    bedrooms,
    bathrooms,
    area,
    category,
    status,
    features,
    images
) VALUES 
(
    'Modern Beachfront Villa',
    'Luxurious beachfront villa with stunning ocean views and private pool',
    1500000.00,
    'Miami Beach',
    '123 Ocean Drive, Miami Beach, FL 33139',
    4,
    3,
    350.50,
    'villa',
    'available',
    '{"pool": true, "garden": true, "parking": 2, "security": true}',
    '["villa1.jpg", "villa2.jpg", "villa3.jpg"]'
),
(
    'Downtown Luxury Apartment',
    'High-rise luxury apartment in the heart of downtown with city views',
    750000.00,
    'Downtown Miami',
    '456 Brickell Ave, Miami, FL 33131',
    2,
    2,
    120.75,
    'apartment',
    'available',
    '{"gym": true, "parking": 1, "concierge": true, "pool": true}',
    '["apt1.jpg", "apt2.jpg", "apt3.jpg"]'
),
(
    'Suburban Family Home',
    'Spacious family home in quiet suburban neighborhood with large backyard',
    950000.00,
    'Coral Gables',
    '789 Coral Way, Coral Gables, FL 33134',
    5,
    4,
    450.00,
    'house',
    'available',
    '{"garden": true, "parking": 3, "basement": true, "patio": true}',
    '["house1.jpg", "house2.jpg", "house3.jpg"]'
);

-- Create RLS Policies
ALTER TABLE rn_05_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE rn_05_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE rn_05_bookmarks ENABLE ROW LEVEL SECURITY;

-- Properties policies
CREATE POLICY "rn_05_properties_select_policy"
    ON rn_05_properties FOR SELECT
    USING (true);

CREATE POLICY "rn_05_properties_insert_policy"
    ON rn_05_properties FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "rn_05_properties_update_policy"
    ON rn_05_properties FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Reviews policies
CREATE POLICY "rn_05_reviews_select_policy"
    ON rn_05_reviews FOR SELECT
    USING (true);

CREATE POLICY "rn_05_reviews_insert_policy"
    ON rn_05_reviews FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "rn_05_reviews_update_policy"
    ON rn_05_reviews FOR UPDATE
    USING (auth.uid = user_id);

-- Bookmarks policies
CREATE POLICY "rn_05_bookmarks_select_policy"
    ON rn_05_bookmarks FOR SELECT
    USING (auth.uid = user_id);

CREATE POLICY "rn_05_bookmarks_insert_policy"
    ON rn_05_bookmarks FOR INSERT
    WITH CHECK (auth.uid = user_id);

CREATE POLICY "rn_05_bookmarks_delete_policy"
    ON rn_05_bookmarks FOR DELETE
    USING (auth.uid = user_id);
