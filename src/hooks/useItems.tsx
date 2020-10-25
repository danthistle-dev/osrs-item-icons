import axios from "axios"
import useSWR from "swr"

const fetcher = (url:string) => axios.get(url).then(res => res.data)

export const useItems = (page:number, maxResults:number) => {
  const { data, error } = useSWR(`https://api.osrsbox.com/items?page=${page}&max_results=${maxResults}`, fetcher)

  return {
    items: data,
    isLoading: !error && !data,
    isError: error
  }
}