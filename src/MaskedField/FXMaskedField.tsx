import { TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import InputMask, { Props as InputMaskProps } from 'react-input-mask';

import { useField } from '@euk-labs/formix/hooks';

export type FXMaskedFieldProps = {
  name: string;
  label?: string;
  textFieldProps?: TextFieldProps;
  maskPlaceholder?: string | null;
} & InputMaskProps;

const FXMaskedField = ({
  name,
  label,
  mask,
  textFieldProps,
  maskPlaceholder,
  ...props
}: FXMaskedFieldProps) => {
  const { field, meta, helpers } = useField(name);

  const setValueOnField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!!value) {
      helpers.setValue(value);
    }
  };

  return (
    <InputMask
      mask={mask}
      maskPlaceholder={maskPlaceholder}
      {...props}
      {...field}
      value={field.value as string}
      onChange={setValueOnField}
    >
      {() => (
        <TextField
          {...textFieldProps}
          label={label}
          fullWidth
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    </InputMask>
  );
};

export default observer(FXMaskedField);
