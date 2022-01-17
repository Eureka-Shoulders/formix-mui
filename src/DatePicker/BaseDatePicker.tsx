import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
  LocalizationProviderProps,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField, TextFieldProps } from '@mui/material';

export type BaseDatePickerProps = {
  label?: string;
  textFieldProps?: TextFieldProps;
  localizationProviderProps?: Omit<LocalizationProviderProps, 'dateAdapter'>;
  dateAdapter?: LocalizationProviderProps['dateAdapter'];
  onDatePickerChange: (
    date: unknown,
    keyboardInputValue: string | undefined
  ) => void;
  datePickerValue: Date | string | undefined;
} & Omit<DatePickerProps, 'renderInput' | 'onChange' | 'value'>;

const BaseDatePicker = ({
  label,
  textFieldProps,
  dateAdapter,
  localizationProviderProps,
  onDatePickerChange,
  datePickerValue,
  ...props
}: BaseDatePickerProps) => {
  return (
    <LocalizationProvider
      {...localizationProviderProps}
      dateAdapter={dateAdapter || AdapterDateFns}
    >
      <DatePicker
        {...props}
        value={datePickerValue}
        onChange={onDatePickerChange}
        label={label}
        renderInput={(params) => (
          <TextField {...params} fullWidth {...textFieldProps} />
        )}
      />
    </LocalizationProvider>
  );
};

export default BaseDatePicker;
