import clsx from 'clsx';

type EmptyPlaceholderProps = React.HTMLAttributes<HTMLDivElement>;

export function EmptyPlaceholder({ children, className, ...props }: EmptyPlaceholderProps) {
  return (
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
}

interface EmptyPlaceholderIconProps extends Partial<React.HtmlHTMLAttributes<HTMLSpanElement>> {
  name: string;
}

EmptyPlaceholder.Icon = function ({ className, name, ...props }: EmptyPlaceholderIconProps) {
  if (!name) {
    return null;
  }

  return (
    <div className='flex h-20 w-20 items-center justify-center rounded-full bg-muted'>
      <span className={clsx('material-symbols-outlined !text-5xl', className)} {...props} />
    </div>
  );
};

type EmptyPlacholderTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

EmptyPlaceholder.Title = function ({ children, className, ...props }: EmptyPlacholderTitleProps) {
  return (
    <h2 className={clsx('mt-6 text-xl font-semibold', className)} {...props}>
      {children}
    </h2>
  );
};

type EmptyPlacholderDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

EmptyPlaceholder.Description = function ({ className, ...props }: EmptyPlacholderDescriptionProps) {
  return (
    <p
      className={clsx('mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground', className)}
      {...props}
    />
  );
};
