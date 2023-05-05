import multiparty from 'multiparty'
import { initializeApp } from "firebase/app";
import{getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import fs from 'fs'

export default async function handle(req,res){
    const form=new multiparty.Form();

    // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMIGoLw5IRnQv7M3VstXEVd3TsJi1Sp1g",
    authDomain: "ecompfe-acfd9.firebaseapp.com",
    projectId: "ecompfe-acfd9",
    storageBucket: "ecompfe-acfd9.appspot.com",
    messagingSenderId: "1040530088087",
    appId: "1:1040530088087:web:10d9c630eb4e9090ac49d2"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage=getStorage(app)

    const {fields,files}=await new Promise((resolve,reject)=>{

        form.parse(req,(err,fields,files)=>{
            if(err) reject(err)
            resolve({fields,files})
            
    })

    })

    const imagesLinks=[]


    

    for(const file of files.file){
        //upload instructions for firebase storage

        console.log(file)
        const filePath=file.path
        const fileRef=ref(storage,filePath)
        console.log(filePath)
        const fileBuffer=fs.readFileSync(filePath)
        await uploadBytes(fileRef,fileBuffer)
        const downloadUrl = await getDownloadURL(fileRef);
        console.log(downloadUrl)
        imagesLinks.push(downloadUrl)
    }
    //console.log(files.file)

        
        return res.json({imagesLinks})

}
export const config={
    api:{bodyParser:false}
}