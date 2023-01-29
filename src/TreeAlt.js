import React, { useState } from "react";
// import { Spring, config, animated } from 'react-spring'
import { motion } from "framer-motion";
import * as Icons from "./iconsAlt2";

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
    marginLeft: 2,
    cursor: "pointer",
    verticalAlign: "middle",
    originX: "calc(0.5em + 3px)",
    originY: "calc(0.5em + 3px)",
    padding: "3px",
    //fill: "rgb(0, 100, 130)",
  },
  contents: {
    willChange: "transform, opacity, height",
    marginLeft: 9,
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

  const spanProps = {
    style: { verticalAlign: "middle" },
  };

  if (props.selectionControl) {
    spanProps.initial = { backgroundColor: "rgb(100, 180, 251, 0.0)" };
    spanProps.animate = props.selectionControl;
    spanProps.onUpdate = latest => {
      console.log(latest.backgroundColor, id);
    };
  }

  return (
    <div style={{ ...styles.tree, ...style }} className="treeview">
      <motion.div style={{ display: "inline-block" }} whileHover="hoverOn">
        <Icon
          className="toggle"
          open={open}
          style={{ ...styles.toggle, opacity: children ? 1 : 0.3 }}
          onClick={toggle}
        />
      </motion.div>
      <motion.span
        //className={selected ? "info_ripple" : ""}
        {...spanProps}
      >
        {content}
      </motion.span>

      {/* for adding other stuff <span style={{verticalAlign: "middle" }}> other stuff</span><span style={{ verticalAlign: "middle" }}><button>new button</button></span> */}

      {!props.endNode ? (
        <div
          ref={ref}
          style={{
            ...style,
            ...styles.contents,
            height: 0, // can remove most of the styles from here (transform and opacity because can use control.set with useEffect )
          }}
        >
          {children}
        </div>
      ) : (
        <div ref={ref} style={{ paddingTop: "4px" }} /> // put fake div to mimic hidden div
      )}
    </div>
  );
});

const TreeAlt = motion(SubTree);

export default TreeAlt;
