import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import "./App.scss";

const App = () => {
  const [open, setOpen] = React.useState(false);
  const [{ alt, src, file }, setImg] = useState({
    src: "",
    alt: "your image",
    file: null,
  });
  const [haveImg, setHaveImg] = useState({
    open: false,
    src: "",
  });

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        src: URL.createObjectURL(e.target.files[0]),
        alt: e.target.files[0].name,
        file: e.target.files[0],
      });
      setOpen(true);
    }
  };

  const loadImg = () => {
    const formData = new FormData();
    formData.append("img", file);
    axios.post("http://localhost:7000/post", formData).then((res) => {
      setHaveImg({
        open: true,
        src: res.data + "",
      });
      console.log(res.data);
      handleClose();
      alert("Изображение загружено");
    });
  };

  const handleClose = () => {
    setImg({
      src: "",
      alt: "your image",
      file: null,
    });
    setOpen(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          accept="image/*"
          className="input"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => handleImg(e)}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Загрузить изображение
          </Button>
        </label>
      </header>
      {haveImg.open && (
        <div className="App-result">
          <span>Загруженное изображение</span>
          <img
            className="image-main"
            src={`${process.env.PUBLIC_URL}/images/${haveImg.src}`}
            alt="Загруженное изображение"
          />
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Загрузить изображение?
        </DialogTitle>
        <DialogContent>
          <img src={src} alt={alt}></img>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Отмена
          </Button>
          <Button onClick={() => loadImg()} color="primary" autoFocus>
            Загрузить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
