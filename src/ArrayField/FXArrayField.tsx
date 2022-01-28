import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';

import { useArrayField } from '@euk-labs/formix';

export type FieldsOptions = {
  name: string;
  label: string;
  gridSize: number;
  component: (props: any) => React.ReactElement;
  componentProps?: any;
};

export type FXArrayFieldProps = {
  name: string;
  divider?: boolean;
  spacing?: number;
  label?: string;
  newFieldInitialProps: any;
  fields: FieldsOptions[];
  AddComponent: (props: any) => React.ReactElement;
};

const FXArrayField = ({
  divider,
  name,
  spacing,
  label,
  newFieldInitialProps,
  AddComponent,
  fields,
}: FXArrayFieldProps) => {
  const { values, helpers } = useArrayField(name);
  const isLastItem = (index: number) => index === values.length - 1;

  return (
    <Grid container spacing={spacing || 2}>
      {values.map((_, index) => (
        <Fragment key={`${name}-${index}`}>
          <Grid item xs={12} display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" fontWeight="bold">
              {label} {index + 1}
            </Typography>

            <IconButton onClick={() => helpers.remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          {fields.map((field, index) => (
            <>
              <Grid item xs={field.gridSize} key={`${name}-field-${index}`}>
                <field.component
                  {...field.componentProps}
                  name={`${name}.${index}.${field.name}`}
                  label={field.label}
                />
              </Grid>
            </>
          ))}
          {!isLastItem(index) && divider && (
            <Grid item xs={12}>
              <Divider />
            </Grid>
          )}
        </Fragment>
      ))}
      <AddComponent onClick={() => helpers.push(newFieldInitialProps)} />
    </Grid>
  );
};

export default observer(FXArrayField);
