# GP Mental Health Care Plan Generator

This project provides a backend API and frontend webpage to generate
Australian GP Mental Health Treatment Plans (MBS items 2700, 2715, 2717, 2725).

## Features
- Uses OpenAI API to generate structured care plans
- Deployable on Vercel as a serverless function
- Secure API key handling with environment variables
- HTML frontend for Wix integration with Word/PDF export options

## Deployment
1. Add `OPENAI_API_KEY` in Vercel environment variables.
2. Deploy via Vercel.
3. Connect frontend HTML to your backend URL.
