import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Logo from '../logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    maxWidth: 1440,
    margin: '0 auto',
  },
  logoContainer: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    marginRight: theme.spacing(3),
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  links: {
    marginLeft: 'auto',
    fontSize: 18,
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
  },
  logo: {
    'height': 50,
    'pointerEvents': 'none',
    'display': 'block',
    '@media (prefers-reduced-motion: no-preference)': {
      animation: '$App-logo-spin infinite 20s linear',
    },
  },
  '@keyframes App-logo-spin': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    }
  },
}));

const Header = (props) => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.flexContainer}>
        <div className={classes.logoContainer}>
          <Logo className={classes.logo} />
        </div>

        <div className={classes.headerText}>JSON Placeholder</div>

        <div className={classes.links}>
          <Link href="/posts">
            <a className={classes.link}>Posts</a>
          </Link>

          <Link href="/todos">
            <a className={classes.link}>Todos</a>
          </Link>
        </div>
      </div>
      
    </header>
  )
};

export default Header;