<h1>🍖 Food Share | 음식에 대한 정보 Food Share에서!</h1>

<h4><a href="https://www.foodshare.shop" target="_blank">사이트 바로가기</a>&nbsp;&nbsp;&nbsp;<a href="https://github.com/dev-nohyj/cooking-recipe-fe" target="_blank">프론트엔드 Repository</a>&nbsp;&nbsp;&nbsp;<a href="https://github.com/dev-nohyj/cooking-recipe-be" target="_blank">백엔드 Repository</a></h4>

<br/>
<br/>

<img src="https://github.com/dev-nohyj/cooking-recipe-be/assets/141613226/d5cd6412-2f84-481f-85ef-bfc16672889a" alt="img"  width="100%" height="auto">

## 💬 프로젝트 소개

**음식 사진 및 나만의 레시피를 공유하는 사이트**

-   개인 프로젝트
-   개발기간: 2023.08.21 ~ 2023.09.22
-   최근 유튜브 쇼츠 등 음식과 관련된 영상을 자주 접하게 되어 흥미를 갖고 있었으며, 음식을 주제로 한 프로젝트를 진행하면 어떨까 생각해서 진행하게 됨
-   배포: Vercel 배포 방식 사용
    <br/>
    <br/>

## ⚒️ Package

-   Language: TypeScript
-   Stack: React, Nextjs
-   UI: styled-components
-   Cache Manage: React Query
-   Form management: React-hook-form, yup
-   Editor: React-quill
    <br/>
    <br/>

## 💡 사용 및 환경 변수

<br />

```bash
$ git clone https://github.com/dev-nohyj/cooking-recipe-fe.git
$ cd cooking-recipe-fe
$ yarn
$ yarn dev
```

<br />

```bash
.env File
BACKEND_URL='백엔드 url'
COOKIE="쿠키 key값"
CLIENT_URL="프론트 url"
OPENAI_API_KEY="open api key"
```

<br />
<br />

## 💻 기능정보

1. 유저

-   로그인 방식: 구글 및 카카오 소셜 로그인 방식을 지원함
-   프로필: 닉네임, 한줄 소개, 프로필 이미지를 추가 및 변경이 가능

2. 레시피 공유

-   레시피 작성: 카테고리, 썸네일, 제목, 태그를 추가할 수 있으며 내용은 react quill 에디터를 사용
-   레시피 조회: 카테고리 별로 조회가 가능하며, 무한 스크롤 방식을 사용해서 구현함. 로그인 유저는 좋아요를 눌러 해당 게시물에 관심을 표현할 수 있음
-   레시피 상세 조회: 레시피의 내용을 볼 수 있으며, 해당 게시물에 좋아요와 댓글을 작성이 가능함 댓글의 경우 댓글과 답글까지만으로 제한을 둠
-   레시피 수정: 자신의 게시물을 수정할 수 있으며, ui는 레시피 작성과 동일함
-   레시피 삭제: 자신의 게시물을 삭제할 수 있으며, 모달창을 통해 다시 한번 물어본 후 삭제하게 구현

3. 음식 사진 공유

-   음식 사진 추가: 사진에 대한 간단한 내용, 태그를 추가할 수 있으며 이미지는 최대 6장까지 업로드가 가능함
-   음식 사진 조회: 무한 스크롤 방식을 사용해서 구현했으며, 게시물의 링크를 복사해 공유할 수 있음
-   음식 사진 상세 조회: 여러장의 이미지를 볼 수 있으며, 해당 게시물에 좋아요를 누를 수 있음
-   음식 사진 수정: 자신의 게시물을 수정할 수 있으며, ui는 음식사진 추가와 동일함
-   음식 사진 삭제: 자신의 게시물을 삭제할 수 있으며, 모달창을 통해 다시 한번 물어본 후 삭제하게 구현

4. 레시피 봇

-   음식명을 입력하면 해당 음식의 레시피를 만들어주는 기능으로 Chat Gpt api를 사용해서 구현
-   데이터를 스트리밍 방식으로 받아와 긴 로딩을 기다려야하는 부분을 개선
    <br/>
    <br/>

## 🚀 트러블 슈팅 및 개선

<br />

-   React quill 에디터에서 이미지를 삭제할 경우 커서를 해당 이미지 앞에 위치 시킨 뒤 백스페이스를 눌러 삭제를 해야하는데 커서가 잘 보이지 않아 삭제에 불편함을 느껴 이미지를 클릭하면 커서를 해당 이미지 앞으로 이동 시키며 UI는 해당 이미지를 포커스한 느낌으로 만들어 삭제를 보다 편리하게 개선했습니다.

-   음식 사진 조회 페이지에서 게시물을 Hover할 경우 id 값을 받아오는 useHoverGetId 커스텀 훅을 구현해서 사용했는데 부모 컴포넌트인 FoodList에서 사용할 경우 카드가 깜빡이는 현상이 발생했습니다. 이는 부모 컴포넌트가 리렌더링이 되어 자식 컴포넌트 또한 리렌더링이 발생했기 때문에 해당 훅을 자식 컴포넌트에 적용해서 리랜더링이 계속 발생하는 현상을 해결했습니다.

-   레시피 봇이 레시피를 만들어주는 기능에서 api를 요청하면 로딩 시간이 약 10~30초 정도 길게 걸리는 문제가 있었는데 이 부분을 Loading spinner를 추가해서 개선할까 생각했지만, 유저가 계속해서 대기하게 된다면 사용자 경험을 다소 해칠 우려가 있어 이 부분을 데이터 스트리밍 방식으로 변경해서 개선 했습니다.
