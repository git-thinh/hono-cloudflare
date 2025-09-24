import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { resProxy } from './index.js'

const app = new Hono()
app.use('*',cors())

app.get('/', async (c) => await c.text('OK'));

// http://localhost:8787/api/test/data.json
app.get('/api/:scope/:name', async (c) => await resProxy(c));

export default app