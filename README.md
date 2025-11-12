# GANESHA Capital Financial Hub

An integrated platform for GANESHA Capital, providing financial education, a comprehensive CRM for client management, and an intelligent chatbot for user engagement. The app aims to foster financial literacy and streamline client relations.

This project was built as a demonstration of a modern, AI-integrated web application using React and the Google Gemini API.

## ✨ Features

-   **Client Portal**: An educational hub where clients can access modules on financial topics, watch videos, and test their knowledge.
    -   **Educational Content**: Organized into three pillars: Financial Peace, Financial Freedom, and Financial Abundance.
    -   **Financial Knowledge Tests**: Dynamically generated quizzes using the Gemini API to assess user understanding and provide personalized feedback and content recommendations.
-   **CRM Dashboard**: An internal tool for managing client relationships.
    -   **Client Management**: View and search a list of clients, with detailed information for each.
    -   **Analytics**: Visualize key performance indicators (KPIs), sales funnels, and client demographics with interactive charts.
-   **AI Chatbot**: A Gemini-powered assistant available throughout the app to answer user questions about finance in a helpful, conversational manner in Spanish.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript
-   **Backend**: Supabase (Authentication & Database)
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS (via CDN)
-   **AI**: Google Gemini API (`@google/genai`)
-   **Charts**: Recharts
-   **Icons**: Heroicons

## 🚀 Getting Started

This project is now configured with Vite for a modern development and build process.

### Prerequisites

-   Node.js (v18+) and npm.
-   A Google Gemini API Key.
-   A Supabase project with tables matching the schemas defined in `src/types.ts`.

### Running Locally

1.  **Install dependencies**:
    Open your terminal in the project's root directory and run:
    ```bash
    npm install
    ```

2.  **Set up environment variables**:
    The application requires your Google Gemini API key. Create a file named `.env` in the root of the project and add your key to it.
    
    ```
    # Your Google Gemini API Key
    API_KEY=YOUR_GEMINI_API_KEY
    ```
    The Supabase credentials have been integrated directly into the code for this demonstration.

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to the local address provided by Vite (e.g., `http://localhost:5173`).

## 📦 Deployment to Vercel

This project is configured for easy deployment to Vercel.

1.  **Push to GitHub**: Create a new repository on GitHub and push the project files to it.

2.  **Import to Vercel**:
    - Sign up or log in to [Vercel](https://vercel.com/).
    - From your dashboard, click "Add New... -> Project".
    - Import your GitHub repository.

3.  **Configure Project**:
    - Vercel will automatically detect that this is a Vite project and set the correct build settings.
      - **Framework Preset**: `Vite`
      - **Build Command**: `npm run build`
      - **Output Directory**: `dist`
    - Go to the "Environment Variables" section in the project settings.
    - Add your Google Gemini API key as an environment variable.

4.  **Deploy**: Click the "Deploy" button. Vercel will build and deploy your site, providing you with a URL.