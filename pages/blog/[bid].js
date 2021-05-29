//get request to api, request blogs given ID
//pass response from api into blog function
//display the response in the blog component
import Link from 'next/link'
import { useRouter } from "next/router"
export default function Blog({blog}) {
    const router = useRouter()
    if (router.isFallback) {
        return <div>Loading...</div>
      }

    return (
        <div> 
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <Link href={`/`}>
                <a>Back</a>
            </Link>

         </div>
    )
}

//make an api call to /api/blogs to get blogs, convert it to JSON
//map/loop through these blogs and select_id and assign it to params object
// { params: { bid: '1' } }
export async function getStaticPaths() {
    const request = await fetch("http://localhost:3000/api/blog")
    const blogs = await request.json()
    const paths = blogs.map(blog => ({params: {bid: blog._id}}))
    return {
      // Only `/posts/1` and `/posts/2` are generated at build time
      paths: paths,
      // Enable statically generating additional pages
      // For example: `/posts/3`
      fallback: true,
    }
  }

  export async function getStaticProps({ params }) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch(`http://localhost:3000/api/blog/${params.bid}`)
    const blog = await res.json()
    return {
        props: {blog}
    }
  }  