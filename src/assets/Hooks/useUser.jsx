import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {

  const axiosPublic =useAxiosPublic()

 
  const { refetch,data : users = []} = useQuery({
    queryKey: [ 'users' ],
    queryFn : async () =>{
      const res = await axiosPublic.get('/users')
      return res.data
    }
  })
  return [users ,refetch]
};

export default useUser;