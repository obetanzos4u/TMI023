import React from "react";
import { useStoreAllContext } from "../../utils/allTask";
import refresh_icon from "../../icons/refresh_icon.svg";
import exit_icon from "../../icons/salir_icon.svg";
import point_title from "../../icons/point_title.svg";
import search_icon from "../../icons/search-icon.svg";

function MainMenu(props) {
  const {
    setAllTask,
    currentBlock,
    setLabels,
    sapLabels,
    operation,
    setOperation,
    user,
    setUser,
  } = useStoreAllContext();
  console.log(currentBlock);
  const handleInputChange = (event) => {
    const { value } = event.target;

    var copy = currentBlock;

    if (operation == "internal") {
      if (value == "") {
        props.setTask(copy);
      } else {
        var filtered = currentBlock.filter((tarea) => {
          if (tarea.SiteLogisticsTaskID.includes(value)) {
            return tarea;
          }
        });

        props.setTask(filtered);
      }
    } else {
      if (value == "") {
        props.setTask(copy);
      } else {
        var filtered = currentBlock.filter((tarea) => {
          if (
            tarea.BusinessTransactionDocumentReferenceID.toLowerCase().includes(
              value.toLowerCase()
            ) ||
            tarea.CustomerParty.CustomerPartyName.toLowerCase().includes(
              value.toLowerCase()
            )
          ) {
            return tarea;
          }
        });

        props.setTask(filtered);
      }
    }
  };
  return (
    <>
      <div className="flex-col flex-between">
        <div className="header_container flex-row flex-between p-3">
          <div>
            <a className="exit" onClick={() => props.logout()} >
              <img alt="boton para salir" className="icon_exit" src={exit_icon}/>
            </a>
          </div>
          <p className="title">T M I <img src={point_title} className="point_title" /></p>
          <div className="refresh_icon_container">
            <a className="refresh" onClick={props.reload}>
              <img alt="botón de refrescar o actualizar" className="refresh_icon" src={refresh_icon} />   
            </a>
          </div>
        </div>
        <nav className="navigator_options flex-row">
          <a onClick={props.in} className="menu-button">
            Entradas
          </a>
          <a onClick={props.out} className="menu-button">
            Salidas
          </a>
          <a onClick={props.int} className="menu-button">
            Internos
          </a>
        </nav>
        <div className="search_container_main">
        <div className="search_container">
        {/* <label for="search_input" className="search_label">Busca por pedido o socio comercial</label> */}
          <img className="icon_search" alt="Icono de búsqueda de la barra de búsqueda" src={search_icon}/>
          <input
            className="search_input"
            placeholder="Busca por pedido o socio comercial"
            onChange={handleInputChange}
          />            
          </div>
        </div>
      </div>
    </>
  );
}

export default MainMenu;
