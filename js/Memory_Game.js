// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
            this.guess = null;
			this.guessM = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");

					// Message pour vérifier l'id (_.guess)
					//alert("id"+_.guess);

					// Apparition de la popup
					$(".id"+ _.guess).toggle( "slow" );

					// Sauvegarde de la popup ouverte
					_.guessM = _.guess;
					//alert("guess ="+ _.guess + "guessM =" +_.guessM);

					// Disparition de la PopUp
					$(document).ready(function () {
						$("button").click(function () {
							//alert(".id"+_.guessM);
							$(".id"+ _.guessM).toggle( "slow" );
							_.guessM = null;
						});
					});
                    
					
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},
        

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /></div>\
				<div class="back"><img src="../images/logo-web-component.webp"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}

	};

	var cards = [
		{
			name: "Professionalisation",
			img: "images/Bilan/Memory_Game/Professionalisation1.png",
			id: 1
		},
		{
			name: "Travail d'équipe",
			img: "images/Bilan/Memory_Game/Travail_d'equipe1.png",
			id: 2
		},
		{
			name: "Autonomie",
			img: "images/Bilan/Memory_Game/Autonomie1.png",
			id: 3
		},
		{
			name: "Rigueur",
			img: "images/Bilan/Memory_Game/Rigueur1.png",
			id: 4
		}, 
		{
			name: "Confiance_en_soi",
			img: "images/Bilan/Memory_Game/Confiance_en_soi.png",
			id: 5
		},
		{
			name: "nCommuniquer",
			img: "images/Bilan/Memory_Game/Parler1.png",
			id: 6
		},
		{
			name: "S'adapter",
			img: "images/Bilan/Memory_Game/S'adapter1.png",
			id: 7
		},
		{
			name: "python",
			img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
			id: 8
		},
	];
    
	Memory.init(cards);


})();