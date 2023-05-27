# next-js practis 
- 아직은 13버전의 안정화가 끝나지 않은것 같기 때문에 12버전의 기능들로 구현을 하되
틈틈히 13버전의 업데이트 내용 살펴보기...

- next-js의 docs를 보고 13버전의 문법을 익혀 사용 해보았지만 현시점(2023-03-08)기준으로 
불안정한 부분들이 많고 불편한 부분들이 많기 때문에 안정화가 다끝나면 그때 사용하기...

- 뼈대는 방식에 따라 team movie api를 이용한 영화 페이지를 이용한 게시판으로 진행 

- sever side props 나 static props 같은 문법에서 데이터 fetching을 할때에는 localhost가아닌 127.0.0.1을 붙여 fetching를 진행 

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

##### 개인적인 생각 

- 프로젝트의 방식이나 페이지의 기능에 따라 다르겠지만 개인적으로는 동적으로 빌드할때는 render_first(cache+ssr)가 정적으로 빌드 할때는 render_third(isr)가 좋은방식인것같다.  
