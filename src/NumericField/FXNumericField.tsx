import { observer } from 'mobx-react-lite';
import { NumericField, NumericInputProps } from '@euk-labs/componentz';
import { useField } from '@euk-labs/formix';

export type FXNumericFieldProps = {
  label?: string;
  name: string;
} & NumericInputProps;

const FXNumericField = ({ label, name, ...props }: FXNumericFieldProps) => {
  const { field } = useField<number | string>(name);

  return <NumericField {...props} {...field} label={label} />;
};

export default observer(FXNumericField);
