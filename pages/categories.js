import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories(){
    const[categories,setCategories]=useState([])
     
    useEffect(()=>{
       fetchCategories()

    },[])

    function fetchCategories(){
         axios.get("/api/categories").then(result=>{
            setCategories(result.data) 

        })
    }
    
    const [name,setName]=useState('')
    async function saveCategory(ev){
        ev.preventDefault()
        await axios.post('/api/categories',{name})
        setName('')
        fetchCategories()


    }
    return(
        <Layout>
            <h1>Categories</h1>
            <label>New category name</label>
            <form onSubmit={saveCategory} className="flex gap-1">
            <div className="flex">
                <input type="text" className="mb-0" placeholder={"Category name"} value={name} onChange={ev=>setName(ev.target.value)}/>
                <button type="submit" className="btn-save py-1">Save</button>

            </div>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr><td>Category name</td></tr>
                </thead>
                <tbody>
                    {categories.length>0&&categories.map(category=>(<tr><td>{category.name}</td></tr>))}
                </tbody>
            </table>
            
        </Layout>
    )

}