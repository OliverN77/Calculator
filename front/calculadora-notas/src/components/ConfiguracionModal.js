import React from 'react';
import { Modal, Backdrop, Fade, Box, TextField, Button, Typography } from '@mui/material';
import styles from '../assets/styles/ConfiguracionModal.module.css';

const ConfiguracionModal = ({ open, handleClose, config, handleConfigChange, handleGuardarConfiguracion }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#dfdfdd',
          boxShadow: 21,
          p: 4,
          minWidth: 300,
          maxWidth: 500,
        }}>
          <Typography variant="h6" className={styles['h1']}>Configuración</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Nota mínima"
            name="notaMinima"
            value={config.notaMinima}
            onChange={handleConfigChange}
            type="number"
            step="0.01"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nota mínima para aprobar"
            name="notaAprobar"
            value={config.notaAprobar}
            onChange={handleConfigChange}
            type="number"
            step="0.01"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nota máxima"
            name="notaMaxima"
            value={config.notaMaxima}
            onChange={handleConfigChange}
            type="number"
            step="0.01"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nota deseada"
            name="notaDeseada"
            value={config.notaDeseada}
            onChange={handleConfigChange}
            type="number"
            step="0.01"
          />
          <Button 
            variant="contained" 
            className={styles['save-button']} 
            onClick={handleGuardarConfiguracion}
          >
            Guardar Configuración
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfiguracionModal;
