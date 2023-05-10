import { mongooseConnect } from "@/lib/mongoose"
import { Category } from "@/models/Category"

export default async function handle(req,res){
    const {method}=req
    await mongooseConnect()
    if(method=="POST"){
        const {name,parentCategory,properties}=req.body
        const categoryDoc=await Category.create({name,parent:parentCategory ||undefined,properties})
        res.json(categoryDoc);
    }
    if(method=="GET"){
        res.json(await Category.find().populate('parent'))

    }
    if(method=="PUT"){
        const {name,parentCategory,_id,properties}=req.body
        const categoryDoc=await Category.updateOne({_id},{name,parent:parentCategory||undefined,properties})
        res.json(categoryDoc);
    }
    if(method=="DELETE"){
        console.log(333)
        const {_id}=req.query
        console.log(_id)
        await  Category.deleteOne({_id:_id})
        res.json('deleted')
    
    }


}