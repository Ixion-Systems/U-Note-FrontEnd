# 📓 U-Notes // Frontend UI

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

Welcome to the frontend repository for **U-Notes**, a brutalist-inspired web platform designed to help university students share, download, and index study materials (PDFs).

## 🎨 Design Philosophy
The UI follows a strict **Neo-Brutalist** design system:
- High contrast: Black `#000000`, White `#FFFFFF`, and an aggressive primary accent Orange `#FF6B00`.
- Bold typography and sharp edges (no rounded corners unless strictly necessary).
- Heavy hard shadows and distinct border lines.
- Dynamic micro-interactions and scroll-triggered animations.

## 🚀 Key Features
- **GSAP Animations:** Smooth page transitions, 3D rotating carousels, and scroll-triggered explosions for an immersive UX.
- **Client-Side Routing:** Fast, SPA navigation using `react-router-dom`.
- **Responsive Layouts:** Fully responsive design built purely with Tailwind CSS.
- **Interactive Forms:** Login and Signup modules featuring immediate visual feedback and robust UI state handling.

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ixion-Systems/U-Note-FrontEnd.git
   cd U-Note-FrontEnd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be running at `http://localhost:5174`.

## 📁 Project Structure
- `/public/IMG`: Static SVGs and PNG assets.
- `/src/components`: Reusable brutalist UI components (Navbars, Carousels, Forms, Heroes).
- `/src/pages`: Main view routes (`LandingPage`, `SpecStatusPage`, `LoginPage`, `SignupPage`).
- `index.css`: Tailwind directives and custom brutalist utility classes.

## 🔗 Architecture Link
This frontend connects directly to the REST API served by the Backend repository. Make sure both servers are running simultaneously for full authentication and data-fetching capabilities.

---
*Built by Ixion Systems.*
