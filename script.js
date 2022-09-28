console.log("dfsfdsdfsdf");


const vTM = document.querySelector(".turing-machine__roll");

const view = {
    state: 'Q0',
    cursor: 0,
    values: "000000000000000011000000000000000000000"
}


const updateView = (view) => {
    vTM.innerHTML = "";

    list = view.values.split('');
    list.forEach(
        (val, index) => {
            const nCell = document.createElement("input");
            nCell.className = "turing-machine__element";
            
            if (view.cursor == index) nCell.classList.add("point");
            nCell.value = val;

            vTM.appendChild(nCell);
        }
    );
};

const getViewRow = (view) => {
    let str = "";

    vTM.childNodes.forEach((c) => str += c.value);

    return str;
}

updateView(view);


const turingProgram = {
    Q0: {
        "1": {state: 'Q1', out: '0', action: 'R',},
        "=": {state: 'Q3', out: '=', action: 'R',},
        "+": {state: 'Q0', out: '+', action: 'R',},
        "0": {state: 'Q0', out: '0', action: 'R',},
    },
    
    Q1: {
        "1": {state: 'Q1', out: '1', action: 'R',},
        "=": {state: 'Q1', out: '=', action: 'R',},
        "+": {state: 'Q1', out: '+', action: 'R',},
        "0": {state: 'Q2', out: '1', action: 'L',},
    },

    Q2: {
        "1": {state: 'Q2', out: '1', action: 'L',},
        "=": {state: 'Q2', out: '=', action: 'L',},
        "+": {state: 'Q2', out: '+', action: 'L',},
        "0": {state: 'Q0', out: '0', action: 'R',},
    },

    Q3: {
        "1": {state: 'Q3', out: '1', action: 'S',},
        "=": {state: 'Q3', out: '=', action: 'S',},
        "+": {state: 'Q3', out: '+', action: 'S',},
        "0": {state: 'Q3', out: '0', action: 'S',},
    }
}

const turingIterate = ([roll, cur = 0, state = "Q0"]) => {
    const c = roll[cur];

    const curState = turingProgram[state][c];

    let newCur = cur;
    switch (curState.action) {
        case 'R': newCur++; break;
        case 'L': newCur--; break;
        case 'S': newCur; break;
    }

    // console.log(turingProgram[state], c, roll, cur, state);
    return [
        [roll.substring(0, cur)] + curState.out + roll.substring(cur+1), 
        newCur, 
        curState.state
    ]
}


const btnIterate = document.querySelector("#btnIterate");
const btnIterateUntilStop = document.querySelector("#btnIterateUntilStop");

btnIterate.onclick = () => {
    let turing = turingIterate([getViewRow(), view.cursor, view.state]);
    view.cursor = turing[1];
    view.values = turing[0];
    view.state = turing[2];

    console.log(view.state);
    updateView(view);
}
