import { DatePickerProps } from '@mui/lab';
import { TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useField } from '@euk-labs/formix';
import { DatePicker } from '@euk-labs/componentz';

export type FXDatePickerProps = {
  name: string;
  label?: string;
  textFieldProps?: TextFieldProps;
} & Omit<DatePickerProps, 'renderInput' | 'onChange' | 'value'>;

const FXDatePicker = ({
  name,
  label,
  textFieldProps,
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
      value={field.value as string | Date | undefined}
      onChange={setFieldValue}
      label={label}
      textFieldProps={{
        ...textFieldProps,
        ...field,
        disabled: meta.disabled || props.disabled,
        error: meta.touched && !!meta.error,
        helperText: meta.touched && meta.error,
      }}
    />
  );
};

export default observer(FXDatePicker);
