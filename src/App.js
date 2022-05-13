import { useEffect, useState } from "react";
import "./index.css";
import { QUESTIONS } from './constants'
import conforto from './imgs/conforto.svg';
import ansiedade from './imgs/ansiedade.svg';
import ideal from './imgs/ideal.svg';

export default function App() {
  const [numPerguntas, setNumPerguntas] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [peso, setPeso] = useState([0, 0]);
  const [canStart, setCanStart] = useState(true)
  const [angulo, setAngulo] = useState(0);

  const resetGame = () => {
    setNumPerguntas(0);
    setShowResult(false);
    setCanStart(true)
    setPeso([0,0])
    setAngulo(0)
  }



  const responder = (value) => {
    if (numPerguntas >= QUESTIONS.length - 1) {
      setShowResult(true);
      return;
    }
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


  useEffect(() => {
    const nom = peso[0] === 0 ? 1 : peso[0];
    const denom = peso[1] === 0 ? 1 : peso[1];

    const division = nom / denom;

    const signal = division > 1 ? "-" : "+";

    const angle = division === 1 ? 0 : 45;
    setAngulo(`${signal}${angle * 6}`);
  }, [peso]);

const mostrarQuestionario = !showResult && !canStart;

  return (
    <main>


      <div className="infoBox">
        <h1>Como nossos líderes estão desenvolvendo novos líderes?</h1>
        <p>Responda as perguntas de 0 a 5 indicando o quanto você concorda com cada uma das respostas</p>
        {showResult && (<button className="restartButton" onClick={()=> resetGame()}>Fazer um novo feedback</button>)}

        {!showResult && canStart && (
          <form className="form" onSubmit={() => setCanStart(false)}>
          <input className="inputName" placeholder="Quem será avalido?" required maxLength={40} type="text"/>
          <button type="submit" className="restartButton">Iniciar</button>
          </form>
          )}
      </div>

        {showResult && (
          <div className="questionBox">
            <h2 className="resultTitle">
            <span className="question__number">Obrigado pelo feedback!</span>
              <span className="questionTitle__initialText">O ambiente que o líder promove pode ser entendido como...</span>
            </h2>
            <div className="result__image__wrapper">
              <img src={ideal}></img>
            </div>
          </div>
        )}
  
        {mostrarQuestionario && (
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
        </div>
        )}
        

   
      


    </main>
  );
}
