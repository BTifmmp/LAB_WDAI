minField = document.getElementsByName("min-val")[0];
maxField = document.getElementsByName("max-val")[0];
capitalCheck = document.getElementsByName("capital")[0];
spacesCheck = document.getElementsByName("spaces")[0];

function generate() {
  minVal = parseInt(minField.value);
  maxVal = parseInt(maxField.value);
  includeCapital = capitalCheck.checked;
  includeSpaces = spacesCheck.checked;

  console.log(includeCapital);
  console.log(includeSpaces);

  alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  alphabetUpper = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  space = " ";

  available = alphabet;

  if (includeCapital) {
    available = available.concat(alphabetUpper);
  }

  if (includeSpaces) available.push(space);

  if (minVal >= maxVal) {
    alert("invalid lenght");
    return;
  }

  lenght = minVal + Math.random() * (maxVal - minVal);

  console.log(lenght);
  console.log(available);

  password = "";

  for (i = 0; i < lenght; i++) {
    const randomChar = available[Math.floor(Math.random() * available.length)];
    password += randomChar;
  }

  alert(password);
}
