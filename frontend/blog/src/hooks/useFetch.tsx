import { useEffect, useState } from "react"


interface IData {
    status:string
    message:string
    data?: {
        id?:string
        title?:string
    }[]
}


const useFetch = (url:string,options?:object) => {
    const [data,setData] = useState<IData >({} as IData)
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url,options)
                const data = await response.json();
                if(response.ok) {
                    setData(data);
                    setIsLoading(false);
                    return
                }

                if(!response.ok) {
                    setError(true);
                }

            } catch (error:unknown) {
                console.log(error)
                setError(true)
            }
        })()
    },[url,options])
    return {data,isLoading,error};
}

export default useFetch;