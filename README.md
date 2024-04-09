# Permit Application System

This project provides a system for handling permit applications for various types of work, including interior and exterior modifications. The system allows users to submit details about their projects and receive information on the necessary permit requirements.

## Video Walkthrough

[![Video](https://cdn.loom.com/sessions/thumbnails/f266be9c92f74737b3b194888321fe72-with-play.gif)](https://www.loom.com/embed/f266be9c92f74737b3b194888321fe72?sid=83d2425f-061f-4855-948c-af329f14a9b0 "Video")

## Features

- **Questionnaire for Permit Requirements**: Users click through the type of work they plan to undertake. Based on their responses, the system identifies the necessary permit requirements.

- **Submission Tracking**: The system stores all submissions in a database, making it easy to retrieve and manage.

- **Dynamic Permit Tree**: The backend uses a tree structure to navigate through the questionnaire logic dynamically, allowing for a flexible and scalable way to handle various types of work and their corresponding permit requirements.

## Project Structure

The project is divided into two main parts: the backend (`permit-backend`) and the frontend (`permit-frontend`).

### Backend

The backend is built with Express.js and uses NeDB, a lightweight JavaScript database, for storage. It provides RESTful APIs for handling the questionnaire logic, submissions, and permit requirement determination.

Key Components:
- **Express Server**: Sets up the API endpoints and middleware.
- **Permit Tree**: Implements the logic for navigating through the questionnaire and determining permit requirements.
- **Submissions Model**: Manages CRUD operations for submissions in the NeDB database.

### Frontend

The frontend provides a user-friendly interface for interacting with the permit system. It is built with React and uses Axios for API communication.

Key Features:
- **Permit Questionnaire**: Guides users through a series of questions to determine their project's permit requirements.
- **Submission Form**: Allows users to submit details about their project.
- **Submissions List**: Displays a list of all submissions made by the user.

## Setup and Running the Project

Ensure you have Node.js and npm installed on your system before proceeding.

1. **Clone the Repository**

```bash
git clone https://github.com/davidlacho/permitting-app.git
```

2. **Install Dependencies**

For the backend:

```bash
cd permit-backend
npm install
```

For the frontend:

```bash
cd permit-frontend
npm install
```

3. **Start the Backend Server**

```bash
cd permit-backend
npm start
```

4. **Start the Frontend Application**

```bash
cd permit-frontend
npm start
```

Alternatively, you can use the provided `Makefile` commands to streamline the setup process:

```bash
make start
```

This command installs all necessary dependencies for both backend and frontend, and starts both applications.

5. **Stopping the Frontend and Backend Application**
```bash
make stop
```

## API Endpoints

- **POST `/api/questionnaire/submit`**: Submit a new permit application.
- **GET `/api/questionnaire/submissions`**: Retrieve all submissions.
- **GET `/api/questionnaire/permit-options`**: Get the questionnaire tree structure for permit options.


## Database Spec
Schema:
- _id: A unique identifier for the submission. This is automatically generated by the database. (String)
- type: The type of work being performed (e.g., "Interior work", "Exterior work"). This reflects the top-level categorization of the submission. (String)
- workDetails: An array of strings detailing the specific work items involved in the submission (e.g., ["New bathroom", "Electrical wiring"]). (Array of Strings)
- permitRequirement: The permit requirement determined based on the questionnaire's decision tree. (String)
- createdAt: Timestamp indicating when the submission was created. (Date)

Operations
- Insertion: When a new submission is made, a new document is inserted into the database with the fields populated according to the submission details.
- Querying: The application needs to fetch submissions

## Notes on Submission

### Approach for Integrating Multiple Selections
Although I didn't get to its implementation, the existing decision tree structure can accommodate multiple selections through the following enhancements:

- Decision Tree Adaptation: The decision nodes within the tree can be modified to handle arrays of selections as inputs rather than single selections. This involves adjusting the navigation logic to iterate over multiple inputs at each decision point and aggregate the resulting permit requirements based on the combination of choices.
- UI Enhancements: The user interface can be enhanced to allow multiple selections. This could involve checkboxes or multi-select dropdown menus, enabling users to indicate all applicable options for their project. The UI would then communicate these selections as an array to the backend for processing.

### Improvements

- The current implementation uses a static decision tree to navigate permit requirements. An optimal design would involve a dynamic permit process engine capable of generating permit processes based on configurable rules and conditions stored in a database or a rule engine. This would allow for easy updates to the permitting logic without needing to modify the codebase.
- Abstracting the data model to support various types of permits, workflows, and municipalities would involve creating a more flexible schema that can accommodate different data fields, validation rules, and workflows. 

### Coding and Best Practices
- I've strived to adhere to clean code principles and best practices throughout the development process, ensuring that my code is not only functional but also maintainable and extensible. I designed the application with a clear separation of concerns in mind, organizing my code into models, routes, utilities, and services. This structure not only makes the codebase easier to navigate but also facilitates reusability and scalability. For instance, the PermitTreeService, which encapsulates the logic for determining permit requirements, is implemented in a way that it can easily be extended or modified without impacting other parts of the system. 

- I wrote a tree structure because it naturally mirrors the decision-making process users follow when determining permit requirements. Each branch represents a decision path, leading to a final outcome based on a series of choices. This makes the tree structure intuitive both for developers working on the code and for users interacting with the final application.

- I also wrote Jest tests in the backend for TDD to ensure that each endpoint could be tested in isolation. 

### 3 Hour Time Window

I went over the three hour time allotted to this project. This additional time allowed me to thoroughly implement a robust tree structure that accurately reflects real-world decision-making processes in the permit application flow. It also enabled me to incorporate a comprehensive testing strategy that aligns with Test-Driven Development (TDD) practices, ensuring the reliability and maintainability of the codebase. I was commited to quality submission and I wanted to ensure that the application’s architecture is scalable and facilitates future enhancements and the integration of new features without significant refactoring.