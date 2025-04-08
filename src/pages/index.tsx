
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const handleJoin = () => {
    if (nickname.trim()) {
      localStorage.setItem('nickname', nickname);
      router.push('/quiz');
    }
  };

  return (
    <div>
      <h1>제1회 DSM정책기획팀 퀴즈 퀴즈</h1>
      <input
        type="text"
        placeholder="닉네임을 입력하세요."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button onClick={handleJoin}>입장</button>
    </div>
  );
}
