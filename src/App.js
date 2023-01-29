import "./App.css";
import Tree from "./Tree";
import { useState, useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import { mainTree, variants, selectionVariant } from "./constants.js";

// recursively goes through tree, pulls out all ID's and adds key/value pairs to buffer object (sets to false)
const generateIDArray = (treeArr, buffer) => {
  treeArr.forEach(val => {
    buffer[val.id] = false;
    if (val.branch) {
      generateIDArray(val.branch, buffer);
    }
  });
};

// use previous object hook for keeping track of previous state
const usePreviousObj = prevObj => {
  const prevRef = useRef();

  useEffect(() => {
    prevRef.current = { ...prevObj };
  }, [prevObj]);

  return prevRef.current;
};

function App() {
  const objBuffer = {};
  generateIDArray(mainTree, objBuffer);
  const [openObj, setOpenObj] = useState(objBuffer);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const controls = useAnimation();

  // previous version of the open id's
  const prevObj = usePreviousObj(openObj);

  // search functionality prelim
  const handleClick = event => {
    setSelectedIDs(["aabc" /*, "ba"*/]);
    highlightSelectedIDs(["aabc" /*, "ba"*/]);
    setTimeout(() => setSelectedIDs([]), 3500);
  };

  // clicking on plus/minus icons activates this which changes the open/closed object (array)
  const toggleHandler = id => {
    setOpenObj(prev => {
      const temp = { ...prev };
      temp[id] = !temp[id];
      return temp;
    });
  };

  // have to add a delay variable - can't think of anything else.
  function generateTree(
    treeArr,
    prevIds,
    ids,
    prevClosed,
    selectedIDs,
    node = 0,
    animDelay = 0
  ) {
    let buffer = [];
    for (let i = 0; i < treeArr.length; i++) {
      const currItem = treeArr[i]; // get current item
      const currID = currItem.id; // get id of current item
      const endNode = !(currItem.branch || currItem.endLeaf);

      const selected = selectedIDs.some(id => {
        if (id.slice(0, node + 1) === currID) {
          return true;
        }
      });

      const open = selected ? ids[currID] : ids[currID] && !endNode; // don't want to open end nodes unless they are selected

      // declare the props
      const treeProps = {
        content: currItem.title,
        key: currID,
        id: currID,
        open: open,
        variants: variants,
        toggleHandler: endNode ? () => {} : toggleHandler,
        selected: selectedIDs.some(id => id === currID),
        custom: selected && !prevIds[currID] ? animDelay : 0,
      };

      // if used animDelay then want to advance it for the next one
      if (selected && !prevIds[currID]) {
        animDelay++;
      }

      // outline animation scheme (if a previous node is closed but this node is open, animation will be different -- height remains open)
      const animateVars = [];
      if (!open) {
        animateVars.push("slideOut", "heightClosed");
      } else {
        if (prevClosed) animateVars.push("slideOut", "heightOpen");
        else animateVars.push("slideIn", "heightOpen");
      }
      treeProps.animate = animateVars;

      // control and useAnimation to set up animation once selected

      if (selectedIDs.some(id => id === currID)) {
        treeProps.selectControls = controls;
        treeProps.onAnimationComplete = definition => {
          controls.start(selectionVariant);
        };
      }

      //add control code here with useAnimation.  add control to animate Vars and then start it here.

      //figure out the next node
      let nextNode = null;

      if (treeArr[i].branch) {
        nextNode = generateTree(
          currItem.branch,
          prevIds,
          ids,
          prevClosed || !open, // pass in status of the current node (true if closed)
          selectedIDs,
          node + 1,
          animDelay
        );
      } else {
        nextNode = currItem.endLeaf && currItem.endLeaf;
      }

      buffer.push(<Tree {...treeProps}>{nextNode}</Tree>);
    }
    return buffer;
  }

  // take idList which is a list of ids, then go through the state of id's and set the ones of interest to true
  const highlightSelectedIDs = idList => {
    setOpenObj(prev => {
      const temp = { ...prev };
      idList.forEach(id => {
        while (id.length !== 0) {
          temp[id] = true;
          id = id.slice(0, -1);
        }
      });
      return temp;
    });
  };

  return (
    <div className="App">
      <div>Hello</div>
      {generateTree(mainTree, prevObj, openObj, false, selectedIDs)}
      <button onClick={handleClick}>Search</button>
    </div>
  );
}

export default App;
