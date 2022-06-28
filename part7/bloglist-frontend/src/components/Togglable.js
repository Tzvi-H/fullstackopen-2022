import { useState, forwardRef, useImperativeHandle } from "react";
import Button from "@mui/material/Button";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisiblity = () => setVisible(!visible);

  useImperativeHandle(refs, () => {
    return {
      toggleVisiblity,
    };
  });

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={toggleVisiblity}
        style={hideWhenVisible}
      >
        {props.buttonLabel}
      </Button>

      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" color="primary" onClick={toggleVisiblity}>
          cancel
        </Button>
      </div>
    </div>
  );
});

export default Togglable;
