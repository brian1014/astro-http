import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ request, params }) => {
  const slug = new URL(request.url).searchParams.get('slug')

  if (slug) {
    const post = await getEntry('blog', slug)
    if (post) {
      return new Response(
        JSON.stringify(post), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    return new Response(
      JSON.stringify({ msg: `Post con el slug ${slug} not found` }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return new Response(
    JSON.stringify(await getCollection('blog')), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}