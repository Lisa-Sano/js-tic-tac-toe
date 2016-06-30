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
    console.log(player);
    var selected_button = button.data('cell');
    var sym;
    player.id === 1 ? sym = '🌶' : sym = '🍹';
    button.text(sym);
    console.log(button);
    if (player.id === 1) {
      this.turn = this.player_two;
    } else {
      this.turn = this.player_one;
    }
  }
}

$(document).on('ready', function() {

})
