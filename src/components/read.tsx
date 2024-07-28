import { get, getDatabase, ref } from "firebase/database";
import { useState } from "react"
import app from "../firebase_config";
import Navbar from "./navbar";
import { RequestFile } from "../data/data";




export default function Read() {

    const [fruitArr, setFruitArr] = useState<Array<any>>([]);

    // const fetchData = async () => {
    //     const db = getDatabase(app);
    //     const dbRef = ref(db, "nature/fruits");
    //     const snapshot = await get(dbRef);
    //     if (snapshot.exists()){
    //         setFruitArr(Object.values(snapshot.val()));
    //     }
    //     else{
    //         alert("err");
    //     }
    // }
    const fetchData = async () => {
        setFruitArr(await RequestFile("nature/fruits", "values"));
        console.log(await RequestFile("nature/fruits", "entries"));

    }
    const fetchAll = async () => {
        const db = getDatabase(app);
        const snap = await get(ref(db, "/"));
        if (snap.exists()) {
            console.log(snap.val());
        }
    }
    return (
        <>
            <Navbar />
            <button className="bg-neutral-300 border-[1px] px-3 py-1 m-2 border-neutral-400 rounded-full hover:bg-neutral-400/60 hover:text-green-800" onClick={fetchData}> Display Data</button>
            <ul>
                {
                    fruitArr.map((item, i) => (
                        <li key={i}>
                            {item.fruitName}: {item.fruitAge}
                        </li>
                    ))
                }
            </ul>
            <button onClick={fetchAll}> fetch all </button>
        </>
    )
}