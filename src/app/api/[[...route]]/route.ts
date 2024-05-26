import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/message", (c) => {
  return c.json({ message: "Hello" }, 200);
});

export const GET = handle(app);
export const POST = handle(app);
