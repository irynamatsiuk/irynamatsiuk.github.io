// class, that represents the full list
class LinkedList {
  constructor() {
    this.head = null;
  }

  // class methods
  //adds a new node containing value to the end of the list
  append(value) {
    let node = new Node(value);
    let current;
    if (this.head === null) this.head = node;
    else {
      current = this.head;
      while (current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = node;
    }
  }

  // adds a new node containing value to the start of the list
  prepend(value) {
    let node = new Node(value);
    if (this.head == null) this.head = node;
    else {
      node.nextNode = this.head;
      this.head = node;
    }
  }

  // returns the total number of nodes in the list
  size() {
    let size = 0;
    let current = this.head;
    while (current) {
      size++;
      current = current.nextNode;
    }
    return size;
  }

  // returns the first node in the list
  getHead() {
    return this.head;
  }

  // returns the last node in the list
  getTail() {
    let current = this.head;
    if (current) {
      while (current.nextNode != null) {
        current = current.nextNode;
      }
    }
    return current;
  }

  // returns the node at the given index
  at(index) {
    let count = 0;
    let current = this.head;
    while (current) {
      if (count === index) return current;
      else {
        count++;
        current = current.nextNode;
      }
    }
  }

  // removes the last element from the list
  pop() {
    let secondLast = this.head;
    while (secondLast.nextNode.nextNode) {
      secondLast = secondLast.nextNode;
    }
    secondLast.nextNode = null;
  }

  // returns true if the passed in value is in the list
  // and otherwise returns false.
  contains(val) {
    let current = this.head;
    while (current) {
      if (current.value === val) return true;
      else {
        current = current.nextNode;
      }
    }
    return false;
  }

  //returns the index of the node containing value, or null if not found.
  find(val) {
    let count = 0;
    let current = this.head;
    while (current) {
      if (current.value === val) return count;
      else {
        count++;
        current = current.nextNode;
      }
    }
    return count;
  }

  // represents your LinkedList objects as strings,
  // so you can print them out and preview them in the console.
  // The format should be: ( value ) -> ( value ) -> ( value ) -> null
  toString() {
    let string = "";
    let current = this.head;
    while (current) {
      string += `( ${current.value} ) -> `;
      if (current.nextNode == null) {
        string += "null ";
      }
      current = current.nextNode;
    }
    return string;
  }

  //inserts a new node with the provided value at the given index.
  insertAt(value, index) {
    let node = new Node(value);
    let current = this.head;
    let previous;
    let count = 0;
    while (count < index) {
      count++;
      previous = current;
      current = current.nextNode;
    }
    node.nextNode = current;
    previous.nextNode = node;
  }

  // removes the node at the given index.
  removeAt(index) {
    let current = this.head;
    let previous;
    let count = 0;
    while (count < index) {
      count++;
      previous = current;
      current = current.nextNode;
    }
    previous.nextNode = current.nextNode;
  }
}

class Node {
  //constructor
  constructor(value) {
    if (!value) {
      this.value = null;
    }
    this.value = value;
    this.nextNode = null;
  }
}

// example of use linked list's class methods

const list = new LinkedList();

// add nodes to the end
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

list.prepend("horse"); // add node to the start of the list
console.log(list.toString()); // Output: ( horse ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> ( turtle ) -> null

console.log(list.size()); // Output: 7

console.log(list.getHead().value); // Output: horse

console.log(list.getTail().value); // Output: turtle

console.log(list.at(3).value); // shows the node's value at third index, output: parrot

list.pop(); // delete last item (turtle)
console.log(list.toString()); // Output: ( horse ) -> ( dog ) -> ( cat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> null

console.log(list.contains("cat")); // Output: true
console.log(list.contains("cow")); // Output: false

console.log(list.find("snake")); // Output: 5

list.insertAt("goat", 3); // add new node "goat" at index 3
console.log(list.toString()); // Output: ( horse ) -> ( dog ) -> ( cat ) -> ( goat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> null

list.removeAt(2); // remove node at index 2 (cat)
console.log(list.toString()); // Output: ( horse ) -> ( dog ) -> ( goat ) -> ( parrot ) -> ( hamster ) -> ( snake ) -> null
