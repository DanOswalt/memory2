new Vue({
  el: "#vue-app",
  data: {
    tiles: tiles,
    shuffledSet: [],
    selectedTiles: [],
    backgrounds: backgrounds,
    streak: 0,
    score: 0,
    matchesCount: 0
  },
  methods: {
    newGame: function () {
      this.reset();
      this.setupBoard();
    },
    reset: function () {
      this.shuffledSet = [];
      this.selectedTiles = [];
      this.streak = 0;
      this.score = 0;
      this.matchesCount = 0;
    },
    setupBoard: function () {
      this.shuffledSet = chance.shuffle(this.tiles);
    },
    select: function (clickedIndex, matchId) {
      const tile = this.shuffledSet[clickedIndex];
      if(!tile.selected) {
        tile.selected = true;
        tile.background = this.backgrounds[matchId];
        this.selectedTiles.push({index: clickedIndex, matchId: matchId});
        this.checkForMatch();
      }
    },
    checkForMatch: function () {
      if(this.selectedTiles.length === 2) {

        //alias the tiles
        var tile1 = this.selectedTiles[0];
        var tile2 = this.selectedTiles[1];

        if(tile1.matchId === tile2.matchId) {
          console.log('match found');
          tile1.matched = tile2.matched = true;
          this.streak += 1;
          this.score += this.streak * 2;
          this.matchesCount += 1;
          this.selectedTiles = [];
        } else {
          console.log('no match');
          this.streak = 0;
          this.score -= 1;
          setTimeout(this.unSelect, 1200);
        }
      }
    },
    unSelect: function () {
      this.selectedTiles.forEach(tile => {
        this.shuffledSet[tile.index].background = "#444";
        this.shuffledSet[tile.index].selected = false;
        this.shuffledSet[tile.index].facedown = true;
      })

      this.selectedTiles = [];
    }
  }
})
