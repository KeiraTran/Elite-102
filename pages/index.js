import Link from 'next/link'
import Head from 'next/head'
import connectToDatabase from '../util/mongodb'
export default function Home(props) {
  // if (isConnected) {
  //   return <h1> Is connected. </h1>
  // }
  return (
    <div className ="container">
     
      <main>

      <div className = "header"> 
      <h2>Homepage: {"display"}</h2>
      </div>

      <small className="subtitle" >My First Blog</small>

      <p>
      <ul>
        {props.blogs.map(blog => (
            <div key={blog.id}>
              <div className ="row">
                <div className ="card">
                <Link href={`/blog/${(blog._id)}`}>
                  <h2>TITLE HEADING: {blog.title}</h2>
                </Link>
                <p>{blog.content}</p>
                </div>
              </div>
            </div>
        ))}
        
      </ul>
          </p>
        </main>


        <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .header {
          padding: 20px;
          font-size: 40px;
          text-align: center;
          background: #D0F7EF;
        }
        .subtitle {
          font-size: 20px;
          justify-content: center;
          text-align: center;
        }
        .title a {
          color: #0070f3;
          text-decoration: none;
        }
        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .title,
        .description {
          text-align: center;
        }
        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }
        .card:hover,
        .card:focus,
        .card:active {
          color: #48D1B5;
          border-color: #48D1B5;
        }
        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

    </div>
  );
}
export async function getServerSideProps(context) {
  await connectToDatabase()
  const request = await fetch("http://localhost:3000/api/blog")
  const blogs = await request.json()
  console.log(blogs)
  return {
    props: {blogs},
  };
}
  

/*export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()
  return {
    props: { isConnected },
  }
}*/
