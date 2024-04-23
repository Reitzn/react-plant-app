import React, { useEffect, useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "../../supabaseClient";
import { v4 as uuidv4 } from "uuid";

export default function ImageSection(props) {
  const { plant } = props;
  const BASE_URL =
    "https://wjrslwpltffisckzwtki.supabase.co/storage/v1/object/public/user_photos/" +
    plant?.user_id +
    "/" +
    plant?.id +
    "/";
  const [images, setImages] = useState([]);

  // To-Do: This logic should be moved to redux. I probably want to
  // keep a list of images in the plantDB and ref from that?
  useEffect(() => {
    if (plant?.user_id) {
      getImages();
    }
  }, [plant]);

  const getImages = async () => {
    const { data, error } = await supabase.storage
      .from("user_photos")
      .list(plant.user_id + "/" + plant.id + "/");
    setImages(data);
  };

  const handleImageChange = async (event) => {
    const newImage = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("user_photos")
      .upload(plant.user_id + "/" + plant.id + "/" + uuidv4(), newImage);

    getImages();
  };

  const handleDeleteImage = async (imageName) => {
    const { data, error } = await supabase.storage
      .from("user_photos")
      .remove(plant.user_id + "/" + plant.id + "/" + imageName);

    getImages();
  };

  return (
    <>
      <Box m={3} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
          <PhotoCamera />
        </IconButton>
      </Box>
      <ImageList cols={4}>
        {images?.map((item) => (
          <ImageListItem key={item.name}>
            <img
              srcSet={BASE_URL + item.name}
              src={BASE_URL + item.name}
              alt={"test"}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background: "none",
              }}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => handleDeleteImage(item.name)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
