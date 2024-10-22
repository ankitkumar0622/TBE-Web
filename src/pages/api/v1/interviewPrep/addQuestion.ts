import dbConnect from '@/database/dbConnect';
import JSQuestion from '@/database/models/interviewPrep/JSQuestion';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the MongoDB database
  await dbConnect();

  if (req.method === 'POST') {
    try {
      // Create a new question using the request body
      const question = new JSQuestion(req.body);
      await question.save();
      // Respond with a success message and the created question data
      res.status(201).json({ success: true, data: question });
    } catch (error) {
      // If there's an error, respond with a 400 status and error message
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    // Handle methods other than POST
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
