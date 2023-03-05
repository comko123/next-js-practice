import axios from "axios"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { movie } from "."

const Detail:NextPage<{data:movie}> = ({data}) => {
    const {replace} = useRouter()
    return<>{data?<div className="grid grid-cols-2 gap-3 m-3 ">
    <Image width={3000} height={30} alt=""  priority
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
      fallback: "blocking",
    };
  };

export const getStaticProps:GetStaticProps = async({params}) => {
    await new Promise((resolve) => setTimeout(resolve, 10000))
    const data = await(await axios(`http://localhost:3000/movie/${params?.id}`)).data
    return({props:{data}})
}

export default Detail