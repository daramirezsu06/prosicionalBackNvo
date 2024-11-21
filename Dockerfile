# Stage 1: Install dependencies and build the application
FROM node:18-alpine as builder

WORKDIR /app

# Define build-time arguments for PostgreSQL connection
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_DB
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION_NORTH
ARG AWS_REGION
ARG AWS_BUCKET
ARG ENCRYPTION_KEY
ARG ENCRYPTION_IV
ARG JWT_SECRET
ARG API_PORT

COPY package*.json ./

RUN npm install

# Install Prisma CLI globally
RUN npm install -g prisma

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Prepare runtime image
FROM node:18-alpine

WORKDIR /app

# Copy production build from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy Prisma schema and migrations from builder stage
COPY --from=builder /app/prisma ./prisma

# Use ARG to pass secrets into environment variables
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_HOST
ARG POSTGRES_PORT
ARG POSTGRES_DB
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION_NORTH
ARG AWS_REGION
ARG AWS_BUCKET
ARG ENCRYPTION_KEY
ARG ENCRYPTION_IV
ARG JWT_SECRET
ARG API_PORT

# Set environment variables for PostgreSQL connection
ENV DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"

ENV NODE_ENV=production
ENV AWS_ACCESS_KEY_ID=AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=AWS_SECRET_ACCESS_KEY
ENV AWS_REGION_NORTH=AWS_REGION_NORTH
ENV AWS_REGION=AWS_REGION
ENV AWS_BUCKET=AWS_BUCKET
ENV ENCRYPTION_KEY=ENCRYPTION_KEY
ENV ENCRYPTION_IV=ENCRYPTION_IV
ENV JWT_SECRET=JWT_SECRET
ENV API_PORT=API_PORT


# Ensure Prisma Client is generated (in case migrations need it)
RUN npx prisma generate

# Run Prisma migrations and seed the database
RUN npx prisma migrate deploy
RUN node dist/prisma/seed.js

EXPOSE 8000

CMD [ "node","dist/main.js" ]
