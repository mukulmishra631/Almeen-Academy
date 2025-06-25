# Almeen Academy Website

## Overview
Almeen Academy is a modern, responsive website for a CBSE school located in Bhathat, Uttar Pradesh. The site is designed to provide information to parents, students, and the community, and is optimized for both SEO and performance. It is built using HTML, CSS, and JavaScript, and is ready for deployment on Netlify.

## Features
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices.
- **SEO Optimized:**
  - Meta tags, Open Graph, and Twitter Cards for social sharing
  - Schema.org structured data for School/LocalBusiness
  - XML sitemap and robots.txt for search engine crawling
  - Keyword-rich content and internal linking
- **Performance Optimizations:**
  - SVG icons for fast, crisp visuals
  - Netlify configuration for image, CSS, and JS optimization
  - Brotli compression and proper caching headers
  - Preloading of critical resources
- **Modern UI/UX:**
  - Animated hero section
  - Clean navigation and section layout
  - Accessible and mobile-friendly
- **Content Sections:**
  - Home, About, Academics, Admission, Gallery, Contact
  - Leadership messages, school story, and more

## Project Structure
```
Almeen-Academy-/
  |-- about.html
  |-- academics.html
  |-- admission.html
  |-- contact.html
  |-- gallery.html
  |-- index.html
  |-- css/
  |     |-- style.css
  |-- js/
  |     |-- script.js
  |-- Images_almeen/
  |     |-- (all images, icons, and manifest)
  |-- sitemap.xml
  |-- robots.txt
  |-- netlify.toml
  |-- _headers
  |-- README.md
```

## SEO & Performance Details
- **Meta Tags:** Each page has unique title, description, and keywords.
- **Schema Markup:** JSON-LD for School, including address, contact, and ratings.
- **Sitemap & Robots:** Ensures all pages are indexed and crawled by search engines.
- **Image Optimization:** Netlify automatically compresses and caches images.
- **SVG Icons:** Used instead of emojis for better performance and accessibility.
- **Hero Animation:** Smooth fade-in and slide-up effect on homepage load.

## Deployment (Netlify)
1. **Connect your GitHub repository to Netlify** or drag-and-drop the project folder in the Netlify UI.
2. Netlify will auto-detect and deploy the site.
3. All optimizations (image compression, minification, caching) are handled via `netlify.toml` and `_headers`.
4. Make sure your domain (e.g., `almeenacademy.in`) is set in `sitemap.xml` and `robots.txt`.

## Customization
- **Content:** Edit the HTML files to update text, images, or add new sections.
- **Images:** Place new images in `Images_almeen/` and reference them in your HTML.
- **Styles:** Modify `css/style.css` for custom colors, fonts, or layout tweaks.
- **Scripts:** Add or update JavaScript in `js/script.js` for interactivity.

## Accessibility & Best Practices
- All images have descriptive `alt` tags.
- Navigation is keyboard accessible.
- Color contrast and font sizes are optimized for readability.

## Credits
- Designed and developed By MUKUL MISHRA.
- Icons: [Material Icons SVG](https://fonts.google.com/icons)
- Deployed with [Netlify](https://www.netlify.com/)

---

For any questions or further customization, please contact the developer or open an issue in your repository. 