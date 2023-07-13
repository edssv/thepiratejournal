import { ArticleItem } from '@/components/article-item';
import { DashboardHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading='Понравившиеся' text='Статьи которые ты оценил.' />
      <div className='divide-border-200 divide-y rounded-md border'>
        <ArticleItem.Skeleton />
        <ArticleItem.Skeleton />
        <ArticleItem.Skeleton />
        <ArticleItem.Skeleton />
        <ArticleItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
