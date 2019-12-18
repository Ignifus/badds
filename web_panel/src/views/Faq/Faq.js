import React from 'react';
import { Typography, Divider } from '@material-ui/core';

export const Faq = props => (
  <div>
    <Typography variant="h3" component="h3">Preguntas Frecuentes</Typography>
    <Divider/>
    <Typography variant="h4">Advertisers</Typography>
    <ol>
      <li>
        <strong>Que es un aviso?</strong><br />
        Un aviso representa el nombre de una pauta. Un aviso puede tener multiples recursos asociados que se mostraran o no segun sus restriciones.
      </li>
      <li>
        <strong>Que es un recurso?</strong><br />
        Un recurso es una imagen asociada a un aviso. Las aplicaciones solicitan publicidad a badds segun pautas preestablecidad. Si el recurso de su aviso es aplicable a un slot, este sera mostrado.
      </li>
      <li>
        <strong>Que es un slot?</strong><br />
        Las aplicaciones tienen secciones exclusivamente dedicadas a mostrar publicidad. Un slot es un espacio en el cual la aplicacion mostrara una imagen publicitaria.
      </li>
      <li>
        <strong>Que es una restriccion?</strong><br />
        Usted puede configurar el target de aplicacion al cual quiere llegar. Eligiendo paises, genero del usuario y banda de edades. Las aplicaciones seleccionaran su aviso, si estas pautas coinciden.
      </li>
      <li>
        <strong>Que es una subasta?</strong><br />
        Las aplicaciones subastan una determinada cantidad de impresiones para un slot o <i>espacio</i>. Usted puede participar de una subasta ingresando en <i>Market Place</i> y eligiendo un aviso.
      </li>
    </ol>
    <Typography variant="h4">Publishers</Typography>
    <ol>
      <li>
        <strong>Que es una Space?</strong><br />
        Luego de registrar su aplicacion, usted debe registrar aquellos slots o <i>espacios publicitarios</i> que desea asociar a badds. Utilizando nuestra API puede obtener publicidad para dichos espacios.
      </li>
      <li>
        <strong>Que es una Restriccion?</strong><br />
        Usted configurara las restricciones del espacio en base a las necesidades de su aplicacion.
      </li>
      <li>
        <strong>Como puedo subastar un espacio?</strong><br />
        Ingrese a su listado de espacios, despliegue el menu de la columna de acciones y seleccione la opcion <i>Subastar Espacio</i>
      </li>
    </ol>
    <Typography variant="h4">Preguntas Comunes</Typography>
    <ol>
      <li>
        <strong>Que es un contrato?</strong><br />
        Luego de finalizada la subasta, Badds seleccionara el precio mas alto y creara un contrato. La app debera cumplir con la cantidad de impresiones en el tiempo pautado.
      </li>
    </ol>
  </div>
)
