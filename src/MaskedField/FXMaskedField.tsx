import { TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Props as InputMaskProps } from 'react-input-mask';

import { useField } from '@euk-labs/formix';
import { MaskedField } from '@euk-labs/componentz';

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
    <MaskedField
      {...props}
      {...field}
      mask={mask}
      maskPlaceholder={maskPlaceholder}
      label={label}
      value={field.value as string}
      onChange={setValueOnField}
      textFieldProps={{
        ...textFieldProps,
        error: meta.touched && !!meta.error,
        helperText: meta.touched && meta.error,
      }}
    />
  );
};

export default observer(FXMaskedField);
