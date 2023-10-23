import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
export const Modal = ({ open, onClose, onSave, title, initialData }) => {
  const [miner, setMiner] = useState({ name: "", location: "", hashrate: "" });
  useEffect(() => {
    setMiner(initialData || { name: "", location: "", hashrate: "" });
  }, [initialData]);
  const handleSave = () => {
    onSave(miner);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter Miner Details:</DialogContentText>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={miner.name}
          onChange={(e) => {
            setMiner({ ...miner, name: e.target.value });
          }}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={miner.location}
          onChange={(e) => setMiner({ ...miner, location: e.target.value })}
        />
        <TextField
          label="Hashrate"
          variant="outlined"
          fullWidth
          value={miner.hashrate}
          onChange={(e) => setMiner({ ...miner, hashrate: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
