## Build the application from the TS files
FROM node:18.1.0-bullseye-slim as builder

# Setup build directory
RUN mkdir /app
WORKDIR /app

# Install the packages for the backend
COPY package*json /app
RUN npm install 

# Copy the project source into the container
COPY . .

# Compile all project TypsScript code into JavaScript ready to serve
RUN npm run build


## Setup the final image that deploys the compiled TS files using a Node.JS
## Express server
FROM node:18.1.0-bullseye-slim 

# Setup the application directory
RUN mkdir /app
WORKDIR /app

# Copy the compiled output files built from TS
COPY --from=builder /app/*json /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist

# Expose the API server port
EXPOSE 3001

# Environment variable default values
ENV NODE_ENV=production
ENV DATABASE_URL "mongodb://localhost:27017/"

# Start the service(s)
CMD [ "npm", "run", "serve" ]
