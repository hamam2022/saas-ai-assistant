# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies
RUN npm install
RUN cd apps/backend && npm install

# Copy application code
COPY . .

# Create necessary directories
RUN mkdir -p storage/audio_output
RUN mkdir -p storage/downloads
RUN mkdir -p whatsapp-session

# Set permissions
RUN chmod -R 755 storage/
RUN chmod -R 755 whatsapp-session/

# Expose port
EXPOSE 3001

# Set environment
ENV NODE_ENV=production
ENV PORT=3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/ || exit 1

# Start the application
CMD ["node", "apps/backend/simple-server.js"]
