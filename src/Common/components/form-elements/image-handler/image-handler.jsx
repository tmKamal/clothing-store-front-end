import React,{useRef, useState, useEffect} from "react";
import Button from "../button";
import './image-handler.scss';

const ImageHandler =(props)=>{
    /* States to manage the image input */
    const[file,setFile]=useState();
    const[previewUrl,setPreviewUrl]=useState();
    const[isValid,setIsValid]=useState(false);


    const imagePickerRef=useRef();
    /* executess when the file state changes. */
    useEffect(()=>{
        if(!file){
            return;
        }
        /* in here we access the browser file reader API to get the image url */
        const fileReader=new FileReader();
        fileReader.onload=()=>{
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    },[file]);


    const imgHandler=()=>{
        imagePickerRef.current.click();
    }
    /* Triggers when the filePicker picks a file, file picker's onchange method */
    const pickedHandler=(event)=>{
        let pickedFile;
        let fileIsValid=isValid;
        if(event.target.files && event.target.files.length===1){
            pickedFile=event.target.files[0];
            setFile(pickedFile);
            setIsValid(true); 
            /* 
            This setIsvalid is take some time to update the state. 
            so when triggers the props.onInput statement, it might be still false. 
            Therefore we have to assigned this state  value to a normal varible to do the thing.
            let fileIsValid is the one.
            */
           fileIsValid=true;
        }else{
            setIsValid(false);
            fileIsValid=false;
        }
        props.onInput(props.id,pickedFile,fileIsValid)
    }
    return (
        <div className="form-control">
            {/* We have hide the default file picker, becase it is ugly 
                So but still want to access and use its click method to upload the images. 
                therefore we have use the useRef to get access to this hidden file picker's click method.
                using a useRef we can easily create a connection to the dom elements.            
            */}
            <input ref={imagePickerRef} id={props.id} type="file" onChange={pickedHandler} style={{display:'none'}} accept=".png,.jpeg,.jpg"></input>
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl &&<img src={previewUrl} alt="preview"></img>}
                    {!previewUrl &&<p>Choose a image.</p>}
                </div>
                    <Button type="button" onClick={imgHandler}>Choose Image</Button>
            </div>
            {!isValid &&<p>{props.errorText}</p>}
        </div>
    );
}
export default ImageHandler;