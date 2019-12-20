import React from 'react';
import { Typography, Divider, List, ListItem, ListItemText } from '@material-ui/core';

export const Faq = props => (
  <div>
    <Typography variant="h3" component="h3">Preguntas Frecuentes</Typography>
    <Divider/>
    <Typography variant="h4">Advertisers</Typography>
    <List>
      <ListItem>
        <ListItemText
          primary="Que es un aviso?"
          secondary="Un aviso representa el nombre de una pauta. Un aviso puede tener multiples recursos asociados que se mostraran o no segun sus restriciones."
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Que es un recurso?"
          secondary="Un recurso es una imagen asociada a un aviso. Las aplicaciones solicitan publicidad a badds segun pautas preestablecidad. Si el recurso de su aviso es aplicable a un slot, este sera mostrado."
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Que es un slot?"
          secondary="Las aplicaciones tienen secciones exclusivamente dedicadas a mostrar publicidad. Un slot es un espacio en el cual la aplicacion mostrara una imagen publicitaria."
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Que es una restriccion?"
          secondary="Usted puede configurar el target de aplicacion al cual quiere llegar. Eligiendo paises, genero del usuario y banda de edades. Las aplicaciones seleccionaran su aviso, si estas pautas coinciden."
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Que es una subasta?"
          secondary="Las aplicaciones subastan una determinada cantidad de impresiones para un slot o <i>espacio</i>. Usted puede participar de una subasta ingresando en <i>Market Place</i> y eligiendo un aviso."
        />
      </ListItem>
    </List>
    <Typography variant="h4">Publishers</Typography>
    <List>
      <ListItem>
        <ListItemText
          primary="Que es una Space?"
          secondary="Luego de registrar su aplicacion, usted debe registrar aquellos slots o <i>espacios publicitarios</i> que desea asociar a badds. Utilizando nuestra API puede obtener publicidad para dichos espacios."
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Que es una Restriccion?"
          secondary="Usted configurara las restricciones del espacio en base a las necesidades de su aplicacion."
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Como puedo subastar un espacio?"
          secondary="Ingrese a su listado de espacios, despliegue el menu de la columna de acciones y seleccione la opcion <i>Subastar Espacio</i>"
        />
      </ListItem>
    </List>
    <Typography variant="h4">Preguntas Comunes</Typography>
    <List>
      <ListItem>
        <ListItemText
          primary="Que es un contrato?"
          secondary="Luego de finalizada la subasta, Badds seleccionara el precio mas alto y creara un contrato. La app debera cumplir con la cantidad de impresiones en el tiempo pautado."
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Como integrar en android?"
          secondary={<span>Debe descargarse nuestro SDK. Siga el enlace a continuacion. <a href="/sdk?">SDK</a></span>}
        />
      </ListItem>
    </List>
  </div>
)
