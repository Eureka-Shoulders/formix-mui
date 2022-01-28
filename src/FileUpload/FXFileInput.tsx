import { Button, FormHelperText } from '@mui/material';
import React, { useRef } from 'react';

import { useField } from '@euk-labs/formix';
import { observer } from 'mobx-react-lite';

type PickImageProps = {
  children?: React.ReactNode;
  accept?: string;
  multiple?: boolean;
  name: string;
  disabled?: boolean;
  processFiles: (files: File[]) => Promise<string | string[]>;
};

const FXFileInput = ({
  children = (
    <Button color="primary" variant="contained">
      Adicionar arquivo
    </Button>
  ),
  accept = 'image/*,video/*',
  multiple,
  name,
  processFiles,
  ...props
}: PickImageProps) => {
  const { meta, helpers } = useField(name);
  const inputRef: any = useRef(null);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const filesToProcess = files ? Array.from(files) : [];
    const processedFiles = await processFiles(filesToProcess);
    if (processedFiles) {
      helpers.setValue(processedFiles);
    }
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };
  return (
    <>
      <input
        accept={accept}
        ref={inputRef}
        style={{ display: 'none' }}
        id={name}
        multiple={multiple}
        onChange={handleChange}
        type="file"
        {...props}
      />
      <label htmlFor={name} onClick={(e) => inputRef.current.click()}>
        {children}
      </label>
      {meta.touched && meta.error && (
        <FormHelperText error={!!meta.error && meta.touched}>
          {meta.error}
        </FormHelperText>
      )}
    </>
  );
};

export default observer(FXFileInput);
