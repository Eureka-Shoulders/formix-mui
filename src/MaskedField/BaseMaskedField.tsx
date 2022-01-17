import { TextField, TextFieldProps } from '@mui/material';
import InputMask, { Props as InputMaskProps } from 'react-input-mask';

export type BaseMaskedFieldProps = {
  label?: string;
  textFieldProps?: TextFieldProps;
} & InputMaskProps;

const BaseMaskedField = ({
  label,
  mask,
  textFieldProps,
  ...props
}: BaseMaskedFieldProps) => {
  return (
    <InputMask mask={mask} {...props}>
      {() => <TextField {...textFieldProps} label={label} fullWidth />}
    </InputMask>
  );
};

export default BaseMaskedField;
