import React from "react";
import { motion, useAnimation } from "framer-motion";

const iconVars = {
  heightClosed: {
    rotate: 0,
    fill: "rgb(8, 50, 156)",
  },
  heightOpen: {
    rotate: 90,
    fill: "rgb(130, 67, 0)",
  },
  hoverOn: {
    scale: 1.1,
  },
  hoverOff: {
    scale: 0.9,
  },
};

const subIconVarsRight = {
  heightClosed: {
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2,
      type: "spring",
      bounce: 0.6,
    },
  },
  heightOpen: {
    x: -120,
    y: 120,
    scale: 1.2,
    transition: {
      delay: 0.2,
      type: "spring",
      bounce: 0.6,
    },
  },
};

const subIconVarsLeft = {
  heightClosed: {
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2,
      type: "spring",
      bounce: 0.6,
    },
  },
  heightOpen: {
    x: 120,
    y: -120,
    scale: 1.2,
    transition: {
      delay: 0.2,
      type: "spring",
      bounce: 0.6,
    },
  },
};

const PlusSquareO = props => {
  return (
    <motion.svg
      {...props}
      viewBox="64 -65 897 897"
      variants={iconVars}
      whileHover="hoverOn"
      whileTap="hoverOff"
      //initial={{ fill: "rgb(0, 100, 130)" }}
      animate={props.open ? "heightOpen" : "heightClosed"}
    >
      <path d="m 888,760 v 0 0 V 7 7 H 136 v 0 753 0 z m 0,72 H 136 C 116,832 99,825 85,811 71,797 64,780 64,760 V 7 c 0,-19.333333 7,-36.166667 21,-50.5 14,-14.333333 31,-21.5 51,-21.5 h 753 c 19.33333,0 36.16667,7.166667 50.5,21.5 14.33333,14.333333 21.5,31.166667 21.5,50.5 v 753 c 0,20 -7.16667,37 -21.5,51 -14.33333,14 -31.5,21 -51.5,21 z" />
      <motion.path
        className="inside"
        id="path_right_top"
        variants={subIconVarsRight}
        d="M 397.42409,183.37954 V 116.4619 h 300.58089 c 34.00733,0 62.82907,27.42526 63.92608,66.91764 V 489.44548 H 698.00498 V 183.37954 Z"
      />
      <motion.path
        className="inside"
        id="path_left_bottom"
        variants={subIconVarsLeft}
        d="m 622.37837,570.1691 v 66.91764 H 321.79749 c -34.00734,0 -62.82907,-27.42526 -63.92608,-66.91764 V 264.10316 h 63.92607 V 570.1691 Z"
      />
    </motion.svg>
  );
};

const CloseSquareO = props => (
  <svg {...props} viewBox="64 -65 897 897">
    <g>
      <path d="m 512.36363,593.27592 46.89208,47.73996 214.43849,-210.63 c 24.26131,-23.83041 25.60505,-63.5926 -1.28634,-92.53572 L 557.93424,119.49856 512.32852,164.2943 726.80213,382.64592 Z m -1.4836,10e-4 -46.89208,47.73996 -214.43849,-210.63 c -24.26131,-23.83041 -25.60505,-63.5926 1.28634,-92.53572 L 465.30942,119.49966 510.91514,164.2954 296.44153,382.64702 Z M 888,760 v 0 0 V 7 7 H 136 v 0 753 0 z m 0,72 H 136 C 116,832 99,825 85,811 71,797 64,780 64,760 V 7 c 0,-19.333333 7,-36.166667 21,-50.5 14,-14.333333 31,-21.5 51,-21.5 h 753 c 19.33333,0 36.16667,7.166667 50.5,21.5 14.33333,14.333333 21.5,31.166667 21.5,50.5 v 753 c 0,20 -7.16667,37 -21.5,51 -14.33333,14 -31.5,21 -51.5,21 z" />
    </g>
  </svg>
);

export { PlusSquareO, CloseSquareO };

// const PlusSquareO = props => (
//   <svg {...props} viewBox="64 -65 897 897">
//     <g>
//       <path
//         d="M888 760v0v0v-753v0h-752v0v753v0h752zM888 832h-752q-30 0 -51 -21t-21 -51v-753q0 -29 21 -50.5t51 -21.5h753q29 0 50.5 21.5t21.5 50.5v753q0 30 -21.5 51t-51.5 21v0zM732 420h-184v183q0 15 -10.5 25.5t-25.5 10.5v0q-14 0 -25 -10.5t-11 -25.5v-183h-184
//   q-15 0 -25.5 -11t-10.5 -25v0q0 -15 10.5 -25.5t25.5 -10.5h184v-183q0 -15 11 -25.5t25 -10.5v0q15 0 25.5 10.5t10.5 25.5v183h184q15 0 25.5 10.5t10.5 25.5v0q0 14 -10.5 25t-25.5 11z"
//       />
//     </g>
//   </svg>
// );

//  <motion.rect
//    width="897"
//    height="897"
//    rx="50"
//    ry="50"
//    x="64"
//    y="-65"
//    fill="rgb(5, 134, 247)"
//    fillOpacity="0.2"
//    variants={subIconRect}
//  />;

// const subIconRect = {
//   heightClosed: {
//     fill: "rgb(5, 134, 247)",
//   },
//   heightOpen: {
//     fill: "rgb(247, 138, 5)",
//   },
// };
