import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title }) => {
  const onClick = (e) => {
    console.log("click", e);
  };
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="black" text="add" onClick={onClick}></Button>
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

//CSS in js
//const headingStyle = { color: "red", backgroundColor: "grey" };

export default Header;
