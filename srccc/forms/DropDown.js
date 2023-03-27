import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function DropDown(props) {
  const [age, setAge] = React.useState('');
  const [dropVals, setDropVals] = React.useState([]);

  const handleChange = (event) => {
    props.handleOption(props.label);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          value={dropVals[props.label]}
          label={props.label}
          className={`form1 dropdown ${(props.label).split(" ").join("-").toLowerCase()}`}
          onChange={handleChange}
        >
          {props.options.map(i => {
            return <MenuItem value={i}>{i}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}


// export default function DropDown(props) {
//   const [dropData, setdropData] = React.useState({});

//   const handleChange = (event) => {
//     dropData[props.label] = event.target.value;
//     setdropData(dropData);
//     props.handleOption(props.label,event.target.value);
//   };

//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id={props.label}
//           // value={props.label == "Intimation Contact Number" ? props.val : dropData[props.label] }
//           value={props.label}
//           label={props.label}
//           // onChange={handleChange}
//           className = "form1 dropdown"
//         >
//         {props.options.map(i => {
//           return <MenuItem key={i} value={i}>{i}</MenuItem>
//         })}
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

// height: 35px;
// border: #bdbdbd solid 0.5px
// px
// ;
// border-radius: 0.25rem;