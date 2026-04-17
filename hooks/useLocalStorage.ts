import { storage } from "@/utils/MMKVConfig";


export default function useLocalStorage() {
   
    const getItem = (id :  string) => {
        storage.getString(id)
    }

    const setItem = (id:  string, value : number | string | boolean ) => {
        storage.set(id, value)
    }
}