# package.json Explanation

## Dependencies

- **@popperjs/core**:
  포퍼(popover), 툴팁 등 UI 요소의 위치를 정밀하게 계산해주는 라이브러리입니다. 주로 Bootstrap과 함께 사용됩니다.

- **axios**:
  HTTP 요청을 처리하기 위한 라이브러리로, 브라우저와 Node.js 환경에서 모두 사용할 수 있습니다. 주로 API 호출에 사용됩니다.

- **bootstrap**:
  반응형 웹 디자인을 쉽게 구현할 수 있도록 도와주는 CSS 프레임워크입니다. 다양한 스타일과 컴포넌트를 제공합니다.

- **cors**:
  Node.js 및 Express 애플리케이션에서 Cross-Origin Resource Sharing(CORS) 설정을 쉽게 할 수 있도록 도와주는 미들웨어입니다.

- **date-fns**:
  날짜와 시간을 다루기 위한 유틸리티 라이브러리입니다. 날짜 포매팅, 비교, 연산 등 다양한 기능을 제공합니다.

- **jwt-decode**:
  JSON Web Token(JWT)을 디코딩하는 라이브러리로, 클라이언트 측에서 JWT의 내용을 읽을 때 사용됩니다.

- **moment**:
  날짜와 시간을 다루기 위한 또 다른 유틸리티 라이브러리입니다. date-fns와 비슷하지만, 좀 더 직관적인 API를 제공합니다.

- **react**:
  사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다. 컴포넌트 기반의 구조로, 효율적인 UI 구성을 도와줍니다.

- **react-bootstrap**:
  React용 Bootstrap 컴포넌트 라이브러리입니다. React와 Bootstrap을 함께 사용할 때 유용합니다.

- **react-date-range**:
  날짜 범위 선택기 컴포넌트를 제공하는 라이브러리입니다. 주로 예약 시스템이나 일정 관리 시스템에서 사용됩니다.

- **react-dom**:
  React의 DOM 관련 패키지로, React 컴포넌트를 브라우저의 DOM에 렌더링하는 역할을 합니다.

- **react-icons**:
  다양한 아이콘 라이브러리를 React 컴포넌트 형태로 사용할 수 있게 해주는 라이브러리입니다.

- **react-router-dom**:
  React 애플리케이션에서 라우팅을 관리하기 위한 라이브러리입니다. URL 경로에 따라 컴포넌트를 렌더링하는 기능을 제공합니다.

- **reactstrap**:
  React용 Bootstrap 컴포넌트 라이브러리로, react-bootstrap과 비슷한 역할을 하지만 약간 다른 API를 제공합니다.

## DevDependencies

- **@types/react**:
  TypeScript 프로젝트에서 React를 사용할 때 타입 정의를 제공하는 패키지입니다.

- **@types/react-dom**:
  TypeScript 프로젝트에서 react-dom을 사용할 때 타입 정의를 제공하는 패키지입니다.

- **@vitejs/plugin-react**:
  Vite에서 React를 사용할 수 있도록 도와주는 플러그인입니다.

- **eslint**:
  JavaScript 및 TypeScript 코드의 스타일과 품질을 검사하는 도구입니다.

- **eslint-plugin-react**:
  ESLint에서 React 코드 규칙을 지원하는 플러그인입니다.

- **eslint-plugin-react-hooks**:
  React Hooks 관련 규칙을 지원하는 ESLint 플러그인입니다.

- **eslint-plugin-react-refresh**:
  React Refresh를 지원하는 ESLint 플러그인으로, 개발 중 핫 리로딩을 도와줍니다.

- **vite**:
  빠른 프론트엔드 빌드 도구입니다. 개발 서버와 프로덕션 빌드를 모두 지원합니다.

## Impact of Missing DevDependencies

DevDependencies에 있는 패키지들은 주로 개발 및 빌드 과정에서 필요한 도구들입니다. 이들이 없으면 다음과 같은 문제가 발생할 수 있습니다:

1. **타입 정의 패키지 (`@types/react`, `@types/react-dom`)**
   - **문제**: TypeScript에서 코드의 타입 체크와 자동 완성 기능이 제대로 작동하지 않을 수 있습니다.
   - **영향**: 타입 오류를 발견하기 어려워지고, 개발자가 코드 작성 시 타입 정보를 제대로 활용할 수 없어 버그가 발생할 가능성이 높아집니다.

2. **빌드 도구 및 플러그인 (`@vitejs/plugin-react`, `vite`)**
   - **문제**: 애플리케이션의 개발 및 빌드 과정이 제대로 이루어지지 않을 수 있습니다.
   - **영향**:
     - **개발 서버**: Vite가 없어 개발 서버를 실행할 수 없으므로, 핫 리로딩과 같은 개발 도구를 사용할 수 없습니다.
     - **프로덕션 빌드**: Vite가 없어 애플리케이션을 프로덕션 환경에 맞게 최적화된 번들로 빌드할 수 없습니다.

3. **코드 품질 도구 (`eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)**
   - **문제**: 코드의 품질을 유지하기 위한 검사가 이루어지지 않습니다.
   - **영향**:
     - **코드 스타일**: ESLint 규칙을 따르지 않은 코드가 커밋될 수 있으며, 일관성 없는 코드 스타일이 프로젝트에 나타납니다.
     - **버그 및 성능 문제**: 잠재적인 코드 문제나 버그를 미리 발견하지 못해 품질 문제가 발생할 수 있습니다.

4. **React Fast Refresh (`eslint-plugin-react-refresh`)**
   - **문제**: React 컴포넌트의 핫 리로딩 기능이 제대로 작동하지 않을 수 있습니다.
   - **영향**: 개발 중 코드 변경 시 브라우저가 자동으로 업데이트되지 않아 개발 속도가 느려지고, 개발 경험이 저하될 수 있습니다.

이렇게 각 라이브러리는 특정한 목적과 기능을 가지고 있으며, 프로젝트의 다양한 요구사항을 충족시키기 위해 사용됩니다.
