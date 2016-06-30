function Player(id, sym) {
  this.id = id;
  this.symbol = sym;
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

    if (player.id === 1) {
      this.turn = this.player_two;
    } else {
      this.turn = this.player_one;
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
    