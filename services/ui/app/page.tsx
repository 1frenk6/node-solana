'use client'
import React from 'react';
import { ButtonUsage } from '@ui/Button';
import { Chip } from '@mui/material';

/**
 * Questa pagina renderizza un Button che si trova in: ../../../components/ui/Button/ButtonUsage -> @ui/Button
 * E' una componente MUI: https://mui.com/material-ui/getting-started/usage/
 * Questo link è un esempio di utilizzo, tutte le componenti le trovi qui: https://mui.com/material-ui/all-components/
 * Nello specifico la componente Button è qui: https://mui.com/material-ui/react-button/
 */
export default function Page() {
  /** Qui nel classname sto usando tailwind: https://tailwind.build/classes
   * esempio Background color: https://tailwind.build/classes/background-color/bg-red-800
  */
  return <ButtonUsage className="bg-red-800 w-auto h-32">
    {/* Qui ci sono i children che può essere qualsiasi componente */}
    <p>Ciaone</p>
    {/* Qui inserisco un altro child, però a questo giro uso del css in line */}
    <p style={{ color: 'blue' }}>finito</p>
    {/* Qui inserisco un altro child, però a questo giro uso una componente di MUI */}
    {/* anche qui uso del css in line, da notare che la prop si chiama "sx" e non "style"*/}
    <Chip sx={{ color: 'blue' }} label="Label chip" />
  </ButtonUsage>
}