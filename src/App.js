import { useEffect, useState } from "react";
import "./index.css";
import { QUESTIONS } from './constants'

export default function App() {
  const [numPerguntas, setNumPerguntas] = useState(0);
  const [endGame, setEndGame] = useState(false);
  const [peso, setPeso] = useState([0, 0]);
  const [angulo, setAngulo] = useState(0);

  const responder = (value) => {
    if (numPerguntas >= QUESTIONS.length - 1) {
      setEndGame(true);
      return;
    }
    // console.log(QUESTIONS[numPerguntas].type);
    const actualType = QUESTIONS[numPerguntas].type;

    const valorDireita = actualType === "desafiador" ? value : 5 - value;
    const valorEsquerda = actualType === "desafiador" ? 5 - value : value;

    setPeso((prevPeso) => {
      const newPesoDireita = prevPeso[1] + valorDireita;
      const newPesoEsquerda = prevPeso[0] + valorEsquerda;
      return [newPesoEsquerda, newPesoDireita];
    });

    setNumPerguntas((p) => p + 1);
  };

  // useEffect(() => {
  //   const nom = peso[0] === 0 ? 1 : peso[0];
  //   const denom = peso[1] === 0 ? 1 : peso[1];

  //   const division = nom / denom;

  //   const signal = division > 1 ? "-" : "+";

  //   const result = () => {
  //     if (peso[0] === 0 && peso[1] === 0) return 0;
  //     return peso[0] / (peso[0] + peso[1]);
  //   };
  //   console.log(result());
  //   console.log(result() * 30);

  //   setAngulo(`${signal}${result() * 30}`);
  // }, [peso]);

  useEffect(() => {
    const nom = peso[0] === 0 ? 1 : peso[0];
    const denom = peso[1] === 0 ? 1 : peso[1];

    const division = nom / denom;

    const signal = division > 1 ? "-" : "+";

    const angle = division === 1 ? 0 : 45;
    console.log(nom);
    console.log(denom);
    console.log(angle);
    setAngulo(`${signal}${angle * 6}`);
  }, [peso]);

  if(endGame) {
    return (
      <main>
        <div className="finishBox">
          <h1>Obrigado por participar do feedback!</h1>
          <h3>Os dados foram enviados para análise.</h3>
        </div>
      </main>
      
    )
  }

  return (
    <main>
      {/* <div className="App">
        {peso[0]} - {peso[1]}
      </div> */}

      <div className="infoBox">
        <h1>Como nossos líderes estão desenvolvendo novos líderes?</h1>
        <p>Responda as perguntas de 0 a 5 indicando o quanto você concorda com cada uma das respostas</p>
      </div>

      <div className="questionBox">
        <h2 className="questionTitle">
         <span className="question__number">Pergunta {numPerguntas + 1} de {QUESTIONS.length}</span>
          <span className="questionTitle__initialText">Quanto você concorda com a afirmação...</span>
          {QUESTIONS[numPerguntas]?.title}
        </h2>

        <div className="answerBox">
          <button onClick={() => responder(0)}>0</button>
          <button onClick={() => responder(1)}>1</button>
          <button onClick={() => responder(2)}>2</button>
          <button onClick={() => responder(3)}>3</button>
          <button onClick={() => responder(4)}>4</button>
          <button onClick={() => responder(5)}>5</button>
        </div>

        <div>{endGame && `Acabou o questionario`}</div>
        {/* <div
          style={{ transform: `rotate(${-45 + "deg"})` }}
          className="retangle"
        ></div> */}
      </div>


    </main>
  );
}
