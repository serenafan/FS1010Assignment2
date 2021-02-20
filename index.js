let toDoItems = [];
let completeItems = [];

const getItems = (listName) => {
	const items = localStorage.getItem(listName);
	let listItems = [];
	if (items && items.length) {
		listItems = JSON.parse(items);
	}
	return listItems;
};
const renderList = (listItems, listDomId) => {
	listItems.forEach((item) => {
		let listItem = $(`<li></li>`);
		listItem.text(item);
		$(listDomId).append(listItem);
		if (listDomId == '#to-do-list') {
			let checkbox = $(`<input type="checkbox">`);
			listItem.append(checkbox);
		}
		if(listDomId == '#complete-list'){
			listItem.css({ color: 'grey', textDecoration: 'line-through' });
		}
	});
};

const addToDoItem = () => {
	let inputItem = $('#itemInput');
	inputItem.on('keypress', (e) => {
		if (e.which == 13) {
			e.preventDefault();
			if (!inputItem.val()) {
				let error = $('<p></p>');
				error.css({ color: 'red' });
				error.text('Your input is invalid');
				inputItem.parent().append(error);
			} else {
				toDoItems.push(inputItem.val());
				inputItem.val('');
				localStorage.setItem('myToDoList', JSON.stringify(toDoItems));
				location.reload();
			}
		}
	});
};

const removeToDoItem = () => {
	$('input[type=checkbox]').change(function() {
		if (this.checked) {
			$(this).parent().css({ color: 'grey', textDecoration: 'line-through' });
			let index = toDoItems.findIndex((item) => item == $(this).parent().text());
			toDoItems.splice(index, 1);
			completeItems.push($(this).parent().text());
			localStorage.setItem('myToDoList', JSON.stringify(toDoItems));
			localStorage.setItem('myCompleteList', JSON.stringify(completeItems));
			location.reload();
		}
	});
};

$(document).ready(() => {
	toDoItems = getItems('myToDoList');
	completeItems = getItems('myCompleteList');
	renderList(toDoItems, '#to-do-list');
	renderList(completeItems, '#complete-list');
	addToDoItem();
	removeToDoItem();
	$('#to-do-list').sortable();
	$('#complete-list').sortable();
});
