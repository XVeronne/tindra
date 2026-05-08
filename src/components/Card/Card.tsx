import * as React from 'react';
import { cn } from '@/lib/cn';

type CardVariant = 'paper' | 'marked';

const CardContext = React.createContext<{ variant: CardVariant }>({ variant: 'paper' });

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const dashedHorizontal =
  'bg-repeat-x bg-[length:6px_1px] bg-[image:linear-gradient(to_right,rgb(var(--ink-faint))_50%,transparent_50%)]';

const CornerMarks = () => (
  <>
    <span className="absolute -top-px -left-px w-[7px] h-[7px] border-t-2 border-l-2 border-ink" aria-hidden />
    <span className="absolute -top-px -right-px w-[7px] h-[7px] border-t-2 border-r-2 border-ink" aria-hidden />
    <span className="absolute -bottom-px -left-px w-[7px] h-[7px] border-b-2 border-l-2 border-ink" aria-hidden />
    <span className="absolute -bottom-px -right-px w-[7px] h-[7px] border-b-2 border-r-2 border-ink" aria-hidden />
  </>
);

const CardRoot = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'paper', children, ...props }, ref) => (
    <CardContext.Provider value={{ variant }}>
      <div
        ref={ref}
        className={cn(
          'group relative bg-paper-raised transition-all duration-200',
          variant === 'paper' && [
            'border border-hairline rounded-md',
            'shadow-[0_1px_0_rgba(26,20,16,0.04)]',
            'hover:shadow-[0_3px_0_rgba(26,20,16,0.06)] hover:-translate-y-px'
          ],
          variant === 'marked' && [
            'border border-ink rounded-none',
            'hover:shadow-[0_3px_0_rgba(26,20,16,0.18)] hover:-translate-y-px'
          ],
          className
        )}
        {...props}
      >
        {children}
        {variant === 'marked' && <CornerMarks />}
      </div>
    </CardContext.Provider>
  )
);
CardRoot.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { variant } = React.useContext(CardContext);
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex flex-col gap-2',
          variant === 'paper' ? 'px-6 pt-6 pb-4' : 'px-6 pt-5 pb-4',
          className
        )}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'Card.Header';

const CardEyebrow = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'text-[10px] uppercase tracking-eyebrow font-bold text-clay-deep',
        className
      )}
      {...props}
    />
  )
);
CardEyebrow.displayName = 'Card.Eyebrow';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-display italic font-medium text-3xl leading-tight tracking-tight text-ink',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'Card.Title';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('font-sans text-sm leading-relaxed text-ink-muted max-w-prose', className)}
    {...props}
  />
));
CardDescription.displayName = 'Card.Description';

const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { variant } = React.useContext(CardContext);
    return (
      <div
        ref={ref}
        className={cn(
          'relative px-6 pb-6 pt-0 font-sans text-sm text-ink',
          variant === 'marked' && 'pt-3',
          className
        )}
        {...props}
      >
        {variant === 'marked' && (
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute top-0 left-6 right-6 h-px',
              dashedHorizontal,
              'group-hover:animate-march-x'
            )}
          />
        )}
        {props.children}
      </div>
    );
  }
);
CardBody.displayName = 'Card.Body';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { variant } = React.useContext(CardContext);
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-center justify-between gap-3 px-6 py-4',
          variant === 'paper' && 'border-t border-hairline',
          className
        )}
        {...props}
      >
        {variant === 'marked' && (
          <span
            aria-hidden
            className={cn(
              'pointer-events-none absolute top-0 left-6 right-6 h-px',
              dashedHorizontal,
              'group-hover:animate-march-x'
            )}
          />
        )}
        {props.children}
      </div>
    );
  }
);
CardFooter.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Eyebrow: CardEyebrow,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter
});
