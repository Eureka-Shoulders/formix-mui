import { LoadingButton } from '@mui/lab';
import { ButtonProps } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { useFormixContext } from '@euk-labs/formix';

type FXSubmitButtonProps = {
  label: string;
} & ButtonProps;

function FXSubmitButton({ label, ...props }: FXSubmitButtonProps) {
  const formix = useFormixContext();

  return (
    <LoadingButton
      {...props}
      loading={formix.isSubmitting}
      disabled={formix.isSubmitting || !formix.isValid}
      variant="contained"
      type="submit"
    >
      {label}
    </LoadingButton>
  );
}

export default observer(FXSubmitButton);
