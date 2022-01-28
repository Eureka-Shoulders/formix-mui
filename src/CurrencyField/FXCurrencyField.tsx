import { TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { CurrencyField } from '@euk-labs/componentz';
import { useField } from '@euk-labs/formix';

export type FXCurrencyFieldProps = {
  label?: string;
  name: string;
} & TextFieldProps;

const FXCurrencyField = ({ label, name, ...props }: FXCurrencyFieldProps) => {
  const { field } = useField(name);

  return <CurrencyField {...props} {...field} label={label} />;
};

export default observer(FXCurrencyField);
