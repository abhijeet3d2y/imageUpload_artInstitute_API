# Image Upload and Art Institute API Integration

This is a simple Node.js application that provides an image upload functionality and integrates with the Art Institute of Chicago API to retrieve artwork information.

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abhijeet3d2y/imageUpload_artInstitute_API.git

2. Navigate to the project directory 
    cd imageUpload_artInstitute_API

3. Install dependencies - 
    npm install

4. Create a .env file in the root of the project and configure your environment variables - 
    PORT=3000

## To start the application, run:

- npm start

## Endpoints

    Base URL - 
- http://localhost:3000/

    Image Upload - 
- POST - /upload
- Upload an image below 2 MB Size. The server will return URLs for the original and resized 100 * 100 size images.

    Art Institute API Integration - 
- GET - /art-institute
- Retrieve artwork information from the Art Institute of Chicago API. All the URLs for images is also working. 
- You can see all images by copy pasting them on chrome or any browser.

************************* THANK YOU ALL - abhijeet3d2y :) !!***********************************