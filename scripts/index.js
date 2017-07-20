import Node from './Node'
import Trie from './Trie'
import words from './words'
// const $ = require('jquery')

let searchTrie = new Trie();



$(document).ready(populateDictionary)


function populateDictionary() {
  searchTrie.populate(words)
  console.log(searchTrie.count());
}

$('#wordinput').on('input', function(){
  console.log('hi')
  if($('#wordinput').val() === ''){
    $('#append-sect').empty()
  }else{
    filterList();
  }
})

function filterList () {
  let string = $('#wordinput').val().toLowerCase();
  let suggestions = searchTrie.suggest(string);
  $('#append-sect').empty()

  for(let i = 0; i < 15; i++){
    if(suggestions[i] !== undefined) {
      $('.append-sect').append(`<ul id='list-item'>${suggestions[i]}</ul>`)
    }
  }
}

$('.append-sect').on('click','#list-item', selectWord)

function selectWord(event) {
  console.log(event.target);
  console.log('[',event.target.innerHTML,']');
  let selected = event.target.innerHTML;
  searchTrie.select(selected);
  filterList()
}
