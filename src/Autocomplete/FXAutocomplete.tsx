import { AutocompleteProps, TextFieldProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useField } from '@euk-labs/formix';
import { Autocomplete } from '@euk-labs/componentz';

export type InternalAutocompleteProps = {
  name: string;
  label: string;
  textFieldProps?: TextFieldProps;
  checkbox?: boolean;
  options: any[];
  buildNew?: (value: string) => any;
  debounce?: number;
  onDebouncedInputChange?: (value: string) => void;
} & Omit<
  AutocompleteProps<any, true | false, true | false, true | false>,
  'renderInput'
>;

const FXAutocomplete = ({
  name,
  label,
  textFieldProps,
  checkbox,
  options,
  buildNew,
  debounce,
  onDebouncedInputChange,
  ...props
}: InternalAutocompleteProps) => {
  const { helpers } = useField(name);

  const setFieldValue = (
    e: React.SyntheticEvent<Element, Event>,
    value: unknown
  ) => {
    helpers.setValue(value);
  };

  return (
    <Autocomplete
      {...props}
      options={options}
      label={label}
      textFieldProps={{
        ...textFieldProps,
      }}
      checkbox={checkbox}
      onChange={setFieldValue}
      buildNew={buildNew}
      debounce={debounce}
      onDebouncedInputChange={onDebouncedInputChange}
    />
  );
};

export default observer(FXAutocomplete);
