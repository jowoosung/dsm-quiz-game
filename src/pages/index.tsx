import { useState } from "react";
import { motion } from "framer-motion";

const quiz = [
  { question: "대한민국의 수도는?", answer: "서울" },
  { question: "3.14로 알려진 수학 상수는?", answer: "원주율" },
  { question: "세계에서 가장 큰 바다는?", answer: "태평양" },
  { question: "컴퓨터의 중앙처리장치는?", answer: "CPU" },
  { question: "물의 화학식은?", answer: "H2O" },
  { question: "대한민국의 제20대 대통령은?", answer: "윤석열" },
  { question: "지구에서 가장 높은 산은?", answer: "에베레스트" },
  { question: "프랑스의 수도는?", answer: "파리" },
  { question: "1년에 몇 개월이 있을까?", answer: "12" },
  { question: "사과를 영어로 하면?", answer: "apple" },
];

export default function Home() {
  const [step, setStep] = useState<"start" | "quiz" | "result">("start");
  const [nickname, setNickname] = useState("");
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);

  const handleStart = () => {
    const audio = new Audio("/bgm.mp3");
    audio.loop = true;
    audio.play();
    setStep("quiz");
  };

  const handleAnswer = () => {
    const correct = quiz[current].answer.trim().toLowerCase();
    const user = input.trim().toLowerCase();
    if (correct === user) {
      setScore(score + 10);
    } else {
      setScore(score - 5);
    }
    setInput("");
    if (current === quiz.length - 1) {
      setStep("result");
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="text-center mt-20">
      {step === "start" && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-4">
            제1회 DSM정책기획팀 퀴즈 퀴즈
          </h1>
          <input
            className="border px-2 py-1"
            placeholder="닉네임을 입력하세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button
            className="ml-2 bg-black text-white px-4 py-1 rounded"
            onClick={handleStart}
          >
            입장
          </button>
        </motion.div>
      )}

      {step === "quiz" && (
        <motion.div
          key={current}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-2xl mb-4">{quiz[current].question}</div>
          <input
            className="border px-2 py-1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
            onClick={handleAnswer}
          >
            제출
          </button>
        </motion.div>
      )}

      {step === "result" && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-2xl font-bold mb-4">🎉 퀴즈 완료 🎉</div>
          <div className="text-xl mb-2">{nickname}님의 점수는</div>
          <div className="text-4xl font-bold text-green-600">{score}점</div>
        </motion.div>
      )}
    </div>
  );
}