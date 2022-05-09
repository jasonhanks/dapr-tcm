FROM node:18.1.0-bullseye-slim

RUN mkdir /app
WORKDIR /app


# Install the pm2 wrapper
RUN npm install -g pm2

RUN mkdir /app/backend && mkdir /app/frontend


# Install the packages for the backend
COPY backend/package*json /app/backend
RUN cd /app/backend && npm install


# Install the packages for the frontend
COPY frontend/package*json /app/frontend
RUN cd /app/frontend && npm install


# Copy the project source into the container
COPY . .


# Expose ports
EXPOSE 3000
EXPOSE 3001


# Environment variable default values
ENV DATABASE_URL = mongodb://mongodb:27017/


# Start PM2 as PID 1 process
ENTRYPOINT ["pm2", "--no-daemon", "start"]


# Actual script to start can be overridden from `docker run`
CMD ["ecosystem.config.js"]
