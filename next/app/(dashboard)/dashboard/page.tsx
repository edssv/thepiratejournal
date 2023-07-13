import { redirect } from 'next/navigation';

import { ArticleItem } from '@/components/article-item';
import { EmptyPlaceholder } from '@/components/empty-placeholder';
import { DashboardHeader } from '@/components/header';
import { DashboardShell } from '@/components/shell';
import { authOptions } from '@/lib/auth';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { getCurrentUser } from '@/lib/session';
import { absoluteUrlImageFromStrapi } from '@/lib/utils';
import { ArticleService } from '@/services/article/article.service';

export const metadata = {
  title: 'Dashboard'
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || getPublicUrl.login());
  }

  const { data: articles } = await ArticleService.getManyByUserLike();

  return (
    <DashboardShell>
      <DashboardHeader heading='Понравившиеся' text='Статьи которые ты оценил.' />
      <div>
        {articles?.length ? (
          <div className='divide-y divide-border rounded-md border'>
            {articles.map(({ attributes, id }) => (
              <ArticleItem
                key={id}
                article={{
                  title: attributes.title,
                  createdAt: attributes.createdAt,
                  slug: attributes.slug,
                  cover: absoluteUrlImageFromStrapi(attributes.cover.data.attributes.url)
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name='post' />
            <EmptyPlaceholder.Title>Нет добавленных статей</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              У тебя пока нет оцененных статей. Найди статьи для себя.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
