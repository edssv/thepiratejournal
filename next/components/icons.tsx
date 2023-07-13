import {
  ExclamationTriangleIcon,
  ArrowRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileIcon,
  FileTextIcon,
  QuestionMarkCircledIcon,
  ImageIcon,
  LaptopIcon,
  MoonIcon,
  DotsVerticalIcon,
  PlusIcon,
  SunIcon,
  TrashIcon,
  HeartIcon,
  TwitterLogoIcon,
  Share2Icon,
  PinTopIcon,
  HeartFilledIcon
} from '@radix-ui/react-icons';
import { Loader2, Pizza, X, User, Settings, Command, CreditCard, Eye } from 'lucide-react';
import type { LucideProps, Icon as LucideIcon } from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  logo: Command,
  share: Share2Icon,
  pinTop: PinTopIcon,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  trash: TrashIcon,
  post: FileTextIcon,
  page: FileIcon,
  heart: HeartIcon,
  filledHeart: HeartFilledIcon,
  media: ImageIcon,
  settings: Settings,
  billing: CreditCard,
  ellipsis: DotsVerticalIcon,
  add: PlusIcon,
  warning: ExclamationTriangleIcon,
  user: User,
  arrowRight: ArrowRightIcon,
  help: QuestionMarkCircledIcon,
  pizza: Pizza,
  sun: SunIcon,
  moon: MoonIcon,
  laptop: LaptopIcon,
  eyeOpen: Eye,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden='true'
      data-icon='github'
      data-prefix='fab'
      focusable='false'
      role='img'
      viewBox='0 0 496 512'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
        fill='currentColor'
      />
    </svg>
  ),
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden='true'
      data-icon='google'
      data-prefix='fab'
      focusable='false'
      role='img'
      viewBox='0 0 128 128'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z'
        fill='#fff'
      />
      <path
        d='M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z'
        fill='#e33629'
      />
      <path
        d='M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z'
        fill='#f8bd00'
      />
      <path
        d='M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z'
        fill='#587dbd'
      />
      <path
        d='M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z'
        fill='#319f43'
      />
    </svg>
  ),
  twitter: TwitterLogoIcon,
  check: CheckIcon,
  vk: ({ ...props }: LucideProps) => (
    <svg fill='none' height='24' width='24' xmlns='http://www.w3.org/2000/svg' {...props}>
      <g clipPath='url(#new_logo_vk_with_text__a)'>
        <g clipPath='url(#new_logo_vk_with_text__b)'>
          <path
            d='M11.5 24h1c5.44 0 8.15 0 9.83-1.68C24 20.64 24 17.92 24 12.5v-1.02c0-5.4 0-8.12-1.67-9.8C20.65 0 17.93 0 12.5 0h-1C6.06 0 3.35 0 1.67 1.68 0 3.36 0 6.08 0 11.5v1.02c0 5.4 0 8.12 1.68 9.8C3.36 24 6.08 24 11.5 24Z'
            fill='#07F'
          />
          <path
            d='M12.77 17.29c-5.47 0-8.59-3.75-8.72-9.99h2.74c.09 4.58 2.11 6.52 3.71 6.92V7.3h2.58v3.95c1.58-.17 3.24-1.97 3.8-3.95h2.58a7.62 7.62 0 0 1-3.51 4.98 7.9 7.9 0 0 1 4.11 5.01h-2.84a4.94 4.94 0 0 0-4.14-3.57v3.57h-.31Z'
            fill='#fff'
          />
        </g>
      </g>
      <defs>
        <clipPath id='new_logo_vk_with_text__a'>
          <path d='M0 0h136v24H0z' fill='#fff' transform='translate(.001)' />
        </clipPath>
        <clipPath id='new_logo_vk_with_text__b'>
          <path d='M0 0h136v48H0z' fill='#fff' transform='translate(0 -12)' />
        </clipPath>
      </defs>
    </svg>
  ),
  ok: ({ ...props }: LucideProps) => (
    <svg
      aria-label='OK.ru'
      fill='#000000'
      height='24px'
      role='img'
      viewBox='0 0 512 512'
      width='24px'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0' />
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
      <g id='SVGRepo_iconCarrier'>
        <rect fill='#EE8208' height='512' rx='15%' width='512' />
        <path
          d='M256 137a36.5 36.5 0 0136.5 36.5a36.5 36.5 0 01-36.5 36.5a36.5 36.5 0 01-36.5-36.5a36.5 36.5 0 0136.5-36.5zm0 124.5c48.6 0 88-39.5 88 -88s-39.5-88 -88 -88s-88 39.5-88 88s39.5 88 88 88m35.6 71.9a132.8 132.8 0 0051-21a25.8 25.8 0 008-35.6a25.8 25.8 0 00-35.6-8a111.9 111.9 0 01-118.6 0a25.8 25.8 0 00-35.6 8a25.8 25.8 0 008 35.6c15.9 10 33 17 51 21l-49 49.3a25.8 25.8 0 0036.5 36.5l48.4-48.5l48.4 48.4a25.8 25.8 0 0036.5 0a25.8 25.8 0 000-36.5l-49.3-49.3'
          fill='#ffffff'
        />
      </g>
    </svg>
  ),
  telegram: ({ ...props }: LucideProps) => (
    <svg fill='none' height='32' viewBox='0 0 32 32' width='32' xmlns='http://www.w3.org/2000/svg' {...props}>
      <circle cx='16' cy='16' fill='url(#paint0_linear_87_7225)' r='14' />
      <path
        d='M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z'
        fill='white'
      />
      <defs>
        <linearGradient gradientUnits='userSpaceOnUse' id='paint0_linear_87_7225' x1='16' x2='16' y1='2' y2='30'>
          <stop stopColor='#37BBFE' />
          <stop offset='1' stopColor='#007DBB' />
        </linearGradient>
      </defs>
    </svg>
  )
};
