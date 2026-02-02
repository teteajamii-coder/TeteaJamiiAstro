# Tetea Jamii Website - Client Guide

Welcome to your new website! This guide explains how to make common updates without needing to be a code expert.

## 📁 Project Structure
The most important files for you are in:
-   `src/pages/`: Contains the text and content for each page.
-   `public/assets/images/`: Contains all the images used on the site.

## 📝 How to Edit Text
To change text on a page (e.g., the "About Us" page):
1.  Open the file `src/pages/about.astro` in your editor.
2.  Look for the text you want to change (it will be inside HTML tags like `<p>`, `<h1>`, or `<li>`).
3.  Edit the text **between the tags**.
    *   **✅ Do this:** `<p>This is the new text.</p>`
    *   **❌ Don't do this:** delete the `<p>` or `</p>` tags.
4.  Save the file.

## 🖼️ How to Change Images
To replace an image (e.g., the home page hero):
1.  Get your new image ready (JPG or PNG is best).
2.  Rename it to match the existing file (e.g., `home-hero.png`).
3.  Go to `public/assets/images/`.
4.  **Replace** the existing file with your new one.
5.  The site will automatically show the new image.

## 🚀 How to Deploy (Go Live)
This site is built with **Astro**, which makes it incredibly fast and secure. The best way to host it for free is using **Cloudflare Pages**.

1.  **Push to GitHub**: Ensure this project folder is uploaded to a GitHub repository.
2.  **Log in to Cloudflare**: Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up/log in.
3.  **Create Application**:
    *   Go to "Workers & Pages" > "Create Application" > "Pages" > "Connect to Git".
    *   Select your `TeteaJamiiAstro` repository.
4.  **Configure Build (CRITICAL STEP)**:
    *   **Framework Preset**: You **MUST** select `Astro`.
    *   **Build Command**: `npm run build`
    *   **Build output directory**: `dist`
    *   *Note: If you do not see "Build output directory" or if it asks for a "Deploy command", delete the project and start again. You are in "Worker" mode by mistake.*
5.  **Deploy**: Click "Save and Deploy".

Cloudflare will now build your site and give you a live URL (e.g., `tetea-jamii.pages.dev`). Any time you make changes and push to GitHub, Cloudflare will automatically update your site!

## 🆘 Need Help?
-   **Forms**: Your forms are connected to Formspree. Log in to [formspree.io](https://formspree.io) to see submissions and verify your email.
-   **Maps**: The maps use OpenStreetMap (free). No API keys to manage.
