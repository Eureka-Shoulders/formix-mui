import { observer } from 'mobx-react-lite';
import { useField } from '@euk-labs/formix';
import { PasswordField } from '@euk-labs/componentz';
import type { TextFieldProps } from '@mui/material/TextField';

type FieldProps = {
  name: string;
  label?: string;
} & TextFieldProps;

function FXPasswordField({ name, label, ...rest }: FieldProps) {
  const { field, meta } = useField(name);

  return (
    <PasswordField
      {...field}
      {...rest}
      label={label}
      disabled={meta.disabled}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
}

export default observer(FXPasswordField);
