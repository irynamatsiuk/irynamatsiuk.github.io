import HashMap from "./hash.mjs";

// create an instance of hash map
const map = new HashMap();

// add 25 key-value pairs
map.set("apple", "red");
map.set("banana", "yellow");
map.set("carrot", "orange");
map.set("dog", "brown");
map.set("elephant", "gray");
map.set("frog", "green");
map.set("grape", "purple");
map.set("hat", "black");
map.set("ice cream", "white");
map.set("jacket", "dark blue");
map.set("kite", "pink");
map.set("lion", "golden");
map.set("tiger", "striped");
map.set("sky", "blue");
map.set("dress", "wine red");
map.set("blouse", "off-white");
map.set("moon", "silver");
map.set("cap", "small");
map.set("chair", "soft");
map.set("sofa", "big");
map.set("table", "wooden");
map.set("garden", "clean");
map.set("food", "fresh");
map.set("cake", "tasty");
map.set("house", "big");

// get value of key "kite"
console.log(`Old value of key "kite": ${map.get("kite")}`); // Output: ...pink
// update value of key "kite"
map.set("kite", "beige");
console.log(`New value of key "kite": ${map.get("kite")}`); // Output: ...beige

// check value of the key, that is absent (watermelon) and present (banana) in the hashmap
console.log(`Get value for key "watermelon": ${map.get("watermelon")}`); // Output: ...null
console.log(`Get value of key "banana": ${map.get("banana")}`); // Output: ...yellow

console.log(`Length: ${map.length()}`); // Output: 17

// check if the hashmap has keys for "carrot" (it is in the hashmap) and for "bunny" (it isn't)
console.log(`Has carrot: ${map.has("carrot")}`); // Output: ...true
console.log(`Has bunny: ${map.has("bunny")}`); // Output: ...false

console.log(`Key-value pairs are: ${map.entries()}`);
console.log(`Keys are: ${map.keys()}`);
console.log(`Values are: ${map.values()}`);

// remove entries (dog - present, duck - absent in the hasmap)
console.log(`Remove "dog": ${map.remove("dog")}`); // Output: ...true
console.log(`Remove "duck": ${map.remove("duck")}`); // Output: ...false
console.log(map.entries());
