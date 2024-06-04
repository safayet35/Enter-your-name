let gali = ["Khan kir polaa", "Tor mayre chudi", "Chodaanir pola", "La aund", "Lau raa", "Madar chood", "Khan kii ma girji", "Ma gii", "L Chira haat a dii yeaa di  muu","Bhosdi ke","Mat ke maifa sa hua la aund", "Chu tiya "]

const synth = window.speechSynthesis;
const voiceSelect = document.getElementById('voice-select');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');

let voices = [];

function populateVoiceList() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach((voice, index) => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = index;
    voiceSelect.appendChild(option);
  });
}

function speak() {
  let randomNum = Math.floor(Math.random() * gali.length)
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  const text = document.getElementById('text-input').value;
  if (text !== '') {
    const utterance = new SpeechSynthesisUtterance(`${gali[randomNum]} ${text}`);
    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    utterance.rate = rate.value;
    utterance.pitch = pitch.value;
    utterance.onend = function(event) {
      console.log('SpeechSynthesisUtterance.onend');
    }
    utterance.onerror = function(event) {
      console.error('SpeechSynthesisUtterance.onerror');
    }
    synth.speak(utterance);

  }

}


populateVoiceList();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = populateVoiceList;
} else {

  setTimeout(populateVoiceList, 100);
}