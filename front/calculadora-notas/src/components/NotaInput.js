import React from 'react';
import { TextField, Button, Grid } from '@mui/material';
import styles from '../assets/styles/NotaInput.module.css';

const NotaInput = ({ index, nota, handleNotaChange, handleEliminarNota }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5}>
        <TextField
          fullWidth
          margin="normal"
          label={`Nota ${index + 1}`}
          value={nota.nota}
          onChange={(e) => handleNotaChange(index, 'nota', e.target.value)}
          type="number"
          step="0.01"
          InputProps={{ inputProps: { style: { MozAppearance: 'textfield' } } }}
          sx={{
            '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
          }}
        />
      </Grid>
      <Grid item xs={5}>
        <TextField
          fullWidth
          margin="normal"
          label={`%`}
          value={nota.porcentaje}
          onChange={(e) => handleNotaChange(index, 'porcentaje', e.target.value)}
          type="number"
          step="0.01"

        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          className={styles['delete-button']} 
          onClick={() => handleEliminarNota(index)}
        >
          -
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotaInput;
