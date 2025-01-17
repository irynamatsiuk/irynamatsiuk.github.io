export default class LinkedList {
  constructor() {
    this.head = null;
  }

  append(k, v) {
    let node = new Node(k, v);
    let current;
    if (this.head === null) this.head = node;
    else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }

  update(k, v) {
    let current = this.head;
    while (current) {
      if (current.key === k) current.value = v;
      return;
    }
    return false;
  }

  get(k) {
    let current = this.head;
    while (current) {
      if (current.key === k) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }

  getEntry(index) {
    let count = 0;
    let current = this.head;
    let arr = [];
    while (current) {
      if (count === index) {
        arr.push(current.key);
        arr.push(current.value);
        return arr;
      } else {
        count++;
        current = current.next;
      }
    }
  }

  size() {
    let size = 0;
    let current = this.head;
    while (current) {
      size++;
      current = current.next;
    }
    return size;
  }

  contains(k) {
    let current = this.head;
    while (current) {
      if (current.key === k) return true;
      else {
        current = current.next;
      }
    }
    return false;
  }

  getKey() {
    let current = this.head;
    let arr = [];
    while (current) {
      let string = `${current.key}`;
      arr.push(string);
      current = current.next;
    }
    return arr;
  }

  getValue() {
    let current = this.head;
    let arr = [];
    while (current) {
      let string = `${current.value}`;
      arr.push(string);
      current = current.next;
    }
    return arr;
  }

  getkeyValuePair() {
    let current = this.head;
    let arr = [];
    while (current) {
      let string = `[${current.key}, ${current.value}]`;
      arr.push(string);
      current = current.next;
    }
    return arr;
  }

  removeEntry(k) {
    let current = this.head;
    let previous;
    if (this.head.next === null) {
      this.head = null;
      return true;
    } else if (this.head.key === k) {
      this.head = this.head.next;
      return true;
    } else {
      while (current) {
        if (current.key != k) previous = current;
        current = current.next;
      }
      if (current === null) {
        previous.next = null;
        return true;
      } else {
        previous.next = current.next;
        return true;
      }
    }
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}
