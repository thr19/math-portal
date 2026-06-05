import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
  res.json({ status: 'ok', message: 'Math Portal API running' })
})

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.post('/api/users', async (req, res) => {
  const { email, name, password, role } = req.body
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
      role,
    },
  })
  res.status(201).json(user)
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`)
})
