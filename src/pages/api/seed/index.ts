import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import prisma from "@db";

const clients = [
  { id: crypto.randomUUID(), name: 'John Doe', age: 29, is_active: true },
  { id: crypto.randomUUID(), name: 'Jane Smith', age: 34, is_active: false },
  { id: crypto.randomUUID(), name: 'Michael Johnson', age: 45, is_active: true },
  { id: crypto.randomUUID(), name: 'Emily Davis', age: 22, is_active: false },
  { id: crypto.randomUUID(), name: 'William Brown', age: 31, is_active: true },
  { id: crypto.randomUUID(), name: 'Sophia Wilson', age: 27, is_active: false },
  { id: crypto.randomUUID(), name: 'James Garcia', age: 38, is_active: true },
  { id: crypto.randomUUID(), name: 'Olivia Miller', age: 41, is_active: false },
  { id: crypto.randomUUID(), name: 'Daniel Martinez', age: 36, is_active: true },
  { id: crypto.randomUUID(), name: 'Ava Anderson', age: 25, is_active: false },
];

export const GET: APIRoute = async ({ request, params }) => {
  // Borrar los usuarios
  await prisma.client.deleteMany()

  // Limpiar los post
  await prisma.post.deleteMany()

  //Insertar los usuarios
  await prisma.client.createMany({
    data: clients
  })

  // Insertar los posts
  const blogs = await getCollection('blog')

  const dataBlogs = blogs.map(b => ({
    id: b.id,
    title: b.data.title,
    likes: Math.round(Math.random() * 100)
  }))

  await prisma.post.createMany({
    data: dataBlogs
  })

  return new Response('Seed executed!!!')
}