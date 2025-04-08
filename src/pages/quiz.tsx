
import { useEffect, useState } from 'react';
import questions from '../questions.json';

export default function Quiz() {
  const [nickname, setNickname] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('nickname');
    if (storedName) setNickname(storedName);
    const timer = setTimeout(() => setStarted(true), 60000); // 1 minute
    return () => clearTimeout(timer);
  }, []);

  if (!started) return <div>{nickname}님 환영합니다! 퀴즈가 곧 시작됩니다.</div>;

  return (
    <div>
      <h2>퀴즈 시작!</h2>
      <p>문제 1: {questions[0].question}</p>
    </div>
  );
}
