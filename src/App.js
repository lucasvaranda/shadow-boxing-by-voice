import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import GuideHeader from './components/GuideHeader';
import GuideContainer from './components/GuideContainer';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function App() {
  const [title, setTitle] = useState("Sequência");
  const [selected, setSelected] = useState([]);

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  useEffect(() => {
    console.log(transcript);
  }, [transcript]);

  const handleGenerateGuideClick = async (blow, defense, speed, length) => {
    if (blow && defense) {
      let blowDefense = blows.concat(defenses);
      const shuffled = blowDefense.sort(() => 0.5 - Math.random());
      setSelected(shuffled.slice(0, length));
    } else if (blow) {
      const shuffled = blows.sort(() => 0.5 - Math.random());
      setSelected(shuffled.slice(0, length));
    } else {
      const shuffled = defenses.sort(() => 0.5 - Math.random());
      setSelected(shuffled.slice(0, length));
    }
    
    for(let i = 0; i < selected.length; i++) {
      setTitle(selected[i].label);
      await new Promise(resolve => {
        var audio = new Audio('/audios/' + selected[i].audio);
        audio.playbackRate = speed;
  
        audio.addEventListener('ended', resolve);
  
        audio.play();
      });
    }
    setTitle("Finalizado");
  };

  return (
    <div className="App-header">
      <header>
        <GuideHeader title="Gerar" />
      </header>

      <div>
        <GuideContainer title={title} />
        <button onClick={() => handleGenerateGuideClick(true, false, 4, 5)}>Gerar</button>
      </div>
    </div>
  );
}

let blows = [
  {
    label: 'Jab',
    audio: 'jab.mp3',
  },
  {
    label: 'Direto',
    audio: 'direto.mp3',
  },
  {
    label: 'Cruzado Direito',
    audio: 'cruzado_direito.mp3',
  },
  {
    label: 'Cruzado Esquerdo',
    audio: 'cruzado_esquerdo.mp3',
  },
  {
    label: 'Cotovelo Direito',
    audio: 'cotovelo_direito.mp3',
  },
  {
    label: 'Cotovelo Esquerdo',
    audio: 'cotovelo_esquerdo.mp3',
  },
  {
    label: 'Chute Direito',
    audio: 'chute_direito.mp3',
  },
  {
    label: 'Chute Esquerdo',
    audio: 'chute_esquerdo.mp3',
  },
  {
    label: 'Joelhada Direita',
    audio: 'joelhada_direita.mp3',
  },
  {
    label: 'Joelhada Esquerda',
    audio: 'joelhada_esquerda.mp3',
  },
  {
    label: 'Stiff',
    audio: 'stiff.mp3',
  },
];

let defenses = [
  {
    label: 'Soco Rosto',
    audio: '',
  },
  {
    label: 'Soco Esquerda',
    audio: '',
  },
  {
    label: 'Soco Direita',
    audio: '',
  },
  {
    label: 'Chute Esquerda',
    audio: '',
  },
  {
    label: 'Chute Direita',
    audio: '',
  },
];

function generateGuide(blow, defense, speed, length) {
  let selected = [];
  if (blow && defense) {
    let blowDefense = blows.concat(defenses);
    const shuffled = blowDefense.sort(() => 0.5 - Math.random());
    selected = shuffled.slice(0, length);
  } else if (blow) {
    const shuffled = blows.sort(() => 0.5 - Math.random());
    selected = shuffled.slice(0, length);
  } else {
    const shuffled = defenses.sort(() => 0.5 - Math.random());
    selected = shuffled.slice(0, length);
  }

  return selected;
}

export default App;
