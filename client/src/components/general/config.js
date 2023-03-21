import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
//El componente de orden superior withRouter se usa para dar acceso al componente a los accesorios del enrutador. 

import api from "../../utils/api";

// Este código es un componente de React que genera un formulario con dos conjuntos de campos de entrada para una URL del sistema, un usuario funcional y un usuario técnico.

function Config() {

  // El gancho useEffect se usa para ejecutar algún código cuando se monta el componente, pero dado que tiene una matriz vacía como segundo argumento, no se ejecutará ningún código. 

  useEffect(() => {}, []);
  return (
    <>
      <div className="flex-col slot2 flex-center flex-between p-4">
        <div className="section flex-row">
          <p className="label">System URL</p>
          <input className="input" />
        </div>
        <div className="section flex-col">
          <div className="flex-row">
            <p className="label">Usuario funcional</p>
            <input className="input" />
          </div>
          <div className="flex-row">
            <p className="label">Contraseña</p>
            <input className="input" type="password" />
          </div>
        </div>
        <div className="section flex-rows">
          <div className="flex-row">
            <p className="label">Usuario tecnico</p>
            <input className="input" />
          </div>
          <div className="flex-row">
            <p className="label">Contraseña</p>
            <input className="input" type="password" />
          </div>
        </div>
        <div className="section flex-rows"></div>
      </div>
    </>
  );
}

export default withRouter(Config);
