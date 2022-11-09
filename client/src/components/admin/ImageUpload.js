import React, { useState, useRef } from "react";
import visualArtDatabase from "../../services/visualArtDatabase";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ImageUpload({ rightUser }) {
  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });
  const [validated, setValidated] = useState(false);
  const [invalidImage, setinvalidImage] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageText, setImageText] = useState("");

  const form = useRef();

  const handleImageTitle = (e) => {
    setImageTitle(e.target.value);
  };

  const handleImageText = (e) => {
    setImageText(e.target.value);
  };

  // TODO: poista seuraava funktio, ei tee tarkkoja kuvia!
  // let reader = new FileReader();

  // const handleInputChange = (event) => {
  //   const imageFile = event.target.files[0];
  //   const imageFilname = event.target.files[0].name;

  //   if (!imageFile) {
  //     setinvalidImage("Valitse kuva.");
  //     return false;
  //   }

  //   if (!imageFile.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|gif)$/)) {
  //     setinvalidImage("Valitse validi kuva muotoa: JPG,JPEG,PNG");
  //     return false;
  //   }

  //   reader.onload = (e) => {
  //     const img = new Image();
  //     img.onload = () => {
  //       // resize the image
  //       var canvas = document.createElement("canvas");
  //       var ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);

  //       var MAX_WIDTH = 200;
  //       var MAX_HEIGHT = 200;
  //       var width = img.width;
  //       var height = img.height;

  //       if (width > height) {
  //         if (width > MAX_WIDTH) {
  //           height *= MAX_WIDTH / width;
  //           width = MAX_WIDTH;
  //         }
  //       } else {
  //         if (height > MAX_HEIGHT) {
  //           width *= MAX_HEIGHT / height;
  //           height = MAX_HEIGHT;
  //         }
  //       }
  //       canvas.width = width;
  //       canvas.height = height;
  //       // var ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0, width, height);
  //       ctx.canvas.toBlob(
  //         (blob) => {
  //           const file = new File([blob], imageFilname, {
  //             type: "image/jpeg",
  //             lastModified: Date.now(),
  //           });

  //           setuserInfo({
  //             ...userInfo,
  //             file: file,
  //             filepreview: URL.createObjectURL(imageFile),
  //           });
  //         },
  //         "image/jpeg",
  //         1
  //       );

  //       setinvalidImage(null);
  //     };

  //     img.onerror = () => {
  //       setinvalidImage("Epävalidi kuva valittu.");
  //       return false;
  //     };
  //     img.src = e.target.result;
  //   };

  //   reader.readAsDataURL(imageFile);
  // };

  const handleInputChange = (event) => {
    console.log(event.target.files[0], "testi_1");
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  };

  const [isSuccess, setSuccess] = useState(null);
  const submit = async () => {
    visualArtDatabase.validateToken(rightUser.token).then((result) => {
      if (result.success === 1) {
        const formdata = new FormData();
        formdata.append("avatar", userInfo.file);
        formdata.append("name", imageTitle);
        formdata.append("text", imageText);

        visualArtDatabase
          .createTableInfo(formdata, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.success === 1) {
              setSuccess("Kuva ladattu onnistuneesti");

              setImageTitle("");
              setImageText("");
            }
          });
      }
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    setValidated(true);
  };

  return (
    <Form ref={form} noValidate validated={validated} onSubmit={handleSubmit}>
      {isSuccess !== null ? <h4> {isSuccess} </h4> : null}
      {invalidImage !== null ? (
        <h4 className="error"> {invalidImage} </h4>
      ) : null}
      <Form.Group className="mb-3">
        <Form.Label>Valitse kuva:</Form.Label>
        <Form.Control
          required
          type="file"
          className="form-control"
          name="upload_file"
          onChange={handleInputChange}
        />
        <Form.Control.Feedback type="invalid">
          Valitse kuva.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label> Taulun otsikko:</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="otsikko"
          value={imageTitle}
          onChange={handleImageTitle}
        />
        <Form.Control.Feedback type="invalid">
          Kirjoita otsikko.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label> Taulun teksti:</Form.Label>
        <Form.Control
          required
          as="textarea"
          row={3}
          value={imageText}
          onChange={handleImageText}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          Kirjoita kuvaava teksti taulusta.
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" onClick={() => submit()}>
        Lähetä
      </Button>

      {userInfo.filepreview !== null ? (
        <img
          id="test_kuva"
          className="previewimg"
          src={userInfo.filepreview}
          alt="UploadImage"
        />
      ) : null}
    </Form>
  );
}
export default ImageUpload;
