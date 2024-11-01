import { useEffect, useState } from "react"

export const useFetch = (fetchFunction, params)=>{
  const [data, setData] = useState(null)
  const [isLoading, setIsloading] = useState(true)
  const [error, setError] = useState(null)

  const stringParams = params ? new URLSearchParams(params).toString() : ''
  useEffect(()=>{
    (async () =>{
      try {
        setIsloading(true)
        const result = await fetchFunction(params)
        setData(result)
      } catch (error) {
        setError(error)
      }finally{
      setIsloading(false)
      }
    })()
  }, [fetchFunction,stringParams])

  return {data,isLoading,error}
}