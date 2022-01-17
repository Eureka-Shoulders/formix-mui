import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useField } from '@euk-labs/formix/hooks';

export type FXCheckboxProps = {
  name: string;
  label?: string;
  formControlLabelProps?: FormControlLabelProps;
  formGroupProps?: FormGroupProps;
  formControlProps?: FormControlProps;
} & CheckboxProps;

const FXCheckbox = ({
  name,
  label,
  formControlLabelProps,
  formGroupProps,
  formControlProps,
  ...props
}: FXCheckboxProps) => {
  const { field, meta, helpers } = useField(name);

  const setFieldValue = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    helpers.setValue(checked);
  };
  if (label) {
    return (
      <FormControl {...formControlProps} error={meta.touched && !!meta.error}>
        <FormGroup {...formGroupProps}>
          <FormControlLabel
            {...formControlLabelProps}
            control={
              <Checkbox
                {...props}
                checked={field.value === true}
                onChange={setFieldValue}
              />
            }
            label={label}
          />
        </FormGroup>
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    );
  }
  return (
    <Checkbox
      {...props}
      checked={field.value === true}
      onChange={setFieldValue}
    />
  );
};

export default observer(FXCheckbox);
