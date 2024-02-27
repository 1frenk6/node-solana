import * as React from 'react';
import Button from '@mui/material/Button';
import { ButtonProps } from '@mui/base';

interface ButtonUsageInterface {
  className?: string,
  children?: React.ReactNode;

  props?: ButtonProps;
}

// Occhio alle props, ts è typizzato: le props di Button usage sono: className, childre en props. I tipi sono definiti sopra in ButtonUsageInterface.
// Le props, in questo caso, sono in realtà un oggetto, infatti sono wrappate da due parentesi graffe: {...}:
// {
//   className,
//     children,
//   ...props
// }
export const ButtonUsage = ({
  className,
  children,
  ...props
}: ButtonUsageInterface) => {
  // In questo esempio noterai due cose particolari: ...props e children. Se non sai cosa sono lo spiego nel ButtonAsSample2
  return <Button variant="contained" className={className} {...props}>{children}</Button>;
}

// Se vuoi vedere le props senza la destructuring dell'oggetto, è qualcosa tipo: 
export const ButtonAsSample = (props: ButtonUsageInterface) => {
  return <Button variant="contained" className={props.className} {...props}>{props.children}</Button>;
}

// La prima componente quindi usa l'object destructuration (non so manco se si scrive così)
export const ButtonAsSample2 = (props: ButtonUsageInterface) => {
  const { className, children, ...extraProps } = props;
  // Perché qui lo hai chiamato "extraProps?", perché in questo caso il nome "props" è già definito dall'attributo della funzione.
  // Ma quindi cosa sono quei 3 puntini? I tre puntini si chiamano "spread operator" e serve (IN QUESTO CASO) a "tirare fuori" tutte le proprietà dell'oggetto che sono "rimaste" dentro.
  // Cos'è "children" -> Come è definito dall'interfaccia ButtonUsageInterface children è un React.ReactNode ovvero un nodo della componente. Banalmente è la component child del parent
  return <Button variant="contained" className={className} {...extraProps}>{children}</Button>;
}