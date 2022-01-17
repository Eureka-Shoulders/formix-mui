import {
  Switch,
  SwitchProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
} from '@mui/material';

export type BaseSwitchProps = {
  label?: string;
  formControlLabelProps?: FormControlLabelProps;
  formGroupProps?: FormGroupProps;
  formControlProps?: FormControlProps;
  helperText?: string;
} & SwitchProps;

const BaseSwitch = ({
  label,
  formControlLabelProps,
  formGroupProps,
  formControlProps,
  helperText,
  ...props
}: BaseSwitchProps) => {
  if (label) {
    return (
      <FormControl {...formControlProps}>
        <FormGroup {...formGroupProps}>
          <FormControlLabel
            {...formControlLabelProps}
            control={<Switch {...props} />}
            label={label}
          />
        </FormGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
  return <Switch {...props} />;
};

export default BaseSwitch;
