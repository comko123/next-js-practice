import axios from "axios"
import { GetStaticProps, NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

export interface movie {[key:string]:string|number|string[]|number[]}

const Main:NextPage<{results:movie[]}> = ({results}) => {
        return (<div className="grid grid-cols-5 my-3">
        {results.map((item:any)=>{
                return(<Link href={`/${item.id}`} key={item.id as string}>
                <Image width={3000} height={30} alt="" priority
                className="w-52 aspect-square my-2 shadow-xl rounded-xl mx-auto hover:scale-x-105 transition-transform cursor-pointer" 
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path as string}`}/>
                </Link>)})}</div>)
} 


export const getStaticProps:GetStaticProps = async() => {
        //항상 서버에서 실행되고 클라이언트에서는 실행되지 않는다.
        //빌드된 후 페이지 내부에 데이터가 바뀌더라도 페이지는 바뀌지 않는다. (정적 페이지(html)로 빌드되기 때문)
        //파일 안에서 getStaticProps라는 함수를 export 하는 경우 해당함수에서 반환된props를 사용하여 빌드시 페이지를 사전에 렌더링한다.
        const {results} = await(await axios(`http://127.0.0.1:3000/movie/all`)).data 
        return{props:{results}}
}

export default Main
