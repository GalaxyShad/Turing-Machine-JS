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
      1: { state: "Q1", out: "0", action: "R" },
      "=": { state: "Q3", out: "=", action: "R" },
      "+": { state: "Q0", out: "+", action: "R" },
      0: { state: "Q0", out: "0", action: "R" },
    },

    Q1: {
      1: { state: "Q1", out: "1", action: "R" },
      "=": { state: "Q1", out: "=", action: "R" },
      "+": { state: "Q1", out: "+", action: "R" },
      0: { state: "Q2", out: "1", action: "L" },
    },

    Q2: {
      1: { state: "Q2", out: "1", action: "L" },
      "=": { state: "Q2", out: "=", action: "L" },
      "+": { state: "Q2", out: "+", action: "L" },
      0: { state: "Q0", out: "0", action: "R" },
    },

    Q3: {
      1: { state: "Q3", out: "1", action: "S" },
      "=": { state: "Q3", out: "=", action: "S" },
      "+": { state: "Q3", out: "+", action: "S" },
      0: { state: "Q3", out: "0", action: "S" },
    },
  };
};

const turingMultProgram = () => {
  return {
    Q0: {
      1: { state: "Q1", out: "0", action: "R" },
      "=": { state: "Q3", out: "=", action: "L" },
      "*": { state: "Q4", out: "*", action: "R" },
      0: { state: "Q0", out: "0", action: "R" },
    },

    Q1: {
      1: { state: "Q1", out: "1", action: "R" },
      "=": { state: "Q1", out: "=", action: "R" },
      "*": { state: "Q0", out: "*", action: "R" },
      0: { state: "Q2", out: "1", action: "L" },
    },

    Q2: {
      1: { state: "Q2", out: "1", action: "L" },
      "=": { state: "Q2", out: "=", action: "L" },
      0: { state: "Q0", out: "0", action: "R" },
    },

    Q3: {
      "*": { state: "Q2", out: "*", action: "L" },
      0: { state: "Q3", out: "1", action: "L" },
    },

    Q4: {
      1: { state: "Q4", out: "0", action: "R" },
      "=": { state: "Q4", out: "=", action: "S" },
      0: { state: "Q4", out: "0", action: "S" },
    },
  };
};

let turingProgram = turingSumProgram();

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
btnMode.onclick = () => {
  sumModeFlag = !sumModeFlag;

  btnMode.innerHTML = sumModeFlag
    ? "Summation Mode"
    : "Multiply Mode";

  turingProgram = sumModeFlag ? turingSumProgram() : turingMultProgram();
};

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
};

document.querySelector('#btn-iterate-100').onclick = () => {

  for (let i = 0; i < 100; i++) {
    view = getView();

    let turing = turingIterate([view.values, view.cursor, view.state]);
    view.values = turing[0];
    view.cursor = turing[1];
    view.state  = turing[2];

    updateView(view);
  }
  
}

document.querySelector('#btn-reset').onclick = () => {
  updateView({
    values: "000000000000000000000000000000",
    cursor: 0,
    state: "Q0",
  });
}
