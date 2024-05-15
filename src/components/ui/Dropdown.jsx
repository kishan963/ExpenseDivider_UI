
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ApiCalls from '@/Api/ApiCalls';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({GroupId, selectedNames, onNameChange }) {
  const theme = useTheme();
  const [tags, setTags] = useState([]);
  
  const fetchData = async () => {
    if(GroupId==null){
    try {
      const response = await ApiCalls.GetAllUserHandler();
      setTags(response); // Set the fetched data in the state
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }else {
    try {
      const response = await ApiCalls.GetGroupHandler(GroupId);
      setTags(response.Users); // Set the fetched data in the state
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedNames}
          onChange={onNameChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {tags.map((tag) => (
            <MenuItem
              key={tag.Id}
              value={tag}
              style={getStyles(tag.Username, selectedNames, theme)}
            >
              {tag.Username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

// Prop types validation
MultipleSelect.propTypes = {
  GroupId: PropTypes.number,
  selectedNames: PropTypes.array.isRequired,
  onNameChange: PropTypes.func.isRequired,
};
