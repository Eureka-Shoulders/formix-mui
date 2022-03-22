import {
  CheckboxProps,
  FormControlLabelProps,
  FormControlProps,
  FormGroupProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useField } from '@euk-labs/formix';
import { Checkbox } from '@euk-labs/componentz';

export type FXCheckboxProps = {
  name: string;
  label?: string;
  formControlLabelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
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

  return (
    <Checkbox
      {...props}
      disabled={meta.disabled || props.disabled}
      label={label}
      formControlProps={{
        error: meta.touched && !!meta.error,
        ...formControlProps,
      }}
      formGroupProps={{ ...formGroupProps }}
      formControlLabelProps={{
        ...formControlLabelProps,
      }}
      checked={field.value === true}
      onChange={setFieldValue}
    />
  );
};

export default observer(FXCheckbox);
