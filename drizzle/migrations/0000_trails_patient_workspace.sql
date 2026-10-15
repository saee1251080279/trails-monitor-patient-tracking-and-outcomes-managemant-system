CREATE TABLE public.profiles (id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE, display_name text NOT NULL DEFAULT 'Dr. Michel Stuart', photo text);
GRANT SELECT, UPDATE ON public.profiles TO authenticated; GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_profile ON public.profiles FOR SELECT TO authenticated USING (id=auth.uid()); CREATE POLICY update_profile ON public.profiles FOR UPDATE TO authenticated USING(id=auth.uid()) WITH CHECK(id=auth.uid());
CREATE FUNCTION public.create_doctor_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ BEGIN INSERT INTO public.profiles(id,display_name) VALUES(NEW.id,coalesce(NEW.raw_user_meta_data->>'display_name','Doctor')); RETURN NEW; END; $$;
CREATE TRIGGER on_doctor_signup AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_doctor_profile();
CREATE TABLE public.patients (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), doctor_id uuid NOT NULL, patient_code text NOT NULL UNIQUE, name text NOT NULL CHECK(length(trim(name))>0), age integer NOT NULL CHECK(age BETWEEN 0 AND 120), gender text NOT NULL DEFAULT 'Male', contact text NOT NULL CHECK(contact ~ '^\+?[0-9 ()-]{7,20}$'), blood_type text NOT NULL DEFAULT 'O+', height_cm numeric NOT NULL DEFAULT 175, weight_kg numeric NOT NULL DEFAULT 72, allergies text NOT NULL DEFAULT 'None', diseases text NOT NULL DEFAULT 'None', last_visit date DEFAULT CURRENT_DATE, status text NOT NULL DEFAULT 'queued' CHECK(status IN ('queued','active','done')), metrics jsonb NOT NULL DEFAULT '{"heart_rate":72,"temperature":36.7,"water_level":64,"heart":92,"lungs":86,"liver":94,"stomach":88,"overall_index":90}', created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT,INSERT,UPDATE,DELETE ON public.patients TO authenticated; GRANT ALL ON public.patients TO service_role;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_patients ON public.patients FOR ALL TO authenticated USING(doctor_id=auth.uid()) WITH CHECK(doctor_id=auth.uid());
CREATE TABLE public.appointments(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), doctor_id uuid NOT NULL, patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE, datetime timestamptz NOT NULL, note text NOT NULL DEFAULT 'Follow-up consultation');
GRANT SELECT,INSERT,DELETE ON public.appointments TO authenticated; GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_appointments ON public.appointments FOR ALL TO authenticated USING(doctor_id=auth.uid()) WITH CHECK(doctor_id=auth.uid() AND EXISTS(SELECT 1 FROM public.patients p WHERE p.id=patient_id AND p.doctor_id=auth.uid()));
CREATE FUNCTION public.validate_appointment() RETURNS trigger LANGUAGE plpgsql SET search_path=public AS $$ BEGIN IF NEW.datetime <= now() THEN RAISE EXCEPTION 'Appointment must be in the future'; END IF; RETURN NEW; END; $$;
CREATE TRIGGER future_appointment BEFORE INSERT ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.validate_appointment();
CREATE TABLE public.remarks(id uuid PRIMARY KEY DEFAULT gen_random_uuid(), doctor_id uuid NOT NULL, patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE, text text NOT NULL CHECK(length(trim(text))>0), created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT,INSERT,UPDATE,DELETE ON public.remarks TO authenticated; GRANT ALL ON public.remarks TO service_role;
ALTER TABLE public.remarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY own_remarks ON public.remarks FOR ALL TO authenticated USING(doctor_id=auth.uid()) WITH CHECK(doctor_id=auth.uid() AND EXISTS(SELECT 1 FROM public.patients p WHERE p.id=patient_id AND p.doctor_id=auth.uid()));
INSERT INTO public.profiles(id,display_name) VALUES('3337409b-9d6d-4d61-bb01-4a75a30bbec5','Dr. Michel Stuart');
INSERT INTO public.patients(id,doctor_id,patient_code,name,age,gender,contact,blood_type,allergies,diseases,status) VALUES
('11111111-1111-4111-8111-111111111111','3337409b-9d6d-4d61-bb01-4a75a30bbec5','2134642','Astin Cooper',28,'Male','+1 555 010 1001','O+','Penicillin','Mild asthma','active'),
('22222222-2222-4222-8222-222222222222','3337409b-9d6d-4d61-bb01-4a75a30bbec5','3634741','Stark Mclaren',34,'Male','+1 555 010 1002','A+','None','None','queued'),
('33333333-3333-4333-8333-333333333333','3337409b-9d6d-4d61-bb01-4a75a30bbec5','4674631','Phillip Cliff',42,'Male','+1 555 010 1003','B+','None','Hypertension','queued'),
('44444444-4444-4444-8444-444444444444','3337409b-9d6d-4d61-bb01-4a75a30bbec5','5894438','Stevie Mchawny',26,'Female','+1 555 010 1004','AB+','None','None','queued'),
('55555555-5555-4555-8555-555555555555','3337409b-9d6d-4d61-bb01-4a75a30bbec5','6914594','David Barley',56,'Male','+1 555 010 1005','O-','None','Type 2 diabetes','queued');