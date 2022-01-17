import {
  InputAdornment,
  InputBaseComponentProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import BaseNumberFormat from './BaseNumberFormat';

const MoneyFormat = React.forwardRef<
  React.PropsWithChildren<InputBaseComponentProps>,
  any
>(function MoneyFormat(props, ref) {
  return (
    <BaseNumberFormat {...props} ref={ref} decimalScale={2} fixedDecimalScale />
  );
});

const BaseCurrencyField = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        inputComponent: MoneyFormat,
      }}
    />
  );
};

export default BaseCurrencyField;
