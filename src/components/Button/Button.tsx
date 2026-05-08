import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2, Play } from 'lucide-react';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-extrabold tracking-tight transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/50 focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.97]',
  {
    variants: {
      variant: {
        primary:
          'bg-clay text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_1px_2px_rgba(176,97,62,0.25)] hover:bg-clay-deep hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_24px_rgba(176,97,62,0.32)]',
        secondary:
          'bg-ink text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-ink/90 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.22)]',
        accent:
          'bg-moss text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_1px_2px_rgba(0,133,91,0.25)] hover:bg-moss-deep hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_24px_rgba(0,133,91,0.32)]',
        outline:
          'border border-hairline bg-paper-raised text-ink hover:bg-paper-sunken hover:border-ink/30',
        ghost: 'text-ink hover:bg-paper-sunken',
        link: 'text-clay font-bold underline-offset-4 hover:underline px-0 h-auto active:scale-100 shadow-none',
        danger:
          'bg-burgundy text-paper shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-burgundy/90 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_8px_24px_rgba(169,58,79,0.3)]'
      },
      size: {
        sm: 'h-9 px-4 text-xs rounded-full',
        md: 'h-11 px-6 text-sm rounded-full',
        lg: 'h-14 px-8 text-base rounded-full',
        icon: 'h-11 w-11 rounded-full'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, disabled, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    const content =
      loading && !asChild ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {children}
        </>
      ) : (
        children
      );

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);
ButtonRoot.displayName = 'Button';

const ButtonPlay = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <Play
      ref={ref}
      className={cn('h-3.5 w-3.5 fill-current shrink-0', className)}
      aria-hidden
      {...props}
    />
  )
);
ButtonPlay.displayName = 'Button.Play';

const ButtonMeta = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span ref={ref} className={cn('inline-flex items-center font-bold', className)} {...props}>
      <span className="opacity-60 mx-2">·</span>
      <span className="font-mono tracking-normal">{children}</span>
    </span>
  )
);
ButtonMeta.displayName = 'Button.Meta';

export const Button = Object.assign(ButtonRoot, {
  Play: ButtonPlay,
  Meta: ButtonMeta
});

export { buttonVariants };
