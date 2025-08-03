-- Location: supabase/migrations/20250803060241_yrc_bridge_auth_and_user_management.sql
-- Schema Analysis: Fresh project - no existing schema
-- Integration Type: Complete new schema for YRC Bridge Platform
-- Dependencies: None - initial migration

-- 1. Custom Types for YRC Platform
CREATE TYPE public.user_role AS ENUM ('admin', 'donor', 'patient', 'volunteer', 'pending_volunteer');
CREATE TYPE public.donation_type AS ENUM ('blood', 'financial', 'medical_supplies', 'food', 'clothing', 'other');
CREATE TYPE public.blood_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
CREATE TYPE public.donation_status AS ENUM ('pending', 'approved', 'assigned', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.volunteer_status AS ENUM ('pending', 'approved', 'active', 'inactive', 'suspended');

-- 2. Core User Tables (Foundation)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'donor'::public.user_role,
    date_of_birth DATE,
    address JSONB DEFAULT '{}'::JSONB,
    emergency_contact JSONB DEFAULT '{}'::JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Donor-specific Information
CREATE TABLE public.donor_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    blood_type public.blood_type,
    last_donation_date DATE,
    donation_history JSONB DEFAULT '[]'::JSONB,
    medical_clearance BOOLEAN DEFAULT false,
    preferred_donation_types public.donation_type[] DEFAULT ARRAY['blood']::public.donation_type[],
    availability_schedule JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Patient-specific Information
CREATE TABLE public.patient_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    blood_type public.blood_type,
    medical_condition TEXT,
    doctor_reference TEXT,
    hospital_affiliation TEXT,
    emergency_priority BOOLEAN DEFAULT false,
    medical_documents JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Volunteer-specific Information
CREATE TABLE public.volunteer_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    volunteer_status public.volunteer_status DEFAULT 'pending'::public.volunteer_status,
    skills TEXT[],
    availability_hours JSONB DEFAULT '{}'::JSONB,
    location_preference TEXT,
    volunteer_type TEXT[],
    background_check_status BOOLEAN DEFAULT false,
    approved_by UUID REFERENCES public.user_profiles(id),
    approved_at TIMESTAMPTZ,
    total_hours_volunteered INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Donation Requests (from Patients)
CREATE TABLE public.donation_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    donation_type public.donation_type NOT NULL,
    urgency_level public.urgency_level DEFAULT 'medium'::public.urgency_level,
    quantity_needed TEXT,
    description TEXT NOT NULL,
    medical_requirements JSONB DEFAULT '{}'::JSONB,
    location JSONB DEFAULT '{}'::JSONB,
    deadline TIMESTAMPTZ,
    status public.donation_status DEFAULT 'pending'::public.donation_status,
    assigned_volunteer_id UUID REFERENCES public.user_profiles(id),
    assigned_at TIMESTAMPTZ,
    approved_by UUID REFERENCES public.user_profiles(id),
    approved_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Donation Offers (from Donors)
CREATE TABLE public.donation_offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    donation_type public.donation_type NOT NULL,
    quantity_available TEXT,
    description TEXT NOT NULL,
    availability_schedule JSONB DEFAULT '{}'::JSONB,
    location JSONB DEFAULT '{}'::JSONB,
    expiry_date TIMESTAMPTZ,
    status public.donation_status DEFAULT 'pending'::public.donation_status,
    assigned_volunteer_id UUID REFERENCES public.user_profiles(id),
    assigned_request_id UUID REFERENCES public.donation_requests(id),
    assigned_at TIMESTAMPTZ,
    approved_by UUID REFERENCES public.user_profiles(id),
    approved_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Donation Matches (Bridge between Offers and Requests)
CREATE TABLE public.donation_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES public.donation_requests(id) ON DELETE CASCADE,
    offer_id UUID REFERENCES public.donation_offers(id) ON DELETE CASCADE,
    volunteer_id UUID REFERENCES public.user_profiles(id),
    match_status public.donation_status DEFAULT 'pending'::public.donation_status,
    match_score INTEGER DEFAULT 0,
    scheduled_date TIMESTAMPTZ,
    pickup_location JSONB DEFAULT '{}'::JSONB,
    delivery_location JSONB DEFAULT '{}'::JSONB,
    notes TEXT,
    created_by UUID REFERENCES public.user_profiles(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Activity Log (for tracking all platform activities)
CREATE TABLE public.activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id),
    activity_type TEXT NOT NULL,
    activity_description TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. Essential Indexes for Performance
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_donor_profiles_user_id ON public.donor_profiles(user_id);
CREATE INDEX idx_donor_profiles_blood_type ON public.donor_profiles(blood_type);
CREATE INDEX idx_patient_profiles_user_id ON public.patient_profiles(user_id);
CREATE INDEX idx_patient_profiles_blood_type ON public.patient_profiles(blood_type);
CREATE INDEX idx_volunteer_profiles_user_id ON public.volunteer_profiles(user_id);
CREATE INDEX idx_volunteer_profiles_status ON public.volunteer_profiles(volunteer_status);
CREATE INDEX idx_donation_requests_patient_id ON public.donation_requests(patient_id);
CREATE INDEX idx_donation_requests_status ON public.donation_requests(status);
CREATE INDEX idx_donation_requests_urgency ON public.donation_requests(urgency_level);
CREATE INDEX idx_donation_offers_donor_id ON public.donation_offers(donor_id);
CREATE INDEX idx_donation_offers_status ON public.donation_offers(status);
CREATE INDEX idx_donation_matches_request_id ON public.donation_matches(request_id);
CREATE INDEX idx_donation_matches_offer_id ON public.donation_matches(offer_id);
CREATE INDEX idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX idx_activity_log_created_at ON public.activity_log(created_at);

-- 11. Row Level Security Setup
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donor_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- 12. Helper Functions for RLS (MUST BE BEFORE POLICIES)
CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin' 
         OR au.raw_app_meta_data->>'role' = 'admin')
)
$$;

CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role::TEXT = required_role
)
$$;

CREATE OR REPLACE FUNCTION public.is_volunteer_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() 
    AND up.role IN ('volunteer', 'admin')
    AND up.is_active = true
)
$$;

-- 13. RLS Policies Implementation

-- Pattern 1: Core user table (user_profiles) - Simple only, no functions
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Admin full access to user profiles
CREATE POLICY "admin_full_access_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Pattern 2: Simple user ownership for profile tables
CREATE POLICY "users_manage_own_donor_profiles"
ON public.donor_profiles
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_patient_profiles"
ON public.patient_profiles
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_volunteer_profiles"
ON public.volunteer_profiles
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Admin access to all profiles
CREATE POLICY "admin_full_access_donor_profiles"
ON public.donor_profiles
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "admin_full_access_patient_profiles"
ON public.patient_profiles
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

CREATE POLICY "admin_full_access_volunteer_profiles"
ON public.volunteer_profiles
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- Pattern 2: Simple user ownership for donation requests
CREATE POLICY "users_manage_own_donation_requests"
ON public.donation_requests
FOR ALL
TO authenticated
USING (patient_id = auth.uid())
WITH CHECK (patient_id = auth.uid());

-- Volunteers can view all donation requests
CREATE POLICY "volunteers_view_donation_requests"
ON public.donation_requests
FOR SELECT
TO authenticated
USING (public.is_volunteer_or_admin());

-- Pattern 2: Simple user ownership for donation offers
CREATE POLICY "users_manage_own_donation_offers"
ON public.donation_offers
FOR ALL
TO authenticated
USING (donor_id = auth.uid())
WITH CHECK (donor_id = auth.uid());

-- Volunteers can view all donation offers
CREATE POLICY "volunteers_view_donation_offers"
ON public.donation_offers
FOR SELECT
TO authenticated
USING (public.is_volunteer_or_admin());

