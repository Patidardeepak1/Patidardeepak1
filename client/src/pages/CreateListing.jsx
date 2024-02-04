import  { useState } from "react";
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import {app} from '../firbase'
//import { UseSelector } from "react-redux";
export default function CreateListing() {
  const [files,setFile]=useState([]);
  const [formData,setFormData]=useState({
    imageUrls:[],
  });
 const [imageUploaderror,setimageuploaderror]=useState(false);
 const [uploading,setuploading]=useState(false);
console.log(formData);

  const handelImageSubmit=(e)=>{
    
      if(files.length>0 && files.length+formData.imageUrls.length<7){
          const promises=[];
          
          for(let i=0;i<files.length;i++){
            setuploading(true);
            setimageuploaderror(false);
            promises.push(storageImage(files[i]));
          }
         
          Promise.all(promises).then((urls)=>{
            setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
            setimageuploaderror(false);
            setuploading(false);
          }).catch((err)=>{
            setimageuploaderror('Image upload failed (2 mb max per image')
            setuploading(false);
          })
      }
      else{
        setimageuploaderror("you can upload 6 images per listing ")
      }
  };


  const storageImage=async(file)=>{
    console.log("start");
    return new Promise((resolve,reject)=>{
      console.log("start3");
      const storage=getStorage(app);
      const fileName=new Date().getTime()+file.name;
      const storageRef=ref(storage,fileName);
      const uploadTask=uploadBytesResumable(storageRef,file)
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          console.log(progress);
        },
        (error)=>{
          reject(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL);
          });
        }
      )
    });
  }
  const handelremoveImage=(index)=>{
    setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>i!==index),
    });
  }



  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex  gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="beedroom"
                min="1"
                max="10"
                required
                className="p-3  border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathroom"
                min="1"
                max="10"
                required
                className="p-3  border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularprice"
                min="1"
                max="10"
                required
                className="p-3  border-gray-300 rounded-lg"
              />
              <div className="flex flex-col">
                <p>Regular Price</p>
                <span className="text-xs">($ / months)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountprice"
                min="1"
                max="10"
                required
                className="p-3  border-gray-300 rounded-lg"
              />
              <div className="flex flex-col">
                <p>Discount Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="image"
              accept="image/*"
              multiple
              onChange={(e)=>setFile(e.target.files)}
            />
            <button disabled={uploading} type="button" onClick={handelImageSubmit} className="p-3 text-green-700 border border-green-700  rounded uppercase hover:shadow-lg disabled:opacity-80">
              {uploading ?'Uploading':'Upload'}
            </button>
          </div>
          
          <p className="text-red-700 text-sm">{imageUploaderror&&imageUploaderror}</p>
          {
            formData.imageUrls.length>0&&formData.imageUrls.map((url,index)=>(
             <div key={url} className="flex justify-between p-3 items-center">
               <img src={url} alt="listing image"  className="w-20 h-20 object-contain rounded-lg"/>
               <button type="button" onClick={()=>handelremoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
             </div>
            ))
          }
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Create listing
          </button>
        </div>
       
      </form>
    </main>
  );
}
