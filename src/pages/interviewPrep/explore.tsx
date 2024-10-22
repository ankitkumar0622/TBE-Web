import React, { Fragment } from 'react';
import { PageProps, PrimaryCardWithCTAProps } from '@/interfaces';
import {
  SEO,
  CardContainerB,
} from '@/components';
import { getPreFetchProps } from '@/utils';
import { STATIC_FILE_PATH, routes } from '@/constant';

const Explore = ({ seoMeta }: PageProps) => {
  // Data for the 3 cards: JS, React, Node Interview Questions
  const interviewCards: PrimaryCardWithCTAProps[] = [
    {
      id: 'js-interview-questions',
      image: `${STATIC_FILE_PATH.svg}/shiksha.svg`, // Using existing images for now
      imageAltText: 'JavaScript Interview Questions',
      title: 'JavaScript Interview Questions',
      content: 'Prepare for JavaScript interviews with curated questions.',
      href: routes.interviewPrepJS,
      active: true,
      ctaText: 'Explore JS Questions',
    },
    {
      id: 'react-interview-questions',
      image: `${STATIC_FILE_PATH.svg}/projects.svg`, // Using existing images for now
      imageAltText: 'React Interview Questions',
      title: 'React Interview Questions',
      content: 'Ace your React interviews with these curated questions.',
      href: routes.interviewPrepReact,
      active: true,
      ctaText: 'Explore React Questions',
    },
    {
      id: 'node-interview-questions',
      image: `${STATIC_FILE_PATH.svg}/workshops.svg`, // Using existing images for now
      imageAltText: 'Node.js Interview Questions',
      title: 'Node.js Interview Questions',
      content: 'Get ready for Node.js interviews with top questions.',
      href: routes.interviewPrepNode,
      active: true,
      ctaText: 'Explore Node Questions',
    },
  ];

  return (
    <Fragment>
      <SEO seoMeta={seoMeta} />
      <CardContainerB
        heading='Explore'
        focusText='Interview Questions'
        cards={interviewCards}
        borderColour={2}
        subtext='Pick A Topic and Start Practicing'
        sectionClassName='px-2 py-4'
      />
    </Fragment>
  );
};

export const getServerSideProps = getPreFetchProps;

export default Explore;
