import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Radio,
  RadioGroup,
  RadioGroupProps,
  RadioProps,
} from '@mui/material';

export interface IRadioOption {
  name: string;
  label: string;
  radioProps?: RadioProps;
  formControlLabelProps?: FormControlLabelProps;
}

export type BaseRadioGroupProps = {
  helperText?: string;
  label?: string;
  radioGroupProps?: RadioGroupProps;
  formLabelProps?: FormLabelProps;
  formControlProps?: FormControlProps;
  options: IRadioOption[];
};

const BaseRadioGroup = ({
  helperText,
  label,
  radioGroupProps,
  formLabelProps,
  formControlProps,
  options,
}: BaseRadioGroupProps) => {
  return (
    <FormControl {...formControlProps}>
      <FormLabel {...formLabelProps}>{label}</FormLabel>
      <RadioGroup {...radioGroupProps}>
        {options.map((option, index) => (
          <FormControlLabel
            {...option.formControlLabelProps}
            value={option.name}
            key={`Option-${option.name}-${index}`}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default BaseRadioGroup;
