import classes from "./Detail.module.css";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { useHistory } from "react-router-dom";

const Detail = () => {
  const fullDetail = useSelector((currState) => currState.detailing.fullDetail);
  const history = useHistory();

  const backToContactPage = () => {
    history.replace("/");
  };
  return (
    <Fragment>
      <div className={classes.box}>
        <div className="container border">
          <h1 className="text-center">full contact detail</h1>
          <hr />
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <h4>First Name : {fullDetail.first_name}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Last Name : {fullDetail.last_name}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>status : {fullDetail.radio}</h6>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-secondary" onClick={backToContactPage}>
            contact page
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Detail;
