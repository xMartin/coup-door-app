var doorButton = document.getElementById('door');
var statusDisplay = document.getElementById('status');

var idleTimer;

function openDoor () {
	setState('pending');

	var iFrame = document.createElement('iframe');
	iFrame.src = 'http://192.168.2.5/letmein';
	iFrame.style.display = 'none';
	iFrame.onload = function () {
		document.body.removeChild(iFrame);
		clearTimeout(timeout);
		setState('success');
	};
	var timeout = setTimeout(function () {
		iFrame.contentWindow.stop();
		document.body.removeChild(iFrame);
		setState('error');
	}, 2000);
	document.body.appendChild(iFrame);
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
