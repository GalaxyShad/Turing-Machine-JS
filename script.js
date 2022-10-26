// console.log("dfsfdsdfsdf");

const nTapeBack = document.querySelector("#tape-back");
const nTape = document.querySelector("#tape");
const nCursor = document.querySelector("#cursor");

const nCurState = document.querySelector("#cur-state");
const nCurSym = document.querySelector("#cur-sym");

const viewUpdateTapeCurrElement = () => {
  const cursorRect = nCursor.getBoundingClientRect();
  const nTapeElements = nTape.querySelectorAll(".tape__element");

  let i;
  nTapeElements.forEach((node, index) => {
    const nodeRect = node.getBoundingClientRect();
    const delta = Math.abs(
      (nodeRect.left + nodeRect.right) / 2 -
        (cursorRect.left + cursorRect.right) / 2
    );

    if (delta < 52) {
      node.classList.add("active");
    } else {
      node.classList.remove("active");
    }
  });
};

const updateView = ({ values, cursor, state }) => {
  nTape.innerHTML = "";

  list = values.split("");
  list.forEach((val, index) => {
    const nCell = document.createElement("input");
    nCell.className = "tape__element";

    nCell.value = val;

    nCell.onfocus = () => (nCell.value = "");
    nCell.onblur = () => (nCell.value = nCell.value == "" ? 0 : nCell.value);
    nCell.oninput = () => {
      if (nCell.value.length >= 1)
        nTape.childNodes[
          Array.from(nTape.childNodes).indexOf(nCell) + 1
        ].focus();
    };
    nCell.onkeydown = (e) => {
      if (e.key == "ArrowRight")
        nTape.childNodes[
          Array.from(nTape.childNodes).indexOf(nCell) + 1
        ].focus();
      else if (e.key == "ArrowLeft")
        nTape.childNodes[
          Array.from(nTape.childNodes).indexOf(nCell) - 1
        ].focus();
    };

    nTape.appendChild(nCell);
  });

  nTape.childNodes[cursor].scrollIntoView({
    behavior: "auto",
    block: "center",
    inline: "center",
  });

  nCurState.innerHTML = state;
  nCurSym.innerHTML = values[cursor];

  viewUpdateTapeCurrElement();
};

const getView = () => {
  let str = "";
  let cursor = 0;

  nTape.childNodes.forEach((node, index) => {
    node.classList.forEach((cls) => {
      if (cls == "active") {
        cursor = index;
      }
    });
  });

  nTape.childNodes.forEach((c) => (str += c.value));

  return { values: str, cursor: cursor, state: nCurState.innerHTML };
};

nTapeBack.onscroll = viewUpdateTapeCurrElement;

const turingSumProgram = () => {
  return {
    Q0: {
      '1': { state: "Q1", out: "0", action: "R" },
      "=": { state: "Q3", out: "=", action: "R" },
      "+": { state: "Q0", out: "+", action: "R" },
      '0': { state: "Q0", out: "0", action: "R" },
    },

    Q1: {
      '1': { state: "Q1", out: "1", action: "R" },
      "=": { state: "Q1", out: "=", action: "R" },
      "+": { state: "Q1", out: "+", action: "R" },
      '0': { state: "Q2", out: "1", action: "L" },
    },

    Q2: {
      '1': { state: "Q2", out: "1", action: "L" },
      "=": { state: "Q2", out: "=", action: "L" },
      "+": { state: "Q2", out: "+", action: "L" },
      '0': { state: "Q0", out: "0", action: "R" },
    },

    Q3: {
      '1': { state: "Q3", out: "1", action: "S" },
      "=": { state: "Q3", out: "=", action: "S" },
      "+": { state: "Q3", out: "+", action: "S" },
      '0': { state: "Q3", out: "0", action: "S" },
    },
  };
};

