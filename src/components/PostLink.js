import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: theme.spacing(1),
  },
  id: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '100%',
    padding: '5px 12px',
    marginRight: theme.spacing(1),
    fontSize: 18,
  },
  link: {
    color: theme.palette.primary.main,
    fontSize: 16,
  },
}));

const PostLink = ({ title, id }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.id}>{id}</div>
      <Link href={`/posts/${id}`}>
        <a className={classes.link}>
          {title}
        </a>
      </Link>
    </div>
    
  );
};

export default PostLink;