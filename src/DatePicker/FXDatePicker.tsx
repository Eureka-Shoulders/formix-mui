import { DatePicker } from '@euk-labs/componentz';
import { useField } from '@euk-labs/formix';
import { TextFieldProps } from '@mui/material';
import { DatePickerProps } from '@mui/x-date-pickers';
import { parse } from 'date-fns';
import { observer } from 'mobx-react-lite';

export type FXDatePickerProps = {
  name: string;
  label?: string;
  textFieldProps?: TextFieldProps;
} & Omit<
  DatePickerProps<unknown, unknown>,
  'renderInput' | 'onChange' | 'value'
>;

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
    if (keyboardInputValue) {
      const inputedDate = parse(keyboardInputValue, 'dd/MM/yyyy', new Date());
      if (inputedDate instanceof Date && !isNaN(inputedDate.getTime())) {
        helpers.setValue(inputedDate);
      }
    } else {
      helpers.setValue(date);
    }
  };

  return (
    <DatePicker
      {...props}
      value={field.value as string | Date | undefined}
      onChange={setFieldValue}
      label={label}
      disabled={meta.disabled || props.disabled}
      textFieldProps={{
        ...textFieldProps,
        name: field.name,
        onBlur: field.onBlur,
        error: meta.touched && !!meta.error,
        helperText: meta.touched && meta.error,
      }}
    />
  );
};

export default observer(FXDatePicker);
