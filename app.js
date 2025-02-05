const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var hour = new Date().getHours();
    if (hour >= 0 && hour < 12) speak("Good Morning Boss...");
    else if (hour >= 12 && hour < 17) speak("Good Afternoon sir...");
    else speak("Good Evening Sir...");
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hello')) speak("Hello Sir, How May I Help You?");
    else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    }
    else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    }
    else if (message.includes("weather")) {
        fetch('https://wttr.in/?format=%C+%t')
        .then(response => response.text())
        .then(data => speak(`The current weather is ${data}`));
    }
    else if (message.includes("time")) {
        speak("The current time is " + new Date().toLocaleTimeString());
    }
    else if (message.includes("open notepad")) {
        speak("Opening Notepad");
        window.location.href = 'notepad://';
    }
    else if (message.includes("shutdown")) {
        speak("Shutting down system");
        fetch('/shutdown');  // Requires Python backend to execute
    }
    else {
        speak("Searching on Google");
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
    }
}
