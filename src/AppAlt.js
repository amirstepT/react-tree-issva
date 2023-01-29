import "./App.css";
import TreeAlt from "./TreeAlt";
import { useState, useEffect, useCallback } from "react";
import { useAnimation } from "framer-motion";
import { mainTree, variants, selectionVariant } from "./constants.js";

const generateIDArray = (treeArr, buffer) => {
  treeArr.forEach(val => {
    buffer[val.id] = {};
    buffer[val.id].open = false;
    buffer[val.id].control = useAnimation();
    if (val.branch) {
      generateIDArray(val.branch, buffer);
    }
  });
};

const ToggleChildren = (id, idList) => {
  const idLength = id.length;
  const keys = Object.keys(idList);
  keys.forEach(key => {
    const nextID = idList[key];
    if (
      key.slice(0, idLength) === id &&
      key.slice(idLength).length > 0 &&
      nextID.open
    ) {
      idList[id].open
        ? nextID.control.start("slideOut")
        : nextID.control.start("slideIn");
    }
  });
};

const openNodeAsync = async (id, idList, delay) => {
  console.log("starting anim on ", id);
  idList[id].control.start(["heightOpen", "slideIn"], {
    delay: delay * 0.4,
  });
  ToggleChildren(id, idList);
};

function App() {
  const objBuffer = {};
  generateIDArray(mainTree, objBuffer);
  const [openObj, setOpenObj] = useState(objBuffer);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const selectionControl = useAnimation();

  const handleSearch = event => {
    // assume selected id's are "aabc" and "ba"
    const tempSelectedIDs = ["aabc", "ba"];
    setSelectedIDs(tempSelectedIDs);

    setOpenObj(prev => {
      const temp = { ...prev };
      tempSelectedIDs.forEach(id => {
        let delay = 0;
        for (let i = 1; i <= id.length; i++) {
          let initID = id.slice(0, i);
          const tempObj = { ...temp[initID] };
          if (!tempObj.open) openNodeAsync(initID, openObj, delay++);
          tempObj.open = true;
          temp[initID] = tempObj;
        }
      });
      return temp;
    });
  };

  useEffect(() => {
    const keys = Object.keys(openObj);
    keys.forEach(key => openObj[key].control.set(["heightClosed", "slideOut"]));
  }, []);

  useEffect(() => {
    if (selectedIDs.length > 0) {
      selectionControl.start(selectionVariant);
      setSelectedIDs([]);
    }
  }, [selectedIDs]);

  const toggleHandler = id => {
    const anim = openObj[id].open
      ? ["heightClosed", "slideOut"]
      : ["heightOpen", "slideIn"];

    openObj[id].control.start(anim);

    ToggleChildren(id, openObj);

    setOpenObj(prev => {
      const temp = { ...prev };
      const tempObj = { ...temp[id] };
      tempObj.open = !tempObj.open;
      temp[id] = tempObj;
      return temp;
    });
  };

  function generateTree(treeArr, ids) {
    let buffer = [];
    for (let i = 0; i < treeArr.length; i++) {
      const currItem = treeArr[i]; // get current item
      const currID = currItem.id; // get id of current item
      const endNode = !(currItem.branch || currItem.endLeaf);
      const selected = selectedIDs.some(id => id === currID);

      const open = ids[currID].open && !endNode;

      // declare the props
      const treeProps = {
        content: currItem.title,
        key: currID,
        id: currID,
        open: open,
        variants: variants,
        toggleHandler: endNode ? () => {} : toggleHandler,
        animate: ids[currID].control,
        endNode,
      };

      if (selected) {
        treeProps.selectionControl = selectionControl;
      }

      //figure out the next node
      let nextNode = null;

      if (treeArr[i].branch) {
        nextNode = generateTree(currItem.branch, ids);
      } else {
        nextNode = currItem.endLeaf && currItem.endLeaf;
      }

      buffer.push(<TreeAlt {...treeProps}>{nextNode}</TreeAlt>);
    }
    return buffer;
  }

  return (
    <div className="App">
      {generateTree(mainTree, openObj)}
      <button onClick={handleSearch}>Searching</button>
    </div>
  );
}

export default App;
