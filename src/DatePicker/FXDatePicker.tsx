import { DatePickerProps } from '@mui/x-date-pickers';
import { TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useField } from '@euk-labs/formix';
import { DatePicker } from '@euk-labs/componentz';
import { parse } from 'date-fns';

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
