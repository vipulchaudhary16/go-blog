import { Button } from '@/components/ui/button';
import React from 'react';

type FormFooterProps = {
  createText?: string;
  resetText?: string;
  onCreate?: () => void;
  onReset?: () => void;
};

const FormFooter: React.FC<FormFooterProps> = ({
  createText = 'Create',
  resetText = 'Reset',
  onCreate,
  onReset,
}) => {
  return (
    <div className="flex justify-end space-x-2 mt-4">
      <Button variant={'outline'} onClick={onReset}>
        {resetText}
      </Button>
      <Button type="submit" onClick={onCreate}>
        {createText}
      </Button>
    </div>
  );
};

export default FormFooter;
