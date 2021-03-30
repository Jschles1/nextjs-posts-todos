import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogTitle, DialogContent, Button, TextField, FormControl } from '@material-ui/core';
import usePosts from '../../src/data/hooks/usePosts';
import useAlertContext from '../../src/data/hooks/useAlertContext';

const useStyles = makeStyles((theme) => ({
  header: {
    margin: 0,
    fontSize: 24,
  },
  controlRoot: {
    marginBottom: theme.spacing(3),
  },
}));

const PostForm = ({ open, onClose }) => {
  const [_, { setSuccessAlert }] = useAlertContext();

  return <PostFormComponent open={open} onClose={onClose} setSuccessAlert={setSuccessAlert} />;
};

const PostFormComponent = ({ open, onClose, setSuccessAlert }) => {
  const classes = useStyles();
  const { createPost } = usePosts();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    shouldUnregister: false,
  });

  const handleOnSubmit = async (data) => {
    await createPost(data);
    onClose();
    setSuccessAlert('Post Created!');
  };

  return (
    <Dialog 
      open={open}
      onClose={onClose}
      fullWidth
      disableBackdropClick
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle>
        <h1 className={classes.header}>Create Post</h1>
      </DialogTitle>
      
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogContent dividers>
          <FormControl fullWidth classes={{ root: classes.controlRoot }}>
            <TextField
              inputRef={register({ required: 'Required Field' })}
              multiline={true}
              name="title"
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              placeholder="Post Title"
            />
          </FormControl>

          <FormControl fullWidth classes={{ root: classes.controlRoot }}>
            <TextField
              inputRef={register({ required: 'Required Field' })}
              multiline={true}
              name="body"
              error={Boolean(errors.body)}
              helperText={errors.body?.message}
              placeholder="Post Body"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            color="primary"
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            type="submit"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PostForm;