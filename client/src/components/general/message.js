import React from "react";
import warning_icon from "../../icons/warning_icon.svg";

function Message(props) {
  if (props.on) {
    setTimeout(() => {
      props.timer();
    }, 10000);
  }

  const clear = () => {
    clearTimeout();
    props.timer();
  };

  return props.on ? (
    <div className="message flex-center flex-col">
      <div className={"response flex-col flex-center " + props.type}>
        <img className="warning_icon" alt="Icono de alerta amable" src={warning_icon} />
        <p className="message_text">{props.text}</p>    
          <button className="button-clear" onClick={clear}>
          ACEPTAR
          </button>            
        </div>
      </div>
  ) : null;
}

export default Message;
