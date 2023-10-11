let left = (array) => {
  let half = Math.ceil(array.length / 2);
  return array.slice(0, half);
};

let right = (array) => {
  let half = Math.ceil(array.length / 2);
  return array.slice(half);
};

let mergeArrays = (left, right) => {
  let arr = [];

  // length needs to be here as it gets updated each loop, want to compare only initial value
  let length = left.length + right.length;

  // go through both arrays, compare 1st value of both and add smallest to array
  for (let i = 0; i < length; i++) {
    if (left.length === 0) {
      // left side is empty, append rest of right side
      arr.push(...right);
      break;
    } else if (right.length === 0) {
      // right side is empty, append rest of left side
      arr.push(...left);
      break;
    }

    // compare 1st values of left and right
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return arr;
};

let mergeSort = (array) => {
  // base case
  if (array.length === 1) {
    return array;
  }

  // otherwise split the arrays in half
  let leftHalf = mergeSort(left(array));
  let rightHalf = mergeSort(right(array));

  // sort the 2 arrays
  return mergeArrays(leftHalf, rightHalf);
};

let removeDuplicates = array => {
    return array.filter((item, index) => array.indexOf(item) === index); 
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

function Node (data = null) {
  let left = null;
  let right = null;
  
  return { data, left, right };
};

function Tree (array) {
  let buildTree = (array) => {
    if(array.length === 0) {
      return null;
    }
  
    let mid = Math.floor(array.length / 2);
  
    let root = Node(array[mid]);
    root.left = buildTree(array.slice(0, mid));
    root.right = buildTree(array.slice(mid + 1));
  
    return root;
  }

  let root = buildTree(mergeSort(removeDuplicates(array)));

  let print = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  let insert = (data, currentNode = root) => {
    if (data > currentNode.data) {        // compare data
      if(currentNode.right === null) {      // right subtree is empty, insert here
        currentNode.right = Node(data);
        return;
      }
      insert(data, currentNode.right);     // insert into right subtree

    } else if (data < currentNode.data) { // compare data
      if(currentNode.left === null) {       // left subtree is empty, insert here
        currentNode.left = Node(data);
        return;
      }
      insert(data, currentNode.left);      // insert into left subtree

    } else {  // data already exists, don't insert
      return;
    }
  };

  // TODO
  let remove = (data, currentNode = root) => {

    if (currentNode === null) {
      return null;
    }
   
    if (data > currentNode.data) {          // compare data
      currentNode.right = remove(data, currentNode.right);      // remove from right subtree
      return currentNode;

    } else if (data < currentNode.data) {   // compare data
      currentNode.left = remove(data, currentNode.left);       // remove from left subtree
      return currentNode;

    } else if (data === currentNode.data) { // data found, remove from this node
      
      // leaf node
      if((currentNode.left === null) && (currentNode.right === null)) {
        return null;

      } else if(currentNode.right === null) { // left child node
        return currentNode.left;

      } else if(currentNode.left === null) {  // right child node
        return currentNode.right;
      } else {                                // 2 child node

        // go into right subnode
        let parent = currentNode;

        let minNode = currentNode.right;

        // find smallest node in right subtree
        while(minNode.left !== null) {
          parent = minNode;
          minNode = minNode.left;
        }

        if(parent !== currentNode) {
          parent.left = minNode.right;
        } else {
          parent.right = minNode.right;
        }

        currentNode.data = minNode.data;

        return currentNode;

      }

    }

  };

  let find = (data, currentNode = root) => {
    if (data > currentNode.data) {          // compare data
      if(currentNode.right === null) {      // right subtree is empty, return
        return;
      }
      return find(data, currentNode.right);        // dive right subtree

    } else if (data < currentNode.data) {   // compare data
      if(currentNode.left === null) {       // left subtree is empty, return
        return;
      }
      return find(data, currentNode.left);         // check left subtree

    } else if (data === currentNode.data) { // found!
      return currentNode;

    } else {                                // some error, return
      return;
    }
  };

  // visits each "row"
  let levelOrder = (cb = (node) => array.push(node.data), currentNode = root, array = []) => {
    if(currentNode === null) {
      return;
    }

    let queue = [];

    queue.push(currentNode);

    while(queue.length > 0) {
      currentNode = queue[0];

      cb(currentNode);  // call function on current node

      if(currentNode.left !== null) {
        queue.push(currentNode.left);
      }

      if(currentNode.right !== null) {
        queue.push(currentNode.right);
      }

      queue.shift();
    }

    return array;
  };

  // Visits left, current, right
  let inorder = (cb = (node) => array.push(node.data), currentNode = root, array = []) => {

    if (currentNode === null) {
      return;
    }

    inorder(cb, currentNode.left);
    cb(currentNode);
    inorder(cb, currentNode.right);

    return array;
  };

  // Visits current, left, right
  let preorder = (cb = (node) => array.push(node.data), currentNode = root, array = []) => {
    if (currentNode === null) {
      return;
    }

    cb(currentNode);
    preorder(cb, currentNode.left);
    preorder(cb, currentNode.right);

    return array;
  };

  // Visits left, right, current
  let postorder = (cb = (node) => array.push(node.data), currentNode = root, array = []) => {
    if (currentNode === null) {
      return;
    }

    postorder(cb, currentNode.left);
    postorder(cb, currentNode.right);
    cb(currentNode);

    return array;
  };

  let height = (currentNode = root) => {
    if (currentNode === null) { // empty root
      return 0;
    }
    
    if ((currentNode.left === null) && (currentNode.right === null)) {  // both are empty
      return 0;

    } else if (currentNode.left === null) {   // left is empty
      return 1 + height(currentNode.right);

    } else if (currentNode.right === null) {  // right is empty
      return 1 + height(currentNode.left);

    } else {                                  // neither is empty
      return 1 + Math.max(height(currentNode.left), height(currentNode.right));
    }
  };

  let depth = (targetNode, currentNode = root) => {
    if(targetNode === root) {
      return 0;
    }

    if(targetNode.data > currentNode.data) {            // go into right subtree
      return 1 + depth(targetNode, currentNode.right);

    } else if (targetNode.data < currentNode.data) {    // go into left subtree
      return 1 + depth(targetNode, currentNode.left);

    } else if (targetNode.data === currentNode.data) {  // found node
      return 0;

    } else {                                              // error
      return null;
    }

  };

  let isBalanced = (currentNode = root) => {
    return (Math.abs(height(currentNode.left) - height(currentNode.right)) > 1) ? false : true;
  };

  let rebalance = () => {
    let array = inorder(); // array with ordered list of items in original tree

    root = buildTree(array); // build new balanced tree out of sorted array
  };

  return { root, print, insert, remove, find, levelOrder, inorder, 
    preorder, postorder, height, depth, isBalanced, rebalance };
}

let array = Array.from({length: 20}, () => Math.floor(Math.random() * 100));

let myTree = Tree(array);

// test script

console.log(`Balanced: ${myTree.isBalanced()}`);

console.log(`Level order: ${myTree.levelOrder()}`);
console.log(`Inorder: ${myTree.inorder()}`);
console.log(`Preorder: ${myTree.preorder()}`);
console.log(`Postorder: ${myTree.postorder()}`);

myTree.insert(112);
myTree.insert(1512);
myTree.insert(12312);
myTree.insert(13242);
myTree.insert(1342);

myTree.print();

console.log(`Balanced: ${myTree.isBalanced()}`);

myTree.rebalance();
console.log(`Balanced: ${myTree.isBalanced()}`);

console.log(`Level order: ${myTree.levelOrder()}`);
console.log(`Inorder: ${myTree.inorder()}`);
console.log(`Preorder: ${myTree.preorder()}`);
console.log(`Postorder: ${myTree.postorder()}`);

console.log(`Removing: ${myTree.root.data}`)

myTree.remove(myTree.root.data);

myTree.print();