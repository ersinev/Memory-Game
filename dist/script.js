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
      this.$overlay.fadeIn("slow"); // Use fadeIn to show the overlay
      this.$modal.fadeIn("slow");   // Use fadeIn to show the modal
    },
    
    hideModal: function () {
      this.$overlay.fadeOut("slow"); // Use fadeOut to hide the overlay
      this.$modal.fadeOut("slow");   // Use fadeOut to hide the modal
    },
    reset: function () {
      this.hideModal();
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show("slow");
      this.resetTimer(); // Reset the timer when the game is reset
      this.startTimer(); // Start the timer when the game begins
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
          '<div class="card " data-id="' +
          card.id +
          '"><div class="inside">\
          <div class="front"><img src="' +
          card.img +
          '"\
          alt="' +
          card.name +
          '" /></div>\
          <div class="back"><img src="../cards/b.png"\
          alt="Codepen" /></div></div>\
          </div>';
      });
      return frag;
    },

    

    

    
    
  };

  var cards2 = [];

  for (var i = 1; i <= 48; i += 4) {
    
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
  const inputBtn = document.querySelector("#inputBtn");
  const inputPart = document.querySelector(".inputPart");
  const time = document.querySelector(".time")
  const wrap = document.querySelector(".wrap");
  const main = document.querySelector(".main");

  
  inputBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log("button clicked");
    console.log("button clicked")
    inputPart.style.display= "none"
    main.style.display= "block"
    wrap.style.display = "block"; 
    wrap.style.filter = "blur(0px)"; 
    time.style.display = "block"; 
   
    window.setInterval(function () {
  }, 1000);

     
  });
  
  
  
   
  
    
  // function testWinScenario() {
  //   // Mark all cards as "matched"
  //   Memory.$memoryCards.find('.inside').addClass('matched');
  //   // Trigger the win function
  //   Memory.win();
  // }

  // // Call the testing function when needed (for testing purposes)
  // // For example, you can call it after a certain timeout, like this:
  // setTimeout(testWinScenario, 1000); // Simulate a win after 1 second







  
})();
