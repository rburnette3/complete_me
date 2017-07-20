import Node from './Node'
import Trie from './Trie'
import words from './words'
const $ = require('jquery')

let searchTrie = new Trie();

$(document).ready(populateDictionary)

function populateDictionary() {
  searchTrie.populate(words)
}

function selectWord(event) {
  let selected = event.target.innerHTML;

  searchTrie.select(selected);
  filterList()
}

function filterList () {
  let string = $('#wordinput').val().toLowerCase();
  let suggestions = searchTrie.suggest(string);

  $('#append-sect').empty()
  for (let i = 0; i < 15; i++) {
    if (suggestions[i] !== undefined) {
      $('.append-sect').append(`<ul id='list-item'>${suggestions[i]}</ul>`)
    }
  }
}

$('#wordinput').on('input', function() {
  if ($('#wordinput').val() === '') {
    $('#append-sect').empty()
  } else {
    filterList();
  }
})

$('.append-sect').on('click', '#list-item', selectWord)
