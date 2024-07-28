import { get, getDatabase, ref, remove } from "firebase/database";
import { useEffect, useState } from "react"
import app from "../firebase_config";
import Navbar from "./navbar";
import { Link, Outlet } from "react-router-dom";




export default function Update() {

    const [fruitArr, setFruitArr] = useState<Array<any>>([]);

    const fetchData = async () => {
        const db = getDatabase(app);
        const dbRef = ref(db, "nature/fruits");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const temp_data = Object.keys(data).map(id => { return { ...data[id], fruitId: id } })
            setFruitArr(temp_data);
        }
        else {
            alert("err");
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    const deleteData = async (id:any) =>{
        const db = getDatabase(app);
        const dbRef = ref(db, "nature/fruits/"+id);
        await remove(dbRef);
        fetchData();
    }

    return (
        <>
            <Navbar/>
            <button className="bg-neutral-300 border-[1px] px-3 py-1 m-2 border-neutral-400 rounded-full hover:bg-neutral-400/60 hover:text-green-800" onClick={fetchData}> Force Request Latest Data</button>
            <ol>
                {
                    fruitArr.map((item, i) => (
                        <li  key={i}>
                            
                            <Link to={"/update/"+item.fruitId} className=" border-[1px] border-neutral-500 h-[30px] w-[60px] m-2" >Update</Link>
                            <button className="border-[1px] border-neutral-500 h-[30px] w-[60px] m-2" onClick={()=>deleteData(item.fruitId)}>Delete</button>
                            {item.fruitName} {item.fruitAge} {item.fruitId}
                        </li>
                    ))
                }
            </ol>
            <Outlet/>
        </>
    )
}