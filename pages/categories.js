import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from 'react-sweetalert2';

 function Categories({swal}){
    const[editedCategory,setEditedCategory]=useState(null)
    const [parentCategory,SetParentCategory]=useState('')
    const[categories,setCategories]=useState([])
    const [properties,setProperties]=useState([])
     
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
    function handlePropertyNameChange(index,property,newName){
        setProperties(prev=>{
            const properties=[...prev]
            properties[index].name=newName
            return properties

        })

    }
    function handlePropertyValueChange(index,property,newValues){
        setProperties(prev=>{
            const properties=[...prev]
            properties[index].values=newValues
            return properties

        })

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
    function addProperty(){
        setProperties(prev=>{
            return [...prev,{name:'',values:''}]
        })
    }
    function removeProperty(indexToRemove){
        setProperties(prev=>{
            return [...prev].filter((p,pIndex)=>{
                 return pIndex!==indexToRemove
            })
        })
    }
    return(
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory?`Edit ${editedCategory?.name} category`:`create category`}</label>
            <form onSubmit={saveCategory}  >
                <div className="flex gap-1">
                 
                <input type="text"   placeholder={"Category name"} value={name} onChange={ev=>setName(ev.target.value)}/>
                <select  value={parentCategory} onChange={ev=>SetParentCategory(ev.target.value)}>
                    <option value="">No parent category</option>
                    {categories.length>0&&categories.map(category=><option value={category._id}>{category.name}</option>)}

                     
                </select>   

                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button type="button" onClick={addProperty} className="btn-default text-sm  mb-2" >Add new Property</button>
                    {properties.length>0 && properties.map((property,index)=>(
                        <div className="flex gap-1 mb-2">
                            <input className="mb-0" value={property.name} onChange={(ev)=>handlePropertyNameChange(index,property,ev.target.value)} type="text" placeholder="Property name"/>
                            <input className="mb-0" value={property.values} onChange={(ev)=>{handlePropertyValueChange(index,property,ev.target.value)}} type="text" placeholder="values, comma seperated" />
                            <button type="button" onClick={()=>removeProperty(index)} className="btn-default">Remove</button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                    {editedCategory &&<button type="button" 
                    onClick={()=>{
                    setEditedCategory(null)
                    setName('')
                    SetParentCategory('')
                    }} className="btn-default py-1">Cancel</button>}

                

             
                <button type="submit" className="btn-save py-1">Save</button>

                </div>
                

             
            </form>
            {!editedCategory &&<table className="basic mt-4">
                <thead>
                    <tr><td>Category name</td><td>Parent Category</td><td></td></tr>
                </thead>
                <tbody>
                    {categories.length>0&&categories.map(category=>(<tr><td>{category.name}</td><td>{category?.parent?.name}</td><td><div><button className="btn-save mr-1" onClick={()=>editCategory(category)}>Edit</button><button className="btn-save" onClick={()=>deleteCategory(category)}>Delete</button></div></td></tr>))}
                </tbody>
            </table> }
            
            
        </Layout>
    )

}
export default withSwal(({swal}, ref) => {
     

    return (
        <Categories swal={swal}/>
    );
});
 