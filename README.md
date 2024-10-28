# MyWeather App

Welcome to **MyWeather**, a React Native application designed to provide real-time weather information with a clean and intuitive interface. This app is primarily built and optimized for Android, aiming to deliver a seamless user experience by leveraging modern mobile development practices.


## Table of Contents

- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Features](#features)
- [Improvements](#improvements)


## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android)
- [Xcode](https://developer.apple.com/xcode/) (for iOS)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/tiberioursan/myweather.git
    cd myweather
    ```

2. Install the dependencies:

    ```sh
    npm install
    # OR
    yarn install
    ```


## Running the Application

### Start the Metro Server

First, start the Metro bundler:

```sh
npm start
# OR
yarn start
```

### Run on Android

Can be pressed "a" from the Metro boundler to run the Android emulator or the following command:

```sh
npm run android
# OR
yarn android
```


## Project structure
The project follows a standard React Native structure with the following key directories:

- src/: Contains the main application code.
- components/: Reusable UI components.
- api/: API calls and other services.
- hooks/: Custom hooks and helpers.
- context/: Contexts handling like SettingsContext and PopupContext
- errors/: Errors handling and showing throw a Toast configuration and service
- storage/: App storage management which contains all the storage actions
- types/: A collection of different interfaces used across the project


## Features

### User Location
The app retrieves the user's current location using the device's GPS. This location is then used to fetch the weather data for that specific position, ensuring that users always have up-to-date weather information for their current location.

### Default Cities
The app comes with two default cities: London and Berlin. These cities are fetched and displayed when the app is first launched, providing users with immediate weather information for these major cities.

### Adding New Cities
Users can add new cities to the app. These cities are stored in the app's local storage. When a new city is added:

 - The user enters the city name.
 - The app fetches the weather data for the new city.
 - The city is added to the list and stored in local storage for future use.
   
### Settings
Users can access the settings to change the temperature units (Celsius or Fahrenheit) for the entire app, allowing for a personalized user experience.


## Improvements needed

### Environment Variables
.env File: Implement a .env file for managing environment variables. Currently, one of the APIs used requires an API key which is not defined in the .env file due to time constraints.
### Loading Process:
Improve the graphical handling and implementation of the loading process.
### Toast Notifications:
Implement different types of toast notifications, such as a success toast when a new city is added to the app.
### State Management:
Implement a store to simplify and manage complex functionalities, such as temperature unit management.
### Error Handling:
Add extra error handling, for example, in cases where the weather icon image is not available.
### TypeScript:
Add more type definitions to ensure better type safety and catch errors early.
### Helper Functions:
Refactor some functions into helper files to make the app more scalable and the functions globally available.
### Some functionality:
- Implement a better and more solid way to retrieve a location when the user wants to add a new one (ex. using Google APIs), with autocomplete and city selector in case of multiple matchings.
- Implement a better and more solid way to retrieve the location name in case of coordinates far from cities.


