# Masonry
A simple masonry layout.

## Usage
1. Add Jquery and Grid.js to your page
2. Add wrapper div with class grid
  `<div class="grid"></div>`
3. Add elements with class grid-item and data-width and data-height values between 1 and 6.
  
    ```
    <div class="grid">
	<img src="http://placehold.it/350x350"  data-width="2" data-height="2" class="grid-item" />
	<img src="http://placehold.it/350x700"  data-width="2" data-height="4" class="grid-item" />
	<img src="http://placehold.it/350x350"  data-width="2" data-height="2" class="grid-item" />
	<img src="http://placehold.it/350x350"  data-width="2" data-height="2" class="grid-item" />
	<img src="http://placehold.it/350x525"  data-width="2" data-height="3" class="grid-item" />
	<img src="http://placehold.it/700x350"  data-width="4" data-height="2" class="grid-item" />
	<img src="http://placehold.it/350x175"  data-width="2" data-height="1" class="grid-item" />
    </div>
    ```
  
4. Call the grid class when page ready.
  <br>` grid(); `
  
5. Position the container relative
  <br>`.grid{ position: relative; }`
