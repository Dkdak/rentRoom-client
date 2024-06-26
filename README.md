# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


git pull 프로젝트 생성 이후 수행 단계

1. 의존성 설치 확인
- npm install 명령어를 실행하여 package.json에 명시된 모든 의존성을 설치
> npm install

2. react 스크립트 확인
- package.json 파일에 dev 스크립트가 정의되어 있는지 확인 (devDependencies- react관련 lib 확인, 'dev'기 있는지 확인 )

3. 서버 실행
- npm run dev를 실행할 때 발생하는 오류 메시지를 확인하고 그에 따라 문제를 해결
> npm run dev

4. 실패시에 모듈 재설치
- Node.js와 npm 버전 확인
> node -v
> npm -v
- npm 캐시 클린 및 모듈 재설치
> npm cache clean --force
> rm -rf node_modules
> npm install