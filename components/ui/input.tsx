import * as React from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import Icon from './icon';

const inputVariants = cva(
  'flex w-full bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'rounded-md border border-input focus:border-blue-500 focus-visible:outline-none focus-visible:ring-0',
        underline:
          'border-b-2 focus-visible:border-primary-blue-100 focus-visible:ring-0 focus-visible:outline-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, fullWidth, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const inputType =
      type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
        <input
          type={inputType}
          className={cn(inputVariants({ variant, className }))}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <Icon name="eye-off" size="16" />
            ) : (
              <Icon name="eye" size="16" />
            )}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
