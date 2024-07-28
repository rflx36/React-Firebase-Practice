import { get, getDatabase, ref } from "firebase/database";
import app from "../firebase_config";



export async function RequestFile(location: string, requestType: "keys" | "values" | "entries") {
    const db = getDatabase(app);
    const db_reference = ref(db, location);
    const snapshot = await get(db_reference);

    const requestActions = {
        keys: Object.keys,
        values: Object.values,
        entries: Object.entries
    }
    const action = requestActions[requestType];
    return action((snapshot.exists()) ? snapshot.val() : "error");
   
}