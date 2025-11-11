import "./Button.css";

function Button({ action, color, bgColor, link }) {
  // If link prop is provided, render an <a> tag, otherwise render a <button>
  if (link) {
    return (
      <a
        href={link}
        style={{
          color: color,
          backgroundColor: bgColor,
        }}
        className="button"
      >
        {action}
      </a>
    );
  }

  return (
    <button
      style={{
        color: color,
        backgroundColor: bgColor,
      }}
      className="button"
    >
      {action}
    </button>
  );
}

export default Button;
