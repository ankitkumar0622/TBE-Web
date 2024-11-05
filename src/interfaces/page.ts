import { BaseShikshaCourseResponseProps , BaseSheetResponseProps} from '.';
import { ProjectDocumentModel } from './database';
import { GetSEOMetaResponseType } from './global';

export interface PageProps {
  slug: any;
  seoMeta: GetSEOMetaResponseType;
  resolvedUrl?: string;
}

export type ProjectPickedPageProps = Pick<
  ProjectDocumentModel,
  | '_id'
  | 'name'
  | 'meta'
  | 'roadmap'
  | 'difficultyLevel'
  | 'sections'
  | 'requiredSkills'
>;

export interface ProjectPageProps extends PageProps {
  project: ProjectPickedPageProps;
  meta: string;
}

export interface CoursePageProps extends PageProps {
  course: BaseShikshaCourseResponseProps;
  meta: string;
  currentChapterId: string;
}

export interface SheetPageProps extends PageProps {
  sheet: BaseSheetResponseProps;
  meta: string;
  currentQuestionId: string;
}

export interface SheetHeroContainerProps {
  id: string;
  name: string;
  isEnrolled?: boolean;
}
