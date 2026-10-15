<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep TanStack file routes for Enrollment, Outcomes and Events with a shared patient workspace provider, so selection persists across views.
- Use Lovable Cloud Auth and owner-scoped data policies for saved records; signed-out fictional samples are read-only until sign-in.
- Store patient monitoring metrics as typed JSON on patient rows for this device-free MVP; reports and diagnostic sample fixtures are explicitly non-clinical.
- Put all visual styling and semantic theme values in src/styles.css; use the existing Button and Dialog primitives for interactions.
