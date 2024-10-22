import React, { useEffect, useState } from 'react';
import { SEO, LoadingSpinner, Text, FlexContainer, Button } from '@/components';
import { PageProps } from '@/interfaces';
import axios from 'axios';
import { routes } from '@/constant';

// Define TypeScript interfaces
interface Question {
  _id: string;
  name: string;
  answer: string;
  type: string;
}

interface NewQuestion {
  name: string;
  answer: string;
  type: string;
}

const JavaScriptQuestions = ({ seoMeta }: PageProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);

  // States for creating or updating a question
  const [newQuestion, setNewQuestion] = useState<NewQuestion>({
    name: '',
    answer: '',
    type: 'JS',
  });

  // Track which question is being edited
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch questions when component loads
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${routes.interviewPrepGetAll}?type=JS`);
      setQuestions(response.data.data);
      setError(null);
    } catch (error) {
      setError('Error fetching questions. Please try again.');
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new question
  const handleCreateQuestion = async () => {
    if (!newQuestion.name || !newQuestion.answer) {
      setError('Please fill in both question and answer fields.');
      return;
    }

    setOperationLoading(true);
    try {
      await axios.post(routes.interviewPrepAddQuestion, newQuestion);
      await fetchQuestions();
      setNewQuestion({ name: '', answer: '', type: 'JS' });
      setError(null);
    } catch (error) {
      setError('Error creating question. Please try again.');
      console.error('Error creating question:', error);
    } finally {
      setOperationLoading(false);
    }
  };

  // Edit an existing question
  const handleEditQuestion = (question: Question) => {
    setNewQuestion({
      name: question.name,
      answer: question.answer,
      type: question.type,
    });
    setEditingId(question._id);
    setError(null);
  };

  // Update the question
  const handleUpdateQuestion = async () => {
    if (!newQuestion.name || !newQuestion.answer) {
      setError('Please fill in both question and answer fields.');
      return;
    }

    setOperationLoading(true);
    try {
      await axios.put(
        `${routes.interviewPrepEditQuestion}?id=${editingId}`,
        newQuestion
      );
      await fetchQuestions();
      setEditingId(null);
      setNewQuestion({ name: '', answer: '', type: 'JS' });
      setError(null);
    } catch (error) {
      setError('Error updating question. Please try again.');
      console.error('Error updating question:', error);
    } finally {
      setOperationLoading(false);
    }
  };

  // Delete a question with confirmation
  const handleDeleteQuestion = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    setOperationLoading(true);
    try {
      await axios.delete(`${routes.interviewPrepDeleteQuestion}?id=${id}`);
      await fetchQuestions();
      setError(null);
    } catch (error) {
      setError('Error deleting question. Please try again.');
      console.error('Error deleting question:', error);
    } finally {
      setOperationLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingId(null);
    setNewQuestion({ name: '', answer: '', type: 'JS' });
    setError(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <SEO seoMeta={seoMeta} />
      <FlexContainer direction="col" className="gap-8 p-8">
        <Text level="h2" className="heading-4 mb-4">
          JavaScript Interview Questions
        </Text>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {/* Create / Edit Question Form */}
        <div className="create-question-form flex flex-col md:flex-row gap-4 items-start mb-8 p-6 border border-gray-300 rounded-md shadow-md bg-white">
          <div className="flex flex-col w-full md:w-1/3 gap-2">
            <label htmlFor="name" className="text-base font-medium text-gray-800">
              Question:
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={newQuestion.name}
              onChange={handleInputChange}
              placeholder="Enter your question"
              className="p-3 border border-gray-300 rounded-md w-full h-12 focus:ring-2 focus:ring-primary/60 focus:outline-none transition duration-150 ease-in-out"
              disabled={operationLoading}
            />
          </div>

          <div className="flex flex-col w-full md:w-1/3 gap-2">
            <label htmlFor="answer" className="text-base font-medium text-gray-800">
              Answer:
            </label>
            <textarea
              id="answer"
              name="answer"
              value={newQuestion.answer}
              onChange={handleInputChange}
              placeholder="Enter the answer"
              className="p-3 border border-gray-300 rounded-md w-full h-12 focus:ring-2 focus:ring-primary/60 focus:outline-none transition duration-150 ease-in-out resize-none"
              disabled={operationLoading}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto mt-4 md:mt-6">
            <Button
              onClick={editingId ? handleUpdateQuestion : handleCreateQuestion}
              className="p-2 bg-primary text-white rounded-md "
              disabled={operationLoading}
              text={
                operationLoading
                  ? 'Processing...'
                  : editingId
                  ? 'Update Question'
                  : 'Create Question'
              }
            />
            {editingId && (
              <Button
                onClick={handleCancelEdit}
                className="p-2 bg-gray-500 text-white rounded-md"
                disabled={operationLoading}
                text="Cancel"
              />
            )}
          </div>
        </div>

        {/* Display Questions */}
        {questions.length > 0 ? (
          <div className="flex flex-col gap-4">
            {questions.map((question) => (
              <div
                key={question._id}
                className="question-card p-4 border border-gray-300 rounded-md flex flex-col gap-2 hover:shadow-md transition-shadow"
              >
                <Text level="h4" className="heading-4 font-bold">
                  {question.name}
                </Text>
                <Text level="p" className="paragraph mt-1 text-greyDark">
                  {question.answer}
                </Text>
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => handleEditQuestion(question)}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    disabled={operationLoading}
                    text="Edit Question"
                  />
                  <Button
                    onClick={() => handleDeleteQuestion(question._id)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    disabled={operationLoading}
                    text=" Delete Question"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Text level="h4" className="heading-4">
            No questions found.
          </Text>
        )}
      </FlexContainer>
    </div>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      seoMeta: {
        title: 'JavaScript Interview Questions',
        description: 'A collection of JavaScript interview questions to help you prepare.',
        url: routes.interviewPrepJS,
        robots: 'follow, index',
      },
    },
  };
};

export default JavaScriptQuestions;
