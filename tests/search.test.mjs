// node tests/search.test.mjs — 질문 → 기대 사이트(경로 추천 + 결과 상위) 검사
import { CATEGORIES } from "../src/data/sites.ts"
import { createEngine } from "../src/lib/search.ts"

const items = CATEGORIES.flatMap((c) => c.items.map((s) => ({ name: s.name, ko: s.ko, text: s.text, when: s.when, cat: c.title })))
const eng = createEngine(items)

// [질문, [기대 사이트 중 하나 이상이 나와야 함], (선택) 기대 경로 라벨 일부]
const T = [
  ["무드보드 어떻게 시작하지", ["Savee","Cosmos"], "무드"],
  ["영감이 안 떠올라요", ["Savee","Recent"]],
  ["아이디어가 막혔어요", ["Savee","Recent"]],
  ["분위기 레퍼런스 모으고 싶어", ["Savee","Cosmos"]],
  ["이미지 북마크 정리할 곳", ["Savee","Cosmos"]],
  ["경쟁사 앱 온보딩이 어떻게 되어있는지 보고 싶어요", ["Mobbin"]],
  ["결제 화면 참고하고 싶어요", ["Mobbin","Refero"]],
  ["회원가입 플로우 사례", ["Mobbin"]],
  ["앱 화면 구성이 막막해요", ["Mobbin","Refero"], "화면 구성"],
  ["필터 UI 예시", ["Refero","Collect UI"]],
  ["빈 화면 디자인 어떻게 해?", ["Refero"]],
  ["그 핀터레스트처럼 생긴 레이아웃 이름이 뭐지", ["Name That UI"], "용어"],
  ["UI 요소 이름을 모르겠어요", ["Name That UI"]],
  ["랜딩페이지 섹션 순서 참고", ["Land-book"], "랜딩"],
  ["히어로 섹션 예시 모음", ["Collect UI","Land-book"]],
  ["스크롤 애니메이션 멋진 사이트", ["Awwwards"]],
  ["인터랙션 수상작 보고 싶어", ["Awwwards"]],
  ["요즘 디자인 트렌드가 궁금해", ["Recent","It's Nice That"]],
  ["브랜딩 사례 보고 싶어", ["The Brand Identity","BP&O","Koto","Visuelle"]],
  ["로고 디자인 참고", ["BP&O","The Brand Identity","Visuelle"]],
  ["패키지 디자인 영감", ["The Dieline"]],
  ["폰트 추천해줘", ["Kimera Waldenburg"]],
  ["타이포그래피 감각 키우기", ["Kimera Waldenburg","Visuelle"]],
  ["아이콘 무료로 쓸 수 있는 곳", ["Feather Icons"]],
  ["목업이 필요해요", ["Craftwork"]],
  ["작업 소개 영상 만들고 싶어", ["animos"]],
  ["코드 없이 포트폴리오 사이트 만들기", ["Framer"], "포트폴리오"],
  ["리액트 컴포넌트 복붙해서 쓰고 싶어", ["21st.dev"]],
  ["클로드한테 디자인 스타일 알려주고 싶어", ["Refero Styles","21st.dev"], "AI"],
  ["design.md 파일 어디서 받아", ["Refero Styles"]],
  ["MCP로 앱 화면 참고시키기", ["Mobbin"]],
  ["디자인 시스템 공부하고 싶어", ["Into Design Systems","Refero Styles"], "디자인 시스템"],
  ["디자인 토큰 개념", ["Into Design Systems","Refero Styles"]],
  ["색상 간격 기준 참고", ["Refero Styles"]],
  ["취업 준비중인데 막막해", ["ilovecreatives"]],
  ["프리랜서 커뮤니티 찾아요", ["ilovecreatives","Into Design Systems"]],
  ["디자인 채용 공고", ["ilovecreatives","Recent"]],
  ["뉴스레터 구독할 만한 곳", ["Cosmos"]],
  ["핀테크 대시보드 사례", ["Eloqwnt"]],
  ["B2B SaaS 디자인 참고", ["Eloqwnt"]],
  ["케이스 스터디 어떻게 쓰지", ["Metalab","Eloqwnt","Koto","Studio Kiln"], "케이스"],
  ["에이전시 작업 구경하고 싶어", ["Metalab","Koto","Studio Kiln","Eloqwnt"]],
  ["안목 키우는 법", ["It's Nice That","BP&O","Visuelle","NOWNESS"], "안목"],
  ["디자인 비평하는 눈", ["BP&O"]],
  ["문화 예술 영상 감성", ["NOWNESS"]],
  ["ㅁㄷㅂㄷ", ["Savee","Cosmos"]],
  ["무드보두", ["Savee","Cosmos"]],
  ["moodboard", ["Savee","Cosmos"]],
  ["wireframe 그리기 전에 볼만한 앱", ["Mobbin","Refero"]],
  ["mobbin", ["Mobbin"]],
  ["awwwards", ["Awwwards"]],
  ["도시 사진 분위기 레퍼런스", ["Savee","Cosmos"]],
  ["로그인 화면 참고", ["Mobbin","Refero"]],
  ["신입 디자이너 포트폴리오 준비", ["Framer","ilovecreatives"]],
  ["figma", []],
  ["아무말 대잔치", []],
];

