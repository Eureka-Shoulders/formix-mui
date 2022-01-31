import {
  Box,
  CircularProgress,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

import { useField } from '@euk-labs/formix';

type CurrentFile = {
  src: string;
  title: string;
};

type FeedbackProps = {
  title?: string;
  src?: string;
  loading?: boolean;
};

type FXDropZoneProps = {
  accept?: string;
  multiple?: boolean;
  name: string;
  disabled?: boolean;
  processFiles: (files: File[]) => Promise<CurrentFile[]>;
  fileMaxSize?: number;
  feedbackProps?: FeedbackProps;
};

const DropzoneUploadingMessage = () => (
  <Grid container spacing={2} justifyContent="center" alignItems="center">
    <Grid item xs="auto">
      <CircularProgress size={25} />
    </Grid>
    <Grid item xs="auto">
      <Typography variant="body1">Enviando o(s) arquivo(s)</Typography>
    </Grid>
  </Grid>
);

const ImageFeedback = ({
  title = 'Clique para anexar ou arraste o(s) arquivo(s)',
  src,
  loading,
}: FeedbackProps) => {
  return (
    <Box padding={4}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        sx={{ height: '100%', width: '100%' }}
      >
        {src && (
          <Grid item xs={4}>
            <img src={src} width="100%" alt="aguarde" />
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            {title}
          </Typography>
        </Grid>
      </Grid>
      {loading && <DropzoneUploadingMessage />}
    </Box>
  );
};

const FXDropZone = ({
  accept = 'image/*,video/*',
  multiple,
  name,
  processFiles,
  fileMaxSize = 4000000,
  feedbackProps,
  ...props
}: FXDropZoneProps) => {
  const { helpers, meta } = useField(name);

  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invalidSize, setInvalidSize] = useState(false);

  const isAllFileSizeValid = (files: File[], maxSize: number) => {
    const isInvalidSize = files.some((file) => file.size > maxSize);

    return !isInvalidSize;
  };

  const onChange = async (files: File[]) => {
    setLoading(true);
    if (!files) return;
    const isValid = fileMaxSize && isAllFileSizeValid(files, fileMaxSize);
    setInvalidSize(!isValid);
    if (!isValid) {
      setLoading(false);
      return;
    }
    const processedFiles = await processFiles(files);
    if (processedFiles) {
      helpers.setValue(processedFiles);
    }
    setLoading(false);
  };

  return (
    <>
      <Dropzone
        {...props}
        accept={accept}
        onDropAccepted={(files) => onChange(files)}
        multiple={multiple}
        onDrop={() => setDrag(false)}
        onDragEnter={() => setDrag(true)}
        onDragLeave={() => setDrag(false)}
      >
        {({ getRootProps, getInputProps }) => (
          <Box
            {...getRootProps()}
            sx={{
              cursor: 'pointer',
              borderWidth: 2,
              borderStyle: 'dashed',
              borderColor: drag ? 'primary.main' : 'primary.light',
              borderRadius: 1,
              '&:hover': {
                borderColor: 'primary.main',
              },
            }}
          >
            <input {...getInputProps()} />
            <Box p={1}>
              <ImageFeedback loading={loading} {...feedbackProps} />
            </Box>
            {invalidSize && (
              <Box marginLeft={1}>
                <Typography variant="caption" color="error">
                  Selecione arquivo
                  {multiple ? 's' : ''} com até{' '}
                  {Math.floor(fileMaxSize / 1000000)}
                  MB
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Dropzone>
      {meta.touched && meta.error && (
        <FormHelperText error>{meta.error}</FormHelperText>
      )}
    </>
  );
};

export default observer(FXDropZone);
