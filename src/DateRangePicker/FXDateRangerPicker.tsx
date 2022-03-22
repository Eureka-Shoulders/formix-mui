import { observer } from 'mobx-react-lite';
import { useField } from '@euk-labs/formix';
import { DateRangePicker, DateRangePickerProps } from '@euk-labs/componentz';

type FXDateRangePickerProps = {
  name: string;
  label?: string;
} & Omit<DateRangePickerProps, 'onChange' | 'value'>;

function FXDateRangePicker({ name, label, ...props }: FXDateRangePickerProps) {
  const { field, meta, helpers } =
    useField<{ start: Date | null; end: Date | null }>(name);

  return (
    <DateRangePicker
      {...field}
      {...props}
      disabled={meta.disabled || props.disabled}
      label={label}
      value={field.value}
      onChange={(newValue) => {
        helpers.setValue(newValue);
      }}
    />
  );
}

export default observer(FXDateRangePicker);
