import { get, getDatabase, ref } from "firebase/database";
import { useState } from "react"
import app from "../firebase_config";
import Navbar from "./navbar";




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
    return (
        <>
            <Navbar/>
            <button className="bg-neutral-300 border-[1px] px-3 py-1 m-2 border-neutral-400 rounded-full hover:bg-neutral-400/60 hover:text-green-800" onClick={fetchData}> Display Data</button>
            <ul>
                {
                    fruitArr.map((item, i) => (
                        <li key={i}>
                            {item.fruitName}: {item.fruitAge}:{item.fruitId}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}