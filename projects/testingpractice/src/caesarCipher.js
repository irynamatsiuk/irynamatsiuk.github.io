// function that takes a string and a shift factor and returns it with each character “shifted”

export default function caesarCipher(string, shift) {
  let output = "";

  for (let i = 0; i < string.length; i++) {
    let code = string[i].charCodeAt();

    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      code += shift;
      if ((code > 90 && string[i] <= "Z") || code > 122) {
        code -= 26;
      }
    }
    output += String.fromCharCode(code);
  }
  return output;
}
