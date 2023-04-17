import { ProfileSection } from '@/lib/enums';
import { Article } from '@/interfaces/article.interface';
import ArticlePreview from '@/components/ArticlePreview/ArticlePreview';
import DraftPreview from '@/components/DraftPreview/DraftPreview';
import CreateModule from '../CreateModule/CreateModule';

import styles from './ContentBlock.module.scss';

interface ContentBlockProps {
  currentSection: string;
  content: any;
  isOwner: boolean;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ currentSection, content, isOwner }) => {
  if (!content) return null;

  const getContentList = () => {
    if (currentSection !== ProfileSection.Drafts) {
      return content?.map((article: Article) => <ArticlePreview article={article} key={article.id} />);
    }

    if (currentSection === ProfileSection.Drafts) {
      return content.map((draft: Partial<Article>) => <DraftPreview draft={draft} key={draft.id} />);
    }
  };

  return (
    <div className={`${styles[currentSection]}`}>
      {content.length ? (
        getContentList()
      ) : isOwner ? (
        <CreateModule
          variant={
            currentSection === ProfileSection.Articles
              ? 'create'
              : currentSection === ProfileSection.Drafts
              ? 'draft'
              : 'find'
          }
        />
      ) : (
        <h4>
          {currentSection === ProfileSection.Articles
            ? 'Пользователь не опубликовал ни одной статьи'
            : currentSection === ProfileSection.Likes && 'Пользователь не оценил ни одной статьи'}
        </h4>
      )}
    </div>
  );
};

export default ContentBlock;
