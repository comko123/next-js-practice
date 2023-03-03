# next-js practis 
- 아직은 13버전의 안정화가 끝나지 않은것 같기 때문에 12버전의 기능들로 구현을 하되
틈틈히 13버전의 업데이트 내용 살펴보기...

- 뼈대는 방식에 따라 team movie api를 이용한 영화 페이지 or  json placehorder api를 이용한 게시판으로 진행 

## tools
- git  
- swr
- axios
- react
- next-js
- git-hub
- tailwind-css
- type-script

### branch_list

#### render_first : sever side render + cache 를 이용한 페이지 빌드및 구성

- get_sever_side_prop 를 사용하여 cache 초기값으로 데이터를 세팅하며 
  클라이언트단 에서는 최신데이터를 서버에 요청하는 방식.

#### render_second : ssg를 사용한 정적인 페이지 빌드 및 구성

- get static props 와 get static paths 를 이용하여 사전에 html파일로 빌드하여
  정적으로 구현하는 방식.

#### render_third : isr이용한 정적이면서 최신데이터를 보여주는 페이지를 구성

- get static props 와 get static paths 를 이용하여 페이지를 정적으로 만들며
  동적인 라우팅을 가지는 페이지는 사용자가 요청을 할때마다 페이지를 생성하는 방식.

#### render_fourth

-

#### render_fifth

-