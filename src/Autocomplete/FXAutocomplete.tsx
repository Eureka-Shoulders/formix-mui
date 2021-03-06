import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps as MuiAutocompleteProps,
  TextFieldProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useField } from '@euk-labs/formix';
import { Autocomplete } from '@euk-labs/componentz';

export type AutocompleteProps<T> = {
  name: string;
  label: string;
  textFieldProps?: TextFieldProps;
  checkbox?: boolean;
  options: T[];
  buildNew?: (value: string) => T;
  debounce?: number;
  onDebouncedInputChange?: (value: string) => void;
} & Omit<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MuiAutocompleteProps<any, true | false, true | false, true | false>,
  'renderInput'
>;

function FXAutocomplete<T>({
  name,
  label,
  textFieldProps,
  checkbox,
  options,
  buildNew,
  debounce,
  onDebouncedInputChange,
  onChange,
  ...props
}: AutocompleteProps<T>) {
  const { field, helpers, meta } = useField(name);

  const setFieldValue = (
    event: React.SyntheticEvent<Element, Event>,
    value: unknown,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<unknown> | undefined
  ) => {
    helpers.setValue(value);
    onChange && onChange(event, value, reason, details);
  };

  return (
    <Autocomplete
      {...field}
      {...props}
      options={options}
      label={label}
      textFieldProps={{
        name,
        disabled: meta.disabled || props.disabled,
        error: meta.touched && !!meta.error,
        helperText: meta.touched && meta.error,
        ...textFieldProps,
      }}
      checkbox={checkbox}
      onChange={setFieldValue}
      buildNew={buildNew}
      debounce={debounce}
      onDebouncedInputChange={onDebouncedInputChange}
      isOptionEqualToValue={(option, value) =>
        JSON.stringify(option) === JSON.stringify(value)
      }
    />
  );
}

export default observer(FXAutocomplete);
