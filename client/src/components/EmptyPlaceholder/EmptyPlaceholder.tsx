import clsx from 'clsx';

type EmptyPlaceholderProps = React.HTMLAttributes<HTMLDivElement>;

export const EmptyPlaceholder = ({ children, className, ...props }: EmptyPlaceholderProps) => (
  <div
    className={clsx(
      'animate-in fade-in-50 flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center',
      className
    )}
    {...props}
  >
    <div className='mx-auto flex max-w-[420px] flex-col items-center justify-center text-center'>{children}</div>
  </div>
);

interface EmptyPlaceholderIconProps extends Partial<React.HtmlHTMLAttributes<HTMLSpanElement>> {
  name: string;
}

EmptyPlaceholder.Icon = ({ className, name, ...props }: EmptyPlaceholderIconProps) => {
  if (!name) {
    return null;
  }

  return (
    <div className='bg-muted flex h-20 w-20 items-center justify-center rounded-full'>
      <span className={clsx('material-symbols-outlined !text-5xl', className)} {...props}>
        {name}
      </span>
    </div>
  );
};

type EmptyPlacholderTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

EmptyPlaceholder.Title = ({ children, className, ...props }: EmptyPlacholderTitleProps) => (
  <h2 className={clsx('mt-6 text-xl font-semibold', className)} {...props}>
    {children}
  </h2>
);

type EmptyPlacholderDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

EmptyPlaceholder.Description = ({ className, ...props }: EmptyPlacholderDescriptionProps) => (
  <p
    className={clsx('text-muted-foreground mb-8 mt-2 text-center text-sm font-normal leading-6', className)}
    {...props}
  />
);
