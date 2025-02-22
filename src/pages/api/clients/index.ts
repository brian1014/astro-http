import type { APIRoute } from "astro";
import prisma from "@db";

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
  const clients = await prisma.client.findMany()
  return new Response(JSON.stringify(clients), { headers: { 'Content-type': 'application/json' } })
}

export const POST: APIRoute = async ({ request, params }) => {
  try {
    const { id, ...body } = await request.json()

    const client = await prisma.client.create({
      data: { id: crypto.randomUUID(), ...body }
    })

    return new Response(JSON.stringify(client), { status: 201, headers: { 'Content-type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ msg: "bad request" }), { status: 400, headers: { 'Content-type': 'application/json' } })
  }
}