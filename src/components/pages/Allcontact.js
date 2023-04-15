import { useEffect } from "react";
import { contactAction } from "../store/Contact-store";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import classes from "./Allcontact.module.css";
import { useHistory } from "react-router-dom";
import { detailActions } from "../store/Detail-store";

const Allcontact = ({ setFname, setLname, setRadio }) => {
  const fullcontact = useSelector(
    (currState) => currState.allContact.contact_arr
  );

  const dispatch = useDispatch();
  const history = useHistory();

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

  const heading = [
    "first_name",
    "last_name",
    "radio",
    "edit",
    "delete",
    "detail",
  ];

  const deleteHandler = async (post) => {
    try {
      const del = await fetch(
        `https://contactdetail-a1e4e-default-rtdb.firebaseio.com/contact/${post.id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await del.json();
      getData();
    } catch (err) {
      alert(err.message);
    }
  };

  const editHandler = (post) => {
    console.log(post);
    setFname(post.first_name);
    setLname(post.last_name);
    setRadio(post.radio);
    deleteHandler(post);
  };

  const contactDetailHandler = (post) => {
    console.log(post);
    dispatch(detailActions.detailHandler(post));
    history.replace("/Detail");
  };

  return (
    <Fragment>
      <ul>
        <table className="table">
          <thead>
            <tr>
              {heading.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fullcontact.map((post) => (
              <tr key={post.id} className={classes.li}>
                <td>{post.first_name}</td>
                <td>{post.last_name}</td>
                <td>{post.radio}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={editHandler.bind(null, post)}
                  >
                    edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={deleteHandler.bind(null, post)}
                  >
                    delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={contactDetailHandler.bind(null, post)}
                  >
                    detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ul>
    </Fragment>
  );
};

export default Allcontact;
