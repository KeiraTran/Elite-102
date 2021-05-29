import { get } from "mongoose"
import Blog from "../../../models/blog.model"
import connectToDatabase from "../../../util/mongodb"

//two goals: get blogs and create/post blogs
export default async (req, res) => {
    await connectToDatabase()
    if (req.method == "GET") {
        console.log("get")
        Blog.find({}).then(blogs => res.json(blogs))
    }
    else if (req.method == "POST") {
        console.log("post")
        const new_blog = new Blog({
            title: req.body.title,
            content: req.body.content
        })
          
        new_blog.save(function(error,result){
            if (error){
                res.status(500).json({ error });
            }
            else{
                res.json({result})
            }
        })
    }
}

