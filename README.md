# MyNews

## Project Overview

**MyNews** is a web application built by **Orynto Team** which delivers up‑to‑date news and Premier league stats content via frontend & backend components. It allows users to view, search, and interact with news items, facilitating a clean, modern interface and robust server‑side support.

---

## Table of Contents

- [Features](#features)  
- [Technical Stack](#technical-stack)  
- [Architecture & Folder Structure](#architecture--folder-structure)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the Application](#running-the-application)  
- [Authors](#authors)  
- [License](#license)  

---

## Features

- Fetch and display news/football stats items from various categories  
- Search functionality to find news/football stats by keywords or filters  
- Front‑end / Backend separation for modularity and scalability  
- Responsive UI design to work on both desktop & mobile  
- Error handling & basic validation  

---

## Technical Stack

| Layer           | Technologies Used                          |
|------------------|---------------------------------------------|
| Frontend         | HTML, CSS, JavaScript                     |
| Backend          | Node.js / Express    |
| APIs / Routing   | RESTful endpoints                          |
| Data format      | JSON                                       |

---

## Architecture & Folder Structure

```
News‑Task‑Depi‑Team4/
├── backend/
│   ├── server.js
│   └── .gitignore
├── frontend/
│   ├── css/
│   ├── imgs/
│   ├── js/
│   └── index.html
└── README.md
```

- The **backend** directory handles all server side logic: API endpoints, data models, controllers.  
- The **frontend** directory contains static files + client‑side JS / HTML to render UI.
---

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (version ≥ *20.x*)  
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OmegasHyper/News-Task-Depi-Team4.git
   ```

2. Install backend dependencies:

   ```bash
   cd News-Task-Depi-Team4/backend
   npm install
   ```

### Running the Application

To start both backend and frontend:

- **Backend**:

  ```bash
  cd backend
  npm start
  ```

- **Frontend**:

   run index.html using live server
---

## Usage

- Navigate to the frontend URL (`http://localhost:5000`) to browse news items.  
- Use search bar / filter options to look for specific news topics.  
- Click on individual news items to view details.

---

## Authors

- **Mohamed Abdelrazek**
- **Hazem‑BackEnd** 

---

## Acknowledgments

- Thanks to all team members who contributed  
- Inspired by various news‑app tutorials & open source projects