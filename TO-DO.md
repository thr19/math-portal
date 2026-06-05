# Project TODO — Math Portal


1. Create feature branch and backup current state
   - Create a git branch (e.g., `feature/platform`) and push it.

2. Add PostgreSQL (local Docker) and environment configuration
   - Add a `docker-compose.yml` or use a local Postgres install and `.env` entries.

3. Add an ORM and migrations (Prisma recommended)
   - Install Prisma or another ORM; configure the DB connection and generate migrations.

4. Implement authentication (signup/login) and user roles
   - Use JWT or session cookies; create roles: `user`, `author`, `admin`.

5. Navbar: add user icon, login/logout, and profile link
   - Show logged-in state and quick access to profile/settings.

6. Add Markdown support (rendering with `react-markdown`)
   - Install `react-markdown` and safe HTML handling (`rehype-sanitize`).

7. Provide a simple Markdown editor for posts/pages
   - Start with a textarea + preview; later consider a richer editor (ToastUI/Editor.js).

8. Build Blog: posts CRUD, categories, and tags
   - API endpoints, frontend forms, and list/post pages. Support categories & tags.

9. Build Wiki: pages CRUD, versioning, and search
   - Wiki pages editable via Markdown; keep versions/revisions for rollback.

10. Build Forum: threads, replies, moderation tools
    - Thread creation, replies, pagination, and basic moderation (flagging).

11. Books: CRUD, uploads (cover/PDF), author-restricted posting
    - Allow authorized authors to create book entries and upload files.

12. Authorization & Moderation: enforce roles and permissions
    - Protect endpoints and UI; admin/mod tools for content management.

13. Design DB schema and seed initial data
    - Tables: users, roles, posts, articles, wiki_pages, threads, posts, books, tags, categories, uploads.

14. Integrate frontend routes and API endpoints
    - Wire React Router routes and fetch-based or SWR/React Query calls.

15. Write tests for auth and core APIs
    - Unit and integration tests for authentication and content creation.

16. CI & Deploy: migrations, env, production DB, and hosting
    - Add GitHub Actions (or other CI) to run tests and apply migrations.

17. Backups, monitoring, and logging for PostgreSQL
    - Scheduled DB backups and basic monitoring/alerts.

18. Documentation: README, contributor guide, posting policy
    - How to run, contribute, and moderate content.

19. Polish: accessibility, SEO, performance and UX tweaks
    - Color contrast, keyboard navigation, meta tags, image optimizations.

