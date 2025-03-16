# GetCouponWebsite

This project is a coupon management website built with React, Vite, Zustand, and Tailwind CSS. It allows users to claim coupons and administrators to manage coupons.

## Features

- User authentication with login and logout functionality
- Admin dashboard to add, edit, delete, and manage coupons
- User interface to view and claim available coupons
- Responsive design with Tailwind CSS
- State management with Zustand
- API integration with Axios

## Project Structure

```
📦 Project Root
├── 📄 .env
├── 📄 .gitignore
├── 📄 eslint.config.js
├── 📄 index.html
├── 📄 package.json
├── 📄 postcss.config.js
├── 📄 README.md
├── 📄 tailwind.config.js
├── 📄 vite.config.js
│
├── 📂 public
│   └── 📄 vite.svg
│
├── 📂 src
│   ├── 📄 App.css
│   ├── 📄 App.jsx
│   ├── 📄 index.css
│   ├── 📄 main.jsx
│   │
│   ├── 📂 assets
│   │   └── 📄 react.svg
│   │
│   ├── 📂 components
│   │   ├── 📄 LoadingSpinner.jsx
│   │   └── 📄 Navbar.jsx
│   │
│   ├── 📂 lib
│   │   └── 📄 axios.js
│   │
│   ├── 📂 pages
│   │   ├── 📄 DashBoard.jsx
│   │   ├── 📄 HomePage.jsx
│   │   └── 📄 LoginPage.jsx
│   │
│   ├── 📂 stores
│   │   ├── 📄 couponStore.js
│   │   └── 📄 useUserStore.js
```

## Getting Started

### Installation

1. Clone the repository:

```sh
git clone https://github.com/AgrimGupta195/GetCouponWebsite.git
```

2. Install Dependencies:

```sh
npm install
```

3. Create a `.env` file and add the following:

```sh
VITE_API_URL="URL"
```

4. Start the development server:

```sh
npm run dev
```

## Technologies Used

- **React** - Frontend library
- **Vite** - Fast build tool for React
- **Tailwind CSS** - Styling framework
- **Zustand** - State management
- **Axios** - HTTP requests
- **React Router** - Client-side routing


