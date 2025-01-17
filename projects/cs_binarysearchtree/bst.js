class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function createTree(array) {
  sortedArray = [...array].sort((a, b) => a - b); // sort data from min to max
  cleanArray = [...new Set(sortedArray)]; // remove duplicates, Set() returns object, so convert back to array
  return {
    root: buildTree(cleanArray, 0, [cleanArray.length - 1]),
  };
}

// takes an array of data and turns it into a balanced binary tree
// full of Node objects appropriately placed
function buildTree(arr, start, end) {
  if (start > end) return null;
  // Find the middle element
  let mid = start + Math.floor((end - start) / 2);
  // Create root node
  let root = new Node(arr[mid]);
  // Create left subtree
  root.left = buildTree(arr, start, mid - 1);
  // Create right subtree
  root.right = buildTree(arr, mid + 1, end);
  return root;
}

// inserts a new node with the given data
function insert(root, value) {
  if (root === null) return new Node(value);
  // duplicates not allowed
  if (root.data === value) return root;
  if (value < root.data) root.left = insert(root.left, value);
  else if (value > root.data) root.right = insert(root.right, value);
  return root;
}

// heplper func for deleteNode()
function getSuccessor(curr) {
  curr = curr.right;
  while (curr != null && curr.left != null) {
    curr = curr.left;
  }
  return curr;
}

// deletes a node with a given value from the BST and
// returns the modified root of the BST
function deleteNode(root, value) {
  // base case
  if (root === null) {
    return root;
  }
  // if the value to be searched is in a subtree
  if (root.data > value) {
    root.left = deleteNode(root.left, value);
  } else if (root.data < value) {
    root.right = deleteNode(root.right, value);
  } else {
    // if the root matches with a given value
    // case 1: root has no children or only one right child
    if (root.left === null) return root.right;
    // case 2: root has only left child
    if (root.right === null) return root.left;
    // case 3: root has both children
    let succ = getSuccessor(root);
    root.data = succ.data;
    root.right = deleteNode(root.right, succ.data);
  }
  return root;
}

//  returns the node with the given value or null if the value is not present
function find(root, value) {
  if (root.data === null) return null;
  let node = root;
  while (node) {
    if (value < node.data) node = node.left;
    else if (value > node.data) node = node.right;
    else return node;
  }
  return null;
}

// find the height of a given node in the binary tree
// height - number of edges in the longest path connecting node to any leaf node
function findHeight(root, value) {
  let height = -1;
  // stores height of the Tree
  findHeightUtil(root, value);

  function findHeightUtil(root, value) {
    // base Case
    if (root == null) {
      return -1;
    }
    // store the maximum height of the left and right subtree
    const leftHeight = findHeightUtil(root.left, value);
    const rightHeight = findHeightUtil(root.right, value);
    // update height of the current node
    const h = Math.max(leftHeight, rightHeight) + 1;
    // if current node is the required node
    if (root.data == value) height = h;
    return h;
  }
  return height;
}

// returns the given node’s depth
// depth is defined as the number of edges in the path from a given node to the tree’s root node
function findDepth(root, value) {
  if (root == null) return -1;
  let depth = -1;
  if (
    root.data == value ||
    (depth = findDepth(root.left, value)) >= 0 ||
    (depth = findDepth(root.right, value)) >= 0
  )
    return depth + 1;
  return depth;
}

// breadth-first traversal
// level order traversal
function levelOrder(root) {
  if (root === null) return;
  // create en empty queue
  let queue = [];
  let results = [];
  queue.push(root);
  while (queue.length > 0) {
    // print front queue and remove it from queue
    const node = queue.shift();
    console.log(node.data);
    if (node.left !== null) {
      queue.push(node.left);
    }
    if (node.right !== null) {
      queue.push(node.right);
    }
    results.push(node.data);
  }
  return results;
}

// depth-first traversal

// preorder tree traversal
// at first visit the root then traverse left subtree
// and then traverse the right subtree.
function preOrder(root) {
  if (root === null) return;
  console.log(root.data + " ");
  preOrder(root.left);
  preOrder(root.right);
}

// inorder tree traversal
// at first traverse left subtree then visit the root
// and then traverse the right subtree
function inOrder(root) {
  if (root != null) {
    inOrder(root.left);
    console.log(root.data + " ");
    inOrder(root.right);
  }
}

// postorder tree traversal
// at first traverse left subtree then traverse the right subtree
// and then visit the root.
function postOrder(root) {
  if (root === null) return;
  postOrder(root.left);
  postOrder(root.right);
  console.log(root.data);
}

// checks if the tree is balanced
// a balanced tree is one where the difference between heights
// of the left subtree and the right subtree of every node is not more than 1
function isBalanced(root) {
  let result;
  if (root == null) return 0;
  let lh = isBalanced(root.left);
  if (lh == -1) return -1;
  let rh = isBalanced(root.right);
  if (rh == -1) return -1;
  if (Math.abs(lh - rh) > 1) return -1;
  else return Math.max(lh, rh) + 1;
}

// rebalances an unbalanced tree
function rebalance(root) {
  let array = levelOrder(root);
  const newTree = createTree(array);
  treeRoot = newTree.root;
}

// prints tree in terminal
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right != null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left != null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// Driver script
let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = createTree(arr);
let treeRoot = tree.root;

// tree visualisation in terminal
prettyPrint(treeRoot);
insert(treeRoot, "4000");
deleteNode(treeRoot, "67");

// tree visualisation in terminal
// node with value 67 was deleted and node with value 2 was inserted
prettyPrint(treeRoot);

// returns the node with the given value
console.log(`Found node's value: ${find(treeRoot, "9").data}`);

// returns the given node’s height
console.log(`Height of node with value 5: ${findHeight(treeRoot, "5")}`);

// returns the given node’s depth
console.log(`Depth of node with value 5: ${findDepth(treeRoot, "5")}`);

// breadth-first traversal
console.log("Level Order Traversal:");
// levelOrder(treeRoot);

// depth-first traversal
console.log("Preorder Traversal (root, left subtree, right subtree):");
preOrder(treeRoot);

console.log("Inorder Traversal (left subtree, root, right subtree):");
inOrder(treeRoot);

console.log("Postorder Traversal (left subtree, right subtree, root):");
postOrder(treeRoot);

// unbalance tree
insert(treeRoot, "10000");
insert(treeRoot, "20000");

// print unbalanced tree
console.log(prettyPrint(treeRoot));

// check if tree is balanced
if (isBalanced(treeRoot) > 0) console.log("Balanced");
else console.log("Not Balanced");

// rebalance tree with recently added values
rebalance(treeRoot);
prettyPrint(treeRoot);

// check if tree is balanced
if (isBalanced(treeRoot) > 0) console.log("Balanced");
else console.log("Not Balanced");
