import { ArticleList } from '@/components/main-page/article-list';
import { ArticleService } from '@/services/article/article.service';

export default async function MainPage() {
  const data = await ArticleService.getArticleList(0, 5);

  return (
    <div className='container flex-wrap py-6 lg:py-10'>
      <ArticleList initialData={data} />
    </div>
  );
}
