# Nook

A personal space to save and organize articles to read later.

## Overview

Nook is a Vue.js application that allows users to save articles by adding their URLs to a personal reading list.

When an article is added, Nook retrieves its metadata and displays it as a card. Users can then browse, sort, and manage their saved articles.

The project was built to practice Vue.js, state management, and API integration in a frontend-only application.

## Features

- Save articles using their URLs
- Retrieve article metadata from their URLs
- Display saved articles as cards
- Sort saved articles
- Manage a personal reading list
- Read saved articles later

## Tech Stack

- Vue.js
- TypeScript
- Vue Router
- Pinia
- Vite

## API

Nook uses OpenGraph.io to retrieve metadata from article URLs, such as titles, descriptions, and images.

Since Nook is a frontend-only application, the public version uses mock data instead of exposing the OpenGraph.io API key in the client-side application.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/NIGHTLePoulet/nook.git
cd nook
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

## Screenshots

## What I Learned

This project helped me improve my understanding of:

## License

This project is for learning and portfolio purposes.
