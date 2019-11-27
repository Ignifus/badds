import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  CheckCircle,
  Error,
  Info,
  Close,
  Warning
} from '@material-ui/icons';
import {
  IconButton,
  Snackbar,
  SnackbarContent
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  success: {
    backgroundColor: 'green',
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: 'darkorange'
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export const FailedSnackbar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true)

  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={open} autoHideDuration={5000}
      onClose={() => setOpen(false)}
    >
      <SnackbarContent
        message={
          <span className={classes.message}>
            <Error className={classes.icon} />
              {props.message}
          </span>
        }
        className={classes.error}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
            <Close className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>);
}

export const SuccessSnackbar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true)

  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={open} autoHideDuration={5000}
      onClose={() => setOpen(false)}
    >
      <SnackbarContent
        message={
          <span className={classes.message}>
            <CheckCircle className={classes.icon} />
              {props.message}
          </span>
        }
        className={classes.success}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
            <Close className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>);
}

export const WarningSnackbar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true)

  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={open} autoHideDuration={5000}
      onClose={() => setOpen(false)}
    >
      <SnackbarContent
        message={
          <span className={classes.message}>
            <Warning className={classes.icon} />
              {props.message}
          </span>
        }
        className={classes.warning}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
            <Close className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>);
}

export const InfoSnackbar = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true)

  return (
    <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={open} autoHideDuration={5000}
      onClose={() => setOpen(false)}
    >
      <SnackbarContent
        message={
          <span className={classes.message}>
            <Info className={classes.icon} />
              {props.message}
          </span>
        }
        className={classes.info}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
            <Close className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>);
}
