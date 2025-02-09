import { Button } from '@/components/ui/button';
import React from 'react';

type FormFooterProps = {
  createText?: string;
  resetText?: string;
  createProps?: {
    loading?: boolean;
    onCreate: () => void;
  };
  onReset?: () => void;
};

const FormFooter: React.FC<FormFooterProps> = ({
  createText = 'Create',
  resetText = 'Reset',
  createProps,
  onReset,
}) => {
  return (
    <div className="flex justify-end space-x-2 mt-4">
      <Button variant={'outline'} onClick={onReset}>
        {resetText}
      </Button>
      <Button type="submit" disabled={createProps?.loading} onClick={createProps?.onCreate}>
        {createText}
      </Button>
    </div>
  );
};

export default FormFooter;
