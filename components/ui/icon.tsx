import React from 'react';
import dynamic from 'next/dynamic';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports | string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...props }, ref) => {
    const LucideIcon = dynamic(
      () => {
        if (name in dynamicIconImports) {
          return dynamicIconImports[name as keyof typeof dynamicIconImports]();
        }
        return Promise.resolve(() => null);
      },
      { ssr: false }
    );

    return <LucideIcon ref={ref} {...props} />;
  }
);

Icon.displayName = 'Icon';

export default Icon;
