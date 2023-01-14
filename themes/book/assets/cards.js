var card = function () {

  // Get and cache elements
  var card = document.getElementsByClassName('card');
  var cardFlip = document.getElementsByClassName('card-flippable');
  var cardFlipButton = document.getElementsByClassName('card-flip-button');
  var cardFlipContainer = document.getElementsByClassName('card-flip-container');

  // @TODO Make function to find closest ancestor
  function findAncestor(elem, ancestor) {
    var parent = elem;
    while (parent.parentNode != ancestor) {if (window.CP.shouldStopExecution(0)) break;
      parent = parent.parentNode;
    }window.CP.exitedLoop(0);
    return parent;
  }

  // @Private - Flippable interaction   
  function flipAction() {
    for (var i = 0; i < cardFlipButton.length; i++) {if (window.CP.shouldStopExecution(1)) break;
      cardFlipButton[i].addEventListener('click', function (e) {
        e.preventDefault();
        // There has to be a better way to do this
        //         console.log(findAncestor(e, cardFlipContainer));
        this.parentNode.parentNode.classList.toggle('card-flipped');
        this.parentNode.parentNode.parentNode.classList.toggle('card-flipped');
      });
    }window.CP.exitedLoop(1);
  }

  // @Public - Build flippable structure
  function flippable() {

    // Loop over cards in the DOM
    for (var i = 0; i < card.length; i++) {if (window.CP.shouldStopExecution(2)) break;

      // Cache card elements
      var cards = card[i];

      // Create flip-container element
      var flipContainer = document.createElement('div');
      flipContainer.setAttribute('class', 'card-flip-container');

      // Create flip button
      // Add href, add class, add inner icon
      var flipButton = document.createElement('a');
      flipButton.setAttribute('href', '#');
      flipButton.setAttribute('class', 'card-flip-button');
      flipButton.innerHTML += '<i class="fa fa-retweet"></i>';

      // Add flip-container and close button on cards with flippable attribute
      if (cards.getAttribute('data-card-flippable')) {

        // Get front and back child nodes, add flip-button and append to flip-container
        while (cards.firstChild) {if (window.CP.shouldStopExecution(3)) break;
          // Below is perferred method, however it does not work in Codepen's iFrame
          // cards.firstChild.innerHTML += flipButton;
          cards.firstChild.innerHTML += '<a href="#" class="card-flip-button"><i class="fa fa-retweet"></i></a>';
          flipContainer.appendChild(cards.firstChild);
        }

        // Add flip-container as child to card
        window.CP.exitedLoop(3);cards.appendChild(flipContainer);

        // Give  card `card-flippable` class    
        cards.classList.add('card-flippable');
      }
    }

    // Include flip interaction
    window.CP.exitedLoop(2);flipAction();
  }

  // @Public - Add ability to select cards   
  function selectable() {

    // Loop over cards in the DOM
    for (var i = 0; i < card.length; i++) {if (window.CP.shouldStopExecution(4)) break;

      // Cache card elements
      var cards = card[i];

      // Add selectable and selected classes on selectable cards
      if (cards.getAttribute('data-card-selectable')) {

        // Give  card `card-selectable` class    
        cards.classList.add('card-selectable');

        // Include selectable interaction
        cards.addEventListener('click', function () {
          this.classList.toggle('card-selected');
        });
      }
    }window.CP.exitedLoop(4);
  }

  // Return public methods
  return {
    flippable: flippable,
    selectable: selectable };


}();

// Initialize flippable cards
card.flippable();
card.selectable();