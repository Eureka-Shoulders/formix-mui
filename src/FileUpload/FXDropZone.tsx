import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { useField } from '@euk-labs/formix';
import { Delete } from '@mui/icons-material';

type FXDropZoneProps = {
  accept?: string;
  multiple?: boolean;
  name: string;
  disabled?: boolean;
  label: string;
};

type FileItemProps = {
  file: File;
  remove: () => void;
};

const FileItem = ({ file, remove }: FileItemProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Grid
      item
      key={file.name}
      xs={4}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      position="relative"
      onClick={(e) => e.stopPropagation()}
    >
      <Paper>
        <Box
          p={2}
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {isHovering && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
              }}
              aria-label="delete"
              onClick={remove}
            >
              <Delete />
            </IconButton>
          )}

          <FilePresentIcon sx={{ fontSize: 56 }} />

          <Typography align="center" variant="body2">
            {file.name}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
};

const FXDropZone = ({
  accept = 'image/*,video/*',
  multiple,
  name,
  label,
  ...props
}: FXDropZoneProps) => {
  const { field, helpers, meta } = useField<File[]>(name);
  const [drag, setDrag] = useState(false);

  const onChange = async (files: File[]) => {
    if (!files) return;
    if (!multiple) {
      return helpers.setValue(files);
    }

    const newFiles = [...field.value];

    files.forEach((file) => {
      if (newFiles.some((f) => f.name === file.name)) return;
      newFiles.push(file);
    });

    return helpers.setValue(newFiles);
  };

  const remove = (index: number) => {
    const newFiles = [...field.value];
    newFiles.splice(index, 1);
    helpers.setValue(newFiles);
  };

  return (
    <>
      <Dropzone
        {...props}
        accept={accept}
        onDropAccepted={onChange}
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
            <Grid
              container
              spacing={2}
              alignItems="center"
              height="100%"
              width="100%"
              p={4}
            >
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  {label}
                </Typography>
              </Grid>

              {field.value.map((file, index) => (
                <FileItem
                  key={file.name}
                  file={file}
                  remove={() => remove(index)}
                />
              ))}
            </Grid>
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
