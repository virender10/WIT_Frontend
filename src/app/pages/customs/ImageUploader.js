import React, { useEffect, useState } from 'react';
import _ from "lodash"
import { useDispatch} from "react-redux"

const Thumb = (nextProps) => {
  const [loading, setLoading] = useState(false)
  const [thumb, setThumb] = useState(undefined)
  const dispatch = useDispatch();
  const { values, filename, id, file, currentInProgress, callAction } = nextProps;

  /**
   * This method returns the file converted from the object URL
   * @param {Object URL} dataurl 
   * @param {Name of the file} filename 
   */
  const dataURLtoFile = (dataurl, filename) => {
    if (dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
  };
  
  // This method called when the image has loaded
  const onLoadEnded = (reader) => {
    if (!id) {
      const name = currentInProgress && currentInProgress.file && (currentInProgress.file.name || filename);
      let currentEdited = {
        ...currentInProgress,
        ...values
      }
      currentEdited.file = { data: reader.result, name };

      callAction(currentEdited);
    }
    setLoading(false)
    setThumb(reader.result)
  };
  
  useEffect(() => {
    setLoading(true)
    let reader = new FileReader();
    const name = currentInProgress && currentInProgress.file && (currentInProgress.file.name || filename);
    reader.onloadend = () => onLoadEnded(reader);
    if (file) {
      if (!_.isObject(file)) {
        const filename = name && name.split("\\");
        if (filename && !file.includes("http://") && !file.includes("base64")) {
          const file = dataURLtoFile(file, filename[filename.length - 1])
          file && reader.readAsDataURL(file);
        } else {
          setLoading(false);
          setThumb(file)
        }
      } else {
        reader.readAsDataURL(file);
      }
    }
  }, [file]);
  const name = currentInProgress && currentInProgress.file && (currentInProgress.file.name || filename);
  if (!file) { return null; }
  if (loading) { return <p>loading...</p>; }  
  return (<img src={thumb}
    alt={name}
    className="img-thumbnail mt-2"
    height={200}
    width={200} />);
  }

  export default Thumb;