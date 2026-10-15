import type { Database } from '@/integrations/supabase/types';
export type Patient = Database['public']['Tables']['patients']['Row'];
export type Appointment = Database['public']['Tables']['appointments']['Row'];
export type Remark = Database['public']['Tables']['remarks']['Row'];
export type Metrics = { heart_rate:number; temperature:number; water_level:number; heart:number; lungs:number; liver:number; stomach:number; overall_index:number };
export const defaultMetrics:Metrics={heart_rate:72,temperature:36.7,water_level:64,heart:92,lungs:86,liver:94,stomach:88,overall_index:90};
export const samples:Patient[] = ['Astin Cooper','Stark Mclaren','Phillip Cliff','Stevie Mchawny','David Barley'].map((name,i)=>({id:String(i+1),doctor_id:'',patient_code:['2134642','3634741','4674631','5894438','6914594'][i]??'',name,age:[28,34,42,26,56][i]??28,gender:i===3?'Female':'Male',contact:'+1 555 010 1001',blood_type:['O+','A+','B+','AB+','O-'][i]??'O+',height_cm:175,weight_kg:72,allergies:i===0?'Penicillin':'None',diseases:i===0?'Mild asthma':'None',last_visit:'2026-10-12',status:i===0?'active':'queued',metrics:defaultMetrics,created_at:'2026-10-15T08:00:00Z'}));
export const reports=[{title:'Complete blood count',type:'Blood report',date:'12 Oct 2026'},{title:'Chest CT scan',type:'CT report',date:'10 Oct 2026'},{title:'Abdominal sonography',type:'Sonography',date:'08 Oct 2026'}];
export const bloodValues=[['Hemoglobin','14.2 g/dL','13.5–17.5'],['Blood glucose','92 mg/dL','70–99'],['Cholesterol','178 mg/dL','< 200'],['White blood cells','6.8 ×10³/µL','4.0–11.0']];
