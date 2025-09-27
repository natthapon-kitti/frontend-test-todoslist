# Todos-list with API integration

## Overview

The Eesponsive to-do list application designed to help users manage their daily tasks efficiently. this application integrates with a RESTful API endpoint (typically provided by a mock API service) to provide persistent storage and real-time synchronization, making it ideal for simulating multi-device usage or collaboration.

The application focuses on an intuitive user experience with features like task categorization via color coding and dynamic task filtering.

## Key Features
The following functionalities are included to provide comprehensive task management:

### Create Task:
Users can easily add new tasks. When creating a task, they can specify:
The task name/description.
A color label to visually categorize or prioritize the task.

### Edit Task:   
Tasks can be modified post-creation, allowing users to update the name/description as needed.

### Delete Task: 
Tasks can be permanently removed from the list.

### Mark as Done: 
checkboxes to mark tasks as completed, visually separating them from pending items.

### Filter Tasks: 
Tasks can be dynamically filtered based on their status (e.g., all, incomplete, completed).

### Technology & API
This application is built with a focus on a responsive frontend experience and robust data handling via an external API.

| Component | Technology / Concept | Description |
| Frontend | HTML, CSS (Tailwind/Bootstrap), Typescript / React 
| API | Mock API / API Simulation Service | Handles all Create, Read, Update, and Delete (CRUD) operations for tasks using a simulated external endpoint. |
| State Management | React Context API and React hooks | Manages the asynchronous loading and updating of task data from the API. |

## Installation and Setup
To get a local copy up and running, follow these simple steps.

### Clone the repository:

git clone
      
    https://github.com/natthapon-kitti/frontend-test-todoslist.git

cd todos-list-app


## Install dependencies:

    npm install


## Configure Mock API Endpoint:

Create a .env file in the root directory.

Add the URL for your mock API service, ensuring it points to the correct tasks collection (e.g., VITE_API_URL=https://<your-mock-service-id>.mockapi.io/tasks).

## Run the application:

    npm run dev



The application should now be running in your browser, typically at http://localhost:5173.
