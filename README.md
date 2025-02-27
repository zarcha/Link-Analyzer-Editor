# Megaman Link Analyzer Editor

- this project was created to interface with the Megman Link Analyzer created by Zach Lambert allowing you to read, write, restore, and mod Megaman Link PET Navi chips.

# Web Server Build

- Run`npm run build`
    - A `dist` folder will be created with all the contents needed to deploy on apache, nginx, etc.

# Local Deployment

- Run `npm run dev`
    - This will create a local dev server using vite and the output of the command will show where to access the webpage.

# Docker Image

- Run `docker build -t link-analyzer .`
    - This will build the applications dist folder and then pass it into an nginx web server.
- Run `docker run -p 8080:80 link-analyzer`
    - This will run the built docker image with port 8080 locally.

# K8S Deployment

Helm is used for the deployment. The K8S server needs istio and istio ingress gateway installed. By default, helm will install the app with a HTTP gateway server with no specific binding address `- *`.

- Run `helm install link-analyzer ./deploy/`
    - This will deploy the app under a namespace called link-analyzer, to deploy it under a different namespace change the name in the above command.

# Testing

- Run `npm run test` - This will run vitest tests across the project. - Currently, there is 90%+ coverage.
