import React, { useEffect, useRef, useState } from "react";
import SquareLoader from "react-spinners/ClipLoader";
import { withRouter } from "react-router-dom";
import Singup from "../pages/signUp";
import api from "../../utils/api";
import { useStoreAllContext } from "../../utils/allTask";
import Message from "../general/message";
import point_title from "../../icons/point_title.svg";
import access from "../../icons/entrar_icon.svg"

function Login(props) {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [modal, setModal] = useState();
  const userf = useRef();
  const admin = useRef();
  const password = useRef();

  const { user, setUser, setAdmin, setSite, setEmployee } =
    useStoreAllContext();

  ////////////////message handling

  const [message, setMessage] = useState(<Message />);
  const [messageState, setMessageStatus] = useState(false);

  const sendMessage = (type, text) => {
    setMessage(
      <Message on={true} type={type} text={text} timer={closeMessage} />
    );
    setMessageStatus(true);
  };

  const closeMessage = () => {
    setMessage(<Message />);
    setMessageStatus(false);
    clearTimeout();
  };
  //////////////////////

  const login = () => {
    if (!admin.current.checked) {
      if (userf.current.value != "" && password.current.value) {
        setUser("Hoc");
        setSite("101");
        setEmployee("9000");
        props.history.push("/Main");

      // if (!admin.current.checked) {
      // if (userf.current.value != "" && password.current.value) {
      //   setUser("2020");
      //   setSite("101");
      //   setEmployee("9000");

      //   props.history.push("/main");
      /*
        api
          .login(userf.current.value, password.current.value)
          .then((response) => {
            if (response.data.length > 0) {
              setUser(response.data[0]._id);
              setSite(response.data[0].site);
              setEmployee(response.data[0].sapNumber);

              props.history.push("/main");
            } else {
              sendMessage("warning", "usuario no valido");
            }
          });*/
        api
          .login(userf.current.value, password.current.value)
          .then((response) => {
            if (response.data.length > 0) {
              setUser(response.data[0]._id);
              setSite(response.data[0].site);
              setEmployee(response.data[0].sapNumber);

              props.history.push("/main");
            } else {
              sendMessage("warning", "usuario no valido");
            }
          });
      } else {
        sendMessage("warning", "Has olvidado completar algún campo");
      }
    } else {
      if (userf.current.value != "" && password.current.value) {
        /*
        api
          .login(userf.current.value, password.current.value)
          .then((response) => {
            if (response.data.length > 0) {
              setUser(response.data[0]._id);
              setSite(response.data[0].site);
              setEmployee(response.data[0].sapNumber);

              if (response.data[0].isAdmin) {
                setAdmin(true);
                props.history.push("/Admin");
              } else {
                props.history.push("/Main");
              }
            } else {
              sendMessage("warning", "usuario no valido");
            }
          });
        */
        api
          .login(userf.current.value, password.current.value)
          .then((response) => {
            if (response.data.length > 0) {
              setUser(response.data[0]._id);
              setSite(response.data[0].site);
              setEmployee(response.data[0].sapNumber);

              if (response.data[0].isAdmin) {
                setAdmin(true);
                props.history.push("/Admin");
              } else {
                props.history.push("/Main");
              }
            } else {
              sendMessage("warning", "usuario no valido");
            }
          });

        setUser("Hoc");
        setSite("101");
        setEmployee("9000");
        props.history.push("/Admin");
      } else {
        sendMessage("warning", "Campos Vacios");
      }
    }
  };

  const closeModal = () => {
    setModal();
  };

  const signup = () => {
    setModal(<Singup history={props.history} cancel={closeModal} />);
  };
  return (
    <>
      <div className="main_login">
        <SquareLoader color={color} loading={loading} size={150} />
        <main>
        <div className="container_login">
           <div className="container_title"> 
            <p className="title">T M I <img src={point_title} className="point_title" /></p>
            <p className="subtitle">Bienvenido</p>
          </div>
          <div className="container_user">
            {/* <label className="label_user">Usuario</label> */}
            {/* <input name="Usuario" ref={userf} type="text" id="input_login" placeholder="Usuario" autocorrect="off" autocapitalize="off" autofocus/> */}
            <div className="form1">
              <input name="Usuario" ref={userf} type="text" className="form1__input" autocomplete="off" placeholder=" " autocorrect="off" autocapitalize="off" autofocus/>
              <label for="Usuario" className="form1__label">Usuario</label>
            </div>
          </div> 
          <div className="container_password">
            {/* <label className="label_password">Contraseña</label> */}
            {/* <input name="Contraseña" ref={password} type="password" id="input_login" placeholder="Contraseña" autocomplete="off" autocorrect="off" autocapitalize="off"/> */}
            <div className="form1">
              <input name="Contrasena" ref={password} type="password" className="form1__input" autocomplete="off" placeholder=" " autocorrect="off" autocapitalize="off" autofocus/>
              <label for="Contrasena" className="form1__label">Contraseña</label>
            </div>
          </div>
          <div className="container_admin"> 
            {/* <label  className="label_admin">Administrador </label> */}
            {/* <input type="checkbox" ref={admin} /> */}
              <p className="tag_admin">Administrador</p>
              <input className="checkbox_login" type="checkbox" id="switch" ref={admin} /><label className="checkbox_label" for="switch"></label>
          </div>
          <div className="container_button_login">
            <input type="image" className="button_login" onClick={login} src={access}/> 
          </div>
        {modal}         
        </div>
        </main>
      </div>
      {message}
    </>
  );
}

export default withRouter(Login);
