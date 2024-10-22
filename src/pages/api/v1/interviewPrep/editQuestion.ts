import dbConnect from '@/database/dbConnect';
import JSQuestion from '@/database/models/interviewPrep/JSQuestion';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to the MongoDB database
    await dbConnect();
    console.log("Connected to MongoDB for updating questions");

    // Only allow PUT requests for updating
    if (req.method === 'PUT') {
      const { id } = req.query; // Get the question ID from the query parameter
      const updatedData = req.body; // Get updated data from the request body

      // Validate if an ID is provided
      if (!id) {
        return res.status(400).json({ success: false, message: 'Question ID is required' });
      }

      // Update the question in the database
      const updatedQuestion = await JSQuestion.findByIdAndUpdate(id, updatedData, {
        new: true, // Return the updated document
        runValidators: true, // Run validation checks on the updated data
      });

      // If the question with the given ID does not exist
      if (!updatedQuestion) {
        return res.status(404).json({ success: false, message: 'Question not found' });
      }

      // Return the updated question
      res.status(200).json({ success: true, data: updatedQuestion });
    } else {
      // Handle methods other than PUT
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
