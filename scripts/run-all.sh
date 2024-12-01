#!/bin/bash
echo "Starting both backend and frontend servers..."

# Start the Go backend in the background
bash scripts/run-backend.sh &
BACKEND_PID=$!

# Start the frontend Vite server
bash scripts/run-frontend.sh &
FRONTEND_PID=$!

# Wait for both processes to complete
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait