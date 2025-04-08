export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>제1회 DSM정책기획팀 퀴즈 퀴즈</h1>
      <input placeholder="닉네임을 입력하세요." style={{ marginRight: "8px" }} />
      <button>입장</button>
    </main>
  );
}