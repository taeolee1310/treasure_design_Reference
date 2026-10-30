export type Site = { name: string; ko: string; url: string; text: string; when: string }
export type Category = { id: string; title: string; short: string; when: string; desc: string; items: Site[] }

// 2026년 10월 기준 레퍼런스 목록. 사이트를 추가하면 src/lib/search.ts의 WEIGHTS_SRC와 TAGS도 함께 채운다.
export const CATEGORIES: Category[] = [
  {
    "id": "ui",
    "title": "UI·웹 레퍼런스 갤러리",
    "short": "UI·웹 갤러리",
    "when": "화면 설계할 때",
    "desc": "실제 서비스 화면과 잘 만든 웹사이트를 찾아보는 곳입니다. 와이어프레임을 그리기 전에 먼저 들러보세요.",
    "items": [
      {
        "name": "Mobbin",
        "ko": "모빈",
        "url": "https://mobbin.com/discover/apps/ios/latest",
        "text": "iOS·Android·웹 앱의 실제 화면과 사용자 플로우를 모아둔 라이브러리. 앱별·화면 유형별로 검색됩니다.",
        "when": "온보딩, 결제, 설정 같은 플로우를 다른 앱은 어떻게 풀었는지 볼 때"
      },
      {
        "name": "Refero",
        "ko": "레페로",
        "url": "https://refero.design/apps/search",
        "text": "실제 서비스의 UI 화면을 패턴·요소 단위로 검색하는 레퍼런스 라이브러리.",
        "when": "‘필터’, ‘빈 화면’처럼 특정 UI 요소를 콕 집어 찾을 때"
      },
      {
        "name": "Refero Styles",
        "ko": "레페로 스타일즈",
        "url": "https://styles.refero.design/",
        "text": "유명 웹사이트 2,000여 곳의 색·타이포·간격·컴포넌트를 정리하고 AI 도구가 읽을 수 있는 DESIGN.md 파일로 제공합니다.",
        "when": "디자인 시스템 구성을 배우거나 AI 코딩 도구에 스타일을 지정할 때"
      },
      {
        "name": "Collect UI",
        "ko": "콜렉트 유아이",
        "url": "https://collectui.com/designs/hero-section-ui-design-inspiration",
        "text": "Dribbble 등의 UI 작업을 히어로 섹션, 로그인, 가격표 등 화면 종류별로 모아둔 갤러리.",
        "when": "한 종류의 화면을 여러 안으로 빠르게 비교할 때"
      },
      {
        "name": "Name That UI",
        "ko": "네임 댓 유아이",
        "url": "https://namethatui.com/web/masonry",
        "text": "UI 패턴의 정확한 이름과 예시를 정리한 용어집 (예: Masonry 레이아웃).",
        "when": "개발자·팀과 소통할 때 ‘그거 이름이 뭐지?’ 싶을 때"
      },
      {
        "name": "Land-book",
        "ko": "랜드북",
        "url": "https://land-book.com/",
        "text": "잘 만든 랜딩페이지와 웹사이트를 업종·스타일·섹션별로 모아둔 갤러리. 페이지 전체 스크린샷을 볼 수 있습니다.",
        "when": "랜딩페이지의 섹션 구성과 흐름을 참고할 때"
      },
      {
        "name": "SiteInspire",
        "ko": "사이트인스파이어",
        "url": "https://www.siteinspire.com/websites/page/2",
        "text": "오래 운영된 웹 디자인 쇼케이스. 스타일·유형·주제별 필터로 차분하고 완성도 높은 사이트를 골라 볼 수 있습니다.",
        "when": "브랜드·에이전시·포트폴리오 사이트의 레이아웃을 찾을 때"
      },
      {
        "name": "Awwwards",
        "ko": "어워즈",
        "url": "https://www.awwwards.com/sites/good-fella",
        "text": "전 세계 웹사이트를 디자인·사용성·크리에이티브·콘텐츠로 심사해 상을 주는 어워드. 링크는 수상작 ‘Good Fella’ 상세 페이지입니다.",
        "when": "인터랙션·모션이 강한 최상위 웹 작업을 볼 때"
      },
      {
        "name": "Httpster",
        "ko": "에이치티티피스터",
        "url": "https://httpster.net/",
        "text": "감각적인 웹사이트를 유형·스타일별로 모아두는 큐레이션 갤러리.",
        "when": "랜딩페이지·포트폴리오 사이트 아이디어가 필요할 때"
      },
      {
        "name": "Recent",
        "ko": "리센트",
        "url": "https://recent.design/?ref=godly",
        "text": "웹·인터페이스·브랜딩·모션 작업을 최신순으로 보여주는 피드. 런칭 영상, 앱 아이콘, 앱스토어 스크린샷, 디자인 채용 정보도 있습니다.",
        "when": "요즘 뜨는 스타일을 매일 가볍게 훑어볼 때"
      }
    ]
  },
  {
    "id": "mood",
    "title": "무드보드·큐레이션",
    "short": "무드보드",
    "when": "아이디어·무드 모을 때",
    "desc": "마음에 드는 이미지를 저장하고 나만의 레퍼런스 보드를 만드는 곳입니다. 디자이너를 위한 핀터레스트라고 생각하면 쉽습니다.",
    "items": [
      {
        "name": "Savee",
        "ko": "세이비",
        "url": "https://savee.com/",
        "text": "디자이너·아트 디렉터들이 주로 쓰는 이미지 북마크 서비스. 광고 없이 수준 높은 이미지가 피드에 쌓입니다.",
        "when": "프로젝트 초반 무드보드를 만들 때"
      },
      {
        "name": "Cosmos",
        "ko": "코스모스",
        "url": "https://www.cosmos.so/sequence",
        "text": "이미지·영상·링크를 클러스터로 모아 정리하는 비주얼 아카이브. 광고·알고리즘 피로가 적고 다른 사람의 클러스터를 탐색하기 좋습니다.",
        "when": "주제별로 깔끔하게 레퍼런스를 분류·공유할 때"
      }
    ]
  },
  {
    "id": "mag",
    "title": "디자인 매거진·브랜딩 미디어",
    "short": "매거진·미디어",
    "when": "트렌드와 안목을 키울 때",
    "desc": "글과 기사로 디자인 트렌드와 작업 배경을 읽는 곳입니다. ‘왜 이렇게 디자인했는가’를 배우기 좋아 포트폴리오 케이스 스터디를 쓸 때도 도움이 됩니다.",
    "items": [
      {
        "name": "It's Nice That",
        "ko": "잇츠 나이스 댓",
        "url": "https://www.itsnicethat.com/",
        "text": "영국의 대표적인 크리에이티브 매거진. 그래픽·일러스트·디지털·사진 등 분야의 프로젝트와 인터뷰를 다룹니다.",
        "when": "디자인 업계 뉴스와 새 크리에이터를 알고 싶을 때"
      },
      {
        "name": "NOWNESS",
        "ko": "나우니스",
        "url": "https://www.nowness.com/topics",
        "text": "예술·패션·디자인·음악 등 문화 전반의 단편 영상을 소개하는 비디오 채널.",
        "when": "영상·색감·연출 감각을 넓히고 싶을 때"
      },
      {
        "name": "The Dieline",
        "ko": "더 다이라인",
        "url": "https://thedieline.com/popular/",
        "text": "패키지 디자인 전문 미디어. 전 세계 패키지·브랜딩 사례와 업계 소식을 소개합니다.",
        "when": "패키지·실물 제품 브랜딩을 참고할 때"
      },
      {
        "name": "The Brand Identity",
        "ko": "더 브랜드 아이덴티티",
        "url": "https://the-brandidentity.com/store",
        "text": "브랜드 아이덴티티 프로젝트와 스튜디오 인터뷰를 다루는 매체. 링크는 디자인 책·폰트 등을 파는 스토어입니다.",
        "when": "로고·브랜드 시스템의 수준 높은 사례를 볼 때"
      },
      {
        "name": "BP&O",
        "ko": "비피앤오",
        "url": "https://bpando.org/",
        "text": "Branding, Packaging and Opinion의 줄임말. 브랜딩·패키지 작업을 소개하고 평가까지 덧붙이는 블로그입니다.",
        "when": "디자인을 비평적으로 보는 시각을 키울 때"
      },
      {
        "name": "Visuelle",
        "ko": "비주엘",
        "url": "https://visuelle.co.uk/",
        "text": "영국 기반의 그래픽 디자인 큐레이션 블로그. 아이덴티티·편집·타이포 작업을 담백하게 소개합니다.",
        "when": "타이포그래피와 레이아웃 감각을 기를 때"
      }
    ]
  },
  {
    "id": "studio",
    "title": "스튜디오·에이전시 케이스 스터디",
    "short": "스튜디오·에이전시",
    "when": "트렌드와 안목을 키울 때",
    "desc": "디자인 스튜디오가 자기 작업을 어떻게 소개하는지 볼 수 있는 포트폴리오입니다. 내 케이스 스터디의 구성과 글쓰기 참고용으로 좋습니다.",
    "items": [
      {
        "name": "Metalab",
        "ko": "메타랩",
        "url": "https://www.metalab.com/",
        "text": "캐나다 밴쿠버의 프로덕트 디자인 에이전시. Slack 초기 디자인 등 스타트업·테크 기업의 앱과 서비스를 설계해 왔습니다.",
        "when": "프로덕트 디자인 에이전시가 일하는 방식과 케이스 스터디를 볼 때"
      },
      {
        "name": "Koto",
        "ko": "코토",
        "url": "https://koto.com/work",
        "text": "런던에서 시작한 글로벌 브랜딩·디지털 에이전시. 테크 기업과 소비자 브랜드의 리브랜딩 작업이 많습니다.",
        "when": "브랜드 전략부터 디지털 적용까지 이어지는 리브랜딩 사례를 볼 때"
      },
      {
        "name": "Studio Kiln",
        "ko": "스튜디오 킬른",
        "url": "https://www.studio-kiln.com/project/bafta-awards-2026",
        "text": "영국의 브랜드·모션 디자인 스튜디오. 링크는 BAFTA 시상식 4개를 하나로 묶은 아이덴티티 프로젝트로, 입자가 흐르는 절차적(procedural) 그래픽을 활용했습니다.",
        "when": "움직이는 브랜드 시스템과 케이스 스터디 구성을 볼 때"
      },
      {
        "name": "Eloqwnt",
        "ko": "엘로퀀트",
        "url": "https://www.eloqwnt.com/projects",
        "text": "핀테크·AI·B2B 테크 기업을 주로 맡는 디자인 에이전시. 웹 디자인, 브랜딩, UX/UI 프로젝트 60여 건을 공개합니다.",
        "when": "SaaS·핀테크 랜딩페이지와 앱 UI 사례를 볼 때"
      }
    ]
  },
  {
    "id": "res",
    "title": "디자인 리소스·제작 도구",
    "short": "리소스·도구",
    "when": "작업물을 만들고 보여줄 때",
    "desc": "아이콘, 목업, 폰트, 컴포넌트처럼 작업에 바로 가져다 쓸 수 있는 재료와 도구입니다. 상업적으로 쓸 때는 각 사이트의 라이선스를 꼭 확인하세요.",
    "items": [
      {
        "name": "Feather Icons",
        "ko": "페더 아이콘즈",
        "url": "https://feathericons.com/",
        "text": "간결한 선 스타일의 무료 오픈소스 아이콘 세트. SVG로 바로 내려받을 수 있습니다.",
        "when": "와이어프레임·프로토타입에 깔끔한 아이콘이 필요할 때"
      },
      {
        "name": "Craftwork",
        "ko": "크래프트워크",
        "url": "https://craftwork.design/catalog/mockups",
        "text": "목업, UI 키트, 일러스트, 3D 에셋 등 디자인 리소스 마켓 (무료·유료). 링크는 목업 카탈로그입니다.",
        "when": "포트폴리오에 디바이스 목업을 입힐 때"
      },
      {
        "name": "animos",
        "ko": "애니모스",
        "url": "https://animos.app/#why",
        "text": "디자인 결과물을 넣기만 하면 움직이는 쇼케이스 영상으로 만들어주는 브라우저 도구. 템플릿 25개를 제공하고 MP4·WebM으로 내보냅니다.",
        "when": "포트폴리오·SNS에 올릴 작업 소개 영상을 만들 때"
      },
      {
        "name": "Kimera Waldenburg",
        "ko": "키메라 발덴부르크",
        "url": "https://kimeracorp.eu/typefaces/waldenburg",
        "text": "독일 타입 파운드리 Kimera의 산세리프 서체. 굵기·폭을 다양하게 갖춘 패밀리로, x-height가 높아 화면에서 잘 읽힙니다. (유료, 체험판 제공)",
        "when": "완성도 높은 유료 서체를 살펴보고 타입 스페시멘 구성을 배울 때"
      },
      {
        "name": "21st.dev",
        "ko": "트웨티퍼스트 닷 덱",
        "url": "https://21st.dev/",
        "text": "React·Tailwind 기반 UI 컴포넌트를 공유하는 커뮤니티 라이브러리. 코드와 동작하는 미리보기를 함께 볼 수 있습니다.",
        "when": "실제로 구현 가능한 컴포넌트와 인터랙션을 확인할 때"
      },
      {
        "name": "Framer",
        "ko": "프레이머",
        "url": "https://www.framer.com/solutions/marketers/",
        "text": "디자인 툴처럼 그리면서 코드 없이 실제 웹사이트를 만들고 배포하는 노코드 빌더. 링크는 마케터용 소개 페이지입니다.",
        "when": "포트폴리오 사이트나 랜딩페이지를 직접 만들 때"
      }
    ]
  },
  {
    "id": "community",
    "title": "커뮤니티·교육·커리어",
    "short": "커뮤니티·커리어",
    "when": "배움과 커리어를 이어갈 때",
    "desc": "부트캠프가 끝난 뒤에도 계속 배우고 일을 찾을 수 있는 곳입니다.",
    "items": [
      {
        "name": "Into Design Systems",
        "ko": "인투 디자인 시스템즈",
        "url": "https://www.intodesignsystems.com/meetups",
        "text": "디자인 시스템에 집중한 컨퍼런스·교육 커뮤니티. 온라인 행사와 세계 각지 밋업을 열고 강연 영상을 공개합니다.",
        "when": "토큰·컴포넌트·피그마 변수 등 디자인 시스템을 깊이 배울 때"
      },
      {
        "name": "ilovecreatives",
        "ko": "아이 러브 크리에이티브스",
        "url": "https://ilovecreatives.com/",
        "text": "미국 기반 크리에이티브 커뮤니티. 디자인·브랜딩 온라인 강의와 크리에이티브 채용 게시판을 운영합니다.",
        "when": "해외 크리에이티브 직무와 프리랜서 문화를 엿볼 때"
      }
    ]
  }
]
