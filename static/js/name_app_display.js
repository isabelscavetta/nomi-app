// Recording

const dropdownSocial = document.querySelector('.dropdown-social');

var recording = document.getElementById('recording');

var recordedAudio = document.getElementById('recordedAudio');

var recordedAudio2 = document.getElementById('recordedAudio2');

var firstNameRec = document.getElementById('NameRecording');

var replay = document.getElementById('replay');

const stylesOn = {
	border: 'none',
	color: 'white',
	boxShadow: 'none',
	backgroundColor: '#007a7c'
};

const stylesOff = {
	border: '1px solid #007a7c',
	color: '#007a7c',
	boxShadow: 'none',
	backgroundColor: 'white'
};

// Dark Mode Toggle

function darkmodeToggle() {
	const body = document.body;
	body.classList.toggle('dark-mode');

	// const header = document.querySelector('.header-container');
	// header.classList.toggle('dark-mode2');

	// const footer = document.querySelector('.footer-container');
	// footer.classList.toggle('dark-mode2');
}

// Show/hide social icons

const zoomInOut = document.querySelector('.zoom-inout');
const switchContainer = document.querySelector('.switch-container');

document.querySelector('.sharebtn').addEventListener('click', function() {
	const footerNav = document.querySelector('.footer-navbar');

	showSocials = !showSocials;

	if (showSocials === true) {
		footerNav.style.display = 'inline-flex';
		zoomInOut.style.display = 'none';
		switchContainer.style.display = 'none';
	} else {
		footerNav.style.display = 'none';
		zoomInOut.style.display = 'inline';
		switchContainer.style.display = 'flex';
	}
});

let showSocials = false;

// Recording

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
	handlerFunction(stream);
});

function handlerFunction(stream) {
	rec = new MediaRecorder(stream);
	rec.ondataavailable = (e) => {
		audioChunks.push(e.data);
		if (rec.state == 'inactive') {
			let blob = new Blob(audioChunks, { type: 'audio/ogg' });
			const url = URL.createObjectURL(blob);
			recordedAudio.src = url;
			var xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.responseType = 'blob';
			firstNameRec.value = url;
			//                recordingLink.href = url;
			//                rec.download = 'audio/ogg';
		}
	};
}

function startR(e) {
	if (
		recording.innerHTML == 'Start Recording' ||
		recording.innerHTML == 'Retry'
	) {
		audioChunks = [];
		rec.start();
		recording.innerHTML = 'Stop Recording';
		Object.assign(recording.style, stylesOn);
		recording.style.width = '100%';
		replay.style.visibility = 'hidden';
	} else {
		rec.stop();
		recording.innerHTML = 'Retry';
		Object.assign(recording.style, stylesOff);
		recording.style.width = '60%';
		replay.style.visibility = 'visible';
	}
}

function play() {
	recordedAudio.play();
}
function playAudio() {
	recordedAudio2.play();
}
