import clsx from 'clsx';
import React, { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode } from 'react';
import Spinner from './Spinner';

interface Props
    extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'none';
    size?: 'sm' | 'md' | 'lg' | 'none';
    outline?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    children?: ReactNode;
    className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
    { className = '',size='md', variant="secondary", outline, loading, icon, children, ...rest },
    ref
) {
    return (
        <button
            ref={ref}
            className={clsx(
                {
                    'border shadow-lg hover:shadow-xl hover:text-flow-200 border-flow-400 hover:bg-flow-900/40   bg-flow-900/20 text-flow-400 ':
                    !outline && variant === 'primary',
                    'border shadow-lg hover:shadow-xl hover:text-gray-200 border-gray-400 hover:border-gray-200 hover:bg-gray-800   bg-gray-800/50 text-gray-400':
                    !outline && variant === 'secondary',
                    'border shadow-lg hover:shadow-xl hover:text-emerald-200 border-emerald-400 hover:bg-emerald-900/40   bg-emerald-900/20 text-emerald-400':
                    !outline && variant === 'success',
                    'border shadow-lg hover:shadow-xl hover:text-rose-200 border-rose-400 hover:bg-rose-900/40   bg-rose-900/20 text-rose-400':
                    !outline && variant === 'danger',
                    'border shadow-lg hover:shadow-xl hover:text-yellow-200 border-yellow-400 hover:bg-yelloe-900/40   bg-yellow-900/20 text-yellow-400':
                    !outline && variant === 'warning',
                    'border-flow-500 bg-flow-800/10 hover:bg-flow-800/20 active:bg-flow-600/10 focus:bg-flow-600/10 focus:outline-none focus:ring-0 text-flow-400 ': outline && variant === 'primary',
                    'border-gray-500 bg-gray-600/10 hover:bg-gray-500/10  active:bg-zinc-500/20 focus:bg-gray-500/20 text-gray-400 hover:text-gray-200 hover:border-gray-300  focus:outline-none focus:ring-0 ': outline && variant === 'secondary',
                    'border ':outline,
                    'flex items-center  justify-center gap-2': (icon || loading) && children,
                    'px-3 py-1 text-sm ':size === 'sm',
                    'px-4 py-2 text-base':size === 'md',
                    'sm:px-12 px-6 py-2 sm:py-3 sm:text-lg':size === 'lg',
                    '': size === 'none',
                    " ": variant === 'none'
                },
                'rounded-full font-medium para whitespace-nowrap cursor-pointer  duration-200 ease-out hover:scale-[1.05] disabled:shadow-none disabled:brightness-75  hover:disabled:scale-[1]  active:scale-95  outline-none ',
                className
            )}
            disabled={loading}
            {...rest}>
            {icon && !loading && icon}
            {icon && loading && <Spinner size={size === 'lg' ? 'md' : 'sm'} variant={variant==="none" ? "primary" : variant} />}
            {!icon && loading && <Spinner size={size === 'lg' ? 'md' : 'sm'} variant={variant==="none" ? "primary" : variant}/>}
            {children}
        </button>
    );
});

export default Button;