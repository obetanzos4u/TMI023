import React, { useEffect } from "react";
import { useStoreSlotContext } from "../../utils/slotState";
import { Link, useLocation } from "react-router-dom";
import editar_icon from "../../icons/editar_icon.svg";

import { withRouter } from "react-router-dom";
import api from "../../utils/api";

function Slot(props) {
  const { setSlot } = useStoreSlotContext();
  const setTask = () => {
    setSlot(props.data);
    props.history.push("/task");
  };

  return (
    <>
      <div className="slot flex-row flex-between  flex-center ">
        <div className="container_slot">
            <div className="content_area">
          <div className="">
          <div className="">
            <p className="inter-text">
              {"Tarea: "}
              {props.ide ? props.ide : null}
            </p>
            <p className="inter-text">
              {"Referencia: "}
              {props.reference ? props.reference : null}
            </p>
          </div>
          <div className="">
            {" "}
            <p className="intertext">
              {"Socio Comercial: "}
              {props.socio ? props.socio : null}
            </p>
          </div>
        </div>            
            </div>               
                <a className="square-button1 function_area" onClick={setTask}>
                  <div>
                    <p className="item_element">{"Items: " + props.items.length}</p>
                    <button className="button_area" > 
                      <img className="editar_icon" src={editar_icon}/>
                    </button>                    
                  </div>
                </a>                   
        </div>

      </div>
    </>
  );
}

export default withRouter(Slot);
