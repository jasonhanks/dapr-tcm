FROM mcr.microsoft.com/playwright:focal


RUN mkdir /app
WORKDIR /app


RUN apt update && apt -y install curl
RUN curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt -y install nodejs

# Install the pm2 wrapper and the HTTP server for React frontend
RUN npm install -g pm2 serve

RUN mkdir /app/backend && mkdir /app/frontend


# Install the packages for the backend
COPY backend/package*json /app/backend/
RUN cd /app/backend && npm install


# Install the packages for the frontend
COPY frontend/package*json /app/frontend/
RUN cd /app/frontend && npm install 

RUN npx playwright install && npx playwright install-deps 


# Copy the project source into the container
COPY . .


# Compile all project TypsScript code into JavaScript ready to serve
RUN cd backend && npm run build
RUN cd frontend && npm run build


# Expose ports
EXPOSE 3000
EXPOSE 3001


# Environment variable default values
ENV DATABASE_URL = mongodb://mongodb:27017/


# Start PM2 as PID 1 process
ENTRYPOINT ["pm2", "--no-daemon", "start"]


# Actual script to start can be overridden from `docker run`
CMD ["ecosystem.config.js"]
