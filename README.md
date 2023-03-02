# ssr + cache 
- 유저의 요청에따라 페이지를 서버단에서 재렌더링 하여 클라이언트단에서는 부담을 최소화 하는 방식  

- get server side props와 swr의 cache기능을 사용한 영화 페이지 예시 

## get server side props 
- get server side props는 서버단에서 요청을 하고 요청이 완료되면 render을 하기때문에 loading state가필요없다.

- 서버단에서 요청을 먼저하고 사용자는 완료된 결과물만 보기 때문에 loading state가 필요없는 대신 사용자는 서버단에서
요청이 완료 될때까지 아무것도 볼수 없다. (google에서는 이러한 방식을 사용중) 