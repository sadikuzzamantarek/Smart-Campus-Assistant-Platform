import mongoose from "mongoose";
const NoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    tags:[
        {
            type: String,
        }
    ],
    modified: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    origin:{
        type: String,
        required: true
    }
});
export default mongoose.model("Notice", NoticeSchema);
