# QuizQuest

QuizQuest is a MERN stack web application for creating and taking quizzes, viewing past quizzes, and teachers analyzing student results.

## Features

- Create and take quizzes
- View past quizzes
- Teacher dashboard for result analysis

## Tech Stack

- **Frontend**: React with Vite
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Docker installed

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dakshilgorasiya/QuizQuest.git
   ```
   ```bash
   cd QuizQuest
   ```

2. **Create a `.env` file in the root directory of backend**

   ```bash
   cd backend
   ```
   ```bash
   touch .env
   ```
    Write the environment variables in the `.env` file as shown in the `.env.sample` file.


3. **Build and run with Docker**

    ```bash
    docker compose up -d
    ```

