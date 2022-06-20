import { TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useField } from '@euk-labs/formix';
import { MaskedField } from '@euk-labs/componentz';

export type FXMaskedFieldProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
  maskPlaceholder?: string | null;
  maskChar?: string;
  mask: string | (string | RegExp)[];
};

const FXMaskedField = ({
  name,
  label,
  mask,
  textFieldProps,
  maskPlaceholder,
  ...props
}: FXMaskedFieldProps) => {
  const { field, meta } = useField(name);

  return (
    <MaskedField
      {...props}
      {...field}
      mask={mask}
      maskPlaceholder={maskPlaceholder}
      label={label}
      value={field.value as string}
      textFieldProps={{
        ...textFieldProps,
        name: field.name,
        disabled: meta.disabled || props.disabled,
        error: meta.touched && !!meta.error,
        helperText: meta.touched && meta.error,
      }}
    />
  );
};

export default observer(FXMaskedField);
