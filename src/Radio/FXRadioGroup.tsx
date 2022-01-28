import {
  FormControlLabelProps,
  FormControlProps,
  FormLabelProps,
  RadioGroupProps,
  RadioProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useField } from '@euk-labs/formix';
import { RadioGroup } from '@euk-labs/componentz';
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
  const { field, meta, helpers } = useField(name);

  const setFieldValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    helpers.setValue(value);
  };

  return (
    <RadioGroup
      label={label}
      formControlProps={{
        ...formControlProps,
        error: meta.touched && !!meta.error,
      }}
      formLabelProps={{
        ...formLabelProps,
      }}
      radioGroupProps={{
        ...radioGroupProps,
        value: field.value,
        onChange: setFieldValue,
      }}
      helperText={(meta.touched && meta.error) || helperText}
      options={options}
    />
  );
};

export default observer(FXRadioGroup);
