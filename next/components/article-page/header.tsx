interface HeaderProps {
  id: string;
  title: string;
  description: string;
}

const Header: React.FC<HeaderProps> = ({ description, title }) => (
  <header className='relative flex w-full max-w-[768px] justify-between'>
    <div className='flex w-full flex-col'>
      <h1 className='m-0 break-words text-[32px] font-light leading-[40px] sm:text-[64px] sm:leading-[72px] xl:w-[960px]'>
        {title}
      </h1>
      <div className='flex justify-between'>
        <p className='mx-0 mb-[30px] mt-[18px] line-clamp-4 max-h-[144px] overflow-hidden text-ellipsis text-[22px] font-light leading-[28px] sm:mb-10 sm:mt-8 sm:text-2xl sm:leading-[36px]'>
          {description}
        </p>
      </div>
    </div>
  </header>
);

export default Header;
