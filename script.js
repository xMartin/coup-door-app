var doorButton = document.getElementById('door');
var statusDisplay = document.getElementById('status');

var idleTimer;

function openDoor () {
	setState('pending');

	var script = document.createElement('script');
	script.src = 'http://192.168.2.5/letmein';
	script.onload = function () {
		setState('success');
	};
	script.onerror = function () {
		setState('error');
	};
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

doorButton.addEventListener('click', openDoor);
