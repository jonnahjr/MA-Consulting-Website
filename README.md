# Premium Consulting Webapp (maservicessolution.com redesign)

This repository contains a full-stack consulting website inspired by maservicessolution.com, rebuilt as a modern, premium, and scalable application.

Structure:

- frontend/ - Vite + React 19 + TypeScript + Tailwind + ShadCN UI
- backend/ - Node.js + Express + TypeScript API
- docker-compose.yml - Development docker setup
- README.md - This file

Follow the README sections in `frontend/` and `backend/` for running locally.

Database: this scaffold uses PostgreSQL via Docker Compose and Prisma. See `backend/prisma/schema.prisma` for the schema.

To push this project to your GitHub repository (`https://github.com/jonnahjr`), run locally:

git init
git add .
git commit -m "Initial scaffold: full-stack consulting site"
git branch -M main
git remote add origin https://github.com/jonnahjr/<repo>.git
git push -u origin main

