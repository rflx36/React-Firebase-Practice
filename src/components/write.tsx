
import { useState } from "react"
import Input from "../components/input"
import { getDatabase, ref, set, push } from "firebase/database";
import app from "../firebase_config";
import Navbar from "./navbar";


export default function Write() {
    const [age, setAge] = useState(0);
    const [name, setName] = useState("");


    const SaveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "nature/fruits"));
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
            <Navbar/>
            <div className="">
                <Input name="age" value={age} uponChange={x => setAge(x)} type="number"/>
                <Input name="name" value={name} uponChange={x => setName(x)}  type="text"/>
                <button onClick={SaveData}>Save</button>
            </div>
        </>
    )
    
}