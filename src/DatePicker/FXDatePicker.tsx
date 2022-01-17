import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
  LocalizationProviderProps,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useField } from '@euk-labs/formix/hooks';

export type FXDatePickerProps = {
  name: string;
  label?: string;
  textFieldProps?: TextFieldProps;
  localizationProviderProps?: Omit<LocalizationProviderProps, 'dateAdapter'>;
  dateAdapter?: LocalizationProviderProps['dateAdapter'];
} & Omit<DatePickerProps, 'renderInput' | 'onChange' | 'value'>;

const FXDatePicker = ({
  name,
  label,
  textFieldProps,
  dateAdapter,
  localizationProviderProps,
  ...props
}: FXDatePickerProps) => {
  const { field, meta, helpers } = useField(name);

  const setFieldValue = (
    date: unknown,
    keyboardInputValue?: string | undefined
  ) => {
    helpers.setValue(keyboardInputValue || date);
  };

  return (
    <LocalizationProvider
      {...localizationProviderProps}
      dateAdapter={dateAdapter || AdapterDateFns}
    >
      <DatePicker
        {...field}
        {...props}
        onChange={setFieldValue}
        label={label}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            {...textFieldProps}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && meta.error}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default observer(FXDatePicker);
