-- Create user profiles table
CREATE TABLE IF NOT EXISTS rn_05_user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS
ALTER TABLE rn_05_user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "rn_05_user_profiles_select_policy"
    ON rn_05_user_profiles FOR SELECT
    USING (true);

CREATE POLICY "rn_05_user_profiles_insert_policy"
    ON rn_05_user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "rn_05_user_profiles_update_policy"
    ON rn_05_user_profiles FOR UPDATE
    USING (auth.uid() = id);

-- Create trigger to automatically create profile on user creation
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO rn_05_user_profiles (id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION create_user_profile();
