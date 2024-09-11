# Product Management Application

This is a basic Product Management application where users can add, update, view, and delete products. The application consists of a Django backend API and a React frontend interface. 

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation and Setup](#installation-and-setup)
  - [Backend Setup](#backend-setup-django-api)
  - [Frontend Setup](#frontend-setup-react)
- [Usage](#usage)
- [Bonus Features](#bonus-features)

## Project Overview
The goal of this project is to build a simple Product Management system with:
- A Django backend that serves a REST API for managing products.
- A React frontend that allows users to interact with the API (e.g., add, view, update, delete products).

## Features
1. **Backend (Django API):**
   - CRUD operations on products:
     - List all products
     - Add a new product
     - Update an existing product
     - Delete a product
   - Product model with the following fields:
     - `name` (CharField, max length 100)
     - `description` (TextField)
     - `price` (DecimalField with two decimal places)

2. **Frontend (React):**
   - A form for adding a new product.
   - A list that displays all the products fetched from the backend.
   - Edit form and delete buttons for managing products.
   - UI updates dynamically when products are added, updated, or deleted.

## Requirements
- **Backend (Django)**:
  - Django
  - Django Rest Framework
  
- **Frontend (React)**:
  - React
  - Axios or Fetch API for making requests

## Installation and Setup

### Backend Setup (Django API)

1. Set up a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # For Linux/Mac
   # or
   venv\Scripts\activate     # For Windows
   ```

2. Clone the repository:
   ```bash
   git clone <repository_url>
   cd product_project
   ```



3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations to set up the database:
   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

  

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd product-frontend
   ```

2. Install the required dependencies:
   ```bash
   npm i
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000/`.

## Usage
1. **Adding a Product**: Use the form on the frontend to add a new product. Fill in the product name, description, and price, and submit the form.

2. **Viewing Products**: The list of all products will be displayed on the main page, fetched from the backend API.

3. **Updating a Product**: Click the "Edit" button next to a product, modify the details, and submit the changes.

4. **Deleting a Product**: Click the "Delete" button to remove a product.

## Bonus Features
- **Form Validation**: Ensures that the product name is not empty and the price is a positive number.
- **Search Functionality**: A search bar allows filtering products by name.

Feel free to explore the code and customize it as per your needs!