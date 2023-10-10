class LinkedList {
    constructor() {
        this.listHead = null;
        this.listTail = this.listHead;
    }
    
    // add to the end of the list
    append(node) {
        if(this.listHead == null) { // empty list
            this.listHead = node;
            this.listTail = this.listHead;
        } else {
            this.listTail.nextNode = node;
            this.listTail = this.listTail.nextNode;
        }
    }
    
    // add to the beginning of the list
    prepend(node) {
        if(this.listHead == null) { // empty list
            this.listHead = node;
            this.listTail = this.listHead;
        } else {
            let oldHeadNode = this.listHead;
            this.listHead = node;
            node.nextNode = oldHeadNode;
        }
    }
    
    size() {
        let listSize = 0;
        let currentNode = this.listHead;
        while(currentNode != null) {
            listSize++;
            currentNode = currentNode.nextNode;
        }
        return listSize;
    }
    
    head() {
        return this.listHead;
    }
    
    tail() {
        return this.listTail;
    }
    
    at(index) {
        if(this.listHead == null) {
            return this.listHead;
        }
        if(index < 0) {
            return null;
        } else if (index > this.size()) {
            return null;
        }
        let currentNode = this.listHead;
        for(let i = 0; i < index; i++) {
            currentNode = currentNode.nextNode;
        }
        return currentNode;
    }
    
    pop() {
        let length = this.size();
        let currentNode = this.at(length - 2);
        currentNode.nextNode = null;
    }
    
    contains(val) {
        let currentNode = this.listHead;
        while(currentNode !== null) {
            if (currentNode.value === val) {
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        return false;
    }
    
    find(val) {
        let index = 0;
        let currentNode = this.listHead;
        while(currentNode !== null) {
            if (currentNode.value === val) {
                return index;
            }
            index++;
            currentNode = currentNode.nextNode;
        }
        return null;
    }
    
    toString() {
        let string = "";
        let currentNode = this.listHead;
        while (currentNode !== null) {
            string += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.nextNode;
        }
        
        return string += `null`;
    }
    
    insertAt(value, index) {
        if(index > this.size()) {
            console.log('Error: Index larger than list');
            return null;
        }
        if(index == 0) {
            let head = this.listHead;
            this.listHead = Node(value);
            this.listHead.nextNode = head;
            return;
        }
        if(this.listHead == null) {
            console.log('Error: Empty list');
            return null;
        }
        
        let currentNode = this.listHead;
        let currentIndex = 0;
        
        while(currentIndex < index - 1) {
            currentNode = currentNode.nextNode;
            currentIndex++;
        }
        
        let nextNextNode = currentNode.nextNode;
        currentNode.nextNode = Node(value);
        currentNode.nextNode.nextNode = nextNextNode;
    }
    
    removeAt(index) {
        if(this.listHead == null) {
            console.log('empty list');
            return;
        }
        if(index > this.size()) {
            console.log('index larger than list');
            return;
        }
        if(index == 0) {
            this.listHead = this.listHead.nextNode;
            return;
        }
        
        let currentNode = this.listHead;
        let currentIndex = 0;
        
        while(currentIndex < index - 1) {
            currentNode = currentNode.nextNode;
            currentIndex++;
        }
        
        currentNode.nextNode = currentNode.nextNode.nextNode;
    }
}

function Node (value = null) {
    let nextNode = null;
    
    return { value, nextNode };
}

let linkedList = new LinkedList();