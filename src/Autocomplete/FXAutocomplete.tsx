import { AutocompleteProps, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useField } from '@euk-labs/formix';
import { Autocomplete } from '@euk-labs/componentz';

export type InternalAutocompleteProps<T> = {
  name: string;
  label: string;
  textFieldProps?: TextFieldProps;
  checkbox?: boolean;
  options: T[];
  buildNew?: (value: string) => T;
  debounce?: number;
  onDebouncedInputChange?: (value: string) => void;
} & Omit<
  AutocompleteProps<any, true | false, true | false, true | false>,
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
  ...props
}: InternalAutocompleteProps<T>) {
  const { field, helpers, meta } = useField(name);

  const setFieldValue = (
    e: React.SyntheticEvent<Element, Event>,
    value: unknown
  ) => {
    helpers.setValue(value);
  };

  return (
    <Autocomplete
      {...field}
      {...props}
      options={options}
      label={label}
      textFieldProps={{
        ...field,
        disabled: props.disabled,
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
