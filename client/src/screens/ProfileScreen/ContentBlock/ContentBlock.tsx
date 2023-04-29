import ArticlePreview from '@/components/ArticlePreview/ArticlePreview';
import DraftPreview from '@/components/DraftPreview/DraftPreview';
import type { UserQuery } from '@/gql/__generated__';
import { ProfileSection } from '@/lib/enums';

import CreateModule from '../CreateModule/CreateModule';

import styles from './ContentBlock.module.scss';

interface ContentBlockProps {
  currentSection: string;
  content: UserQuery['getUserContent'];
  isOwner: boolean;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ currentSection, content, isOwner }) => {
  if (!content) return null;

  const getContentList = () => {
    if (currentSection !== ProfileSection.Drafts) {
      return content?.map((article) => <ArticlePreview key={article.id} article={article} />);
    }

    if (currentSection === ProfileSection.Drafts) {
      return content.map((draft) => <DraftPreview key={draft.id} draft={draft} />);
    }

    return null;
  };
  const getVariant = () => {
    if (currentSection === ProfileSection.Articles) return 'create';
    if (currentSection === ProfileSection.Drafts) return 'draft';
    return 'find';
  };
  const getHelperText = () => {
    if (currentSection === ProfileSection.Articles) return 'Пользователь не опубликовал ни одной статьи';
    if (currentSection === ProfileSection.Likes) return 'Пользователь не оценил ни одной статьи';
    return null;
  };
  const getContent = () => {
    if (content.length) return getContentList();
    if (isOwner) return <CreateModule variant={getVariant()} />;
    return <h4>{getHelperText()}</h4>;
  };
  return <div className={`${styles[currentSection]}`}>{getContent()}</div>;
};

export default ContentBlock;
