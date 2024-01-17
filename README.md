# Suvey Web Project
React, Node.js, Express.js, MongoDB를 활용하여 만든 설문조사 웹사이트입니다.

<br>

## 개발 기간
📅 22.12 ~ 23.04

📅 23.09 ~ 23.10

<br>

## 개발 환경
Environment : `Visual Studio Code`, `MongoDBCompass`, `Git`, `GitHub`

Config : `npm`

Development : `JavaScript`, `React`, `Node.js`, `Express.js`, `MongoDB`

<br>

## 프로젝트 구조
<details>
  <summary><strong>접기/펼치기</strong></summary>
```
📦src
 ┣ 📂asset
 ┃ ┗ 📂font
 ┃ ┃ ┣ 📜NotoSansKR-Bold.otf
 ┃ ┃ ┣ 📜NotoSansKR-Bold.woff
 ┃ ┃ ┣ 📜NotoSansKR-Bold.woff2
 ┃ ┃ ┣ 📜NotoSansKR-Light.otf
 ┃ ┃ ┣ 📜NotoSansKR-Light.woff
 ┃ ┃ ┣ 📜NotoSansKR-Light.woff2
 ┃ ┃ ┣ 📜NotoSansKR-Medium.otf
 ┃ ┃ ┣ 📜NotoSansKR-Medium.woff
 ┃ ┃ ┣ 📜NotoSansKR-Medium.woff2
 ┃ ┃ ┣ 📜NotoSansKR-Regular.otf
 ┃ ┃ ┣ 📜NotoSansKR-Regular.woff
 ┃ ┃ ┗ 📜NotoSansKR-Regular.woff2
 ┣ 📂main
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜SurveyItem.js
 ┃ ┃ ┣ 📜SurveyList.js
 ┃ ┃ ┗ 📜SurveyResult.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Auth.js
 ┃ ┃ ┣ 📜Home.js
 ┃ ┃ ┣ 📜MobileResult.js
 ┃ ┃ ┗ 📜Survey.js
 ┃ ┗ 📂styles
 ┃ ┃ ┣ 📜Auth.css
 ┃ ┃ ┣ 📜Mobile.css
 ┃ ┃ ┣ 📜Result.css
 ┃ ┃ ┗ 📜Survey.css
 ┣ 📂post
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜PostItem.js
 ┃ ┃ ┗ 📜PostList.js
 ┃ ┣ 📂page
 ┃ ┃ ┣ 📜NewPost.js
 ┃ ┃ ┣ 📜PostView.js
 ┃ ┃ ┗ 📜UpdatePost.js
 ┃ ┗ 📂styles
 ┃ ┃ ┣ 📜PostForm.css
 ┃ ┃ ┣ 📜PostItem.css
 ┃ ┃ ┗ 📜PostList.css
 ┣ 📂shared
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂FormElements
 ┃ ┃ ┃ ┣ 📜Button.css
 ┃ ┃ ┃ ┣ 📜Button.js
 ┃ ┃ ┃ ┣ 📜Dropdown.css
 ┃ ┃ ┃ ┣ 📜Dropdown.js
 ┃ ┃ ┃ ┣ 📜Input.css
 ┃ ┃ ┃ ┣ 📜Input.js
 ┃ ┃ ┃ ┗ 📜Pagination.js
 ┃ ┃ ┣ 📂Navigation
 ┃ ┃ ┃ ┣ 📜MainHeader.css
 ┃ ┃ ┃ ┣ 📜MainHeader.js
 ┃ ┃ ┃ ┣ 📜MainNavigation.css
 ┃ ┃ ┃ ┣ 📜MainNavigation.js
 ┃ ┃ ┃ ┣ 📜NavLinks.css
 ┃ ┃ ┃ ┣ 📜NavLinks.js
 ┃ ┃ ┃ ┣ 📜SideDrawer.css
 ┃ ┃ ┃ ┗ 📜SideDrawer.js
 ┃ ┃ ┗ 📂UIElement
 ┃ ┃ ┃ ┣ 📜Backdrop.css
 ┃ ┃ ┃ ┣ 📜Backdrop.js
 ┃ ┃ ┃ ┣ 📜Card.css
 ┃ ┃ ┃ ┣ 📜Card.js
 ┃ ┃ ┃ ┣ 📜ErrorModal.js
 ┃ ┃ ┃ ┣ 📜LoadingSpinner.css
 ┃ ┃ ┃ ┣ 📜LoadingSpinner.js
 ┃ ┃ ┃ ┣ 📜Modal.css
 ┃ ┃ ┃ ┗ 📜Modal.js
 ┃ ┣ 📂context
 ┃ ┃ ┗ 📜auth-context.js
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜auth-hook.js
 ┃ ┃ ┣ 📜fetch-hook.js
 ┃ ┃ ┗ 📜form-hook.js
 ┃ ┗ 📂util
 ┃ ┃ ┗ 📜validators.js
 ┣ 📂store
 ┃ ┣ 📜check.js
 ┃ ┣ 📜store.js
 ┃ ┗ 📜survey.js
 ┣ 📂survey
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜Check.js
 ┃ ┃ ┣ 📜SurveyCard.js
 ┃ ┃ ┗ 📜SurveyFormList.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Register.js
 ┃ ┃ ┗ 📜SurveyForm.js
 ┃ ┗ 📂styles
 ┃ ┃ ┣ 📜Check.css
 ┃ ┃ ┣ 📜Register.css
 ┃ ┃ ┗ 📜SurveyForm.css
 ┣ 📂test
 ┃ ┣ 📜App.test.js
 ┃ ┣ 📜reportWebVitals.js
 ┃ ┗ 📜setupTests.js
 ┣ 📜App.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┗ 📜reset.css
```
 </details>
<br>

## 주요 기능
<h3>:page_facing_up: <a href="https://drive.google.com/file/d/15sJD1y3WaVe4PnlT2LNuik13LP7L88p0/view?usp=drive_link">자세히 보기</a></h3>

- 로그인 / 회원가입

- 설문등록
   
- 설문응답
   
- 설문결과
