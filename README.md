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
-   **Styling**: Tailwind CSS
-   **AI**: Google Gemini API (`@google/genai`)
-   **Charts**: Recharts
-   **Icons**: Heroicons

## 🚀 Getting Started

This project is a static web application and does not require a complex build process. It's designed to run directly in the browser.

### Prerequisites

-   A modern web browser.
-   A Google Gemini API Key.

### Running Locally

1.  Clone the repository or download the source code.
2.  Because the app uses ES modules, you'll need to serve the files through a local web server. Opening `index.html` directly from the filesystem will not work.

    A simple way to do this is to use a command-line server or a code editor extension.

    **Using VS Code's Live Server Extension:**
    - Install the "Live Server" extension.
    - Right-click on `index.html` in the file explorer and select "Open with Live Server".

    **Using a command-line server (if you have Node.js or Python):**
    ```bash
    # If you have Node.js
    npx serve .

    # If you have Python
    python3 -m http.server
    ```
3.  Open your browser and navigate to the local address provided by your server (e.g., `http://localhost:3000` or `http://localhost:8000`).

**Note on API Key for Local Development:** The application is designed to fetch the API key from environment variables, which is ideal for deployment. For local testing, you might need to temporarily modify `services/geminiService.ts` and replace `process.env.API_KEY` with your actual key. Remember to **never** commit your API key to a public repository.

## 📦 Deployment to Vercel

This application is ready to be deployed on any static hosting platform. Vercel is a great choice.

1.  **Push to GitHub**: Create a new repository on GitHub and push the project files to it.
2.  **Import to Vercel**:
    - Sign up or log in to [Vercel](https://vercel.com/).
    - From your dashboard, click "Add New... -> Project".
    - Import your GitHub repository.
3.  **Configure Project**:
    - Vercel should automatically detect that this is a static project. No "Framework Preset" is needed.
    - Before deploying, go to the "Environment Variables" section in the project settings.
    - Add a new variable:
      - **Name**: `API_KEY`
      - **Value**: Your Google Gemini API Key.
4.  **Deploy**: Click the "Deploy" button. Vercel will deploy your site and provide you with a URL.
