# Product Management System

## Table of Contents
1. [Installation Instructions](#installation-instructions)
2. [Application Overview](#application-overview)
3. [Assumptions and Important Decisions](#assumptions-and-important-decisions)

## Installation Instructions
### Step-by-Step Installation

1. **Clone the repository**:
   git clone <[repository_url](https://github.com/saar-amsalem/dummy_api_fetch.git)>
   cd dummy_api_fetch

2. **Install dependencies**
   pip install -r requirements.txt

3. **Run Application**
  python app.py

4. **Open Application**
   Open browser and navigate to http://localhost:5000

# Application Overview
## How the Application Works
The Product Management System is a web application that allows users to search, view, and paginate through a list of products. It consists of a frontend built with HTML, CSS, and JavaScript, and a backend built with Python and Flask.

## Key Functionalities
1. Product Listing: Displays a list of products in a table format.
2. Search: Allows users to search products by title.
3. Pagination: Users can navigate through pages of products.
4. Gallery View: Users can view additional images of products.
5. Modal Image View: Clicking on an image opens it in a modal for a larger view.

# Assumptions and Important Decisions
## Assumptions
1. It is way easier for the user not scroll down but use pagination instead.
2. Handle errors gracefully

## Decisions
1. User Experience: Implemented features like loaders, modals, and gallery views to enhance user experience.
2. Error Handling: Basic error handling is implemented to manage scenarios where no products are found or network issues occur.
