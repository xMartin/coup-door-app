var doorButton = document.getElementById('door');
var statusDisplay = document.getElementById('status');

var idleTimer;

function openDoor () {
	setState('pending');

	var script = document.createElement('script');
	script.src = 'http://192.168.2.5/letmein';
	script.onload = function () {
		clearTimeout(timeout);
		setState('success');
	};
	script.onerror = function () {
		clearTimeout(timeout);
		setState('error');
	};
	var timeout = setTimeout(function () {
		script.onload = null;
		script.onerror = null;
		setState('error');
	}, 2000);
	document.getElementsByTagName('head')[0].appendChild(script);
}

function setState (state) {
	clearTimeout(idleTimer);

	document.body.classList.remove('pending', 'success', 'error', 'idle');
	document.body.classList.add(state);

	doorButton.disabled = state !== 'idle';

	statusDisplay.innerHTML = {
		idle: '',
		pending: '<div class="dots"><div></div><div></div><div></div></div>',
		success: 'Woohoo!',
		error: 'Sorry, you\'re not on the list!'
	}[state];

	if (state === 'success' || state === 'error') {
		idleTimer = setTimeout(function () {
			setState('idle');
		}, 1600);
	}
}

var hasTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
if (!hasTouch) {
	document.body.classList.add('mouse');
}

doorButton.addEventListener('click', openDoor);
