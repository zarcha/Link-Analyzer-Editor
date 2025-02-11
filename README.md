# Megaman Link Analyzer Editor

- this project was created to interface with the Megman Link Analyzer created by Zach Lambert allowing you to read, write, restore, and mod Megaman Link PET Navi chips.

# Web server Build

- Run`npm run build`
    - A `dist` folder will be created with all the contents needed to deploy on apache, nginx, etc.

# Local

- Run `npm run dev`
    - This will create a local dev server using vite and the output of the command will show where to access the webpage.

# Docker

- Run `docker build -t link-analyzer .`
    - This will build the applications dist folder and then pass it into an nginx web server.
- Run `docker run -p 8080:80 link-analyzer`
    - This will run the built docker image with port 8080 locally.

# Testing

- Run `npm run test`
    - This will run vitest tests across the project.
    - Currently, there is 90%+ coverage.
