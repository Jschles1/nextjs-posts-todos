import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardActions, CardActionArea, CardContent, Button, TextField } from '@material-ui/core';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import usePosts from '../../src/data/hooks/usePosts';
import useAlertContext from '../../src/data/hooks/useAlertContext';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  card: {
    margin: '0 auto',
    width: 800,
  },
  headerRoot: {
    padding: theme.spacing(2),
    fontSize: 24,
  },
  inputRoot: {
    width: '100%',
  },
  titleInputText: {
    fontSize: 24,
  },
  bodyInputText: {
    fontSize: 13.3333,
  },
  media: {
    height: 300,
    width: 700,
  },
}));

const Post = () => {
  const { register, handleSubmit, setValue, reset, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    shouldUnregister: false,
  });
  const { query, push } = useRouter();
  const { posts, error, loading, updatePost, deletePost } = usePosts();
  const [_, { setSuccessAlert }] = useAlertContext();
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const id = query.id && parseInt(query.id[0]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!posts) {
    return null;
  }

  const post = posts.find((p) => p.id === id);
  const { title, body } = post;

  const handleEditClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      setValue('title', title);
      setValue('body', body);
    }, 0);
  };

  const handleDeleteClick = async () => {
    await deletePost(id);
    push('/posts');
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    reset();
  };

  const handleOnSubmit = (data) => {
    const { title, body } = data;
    const newPost = { ...post, title, body };
    updatePost(newPost);
    setSuccessAlert('Post Updated!');
    push('/posts');
  };
  
  const cardOptions = () => {
    return isEditing ? (
      <>
        <Button
          color="primary"
          size="small"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>

        <Button
          size="small"
          onClick={handleSubmit(handleOnSubmit)}
        >
          Submit
        </Button>
      </>
    ) : (
      <>
        <Button
          color="primary"
          size="small"
          onClick={handleEditClick}
        >
          Edit
        </Button>

        <Button
          size="small"
          onClick={handleDeleteClick}
        >
          Delete
        </Button>
      </>
    );
  };

  console.log('errors', errors);
  
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader
          component={() => (
            <div className={classes.headerRoot}>
              {isEditing ? (
                <TextField
                  inputRef={register({ required: 'Required Field' })}
                  classes={{ root: classes.inputRoot }}
                  multiline={true}
                  InputProps={{
                    classes: { root: classes.titleInputText },
                  }}
                  name="title"
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                />
              ) : (
                `${title}`
              )}
            </div>
          )}
        />
        <CardActionArea>
          <CardMedia
            image="https://picsum.photos/700/300"
            className={classes.media}
          />
          <CardContent>
            {isEditing ? (
              <TextField
                inputRef={register({ required: 'Required Field' })}
                classes={{ root: classes.inputRoot }}
                multiline={true}
                InputProps={{
                  classes: { root: classes.bodyInputText },
                }}
                name="body"
                error={Boolean(errors.body)}
                helperText={errors.body?.message}
              />
            ) : (
              `${body}`
            )}
          </CardContent>
        </CardActionArea>
        
        <CardActions>
          {cardOptions()}
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;