import {
  FormControlLabelProps,
  FormControlProps,
  FormGroupProps,
  SwitchProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Switch } from '@euk-labs/componentz';
import { useField } from '@euk-labs/formix';

export type FXSwitchProps = {
  name: string;
  label?: string;
  formControlLabelProps?: FormControlLabelProps;
  formGroupProps?: FormGroupProps;
  formControlProps?: FormControlProps;
  SwitchComponent?: (props: SwitchProps) => React.ReactElement;
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

  return (
    <Switch
      {...props}
      disabled={meta.disabled || props.disabled}
      label={label}
      checked={field.value === true}
      onChange={setFieldValue}
      formControlProps={{
        ...formControlProps,
        error: meta.touched && !!meta.error,
      }}
      formGroupProps={formGroupProps}
      formControlLabelProps={formControlLabelProps}
      helperText={meta.touched && meta.error}
      SwitchComponent={SwitchComponent}
    />
  );
};

export default observer(FXSwitch);
