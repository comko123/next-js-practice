import axios from "axios"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { movie } from "."

const Detail:NextPage<{data:movie}> = ({data}) => {
    const {replace} = useRouter()
    return<>{data?<div className="grid grid-cols-2 gap-3 m-3 ">
    <Image width={300} height={300} alt=""  priority
    src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path as string}`}
    className="h-[95vh] aspect-square rounded-2xl cursor-pointer"/>
    
    <div>
        <h1 className="text-center font-bold text-xl pb-5 mb-5 border-b-2 border-b-black">{data.title}</h1>
        <div className="flex justify-end mr-5 font-bold text-md"> adult : {JSON.stringify(data.adult)}</div>
        <div className="flex justify-end mr-5 font-bold text-md pb-5 mb-5 border-b-2 border-b-black"> popularity : {Math.ceil(data.popularity as number)}</div>
        <span className="font-bold text-2xl">overview : </span>
        <span className=" mr-5 font-bold text-md text-justify">{data.overview} </span>
        <div className="flex w-full h-[40vh] items-center justify-center">
            <button className="bg-orange-500 p-1 rounded-lg text-white hover:bg-orange-600"
            onClick = {()=>replace('/')}>home</button></div>
    </div>
    
    </div>:"loading..."}</>
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
      paths: [],
      /*SSG에서는 paths라는 필드에 몇개에 페이지가 필요한지 알려주는 과정이 있었지만 
        ISR에서는 empty array를 주는 것으로 페이지를 미리 생성하지 않고 사용자가 방문했을때만 
        해당 detail페이지를 생성하는 것을 의미한다.*/
     fallback: "blocking",
     /*fallback옵션 
     fallback는 getStaticPaths에서 리턴하지 않은 페이지에 접속 시 발생하는 동작에 관련한 옵션인데 3가지 옵션이있다.
     true : getStaticPaths에서 리턴하지 않은 페이지에 접속 시, 먼저 사용자에게 fallback 페이지를 보여준다.
     서버에서 static하게 페이지를 생성하며 ,해당 페이지를 사용자에게 보여준다.
     다음부터 해당 페이지로 접속하는 사용자에게는 static한 페이지를 보여준다.
     false : getStaticPaths에서 리턴하지 않은 페이지는 모두 404로 연결한다.
     "blocking": getStaticPaths에서 리턴하지 않은 페이지에 접속 시, 사용자에게 server side rendering한 static 페이지를 보여준다.
     다음부터 해당 페이지로 접속하는 사용자에게는 server side rendering한 static 페이지를 보여준다.
     즉 fallback 페이지나 로딩 화면이 없다.
     */
    };
  };

export const getStaticProps:GetStaticProps = async({params}) => {
    
    await new Promise((resolve) => setTimeout(resolve, 10000))
  /*위코드는 페이지 렌더링을 10초 지연시키는 코드이며 ISR의 특성상 사용자가 해당페이지에 
    처음 방문할때는 위 코드로 인하여 10초지연이 발생 하지만  그이후 페이지를 다시 방문 하거나 
    해당 페이지에서 reload를 하게 된다면 10초 지연이 발생 하지 않는다.
    그이유는 해당 페이지를 처음 방문했을때 10초 지연이 발생한후 
    정적(static)인 html파일로 build하기 때문에 지연이 발생하지 않는다.
    (해당페이지를 처음 이후에 cache하기때문.)
   */ 
  const data = await(await axios(`http://127.0.0.1:3000/movie/${params?.id}`)).data
    return({props:{data},
      revalidate:20
    /*revalidate 는 html을 regenerate 할 수 있게하는 옵션이다.
      html이 만들어지고 20초 동안은 사용자에게 같은 html파일을 그대로 응답한다. 
      20초가 지나고 GET 요청이 오면, 기존 html을 응답하면서 동시에 새로운 html을 regenerate 한다. 
      그리고 다음 GET 요청부터는 갱신된 html 문서를 응답한다.*/
    })
}

export default Detail
