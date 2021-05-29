import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export default async (req, res) => {
    const connection = await mongoose.createConnection(
        'mongodb+srv://kiuie:atlassian@blogproject.kctal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
            useUnifiedTopology: true,
        }
    );

    try {
        const User = connection.model("User", UserSchema);

        const {
            query: { name },
            method,
        } = req;

        switch (method) {
        case "GET":
            res.status(200).json({ msg:"success" });
            break;
        case "POST":
                User.create({ name }, (error, user) => {
                    if (error) {
                        connection.close();
                        res.status(500).json({ error });
                    } else {
                        res.status(200).json(user);
                        connection.close();
                    }
                });
                break;
            default:
                res.setHeader("Allow", ["POST"]);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        connection.close();
        res.status(500).json({ error: e.message || "something went wrong" });
    }
};