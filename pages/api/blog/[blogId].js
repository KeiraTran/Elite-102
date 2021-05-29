//call the api using a get request. fetch the blog by id. 
//look inside the request query, search for blog id object (store)
//use blog model and call a find method on it. pass in an id field
// return what database finds
import Blog from "../../../models/blog.model"
import connectToDatabase from "../../../util/mongodb"

export default async (req, res) => {
    await connectToDatabase()
    if (req.method == "GET") {
        const { blogId } = req.query
        Blog.findById(blogId).then(blog => res.json(blog))
    
    }
        }

