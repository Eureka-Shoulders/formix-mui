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
  FormLabel,
  FormLabelProps,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { useFormixContext } from '@euk-labs/formix';

export interface ICheckboxOption {
  name: string;
  label: string;
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: FormControlLabelProps;
  CheckboxComponent?: (props: CheckboxProps) => React.ReactElement;
}

export type FXCheckboxGroupProps = {
  helperText?: string;
  label?: string;
  formGroupProps?: FormGroupProps;
  formLabelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
  options: ICheckboxOption[];
  useValue?: boolean;
};

const FXCheckboxGroup = ({
  helperText,
  label,
  formGroupProps,
  formLabelProps,
  formControlProps,
  useValue,
  options,
}: FXCheckboxGroupProps) => {
  const context = useFormixContext();
  const setFieldValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    context.setFieldValue(
      event.target.name,
      useValue ? event.target.value : checked
    );
  };

  return (
    <FormControl {...formControlProps}>
      <FormLabel {...formLabelProps}>{label}</FormLabel>
      <FormGroup {...formGroupProps}>
        {options.map((option, index) => {
          const isChecked =
            context.getValue(option.name) ===
            (useValue ? option.checkboxProps?.value : true);

          return (
            <FormControlLabel
              {...option.formControlLabelProps}
              key={`Option-${option.name}-${index}`}
              control={
                option.CheckboxComponent ? (
                  <option.CheckboxComponent
                    {...option.checkboxProps}
                    name={option.name}
                    onChange={setFieldValue}
                    checked={isChecked}
                  />
                ) : (
                  <Checkbox
                    {...option.checkboxProps}
                    name={option.name}
                    onChange={setFieldValue}
                    checked={isChecked}
                  />
                )
              }
              label={option.label}
            />
          );
        })}
      </FormGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default observer(FXCheckboxGroup);
