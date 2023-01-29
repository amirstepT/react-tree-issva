import React, { useState } from "react";
// import { Spring, config, animated } from 'react-spring'
import { motion } from "framer-motion";
import * as Icons from "./icons";

const styles = {
  tree: {
    position: "relative",
    padding: "4px 0px 0px 0px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    verticalAlign: "middle",
  },
  toggle: {
    width: "1em",
    height: "1em",
    marginRight: 10,
    cursor: "pointer",
    verticalAlign: "middle",
    originX: "0.5em",
    originY: "0.5em",
  },
  // type: {
  //   textTransform: "uppercase",
  //   fontFamily: "monospace",
  //   fontSize: "0.6em",
  //   verticalAlign: "middle",
  // },
  contents: {
    willChange: "transform, opacity, height",
    marginLeft: 6,
    padding: "4px 0px 0px 14px",
    borderLeft: "1px solid #d6d6d6",
    // borderLeft: "1px dashed rgba(255,255,255,0.4)",
  },
};

const SubTree = React.forwardRef((props, ref) => {
  const { id, children, content, style, open, selected } = props;

  const toggle = () => {
    props.toggleHandler && props.toggleHandler(id);
  };

  const Icon = Icons[`${children ? "Plus" : "Close"}SquareO`];

  // const Icon =
  //   Icons[`${children ? (open ? "Minus" : "Plus") : "Close"}SquareO`];

  return (
    <div style={{ ...styles.tree, ...style }} className="treeview">
      <Icon
        className="toggle"
        style={{ ...styles.toggle, opacity: children ? 1 : 0.3 }}
        open={open}
        onClick={toggle}
      />
      <motion.span
        //className={selected ? "info_ripple" : ""}
        animate={props.selectControls}
        style={{ verticalAlign: "middle" }}
      >
        {content}
      </motion.span>

      {/* for adding other stuff <span style={{ verticalAlign: "middle" }}> other stuff</span><span style={{ verticalAlign: "middle" }}><button>new button</button></span> */}

      <div
        ref={ref}
        style={{
          ...style,
          ...styles.contents,
          height: 0,
          opacity: 0,
          transform: "translate3d(20px,0,0)",
        }}
      >
        {children}
      </div>
    </div>
  );
});

const Tree = motion(SubTree);

export default Tree;
