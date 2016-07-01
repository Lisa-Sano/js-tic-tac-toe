function Player(id, sym) {
  this.id = id;
  this.symbol = sym;
  this.numbers = {};
  this.letters = {};
  this.corners = [];
  this.center_sq = false;
}

function TicTacToe() {
  this.player_one = new Player(1, '🌶');
  this.player_two = new Player(2, '🍹');
  this.turn = this.player_one;
  this.turn_counter = 0;
}

TicTacToe.prototype = {
  play: function(player, button) {
    if (button.text() !== '') {return}
    button.text(player.symbol);
    var square = button.data('cell');
    var letter = square[0];
    var num = square[1];

    if (square === 'B2') {
      player.center_sq = true;
    } else if (['A1', 'A3', 'C1', 'C3'].includes(square)) {
      player.corners.push(square);
    }

    inc_or_create_key(player.numbers, num);
    inc_or_create_key(player.letters, letter);
    this.turn_counter++;
  },

  switch_turns: function(player) {
    if (player.id === 1) {
      this.turn = this.player_two;
    } else {
      this.turn = this.player_one;
    }

  },

  won: function(player) {
    var num_keys = Object.keys(player.numbers);
    var letter_keys = Object.keys(player.letters);

    // if any of the number counts is 3, they have a vertical win
    for (var n_key of num_keys) {
      if (player.numbers[n_key] === 3) {
        return true;
      } 
    }

    // if any of the letter counts is 3, they have a horizontal win
    for (var l_key of letter_keys) {
      if (player.letters[l_key] === 3) {
        return true;
      }
    }

    // if the player has something in all rows (letters) and columns (numbers) AND they claimed 
    // opposite corners, they have a diagonal win
    if (num_keys.length === 3 && letter_keys.length === 3 && player.center_sq === true) {
      if (containsAll(['A1', 'C3'], player.corners) || containsAll(['A3', 'C1'], player.corners)) {
        return true;
      }
    }

    return false;
  },

  check_winner: function(player) {
    if (this.won(player)) {
      $('p').text('PLAYER ' + player.id + ' WINS!');
      $('.reset').css("display", "block");
    } else if (this.turn_counter === 9) {
      $('p').text("IT'S A DRAW!");
      $('p').addClass('draw');
    }
  }
}

function inc_or_create_key(obj, key) {
  if (obj[key]) {
    obj[key]++;
  } else {
    obj[key] = 1;
  }
}

function containsAll(test_cases, corners){ 
  for(var i = 0 , len = test_cases.length; i < len; i++){
     if($.inArray(test_cases[i], corners) == -1) return false;
  }
  return true;
}

$(document).on('ready', function() {
  console.log('Welcome to Tic-Tac-Toe!');
  var ttt = new TicTacToe();
  $('.play').on('click', function(event) {
    ttt.show();
  })
  $('.grid').on('click', function(event) {
    event.preventDefault();
    var button = $(this);
    ttt.play(ttt.turn, button);
    ttt.check_winner(ttt.turn);
    ttt.switch_turns(ttt.turn);
  })
})
