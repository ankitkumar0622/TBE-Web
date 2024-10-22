import React from 'react';
import { LandingPageHero, CardContainerA, SEO, LinkButton } from '@/components';
import { PageProps } from '@/interfaces';
import { getPreFetchProps } from '@/utils';
import { STATIC_FILE_PATH, TBP_FEATURES, routes } from '@/constant';

const Home = ({ seoMeta }: PageProps) => {
  return (
    <React.Fragment>
      <SEO seoMeta={seoMeta} />
      <LandingPageHero
        sectionHeaderProps={{
          heading: 'Prepare for Interviews with',
          focusText: 'Expert Questions',
        }}
        heroText='Ace Your Interviews with Free Curated Question Sets'
        primaryButton={
          <LinkButton
            href={routes.interviewPrepExplore}
            className='w-full sm:w-fit'
            buttonProps={{
              variant: 'PRIMARY',
              text: 'Explore Questions',
              className: 'w-full',
            }}
          />
        }
        backgroundImageUrl={`${STATIC_FILE_PATH.svg}/hero-image.svg`}
      />
      <CardContainerA
        heading='What We Do'
        focusText='Differently'
        cards={TBP_FEATURES}
        borderColour={4}
      />
    </React.Fragment>
  );
};

export const getServerSideProps = getPreFetchProps;

export default Home;
