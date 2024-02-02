import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firbase";
import { updateUserFilure,updateUserSucess,updateUserStart ,deleteUserFilure,deleteUserStart,deleteUserSucess} from "../redux/user/userSlice";

function Profile() {
  const fileRef = useRef(null);
  const  {currentUser,loading,error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileUploadError, setFileUploaderror] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const dispatch=useDispatch();
  console.log(fileperc);
  console.log(file);
  console.log(formData);
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);


  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileperc(Math.round(progress));
      },

      (error) => {
        setFileUploaderror(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handelChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

 const handelSubmit=async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res=await fetch(`/api/user/update/${currentUser._id}`,
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    console.log(data);
    if(data.success===false){
      dispatch(updateUserFilure(data.message))
    }
    dispatch(updateUserSucess(data));
    setUpdateSuccess(true);
  } catch (error) {
    dispatch(updateUserFilure(error.message))
  }
 }
 const handleDelete=async()=>{
   try {
    dispatch(deleteUserStart());
    const res=await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
    })
    const data=await res.json();
    if(data.success===false){
      dispatch(deleteUserFilure(data.message))
      return ;
    }
    dispatch(deleteUserSucess(data));
   } catch (error) {
    dispatch(deleteUserFilure(error.message))
   }
 }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handelSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 "
          src={formData.avatar||currentUser.avatar}
          alt="profile"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error Image upload(image must be less than 2mb)</span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-slate-700">{`uploading ${fileperc}%`}</span>
          ) : fileperc === 100 ? (
            <span className="text-green-700">Image suceesfullly uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          defaultValue={currentUser.username}
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handelChange}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handelChange}
        />
        <input
          type="password"
          onChange={handelChange}
          placeholder="password"
          className="border p-3 rounded-lg"
          id="passsword"
        />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
         {loading?'loading...':'update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer ">Delete account</span>
        <span className="text-red-700 cursor-pointer ">Sign out</span>
      </div>
      <p className="text-red-700 mt-3">{error?error:''}</p>
      <p className="text-green-700 mt-3">{updateSuccess?' user is updated successfully':''}</p>
    </div>
  );
}

export default Profile;
