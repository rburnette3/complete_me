import Node from './Node'

export default class Trie {
  constructor() {
    this.root = null;
  }

  insert(data) {
    if(this.root === null){
    this.root = new Node()
  }
  }
}
