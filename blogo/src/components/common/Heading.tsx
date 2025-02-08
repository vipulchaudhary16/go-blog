import React, { ElementType, ReactNode } from 'react';

type HeadingProps = {
  level?: 1 | 2 | 3 | 4;
  className?: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

const Heading: React.FC<HeadingProps> = ({ level = 1, className = '', children, ...props }) => {
  const HeadingTag: ElementType = `h${Math.min(4, Math.max(1, level))}` as ElementType;

  const baseStyles = 'font-bold text-gray-900';
  const sizeStyles =
    {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
    }[level] || 'text-xl';

  return (
    <HeadingTag className={`${baseStyles} ${sizeStyles} ${className}`.trim()} {...props}>
      {children}
    </HeadingTag>
  );
};

export default Heading;
