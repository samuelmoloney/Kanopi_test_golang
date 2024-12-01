#!/bin/bash
echo "Building the Go backend..."
cd backend || exit 1
go build -o bin/backend-api.exe
echo "Backend built successfully as 'backend-api'"