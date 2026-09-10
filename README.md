<div align="center">
  <img width="1200" height="475" alt="Show-Off Banner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Show-Off 🚀

> **An open-source public project transparency platform for modern builders to share progress, dev-logs, status updates, and build momentum.**

Show-Off empowers indie hackers, open-source maintainers, and engineering teams to build in public with radical transparency. Instead of spending hours writing manual stakeholder reports, Show-Off lets you publish real-time development logs, showcase build metrics, and sync commit events directly to a public transboard.

---

## 🌟 Key Features

- **Public Transparency Dashboards**: Interactive Bento Grid project showcase displaying live metrics, progress bars, version tags, momentum charts, and historical dev-logs.
- **Git-Driven Updates & Terminal Simulator**: Simulate or connect Git push webhooks to automatically ingest commit logs directly into your project timeline.
- **Builder Workspace Studio**: A dedicated dashboard for project creators to post new dev logs (`feat`, `fix`, `perf`, `refactor`, `docs`), adjust development status stages, manage integrations, and trigger simulated VCS syncs.
- **Live Notification Feed**: Real-time event notifications for workspace subscriptions, commit ingestions, and timeline events.
- **Local Storage Persistence**: Workspace changes and project updates persist automatically in local storage for seamless client-side state management.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Animations**: Motion (Framer Motion)
- **AI Integration**: Google Gemini API (`@google/genai`)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** / **pnpm**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/show-off.git
   cd show-off
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables** (Optional for Gemini AI features):
   Create a `.env.local` or `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## 💻 How to Use & Examples

### 1. Exploring Projects & Subscribing

- On the **Explore** page, browse through featured public projects (e.g., *Nebula Engine*, *Nova Compiler*, *Aurora Logs*).
- Click **Follow / Subscribe** on any project to receive real-time build timeline notifications in the top header drawer.
- View detailed developer logs, filtered by category (`feat`, `fix`, `perf`, etc.), commit SHAs, and author details.

### 2. Using the Builder Workspace Studio

1. Click **Start Building** or switch to the **Dashboard** view from the navigation bar.
2. Select an existing project or create a new project workspace.
3. **Publishing a Dev Log**:
   - Fill in the log title and content.
   - Choose a log category (`feat`, `fix`, `perf`, `refactor`, `docs`, `chore`).
   - Click **Publish Dev Log** to instantly push it to your public timeline.
4. **Updating Project Status & Progress**:
   - Slide the progress bar (0–100%) or change project status (`alpha`, `beta`, `stable`, `active`).
   - Enable/disable GitHub Actions or Webhook integrations.

### 3. Simulating Git Webhook / Terminal Commits

- Navigate to the **Git-Driven Updates** section on the Explore page or the bottom of the Builder Workspace Studio.
- Click **Sync Commit** or interact with the Terminal Simulator.
- Watch the simulated bash commands execute (`git commit -m "..."`, `git push origin main`).
- Upon completion, a new dev log is automatically generated and ingested into the project timeline via the VCS Sync pipeline.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| --- | --- |
| `npm run dev` | Runs the Vite dev server at `http://localhost:3000`. |
| `npm run build` | Builds the app for production into the `dist` folder. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs TypeScript type-checking (`tsc --noEmit`). |
| `npm run clean` | Removes build artifacts (`dist`). |

---

## 📄 License

Distributed under the MIT License. Built with ❤️ for open-source builders.
