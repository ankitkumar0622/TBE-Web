import mongoose from 'mongoose';

// Define the schema for JavaScript interview questions
const JSQuestionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['JS', 'React', 'Node'],
    required: true,
  },
});

// Export the model
export default mongoose.models.JSQuestion || mongoose.model('JSQuestion', JSQuestionSchema);
