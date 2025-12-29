import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for Supabase configuration
  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const { email } = req.body;

    // Validate email format
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Insert into Supabase
    const { error } = await supabase
      .from('subscribers')
      .insert({
        email: trimmedEmail,
        source: 'temp_landing',
        metadata: {
          referrer: req.headers.referer || null,
          user_agent: req.headers['user-agent'] || null,
          timestamp: new Date().toISOString(),
        },
      });

    if (error) {
      // Handle unique constraint violation (duplicate email)
      if (error.code === '23505') {
        return res.status(200).json({ 
          message: 'You are already on the list.',
          status: 'existing'
        });
      }

      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to subscribe' });
    }

    return res.status(200).json({ 
      message: 'You are on the list.',
      status: 'new'
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'An unexpected error occurred' });
  }
}
