import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';

export default function Loader({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={cn('p-4 flex justify-center items-center', className)}
    >
      <LoaderCircle aria-label="Loading" className="animate-spin" />
    </div>
  );
}
