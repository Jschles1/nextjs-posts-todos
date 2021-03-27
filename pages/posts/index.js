import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import PostLink from '../../src/components/PostLink';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import AlertMessage from '../../src/components/AlertMessage';
import usePosts from '../../src/data/hooks/usePosts';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  link: {
    color: theme.palette.primary.main,
    fontSize: 16,
  },
}));

export default function Posts() {
  const { posts, error, loading } = usePosts();
  const classes = useStyles();

  // TODO: Add error handling

  if (loading) {
    return <LoadingSpinner />;
  }

  const postList = posts.map((post) => <PostLink key={post.id} id={post.id} title={post.title} />);

  return (
    <div>
      <div className={classes.header}>
        <h1>Posts</h1>

        <Link href="/posts/create">
          <a className={classes.link}>Create New Post</a>
        </Link>
      </div>
      
      <div>
        {postList}
      </div>

      <AlertMessage />
    </div>
  );
}