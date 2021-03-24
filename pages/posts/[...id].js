import { useRouter } from 'next/router';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardActions, CardActionArea, CardContent, Button } from '@material-ui/core';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import usePosts from '../../src/data/hooks/usePosts';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
  },
  card: {
    margin: '0 auto',
    width: 700,
  },
  media: {
    height: 300,
    width: 700,
  }
}));

const Post = () => {
  const { query } = useRouter();
  const { posts, error, loading } = usePosts();
  const classes = useStyles();
  console.log('q', query);
  const id = query.id && parseInt(query.id[0]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const post = posts.find((p) => p.id === id);
  const { title, body } = post;
  
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title={title} />
        <CardActionArea>
          <CardMedia
            image="https://picsum.photos/700/300"
            className={classes.media}
          />
          <CardContent>
            {body}
          </CardContent>
        </CardActionArea>
        
        <CardActions>
          <Button
            color="primary"
            size="small"
          >
            Edit
          </Button>

          <Button
            color="error"
            size="small"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;