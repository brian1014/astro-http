import prisma from "@db";
import type { APIRoute } from "astro";

export const prerender = false;

const findClientById = async (clientId: string) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    })

    return client
  } catch (error) {
    return null
  }
}

export const GET: APIRoute = async ({ request, params }) => {
  const { clientId = '' } = params

  try {
    const clientDb = await findClientById(clientId)

    if (!clientDb)
      return new Response(JSON.stringify({ error: `Client with id '${clientId}' not exists` }), { status: 404, headers: { 'Content-type': 'application/json' } })

    return new Response(JSON.stringify({ data: clientDb }), { headers: { 'Content-type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ error: `bad request` }), { status: 400, headers: { 'Content-type': 'application/json' } })
  }
}

export const PATCH: APIRoute = async ({ request, params }) => {
  const clientId = params.clientId ?? ''

  const client = await findClientById(clientId)
  if (!client)
    return new Response(`Client with id ${clientId} not found`, { status: 404, headers: { 'Content-type': 'application/json' } })


  try {
    const { id, ...body } = await request.json()

    const updatedClient = await prisma.client.update({
      where: { id: clientId },
      data: body
    })

    return new Response(JSON.stringify(updatedClient), { status: 200, headers: { 'Content-type': 'application/json' } })
  } catch (error) {
    return new Response('Bad request', { status: 400, headers: { 'Content-type': 'application/json' } })
  }
}

export const DELETE: APIRoute = async ({ request, params }) => {
  const clientId = params.clientId ?? ''

  const client = await findClientById(clientId)
  if (!client)
    return new Response(`Client with id ${clientId} not found`, { status: 404, headers: { 'Content-type': 'application/json' } })

  const deletedClient = await prisma.client.delete({
    where: { id: client.id }
  })

  return new Response(JSON.stringify({ msg: `deleted`, client: deletedClient }), { status: 200, headers: { 'Content-type': 'application/json' } })
}