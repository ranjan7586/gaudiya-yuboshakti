import mongoose, { Schema } from 'mongoose';

const forumSchema: Schema = new Schema({
  title: String,
  description: String,
  image: String,
  // Add other fields as needed
});

const ForumModel = mongoose.model('Forum', forumSchema);

export default ForumModel;