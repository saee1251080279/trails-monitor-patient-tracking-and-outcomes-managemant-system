import { createFileRoute } from '@tanstack/react-router';
import { WorkspaceShell } from '@/components/trails/workspace-shell';
import { Outcomes } from '@/components/trails/outcomes';
export const Route = createFileRoute('/outcomes')({
  head: () => ({meta:[
    {title:'Patient Outcomes | Trails Monitor Hub'},
    {name:'description',content:'Review simulated vitals, organ health and illustrative blood reports.'},
    {property:'og:title',content:'Patient Outcomes | Trails Monitor Hub'},
    {property:'og:description',content:'A clearer picture of fictional patient health.'},
    {property:'og:type',content:'website'},
    {name:'twitter:card',content:'summary_large_image'},
  ]}),
  component: OutcomesPage,
});
function OutcomesPage(){return <WorkspaceShell view="Outcomes"><Outcomes/></WorkspaceShell>;}