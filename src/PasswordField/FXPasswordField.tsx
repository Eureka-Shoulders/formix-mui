import { observer } from 'mobx-react-lite';
import { useField } from '@euk-labs/formix';
import { PasswordField } from '@euk-labs/componentz';

interface FieldProps {
  name: string;
  label?: string;
}

function FXPasswordField({ name, label }: FieldProps) {
  const { field, meta } = useField(name);

  return (
    <PasswordField
      {...field}
      label={label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
    />
  );
}

export default observer(FXPasswordField);
