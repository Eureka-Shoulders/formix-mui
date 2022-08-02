import { DateTimePickerProps } from '@mui/x-date-pickers';
import { TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useField } from '@euk-labs/formix';
import { DateTimePicker } from '@euk-labs/componentz';
import { parse } from 'date-fns';

export type FXDateTimePickerProps = {
  name: string;
  label?: string;
  textFieldProps?: TextFieldProps;
} & Omit<
  DateTimePickerProps<unknown, unknown>,
  'renderInput' | 'onChange' | 'value'
>;

const FXDateTimePicker = ({
  name,
  label,
  textFieldProps,
  ...props
}: FXDateTimePickerProps) => {
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
    <DateTimePicker
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

export default observer(FXDateTimePicker);
