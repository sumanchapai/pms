# Use a lightweight Node image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install json-server globally
RUN npm install -g json-server

# Expose default port
EXPOSE 3000

# Start json-server
CMD ["json-server", "--watch", "/app/db.json", "--host", "0.0.0.0"]
