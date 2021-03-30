import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import PostLink from '../../src/components/PostLink';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import AlertMessage from '../../src/components/AlertMessage';
import PostForm from '../../src/components/PostForm';
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
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

export default function Posts() {
  const { posts, error, loading } = usePosts();
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // TODO: Add error handling

  if (loading) {
    return <LoadingSpinner />;
  }

  const postList = posts.map((post) => <PostLink key={post.id} id={post.id} title={post.title} />);

  return (
    <div>
      <div className={classes.header}>
        <h1>Posts</h1>
        <a className={classes.link} onClick={openModal}>Create New Post</a>
      </div>
      
      <div>
        {postList}
      </div>

      <PostForm open={isOpen} onClose={closeModal} />
      <AlertMessage />
    </div>
  );
}