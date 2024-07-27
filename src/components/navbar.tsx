import {  NavLink } from "react-router-dom";



export default function Navbar(){
    const Pages = ["","update","read","write"];

    return (
        <div className="flex flex-row gap-2  bg-neutral-300 p-2 m-2 rounded-md">
            {
                Pages.map((e,i)=>{
                    return (
                        <NavLink 
                        key={i} 
                        to={"/"+e} 
                        className={(({isActive})=>isActive?"text-green-500":"text-black") }>
                            {(e=="")?"Home":e}
                        </NavLink>
                    )
                })
            }
        </div>
    )
}