// 부정 기대: 이 질문엔 이 사이트가 나오면 안 된다
const NEG = [
  ["아이콘 무료로 쓸 수 있는 곳", ["Awwwards","Land-book"]],
  ["폰트 추천해줘", ["Mobbin","Refero","Land-book"]],
  ["취업 준비중인데 막막해", ["Mobbin","The Dieline"]],
  ["뉴스레터 구독할 만한 곳", ["Mobbin","Framer"]],
  ["브랜딩 사례", ["Land-book","Httpster"]],          // "브랜딩" 속 "랜딩" 충돌
  ["검색 기능 UI", ["Kimera Waldenburg","Feather Icons"]],
  ["영화 같은 영상 레퍼런스", ["Framer","Craftwork"]],
  ["컬러 팔레트 뽑기", ["Savee","Cosmos"]],
];

let pass = 0, fail = 0, big = 0;
for (const [q, want, presetPart] of T) {
  const r = eng.query(q);
  const names = [...(r.preset ? r.preset.picks : []), ...r.results.slice(0, 6).map(x => x.name)];
  let ok = want.length === 0 ? true : want.some(w => names.includes(w));
  if (presetPart && !(r.preset && r.preset.label.includes(presetPart))) ok = ok && false;
  if (r.results.length + (r.preset ? r.preset.picks.length : 0) > 14) big++;
  if (ok) pass++; else { fail++; console.log("FAIL", JSON.stringify(q), "→ preset:", r.preset && r.preset.label, "| results:", r.results.map(x => x.name).join(", "), "| concepts:", r.concepts.map(c => c.id).join(",")); }
}
for (const [q, bad] of NEG) {
  const r = eng.query(q);
  const names = [...(r.preset ? r.preset.picks : []), ...r.results.map(x => x.name)];
  const hit = bad.filter(b => names.includes(b));
  if (hit.length) { fail++; console.log("NEG-FAIL", q, "→", hit.join(",")); } else pass++;
}
const stuck = eng.query("뭐부터 해야할지 모르겠어요");
if (!stuck.stuckOnly) { fail++; console.log("FAIL stuckOnly"); } else pass++;
const none = eng.query("아무말 대잔치");
if (none.preset || none.results.length) { fail++; console.log("FAIL nonsense returns results"); } else pass++;
console.log(`pass ${pass} / fail ${fail}  (결과 과다 ${big}건)`);
if (process.argv[2]) { const r = eng.query(process.argv[2]); console.log(JSON.stringify(r, (k, v) => k === 'tip' || k === 'keys' || k === 'c' ? undefined : v, 1)); }
