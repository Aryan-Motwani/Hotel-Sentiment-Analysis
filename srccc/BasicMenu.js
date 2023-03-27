import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { menu_data } from './Menu-data';
import "./menu.css"

export default function BasicMenu(props) {
  const [menuItems,setMenuItems] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event.target.textContent);
    document.querySelectorAll("button").forEach(i => {
      if(i.textContent == event.target.textContent)
        i.style.background = "#005cb8";
    })
    submenu = (menu_data[props.text].map(i => <MenuItem onClick={handleMenuClick}>{i}</MenuItem>))
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    document.querySelectorAll("button").forEach(i => {
      if(i.textContent != "Log out")
        i.style.background = "";
    })
    setAnchorEl(null);
  };
  
  const handleMenuClick = (e) => {
    console.log(e.target.textContent);
  }

  const handleMenu = (i) => {
    if(props.userID ==  "true"){
      if(i == "Schedule")
        if(props.text == "Vehicle Valuation")
          window.location.pathname = "Vehicle Valuation/Schedule"
        else
          window.location.pathname = "Property Valuation/Schedule"
      else{
        if(i == "Employee")
          window.location.pathname = "/Employee"  
        else
          window.location.pathname = props.page != "report" ? `/Table/`+props.text+'/'+i : `/${i}`;
      }
    }
  }

  let submenu = (menu_data[props.text].map(i =><MenuItem onClick={() => handleMenu(i)}>{i}</MenuItem>))
  // let submenu = (menu_data[props.text].map(i =><Link to={props.userID !=  "" && props.page != "report" ? `/Table/`+props.text+'/'+i : `/${i}`}><MenuItem>{i}</MenuItem></Link>))
  

  return (
    <div>
      <Button
        id="basic-button"
        variant='primary'
        sx={{ color: "white" , fontSize: "15px"}}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.text}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {submenu}
      </Menu>
    </div>
  );
}