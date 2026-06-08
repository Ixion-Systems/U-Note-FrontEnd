<div align="center">
  <img src="public/IMG/U-NOTES%20LOGO%20Orange.svg" alt="U-Notes Logo" width="200" style="margin-bottom: 20px;" />

  # U-Notes // Frontend UI

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
  ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
</div>

Welcome to the frontend repository for **U-Notes**, a brutalist-inspired web platform designed to help university students share, download, and index study materials (PDFs).

## Tech Stack & Dependencies
- **Core:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6 (`react-router-dom`)
- **Styling:** Tailwind CSS, PostCSS
- **Animation Libraries:** GSAP (GreenSock Animation Platform)
- **API Fetching:** Native `fetch` API

## System Functionalities
- **Client-Side Routing:** Managed via React Router to provide rapid, state-preserving navigation across the application (`/dashboard`, `/upload`, `/login`, etc.) without full page reloads.
- **REST API Integration:** Connects directly with the U-Notes Node.js Backend for user authentication flows, dynamic dropdown data population, and paginated searches.
- **State Management & Filtering:** Utilizes React hooks (`useState`, `useEffect`) to build dynamic, cascading data filters (e.g., retrieving specific Subjects based on selected Career and Year).
- **Client-Side Data Validation:** Enforces preliminary file validations prior to dispatching network requests (MIME type checking for `application/pdf`, rigid 30MB file size limits).
- **Multipart Form Uploads:** Handles binary file uploads using the browser's `FormData` API, combined with JWT Authorization headers for secure transmission.
- **Component Lifecycle Synchronization:** Coordinates UI mounting events via Javascript timeouts (`setTimeout`) paired with effect hooks to manage layout rendering order.

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ixion-Systems/U-Note-FrontEnd.git
   cd U-Note-FrontEnd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   If connecting to a custom backend URL, ensure the fetch URIs in the components correspond correctly, or set up `.env` files supported by Vite. By default, the application maps to `http://localhost:5000`.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will deploy on `http://localhost:5174`.

5. **Build for production:**
   ```bash
   npm run build
   ```
   This generates the optimized bundle in the `/dist` directory.

## Directory Structure
- `/public`: Static uncompiled assets.
- `/src/components`: Granular, reusable React UI components.
- `/src/pages`: Top-level route components acting as main application views.
- `App.jsx`: Main React Router configuration node.
- `index.css`: Global Tailwind CSS injection and specific utility classes.
- `tailwind.config.js`: Configuration for custom tokens, colors, and layout constraints.
