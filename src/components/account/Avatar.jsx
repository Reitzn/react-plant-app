import React, { useState, useEffect } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { supabase } from "../../supabaseClient";
import { useSelector, useDispatch } from "react-redux";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Avatar() {
  const userSession = useSelector((state) => state.userSession);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (userSession?.user?.id) downloadImage(userSession.user.id);
  }, [userSession?.user?.id]);

  const handleUploadAvatar = async (event) => {
    const newImage = event.target.files[0];

    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(userSession?.user?.id, newImage, {
        upsert: true,
      });

    downloadImage(userSession.user.id);
  };

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  return (
    <Stack
      spacing={2}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <img alt="" width="150px" src={avatarUrl} />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload Profile Image
        <VisuallyHiddenInput type="file" onChange={handleUploadAvatar} />
      </Button>
    </Stack>
  );
}

export default Avatar;
