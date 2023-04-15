import {
  CardSectionContainer,
  FlexContainer,
  Section,
  SectionHeaderContainer,
  NotAnotherTechCourseCard,
  Text,
} from '@/components';
import { NOT_ANOTHER_TECH_COURSE } from '@/constant';

const NotAnotherTechCourse = () => {
  return (
    <Section>
      <FlexContainer direction='col'>
        <Text level='h2' className='heading-2 text-gray-600'>
          Not another Tech course
        </Text>
        <Text level='p' className='paragraph strong-text'>
          So what make us different?
        </Text>
        <CardSectionContainer>
          {NOT_ANOTHER_TECH_COURSE.map((item) => {
            const { id, image, imageAltText, title, content } = item;
            return (
              <NotAnotherTechCourseCard
                key={id}
                image={image}
                imageAltText={imageAltText}
                title={title}
                content={content}
              />
            );
          })}
        </CardSectionContainer>
      </FlexContainer>
    </Section>
  );
};

export default NotAnotherTechCourse;
