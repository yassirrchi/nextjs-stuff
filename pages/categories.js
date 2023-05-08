import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

 function Categories({swal}){
    const[editedCategory,setEditedCategory]=useState(null)
    const [parentCategory,SetParentCategory]=useState('')
    const[categories,setCategories]=useState([])
     
    useEffect(()=>{
       fetchCategories()

    },[])

    function fetchCategories(){
         axios.get("/api/categories").then(result=>{
            setCategories(result.data) 

        })
    }
    function editCategory(category){

        
        setEditedCategory(category)
        setName(category.name)
        SetParentCategory(category?.parent?._id)



    }
      function  deleteCategory(category){
        swal.fire({
            title: `Sure you want to delete '${category.name}'`,
            text: `You confirm that ''${category.name}'' will be deleted forever`,
            showCancelButton:true,
            cancelButtonText:'Cancel',
            confirmButtonText:'Yes, Delete!',
            confirmButtonColor:'#d55'
             
        }).then(async result=>{
            console.log(1)
            
            if(result.isConfirmed){
                console.log(11)
               await axios.delete('/api/categories?_id='+category._id)
               fetchCategories()
            }
        }).catch(error=>{console.log(2)});

    }
    
    const [name,setName]=useState('')
    async function saveCategory(ev){
        const  data={name,parentCategory}
        ev.preventDefault()
        if(editedCategory){
            await axios.put('/api/categories',{...data,_id:editedCategory._id})
            setEditedCategory(null)

        }
        else{
            await axios.post('/api/categories',data)
        }



        
        setName('')
        fetchCategories()


    }
    return(
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory?`Edit ${editedCategory?.name} category`:`create category`}</label>
            <form onSubmit={saveCategory} className="flex gap-1">
            <div className="flex">
                <input type="text" className="mb-0" placeholder={"Category name"} value={name} onChange={ev=>setName(ev.target.value)}/>
                <select className="mb-0" value={parentCategory} onChange={ev=>SetParentCategory(ev.target.value)}>
                    <option value="">No parent category</option>
                    {categories.length>0&&categories.map(category=><option value={category._id}>{category.name}</option>)}

                     
                </select>
                <button type="submit" className="btn-save py-1">Save</button>

            </div>
            </form>
            <table className="basic mt-4">
                <thead>
                    <tr><td>Category name</td><td>Parent Category</td><td></td></tr>
                </thead>
                <tbody>
                    {categories.length>0&&categories.map(category=>(<tr><td>{category.name}</td><td>{category?.parent?.name}</td><td><div><button className="btn-save mr-1" onClick={()=>editCategory(category)}>Edit</button><button className="btn-save" onClick={()=>deleteCategory(category)}>Delete</button></div></td></tr>))}
                </tbody>
            </table>
            
        </Layout>
    )

}
export default withSwal(({swal}, ref) => {
     

    return (
        <Categories swal={swal}/>
    );
});
 