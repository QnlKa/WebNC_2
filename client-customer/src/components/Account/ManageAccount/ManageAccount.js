import Account from "../Account";
import "./ManageAccount.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const ManageAccount = () => {
  const { id, token } = useParams();

  const [scs, setScs] = useState(false);
  useEffect(() => {
    console.log(id);
    console.log(token);
    btnActiveClick();
  }, [id]);
  // event-handlers
  const btnActiveClick = () => {
    if (id && token) {
      apiActive(id, token);
    } else {
      toast.error("Please input ID and TOKEN");
    }
  };
  // apis
  const apiActive = (id, token) => {
    const body = { id: id, token: token };
    axios.post("/api/customer/active", body).then((res) => {
      const result = res.data;
      if (result) {
        toast.success("Successfull!");
        setScs(true);
        console.log(scs);
      } else {
        toast.error("Please try again!");
      }
    });
  };
  return (
    <div className="user__account__container">
      <div className="account__container">
        {!scs ? (
          <div className="account__header">
            <h1>WAIT FOR LOADING....</h1>
          </div>
        ) : (
          <>
            <div className="account__header">
              <h1>ACTIVE SUCCESSFULL</h1>
            </div>
            <p>YOU CAN LOGIN NOW</p>
            <div className="account__page__detail">
              {" "}
              <ToastContainer />
              <div className="manage__account__container">
                <div className="edit__account__container">
                  <div className="edit__account">
                    <div className="edit__account__form__container">
                      <div className="edit__account__form">
                        <Link to="/account/login">
                          <div className="save__changes__button__container">
                            <button className="save__changes__button">
                              LOGIN
                            </button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