-- Donation matches - volunteers and admins can manage
CREATE POLICY "volunteers_manage_donation_matches"
ON public.donation_matches
FOR ALL
TO authenticated
USING (public.is_volunteer_or_admin())
WITH CHECK (public.is_volunteer_or_admin());

-- Activity log - users can view their own, admins can view all
CREATE POLICY "users_view_own_activity_log"
ON public.activity_log
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "admin_full_access_activity_log"
ON public.activity_log
FOR ALL
TO authenticated
USING (public.is_admin_from_auth())
WITH CHECK (public.is_admin_from_auth());

-- 14. Trigger Functions for Automatic Profile Creation and Activity Logging
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'donor')::public.user_role
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.log_activity()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.activity_log (user_id, activity_type, activity_description, entity_type, entity_id)
  VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME || ' ' || TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id)
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- 15. Triggers Setup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Activity logging triggers
CREATE TRIGGER log_user_profiles_activity
  AFTER INSERT OR UPDATE OR DELETE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();

CREATE TRIGGER log_donation_requests_activity
  AFTER INSERT OR UPDATE OR DELETE ON public.donation_requests
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();

CREATE TRIGGER log_donation_offers_activity
  AFTER INSERT OR UPDATE OR DELETE ON public.donation_offers
  FOR EACH ROW EXECUTE FUNCTION public.log_activity();

-- Updated_at triggers
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_donor_profiles_updated_at
  BEFORE UPDATE ON public.donor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_patient_profiles_updated_at
  BEFORE UPDATE ON public.patient_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_volunteer_profiles_updated_at
  BEFORE UPDATE ON public.volunteer_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 16. Complete Mock Data for YRC Platform
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    donor_uuid UUID := gen_random_uuid();
    patient_uuid UUID := gen_random_uuid();
    volunteer_uuid UUID := gen_random_uuid();
    request_uuid UUID := gen_random_uuid();
    offer_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields for YRC platform
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@yrc.org', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "YRC Admin", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (donor_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'donor@example.com', crypt('donor123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Donor", "role": "donor"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (patient_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'patient@example.com', crypt('patient123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Jane Patient", "role": "patient"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (volunteer_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'volunteer@example.com', crypt('volunteer123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Mike Volunteer", "role": "volunteer"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create donor profile
    INSERT INTO public.donor_profiles (user_id, blood_type, medical_clearance, preferred_donation_types)
    VALUES (donor_uuid, 'O+'::public.blood_type, true, ARRAY['blood', 'financial']::public.donation_type[]);

    -- Create patient profile
    INSERT INTO public.patient_profiles (user_id, blood_type, medical_condition, emergency_priority)
    VALUES (patient_uuid, 'AB+'::public.blood_type, 'Requires urgent blood transfusion', true);

    -- Create volunteer profile
    INSERT INTO public.volunteer_profiles (user_id, volunteer_status, skills, approved_by, approved_at)
    VALUES (volunteer_uuid, 'approved'::public.volunteer_status, ARRAY['transportation', 'coordination'], admin_uuid, now());

    -- Create sample donation request
    INSERT INTO public.donation_requests (id, patient_id, donation_type, urgency_level, quantity_needed, description, status)
    VALUES (request_uuid, patient_uuid, 'blood'::public.donation_type, 'critical'::public.urgency_level, '2 units', 'Urgent blood needed for surgery', 'pending'::public.donation_status);

    -- Create sample donation offer
    INSERT INTO public.donation_offers (id, donor_id, donation_type, quantity_available, description, status)
    VALUES (offer_uuid, donor_uuid, 'blood'::public.donation_type, '1 unit', 'Available for immediate donation', 'pending'::public.donation_status);

    -- Create donation match
    INSERT INTO public.donation_matches (request_id, offer_id, volunteer_id, match_score, created_by)
    VALUES (request_uuid, offer_uuid, volunteer_uuid, 95, admin_uuid);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;