import { React, useState, useEffect } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Modal } from "./Modal";
import instance from "api/axios";
import { useUser } from "../context/UserContext";

export const Miners = () => {
  const [miners, setMiners] = useState([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedMiner, setSelectedMiner] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [minerToDelete, setMinerToDelete] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    instance
      .get("/hardware")
      .then((response) => {
        if (response.status === 200) {
          setMiners(response.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const openDeleteConfirmation = (miner) => {
    setMinerToDelete(miner);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setMinerToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const confirmDeleteMiner = () => {
    if (minerToDelete) {
      handleDeleteMiner(minerToDelete.id);
      closeDeleteConfirmation();
    }
  };
  const openCreateModal = () => {
    setCreateModalOpen(true);
    setSelectedMiner(null);
  };

  const closeCreateModal = () => {
    setCreateModalOpen(false);
  };

  const openEditModal = (miner) => {
    setSelectedMiner(miner);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleCreateMiner = (newMiner) => {
    console.log(newMiner, " new miner ...");
    instance
      .post("/miners", newMiner)
      .then((response) => {
        if (response.status === 201) {
          console.log("Created Miner:", response.data);
          setMiners([...miners, response.data]);
          closeCreateModal();
        }
      })
      .catch((error) => {
        console.error("Error creating miner:", error);
      });
  };

  const handleUpdateMiner = (updatedMiner) => {
    instance
      .put(`/miners/${updatedMiner.id}`, updatedMiner)
      .then((response) => {
        if (response.status === 200) {
          console.log("Updated Miner:", response.data);
          const updatedMiners = miners.map((miner) =>
            miner.id === updatedMiner.id ? response.data : miner
          );
          setMiners(updatedMiners);
          closeEditModal();
        }
      })
      .catch((error) => {
        console.error("Error updating miner:", error);
      });
  };

  const handleDeleteMiner = (id) => {
    instance
      .delete(`/miners/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Deleted Miner ", response.data);
          const updatedMiners = miners.filter((miner) => miner.id !== id);
          setMiners(updatedMiners);
        }
      })
      .catch((error) => {
        console.error("Error deleting miner:", error);
      });
  };

  if (miners.length) {
    return (
      <Container sx={{ paddingTop: "80px" }}>
        <Typography variant="h4">Miners</Typography>
        {user ? (
          <Button variant="outlined" color="primary" onClick={openCreateModal}>
            Create Miner
          </Button>
        ) : null}

        <List>
          {miners.map((miner) => {
            return (
              <ListItem key={miner.id}>
                <ListItemText
                  primary={miner.name}
                  secondary={`Location: ${miner.location}, Hashrate: ${miner.hashrate}`}
                />
                {user ? (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditModal(miner)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => openDeleteConfirmation(miner)}
                    >
                      Delete
                    </Button>
                  </>
                ) : null}
              </ListItem>
            );
          })}
        </List>
        <Modal
          open={isCreateModalOpen}
          onClose={closeCreateModal}
          onSave={handleCreateMiner}
          title="Create Miner"
          initialData={{ name: "", location: "", hashrate: "" }}
        />
        <Modal
          open={isEditModalOpen}
          onClose={closeEditModal}
          onSave={handleUpdateMiner}
          title="Edit Miner"
          initialData={selectedMiner}
        />
        <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmation}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the miner: {minerToDelete?.name}?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteConfirmation} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDeleteMiner} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  } else {
    return "Loading ...";
  }
};
