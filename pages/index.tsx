import axios from "axios"
import Link from "next/link"
import Image from "next/image"
import useSWR , { SWRConfig } from "swr"
import { GetServerSideProps, NextPage } from "next"

export interface movie {[key:string]:string|number|number[]}

const Movie:NextPage = () => {
const {data:{results}} = useSWR("/movie/all") 
//Main 컴포넌트에서 기본값을 설정했기 때문에 데이터가 비어있는 상태가 아닌 상태로 시작한다.
/*SWR를 사용하면서, SEO를 위해 페이지를 미리 렌더링할 수 있으며 
클라이언트 측에서 caching, revalidation, focus tracking, refetching와 같은 기능도 사용 가능하다.*/
return(<div className="grid grid-cols-5 my-3">
{results?.map((item:movie)=><Link href={`/${item.id}`} key={item.id as string}>
<Image width={3000} height={30} alt="" priority 
className="w-52 aspect-square my-2 shadow-xl rounded-xl mx-auto hover:scale-x-105 transition-transform cursor-pointer" 
src={`https://image.tmdb.org/t/p/w500/${item.poster_path as string}`}/>
</Link>)}
</div>)
}

const Main:NextPage<movie> = ({results}) => {
    //불러온 데이터를 props로 받아 swr키에 기본값으로 설정한다.
    return(<SWRConfig value={{fallback:{"/movie/all":results}}}>
        <Movie/>
    </SWRConfig>)
} 

export const getServerSideProps:GetServerSideProps = async() => {
    //sever-side에서 데이터를 불러온다.
    //페이지에서 getServerSideProps라는 함수를 export 하면 Next.js는 해당 함수에서 반환된 데이터를 사용하여 각 요청에서 이 페이지를 미리 랜더링한다.
    const {results} = await(await axios("http://127.0.0.1:3000/movie/all")).data
    /* 개발 환경(npm run dev)에서는 localhost:3000으로 작성하여도 문제는 없지만 배포환경(npm run start)에서는 localhost:3000으로 작성하면 문제가 발생한다. 
    이러한 문제가 발생하기 때문에 localhost:3000이 아닌 127.0.0.1:3000 으로 작성하여 서버에서 데이터를 호출한다.*/
return({props:{results}})
}

export default Main
