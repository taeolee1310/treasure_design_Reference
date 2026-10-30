# UI/UX 보물창고

프로덕트 디자이너를 위한 레퍼런스 사이트 30곳을 모은 갤러리입니다. 썸네일과 설명으로 훑어보고, 막막할 때는 고민을 적어서 어디서 시작하면 좋을지 추천받을 수 있습니다.

**https://ui-ux-treasure.vercel.app**

## 무엇을 할 수 있나

- **상황별로 둘러보기:** 화면 설계, 무드 수집, 안목 키우기, 제작, 커리어까지 6개 카테고리로 나눴습니다.
- **고민으로 찾기:** "무드보드 어떻게 시작하지", "그 핀터레스트처럼 생긴 레이아웃 이름이 뭐지"처럼 말하듯 적으면 맞는 사이트와 보는 순서를 알려줍니다.
- **고민 칩 11개:** 자주 막히는 지점마다 큐레이션한 추천 경로가 있습니다. 순서대로 번호가 붙은 카드와 한 줄 가이드가 나옵니다.
- **추천 이유 표시:** 결과 카드마다 왜 추천했는지 보여줍니다.
- **모바일과 다크모드**를 지원하고, 모션은 첫 화면과 카드 등장 정도로 최소한만 씁니다.

## 기술 스택

React 19, TypeScript, Tailwind CSS v4, Vite, lucide-react. 서버 없이 정적 파일로 배포됩니다.

```bash
npm install
npm run dev       # 개발 서버
npm run build     # 타입 검사 + 빌드 (dist/)
npm run preview   # 빌드 결과 미리보기
npm test          # 검색 정확도 테스트
```

## 검색은 이렇게 동작합니다

서버나 외부 API 없이 브라우저에서 모두 처리합니다. 코드는 [src/lib/search.ts](src/lib/search.ts)에 있습니다.

1. **개념 사전.** "막막해요", "뭐라고 부르더라" 같은 구어체와 영어 표현을 40여 개 개념(무드, 온보딩, 포트폴리오 등)으로 묶었습니다. 질문을 단어가 아니라 의도로 읽습니다.
2. **사이트별 가중치.** 사이트마다 어떤 개념에 강한지 1~3점으로 연결했습니다. 근거는 각 사이트를 직접 수집한 내용(제목, 소개 문구, 제목 태그)입니다.
3. **오타와 초성.** 자모 단위 편집 거리로 "무드보두"를, 초성 매칭으로 "ㅁㄷㅂㄷ"을 처리합니다.
4. **긴 표현 우선.** "브랜딩" 속의 "랜딩"이 따로 걸리지 않도록 긴 표현부터 잡고 이미 쓴 글자는 막습니다.
5. **경로 선택.** 핵심 개념이 하나라도 걸리거나 보조 개념이 둘 이상 걸려야 고민 경로를 보여줍니다.
6. **되묻기.** 막막함만 있고 내용이 없으면 "어떤 부분이 막막한가요?"라고 묻습니다. 맞는 곳이 없으면 가까운 고민 후보를 제안합니다.

## 구성

```
src/
  data/sites.ts        사이트 목록(카테고리별)
  lib/search.ts        고민 검색 엔진(개념 사전, 가중치, 추천 경로)
  lib/engine.ts        엔진과 사이트 데이터를 잇는 얇은 층
  lib/utils.ts         cn() 유틸 (shadcn 호환)
  components/          Hero, Toolbar, Results, SiteCard 등
  index.css            Tailwind 설정과 디자인 토큰(라이트/다크)
public/thumbs/         사이트 첫 화면 스크린샷 (2026년 10월 기준)
tests/                 검색 테스트
components.json        shadcn CLI 설정 (21st.dev 컴포넌트 추가용)
```

## 사이트 추가하기

1. [src/data/sites.ts](src/data/sites.ts)의 맞는 카테고리에 항목을 추가합니다.
2. 썸네일을 `public/thumbs/`에 `이름을-소문자-하이픈.jpg`로 넣습니다. 예: `land-book.jpg`
3. [src/lib/search.ts](src/lib/search.ts)에서 두 가지를 채웁니다.
   - `WEIGHTS_SRC`에 개념 가중치를 추가합니다. 예: `"새 사이트":"landing3 web2"`
   - `TAGS`에 검색에 걸릴 키워드를 추가합니다.
4. `npm test`로 기존 질문의 결과가 바뀌지 않았는지 확인합니다.

테스트는 구어체 질문 60여 개에 정답 사이트를 정해 두고, 상위 결과에 나오는지 확인합니다. 새로 발견한 엉뚱한 추천은 `tests/search.test.mjs`에 질문을 추가해서 고정하세요.

## 21st.dev 컴포넌트 추가하기

`@/` 경로 별칭과 `components.json`이 설정되어 있어서 shadcn CLI로 바로 추가할 수 있습니다. 컴포넌트마다 라이선스가 다르니 가져오기 전에 확인하세요.

```bash
npx shadcn@latest add "https://21st.dev/r/<작성자>/<컴포넌트>"
```

## 21st.dev에서 가져온 아이디어

둘 다 새 의존성 없이 CSS로 구현했습니다.

| 효과 | 쓰이는 곳 | 출처와 처리 |
| --- | --- | --- |
| Text Rotate | 첫 화면의 "혹시 이런 고민이세요?" 문구가 돌아가고, 누르면 그 고민으로 검색 | [Daniel Petho](https://21st.dev/@danielpetho/components/text-rotate) (MIT). 공개된 동작 명세를 따라 `motion` 없이 직접 구현 → [src/components/ui/text-rotate.tsx](src/components/ui/text-rotate.tsx) |
| Spotlight Card | 카드에 마우스를 올리면 따라오는 은은한 빛 | [Hossain Jahed](https://21st.dev/@jahed/components/spotlight-card). 소스가 로그인 뒤에 있고 라이선스 표기가 없어 코드는 보지 않았고, 효과 아이디어만 참고해 직접 구현 → [src/components/SiteCard.tsx](src/components/SiteCard.tsx) |

`AI prompt Box`도 검토했지만 framer-motion과 radix 의존성이 붙고 파일·음성 기능까지 있어서 이 서비스에는 무거워 제외했습니다.

## 배포

GitHub 저장소를 Vercel에 연결해 두었습니다. `main`에 push하면 `vercel.json` 설정(Vite, `dist`)대로 자동 빌드·배포됩니다.

## 참고

- 썸네일은 스크린샷 서비스로 받아 저장한 이미지입니다. 각 사이트의 저작권은 해당 사이트에 있습니다.
- 아이콘, 폰트, 목업을 상업적으로 쓸 때는 각 사이트의 라이선스를 확인하세요.
- 원본 레퍼런스 목록은 2026년 10월 13일 기준입니다.
