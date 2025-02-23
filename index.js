//selectors

const output = document.querySelector(".output");
const result = document.querySelector(".result");
const btn = document.querySelectorAll(".btn");
const tablebody = document.querySelector(".tablebody");
const table = document.querySelector(".table");
let result1;
let result2;
let finalresult;
let head;
let tail;
const varname = document.querySelector(".varname");
const varval = document.querySelector(".varval");
const submit = document.querySelector(".submit");

//variable creation section
letteronly = () => {
  let regex = /[^a-z]/gi;
  varname.value = varname.value.replace(regex, "");
};
numberonly = () => {
  let regex = /[^0-9.]/gi;
  varval.value = varval.value.replace(regex, "");
};

let storevalue = [];

check = (ev) => {
  if (
    varname.value == "cos" ||
    varname.value == "tan" ||
    varname.value == "sin" ||
    varname.value == "pi" ||
    varname.value == "sq" ||
    varname.value == "e"
  ) {
    alert("invalid variable name or input");
    ev.preventDefault();
  } else {
    ev.preventDefault();
    findobj = (data, where, val) => {
      var search = data.some((obj) => obj[where] == val);

      if (search) {
        alert("varible name already exist");
      } else {
        let add = {
          uservar: varname.value,
          userval: varval.value,
        };
        storevalue.push(add);
        document.querySelector("form").reset();
      }
    };
    findobj(storevalue, "uservar", varname.value);
  }
};
document.querySelector(".submit").addEventListener("click", check);

// Calculator section

btn.forEach((btn) => {
  btn.addEventListener("click", calculate);
});

function calculate() {
  let buttontext = this.innerText;
  if (buttontext == "AC") {
    clearAll();
  } else if (buttontext == "CE") {
    backspace();
  } else if (buttontext === "=") {
    try {
      equals();
    } catch {
      result.innerText = "invalid input";
    }
  } else {
    output.value += buttontext;
    return;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "=" || e.key === "Enter") {
    try {
      equals();
    } catch {
      result.innerText = "invalid input";
    }
  } else if (e.key == "Delete") {
    clearAll();
  }
});

backspace = () => {
  output.value = output.value.slice(0, -1);
  return;
};

clearAll = () => {
  result.innerText = "0";
  output.value = "";
  return;
};

