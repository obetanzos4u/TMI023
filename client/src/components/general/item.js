import React, { useEffect, useState } from "react";
import Modal from "./modal";
import Read from "./read";
import Manual from "./manual";
import Serie from "./serie";
import Stock from "./stock";
import SerieOut from "./serieOut";
import ReadLocation from "./readLocation";
import { useStoreContext } from "../../utils/taskState";
import Message from "../general/message";
import Lote from "../general/lote";
import { useStoreAllContext } from "../../utils/allTask";
import ubicacion_icon from "../../icons/ubicacion_icon.svg";
import producto_icon from "../../icons/producto_icon.svg";
import disponibilidad_icon from "../../icons/disponibilidad_icon.svg";
import manual_icon from "../../icons/manual_icon.svg";
import api from "../../utils/api";


function Item(props) {
  const [modal, setModal] = useState(false);
  const [screen, setScreen] = useState();
  const [displayUnit, setDisplayUnit] = useState();
  const [displayName, setDisplayName] = useState();
  const [stock, setStock] = useState([]);

  const [lote, setLote] = useState({});
  const [series, setSeries] = useState([]);
  const [isSerial, setSerial] = useState(false);

  const { set, setGlobalItems, globalItems } = useStoreContext();
  const [confirmQty, setQquantity] = useState(0);
  const [OpenQuantity, setOpenQuantity] = useState(
    props.data.OpenQuantity.$value
  );
  const [confirmQtyUnit, setQquantityUnit] = useState(
    props.data.OpenQuantity.$attributes.unitCode
  );

  const [location, setLocation] = useState(props.data.SourceLogisticsAreaID);
  const [locationOut, setLocationOut] = useState();
  const [numbers, setNumbers] = useState([]);

  const { operation, setOperation, units } = useStoreAllContext();

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
  const closeModal = () => {
    setModal(false);
  };

  const setGlobals = () => {
    if (globalItems) {
      let validation = false;

      globalItems.forEach((item) => {
        if (props.out.SiteLogisticsLotMaterialOutputUUID == item.id) {
          validation = true;
        }
      });

      let split = false;
      if (confirmQty < OpenQuantity) {
        split = true;
      }
      if (validation == false) {
        if (operation == "internal") {
          let batch = "";
          if (lote.hasOwnProperty("id")) {
            batch = lote.id;
          }
          if (confirmQty != "") {
            let newList = globalItems;
            let object = {
              id: props.data.SiteLogisticsLotMaterialInputUUID,
              idOut: props.out.SiteLogisticsLotMaterialOutputUUID,
              quantity: confirmQty,
              product: props.data.ProductID,
              unit: confirmQtyUnit,
              location: location,
              locationOut: locationOut,
              lote: batch,
              split: split,
              series: series,
            };
            newList.push(object);

            setGlobalItems(newList);
          }
        } else if (operation == "inbound") {
          let split = false;
          if (confirmQty < OpenQuantity) {
            split = true;
          }
          if (confirmQty != "" && location != "") {
            let newList = globalItems;
            let object = {
              id: props.out.SiteLogisticsLotMaterialOutputUUID,
              quantity: confirmQty,
              product: props.data.ProductID,
              unit: confirmQtyUnit,
              location: location,
              lote: lote,
              series: series,
              split: split,
            };
            newList.push(object);

            setGlobalItems(newList);
          }
        } else {
          if (confirmQty != "" && location != "") {
            let split = false;
            if (confirmQty < OpenQuantity) {
              split = true;
            }
            let newList = globalItems;
            let object = {
              id: props.out.SiteLogisticsLotMaterialOutputUUID,
              idIn: props.data.SiteLogisticsLotMaterialInputUUID,
              quantity: confirmQty,
              product: props.data.ProductID,
              unit: confirmQtyUnit,
              location: location,
              lote: lote.id,
              series: series,
              split: split,
            };
            newList.push(object);

            setGlobalItems(newList);
          }
        }
      }
    }
  };

  const openModal = (data) => {
    setScreen(data);
    setModal(true);
  };

  useEffect(() => {
    console.log(props);
    if (operation == "internal") {
      setOpenQuantity(props.out.OpenQuantity.$value);
    }
    if (props.data.IdentifiedStockID) {
      setLote({ id: props.data.IdentifiedStockID });
    } else {
      setLote({ id: "" });
    }
    if (operation == "inbound") {
      setDisplayName(
        props.data.ProductID + "-" + props.data.ProductDescription
      );
      api.getItemText(props.data.ProductID).then((result) => {
        if (result.data[0].SerialIdentifierAssignmentProfileCode == "1005") {
          setSerial(true);
        }
        //setDisplayName(props.data.ProductID + "-" + result.data[0].Description);
      });
    } else {
      api.getItemText(props.data.ProductID).then((result) => {
        if (result.data[0].SerialIdentifierAssignmentProfileCode == "1005") {
          setSerial(true);
        }
        setDisplayName(
          props.data.ProductID + " - " + result.data[0].Description
        );
      });
    }
    if (units.length > 0) {
      let current = units.find((unit) => unit.Value == confirmQtyUnit);
      setDisplayUnit(current.Description.$value);
    }

    if (operation == "internal") {
      setLocation(props.data.SourceLogisticsAreaID);
      setLocationOut(props.out.TargetLogisticsAreaID);
    }
    set(props.data);

    if (location == null) {
      setLocation(props.out.TargetLogisticsAreaID);
    }
  }, []);

  useEffect(() => {
    setGlobals();
    console.log(location);
  }, [confirmQty, location, series, lote]);

  return (
    <>
      <div className="flex-row is-narrow item flex-between flex-acenter">
        <div className="text-center p-1 vertical-text">
          {props.data.LineItemID}
        </div>

        <div className="flex-col item-name">
          <div className="flex-row h50 ">
            <p className="black-text product-text ">{displayName}</p>
          </div>

          <div className="section-btns flex-col ">
            <p className="black-text product-text">
              {confirmQty + " " + displayUnit + " de "}{" "}
              {operation == "internal" ? props.out.OpenQuantity.$value : null}{" "}
              {operation == "inbound" ? props.data.OpenQuantity.$value : ""}{" "}
              {operation == "outbound" ? props.data.OpenQuantity.$value : ""}{" "}
              {" " + displayUnit}
            </p>

            <div className="flex-col">
              {" "}
              <p className="black-text product-text">
                {"Ubicacion: " + location}
              </p>
              {operation == "internal" ? (
                <p className="black-text product-text">
                  {"Ubicacion de destino: " + locationOut}
                </p>
              ) : null}
              <div className="flex-row flex-between">
                <p className="btn-lote black-text product-text">
                  Lote: {lote.id ? lote.id : "" + " "}
                </p>
                <div className="flex-row">
                  {operation == "inbound" ? (
                    <p
                      className="modal-lote black-text product-text button-white3 m-2 "
                      onClick={() => {
                        openModal(
                          <Lote
                            lote={lote}
                            data={props.data}
                            close={closeModal}
                            setLote={setLote}
                            name={displayName}
                          ></Lote>
                        );
                      }}
                    >
                      Lote
                    </p>
                  ) : null}
                  {isSerial ? (
                    <p
                      className="btn-serie black-text product-text button-white3 m-2 "
                      onClick={() => {
                        if (operation == "inbound") {
                          openModal(
                            <Serie
                              id={props.data.ProductID}
                              location={location}
                              setSeries={setSeries}
                              series={series}
                              close={closeModal}
                              set={setGlobals}
                              setQuantity={setQquantity}
                              operation={operation}
                            />
                          );
                        } else {
                          openModal(
                            <SerieOut
                              id={props.data.ProductID}
                              location={location}
                              setSeries={setSeries}
                              series={series}
                              close={closeModal}
                              set={setGlobals}
                              quantity={
                                operation == "internal"
                                  ? props.out.OpenQuantity.$value
                                  : props.data.OpenQuantity.$value
                              }
                              setQuantity={setQquantity}
                              operation={operation}
                              numbers={numbers}
                              setNumbers={setNumbers}
                            />
                          );
                        }
                      }}
                    >
                      Series
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-col">
          <div className="flex-row">
            <a
              className="square-button2 border2"
              onClick={() =>
                openModal(
                  <ReadLocation
                    setLoca={setLocation}
                    close={closeModal}
                    set={setGlobals}
                  />
                )
              }
            >
              <img alt="Icono de ubicacion del producto" className="ubicacion_icon icon_card" src={ubicacion_icon} />
              <a className="item_name">Ubicacion</a>
            </a>
            <a
              className="square-button2 border2"
              onClick={() =>
                openModal(
                  <Read
                    currentQuantity={confirmQty}
                    quantity={setQquantity}
                    unit={setQquantityUnit}
                    close={closeModal}
                    data={props.data}
                    set={setGlobals}
                  />
                )
              }
            >
              <img alt="Icono de producto" className="producto_icon icon_card" src={producto_icon } />
              <a className="item_name">Producto</a>
            </a>
          </div>
          <div className="flex-row">
            <a
              className="square-button2 border2"
              onClick={() =>
                openModal(
                  <Stock
                    id={props.data.ProductID}
                    name={displayName}
                    close={closeModal}
                    stock={stock}
                    setStock={setStock}
                  />
                )
              }
            >
              <img alt="Icono de disponibilidad del producto" className="disponibilidad_icon icon_card" src={disponibilidad_icon} />
              <a className="item_name">Stock</a>
            </a>
            <a
              className="square-button2 border2"
              onClick={() =>
                openModal(
                  <Manual
                    currentQuantity={confirmQty}
                    loca={location}
                    setLoca={setLocation}
                    quantity={setQquantity}
                    unit={setQquantityUnit}
                    close={closeModal}
                    data={props.data}
                    setlote={setLote}
                    lote={lote}
                    unit={displayUnit}
                    name={displayName}
                    open={OpenQuantity}
                    operation={operation}
                  />
                )
              }
            >
              <img alt="Icono de manual" className="manual_icon icon_card" src={manual_icon} />
              <a className="item_name">Manual</a>
            </a>
          </div>
        </div>

        <Modal on={modal} type={screen} />
      </div>
      {message}
    </>
  );
}

export default Item;
