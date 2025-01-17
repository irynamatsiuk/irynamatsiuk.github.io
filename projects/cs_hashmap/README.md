# Project: Linked Lists

## Course: The Odin Project, Full Stack JavaScript path

### Chapter: "A Bit of Computer Science"

#### Description:

This project is a custom implementation of a hash map data structure, which is the most used data structures across programming languages.
Linked Lists are used to store the data in 'buckets' in order to handle collisions.
There is no GUI component to this project, it can be run in the command line using the node command installed with nodejs.

#### Assignment:

> Create a HashMap class or factory function with at least two variables for load factor and capacity. Proceed to create the following methods:

> 1. **hash(key)** takes a key and produces a hash code with it
> 2. **set(key, value)** takes two arguments: the first is a key, and the second is a value that is assigned to this key  
>    If a key already exists, then the old value is overwritten.  
>    Use linked lists to handle collisions  
>    Remember to grow your buckets to double their capacity when your hash map reaches the load factor
> 3. **get(key)** takes one argument as a key and returns the value that is assigned to this key.
>    If a key is not found, return null
> 4. **has(key)** takes a key as an argument and returns true or false based on whether or not the key is in the hash map
> 5. **remove(key)** takes a key as an argument
>    If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false
> 6. **length()** returns the number of stored keys in the hash map
> 7. **clear()** removes all entries in the hash map
> 8. **keys()** returns an array containing all the keys inside the hash map
> 9. **values()** returns an array containing all the values
> 10. **entries()** returns an array that contains each key, value pair
>     Example: [[firstKey, firstValue], [secondKey, secondValue]]

### List of references:

- [JavaScript HashMap: A Complete Guide](https://www.squash.io/javascript-hashmap-a-complete-guide/)
- [Hashmaps Using Javascript](https://flexiple.com/javascript/hashmaps-javascript)
- [Custom implementation of hashMap in javascript](https://ujjwalkrgupta.medium.com/custom-implementation-of-hashmap-in-javascript-7a9efede588b)
