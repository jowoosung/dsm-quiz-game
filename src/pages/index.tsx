
import { useEffect, useState } from "react";

export default function Home() {
  const [nickname, setNickname] = useState("");
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [animation, setAnimation] = useState("");

  const questions = [
    { question: "2 + 2 = ?", answer: "4" },
    { question: "3 + 5 = ?", answer: "8" },
    { question: "10 - 7 = ?", answer: "3" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (nickname && !started) {
        setStarted(true);
      }
    }, 60000); // 1분 후 자동 시작
    return () => clearTimeout(timer);
  }, [nickname, started]);

  useEffect(() => {
    const audio = new Audio("/bgm.mp3");
    audio.loop = true;
    audio.play();
  }, []);

  const handleAnswer = (userAnswer: string) => {
    const correct = userAnswer === questions[currentQuestion].answer;
    if (correct) {
      setScore(score + 10);
      setAnimation("rise");
    } else {
      setScore(score - 5);
      setAnimation("fall");
    }
    setTimeout(() => {
      setAnimation("");
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (!started) {
    return (
      <div>
        <h1>제1회 DSM정책기획팀 퀴즈 퀴즈</h1>
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요."
        />
        <button onClick={() => setStarted(true)}>입장</button>
      </div>
    );
  }

  if (showResult) {
    return <h2>{nickname}님의 점수: {score}점</h2>;
  }

  return (
    <div>
      <h2>{nickname}님 문제: {questions[currentQuestion].question}</h2>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAnswer(e.currentTarget.value);
        }}
        placeholder="정답 입력"
      />
      <div className={`score ${animation}`}>점수: {score}</div>
      <style jsx>{`
        .score {
          transition: transform 0.5s ease;
        }
        .rise {
          transform: translateY(-20px);
          color: green;
        }
        .fall {
          transform: translateY(20px);
          color: red;
        }
      `}</style>
    </div>
  );
}
