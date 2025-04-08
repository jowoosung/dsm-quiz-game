import Head from 'next/head';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <Head>
        <title>제1회 DSM정책기획팀 퀴즈 퀴즈</title>
      </Head>
      <h1>제1회 DSM정책기획팀 퀴즈 퀴즈</h1>
      <input placeholder="닉네임을 입력하세요." style={{ padding: '8px' }} />
      <button style={{ marginLeft: '10px', padding: '8px' }}>입장</button>
    </div>
  );
}