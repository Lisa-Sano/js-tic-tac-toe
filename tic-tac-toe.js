function Player(id, sym) {
  this.id = id;
  this.symbol = sym;
  this.numbers = {};
  this.letters = {};
}

function TicTacToe() {
  this.player_one = new Player(1, '🌶');
  this.player_two = new Player(2, '🍹');
  this.turn = this.player_one;
}

TicTacToe.prototype = {
  show: function() {
    $("#tic-tac-toe").show();
    $('.play').hide();
  },
  play: function(player, button) {
    if (button.text() !== '') {return}
    button.text(player.symbol);
    var letter = button.data('cell')[0];
    var num = button.data('cell')[1];

    this._inc_or_create_key(player.numbers, num);
    this._inc_or_create_key(player.letters, letter);

    if (this.won(player)) {
      console.log('PLAYER ' + player.id + " WINS!");
    } else if (player.id === 1) {
      this.turn = this.player_two;
    } else {
      this.turn = this.player_one;
    }
  },

  won: function(player) {
    // if letters are all the same, numbers are all the same, or letters & numbers different
    // then the player wins (letters/numbers from data-cell attr in buttons)
    var winner = false;
    var num_keys = Object.keys(player.numbers);
    var letter_keys = Object.keys(player.letters);

    if (num_keys.length === 3 && letter_keys.length === 3) {
      return true;
    }

    for (var n_key of num_keys) {
      if (player.numbers[n_key] === 3) {
        winner = true;
      } 
    }

    for (var l_key of letter_keys) {
      if (player.letters[l_key] === 3) {
        winner = true;
      }
    }

    return winner;
  }, 

  _inc_or_create_key: function(obj, key) {
    if (obj[key]) {
      obj[key]++;
    } else {
      obj[key] = 1;
    }
  }
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
  })
})
