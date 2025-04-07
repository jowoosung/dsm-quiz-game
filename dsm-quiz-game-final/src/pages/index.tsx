
import { useState, useEffect } from "react";

const sampleQuestions = [
  { q: "대한민국의 수도는?", a: "서울" },
  { q: "5 x 5 는?", a: "25" },
  { q: "사과는 영어로?", a: "apple" },
  { q: "바나나는 영어로?", a: "banana" },
  { q: "1년에 몇 개월이 있나요?", a: "12" },
  { q: "100 ÷ 4 =", a: "25" },
  { q: "소나무는 무슨 색?", a: "초록" },
  { q: "물의 화학식은?", a: "H2O" },
  { q: "가장 큰 행성은?", a: "목성" },
  { q: "태극기에 있는 색은?", a: "빨강 파랑 검정" }
];

export default function Home() {
  const [step, setStep] = useState("start");
  const [nickname, setNickname] = useState("");
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    if (step === "quiz" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (step === "quiz" && timeLeft === 0) {
      nextQuestion(false);
    }
  }, [step, timeLeft]);

  const nextQuestion = (isCorrect) => {
    const newScore = isCorrect
      ? score + 10
      : score - 5 < 0
      ? 0
      : score - 5;
    setScore(newScore);
    if (current < sampleQuestions.length - 1) {
      setCurrent(current + 1);
      setTimeLeft(20);
      setAnswer("");
    } else {
      setStep("result");
      const newRanking = [...ranking, { nickname, score: newScore }];
      setRanking(newRanking.sort((a, b) => b.score - a.score));
    }
  };

  const handleSubmit = () => {
    const correct = answer.trim() === sampleQuestions[current].a;
    nextQuestion(correct);
  };

  if (step === "start") {
    return (
      <main>
        <h1>제1회 DSM정책기획팀 퀴즈 퀴즈</h1>
        <input
          placeholder="닉네임을 입력하세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <button onClick={() => setStep("quiz")}>입장</button>
      </main>
    );
  }

  if (step === "quiz") {
    return (
      <main>
        <h2>문제 {current + 1}</h2>
        <p>{sampleQuestions[current].q}</p>
        <p>⏱ 남은 시간: {timeLeft}초</p>
        <input
          placeholder="정답을 입력하세요"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={handleSubmit}>제출</button>
        <p>현재 점수: {score}점</p>
      </main>
    );
  }

  if (step === "result") {
    return (
      <main>
        <h2>🎉 퀴즈 종료!</h2>
        <p>최종 점수: {score}점</p>
        <h3>📊 랭킹</h3>
        <ol>
          {ranking.map((r, i) => (
            <li key={i}>
              {r.nickname} - {r.score}점
            </li>
          ))}
        </ol>
      </main>
    );
  }
}
