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

export type BaseCheckboxProps = {
  label?: string;
  formControlLabelProps?: FormControlLabelProps;
  formGroupProps?: FormGroupProps;
  formControlProps?: FormControlProps;
  helperText?: string;
} & CheckboxProps;

const BaseCheckbox = ({
  label,
  formControlLabelProps,
  formGroupProps,
  formControlProps,
  helperText,
  ...props
}: BaseCheckboxProps) => {
  if (label) {
    return (
      <FormControl {...formControlProps}>
        <FormGroup {...formGroupProps}>
          <FormControlLabel
            {...formControlLabelProps}
            control={<Checkbox {...props} />}
            label={label}
          />
        </FormGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
  return <Checkbox {...props} />;
};

export default BaseCheckbox;
