(function () {
  var Memory = {
    init: function (cards) {
      this.$game = $(".game");
      this.$modal = $(".modal");
      this.$overlay = $(".modal-overlay");
      this.$restartButton = $("button.restart");
      this.cardsArray = cards;
      this.shuffleCards(this.cardsArray);
      this.setup();
    },

    shuffleCards: function (cardsArray) {
      this.$cards = $(this.shuffle(cardsArray));
    },

    setup: function () {
      this.html = this.buildHTML();
      this.$game.html(this.html);
      this.$memoryCards = $(".card");
      this.paused = false;
      this.guess = null;
      this.binding();
    },

    binding: function () {
      this.$memoryCards.on("click", this.cardClicked);
      this.$restartButton.on("click", $.proxy(this.reset, this));
    },

    cardClicked: function () {
      var _ = Memory;
      var $card = $(this);
      if (
        !_.paused &&
        !$card.find(".inside").hasClass("matched") &&
        !$card.find(".inside").hasClass("picked")
      ) {
        $card.find(".inside").addClass("picked");
        if (!_.guess) {
          _.guess = $card.attr("data-id");
        } else if (
          _.guess == $card.attr("data-id") &&
          !$card.hasClass("picked")
        ) {
          $(".picked").addClass("matched");
          _.guess = null;
        } else {
          _.guess = null;
          _.paused = true;
          setTimeout(function () {
            $(".picked").removeClass("picked");
            Memory.paused = false;
          }, 600);
        }
        if ($(".matched").length == $(".card").length) {
          _.win();
        }
      }
    },

    win: function () {
      this.paused = true;
      setTimeout(function () {
        Memory.showModal();
        Memory.$game.fadeOut();
      }, 1000);
    },

    showModal: function () {
      this.$overlay.show();
      this.$modal.fadeIn("slow");
    },

    hideModal: function () {
      this.$overlay.hide();
      this.$modal.hide();
    },

    reset: function () {
      this.hideModal();
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show("slow");
    },

    shuffle: function (array) {
      var counter = array.length,
        temp,
        index;
      while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },

    buildHTML: function () {
      var frag = "";
      this.$cards.each(function (index, card) {
        frag +=
          '<div class="card" data-id="' +
          card.id +
          '"><div class="inside">\
          <div class="front"><img src="' +
          card.img +
          '"\
          alt="' +
          card.name +
          '" /></div>\
          <div class="back"><img src="./b.png"\
          alt="Codepen" /></div></div>\
          </div>';
      });
      return frag;
    },
  };

  var cards2 = [];

  for (var i = 1; i <= 48; i += 4) {
    console.log(`${i+3}`)
    cards2.push(
      {
        img: `../cards/${i}.png`,
        id: i,
      },
      {
        img: `../cards/${i + 1}.png`,
        id: i,
      },
      {
        img: `../cards/${i + 2}.png`,
        id: i + 2,
      },
      {
        img: `../cards/${i + 3}.png`,
        id: i + 2,
      }
    );
  }

  Memory.init(cards2);
})();