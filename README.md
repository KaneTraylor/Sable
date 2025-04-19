# Dispute App MVP

Credit Dispute SaaS — README

Project Goal

Provide users with a simple, guided interface to dispute negative items on their credit reports. Through automation, a clean UI, and helpful onboarding, this app aims to make credit repair more transparent, accessible, and effective.

Current Features

Multi-Step Signup Flow

4-step signup modeled after CreditVersio:

Step 1: Account creation (email, password, name)

Step 2: Contact and address info with consent checkbox

Step 3: SmartCredit plan selection

Step 4: Congrats screen with animation and auto-login

Auto-progress and localStorage support for saved progress

Dummy data button for dev testing (auto fills all fields + progresses)

Authentication

Credentials-based login via NextAuth

Auto-login immediately after account creation

JWT-based middleware protecting /dashboard, /account, /profile

Welcome Email

Welcome email sent on account creation via Nodemailer

Secure SMTP auth using environment variables

Backend (Prisma + PostgreSQL)

Schema supports user records with credit, personal, and plan info

Partial signup saves email/password and returns userId

Final signup uses PATCH to attach full details

In Progress

Dashboard UI components (credit report visualization, tasks)

SmartCredit integration for pulling reports

Dispute letter generation tools

CRM-style user view for admin panel

Stripe integration for paid plans

Developer Notes

Use the Fill with Dummy Data button on Step 1 to simulate flow

Local dev only: dummy login flag triggers dashboard success screen

SignupForm.tsx owns the state, don’t modify Step components directly for logic

Tech Stack

Next.js 14

TypeScript + Chakra UI

Prisma ORM + PostgreSQL

NextAuth.js (JWT strategy)

Nodemailer (email)

Getting Started

Clone the repo

Run npm install

I honestly pushed .env to the repo on accident so i dont need to post creds here

Run npx prisma migrate dev

Run npm run dev
