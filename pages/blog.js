import Head from 'next/head'
import connectToDatabase from '../util/mongodb'
export default function Blog({placeholder, blogs}) {
  return (
    <div>
      <h1> Blog: {placeholder} </h1>
      <pre> {JSON.stringify(blogs, null, 4)} </pre>
      {
        blogs.map(blog => (
          <div>
          <p> {blog._id} </p>
          <p> {blog.title} </p>
          <p> {blog.content} </p>
          </div>
        ))
      }
    </div>
  )
}
export async function getServerSideProps(context) {
  await connectToDatabase()
  const request = await fetch("http://localhost:3000/api/blog")
  const blogs = await request.json()
 // console.log(blogs)
  return {
    props: { placeholder: 'placeholderValue', blogs},
  }
}