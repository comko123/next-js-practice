import axios from "axios"
import { movie } from "."
import Image from "next/image"
import useSWR,{ SWRConfig } from "swr"
import { useRouter } from "next/router"
import { GetServerSideProps, NextPage } from "next"

const DetailRender:NextPage = () => {
    const {query:{id},replace} = useRouter()
    const {data} = useSWR(`/movie/${id}`)
    return(<>{data?<div className="grid grid-cols-2 gap-3 m-3 ">
    <Image width={300} height={300} alt=""  priority
    src={`https://image.tmdb.org/t/p/w500/${data.backdrop_path as string}`}
    className="h-[95vh] aspect-square rounded-2xl cursor-pointer"/>
    
    <div>
        <h1 className="text-center font-bold text-xl pb-5 mb-5 border-b-2 border-b-black">{data.title}</h1>
        <div className="flex justify-end mr-5 font-bold text-md"> adult : {JSON.stringify(data.adult)}</div>
        <div className="flex justify-end mr-5 font-bold text-md pb-5 mb-5 border-b-2 border-b-black"> popularity : {Math.ceil(data.popularity)}</div>
        <span className="font-bold text-2xl">overview : </span>
        <span className=" mr-5 font-bold text-md text-justify">{data.overview} </span>
        <div className="flex w-full h-[40vh] items-center justify-center">
            <button className="bg-orange-500 p-1 rounded-lg text-white hover:bg-orange-600"
            onClick = {()=>replace('/')}>home</button></div>
    </div>
    
    </div>:"loading..."}</>)
}

const Detail:NextPage<movie> = ({data,detailLink}) => {
    //key url을 동적으로 생성하여 영화 디테일 페이지에 접속 할때마다 해당 url의 캐시를 채워준다.
return(<SWRConfig value={{fallback:{[detailLink as string]:data}}}>
    <DetailRender/>
</SWRConfig>)
}

export const getServerSideProps:GetServerSideProps = async({params}) => {
    //영화마다 id값이 다르기 때문에 key url을 동적으로 생성하기 위해 링크도 같이 넘긴다.
const detailLink = `/movie/${params?.id}`
const data = await(await axios(`http://127.0.0.1:3000/movie/${params?.id}`)).data
    return({props:{data,detailLink}})
}

export default Detail
