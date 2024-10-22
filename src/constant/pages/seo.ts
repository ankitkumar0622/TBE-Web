import { GetSEOMetaResponseType } from '@/interfaces';
import { routes } from '../routes';
import { SHIKSHA_COURSES, TBP_PROJECTS, products } from '..';

const commonMeta = {
  type: 'website',
  robots: 'follow, index',
  image: 'https://theboringeducation.com/images/large-og.png',
};

const getSEOMeta = (basePath: any): GetSEOMetaResponseType => {
  const meta = {
    [`${routes.home}`]: {
      title: 'The Boring Education',
      siteName: 'The Boring Education',
      description: 'Tech Education for Everyone',
      url: routes.home,
      ...commonMeta,
    },
    [`${routes.roadmaps}`]: {
      title: `${products.roadmaps.label} | The Boring Education`,
      siteName: products.roadmaps.label,
      description: products.roadmaps.description,
      url: products.roadmaps.slug,
      ...commonMeta,
    },
    [`${routes.projects}`]: {
      title: `${products.projects.label} | The Boring Education`,
      siteName: products.projects.label,
      description: products.projects.description,
      url: products.projects.slug,
      ...commonMeta,
    },
    [`${routes.projectsExplore}`]: {
      title: `${products.projects.label} | The Boring Education`,
      siteName: products.projects.label,
      description: products.projects.description,
      url: products.projects.slug,
      ...commonMeta,
    },
    [`${routes.allProjects.pharmashiftI}`]: {
      title: `${TBP_PROJECTS[0].title} | The Boring Education`,
      siteName: TBP_PROJECTS[0].title,
      description: TBP_PROJECTS[0].content,
      url: routes.allProjects.pharmashiftI,
      ...commonMeta,
    },
    [`${routes.allProjects.pharmashiftII}`]: {
      title: `${TBP_PROJECTS[1].title} | The Boring Education`,
      siteName: TBP_PROJECTS[1].title,
      description: TBP_PROJECTS[1].content,
      url: routes.allProjects.pharmashiftII,
      ...commonMeta,
    },
    [`${routes.shiksha}`]: {
      title: `${products.shiksha.label} | The Boring Education`,
      siteName: products.shiksha.label,
      description: products.shiksha.description,
      url: products.shiksha.slug,
      ...commonMeta,
    },
    // [`${routes.interviewPrep}`]: {
    //   title: `${products.shiksha.label} | The Boring Education`,
    //   siteName: products.shiksha.label,
    //   description: products.shiksha.description,
    //   url: products.shiksha.slug,
    //   ...commonMeta,
    // },
    [`${routes.interviewPrep}`]: {
      title: `Interview Prep | The Boring Education`,
      siteName: 'Interview Prep',
      description: 'Prepare for your interviews with expertly curated questions.',
      url: routes.interviewPrep,
      ...commonMeta,
    },
    [`${routes.interviewPrepExplore}`]: { // Adding SEO for Explore page
      title: `Explore Interview Questions | The Boring Education`,
      siteName: 'Explore Interview Questions',
      description: 'Get ready for interviews by exploring JavaScript, React, and Node.js questions.',
      url: routes.interviewPrepExplore,
      ...commonMeta,
    },
    [`${routes.allCourses.logicBuildingForEveryone}`]: {
      title: `${SHIKSHA_COURSES[0].title} | The Boring Education`,
      siteName: SHIKSHA_COURSES[0].title,
      description: SHIKSHA_COURSES[0].content,
      url: routes.allCourses.logicBuildingForEveryone,
      ...commonMeta,
    },
    [`${routes.allCourses.basicsOfProgrammingWithJS}`]: {
      title: `${SHIKSHA_COURSES[1].title} | The Boring Education`,
      siteName: SHIKSHA_COURSES[1].title,
      description: SHIKSHA_COURSES[1].content,
      url: routes.allCourses.basicsOfProgrammingWithJS,
      ...commonMeta,
    },
    [`${routes.contactUs}`]: {
      title: 'Contact | The Boring Education',
      siteName: 'The Boring Education',
      description: 'Contact The Boring Education',
      url: routes.contactUs,
      ...commonMeta,
    },
    [`${routes[404]}`]: {
      title: 'Lost in Boring Space | The Boring Education',
      siteName: 'Lost in Boring Space',
      description: 'Tech Education for Everyone',
      url: routes[404],
      ...commonMeta,
    },
    [`${routes.register}`]: {
      title: 'Register | The Boring Education',
      siteName: 'Register at The Boring Education',
      description: 'Register at The Boring Education',
      url: routes.register,
      ...commonMeta,
    },
    [`${routes.shikshaExplore}`]: {
      title: 'Explore Courses | The Boring Education',
      siteName: 'Explore Courses at The Boring Education',
      description: 'Explore Courses at The Boring Education',
      url: routes.shikshaExplore,
      ...commonMeta,
    },
  };

  return meta[basePath];
};

export { getSEOMeta };
