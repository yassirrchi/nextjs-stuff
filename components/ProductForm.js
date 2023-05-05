import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { Router, useRouter } from "next/router";
import { useState } from "react";
import Layout from "@/components/Layout";
export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages,
     
}){
    const [title,setTitle]=useState(''||existingTitle);
    const [description,setdescription]=useState(''||existingDescription);
    const [price,setPrice]=useState(''||existingPrice);
    const [images,setImages]=useState(existingImages||[])
    const [isUploading,setIsUploading]=useState(false)
    const [goToProducts,setGoToProducts]=useState(false);
    const router=useRouter()
    async function saveProduct(e){

        e.preventDefault()
        const data={title,description,price,images}
        if(_id){
            //update
            await axios.put('/api/products',{...data,_id})
        }
        else{
            //craete
            
       await axios.post('/api/products',data)
       
        }
         setGoToProducts(true)
        

    }
    if(goToProducts){
         router.push('/products')
    }


    async function uploadImages(ev){
        const files=ev.target?.files;
        if(files?.length>0){
            const data=new FormData()
            for(const file of files){
                data.append('file',file)
            }
             
             const res=await axios.post("/api/upload",data)
             //console.log(res.data)
             setImages(oldImages=>{
                return[...oldImages,...res.data.imagesLinks]
             })

             
        }

    }


    return (<div>
    
        <h1 className="text-blue-900 mb-2 text-xl">New Product</h1>
        <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input type="text" placeholder="product name"value={title} onChange={ev=>setTitle(ev.target.value)} />
        <label>Images</label>

        <div className="mb-2 flex flex-wrap gap-2">
             {images?.length>0&&images.map(img=><div key={img} className="h-24"><img src={img} className="rounded-lg"/></div>)}
            {isUploading&&(<div className="h-24">...uploading</div>)}
            <label className="w-24 h-24 border flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
Upload<input onChange={uploadImages} type="file" className="hidden"/></label>
             
        </div>

        <label>Product description</label>
        <textarea placeholder="product description" value={description} onChange={ev=>setdescription(ev.target.value)}></textarea>
        <label>Product price(in usd)</label>
        <input type="number" value={price} onChange={ev=>setPrice(ev.target.value)} placeholder="price"/>
        <button type="submit" className="btn-save">Save</button>
        </form>


     </div>);

}