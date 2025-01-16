# Exhibitly Frontend

Welcome to the **Exhibitly Frontend Repository**, the React-powered user interface of our Single Page Application (SPA). Exhibitly enables users to curate their personal museum by adding and managing their favorite movies, books, and music. This repository houses the code for the web interface, designed with an intuitive and seamless user experience in mind.

---

## Features

- **Single Page Application (SPA)**: Built using React with functional components and hooks for modern state management.
- **Dynamic Views**: Users can easily navigate between views for movies, books, and music.
- **CRUD Operations**: Fully functional Create, Read, Update, and Delete operations integrated with the backend API.
- **External API Integration**: Enhanced user experience with data fetched from external sources (e.g., movie or book databases).
- **Responsive Design**: Optimized for various devices, including desktops, tablets, and mobile screens.
- **Deployment**: Deployed online and accessible [here](https://exhibitly.netlify.app).

---

## Main Technologies Used

- **React**: Core library for building the user interface.
- **React Router**: For navigation and routing.
- **Axios**: For API communication.
- **Netlify**: Deployment platform for a seamless hosting experience.

---

## Project Structure

```plaintext
src/
├── assets/           # Static files (images, icons, etc.)
├── components/       # Reusable React components
├── config/           # Configuration files
├── contexts/         # React context files for state management
├── pages/            # Page-level views for routing
├── services/         # API service for backend communication
├── styles/           # CSS modules for styling
├── App.jsx           # Main application component
└── main.jsx          # Application entry point

root/
├── public/           # Static public files
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
├── eslint.config.js  # ESLint configuration
├── index.html        # HTML entry point
├── package.json      # Project dependencies and scripts
├── vite.config.js    # Vite configuration
└── README.md         # Project documentation
```
---

## Deployment

The frontend is hosted on Netlify and accessible to the public. Visit the app here:  
**[Exhibitly](https://exhibitly.netlify.app)**

---

## Acknowledgments

- Special thanks to the team for their contributions: Hernani Silva and Luke Farrell.
- APIs used in this project include:
  - **TMDB (The Movie Database)**: For movie data.
  - **Spotify**: For music data.
  - **Open Library Books**: For book data.
  - **Ticketmaster**: For event data.
