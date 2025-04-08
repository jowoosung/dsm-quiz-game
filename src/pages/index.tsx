
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [nickname, setNickname] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [started]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>제1회 DSM정책기획팀 퀴즈 퀴즈</h1>
      {!started ? (
        <>
          <input
            placeholder="닉네임을 입력하세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button onClick={() => setStarted(true)}>입장</button>
        </>
      ) : (
        <p>{nickname}님 환영합니다! 퀴즈가 곧 시작됩니다.</p>
      )}
      <audio ref={audioRef} src="/sounds/bgm.mp3" loop />
    </div>
  );
}
