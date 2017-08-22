var board = {
	name: 'Kanban Board',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column').click(function() {
    var columnName = prompt('Add Column Name');
    $.ajax({
    	url: baseUrl + '/column',
    	method: 'POST',
    	data: {
            name: columnName
    	},
    	success: function(response){
    		var column = new Column(response.id, columnName);
    		board.createColumn(column);
        }
    });
});
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      stop: function( event, ui ) {
        const card = ui.item[0];
        const cardId = card.id;
        const cardText = card.innerText.substring(1, card.innerText.lenght);
        const columnId = card.offsetParent.id;

        moveCard(cardId, columnId, cardText);

      }
    }).disableSelection();
  }

 function moveCard(id, columnId, cardName) {
    $.ajax({
            url: baseUrl + '/card/' + id,
            method: 'PUT',
            data: {
                name: cardName,
                bootcamp_kanban_column_id: columnId
            },
            success: function() {
                console.log('ready');
            }
        });
 }