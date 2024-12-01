#!/bin/bash
echo "Running the Go backend..."
cd backend || exit 1
go run main.go