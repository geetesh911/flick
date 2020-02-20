import React, { useContext, useState } from "react";
import AlertContext from "./../../context/alert/alertContext";
// import { Toast } from "materialize-css";
import { Toast } from "react-bootstrap";
export const Alerts = () => {
  const alertContext = useContext(AlertContext);

  const [show, setShow] = useState(true);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div className="toast-container" key={alert.id}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={alert.timeout || 5000}
          animation={true}
          autohide
        >
          <Toast.Body>
            <i className="fas fa-info-circle" /> {alert.msg}
          </Toast.Body>
        </Toast>
      </div>
    ))
  );
};
