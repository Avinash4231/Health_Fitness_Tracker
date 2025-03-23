# Health_Fitness_Tracker

A comprehensive health and fitness tracking application built with **ReactJS** on the frontend and **.NET Core** for the backend. This platform allows users to track workouts, progress, and manage their fitness goals, while also providing an admin dashboard for user management and analytics.

## Demo
https://github.com/user-attachments/assets/9dc3792a-710e-477b-b950-2cd406273975


## Features

### 1. **User Authentication**
- **LoginPage**: Login interface for users. (`/login`)
- **SignupPage**: User registration with OTP validation. (`/signup`)
- **ForgotPassword**: Allows users to reset their password using OTP. (`/forgot-password`)

### 2. **Dashboard & User Management**
- **Dashboard**: Main user dashboard displaying progress and workout info. (`/dashboard`)
- **UserProfile**: User profile and settings. (`/profile`)
- **EditUser**: Update user information and settings. (`/edit-user`)
- **UserPage**: Admin page to manage all users. (`/users`)
- **UserRegister**: Admin page for registering new users. (`/user-register`)

### 3. **Workout & Progress Tracking**
- **WorkoutDetails**: View detailed workout records. (`/workouts/:id`)
- **AddWorkoutPage**: Add new workout records. (`/add-workout`)
- **AddProgress**: Add progress details for the user. (`/add-progress`)
- **ProgressTracking**: View and track user progress over time. (`/progress-tracking`)

### 4. **Miscellaneous**
- **ErrorPage**: Error handling page for non-existing routes. (`/error`)
- **Layout**: Base layout for navigation and page structure.

## Backend APIs

### User Authentication
- **GET** `/api/Users`: Retrieve all users.
- **GET** `/api/Users/{id}`: Retrieve a user by ID.
- **GET** `/api/Users/email/{email}`: Retrieve a user by email.
- **GET** `/api/Users/login/{email}/{password}`: User login verification.
- **POST** `/api/Users`: Register a new user.
- **PUT** `/api/Users/{id}`: Update user details.

### Progress Tracking
- **GET** `/api/ProgressTrackings`: Retrieve all progress tracking entries.
- **GET** `/api/ProgressTrackings/{id}`: Get a specific progress tracking entry by ID.
- **GET** `/api/ProgressTrackings/user/{userId}`: Get progress tracking records for a user.
- **POST** `/api/ProgressTrackings`: Add a new progress tracking entry.
- **PUT** `/api/ProgressTrackings/{id}`: Update progress tracking entry.
- **DELETE** `/api/ProgressTrackings/{id}`: Delete a progress tracking entry.

### User Workouts
- **GET** `/api/UserWorkouts`: Retrieve all user workout records.
- **GET** `/api/UserWorkouts/{id}`: Retrieve a user workout by ID.
- **GET** `/api/UserWorkouts/user/{userId}`: Get all workout records for a specific user.
- **POST** `/api/UserWorkouts`: Create a new user workout record.
- **PUT** `/api/UserWorkouts/{id}`: Update a user workout.
- **DELETE** `/api/UserWorkouts/{id}`: Delete a workout record.

### Email Notifications
- **POST** `/api/Users/SendTestMail`: Send a test email. *(Please use your email and password for personal use, ensure credentials are encrypted for security purposes)*

## Admin Features
- **Admin Login**: Secure login for administrators.
- **User Management**: Admin can view all users, update their information, and send email reports.
- **Weekly Reports**: Admin can send a 7-day fitness progress report via email to users.

## Normal User Features
- **View Workout Details**: Users can view their individual workout records.
- **Track Progress**: Users can add and track their fitness progress over time.
- **Profile Management**: Users can edit their own profile and settings.

## Setup Instructions

### Prerequisites
- Node.js (Frontend)
- .NET Core SDK (Backend)
- Email service for OTP verification and sending emails (SMTP)

### Frontend (ReactJS)
1. Clone the repository:
   ```
   git clone https://github.com/Avinash4231/Health_Fitness_Tracker.git
   cd Health_Fitness_Tracker/client
   ```
2. Install dependencies:
```
npm install
```
3. Run the React development server:
```
npm start
```
The frontend will be accessible at http://localhost:3000.

### Backend (.NET Core)
1. Clone the repository:
```
git clone https://github.com/Avinash4231/Health_Fitness_Tracker.git
cd Health_Fitness_Tracker/FullStackApp
```
2. Restore dependencies and build the project:
```
dotnet restore
dotnet build
```
3. Run the backend server:
```
dotnet run
```
The backend will be accessible at http://localhost:5129.

### OTP Verification
OTP verification for user registration and password reset is handled via email. Ensure your email configuration is properly set up in the backend to enable OTP generation and validation.

### Email Configuration
In the backend, you need to configure the email service to send OTPs and weekly progress reports. For personal use, you can provide the email and password in the configuration. Important: Encrypt these credentials and never expose them in your source code.

## Technologies Used
- Frontend: ReactJS
- Backend: .NET Core
- Database: (Specify your database like SQL Server, MySQL, etc.)
- Authentication: OTP via Email
- Email Service: (Specify your email service, e.g., SMTP, SendGrid)

## Contributing
We welcome contributions! If you'd like to contribute to this project, please fork the repository, create a new branch, make your changes, and then create a pull request. Ensure that your code follows the project's coding standards and includes tests where appropriate.

## Guidelines:
- Use descriptive commit messages.
- Follow the existing code style.
- Make sure the tests pass before submitting a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.


