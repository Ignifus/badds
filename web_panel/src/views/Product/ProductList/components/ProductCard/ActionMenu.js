import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = [
  { id: 'Update', value: 'Actualizar' },
  { id: 'Delete', value: 'Borrar' },
  { id: 'Detail', value: 'Ver Detalle' }
];

const ITEM_HEIGHT = 48;

export function ActionMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selectedAction) => {
    const {onActionSelected} = props;
    onActionSelected(selectedAction);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map(option => (
          <MenuItem key={option.id} selected={option.id === ''} onClick={() => handleClose(option.id) }>
            {option.value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

ActionMenu.propTypes = {
  onActionSelected: PropTypes.func.isRequired
}
