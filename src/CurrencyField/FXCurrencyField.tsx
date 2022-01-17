import {
  InputAdornment,
  InputBaseComponentProps,
  InputProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useField } from '@euk-labs/formix/hooks';

import BaseNumberFormat from './BaseNumberFormat';

export type FXCurrencyFieldProps = {
  label?: string;
  name: string;
  inputProps?: InputProps;
} & TextFieldProps;

const MoneyFormat = React.forwardRef<
  React.PropsWithChildren<InputBaseComponentProps>,
  any
>(function MoneyFormat(props, ref) {
  return (
    <BaseNumberFormat {...props} ref={ref} decimalScale={2} fixedDecimalScale />
  );
});

const FXCurrencyField = ({ label, name, ...props }: FXCurrencyFieldProps) => {
  const { field } = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      label={label}
      InputProps={{
        ...props.InputProps,
        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        inputComponent: MoneyFormat,
      }}
      placeholder="0,00"
    />
  );
};

export default observer(FXCurrencyField);
