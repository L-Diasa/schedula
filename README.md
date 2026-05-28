# Schedula

Schedula is a web app for creating and managing events. Users can sign up, sign in, create events, and view event details including location on a map.

Built with React and Vite as part of a university course on Interaction Design and Development of Modern Web Applications.

---

## Getting started

Follow these steps after cloning the repo for the first time, or after pulling changes that add new dependencies.

### 1. Install dependencies

```
npm install
```

### 2. Set up the local database

The app uses json-server — a tool that turns a JSON file into a local REST API (a way for the frontend to read and write data).

Copy the example database file and rename it:

```
cp db.example.json db.json
```

> **Important:** Never commit your `db.json` file. It is intentionally excluded from git (via `.gitignore`) so that teammates' local data doesn't conflict with each other.

### 3. Run the app

You need two terminals running at the same time:

**Terminal 1 — start the database server:**
```
npx json-server db.json
```

**Terminal 2 — start the frontend:**
```
npm run dev
```

Then open the port in your browser.

---

## Project structure

```
src/
  pages/          # Full pages (LoginPage, RegisterPage, HomePage, EventPage, ...)
  components/     # Reusable UI pieces (Modal, Navbar, ...)
  api/            # Functions for fetching and sending data to the database
  utils/hooks/    # Custom React hooks (e.g. useFetch for loading data)
db.example.json   # Template for the local database — copy this to db.json
```

---

## Branch & contribution workflow

1. Always create a new branch off `main` before starting work
2. Name your branch using the format: `{issue-number}-{short-description}`  
   e.g. `3-signup-signin`, `4-navbar`
3. Open a pull request when your feature is ready for review
4. Do not merge your own pull request — let a teammate review it first

---

## Commit guidelines

- Each commit should correspond to one feature, architecture change, or bug fix
- Be technical but clear — if a term is niche or not commonly known, add a brief explanation so teammates can easily link the commit to a specific feature or architecture decision
- The commit history will be used in the final report as a table mapping commit IDs to features and fixes, so descriptive messages matter
- When a commit requires teammates to take action (e.g. run `npm install`, update `db.json`), say so explicitly in the commit body