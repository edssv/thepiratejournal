import DashboardNav from '@/components/layout/DashboardLayout/DashboardNav/DashboardNav';

import BlogHeader from '../Layout/BlogHeader/BlogHeader';

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div>
    <BlogHeader />
    <div className='lg mt-4 flex gap-16'>
      <aside className='flex lg:hidden'>
        <DashboardNav />
      </aside>
      <main className='w-full px-6'>{children}</main>
    </div>
    <footer />
  </div>
);

export default DashboardLayout;