equals = () => {
  result1 = output.value;
  result2 = result1;
  result2 = result2.replace(/\s/g, "");
  let swap;
  let org;
  let org2;
  let org3;

  for (let a = 0; a < storevalue.length; a++) {
    if (result2.match(storevalue[a].uservar)) {
      result2 = result2.replaceAll(
        storevalue[a].uservar,
        storevalue[a].userval,
      );
    }
  }
  while (result2.includes("pi")) {
    org = result2.slice(result2.indexOf("pi") - 1, result2.indexOf("pi"));
    org2 = result2.slice(result2.indexOf("pi") + 2, result2.indexOf("pi") + 3);

    if (
      result2.indexOf("pi") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "(" &&
      result2.slice(-2) !== "pi" &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org2 !== ")"
    ) {
      result2 = result2.replace("pi", "*" + Math.PI.toFixed(4) + "*");
    } else if (
      result2.indexOf("pi") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "("
    ) {
      result2 = result2.replace("pi", "*" + Math.PI.toFixed(4));
    } else if (
      result2.slice(-2) !== "pi" &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org2 !== ")"
    ) {
      result2 = result2.replace("pi", Math.PI.toFixed(4) + "*");
    } else {
      result2 = result2.replace("pi", Math.PI.toFixed(4));
    }
  }

  while (result2.includes("e")) {
    org = result2.slice(result2.indexOf("e") - 1, result2.indexOf("e"));
    org2 = result2.slice(result2.indexOf("e") + 1, result2.indexOf("e") + 2);

    if (
      result2.indexOf("e") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "(" &&
      result2.slice(-1) !== "e" &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org2 !== ")"
    ) {
      result2 = result2.replace("e", "*" + Math.E.toFixed(4) + "*");
    } else if (
      result2.indexOf("e") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "("
    ) {
      result2 = result2.replace("e", "*" + Math.E.toFixed(4));
    } else if (
      result2.slice(-1) !== "e" &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org2 !== ")"
    ) {
      result2 = result2.replace("e", Math.E.toFixed(4) + "*");
    } else {
      result2 = result2.replace("e", Math.E.toFixed(4));
    }
  }

  while (result2.includes("cos")) {
    org = result2.slice(result2.indexOf("cos") - 1, result2.indexOf("cos"));
    const j = result2.indexOf(")", result2.indexOf("cos"));
    const x = result2.slice(result2.indexOf("cos"), j + 1);
    const val = result2.slice(result2.indexOf("cos") + 4, j);
    const cosf = Math.cos(eval(val)).toFixed(4);
    org2 = result2.slice(j + 1, j + 2);
    org3 = result2.slice(j, j + 1);
    console.log(org2);
    console.log(org3);

    if (
      result2.indexOf("cos") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "(" &&
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + cosf + "*");
      result2 = swap;
    } else if (
      result2.indexOf("cos") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + cosf);

      result2 = swap;
    } else if (
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, cosf + "*");
      result2 = swap;
    } else {
      swap = result2.replace(x, cosf);

      result2 = swap;
    }
  }

  while (result2.includes("sin")) {
    org = result2.slice(result2.indexOf("sin") - 1, result2.indexOf("sin"));
    const j = result2.indexOf(")", result2.indexOf("sin"));
    const x = result2.slice(result2.indexOf("sin"), j + 1);
    const val = result2.slice(result2.indexOf("sin") + 4, j);
    const sinf = Math.sin(eval(val)).toFixed(4);
    org2 = result2.slice(j + 1, j + 2);
    org3 = result2.slice(j, j + 1);

    if (
      result2.indexOf("sin") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "(" &&
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + sinf + "*");
      result2 = swap;
    } else if (
      result2.indexOf("sin") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + sinf);

      result2 = swap;
    } else if (
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, sinf + "*");
      result2 = swap;
    } else {
      swap = result2.replace(x, sinf);

      result2 = swap;
    }
  }
  while (result2.includes("tan")) {
    org = result2.slice(result2.indexOf("tan") - 1, result2.indexOf("tan"));
    const j = result2.indexOf(")", result2.indexOf("tan"));
    const x = result2.slice(result2.indexOf("tan"), j + 1);
    const val = result2.slice(result2.indexOf("tan") + 4, j);
    const tanf = Math.tan(val).toFixed(4);
    org2 = result2.slice(j + 1, j + 2);
    org3 = result2.slice(j, j + 1);
    if (
      result2.indexOf("tan") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "(" &&
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + tanf + "*");
      result2 = swap;
    } else if (
      result2.indexOf("tan") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + tanf);

      result2 = swap;
    } else if (
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, tanf + "*");
      result2 = swap;
    } else {
      swap = result2.replace(x, tanf);

      result2 = swap;
    }
  }
  while (result2.includes("log")) {
    org = result2.slice(result2.indexOf("log") - 1, result2.indexOf("log"));
    const j = result2.indexOf(")", result2.indexOf("log"));
    const x = result2.slice(result2.indexOf("log"), j + 1);
    const val = result2.slice(result2.indexOf("log") + 4, j);
    const logf = Math.log(eval(val)).toFixed(4);
    org2 = result2.slice(j + 1, j + 2);
    org3 = result2.slice(j, j + 1);

    if (
      result2.indexOf("log") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "(" &&
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + logf + "*");
      result2 = swap;
    } else if (
      result2.indexOf("log") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + logf);

      result2 = swap;
    } else if (
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, logf + "*");
      result2 = swap;
    } else {
      swap = result2.replace(x, logf);

      result2 = swap;
    }
  }
  while (result2.includes("sq")) {
    org = result2.slice(result2.indexOf("sq") - 1, result2.indexOf("sq"));
    const j = result2.indexOf(")", result2.indexOf("sq"));
    const x = result2.slice(result2.indexOf("sq"), j + 1);
    const val = result2.slice(result2.indexOf("sq") + 3, j);
    const sqf = Math.pow(eval(val), 2);
    org2 = result2.slice(j + 1, j + 2);
    org3 = result2.slice(j, j + 1);
    if (
      result2.indexOf("sq") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "(" &&
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + sqf + "*");
      result2 = swap;
    } else if (
      result2.indexOf("sq") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + sqf);

      result2 = swap;
    } else if (
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, sqf + "*");
      result2 = swap;
    } else {
      swap = result2.replace(x, sqf);

      result2 = swap;
    }
  }
  while (result2.includes("√")) {
    org = result2.slice(result2.indexOf("√") - 1, result2.indexOf("√"));
    const j = result2.indexOf(")", result2.indexOf("√"));
    const x = result2.slice(result2.indexOf("√"), j + 1);
    const val = result2.slice(result2.indexOf("√") + 2, j);
    const sqrtf = Math.sqrt(eval(val));
    org2 = result2.slice(j + 1, j + 2);
    org3 = result2.slice(j, j + 1);
    if (
      result2.indexOf("√") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "(" &&
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + sqrtf + "*");
      result2 = swap;
    } else if (
      result2.indexOf("√") > 0 &&
      org !== "+" &&
      org !== "-" &&
      org !== "*" &&
      org !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, "*" + sqrtf);

      result2 = swap;
    } else if (
      org3 !== result2.slice(-1) &&
      org2 !== "+" &&
      org2 !== "-" &&
      org2 !== "*" &&
      org2 !== "/" &&
      org !== "("
    ) {
      swap = result2.replace(x, sqrtf + "*");
      result2 = swap;
    } else {
      swap = result2.replace(x, sqrtf);

      result2 = swap;
    }
  }

  if (result2.includes("^") && result2.indexOf("^") > -1) {
    head = eval(result2.slice(0, result2.indexOf("^")));
    tail = eval(result2.slice(result2.indexOf("^") + 1));
    finalresult = Math.pow(eval(parseInt(head)), eval(parseInt(tail)));
  } else {
    finalresult = eval(result2);
    if (finalresult.toString().includes(".")) {
      result.innerText = finalresult.toFixed(4);
    } else {
      result.innerText = finalresult;
    }
  }

  if (!result1 == "" && !result.innerText == "") {
    addrow();
  }
};

// History section

addrow = () => {
  tablebody.innerHTML += `

  <tr>
  <td  class="addoutput" style="cursor: pointer;" >${result1}</td>
  <td>=</td>
  <td  class="addoutput" style="cursor: pointer;">${finalresult}</td>
  <td style="cursor: pointer;"> <i class="fa-solid fa-trash-can delbtn" ></i></td>

  
  </tr>

`;
};

deleterow = (e) => {
  if (!e.target.classList.contains("delbtn")) {
    return;
  }
  const btn = e.target;
  btn.closest("tr").remove();
};

addinput = (e) => {
  if (!e.target.classList.contains("addoutput")) {
    return;
  }
  const btn = e.target;
  output.value = btn.closest("td").innerText;
};

table.addEventListener("click", deleterow);

table.addEventListener("click", addinput);
