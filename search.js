/* UI/UX 보물창고 — 고민 검색 엔진 (정적, 서버·API 없음)
 *
 * 구조
 *  1) CONCEPTS  : 개념 사전. 한국어 구어체·영어 표현을 하나의 개념으로 묶는다.
 *  2) WEIGHTS   : 사이트 ↔ 개념 연결 강도(1~3). 직접 수집한 사이트 내용에 근거.
 *  3) PRESETS   : 고민별 큐레이션 경로(순서가 있는 추천).
 *  4) 엔진      : 질문 → 개념 인식(정확 일치 + 자모 오타 허용 + 초성) → 점수 → 결과/경로/대안
 */
(function (root) {
  'use strict';

const TAGS = {
  "Mobbin":"플로우 온보딩 결제 설정 앱 화면 모바일 ios android 사용자 흐름 ux 벤치마킹",
  "Refero":"ui 요소 패턴 필터 빈화면 검색 컴포넌트 화면",
  "Refero Styles":"디자인시스템 스타일 색 타이포 간격 토큰 ai design.md",
  "Collect UI":"히어로 로그인 가격표 화면 종류 비교 dribbble 시안",
  "Name That UI":"용어 이름 명칭 패턴 masonry 소통 개발자",
  "Land-book":"랜딩 랜딩페이지 섹션 구성 흐름 웹사이트",
  "SiteInspire":"웹디자인 포트폴리오 브랜드 에이전시 레이아웃 차분한",
  "Awwwards":"인터랙션 모션 수상작 크리에이티브 최고 비주얼 웹",
  "Httpster":"랜딩 포트폴리오 감각적 큐레이션 스타일",
  "Recent":"트렌드 최신 피드 브랜딩 모션 앱아이콘 채용 매일",
  "Savee":"무드보드 이미지 북마크 영감 레퍼런스 수집 아트디렉터",
  "Cosmos":"무드보드 클러스터 아카이브 정리 공유 영감 분류",
  "It's Nice That":"트렌드 안목 매거진 인터뷰 크리에이터 뉴스 영국",
  "NOWNESS":"영상 색감 연출 문화 예술 패션",
  "The Dieline":"패키지 제품 브랜딩 실물",
  "The Brand Identity":"로고 브랜드 아이덴티티 시스템 스튜디오 인터뷰",
  "BP&O":"비평 브랜딩 패키지 블로그 시각",
  "Visuelle":"타이포 레이아웃 편집 그래픽 아이덴티티",
  "Metalab":"프로덕트 디자인 에이전시 케이스스터디 스타트업 앱 slack",
  "Koto":"리브랜딩 브랜드 전략 디지털 에이전시 케이스스터디",
  "Studio Kiln":"모션 브랜드 시스템 아이덴티티 절차적 그래픽 케이스스터디",
  "Eloqwnt":"핀테크 saas b2b ai 랜딩 앱 ui 케이스스터디",
  "Feather Icons":"아이콘 svg 무료 오픈소스 와이어프레임 프로토타입",
  "Craftwork":"목업 ui키트 일러스트 3d 에셋 포트폴리오",
  "animos":"영상 쇼케이스 포트폴리오 sns 소개 모션 mp4",
  "Kimera Waldenburg":"서체 폰트 타이포 산세리프 유료 스페시멘",
  "21st.dev":"컴포넌트 react tailwind 코드 구현 인터랙션 개발",
  "Framer":"노코드 웹사이트 제작 배포 포트폴리오 랜딩 빌더",
  "Into Design Systems":"디자인시스템 컨퍼런스 밋업 토큰 피그마 변수 강연 교육",
  "ilovecreatives":"커뮤니티 채용 강의 프리랜서 직무 취업 커리어"
};

const FACTS = {"Mobbin": "discover ios apps | mobbin browse and search across hundreds of ios apps for ui & ux research.", "Refero": "refero — ui/ux design inspiration for your next project the largest collection of ui/ux references and design inspiration for web and ios. explore tens of thousands of screenshots with advanced search capabilities", "Refero Styles": "website styles & design.md library | refero styles explore real website styles and their ai-readable design.md files. compare screenshots, colors, typography, and spacing to find a direction for your project. apple iphon", "Collect UI": "hero-section ui design inspiration - collect ui discover amazing hero-section designs and inspiration on collect ui network directory top sponsors adobe creative cloud", "Name That UI": "masonry layout (pinterest grid) — namethatui “the pinterest style grid where every card is a different height” is called masonry layout (pinterest grid). cards of different heights packed into columns with no row gaps. “", "Land-book": "landbook - website design inspiration gallery find the best hand-picked website design inspiration. we're a curated website design gallery for creatives, updated daily. landbook - website design inspiration gallery unloc", "SiteInspire": "the best websites | page 2 | siteinspire page 2 of the best website design examples & modern web inspiration. browse our handpicked collection of creative sites to inspire your next web design project. explore websites e", "Awwwards": "good fella - awwwards sotd good fella builds websites for brands who care about craft. founded by brothers julian and adrian. we embed into your team and ship work we're actually... site of the day - mar 18, 2026 good fe", "Httpster": "website design inspiration | httpster website design inspiration. get inspired by our gallery of creative design ideas and great examples of beautiful award-winning sites. website design inspiration", "Recent": "recent — design inspiration the best design inspiration on the internet. browse resources design", "Savee": "savee savee is a curated place for visual inspiration. discover references chosen by designers, collect what matters, and build a sharper eye without ads or clutter. the best place to save and share inspiration finding t", "Cosmos": "sequence / cosmos the weekly cosmos newsletter on culture, design, fashion, technology, and the internet. sequence this week in sequence adriana roslin", "It's Nice That": "it's nice that inspiring creativity the nice feed refreshed 19h ago exactly how apple music used sound to build its new brand identity 100 tracks, 100 science projects: jazz-punk band robocobra quartet create a new band ", "NOWNESS": "nowness short films video culture art fashion design music", "The Dieline": "popular - dieline most popular the “most popular” category is a dynamic showcase of the products and designs that capture the hearts and imaginations of consumers. this collection features packaging that stands out not o", "The Brand Identity": "the brand identity store – curated design assets, mockups & templates presentation decks, mockups, motion templates, tools, graphics and more. curated by the brand identity since 2015. sell in our store", "BP&O": "bp&o - branding, packaging and opinion logo, brand identity, packaging and graphic design blog, daily design inspiration, review, news and opinion from richard baird. latest dutchscot brings a beautifully nuanced take on", "Visuelle": "graphic design and everything in between visuelle is a leading global graphic design platform that showcases the best brand and visual identity projects. house with a pool unfound studio with klaudia klimas oraio substan", "Metalab": "metalab | we make interfaces metalab helps some of the world's top companies — like slack and google — design, build, and ship amazing products and services. we make interfaces", "Koto": "case studies and impactful partnerships at koto | koto see how koto pushes boundaries with ambitious ideas, working with innovative businesses to create bold work and lasting partnerships. channels explore our work", "Studio Kiln": "bafta 2026 studio kiln partners with bafta to create a procedurally generated identity system, visualising the energy of creativity across its iconic award ceremonies. visualising the energy of creativity for bafta’s ico", "Eloqwnt": "work & case studies — eloqwnt | b2b tech & enterprise design explore 60+ projects across fintech, ai, enterprise tech, and corporate brands. see how eloqwnt solves complex design challenges for b2b and tech companies. 60", "Feather Icons": "feather – simply beautiful open source icons feather is a collection of simply beautiful open source icons. each icon is designed on a 24x24 grid with an emphasis on simplicity, consistency and readability. simply beauti", "Craftwork": "mockups: iphone, macbook, branding and print • craftwork realistic iphone, macbook, branding, packaging and print mockups. drop in your design and export presentation-ready shots. free mockups included. device, branding ", "animos": "animos — motion templates for design showcases animos — ready-made animation templates for showcasing your designs. drop in images or videos, tweak, and export mp4/webm in your browser.", "Kimera Waldenburg": "kimera corp kimera is a type foundry, offering retail and bespoke typefaces for international clients. kimera is a design studio, providing art direction in the fields of culture, art and lifestyle. kimera is a store for", "21st.dev": "react components, templates & themes — 12,000+ crafted ui | 21st 12,000+ hand-crafted react and tailwind css components, templates, and shadcn themes by real design engineers. preview live, install with one command — for", "Framer": "framer: build and launch campaign websites with ai turn campaign briefs into polished web experiences with framer agents. create, publish, iterate, and scale campaigns without developer handoffs. build and run campaign s", "Into Design Systems": "design meetups worldwide: ai + design system meetup events | into design systems free design meetups and design system meetup events, hosted in person by companies in cities worldwide and streamed online. see the upcomin", "ilovecreatives": "ilovecreatives the digital trade school for slashies looking to stack their creative skills alongside a good vibes community. take an online course, connect with creatives, find creative jobs and events. the digital trad"};
const TAGS_EXTRA = {"Mobbin": "mcp ai 연동 수백 개 앱 ui ux 리서치", "Refero": "스크린샷 수만 장 고급 검색 웹 ios", "Refero Styles": "ai 읽는 design.md 스타일 비교 방향 잡기 코딩 에이전트", "Cosmos": "뉴스레터 주간 문화 패션 기술 인터넷", "Savee": "광고 없는 ai 에이전트 안목 검색 한 번에", "Recent": "디자인 채용 리소스 매일 영감", "Visuelle": "그래픽 디자인 플랫폼 브랜드 비주얼 아이덴티티 프로젝트", "BP&O": "로고 리뷰 의견 매일 영감 블로그", "The Brand Identity": "스토어 발표 덱 목업 모션 템플릿 도구 그래픽", "Metalab": "slack google 인터페이스 제품 설계 출시", "Koto": "프로젝트 파트너십 협업 대담한 사례", "Eloqwnt": "60개 프로젝트 엔터프라이즈 복잡한 문제 b2b", "animos": "템플릿 브라우저에서 mp4 webm 내보내기", "Kimera Waldenburg": "타입 파운드리 맞춤 서체 아트디렉션 문화 예술", "21st.dev": "1만 2천 개 shadcn 테마 템플릿 한 줄 설치 ai 에이전트 복사 붙여넣기", "Framer": "ai 에이전트 캠페인 마케터 개발자 없이 발행", "Into Design Systems": "ai 밋업 도시 온라인 무료 행사 컨퍼런스", "ilovecreatives": "온라인 코스 슬래셔 부업 크리에이터 구인 좋은 분위기"};
for (const [k, v] of Object.entries(TAGS_EXTRA)) TAGS[k] = (TAGS[k] || "") + " " + v;

const PRESETS = [
  {label:"화면 구성이 막막해요", keys:"화면 구성 레이아웃 와이어프레임 시작 설계 플로우 ux 흐름 앱 화면 기획 막막",
   picks:["Mobbin","Refero","Collect UI","Name That UI"],
   tip:"먼저 Mobbin에서 비슷한 서비스의 전체 플로우를 훑어보세요. 그다음 Refero에서 필터나 빈 화면 같은 요소만 골라 보고, Collect UI로 여러 안을 나란히 비교하면 방향이 잡힙니다."},
  {label:"무드와 방향을 못 잡겠어요", keys:"무드 방향 키워드 콘셉트 컨셉 아이데이션 무드보드 영감 아이디어 막힘 레퍼런스 수집 영감 떠오르지 막혔어요 시작 초반 발상",
   picks:["Savee","Cosmos","Recent","It's Nice That"],
   tip:"Savee나 Cosmos에서 마음에 드는 이미지를 먼저 모아 보세요. 열 장쯤 쌓이면 공통점이 보이고, 그게 프로젝트의 무드 키워드가 됩니다. Recent는 요즘 흐름을 가볍게 확인할 때 좋습니다."},
  {label:"랜딩페이지 구성이 안 떠올라요", keys:"랜딩 페이지 랜딩페이지 히어로 섹션 구성 홈페이지 웹사이트 레이아웃 사이트",
   picks:["Land-book","Httpster","SiteInspire","Awwwards"],
   tip:"Land-book에서 섹션 순서와 흐름을 먼저 참고하세요. Httpster와 SiteInspire는 스타일별로 나눠 볼 수 있고, 인터랙션이 필요하면 Awwwards 수상작을 보면 됩니다."},
  {label:"디자인 용어를 몰라서 검색이 안 돼요", keys:"용어 이름 명칭 뭐라고 검색 패턴 컴포넌트 그거 이름 소통 개발자",
   picks:["Name That UI","Collect UI","Refero Styles"],
   tip:"찾는 화면의 이름을 모르면 Name That UI에서 용어와 예시를 확인하세요. 이름을 알았다면 Collect UI에서 같은 종류의 화면을 모아 보고, 정리된 스타일 기준은 Refero Styles에서 볼 수 있습니다."},
  {label:"케이스 스터디를 어떻게 쓸지 모르겠어요", keys:"케이스 스터디 케이스스터디 포트폴리오 글쓰기 구성 작성 프로세스 에이전시 사례 정리",
   picks:["Metalab","Koto","Eloqwnt","Studio Kiln"],
   tip:"Metalab과 Eloqwnt는 프로덕트 프로젝트를 어떤 순서로 보여주는지 살피기 좋습니다. Koto와 Studio Kiln은 브랜드 작업을 소개하는 방식이 달라서, 두 쪽을 비교하며 내 글의 구성을 잡아 보세요."},
  {label:"눈에 띄는 비주얼이 필요해요", keys:"인터랙션 모션 비주얼 화려 임팩트 눈에 띄는 애니메이션 트렌디 독특",
   picks:["Awwwards","Studio Kiln","21st.dev","Recent"],
   tip:"Awwwards 수상작에서 인터랙션의 상한선을 확인하고, Studio Kiln에서 움직이는 브랜드 시스템을 보세요. 실제로 구현할 방법은 21st.dev의 컴포넌트에서 찾을 수 있습니다."},
  {label:"포트폴리오를 직접 만들고 싶어요", keys:"포트폴리오 사이트 제작 만들기 노코드 목업 제작 발표 영상 폰트 배포",
   picks:["Framer","Craftwork","animos","Kimera Waldenburg"],
   tip:"Framer로 코드 없이 사이트를 만들고, Craftwork의 목업으로 작업물을 입히세요. animos로 짧은 소개 영상을 만들면 SNS에도 바로 쓸 수 있습니다. 서체가 고민이면 Kimera Waldenburg를 살펴보세요."},
  {label:"디자인 시스템을 공부하고 싶어요", keys:"디자인시스템 토큰 컴포넌트 변수 피그마 일관성 스타일 가이드 아이콘 공부",
   picks:["Refero Styles","Into Design Systems","21st.dev","Feather Icons"],
   tip:"Refero Styles에서 유명 사이트의 색과 간격 기준을 읽어 보고, Into Design Systems의 강연으로 토큰과 컴포넌트 개념을 배우세요. 가볍게 시작하려면 Feather Icons 같은 아이콘 세트를 써 보는 것도 방법입니다."},
  {label:"취업·커리어가 고민이에요", keys:"취업 커리어 채용 이직 직무 프리랜서 구직 커뮤니티 성장",
   picks:["ilovecreatives","Into Design Systems","Metalab"],
   tip:"ilovecreatives에서 해외 채용 공고와 프리랜서 문화를 먼저 살펴보세요. 디자인 시스템에 관심이 있다면 Into Design Systems의 밋업이 도움이 되고, Metalab 같은 에이전시의 작업 방식은 지원할 곳을 고를 때 참고가 됩니다."},
  {label:"AI 코딩 도구에 디자인을 입히고 싶어요", keys:"ai 에이전트 코딩 도구 클로드 커서 mcp design.md 스타일 지정 바이브코딩 컴포넌트 프롬프트",
   picks:["Refero Styles","21st.dev","Mobbin","Savee"],
   tip:"Refero Styles에서 마음에 드는 사이트의 DESIGN.md를 받아 AI 도구에 넘기면 스타일 기준을 한 번에 전달할 수 있습니다. 21st.dev는 복사해서 바로 쓰는 React 컴포넌트가 많고, Mobbin은 MCP로 연결해 실제 앱 화면을 참고시킬 수 있습니다. Savee는 AI 에이전트에게 취향을 알려주는 기능을 내세우고 있어 함께 살펴볼 만합니다."},
  {label:"안목을 키우고 싶어요", keys:"안목 감각 트렌드 눈 높이 비평 타이포 매거진 읽기 센스",
   picks:["It's Nice That","BP&O","Visuelle","NOWNESS"],
   tip:"하루에 한 곳씩 It's Nice That를 읽고, 마음에 드는 작업은 왜 좋은지 한 줄로 적어 보세요. BP&O는 평가까지 덧붙여서 비평하는 눈을 기르기 좋고, Visuelle과 NOWNESS는 타이포와 영상 감각을 넓혀 줍니다."}
];


  // ───────────────────────── 1) 개념 사전 ─────────────────────────
  // forms는 공백 없이 적는다(한국어 띄어쓰기가 들쭉날쭉해서 질문도 공백을 지우고 비교).
  // 영문 형태는 단어 단위로만 비교한다(짧은 영문이 다른 단어 속에서 걸리는 것 방지).
  const CONCEPTS = {
    flow:      {label:"사용자 흐름·온보딩", forms:"플로우 유저플로우 사용자흐름 온보딩 결제과정 결제화면 결제 회원가입 가입화면 로그인화면 구독화면 여정 저니 시나리오 flow onboarding checkout signup signin journey funnel paywall"},
    screens:   {label:"앱·화면 설계", forms:"앱화면 모바일화면 화면설계 화면구성 화면기획 화면구조 화면참고 와이어프레임 와이어 앱ui 모바일ui ui화면 스크린샷 앱서비스 앱디자인 모바일앱 ios 안드로이드 android iphone wireframe screen screens mobile app"},
    component: {label:"UI 요소·패턴", forms:"컴포넌트 ui요소 요소 버튼 모달 필터 드롭다운 토글 빈화면 엠티스테이트 패턴 네비게이션 사이드바 입력폼 테이블 토스트 툴팁 탭바 pattern component button modal filter dropdown navigation sidebar toast tooltip emptystate"},
    term:      {label:"UI 용어·이름", forms:"용어 용어집 명칭 이름이뭐 이름을모르 이름모르 뭐라고부르 뭐라고해 뭐라고하 뭐라고불 부르는이름 그거이름 네이밍 메이슨리 핀터레스트 벽돌레이아웃 masonry glossary terminology naming"},
    landing:   {label:"랜딩페이지·웹사이트", forms:"랜딩 랜딩페이지 히어로 섹션 섹션구성 섹션순서 홈페이지 웹사이트 웹페이지 원페이지 마케팅페이지 소개페이지 제품소개페이지 landing hero homepage website onepage"},
    web:       {label:"웹디자인 영감", forms:"웹디자인 웹사이트디자인 웹갤러리 사이트갤러리 웹레이아웃 사이트레이아웃 레이아웃 갤러리 webdesign gallery layout"},
    award:     {label:"인터랙션·모션", forms:"인터랙션 모션 애니메이션 스크롤애니메이션 화려 임팩트 눈에띄 인상적 수상작 어워드 크리에이티브웹 마이크로인터랙션 interaction motion animation award awwwards sotd parallax"},
    mood:      {label:"무드·방향 잡기", forms:"무드 무드보드 분위기 방향성 방향 콘셉트 컨셉 감성 톤앤매너 키워드잡 비주얼방향 mood moodboard concept vibe tone"},
    inspire:   {label:"영감·아이디어", forms:"영감 아이디어 아이데이션 발상 인스피레이션 안떠올 떠오르지 떠오르질 발산 inspiration ideation idea ideas brainstorm"},
    collect:   {label:"저장·수집·정리", forms:"저장 수집 모아 모으 북마크 스크랩 아카이브 클러스터 분류 보관 save collect bookmark archive cluster board boards"},
    trend:     {label:"트렌드·최신 소식", forms:"트렌드 요즘 유행 최신 핫한 뜨는 최근동향 동향 업계뉴스 뉴스 소식 이슈 trend trending latest news"},
    newsletter:{label:"뉴스레터", forms:"뉴스레터 구독 주간 위클리 메일링 newsletter weekly subscribe"},
    eye:       {label:"안목·감각", forms:"안목 감각 센스 눈높이 취향 미적 보는눈 눈을키 눈을기 taste eye sense"},
    critique:  {label:"비평·분석", forms:"비평 평가 리뷰 의견 분석 왜이렇게 의도 배경 크리틱 비판적 critique review opinion analysis"},
    typo:      {label:"타이포·서체", forms:"타이포 타이포그래피 글꼴 폰트 서체 글자체 활자 자간 산세리프 세리프 typography font fonts typeface serif sans"},
    brand:     {label:"브랜딩·로고", forms:"브랜딩 브랜드 로고 아이덴티티 비주얼아이덴티티 리브랜딩 브랜드가이드 브랜드북 branding brand logo identity rebrand"},
    package:   {label:"패키지 디자인", forms:"패키지 패키징 포장 박스디자인 라벨 용기 package packaging"},
    case:      {label:"케이스 스터디", forms:"케이스스터디 케이스 사례연구 프로젝트소개 작업소개 작업과정 프로세스 포트폴리오글 casestudy case process"},
    portfolio: {label:"포트폴리오", forms:"포트폴리오 포폴 작품집 작업물 portfolio"},
    agency:    {label:"에이전시·스튜디오", forms:"에이전시 스튜디오 대행사 디자인회사 회사작업 업체작업 agency studio"},
    fintech:   {label:"핀테크·B2B·SaaS", forms:"핀테크 금융 은행 saas b2b 엔터프라이즈 기업용 대시보드 어드민 백오피스 fintech enterprise dashboard admin banking"},
    product:   {label:"프로덕트·스타트업", forms:"스타트업 프로덕트 서비스설계 제품설계 앱서비스 product startup"},
    dsys:      {label:"디자인 시스템", forms:"디자인시스템 디자인토큰 토큰 변수 피그마변수 스타일가이드 일관성 컴포넌트라이브러리 designsystem tokens variables styleguide"},
    style:     {label:"색·간격·스타일 기준", forms:"색상 색깔 컬러 팔레트 간격 여백 스페이싱 그리드 색조합 타이포스케일 color palette spacing grid colors"},
    icon:      {label:"아이콘", forms:"아이콘 아이콘세트 svg 벡터아이콘 icon icons"},
    mockup:    {label:"목업", forms:"목업 디바이스목업 기기목업 아이폰목업 맥북 프레젠테이션샷 mockup mockups device"},
    video:     {label:"영상·쇼케이스", forms:"영상 쇼케이스 소개영상 시연영상 데모영상 mp4 webm video showcase reel demo"},
    nocode:    {label:"노코드로 만들기", forms:"노코드 코드없이 사이트제작 사이트만들 홈페이지만들 웹사이트만들 배포 빌더 호스팅 직접만들 nocode publish builder hosting"},
    code:      {label:"코드·구현", forms:"리액트 타일윈드 코드복사 복붙 복사붙여넣 개발자핸드오프 핸드오프 프론트엔드 구현 shadcn react tailwind frontend handoff snippet"},
    ai:        {label:"AI 도구 연동", forms:"인공지능 에이전트 클로드 챗gpt 지피티 커서 코딩도구 코딩에이전트 바이브코딩 프롬프트 llm claude cursor gpt agent agents vibe mcp ai design.md designmd"},
    career:    {label:"취업·커리어", forms:"취업 이직 커리어 채용 구직 공고 면접 인턴 신입 직무 job jobs career hiring intern interview"},
    freelance: {label:"프리랜서·커뮤니티", forms:"프리랜서 부업 커뮤니티 네트워킹 모임 밋업 동료 같이공부 freelance community meetup networking"},
    learn:     {label:"공부·강의", forms:"공부 학습 배우 배워 강의 수업 코스 교육 강연 컨퍼런스 부트캠프 입문 독학 course learn study lecture conference tutorial"},
    benchmark: {label:"벤치마킹·리서치", forms:"벤치마킹 경쟁사 경쟁서비스 비교분석 레퍼런스조사 리서치 조사 competitor benchmark research benchmarking"},
    culture:   {label:"문화·예술", forms:"문화 예술 패션 음악 감성영상 단편영화 culture art fashion music film"},
    free:      {label:"무료", forms:"무료 공짜 오픈소스 free opensource"},
    ref:       {label:"레퍼런스 찾기", forms:"레퍼런스 참고자료 참고할만한 참고 reference references"},
    stuck:     {label:"막막함", forms:"막막 막혔 막혀 헤매 헤맨 모르겠 갈피 감이안 감을못 어디서부터 어디서시작 뭐부터 처음이라 시작이어렵 방법을모르 어떻게해야 stuck lost"}
  };

  // ───────────────────────── 2) 사이트 ↔ 개념 ─────────────────────────
  // "개념+강도" 형식. 3 = 대표 사이트, 2 = 잘 맞음, 1 = 보조.
  const WEIGHTS_SRC = {
    "Mobbin":"flow3 screens3 benchmark3 component1 product1 ai2 fintech1 ref1",
    "Refero":"screens3 component3 benchmark2 flow2 ref1 ai1",
    "Refero Styles":"dsys3 style3 ai3 ref1 benchmark1 web1",
    "Collect UI":"component3 screens2 landing2 ref1 web1 inspire2 style1",
    "Name That UI":"term3 component2 web1 ai1 code1",
    "Land-book":"landing3 web3 inspire2 ref1 trend1",
    "SiteInspire":"web3 landing2 inspire2 portfolio1 trend1 ref1",
    "Awwwards":"award3 web2 landing1 trend1 inspire2 agency1",
    "Httpster":"web3 landing2 inspire2 portfolio1 trend1",
    "Recent":"trend3 inspire3 web1 brand1 career2 video1",
    "Savee":"mood3 inspire3 collect3 eye2 ai2 trend1 ref1",
    "Cosmos":"mood3 collect3 newsletter3 culture2 inspire2 eye1 trend1",
    "It's Nice That":"trend3 eye3 culture2 inspire2 newsletter1 brand1 critique1",
    "NOWNESS":"culture3 video2 eye2 inspire1",
    "The Dieline":"package3 brand2 trend1 inspire1 newsletter1",
    "The Brand Identity":"brand3 mockup2 package1 eye1 video1",
    "BP&O":"brand3 critique3 package2 eye2 inspire1 typo1",
    "Visuelle":"brand3 typo2 eye2 inspire1 agency1 trend1",
    "Metalab":"case3 agency3 product3 fintech1 benchmark1 career1",
    "Koto":"case2 agency3 brand3",
    "Studio Kiln":"case3 agency3 award2 brand2 video1",
    "Eloqwnt":"case3 agency3 fintech3 landing1 screens1 product1",
    "Feather Icons":"icon3 free3 dsys1",
    "Craftwork":"mockup3 free1 video1 portfolio2 brand1 package1",
    "animos":"video3 portfolio2 mockup1 award1",
    "Kimera Waldenburg":"typo3 brand1 culture1",
    "21st.dev":"code3 component3 ai3 dsys2 award1 free1 nocode1",
    "Framer":"nocode3 portfolio2 landing3 code1 ai2 award1 web1",
    "Into Design Systems":"dsys3 learn3 freelance3 career1 ai2 code1",
    "ilovecreatives":"career3 freelance3 learn3"
  };
  const WEIGHTS = {};
  for (const [name, str] of Object.entries(WEIGHTS_SRC)) {
    WEIGHTS[name] = {};
    for (const m of str.matchAll(/([a-z]+)(\d)/g)) WEIGHTS[name][m[1]] = +m[2];
  }

  // ───────────────────────── 3) 고민별 경로의 개념 프로필 ─────────────────────────
  // 경로가 선택되려면 핵심(primary) 개념이 하나라도 걸리거나, 보조(secondary) 개념이 둘 이상 걸려야 한다.
  const PRESET_C = {
    "화면 구성이 막막해요": [["screens","flow"], ["component","benchmark"]],
    "무드와 방향을 못 잡겠어요": [["mood","inspire"], ["collect"]],
    "랜딩페이지 구성이 안 떠올라요": [["landing"], ["web"]],
    "디자인 용어를 몰라서 검색이 안 돼요": [["term"], ["component"]],
    "케이스 스터디를 어떻게 쓸지 모르겠어요": [["case","agency"], ["portfolio"]],
    "눈에 띄는 비주얼이 필요해요": [["award"], ["trend"]],
    "포트폴리오를 직접 만들고 싶어요": [["nocode","portfolio"], ["mockup","video","typo"]],
    "디자인 시스템을 공부하고 싶어요": [["dsys","style"], ["icon","learn"]],
    "취업·커리어가 고민이에요": [["career","freelance"], ["learn"]],
    "AI 코딩 도구에 디자인을 입히고 싶어요": [["ai"], ["code"]],
    "안목을 키우고 싶어요": [["eye","critique"], ["trend","typo","culture"]]
  };
  PRESETS.forEach(p => { const c = PRESET_C[p.label] || [[], []]; p.main = c[0]; p.sub = c[1]; });

  // ───────────────────────── 4) 엔진 ─────────────────────────
  const HANGUL = /[가-힣]/;
  const CHO = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
  const STOPTOK = new Set(["디자인","디자이너","사이트","레퍼런스","참고","사례","스타일","좋은","멋진","예쁜","보고","싶어","싶어요","어떻게","알려줘","추천","찾고","있나요","같은","있는","하는","위한","대한","관련","궁금","궁금해","어떤","이런","저런","그런","그거","어디","어디서","뭐가","뭔가","정말","진짜","많이","조금","같이","하고싶","만들고","해야","쓸만한","볼만한"]);
  const STOPBI = new Set(["해요","어요","에요","싶어","어떻","떻게","하면","좋을","을까","까요","모르","르겠","겠어","있나","나요","고민","민이","이에","는데","할지","해야","하지","같아","것같","습니","니다","합니","하고","있는","없어","돼요","시작","추천","알려","찾고","필요","싶은","떠올","올라","라요","보고","고싶","막막","막해"]);

  function jamoOf(ch) {
    const c = ch.charCodeAt(0) - 0xAC00;
    if (c < 0 || c > 11171) return ch;
    const L = Math.floor(c / 588), V = Math.floor((c % 588) / 28), T = c % 28;
    return String.fromCharCode(0x1100 + L) + String.fromCharCode(0x1161 + V) + (T ? String.fromCharCode(0x11A7 + T) : "");
  }
  const jamo = s => Array.from(s).map(jamoOf).join("");
  const choOf = s => Array.from(s).map(ch => { const c = ch.charCodeAt(0) - 0xAC00; return c >= 0 && c <= 11171 ? CHO[Math.floor(c / 588)] : ch; }).join("");
  function lev(a, b, max) {
    if (Math.abs(a.length - b.length) > max) return max + 1;
    let prev = Array.from({length: b.length + 1}, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i]; let rowMin = i;
      for (let j = 1; j <= b.length; j++) {
        const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        cur[j] = v; if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return max + 1;
      prev = cur;
    }
    return prev[b.length];
  }
  const stem = t => {
    if (!HANGUL.test(t)) return t;
    const r = t.replace(/(한테|에게|에서|으로|이에요|해요|이|가|은|는|을|를|에|로|도|만|와|과)$/, "");
    return r.length >= 2 ? r : t;
  };
  const hasToken = (hay, t) => (/^[a-z0-9]+$/.test(t) && t.length < 4) ? new RegExp("(^|[^a-z0-9])" + t + "([^a-z0-9]|$)").test(hay) : hay.includes(t);

  // 개념 사전을 한 번만 전처리
  const CFORMS = {};
  for (const [id, c] of Object.entries(CONCEPTS)) {
    CFORMS[id] = c.forms.split(/\s+/).filter(Boolean).map(f => ({f, latin: !HANGUL.test(f), j: jamo(f), cho: choOf(f), n: Array.from(f).length}));
  }

  function create(items) {
    const sites = items.map(it => ({
      name: it.name,
      nameKey: (it.name + " " + it.ko).toLowerCase(),
      hay: [it.name, it.ko, it.text, it.when, TAGS[it.name] || "", FACTS[it.name] || "", it.cat].join(" ").toLowerCase(),
      w: WEIGHTS[it.name] || {}
    }));

    // 질문에서 개념을 찾는다: 정확 일치 → 자모 오타 허용 → 초성
    // 긴 표현부터 먼저 잡고 이미 쓴 글자는 막는다("브랜딩" 속의 "랜딩"이 따로 걸리지 않게).
    const KO_FORMS = [];
    for (const [id, forms] of Object.entries(CFORMS)) for (const F of forms) if (!F.latin) KO_FORMS.push({id, F});
    KO_FORMS.sort((x, y) => y.F.n - x.F.n);

    function detect(q) {
      const raw = q.toLowerCase().normalize("NFC");
      const flat = raw.replace(/[^가-힣a-z0-9]/g, "");
      const latinTokens = new Set(raw.split(/[^a-z0-9&.]+/).filter(Boolean));
      const cho = raw.replace(/[^ㄱ-ㅎ]/g, "");
      const choMode = cho.length >= 2 && cho.length >= raw.replace(/\s/g, "").length * 0.8;
      const acc = {};   // id -> {exact, fuzzy, forms}
      const add = (id, f, fz) => { const a = acc[id] || (acc[id] = {exact: 0, fuzzy: 0, forms: []}); if (fz) a.fuzzy++; else a.exact++; a.forms.push(fz ? f + "~" : f); };

      if (choMode) {
        for (const {id, F} of KO_FORMS) if (F.n >= 2 && F.cho.includes(cho)) add(id, F.f, false);
      } else {
        const used = new Array(flat.length).fill(false);
        // 1) 정확 일치, 긴 것부터
        for (const {id, F} of KO_FORMS) {
          let from = 0, hit = false;
          for (;;) {
            const i = flat.indexOf(F.f, from);
            if (i < 0) break;
            from = i + 1;
            if (used.slice(i, i + F.n).some(Boolean)) continue;
            for (let k = i; k < i + F.n; k++) used[k] = true;
            hit = true; break;
          }
          if (hit) add(id, F.f, false);
        }
        // 2) 자모 한 칸 오타 허용(세 글자 이상 표현만), 아직 안 쓴 글자에서만
        for (const {id, F} of KO_FORMS) {
          if (F.n < 3) continue;
          for (let i = 0; i + F.n <= flat.length; i++) {
            if (used.slice(i, i + F.n).some(Boolean)) continue;
            const w = flat.slice(i, i + F.n);
            if (!HANGUL.test(w) || w === F.f) continue;
            if (lev(jamo(w), F.j, 1) <= 1) { for (let k = i; k < i + F.n; k++) used[k] = true; add(id, F.f, true); break; }
          }
        }
      }
      // 영문 표현은 단어 단위로만
      for (const [id, forms] of Object.entries(CFORMS)) for (const F of forms) {
        if (!F.latin) continue;
        if (latinTokens.has(F.f) || (F.f.length >= 5 && flat.includes(F.f))) add(id, F.f, false);
      }
      const found = {};
      for (const [id, a] of Object.entries(acc)) {
        found[id] = {val: a.exact ? Math.min(1, 0.7 + 0.15 * (a.exact - 1) + 0.1 * a.fuzzy) : 0.5, forms: a.forms};
      }
      return found;
    }

    // 개념 사전에 없는 말(사이트 이름, 영문 고유명사 등)을 위한 보조 일치
    function lexTokens(q) {
      return q.toLowerCase().split(/[^가-힣a-z0-9&.']+/).map(stem).filter(t => t.length >= 2 && !STOPTOK.has(t));
    }
    function lex(toks, bi, s) {
      let sc = 0;
      for (const t of toks) { if (s.nameKey.includes(t)) sc += 6; else if (hasToken(s.hay, t)) sc += 3; }
      for (const b of bi) if (s.hay.includes(b)) sc += 1;
      return sc * 0.25;
    }
    function bigramsOf(toks) {
      const bi = new Set();
      for (const t of toks) { if (!HANGUL.test(t)) continue; for (let i = 0; i < t.length - 1; i++) { const b = t.slice(i, i + 2); if (!STOPBI.has(b)) bi.add(b); } }
      return bi;
    }

    function query(q) {
      q = (q || "").trim();
      const out = {concepts: [], stuckOnly: false, preset: null, alts: [], results: [], suggest: []};
      if (!q) return out;
      const found = detect(q);
      const ids = Object.keys(found);
      out.concepts = ids.filter(id => id !== "stuck").sort((a, b) => found[b].val - found[a].val).map(id => ({id, label: CONCEPTS[id].label}));
      out.stuckOnly = ids.length > 0 && ids.every(id => id === "stuck");

      // 큐레이션 경로: 라벨이 같으면 바로, 아니면 개념 겹침으로 고른다
      const exact = PRESETS.find(p => p.label === q);
      const v = c => (found[c] ? found[c].val : 0);
      const scored = PRESETS.map(p => {
        const mainHit = p.main.filter(c => v(c) > 0).length, subHit = p.sub.filter(c => v(c) > 0).length;
        const eligible = mainHit > 0 || subHit >= 2;
        return {p, s: eligible ? [...p.main, ...p.sub].reduce((a, c) => a + v(c), 0) : 0};
      }).sort((a, b) => b.s - a.s);
      if (exact) out.preset = exact;
      else if (!out.stuckOnly && scored[0] && scored[0].s >= 0.6) out.preset = scored[0].p;
      if (out.preset) {
        const top = scored.find(x => x.p === out.preset);
        out.alts = scored.filter(x => x.p !== out.preset && x.s >= 0.6 && x.s >= (top ? top.s : 0) * 0.5).slice(0, 2).map(x => x.p);
      }

      // 사이트 점수 = 개념 일치 × 연결 강도 + 보조 어휘 일치
      const toks = lexTokens(q), bi = ids.length ? new Set() : bigramsOf(toks);
      const picks = new Set(out.preset ? out.preset.picks : []);
      const ranked = sites.map(s => {
        let total = 0; const parts = [];
        for (const id of ids) {
          if (id === "stuck") continue;
          const w = s.w[id]; if (!w) continue;
          const v = found[id].val * w; total += v; parts.push([id, v]);
        }
        total += lex(toks, bi, s);
        parts.sort((a, b) => b[1] - a[1]);
        return {name: s.name, score: total, why: parts.slice(0, 2).map(x => CONCEPTS[x[0]].label)};
      }).filter(r => !picks.has(r.name));
      const top = Math.max(0, ...ranked.map(r => r.score));
      out.results = ranked.filter(r => r.score >= 1.3 && r.score >= top * 0.45).sort((a, b) => b.score - a.score).slice(0, 8);

      // 아무것도 못 찾았을 때 보여줄 "혹시 이런 고민?" 후보
      if (!out.preset && !out.results.length) {
        const sb = bigramsOf(toks);
        out.suggest = PRESETS.map(p => ({p, s: [...sb].filter(b => (p.label + p.keys).includes(b)).length})).sort((a, b) => b.s - a.s).slice(0, 4).map(x => x.p);
      }
      return out;
    }

    // 간단한 사이트 이름 조회용
    return {query, presets: PRESETS, concepts: CONCEPTS, detect};
  }

  root.SearchEngine = {create, CONCEPTS, WEIGHTS, PRESETS};
  if (typeof module !== "undefined") module.exports = root.SearchEngine;
})(typeof window !== "undefined" ? window : globalThis);
