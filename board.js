//create board
var createBoard = function() {
  file = ["A", "B", "C", "D", "E", "F", "G", "H"];
  rank = [8, 7, 6, 5, 4, 3, 2, 1];
  var count = 1;

  for (var i = 0; i < file.length; i++) {
    for (var j = 0; j < rank.length; j++) {
      //add tiles to the board
      if ((count-1) % 8 == 0) {
        $("#chessboard").append('<div class="tile" style="clear:left"></div>');
        //$("#chessboard").append('<p class="offsetLeft">file</p>');

      } else {
        $("#chessboard").append('<div class="tile"></div>');
      }
      //label tile number
      $(".tile").eq(count-1).attr({
        id: count
      });
      $(".tile").eq(count-1).attr("data-rank", rank[i]);
      $(".tile").eq(count-1).attr("data-file", j + 1);

      //else if determine if tile is on a corner
      //this if block gives each tile color
      if (count == 1) {
        $(".tile").eq(count-1).addClass("black");
        $(".tile").eq(count-1).addClass("tl");
        //$(".tile").eq(count).addClass("br");
      } else if (count == 8) {
        $(".tile").eq(count-1).addClass("white");
        $(".tile").eq(count-1).addClass("tr");
        //$(".tile").eq(count).addClass("br");

      } else if (count == 57) {
        $(".tile").eq(count-1).addClass("white");
        $(".tile").eq(count-1).addClass("bl");
      } else if (count == 64) {
        $(".tile").eq(count-1).addClass("black");
        $(".tile").eq(count-1).addClass("brc");
      } else if (((i % 2 == 0) && (j % 2 != 0)) || ((i % 2 != 0) && (j % 2 == 0))) {
        $(".tile").eq(count-1).addClass("white");
      } else {
        $(".tile").eq(count-1).addClass("black");
      }
      count++;

    }; //end for j
  }; //end for i
}; //end createboard

var addPieces = function() {
  //black non pawns
  $(".tile").eq(0).append('<img src="img/br.png" class="piece" name="rook" player="black" moves=0></img>')
  $(".tile").eq(1).append('<img src="img/bkn.png" class="piece" name="knight" player="black" moves=0></img>')
  $(".tile").eq(2).append('<img src="img/bb.png" class="piece" name="bishop" player="black" moves=0></img>')
  $(".tile").eq(3).append('<img src="img/bq.png" class="piece" name="queen" player="black" moves=0></img>')
  $(".tile").eq(4).append('<img src="img/bK.png" class="piece" name="king" player="black" moves=0></img>')
  $(".tile").eq(5).append('<img src="img/bb.png" class="piece" name="bishop" player="black" moves=0></img>')
  $(".tile").eq(6).append('<img src="img/bkn.png" class="piece" name="knight" player="black" moves=0></img>')
  $(".tile").eq(7).append('<img src="img/br.png" class="piece" name = "rook" player="black" moves=0></img>')
  //convert next 8 lines to loop
  $(".tile").eq(8).append('<img src="img/bp.png" class="piece" name="pawn" player="black" moves=0></img>')
  $(".tile").eq(9).append('<img src="img/bp.png" class="piece" name="pawn" player="black" moves=0></img>')
  $(".tile").eq(10).append('<img src="img/bp.png" class="piece" name="pawn" player="black" moves=0></img>')
  $(".tile").eq(11).append('<img src="img/bp.png" class="piece" name="pawn" player="black" moves=0></img>')
  $(".tile").eq(12).append('<img src="img/bp.png" class="piece" name="pawn" player="black" moves=0></img>')
  $(".tile").eq(13).append('<img src="img/bp.png" class="piece" name="pawn" player="black" moves=0></img>')
  $(".tile").eq(14).append('<img src="img/bp.png" class="piece" name="pawn" player="black" moves=0></img>')
  $(".tile").eq(15).append('<img src="img/bp.png" class="piece" name="pawn" player="black" moves=0></img>')
  //convert next 8 lines to loop
  $(".tile").eq(48).append('<img src="img/wp.png" class="piece" name="pawn" player="white" moves=0></img>')
  $(".tile").eq(49).append('<img src="img/wp.png" class="piece" name="pawn" player="white" moves=0></img>')
  $(".tile").eq(50).append('<img src="img/wp.png" class="piece" name="pawn" player="white" moves=0></img>')
  $(".tile").eq(51).append('<img src="img/wp.png" class="piece" name="pawn" player="white" moves=0></img>')
  $(".tile").eq(52).append('<img src="img/wp.png" class="piece" name="pawn" player="white" moves=0></img>')
  $(".tile").eq(53).append('<img src="img/wp.png" class="piece" name="pawn" player="white" moves=0></img>')
  $(".tile").eq(54).append('<img src="img/wp.png" class="piece" name="pawn" player="white" moves=0></img>')
  $(".tile").eq(55).append('<img src="img/wp.png" class="piece" name="pawn" player="white" moves=0></img>')
  // white non pawns
  $(".tile").eq(56).append('<img src="img/wr.png" class="piece" name="rook" player="white" moves=0></img>')
  $(".tile").eq(57).append('<img src="img/wkn.png" class="piece" name="knight" player="white" moves=0></img>')
  $(".tile").eq(58).append('<img src="img/wb.png" class="piece" name="bishop" player="white" moves=0></img>')
  $(".tile").eq(59).append('<img src="img/wq.png" class="piece" name="queen" player="white" moves=0></img>')
  $(".tile").eq(60).append('<img src="img/wK.png" class="piece" name="king" player="white" moves=0></img>')
  $(".tile").eq(61).append('<img src="img/wb.png" class="piece" name="bishop" player="white" moves=0></img>')
  $(".tile").eq(62).append('<img src="img/wkn.png" class="piece" name="knight" player="white" moves=0></img>')
  $(".tile").eq(63).append('<img src="img/wr.png" class="piece" name="rook" player="white" moves=0></img>')

}; //end addPieces

