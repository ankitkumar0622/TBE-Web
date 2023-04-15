import { CardGradientContainer, Image, Text } from '@/components';
import { NotAnotherTechCourseCardProps } from '@/interfaces';

const NotAnotherTechCourseCard = ({
  image,
  imageAltText,
  title,
  content,
}: NotAnotherTechCourseCardProps) => {
  return (
    <CardGradientContainer className='max-w-sm'>
      <Image className='w-56' src={`${image}`} alt={imageAltText} />
      <Text level='h4' className='heading-4 pt-4'>
        {title}
      </Text>

      <Text level='p' className='paragraph pt-2 text-grey'>
        {content}
      </Text>
    </CardGradientContainer>
  );
};

export default NotAnotherTechCourseCard;
