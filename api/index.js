export default async function handler(req, res) {
  // Enable CORS (so your Wix site can call this API)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end(); // Handle preflight
  }

  // Health check endpoint (GET request)
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'GP Mental Health Care Plan API is running!',
      timestamp: new Date().toISOString()
    });
  }

  // Only allow POST for generating care plan
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { conditions } = req.body || {};
    if (!conditions || conditions.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Patient conditions (issues) are required in the request'
      });
    }

    // OpenAI API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'OpenAI API key not configured on server'
      });
    }

    // *** PROMPT for Mental Health Care Plan generation ***
    const prompt = `Act as an experienced Australian General Practitioner preparing a comprehensive GP Mental Health Treatment Plan under current MBS guidelines (items 2700, 2715, 2717, 2725, effective 2025). I will provide the patient's mental health conditions, symptoms, and relevant background.
