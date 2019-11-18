import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  orangeAvatar: {
    width: 60,
    height: 60,
    backgroundColor: "orange"
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: 'Patricio Napoli',
    avatar: null,
    bio: 'Brain Director'
  };

  let avatar = (<Avatar
      alt="Person"
      className={classes.orangeAvatar}
      component={RouterLink}
      to="/settings"
    >{user.name.split(" ").map(name => name[0]).join("")}</Avatar>);

  if (user.avatar != null) {
    avatar = (<Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />)
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {avatar}
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
