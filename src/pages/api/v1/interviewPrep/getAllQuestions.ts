import dbConnect from '@/database/dbConnect';
import JSQuestion from '@/database/models/interviewPrep/JSQuestion';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to the database
    await dbConnect();
    console.log("Connected to MongoDB for fetching questions");

    // Only allow GET requests
    if (req.method === 'GET') {
      const { type } = req.query;  // Read 'type' from query parameters (e.g., JS, React, Node)

      if (!type) {
        return res.status(400).json({ success: false, message: 'Type query parameter is required' });
      }

      // Fetch questions based on the 'type' query parameter
      const questions = await JSQuestion.find({ type: type });

      res.status(200).json({ success: true, data: questions });
    } else {
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
