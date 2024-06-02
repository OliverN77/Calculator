import React, { useState } from 'react';
import { Container, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ConfiguracionModal from './components/ConfiguracionModal';
import NotaInput from './components/NotaInput';
import './assets/styles/App.css';

const App = () => {
  const [notas, setNotas] = useState([
    { nota: '', porcentaje: '' },
    { nota: '', porcentaje: '' },
    { nota: '', porcentaje: '' },
  ]);
  const [promedio, setPromedio] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [config, setConfig] = useState({
    notaMinima: '',
    notaAprobar: '',
    notaMaxima: '',
    notaDeseada: '',
  });
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfigChange = (e) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const handleGuardarConfiguracion = () => {
    setModalOpen(false);
  };

  const agregarNota = () => {
    setNotas([...notas, { nota: '', porcentaje: '' }]);
  };

  const handleNotaChange = (index, fieldName, value) => {
    const newNotas = [...notas];
    newNotas[index][fieldName] = value;
    setNotas(newNotas);
  };

  const handleEliminarNota = (index) => {
    const nuevasNotas = notas.filter((_, i) => i !== index);
    setNotas(nuevasNotas);
  };

  const calcularPromedio = () => {
    setError('');
    const notaMaxima = parseFloat(config.notaMaxima);
    const sumaPorcentajes = notas.reduce((acc, { porcentaje }) => acc + parseFloat(porcentaje || 0), 0);

    if (sumaPorcentajes !== 100) {
      setError(`Error: La suma de los porcentajes debe ser exactamente 100%. Actualmente es ${sumaPorcentajes}%`);
      return;
    }

    for (const { nota } of notas) {
      if (parseFloat(nota) > notaMaxima) {
        setError(`Error: La nota ${nota} supera la nota máxima permitida de ${notaMaxima}`);
        return;
      }
    }

    const sumaPonderada = notas.reduce((acc, { nota, porcentaje }) => acc + (parseFloat(nota || 0) * parseFloat(porcentaje || 0) / 100), 0);
    setPromedio(sumaPonderada);
    setDialogOpen(true); // Abre el diálogo
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" className="container">
      <Typography variant="h4" className="h1" gutterBottom>
        Calculadora de Notas
      </Typography>
      <Button variant="contained" onClick={handleOpenModal} className="button">
        Abrir Configuración
      </Button>
      <ConfiguracionModal
        open={modalOpen}
        handleClose={handleCloseModal}
        config={config}
        handleConfigChange={handleConfigChange}
        handleGuardarConfiguracion={handleGuardarConfiguracion}
      />
      <Box my={4}>
        <Typography variant="h6" className="h2">Ingresar Notas</Typography>
        {notas.map((nota, index) => (
          <NotaInput
            key={index}
            index={index}
            nota={nota}
            handleNotaChange={handleNotaChange}
            handleEliminarNota={handleEliminarNota}
          />
        ))}

        <Button variant="contained" onClick={agregarNota} className="add-button">
          Agregar Nota
        </Button>

        <Button variant="contained" onClick={calcularPromedio} className="button">
          Calcular Promedio
        </Button>
        {error && (
          <Typography variant="body1" className="error-message" my={2}>
            {error}
          </Typography>
        )}
      </Box>
        
      <Dialog open={dialogOpen} onClose={handleCloseDialog} className='promedio'>
        <DialogTitle>Resultado</DialogTitle>
        <DialogContent>
          <Typography variant="h6">El promedio es: {promedio.toFixed(2)}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} className="button">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
