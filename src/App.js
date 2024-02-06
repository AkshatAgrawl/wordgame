import React, { useState,} from 'react';
import Button from './components/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
function App() {

  const [clickedButtonsString, setClickedButtonsString] = useState('');
  const [clearedCheckpoints, setClearedCheckpoints] = useState(1);

  

  const handleButtonClick = (buttonText) => {
    if (buttonText !== 'OK') {
      console.log(`${buttonText} Button Clicked!`);
      setClickedButtonsString((prevString) => prevString + buttonText);
      // Add your custom logic here
    }
  };
  console.log('Starting checkpoint',clearedCheckpoints);
  const handleOkButtonClick = async () => {
    console.log('OK Button Clicked!');
    console.log('String is',clickedButtonsString);
    try {
      const response = await axios.post('http://localhost:3001/validate-word', {
        word: clickedButtonsString,
      });

      const data = response.data;

      if (data.isValid) {
        console.log('Valid word!');
        setClearedCheckpoints((prev) => (prev % 5) + 1);
        // Continue with your logic for a valid word
      } else {
        console.log('Invalid word!');
        setClearedCheckpoints(1);
        // Handle the case where the word is not valid
      }
    } catch (error) {
      console.error('Error validating word:', error);
      // Handle the error
    }
    console.log('ok button',clearedCheckpoints);
    setClickedButtonsString('');
    // Add your custom logic for the OK button here
  };

  // console.log('After the button',clearedCheckpoints);
if(clearedCheckpoints===5)
{
  setTimeout(() => {
    setClearedCheckpoints(1);
  }, 2000); 
}

const surroundingButtons = [
  { text: 'A', backgroundColor: '#ff6f61', hoverColor: '#d8433e', textColor: '#ffffff' },
  { text: 'B', backgroundColor: '#70a1ff', hoverColor: '#4d79ff', textColor: '#ffffff' },
  { text: 'C', backgroundColor: '#ffd166', hoverColor: '#cca300', textColor: '#ffffff' },
  { text: 'D', backgroundColor: '#45aaf2', hoverColor: '#2e8af4', textColor: '#ffffff' },
  { text: 'E', backgroundColor: '#55efc4', hoverColor: '#00b894', textColor: '#ffffff' },
];

  return (
    <Grid container disableGutters justifyContent="center" alignItems="center">
<Grid item xs={12} container justifyContent="space-between"sx={{height:'10vh'}}>
        {[1, 2, 3, 4, 5].map((checkpoint) => (
          <Grid key={checkpoint} item>
            <Box
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: checkpoint <= clearedCheckpoints ? 'green' : 'gray',
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            borderTop: '2px solid green',
            width: `${(clearedCheckpoints) * 25-25}%`, // Adjust based on the percentage of cleared checkpoints
            transition: 'width 2s',
            marginTop: '10px', // Adjust the margin as needed
          }}
        />
      </Grid>
      <Grid item md={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <Box
        sx={{
          border: '2px solid #fd79a8',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: '#fab1a0',
          background: 'linear-gradient(to right, #fd79a8, #ffeaa7)', // Gradient background
          textAlign: 'center',
          height:20,
          width:100,
          overflowX: 'auto',
          overflowY:'hidden',
          '&::-webkit-scrollbar': {
            width: '0px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#fd79a8',
            borderRadius: '1px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#fab1a0',
          },
        }}
      >
        <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#234' }}>
           {clickedButtonsString}
        </p>
      </Box>
</Grid>  
      <Grid item md={3} lg={3} xs={3} container sx={{justifyContent:"center",alignItems:"center",m:1}}>
         {surroundingButtons.map((button, index) => (
          <Grid container disableGutters item md={3} lg={3} xs={3}sx={{minWidth:100,ml:1}}>
          <Button
            text={button.text}
            backgroundColor={button.backgroundColor}
            hoverColor={button.hoverColor}
            textColor={button.textColor}
            onClick={() => handleButtonClick(button.text)}
            sx={{ // Make the button circular
             // Distribute buttons in a circle
          // Inside the map function for surroundingButtons
          // Inside the map function for surroundingButtons
        p:0
               
        }}    /> 
        </Grid>         
      ))}
      <Grid item md={12} lg={12} xs={12}container sx={{justifyContent:"center",alignItems:"center"}}>     <Button
          text="OK"
          backgroundColor="#3498db"
          hoverColor="#2980b9"
          textColor="#ffffff"
          onClick={handleOkButtonClick}
        />
        </Grid>

   </Grid>
    
    </Grid>
  );
}

export default App;
