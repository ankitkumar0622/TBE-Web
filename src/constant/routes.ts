import { GenerateSectionPathProps } from '@/interfaces';

const routes = {
  home: '/',
  roadmaps: '/roadmaps',
  projects: '/projects',
  register: '/register',
  projectsExplore: '/projects/explore',
  allProjects: {
    pharmashiftI: '/projects/pharmasift-i',
    pharmashiftII: '/projects/pharmasift-ii',
  },
  shiksha: '/shiksha',
  shikshaExplore: '/shiksha/explore',
  allCourses: {
    logicBuildingForEveryone: '/shiksha/logic-building-for-everyone',
    basicsOfProgrammingWithJS: '/shiksha/basics-of-programming-with-js',
  },
  workshops: '/workshops',
  os: '/os',
  contactUs: '/contact',
  interviewPrep: '/interviewPrep', // Added Interview Prep landing page route
  interviewPrepExplore: '/interviewPrep/explore', // Added Interview Prep explore page route
  interviewPrepAddQuestion: '/api/v1/interviewPrep/addQuestion', // Added route for adding a question
  interviewPrepGetAll: '/api/v1/interviewPrep/getAllQuestions', // Added route for viewing all questions
  interviewPrepEditQuestion: '/api/v1/interviewPrep/editQuestion', // Added route for editing a question
  interviewPrepDeleteQuestion: '/api/v1/interviewPrep/deleteQuestion', // Added route for deleting a question
  interviewPrepJS: '/interviewPrep/js', // JavaScript Questions
  interviewPrepReact: '/interviewPrep/react', // React Questions
  interviewPrepNode: '/interviewPrep/node', // Node.js Questions
  internals: {
    landing: {
      products: 'products',
    },
  },
  404: '/404',
  api: {
    base: '/api/v1',
    interviewPrep: '/api/v1/interviewPrep', // Endpoint for interview questions
    projects: '/projects',
    project: (project: string) => `/projects/${project}`,
    shiksha: '/shiksha',
    enrollCourse: '/user/shiksha/enroll',
    markCourseChapterAsCompleted: '/user/shiksha/course',
    courseById: (course: string) => `/shiksha/${course}`,
    courseByIdWithUser: (course: string, userId?: string) => {
      let url = `/shiksha/${course}`;
      if (userId) {
        url += `?userId=${userId}`;
      }
      return url;
    },
  },
};

const generateSectionPath = ({
  basePath,
  sectionID,
}: GenerateSectionPathProps) => {
  return basePath + '#' + sectionID;
};

export { routes, generateSectionPath };