const turingMultiplyProgram = () => {
  return {
    Q0: {
      '0': { state: "Q0", out: "0", action: "R" },
      "2": { state: "Q0", out: "2", action: "R" },
      "=": { state: "Q0", out: "=", action: "R" },
      '1': { state: "Q0", out: "1", action: "R" },
      'x': { state: "Q1", out: "x", action: "R" },
    },

    Q1: {
      '1': { state: "Q2", out: "2", action: "R" },
      "2": { state: "Q1", out: "2", action: "R" },
      "0": { state: "Q1", out: "0", action: "R" },
      '=': { state: "Q1", out: "=", action: "R" },
      'x': { state: "Q1", out: "x", action: "R" },
    },

    Q2: {
      '1': { state: "Q2", out: "1", action: "L" },
      "2": { state: "Q2", out: "2", action: "L" },
      "=": { state: "Q2", out: "=", action: "L" },
      'x': { state: "Q3", out: "x", action: "L" },
      '0': { state: "Q2", out: "0", action: "R" },
    },

    Q3: {
      '1': { state: "Q4", out: "2", action: "R" },
      "2": { state: "Q3", out: "2", action: "L" },
      "0": { state: "Q6", out: "0", action: "R" },
      'x': { state: "Q6", out: "x", action: "R" },
      '=': { state: "Q6", out: "=", action: "R" },
    },
    
    Q4: {
      'x': { state: "Q4", out: "x", action: "R" },
      "2": { state: "Q4", out: "2", action: "R" },
      "=": { state: "Q4", out: "=", action: "R" },
      '1': { state: "Q4", out: "1", action: "R" },
      '0': { state: "Q5", out: "1", action: "R" },
    },
    
    Q5: {
      '1': { state: "Q2", out: "1", action: "L" },
      "2": { state: "Q2", out: "2", action: "L" },
      "0": { state: "Q2", out: "0", action: "L" },
      '=': { state: "Q2", out: "=", action: "L" },
      'x': { state: "Q2", out: "x", action: "L" },
    },
    
    Q6: {
      '2': { state: "Q6", out: "1", action: "R" },
      "x": { state: "Q7", out: "x", action: "R" },
      "1": { state: "Q6", out: "1", action: "R" },
      '0': { state: "Q6", out: "0", action: "R" },
      '=': { state: "Q6", out: "=", action: "R" },
    },
    
    Q7: {
      '2': { state: "Q7", out: "2", action: "R" },
      "1": { state: "Q2", out: "2", action: "R" },
      "=": { state: "Q8", out: "=", action: "L" },
      '0': { state: "Q7", out: "0", action: "R" },
      'x': { state: "Q7", out: "x", action: "R" },
    },

    Q8: {
      '2': { state: "Q8", out: "1", action: "L" },
      "x": { state: "Q9", out: "x", action: "S" },
      "1": { state: "Q8", out: "1", action: "R" },
      '0': { state: "Q8", out: "0", action: "R" },
      '=': { state: "Q8", out: "=", action: "R" },
    },
  };
};


const turingAlexMultProgram = () => {
  return {
    Q0: {
      '1': { state: "Q1", out: "0", action: "R" },
      "=": { state: "Qm", out: "=", action: "L" },
      "*": { state: "Qd", out: "0", action: "R" },
      '0': { state: "Q0", out: "0", action: "R" },
    },

    Q1: {
      '1': { state: "Q1", out: "1", action: "R" },
      "=": { state: "Q1", out: "=", action: "R" },
      "*": { state: "Q0", out: "*", action: "R" },
      '0': { state: "Qb", out: "1", action: "L" },
    },

    Qb: {
      '1': { state: "Qb", out: "1", action: "L" },
      "=": { state: "Qb", out: "=", action: "L" },
      //"*": { state: "Q2", out: "+", action: "L" },
      '0': { state: "Q0", out: "0", action: "R" },
    },

    Qm: {
      //'1': { state: "Q3", out: "1", action: "S" },
      //"=": { state: "Q3", out: "=", action: "S" },
      "*": { state: "Qb", out: "*", action: "L" },
      '0': { state: "Qm", out: "1", action: "L" },
    },

    Qd: {
      '1': { state: "Qd", out: "0", action: "R" },
      "=": { state: "Qd", out: "0", action: "S" },
      //"*": { state: "Q3", out: "+", action: "S" },
      '0': { state: "Qd", out: "0", action: "S" },
    },
  };
};


// const turingProgram = turingSumProgram();
// const turingProgram = turingMultiplyProgram();
const turingProgram = turingAlexMultProgram();

const turingIterate = ([roll, cur = 0, state = "Q0"]) => {
  const c = roll[cur];

  const curState = turingProgram[state][c];

  let newCur = cur;
  switch (curState.action) {
    case "R":
      newCur++;
      break;
    case "L":
      newCur--;
      break;
    case "S":
      newCur;
      break;
  }

  return [
    [roll.slice(0, cur)] + curState.out + roll.slice(cur + 1),
    newCur,
    curState.state,
  ];
};

const btnIterate = document.querySelector("#btn-iterate");
const btnMode = document.querySelector("#btn-mode");

let sumModeFlag = true;
btnMode.onclick = () =>
  (btnMode.innerHTML = (sumModeFlag = !sumModeFlag)
    ? "Summation Mode"
    : "Multiply Mode");

updateView({
  values: "000000000000000000000000000000",
  cursor: 0,
  state: "Q0",
});

btnIterate.onclick = () => {
  view = getView();
  let turing = turingIterate([view.values, view.cursor, view.state]);
  view.values = turing[0];
  view.cursor = turing[1];
  view.state = turing[2];

  updateView(view);

  console.log(view.state);
  updateView(view);
};
