import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Switch,
  SwitchProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFormixContext } from '@euk-labs/formix/hooks';

export interface ISwitchOption {
  name: string;
  label: string;
  switchProps?: SwitchProps;
  formControlLabelProps?: FormControlLabelProps;
  SwitchComponent?: (props: SwitchProps) => React.ReactElement;
}

export type FXSwitchGroupProps = {
  helperText?: string;
  label?: string;
  formGroupProps?: FormGroupProps;
  formLabelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
  options: ISwitchOption[];
};

const FXSwitchGroup = ({
  helperText,
  label,
  formGroupProps,
  formLabelProps,
  formControlProps,
  options,
}: FXSwitchGroupProps) => {
  const context = useFormixContext();
  const setFieldValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    context.setFieldValue(event.target.name, checked);
  };

  return (
    <FormControl {...formControlProps}>
      <FormLabel {...formLabelProps}>{label}</FormLabel>
      <FormGroup {...formGroupProps}>
        {options.map((option, index) => (
          <FormControlLabel
            {...option.formControlLabelProps}
            key={`Option-${option.name}-${index}`}
            control={
              option.SwitchComponent ? (
                <option.SwitchComponent
                  {...option.switchProps}
                  name={option.name}
                  onChange={setFieldValue}
                  checked={context.getValue(option.name) === true}
                />
              ) : (
                <Switch
                  {...option.switchProps}
                  name={option.name}
                  onChange={setFieldValue}
                  checked={context.getValue(option.name) === true}
                />
              )
            }
            label={option.label}
          />
        ))}
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default observer(FXSwitchGroup);
