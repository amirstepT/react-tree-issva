// content of an endLeaf (example)
const IHContent = (
  <div
    style={{
      willChange: "height",
      marginTop: "6px",
      marginLeft: "6px",
      color: "red",
    }}
  >
    Some content
  </div>
);

// main tree has all content
const mainTree = [
  {
    id: "a",
    title: "Vascular Tumors",
    // pic: "blah.jpg",
    // genes: [gmRx, gRSL, GmraH],
    // info: ["info 1", "info2"],
    branch: [
      {
        id: "aa",
        title: "Benign",
        branch: [
          { id: "aaa", title: "Infantile hemangioma", endLeaf: IHContent },
          {
            id: "aab",
            title: "Congenital hemangioma",
            branch: [
              {
                id: "aaba",
                title: "Rapidly involuting congenital hemangioma (RICH)",
              },
              {
                id: "aabb",
                title: "Non-involuting congenital hemangioma (NICH)",
              },
              {
                id: "aabc",
                title: "Partially involuting congenital hemangioma (PICH)",
              },
            ],
          },
          { id: "aac", title: "Tufted angioma" },
          { id: "aad", title: "Spindle-cell hemangioma" },
          { id: "aae", title: "Epithelioid hemangioma" },
          { id: "aaf", title: "Pyogenic granuloma" },
          { id: "aag", title: "Tufted angioma" },
          {
            id: "aah",
            title: "Others",
            branch: [
              { id: "aaha", title: "Hobnail hemangioma" },
              { id: "aahb", title: "Microvenular hemangioma" },
              { id: "aahc", title: "Anastomosing hemangioma" },
              { id: "aahd", title: "Glomeruloid hemangioma" },
            ],
          },
          {
            id: "aai",
            title: "Related lesions",
            branch: [
              { id: "aaia", title: "Eccrine angiomatous hamartoma" },
              { id: "aaib", title: "Reactive angioendotheliiomatosis" },
              { id: "aaic", title: "Bacillary angiomatosis" },
            ],
          },
        ],
      },
      {
        id: "ab",
        title: "Locally aggressive or borderline",
        branch: [
          { id: "aba", title: "Kaposiform hemangioendothelioma" },
          { id: "abb", title: "Retiform hemangioendothelioma" },
          {
            id: "abc",
            title:
              "Papillary intralyphatic angioendothelioma (PILA), Dabska tumor",
          },
        ],
      },
      {
        id: "ac",
        title: "Malignant",
        branch: [
          { id: "aca", title: "Angiosarcoma" },
          { id: "acb", title: "Epithelioid hemangioendothelioma" },
          {
            id: "acc",
            title: "Others",
          },
        ],
      },
    ],
  },
  {
    id: "b",
    title: "Vascular Malformations",
    branch: [
      { id: "ba", title: "Simple", branch: [] },
      { id: "bb", title: "Combined", branch: [] },
      { id: "bc", title: "Of major named vessel", branch: [] },
      { id: "bd", title: "Associated with other anomalies", branch: [] },
    ],
  },
];

// variants for animating the tree components
const variants = {
  slideOut: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.4,
    },
  },
  heightClosed: {
    height: 0,
    transition: {
      duration: 0.4,
    },
  },
  heightOpen: i => ({
    height: "auto",
    transition: {
      ease: "easeInOut",
      duration: 0.4,
      delay: i * 0.4,
    },
  }),
  slideIn: i => ({
    opacity: 1,
    x: 0,
    transition: {
      //type: "spring",
      duration: 0.4,
      delay: i * 0.4,
      //delayChildren: 0.4,
    },
  }),
};

// variant for animation of selection (after search)
// basically animating the title (contents of span)
const selectionVariant = {
  backgroundColor: [
    "rgb(100, 180, 251, 0.0)",
    "rgb(100, 180, 251, 0.3)",
    "rgb(100, 180, 251, 0.3)",
    "rgb(100, 180, 251, 0.5)",
    "rgb(100, 180, 251, 0.0)",
  ],
  transition: {
    times: [0, 0.1, 0.7, 0.8, 1],
    duration: 4,
  },
};

export { mainTree, variants, selectionVariant };
