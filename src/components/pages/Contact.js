import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Allcontact from "./Allcontact";
import { contactAction } from "../store/Contact-store";
import { useDispatch } from "react-redux";
const Contact = () => {
  const [showPage, setShowPage] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [radio, setRadio] = useState("");

  const dispatch = useDispatch();

  const showContactPage = () => {
    setShowPage((show) => !show);
  };

  const handleOptionChange = (e) => {
    setRadio({
      selected: e.target.value,
    });
  };

  const fnameHandler = (e) => {
    setFname(e.target.value);
  };

  const lnameHandler = (e) => {
    setLname(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const postData = async () => {
      const post = await fetch(
        `https://contactdetail-a1e4e-default-rtdb.firebaseio.com/contact.json`,
        {
          method: "POST",
          body: JSON.stringify({
            first_name: fname,
            last_name: lname,
            radio: radio.selected,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await post.json();
      console.log(data);
    };

    postData();
    getData();
    setFname("");
    setLname("");
    setRadio("");
  };

  const getData = async () => {
    const get = await fetch(
      `https://contactdetail-a1e4e-default-rtdb.firebaseio.com/contact.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await get.json();
    console.log(data);

    let newArr = [];
    if (!!data) {
      newArr = Object.keys(data).map((contact) => {
        return {
          id: contact,
          first_name: data[contact].first_name,
          last_name: data[contact].last_name,
          radio: data[contact].radio,
        };
      });
      dispatch(
        contactAction.contactHandler({
          newArr: newArr,
        })
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mt-5 border border-warning rounded ">
      <h1 className="bg-warning p-0">Contact Page</h1>
      <button className="btn btn-primary mb-3" onClick={showContactPage}>
        Create Contact
      </button>
      {showPage && (
        <form onSubmit={formSubmitHandler} className="container">
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={fname}
            onChange={fnameHandler}
            required
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={lname}
            onChange={lnameHandler}
            required
          />

          <p>Status</p>
          <label>
            <input
              className="form-check-input"
              type="radio"
              value="Active"
              checked={radio.selected === "Active"}
              onChange={handleOptionChange}
            />
            Active
          </label>
          <br />
          <label>
            <input
              className="form-check-input"
              type="radio"
              value="Inactive"
              checked={radio.selected === "Inactive"}
              onChange={handleOptionChange}
            />
            Inactive
          </label>
          <br />
          <button type="submit" className="btn btn-danger mb-3">
            Save Contact
          </button>
        </form>
      )}
      <Allcontact setFname={setFname} setLname={setLname} setRadio={setRadio} />
    </div>
  );
};

export default Contact;