//return array of tile numbers that piece can move to
var legalMoves = function(draggable, droppable) {
  var name = draggable.attr('name');
  var moves = draggable.attr('moves');
  var player = draggable.attr('player');
  var currentTile = Number(draggable.parent().attr('id'));
  var currentRank = Number($('.tile[id=' + currentTile + ']').attr('data-rank'));
  var currentFile = Number($('.tile[id=' + currentTile + ']').attr('data-file'));
  var legalTiles = [];

  if (name == "pawn") {
    if (player == "black") {
      if (moves == 0) { //is it the first move?
        //check if piece is blocking the way
        var tmp = currentTile + 8;
        if ($('.tile[id=' + tmp + ']').find('img').length) { //is there a piece 1 spaces ahead?
          //return nothing
        } else {
          tmp += 8;
          $('.tile[id=' + tmp + ']').find('img').length ? legalTiles.push(currentTile + 8) : legalTiles.push(currentTile + 16, currentTile + 8); //is there a piece 2 spaces ahead?
        } //end first move piece check
      } else {
        var tmp = currentTile + 8;
        $('.tile[id=' + tmp + ']').find('img').length ? null : legalTiles.push(currentTile + 8); //is there a piece 1 space ahead?
      } //end first move and blocking checks

      var tmp = currentTile + 7
      if ($('.tile[id=' + tmp + ']').find('img').length) { //piece diagnoly ajasent?
        if ($('.tile[id=' + tmp + ']').children('img').attr('player') == 'white') { //is it opponents piece
          if(Number($('.tile[id=' + tmp + ']').attr('data-rank')) == (currentRank - 1)){//is it on the next rank
            legalTiles.push(tmp);
          }
        } //end check what player
      } //end adjasent test

      tmp += 2;
      if ($('.tile[id=' + tmp + ']').find('img').length) { //piece diagnoly ajasent?
        if ($('.tile[id=' + tmp + ']').children('img').attr('player') == 'white') { //is it opponents piece
          if(Number($('.tile[id=' + tmp + ']').attr('data-rank')) == (currentRank - 1)){//is it on the next rank
            legalTiles.push(tmp);
          }
        } //end check what player
      } //end adjasent test
    } else {
      if (moves == 0) { //is it the first move?
        //check if piece is blocking the way
        var tmp = currentTile - 8;
        if ($('.tile[id=' + tmp + ']').find('img').length) { //is there a piece 1 spaces ahead?
          //return nothing
        } else {
          tmp -= 8;
          $('.tile[id=' + tmp + ']').find('img').length ? legalTiles.push(currentTile - 8) : legalTiles.push(currentTile - 16, currentTile - 8); //is there a piece 2 spaces ahead?
        } //end first move piece check
      } else {
        var tmp = currentTile - 8;
        $('.tile[id=' + tmp + ']').find('img').length ? null : legalTiles.push(currentTile - 8); //is there a piece 1 space ahead?
      } //end first move and blocking checks

      var tmp = currentTile - 7
      if ($('.tile[id=' + tmp + ']').find('img').length) { //piece diagnoly ajasent?
        if ($('.tile[id=' + tmp + ']').children('img').attr('player') == 'black') { //is it opponents piece
          if(Number($('.tile[id=' + tmp + ']').attr('data-rank')) == (currentRank + 1)){//is it on the next rank
            legalTiles.push(tmp);
          }
        } //end check what player
      } //end adjasent test

      tmp -= 2;
      if ($('.tile[id=' + tmp + ']').find('img').length) { //piece diagnoly ajasent?
        if ($('.tile[id=' + tmp + ']').children('img').attr('player') == 'black') { //is it opponents piece
          if(Number($('.tile[id=' + tmp + ']').attr('data-rank')) == (currentRank + 1)){//is it on the next rank
            legalTiles.push(tmp);
          }
        } //end check what player
      } //end adjasent test
    } //end player check
  } else if (name == "knight") {
    var newRank;
    var newFile;
    var newTile;

    for (var i = -2; i < 3; i++) {
      for (var j = -2; j < 3; j++) {
        var absSum;
        absSum = Math.abs(i) + Math.abs(j);
        if (absSum == 3) {
          newRank = Number(currentRank) + i;
          newFile = Number(currentFile) + j;
          if (newRank > 0 && newFile > 0) {
            //console.log($('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id'));
            newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id');
          }
          //check if tile is occupied
          if($('.tile[id=' + newTile + ']').find('img').length){
            //if occupied make sure it is opposite color
            if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
              legalTiles.push(Number(newTile));
            }
          } else {
            legalTiles.push(Number(newTile));
          }
        } //end absSum if block
      } //end j
    } //end i
  } else if (name == "bishop") {
	  
	  /*
	   *  The bishop will move diagnoally each direction until it reaches the end of the board or another piece
	   *   A single loop that iterates through al combinations of i and j being abs equal <- cool way
	   */
	  
	  var ur = true;
	  var ul = true;
	  var br = true;
	  var bl = true;
	  var cnt = 0;
	  var newRank;
      var newFile;
      var newTile;
	  var i = 1;
	  var j = 1;
	  
	  while (cnt < 4) {
		  
		  newTile = null;
		  if(ur) { //block for bishop going up and right
			
		      newRank = currentRank + i;
			  newFile = currentFile + j;
			
			  if (newRank > 0 && newFile > 0 && newRank < 9 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					ur = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				ur = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end ur 

		  newTile = null;
		  if(ul) {
		      newRank = currentRank + i;
			  newFile = currentFile - j;
			
			  if (newRank > 0 && newFile > 0 && newRank < 9 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id');
				  console.log("New tile num: " + newTile);
			  } else {
					console.log("upper left out of bounds");
					ul = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  console.log("take "+Number(newTile));
				  legalTiles.push(Number(newTile));
				}
				console.log("ul is occupied");
				ul = false;
				cnt++;
			  } else {
				  console.log("hmmm");
				legalTiles.push(Number(newTile));
			  } //end check if occupied			  
		  }//end ul
		  
		  newTile = null;
		  if(br) {
		      newRank = currentRank - i;
			  newFile = currentFile + j;
			
			  if (newRank > 0 && newFile > 0 && newRank < 9 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					br = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				br = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied				  
		  }//end br

		  newTile = null;		  
		  if(bl) {
		      newRank = currentRank - i;
			  newFile = currentFile - j;
			
			  if (newRank > 0 && newFile > 0 && newRank < 9 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					bl = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				bl = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied				  
		  }//end bl
	
		  i++;
		  j++;
	  }//end while
  } else if (name == "rook") {
  
	  /*
	   *  The rook is prgrammed the same way the bishop is
	   */
  
	  var u = true;
	  var l = true;
	  var r = true;
	  var d = true;
	  var cnt = 0;
	  var newRank;
      var newFile;
      var newTile;
	  var i = 1;
	  

	  while (cnt < 4) {
		  
		  newTile = null;
		  if(u) { //block for rook going up
			
		      newRank = currentRank + i;
			
			  if (newRank > 0 && newRank < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + currentFile + '"]').attr('id');
			  } else {
					u = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				u = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end u
		  
		  newTile = null;
		  if(d) { //block for rook going down
			
		      newRank = currentRank - i;
			
			  if (newRank > 0 && newRank < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + currentFile + '"]').attr('id');
			  } else {
					d = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				d = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end d
		  
		  newTile = null;
		  if(r) { //block for rook going right
			
		      newFile = currentFile + i;
			
			  if (newFile > 0 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + currentRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					r = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				r = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end r
	
		  newTile = null;
		  if(l) { //block for rook going right
			
		      newFile = currentFile - i;
			
			  if (newFile > 0 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + currentRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					l = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				l = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end r	
	
		  i++;
	  }//end while	  
	  
	  
	  
	  
	  
  
  } else if (name == "queen"){
	  
	  
	  /*
	   *  The queen functions as a combination of the bishop and the rook
	   *  The code for the queen was copied and pasted from the rooka dn bishop
	   */
	  
  	  var ur = true;
	  var ul = true;
	  var br = true;
	  var bl = true;
	  var u = true;
	  var l = true;
	  var r = true;
	  var d = true;
	  var cnt = 0;
	  var newRank;
      var newFile;
      var newTile;
	  var i = 1;
	  var j = 1;
	  
	  while (cnt < 8) {
		  newTile = null;
		  if(ur) { //block for queen going up and right
			
		      newRank = currentRank + i;
			  newFile = currentFile + j;
			
			  if (newRank > 0 && newFile > 0 && newRank < 9 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					ur = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				ur = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end ur 

		  newTile = null;
		  if(ul) {
		      newRank = currentRank + i;
			  newFile = currentFile - j;
			
			  if (newRank > 0 && newFile > 0 && newRank < 9 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id');
				  console.log("New tile num: " + newTile);
			  } else {
					console.log("upper left out of bounds");
					ul = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  console.log("take "+Number(newTile));
				  legalTiles.push(Number(newTile));
				}
				console.log("ul is occupied");
				ul = false;
				cnt++;
			  } else {
				  console.log("hmmm");
				legalTiles.push(Number(newTile));
			  } //end check if occupied			  
		  }//end ul
		  
		  newTile = null;
		  if(br) {
		      newRank = currentRank - i;
			  newFile = currentFile + j;
			
			  if (newRank > 0 && newFile > 0 && newRank < 9 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					br = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				br = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied				  
		  }//end br

		  newTile = null;		  
		  if(bl) {
		      newRank = currentRank - i;
			  newFile = currentFile - j;
			
			  if (newRank > 0 && newFile > 0 && newRank < 9 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					bl = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				bl = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied				  
		  }//end bl	 
		  
		  newTile = null;
		  if(u) { //block for queen going up
			
		      newRank = currentRank + i;
			
			  if (newRank > 0 && newRank < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + currentFile + '"]').attr('id');
			  } else {
					u = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				u = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end u
		  
		  newTile = null;
		  if(d) { //block for queen going down
			
		      newRank = currentRank - i;
			
			  if (newRank > 0 && newRank < 9) {
				  newTile = $('.tile[data-rank="' + newRank + '"][data-file="' + currentFile + '"]').attr('id');
			  } else {
					d = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				d = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end d
		  
		  newTile = null;
		  if(r) { //block for queen going right
			
		      newFile = currentFile + i;
			
			  if (newFile > 0 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + currentRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					r = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				r = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end r
	
		  newTile = null;
		  if(l) { //block for queen going right
			
		      newFile = currentFile - i;
			
			  if (newFile > 0 && newFile < 9) {
				  newTile = $('.tile[data-rank="' + currentRank + '"][data-file="' + newFile + '"]').attr('id');
			  } else {
					l = false;
					cnt++;
			  }
			  //check if tile is occupied
			  if($('.tile[id=' + newTile + ']').find('img').length){
				//if occupied make sure it is opposite color
				if($('.tile[id=' + newTile + ']').children('img').attr('player') !== player){
				  legalTiles.push(Number(newTile));
				}
				l = false;
				cnt++;
			  } else {
				legalTiles.push(Number(newTile));
			  } //end check if occupied
		  }//end r

		i++;
		j++;
	  }//end while
  
  
  };//end getting the legal moves
  legalTiles = legalTiles.filter(Number);
  //console.log(legalTiles);
  return (legalTiles); //return array of legal moves
  
}; //end legalMoves

//increment move counter
var madeMove = function(piece) {
  var moves = parseInt(piece.attr("moves"));
  moves++;
  piece.attr("moves", moves);
}; //end madeMove


$(document).ready(function() {
  createBoard();
  addPieces();

  $(".piece").draggable({
    revert: "invalid", // when not dropped, the item will revert back to its initial position
    containment: "#chessboard",
    //cursor: "move",
    start: function(event, ui) {
      draggable = $(this);
      var moves = legalMoves(draggable, '');
      $.each(moves, function(index, value) {
        $('.tile[id=' + value + ']').addClass("hover");
      }); //end highlighting code
    } //end drag function
  }); //end draggable piece

  $(".tile").droppable({
    accept: "img.piece",
    drop: function(event, ui) {
      var droppable = $(this);
      var draggable = ui.draggable;
      var dropTile = Number(droppable.attr("id"));
      //get legal moves
      var moves = legalMoves(draggable, droppable);
      console.log(moves);
      $.each(moves, function(index, value) {
        $('.tile[id=' + value + ']').removeClass("hover");
      }); //end highlighting code

      if (jQuery.inArray(dropTile, moves) !== -1) {

        // take a piece
        $(this).find('img').length ? $(this).children('img').remove() : null;

        // Move draggable into droppable
        draggable.appendTo(droppable);
        $(".piece").css({
          top: "0px",
          left: "0px"
        });

        //increment move counter
        madeMove(draggable)

      } else {
        ui.draggable.draggable('option', 'revert', true);
      }
    } //end Drop function
  }); //end droppable tile


}); //end jQuery
