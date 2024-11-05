import { envConfig, getSEOMeta, routes } from '@/constant';
import {
  BaseShikshaCourseResponseProps,
  BaseSheetResponseProps,
  PageSlug,
  ProjectPickedPageProps,
} from '@/interfaces';
import {
  getSelectedCourseChapterMeta,
  getSelectedProjectChapterMeta,
  getSelectedSheetQuestionMeta,
  isUserAuthenticated,
} from '.';

const getPreFetchProps = async ({ query, resolvedUrl }: any) => {
  const { projectSlug } = query;
  let slug = '/';

  if (resolvedUrl) {
    slug = resolvedUrl;
  }

  if (projectSlug) {
    slug = `/projects/${projectSlug}`;
  }

  const seoMeta = getSEOMeta(slug as PageSlug);

  const redirect = !seoMeta && {
    destination: '/404',
  };

  return {
    props: { slug, seoMeta },
    redirect,
  };
};

const getProjectPageProps = async ({ query }: any) => {
  const { projectSlug, projectId, sectionId, chapterId } = query;

  let slug = '/';

  if (projectSlug) {
    slug = '/projects/' + projectSlug;
  }

  if (projectId) {
    try {
      const seoMeta = getSEOMeta(slug as PageSlug);

      const { status, data } = await fetchAPIData(`projects/${projectId}`);

      // If the project data is not found, return the message
      if (!status) {
        return {
          redirect: {
            destination: '/404',
          },
          props: { slug },
        };
      }

      const project: ProjectPickedPageProps = data;
      let { meta } = project;

      if (sectionId && chapterId) {
        const selectedChapterMeta = getSelectedProjectChapterMeta(
          project,
          sectionId,
          chapterId
        );

        if (selectedChapterMeta) meta = selectedChapterMeta;
      }

      return {
        props: {
          slug,
          seoMeta,
          project,
          meta,
        },
      };
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  }

  return {
    redirect: {
      destination: '/404',
    },
    props: { slug },
  };
};

const getCoursePageProps = async (context: any) => {
  const { req, query } = context;
  const { courseSlug, courseId, chapterId } = query;

  let slug = '/';

  if (courseSlug) {
    slug = '/shiksha/' + courseSlug;
  }

  const seoMeta = getSEOMeta(slug as PageSlug);

  if (courseId && seoMeta) {
    try {
      const user = await isUserAuthenticated(req);

      const { status, data } = await fetchAPIData(
        routes.api.courseByIdWithUser(courseId, user?.id)
      );

      // If the project data is not found, return the message
      if (!status) {
        return {
          redirect: {
            destination: '/404',
          },
          props: { slug },
        };
      }

      const course: BaseShikshaCourseResponseProps = data;
      let { meta } = course;
      let currentChapterId = '';

      if (chapterId) {
        currentChapterId = chapterId;

        const selectedChapterMeta = getSelectedCourseChapterMeta(
          course,
          chapterId
        );

        if (selectedChapterMeta) meta = selectedChapterMeta;
      }

      return {
        props: {
          slug,
          seoMeta,
          course,
          meta,
          currentChapterId,
        },
      };
    } catch (error) {
      console.error('Error fetching course data:', error);
    }
  }

  return {
    redirect: {
      destination: '/404',
    },
    props: { slug },
  };
};

// const getSheetPageProps = async (context: any) => {
//   const { req, query } = context;
//   const { sheetSlug, sheetId, questionId } = query;

//   let slug = '/';

//   if (sheetSlug) {
//     slug = '/interview-prep/' + sheetSlug;
//   }

//   const seoMeta = getSEOMeta(slug as PageSlug);

//   if (sheetId && seoMeta) {
//     try {
//       const user = await isUserAuthenticated(req);

//       const { status, data } = await fetchAPIData(
//         routes.api.sheetByIdWithUser(sheetId, user?.id)
//       );
      
//       if (!status) {
//         return {
//           redirect: {
//             destination: '/404',
//           },
//           props: { slug },
//         };
//       }

//       const sheet: BaseSheetResponseProps = data;
//       let { meta } = sheet;
//       let currentQuestionId = '';

//       if (questionId) {
//         currentQuestionId = questionId;

//         const selectedQuestionMeta = getSelectedSheetQuestionMeta(sheet, questionId);

//         if (selectedQuestionMeta) meta = selectedQuestionMeta;
//       }

//       return {
//         props: {
//           slug,
//           seoMeta,
//           sheet,
//           meta,
//           currentQuestionId,
//         },
//       };
//     } catch (error) {
//       console.error('Error fetching sheet data:', error);
//     }
//   }

//   return {
//     redirect: {
//       destination: '/404',
//     },
//     props: { slug },
//   };
// };

const fetchAPIData = async (url: string) => {
  const response = await fetch(`${envConfig.BASE_API_URL}/${url}`);
  return await response.json();
};

export { getPreFetchProps, getProjectPageProps, getCoursePageProps, getSheetPageProps };
