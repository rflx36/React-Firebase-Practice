
import { useEffect, useState } from "react"
import Input from "../components/input"
import { getDatabase, ref, set, get } from "firebase/database";
import app from "../firebase_config";
import { useParams } from "react-router-dom";


export default function UpdateWrite() {
    const { firebaseID } = useParams();
    const [age, setAge] = useState(0);
    const [name, setName] = useState("");


    useEffect(() => {

        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, "nature/fruits/" + firebaseID);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                const targetObject = snapshot.val();
                setAge(targetObject.fruitAge);
                setName(targetObject.fruitName);
            }
            else {
                alert("err");
            }
        }
        fetchData();

    }, [firebaseID]);

    const overwriteData = async () => {
        const db = getDatabase(app);
        const newDocRef = ref(db, "nature/fruits/" + firebaseID);
        set(newDocRef, {
            fruitName: name,
            fruitAge: age
        }).then(() => {
            alert("data saved successfully");
        }).catch((err) => {
            alert("error" + err.message);
        })
    }

    return (
        <>

            <div className="flex flex-col w-80 h-fit m-2 bg-gray-100 rounded-2xl border-neutral-300 border-[1px] px-4">
                
                    <Input name="age" value={age} uponChange={x => setAge(x)}  type="number"/>
                    <Input name="name" value={name} uponChange={x => setName(x)}  type="text"/>
             

                <button onClick={overwriteData}>Save</button>
            </div>
        </>
    )

}