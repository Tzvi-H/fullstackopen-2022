import { useState, forwardRef, useImperativeHandle } from "react";

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
      <button onClick={toggleVisiblity} style={hideWhenVisible}>
        {props.buttonLabel}
      </button>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisiblity}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
