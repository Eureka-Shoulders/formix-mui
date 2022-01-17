import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
  Switch,
  SwitchProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useField } from '@euk-labs/formix/hooks';

export type FXSwitchProps = {
  name: string;
  label?: string;
  formControlLabelProps?: FormControlLabelProps;
  formGroupProps?: FormGroupProps;
  formControlProps?: FormControlProps;
  SwitchComponent?: any;
} & SwitchProps;

const FXSwitch = ({
  SwitchComponent,
  name,
  label,
  formControlLabelProps,
  formGroupProps,
  formControlProps,
  ...props
}: FXSwitchProps) => {
  const { field, meta, helpers } = useField(name);

  const setFieldValue = (
    event: React.ChangeEvent<HTMLInputElement>,
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
              SwitchComponent ? (
                <SwitchComponent
                  {...props}
                  checked={field.value === true}
                  onChange={setFieldValue}
                />
              ) : (
                <Switch
                  {...props}
                  checked={field.value === true}
                  onChange={setFieldValue}
                />
              )
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
    <Switch
      {...props}
      checked={field.value === true}
      onChange={setFieldValue}
    />
  );
};

export default observer(FXSwitch);
