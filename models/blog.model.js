import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true,
    },
    content: {
        type: String,
        //required: true,
    },
});
//export const Blog = mongoose.model("Blog", BlogSchema)
export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)