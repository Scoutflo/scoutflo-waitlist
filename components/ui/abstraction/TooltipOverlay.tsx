import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

type TooltipProps = {
  children: React.ReactElement | string;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

const TooltipOverlay = ({
  children,
  content,
  className,
  side,
}: TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side} className={className}>
          <p className="text-white text-[12px]">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipOverlay;
