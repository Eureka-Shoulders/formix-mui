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
  useValue?: boolean;
} & CheckboxProps;

const FXCheckbox = ({
  name,
  label,
  formControlLabelProps,
  formGroupProps,
  useValue,
  formControlProps,
  ...props
}: FXCheckboxProps) => {
  const { field, meta, helpers } = useField(name);

  const setFieldValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    helpers.setValue(useValue ? event.target.value : checked);
  };

  return (
    <Checkbox
      {...props}
      label={label}
      formControlProps={{
        error: meta.touched && !!meta.error,
        ...formControlProps,
      }}
      formGroupProps={{ ...formGroupProps }}
      formControlLabelProps={{
        ...formControlLabelProps,
      }}
      checked={field.value === (useValue ? props.value : true)}
      onChange={setFieldValue}
    />
  );
};

export default observer(FXCheckbox);
