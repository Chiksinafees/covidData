import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const contactHandler = () => {
    history.replace("/");
  };

  const chartHandler = () => {
    history.replace("/Contactchart");
  };

  const mapHandler = () => {
    history.replace("/MapofCases");
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <h1>COVID DATA</h1>
      <Button className="btn btn-warning " onClick={contactHandler}>
        Contact
      </Button>
      <Button className="btn btn-warning " onClick={chartHandler}>
        charts
      </Button>
      <Button className="btn btn-warning " onClick={mapHandler}>
        Map
      </Button>
    </nav>
  );
};

export default Header;
