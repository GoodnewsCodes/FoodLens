import "./Button.css";
function Button(props) {
  return (
    <>
      <button>{props.action}</button>
    </>
  );
}

export default Button;
