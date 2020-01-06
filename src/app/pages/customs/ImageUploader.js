import React, { useEffect, useState } from 'react';
import _ from "lodash"
import { useDispatch} from "react-redux"

const Thumb = (nextProps) => {
  const [loading, setLoading] = useState(false)
  const [thumb, setThumb] = useState(undefined)
  const dispatch = useDispatch();
  const { currentUser, values, filename, id } = nextProps;

  /**
   * This method returns the file converted from the object URL
   * @param {Object URL} dataurl 
   * @param {Name of the file} filename 
   */
  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  
  // This method called when the image has loaded
  const onLoadEnded = (reader) => {
    if (!id) {
      const name = currentUser && currentUser.file && (currentUser.file.name || filename);
      let currentEditedUser = {
        ...currentUser,
        ...values
      }
      currentEditedUser.file = { data: reader.result, name };
      dispatch(nextProps.actions.setCurrentUser(currentEditedUser));
    }
    setLoading(false)
    setThumb(reader.result)
  };
  
  useEffect(() => {
    setLoading(true)
    let reader = new FileReader();
    const name = currentUser && currentUser.file && (currentUser.file.name || filename);
    reader.onloadend = () => onLoadEnded(reader);
    if (nextProps.file) {
      if (!_.isObject(nextProps.file)) {
        const filename = name && name.split("\\");
        if (filename && !nextProps.file.includes("http://")) {
          const file = dataURLtoFile(nextProps.file, filename[filename.length - 1])
          reader.readAsDataURL(file);
        } else {
          setLoading(false)
          setThumb(nextProps.file);
        }
      } else {
        reader.readAsDataURL(nextProps.file);
      }
    }
  }, [values.file]);

  const { file } = nextProps;
  const name = currentUser && currentUser.file && (currentUser.file.name || filename);
  if (!file) { return null; }
  if (loading) { return <p>loading...</p>; }  
  return (<img src={thumb}
    alt={name}
    className="img-thumbnail mt-2"
    height={200}
    width={200} />);
  }

  export default Thumb;