import { Redis } from '@upstash/redis';
import bcrypt from 'bcrypt';

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

if (!REDIS_URL || !REDIS_TOKEN) {
  throw new Error('Upstash Redis REST URL or Token not set.');
}

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const key = `user:${email.toLowerCase()}`;

    // check existing
    const existing = await redis.get(key);
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    // hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // save user
    await redis.set(key, JSON.stringify({ name, email, password: hashedPassword, createdAt: Date.now() }));

    return res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('🔥 SERVER ERROR:', err);
    return res.status(500).json({ message: err.message || 'Internal server error' });
  }
}
