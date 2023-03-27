import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import BasicMenu from './BasicMenu';
import "./forms/app.css"
import { Button } from 'react-bootstrap';

export default function MenuAppBar(props) {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
          <div className='toolbar'>
            <h5 style={{"textAlign": "center"}}><BasicMenu userID={props.userID} className="0 menu-item" text="Master"/></h5>
            <h5 style={{"textAlign": "center"}}><BasicMenu userID={props.userID} className="1 menu-item" text="Vehicle Valuation"/></h5>
            <h5 style={{"textAlign": "center"}}><BasicMenu userID={props.userID} className="2 menu-item" text="Property Valuation"/></h5>
            <h5 style={{"textAlign": "center"}}><BasicMenu userID={props.userID} className="3 menu-item" text="Billing"/></h5>
            <h5 style={{"textAlign": "center"}}><BasicMenu userID={props.userID} page={'report'} className="4 menu-item" text="Report"/></h5>
            {
              props.userID == "true" ? <Button onClick={() => props.logout()} style={{marginLeft: "45%", marginBottom: "0.4%",background: "#1976d2",fontSize: "15px"}}>Log out</Button> : ""
            }
          </div>
        </AppBar>
    </Box>
          //{auth && (
            //<div>
              /* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> */
              /* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu> */
            //</div>
          //)}
      
  );
}