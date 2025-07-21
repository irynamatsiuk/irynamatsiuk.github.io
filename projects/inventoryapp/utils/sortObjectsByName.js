function sortObjectsByName(array) {
  array.sort((a, b) => a.name.localeCompare(b.name));
  return array;
}

module.exports = {
  sortObjectsByName,
};
