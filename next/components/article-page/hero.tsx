import Image from 'next/image';

const Hero: React.FC<{ cover: string }> = ({ cover }) => (
  <div className='mt-8 lg:mt-[72px]'>
    <figure className='lg:-mx-10 xl:-mx-20'>
      <div className='h-fit'>
        <Image
          priority
          alt='Обложка'
          className='h-full max-h-[760px] w-full max-w-full rounded-[32px]'
          height={200}
          sizes='100vw'
          src={cover}
          width={200}
        />
      </div>
    </figure>
  </div>
);

export default Hero;
