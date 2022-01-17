import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useField } from '@euk-labs/formix/hooks';

export interface IRadioOption {
  name: string;
  label: string;
  radioProps?: RadioProps;
  formControlLabelProps?: FormControlLabelProps;
  RadioComponent?: (props: RadioProps) => React.ReactElement;
}

export type FXRadioGroupProps = {
  name: string;
  helperText?: string;
  label?: string;
  radioGroupProps?: RadioGroupProps;
  formLabelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
  options: IRadioOption[];
};

const FXRadioGroup = ({
  name,
  helperText,
  label,
  radioGroupProps,
  formLabelProps,
  formControlProps,
  options,
}: FXRadioGroupProps) => {
  const { field, helpers } = useField(name);

  const setFieldValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    helpers.setValue(value);
  };

  return (
    <FormControl {...formControlProps}>
      <FormLabel {...formLabelProps}>{label}</FormLabel>
      <RadioGroup
        {...radioGroupProps}
        value={field.value}
        onChange={setFieldValue}
      >
        {options.map((option, index) => (
          <FormControlLabel
            {...option.formControlLabelProps}
            value={option.name}
            key={`Option-${option.name}-${index}`}
            control={
              option.RadioComponent ? <option.RadioComponent /> : <Radio />
            }
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default observer(FXRadioGroup);
