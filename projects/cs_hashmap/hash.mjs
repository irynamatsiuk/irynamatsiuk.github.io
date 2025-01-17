import LinkedList from "./linkedlist.mjs";

export default class HashMap {
  constructor() {
    this.loadfactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
    this.usedBuckets = 0;
  }

  // methods:
  // generates hashcode
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.buckets.length;
    }

    return hashCode;
  }

  // rehashes all entries and strore them in a new array with dubbled capacity
  expand() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.usedBuckets = 0;
    this.buckets = new Array(this.capacity);
    for (const bucket of oldBuckets) {
      if (bucket != undefined) {
        let bucketLength = bucket.size();
        for (let i = 0; i < bucketLength; i++) {
          const entry = bucket.getEntry(i);
          const key = entry[0];
          const value = entry[1];
          this.set(key, value);
        }
      }
    }
  }

  // inserts a key-value pair into the relevant bucket's linked list
  // if the key already exist, overwrites its value
  // in case of collision, it adds new node to linked list
  set(key, value) {
    if (this.usedBuckets / this.buckets.length > this.loadfactor) {
      this.expand();
    }
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append(key, value);
      this.usedBuckets++;
      return;
    }
    if (this.buckets[index].contains(key)) {
      this.buckets[index].update(key, value);
      return;
    }
    this.buckets[index].append(key, value);
  }

  // returns the value that is assigned to this key
  // if a key is not found, return null
  get(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      return this.buckets[index].get(key);
    }
    return null;
  }

  // returns the number of stored keys in the hash map
  length() {
    return this.usedBuckets;
  }

  // takes a key as an argument and returns true or false
  // based on whether or not the key is in the hash map
  has(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      return this.buckets[index].contains(key);
    }
    return false;
  }

  // removes the entry with that key and return true,
  // if the given key is in the hash map, otherwise it returns false
  remove(key) {
    const index = this.hash(key);
    if (this.buckets[index]) {
      if (this.buckets[index].contains(key)) {
        return this.buckets[index].removeEntry(key);
      }
      return false;
    }
    return false;
  }

  // removes all entries in the hash map
  clear() {
    this.entries = 0;
    this.buckets = new Array(16);
  }

  // returns an array containing all the keys inside the hash map
  keys() {
    let arr = [];
    for (const bucket of this.buckets) {
      if (bucket != undefined) {
        let key = bucket.getKey();
        arr.push(...key);
      }
    }
    return arr;
  }

  // returns an array containing all the values
  values() {
    let arr = [];
    for (const bucket of this.buckets) {
      if (bucket != undefined) {
        let value = bucket.getValue();
        arr.push(...value);
      }
    }
    return arr;
  }

  // returns an array that contains each key - value pair
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {
    let arr = [];
    for (const bucket of this.buckets) {
      if (bucket != undefined) {
        let keyValuePair = bucket.getkeyValuePair();
        arr.push(...keyValuePair);
      }
    }
    return arr;
  }
}
