/* Grid */
 $(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
});

$(window).bind('resizeEnd', function() {
	if($(window).width() > 924){
		grid();
	} else {
		console.log('come on!');
		$('.grid .grid-item').css('width', '100%');
		$('.grid .grid-item').css('height', 'auto');
		$('.grid .grid-item').css('position', 'static');
		$('.grid .grid-item.video').css('position', 'relative');
	}
});	

function grid(){
	var totalWidth = $('.grid').width();
	var columnWidth = totalWidth / 6;
	var gridItems = [];

	var totalHeight = columnWidth;

	$('.grid-item').each(function(index){
		var widthMult = $(this).data('width');
		$(this).width((columnWidth * widthMult) - 10);
		var heightMult = $(this).data('height');
		$(this).height((columnWidth * heightMult) - 10);

		gridItems.push({position: index, width: widthMult, height: heightMult});
	});

	var row = [0, 0, 0, 0, 0, 0];
	var grid = [row];

	$.each(gridItems, function( index, value ) {
		var width = value.width;
		var height = value.height;
		index = index + 1;

		var count = 0;
		var added = false;
		var rowUsed = 0;
		var repeats = 0;

		if(!added){

			if( width == 6 ){
				var currentRow = grid.length;
				grid.push([0, 0, 0, 0, 0, 0]);
				totalHeight += columnWidth;

				while(grid[currentRow + (height - 1)] == null){
					grid.push([0, 0, 0, 0, 0, 0]);
					totalHeight += columnWidth;
				}
				for (var i = 0; i < 6; i++){
					for(var h = 0; h < height; h++){
						grid[currentRow + h][i] = index;
					}
				}

				addItem(index, currentRow, 0);	
			} else {
				for(var i = 0; i < grid.length; i++){
					for (var j = 0; j < grid[i].length; j++){
						if(grid[i][j] == 0){
							count ++;

							if(count >= width && added == false){
								var overlap = false;
								for (var k = 0; k < width; k++){
									for(var l = 0; l < height; l++){
										if(grid[i+l] != null){
											if(grid[i+l][j-(width - 1) + k] != 0){
												overlap = true;
											}
										}
									}
								}	
								if(!overlap){
									while(grid[i + (height - 1)] == null){
										grid.push([0, 0, 0, 0, 0, 0]);
										totalHeight += columnWidth;
									}
									for (var k = 0; k < width; k++){
										for(var l = 0; l < height; l++){
											grid[i+l][j-(width - 1) + k] = index;
										}
									}	
									added = true;

									addItem(index, i, j - (width - 1));	
									count = 0;									
								}						
							}
						} else {
							count = 0;
						}
					}
					count = 0;
				}
				while(!added){
					count = 0;
					grid.push([0, 0, 0, 0, 0, 0]);
					totalHeight += columnWidth;

					for(var i = 0; i < grid.length; i++){
						for (var j = 0; j < grid[i].length; j++){
							if(grid[i][j] == 0){
								count ++;

								if((j + width - 1) > grid[i].length){
									count = 0;
								}

								if(count >= width && added == false){

									var overlap = false;
									for (var k = 0; k < width; k++){
										for(var l = 0; l < height; l++){
											if(grid[i+l] != null){
												if(grid[i+l][j-(width - 1) + k] != 0){
													overlap = true;
												}
											}
										}
									}	
									if(!overlap){
										while(grid[i + (height - 1)] == null){
											grid.push([0, 0, 0, 0, 0, 0]);
											totalHeight += columnWidth;
										}
										for (var k = 0; k < width; k++){
											for(var l = 0; l < height; l++){
												grid[i+l][j-(width - 1) + k] = index;
											}
										}	
										added = true;

										addItem(index, i, j - (width - 1));	
										count = 0;											
									}					
								}
							} else {
								count = 0;
							}
						}
						rowUsed ++;
					}

					repeats ++;
					if(repeats > 5){
						added = true;
					}
				}

			}
		}
	});

	function addItem(index, top, left){
		$('.grid').height(totalHeight);
		console.log(index + " : " + top + ", " + left);

		$('.grid-item:nth-child('+index+')').css('display', 'block');
		$('.grid-item:nth-child('+index+')').css('position', 'absolute');
		$('.grid-item:nth-child('+index+')').css('top', (columnWidth * top) + 'px');
		$('.grid-item:nth-child('+index+')').css('left', (columnWidth * left) + 'px');

	}
	
}