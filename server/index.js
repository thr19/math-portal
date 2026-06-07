import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { hashPassword, verifyPassword, createToken, verifyToken } from './auth.js'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

function getTokenFromHeader(req) {
  const authorization = req.headers.authorization || ''
  const match = authorization.match(/Bearer\s+(.+)/i)
  return match ? match[1] : null
}

async function authMiddleware(req, res, next) {
  const token = getTokenFromHeader(req)
  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }

  try {
    const payload = verifyToken(token)
    const user = await prisma.user.findUnique({
      where: { id: Number(payload.sub) },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid token user' })
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    }
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Math Portal API running' })
})

app.post('/api/auth/signup', async (req, res) => {
  const { email, name, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return res.status(409).json({ error: 'Email already in use' })
  }

  const hashedPassword = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: 'USER',
    },
  })

  const token = createToken(user)
  res.status(201).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const passwordMatches = await verifyPassword(password, user.password)
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = createToken(user)
  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    token,
  })
})

app.get('/api/auth/me', authMiddleware, async (req, res) => {
  res.json({ user: req.user })
})

app.get('/api/auth/roles', (req, res) => {
  res.json({ roles: ['USER', 'AUTHOR', 'MODERATOR', 'ADMIN'] })
})

app.put('/api/users/:id/role', authMiddleware, async (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' })
  }

  const userId = Number(req.params.id)
  const { role } = req.body
  if (!['USER', 'AUTHOR', 'MODERATOR', 'ADMIN'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' })
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })
  res.json(user)
})

app.get('/api/users', authMiddleware, async (req, res) => {
  if (req.user.role !== 'ADMIN' && req.user.role !== 'MODERATOR') {
    return res.status(403).json({ error: 'Admin or moderator access required' })
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })

  res.json(users)
})

function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

app.get('/api/blog/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })
  res.json(posts)
})

app.post('/api/blog/posts', authMiddleware, async (req, res) => {
  if (!['AUTHOR', 'MODERATOR', 'ADMIN'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Author access required' })
  }

  const { title, content, published = true } = req.body
  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ error: 'Title and content are required' })
  }

  let slug = slugify(title)
  if (!slug) {
    slug = `post-${Date.now()}`
  }

  const existing = await prisma.post.findUnique({ where: { slug } })
  if (existing) {
    slug = `${slug}-${Date.now()}`
  }

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      content,
      published,
      authorId: req.user.id,
    },
  })

  res.status(201).json(post)
})

app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

const port = process.env.PORT || 4000
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  console.error('Missing DATABASE_URL. Copy .env.example to .env and set the database connection string.')
  process.exit(1)
}

prisma.$connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`API server running on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message)
    process.exit(1)
  })
