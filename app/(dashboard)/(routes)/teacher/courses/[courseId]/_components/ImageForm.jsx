"use client"
import * as z from "zod";
import axios from "axios";

import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import Image from "next/image";








export default function ImageForm({initialData , courseId}) {
    
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();


  async function onSubmit(values){
    
    try {
      console.log(values);

      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success("Course image updated");
      setIsEditing((e)=>!e)
      router.refresh();
    } catch  {
      toast.error("something was wrong !");
    }
  }



    return (
    <div className="mt-6 border  bg-slate-100 rounded-md p-4">
      <div className="font-medium flex   justify-between items-center">
          Course image
          <Button onClick={()=>setIsEditing((e)=>!e)} variant="ghost">
            {isEditing && (
              <>
                Cancel
              </>
            )}

            {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
            )}

            {!isEditing && initialData.imageUrl && (
              <>
                 <Pencil className="h-4 w-4 mr-2"/>
                 Edit image
              </>
            )}


          </Button>
      </div>
      {!isEditing &&(
          !initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
              <ImageIcon className="h-10 w-10 text-slate-500" />
            </div>
          ) : (
            <div className="relative aspect-video mt-2 ">
              <Image
                alt="Upload"
                fill
                className="object-cover rounded-md"
                src={initialData.imageUrl}
              />
            </div>
          )
      )}
      {isEditing &&(
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url)=>{
              if(url){
                onSubmit({imageUrl:url})
              }
            }}

          />
          <div className="text-xs text-muted-foreground mt-6   ">
              16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  )
}
