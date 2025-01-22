//  function that takes a string and returns it with the first character capitalized

export default function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
