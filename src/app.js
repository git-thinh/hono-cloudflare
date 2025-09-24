//import crypto from "crypto"
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono();
app.use('*', cors());
app.get('/', async (c) => await c.text('OK'));

export default app;