// This configuration forces Vercel to use the Node.js runtime,
// which is required for the native 'bcrypt' package to work.
export const config = {
  runtime: 'nodejs',
};

import { Redis } from '@upstash/redis';
import bcrypt from 'bcrypt';

// Note: BCRYPT_SALT_ROUNDS is optional; it defaults to 10 if not set in Vercel.
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

// ⚠️ DEBUG CHECK: These lines will print the actual values Vercel is using to the logs.
console.log(`Debug Check: REDIS_URL=${REDIS_URL}`);
console.log(`Debug Check: REDIS_TOKEN_EXISTS=${!!REDIS_TOKEN}`);
// ⚠️ END DEBUG CHECK ⚠️

if (!REDIS_URL || !REDIS_TOKEN) {
  // We'll throw a specific error so we can easily spot the failure in Vercel logs
  throw new Error('CRITICAL: Redis config not found in process.env at runtime.');
}

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

export default async function handler(req, res) {
  // 1. Method Check
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    // Basic Request Body Logging for debugging Vercel logs
    console.log("📌 Incoming Request Body:", req.body);

    const { name, email, password } = req.body;

    // 2. Input Validation
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const key = `user:${email.toLowerCase()}`;

    // 3. Check for existing user
    console.log(`📌 Checking for existing user: ${key}`);
    const existing = await redis.get(key);
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    // 4. Hash password
    console.log("📌 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // 5. Save user
    console.log("📌 Saving user to Redis...");
    await redis.set(key, JSON.stringify({ name, email, password: hashedPassword, createdAt: Date.now() }));

    // 6. Success Response
    return res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    // 7. General Error Handling
    console.error('🔥 SERVER ERROR:', err);
    // Return a generic 500 message in production to avoid leaking internal error details
    return res.status(500).json({ message: 'Internal server error.' });
  }
}