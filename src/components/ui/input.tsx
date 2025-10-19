import * as React from 'react';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'placeholder:text-muted-foreground/50 flex h-12 w-full rounded-lg border-0 bg-white/5 px-4 py-2 text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-white/10 focus:bg-white/10 focus-visible:ring-0 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
