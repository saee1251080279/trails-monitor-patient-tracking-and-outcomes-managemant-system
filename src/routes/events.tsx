import { createFileRoute } from '@tanstack/react-router';
import { WorkspaceShell } from '@/components/trails/workspace-shell';
import { Events } from '@/components/trails/events';
export const Route = createFileRoute('/events')({
  head: () => ({meta:[
    {title:'Patient Events | Trails Monitor Hub'},
    {name:'description',content:'Review fictional reports, schedule follow-ups and save doctor remarks.'},
    {property:'og:title',content:'Patient Events | Trails Monitor Hub'},
    {property:'og:description',content:'Patient history, appointments and continued-care notes.'},
    {property:'og:type',content:'website'},
    {name:'twitter:card',content:'summary_large_image'},
  ]}),
  component: EventsPage,
});
function EventsPage(){return <WorkspaceShell view="Events"><Events/></WorkspaceShell>;}