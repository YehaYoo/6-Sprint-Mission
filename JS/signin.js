const inputItems = document.querySelector('.input-items');


inputItems.addEventListener('focusout', function(e) {
	if (e.target.classList.contains('input-item')) {
		if (e.target.value.trim() === '') {
      e.target.classList.add('markInput');
    } else {
      e.target.classList.remove('markInput');
    }
	}
});


