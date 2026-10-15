import { createFileRoute } from "@tanstack/react-router";
import { WorkspaceShell } from '@/components/trails/workspace-shell';
import { Enrollment } from '@/components/trails/enrollment';
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Enrollment | Trails Monitor Hub' },
    { name: 'description', content: 'Manage the fictional patient queue and enroll new patients in Trails Monitor Hub.' },
    { property: 'og:title', content: 'Enrollment | Trails Monitor Hub' },
    { property: 'og:description', content: 'Patient enrollment and connected care workspace.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
function Index() {
  return <WorkspaceShell view="Enrollment"><Enrollment/></WorkspaceShell>;
}
