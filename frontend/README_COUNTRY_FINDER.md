
# Country Explorer

**Country Explorer** is a React application that allows users to explore information about different countries, including their population, region, currencies, languages, and more.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Routing](#routing)
- [Features](#features)
- [Enhancements](#enhancements)
- [License](#license)

## Technologies Used

### Frontend:

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that adds static types.
- **Redux Toolkit**: State management library.
- **Material-UI**: React component library for UI design.
- **React Router DOM**: For client-side routing.

### Backend (if applicable):

- **API Source**: [REST Countries API](https://restcountries.com/v3.1/), used for fetching country data.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/country-explorer.git
   cd country-explorer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your environment variables:

   ```bash
   REACT_APP_API_URL=https://restcountries.com/v3.1/
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Project Structure

```
country-explorer/
├── src/
│   ├── components/        # Reusable components
│   ├── features/          # Redux slices and state management
│   ├── pages/             # Different pages of the application
│   ├── store/             # Redux store configuration
│   ├── App.tsx            # Main application component
│   ├── index.tsx          # Entry point of the application
│   └── ...
├── public/
│   ├── index.html
│   └── ...
├── .env                   # Environment variables
├── .gitignore             # Files to ignore in the repository
├── README.md              # Project documentation
└── package.json           # Project metadata and dependencies
```

## API Endpoints

Here are the main API endpoints used in this project:

- **Get all countries:**
  - **URL**: `https://restcountries.com/v3.1/all`
  - **Method**: GET
  - **Description**: Returns a list of all countries with detailed information.

- **Get country by code:**
  - **URL**: `https://restcountries.com/v3.1/alpha/{code}`
  - **Method**: GET
  - **Description**: Returns detailed information about a country by its alpha code.

- **Search countries by name:**
  - **URL**: `https://restcountries.com/v3.1/name/{name}`
  - **Method**: GET
  - **Description**: Returns country details that match the search name.

## Routing

This project utilizes React Router for client-side routing. Below are the main routes defined in the application:

- **Home Page** (`/`): Displays a list of all countries.
- **Country Details** (`/country/:code`): Shows detailed information about a specific country.

## Features

- Browse and search countries.
- View country details including population, region, languages, and currencies.
- Filter countries by region or subregion.
- User-friendly interface with Material-UI components.

## Enhancements

- Implement dark mode toggle.
- Add pagination for country list.
- Include a map view for visualizing country locations.
- Add a favorites feature for users to save preferred countries.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
