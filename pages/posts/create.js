import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, TextField, FormControl } from '@material-ui/core';
import usePosts from '../../src/data/hooks/usePosts';
import useAlertContext from '../../src/data/hooks/useAlertContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  card: {
    margin: '0 auto',
    width: 800,
    padding: theme.spacing(2),
    '& h1': {
      marginTop: 0,
      marginBottom: theme.spacing(2),
    },
  },
  controlRoot: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Create() {
  const classes = useStyles();
  const { createPost } = usePosts();
  const [_, { setSuccessAlert }] = useAlertContext();
  const { push } = useRouter();
  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    shouldUnregister: false,
  });

  const handleOnSubmit = async (data) => {
    await createPost(data);
    setSuccessAlert('Post Created!');
    push('/posts');
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit(handleOnSubmit)}>
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

          <Button
            variant="contained"
            type="submit"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};