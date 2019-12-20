import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, CircularProgress } from '@material-ui/core';
import { AppDuck } from 'duck';

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

const ProfileBase = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const user = props.profile[0];

  if (user == null) return (
    <div
      className={clsx(classes.root, className)}
    >
      <CircularProgress style={{width: '100px', height: '100px'}} />
    </div>
  );

  let avatar = (<Avatar
      alt="Person"
      className={classes.orangeAvatar}
      component={"a"}
      href="/account"
    >{user.first_name[0]} {user.last_name[0]}</Avatar>);

  if (user.avatar != null) {
    avatar = (<Avatar
        alt="Person"
        className={classes.avatar}
        component={"a"}
        src={user.avatar}
        href="/account"
      />)
  }

  return (
    <div
      className={clsx(classes.root, className)}
    >
      {avatar}
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body2">{user.email}</Typography>
    </div>
  );
};

ProfileBase.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
  profile: AppDuck.selectors.getUsers(state)
});

const Profile = connect(mapStateToProps)(ProfileBase);

export default Profile;
