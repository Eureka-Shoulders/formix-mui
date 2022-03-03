import { observer } from 'mobx-react-lite';
import { NumericField, NumericInputProps } from '@euk-labs/componentz';
import { useField } from '@euk-labs/formix';

export type FXNumericFieldProps = {
  label?: string;
  name: string;
  helperText?: string;
} & NumericInputProps;

const FXNumericField = ({
  label,
  name,
  helperText,
  ...props
}: FXNumericFieldProps) => {
  const { field, meta } = useField<number | string>(name);

  return (
    <NumericField
      {...props}
      {...field}
      label={label}
      helperText={helperText || (meta.touched && meta.error)}
      error={meta.touched && !!meta.error}
    />
  );
};

export default observer(FXNumericField);
