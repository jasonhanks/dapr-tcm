## Build the application from TypeScript files
FROM node:18.1.0-bullseye-slim as builder

# Setup the build directory
RUN mkdir -p /app
WORKDIR /app

# Specify the environment we are running in
ENV NODE_ENV=production

# Install the packages for the frontend
COPY package*json /app/
RUN npm install 

# Copy the project source into the container
COPY . .

# Compile the source files into static files ready to serve
RUN npm run build


## Setup the final image using NGINX to serve static files and proxy 
## the API calls to the defined frontend server available at ${API_URL}
FROM nginx:alpine

# Copy the compiled output files built from TS
COPY --from=builder /app/build /usr/share/nginx/html/

# Copy the configuration files for NGINX
COPY nginx.template /etc/nginx/conf.d/default.conf.template

# Copy the custom startup script we are using
COPY docker-entrypoint.sh /
RUN chmod 755 /docker-entrypoint.sh

# Startup the NGINX process
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
