import dbConnect from '@/database/dbConnect';
import JSQuestion from '@/database/models/interviewPrep/JSQuestion';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to the MongoDB database
    await dbConnect();
    console.log("Connected to MongoDB for deleting questions");

    // Only allow DELETE requests for deleting a question
    if (req.method === 'DELETE') {
      const { id } = req.query; // Get the question ID from the query parameter

      // Validate if an ID is provided
      if (!id) {
        return res.status(400).json({ success: false, message: 'Question ID is required' });
      }

      // Delete the question from the database
      const deletedQuestion = await JSQuestion.findByIdAndDelete(id);

      // If the question with the given ID does not exist
      if (!deletedQuestion) {
        return res.status(404).json({ success: false, message: 'Question not found' });
      }

      // Return success message
      res.status(200).json({ success: true, message: 'Question deleted successfully' });
    } else {
      // Handle methods other than DELETE
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
