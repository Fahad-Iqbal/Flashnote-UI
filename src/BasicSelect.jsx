import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGlobalContext } from './context';

export default function BasicSelect({ docIdFilter, setDocIdFilter }) {
  const [docList, setDocList] = useState([]);
  const { state, flashcards } = useGlobalContext();

  const handleChange = (event) => {
    setDocIdFilter(event.target.value);
  };

  useEffect(() => {
    const list = [];
    const uniqueList = new Set();
    for (let flashcard of flashcards) {
      if (!uniqueList.has(flashcard.documentId)) {
        uniqueList.add(flashcard.documentId);
        list.push({ id: flashcard.documentId, title: flashcard.documentTitle });
      }
    }

    setDocList(list);
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          className="select"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={docIdFilter}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value={'All'}>All</MenuItem>
          {docList.map((doc) => {
            const { id, title } = doc;
            return (
              <MenuItem key={id} value={id}>
                {title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
