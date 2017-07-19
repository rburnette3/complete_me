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

    // find suggest root node
    for (let i = 0; i < wordAsArray.length; i++) {
      currNode = currNode.children[wordAsArray[i]]
      //console.log('CURR NODE:', currNode);
    }

    // currNode now refers to the last leter in our word
    const traverseTheTrie = (word, currNode) => {
      let childLetters = Object.keys(currNode.children);

      childLetters.forEach( letter => {
        const childNode = currNode.children[letter];
        let childNodeWord = word + letter;

        if (childNode.isWord) {
          suggestionArray.push({
            name: childNodeWord,
            frequency: childNode.frequency,
            timeStamp: childNode.timeStamp
          });
        }
        traverseTheTrie(childNodeWord, childNode);
      } )

    };

    if (currNode && currNode.isWord) {
      suggestionArray.push({
        name: word,
        frequency: currNode.frequency,
        timeStamp: currNode.timeStamp
      });
    }

    if (currNode) {
      traverseTheTrie(word, currNode);
    }

    console.log('suggestionArray:', suggestionArray);
    suggestionArray.sort((a, b) => {
      return b.frequency - a.frequency || b.timeStamp - a.timeStamp
    })

    return suggestionArray.map( obj => obj.name )
  }


  select(word) {
    let wordsArray = [...word];
    let currNode = this.root;

  for (let i = 0; i < wordsArray.length; i++) {
    currNode = currNode.children[wordsArray[i]]
  }

  console.log(('CURR NODE:', currNode))
  currNode.frequency++
  currNode.timeStamp = Date.now();
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }

}
