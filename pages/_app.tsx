import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SWRConfig} from "swr" 
import axios from "axios"
export default function App({ Component, pageProps }: AppProps) {
  return(<SWRConfig value={{fetcher:async(url)=>await(await axios(url)).data}}>
<Component {...pageProps} />
  </SWRConfig>) 
}
