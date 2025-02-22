import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
  const { slug } = params

  const post = await getEntry('blog', slug as any)

  if (!post) {
    return new Response(
      JSON.stringify({ msg: `Post con el slug ${slug} not found` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return new Response(JSON.stringify(post), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const POST: APIRoute = async ({ request, params }) => {
  const body = await request.json()
  return new Response(JSON.stringify({ method: 'POST', ...body }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const PUT: APIRoute = async ({ request, params }) => {
  const body = await request.json()
  return new Response(JSON.stringify({ method: 'PUT', ...body }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const DELETE: APIRoute = async ({ request, params }) => {
  const body = await request.json()
  return new Response(JSON.stringify({ method: 'DELETE', ...body }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}