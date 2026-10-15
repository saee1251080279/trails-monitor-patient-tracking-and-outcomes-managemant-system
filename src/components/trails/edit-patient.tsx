import { useState,useEffect } from 'react';
import { Dialog,DialogContent,DialogTitle,DialogDescription } from '@/components/ui/dialog';
import { PatientForm } from './patient-form';
import { useWorkspace } from './workspace-context';
export function EditPatient(){const {selected,updatePatient}=useWorkspace();const [open,setOpen]=useState(false);useEffect(()=>{const edit=()=>setOpen(true);window.addEventListener('edit-patient',edit);return()=>window.removeEventListener('edit-patient',edit);},[]);return <Dialog open={open} onOpenChange={setOpen}><DialogContent><DialogTitle>Update patient details</DialogTitle><DialogDescription>{selected?.name} · Fictional patient record</DialogDescription>{selected&&<PatientForm key={selected.id} patient={selected} onSave={async values=>{const saved=await updatePatient(values);if(saved)setOpen(false);return saved;}}/>}</DialogContent></Dialog>;}
