import Node from './Node'

export default class Trie {
  constructor() {
    this.root = null
    this.wordCount = 0;
  }

  insert(word) {
    const node = new Node();

    if (!this.root) {
      this.root = node;
    }

    let letters = [...word.toLowerCase()];

    let currentNode = this.root;

    letters.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })
      if(!currentNode.isWord){
      this.wordCount ++;
      currentNode.value = word;
      currentNode.isWord = true;
      }

      // console.log(JSON.stringify(this.root, null, 4));

  }


count() {
  return this.wordCount;
}
suggest(word) {
    let wordAsArray = [...word];
    let currNode = this.root;
    let suggestionArray = [];

    for (let i = 0; i < wordAsArray.length; i++) {
      currNode = currNode.children[wordAsArray[i]]
      //console.log('CURR NODE:', currNode);
    }

    // currNode now refers to the last leter in our word
    const traverseTheTrie = (word, currNode) => {
      let keys = Object.keys(currNode.children);
      for (let k = 0; k < keys.length; k++) {
        // console.log('CURRENT NODE:', currNode, 'KEYS:', keys);
        const child = currNode.children[keys[k]];
        let newString = word + child.letter;
        if (child.isWord) {
          suggestionArray.push({name: newString, frequency: child.frequency});
        }
        traverseTheTrie(newString, child);
      }
    };

    if (currNode && currNode.isWord) {
      suggestionArray.push({name: word, frequency: currNode.frequency})
    }

    if (currNode) {
      traverseTheTrie(word, currNode);
    }

    console.log('suggestionArray:', suggestionArray);
    suggestionArray.sort((a, b) => {
      return b.frequency - a.frequency
    })

    return suggestionArray.map((obj) => {
      return obj.name;
    })
  }


  select(word) {
    let wordsArray = [...word];
    let currNode = this.root;

  for (let i = 0; i < wordsArray.length; i++) {
    currNode = currNode.children[wordsArray[i]]
  }
  currNode.frequency++
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

}
