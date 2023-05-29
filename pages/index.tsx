import axios from "axios"
import { GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"

export interface movie {[key:string]:string|number|string[]|number[]}

const Main:NextPage<{results:movie[]}> = ({results}) => {
        const {push} = useRouter()
        return (<div className="grid grid-cols-5 my-3">
        {results.map((item)=>{
                return(<div onClick={()=>push(`/${item.id}`)} key={item.id as string}>
                {/* onClick대신 Link를 사용하는 방법이있는데 Link를 사용하면 SSG처럼 모든detail페이지 (20개)가 
                메인페이지를 방문하면 미리 생겨버린다. 
                아마 next-js에서 제공하는 Link가 다른 detail페이지들과 연동이 되어 있는것같다.
                그로인해 위와같은 현상이 발생하는것 같다. 
                */}
                <Image width={300} height={300} alt="" priority
                className="w-52 aspect-square my-2 shadow-xl rounded-xl mx-auto hover:scale-x-105 transition-transform cursor-pointer" 
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path as string}`}/>
                </div>)})}</div>)
} 


export const getStaticProps:GetStaticProps = async() => {
        //항상 서버에서 실행되고 클라이언트에서는 실행되지 않는다.
        //빌드된 후 페이지 내부에 데이터가 바뀌더라도 페이지는 바뀌지 않는다. (정적 페이지(html)로 빌드되기 때문)
        //파일 안에서 getStaticProps라는 함수를 export 하는 경우 해당함수에서 반환된props를 사용하여 빌드시 페이지를 사전에 렌더링한다.
        const {results} = await(await axios(`http://127.0.0.1:3000/movie/all`)).data 
        return{props:{results},revalidate:20}
}

export default Main
