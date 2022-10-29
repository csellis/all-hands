# All Hands Event

Do you want to host an All Hands event on your own site? This is a starter site in SvelteKit and Supabase letting your do just that.

## Part of HacktoberFest 2022

We aim to help smaller organizations host branded Virtual Events (some batteries included).

## Stack

1. SvelteKit
2. TailwindCSS
3. SupaBase
4. Netlify

## Features

1. Rooms
   - For organizing your event into different videos
   - Can be controlled centrally to update all connected Clients
2. Authentication
   - Provided magic link via Supabase
   - You will need to set your SMTP server to send out multiple emails on the event day
3. Messaging (in progress)
   - Room-based Messaging to stay in context

## Setup

1. Create a Supabase Instance
2. Rename `.env-example` to `.env` and fill in your details
3. `npm install` & `npm run dev`
4. Follow steps in `SUPABASE.MD`

## Before Release

1. Add the SMTP settings to full control email delivery. Otherwise you will hit limits on emails sent out. (image in static/smtp.png)
   1. Navigate to **Authentication > Email Templates**
   2. Toggle **Enable Custom SMTP**
   3. Fill in all the fields
2. Check your RLS
