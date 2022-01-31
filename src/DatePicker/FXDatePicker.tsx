import { DatePickerProps, LocalizationProviderProps } from '@mui/lab';
import { TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useField } from '@euk-labs/formix';
import { DatePicker } from '@euk-labs/componentz';

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
    <DatePicker
      {...field}
      {...props}
      datePickerValue={field.value as string | Date | undefined}
      onDatePickerChange={setFieldValue}
      label={label}
      textFieldProps={{
        ...textFieldProps,
        ...field,
        error: meta.touched && !!meta.error,
        helperText: meta.touched && meta.error,
      }}
      localizationProviderProps={{
        ...localizationProviderProps,
      }}
      dateAdapter={dateAdapter}
    />
  );
};

export default observer(FXDatePicker);
