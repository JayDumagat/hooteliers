import { useEffect, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import Table from "../components/Table";
import Layout from "../layouts/Layout";
import ReusableDialog from "../components/ReusableDialog";
import AddCardForm from "../components/AddIoTCardForm";
import EditCardForm from "../components/EditIoTCardForm";
import ConfirmationForm from "../components/ConfirmationForm";
import useCardStore from "../stores/useIoTCardStore";
import useRoomStore from "../stores/useRoomStore";

export default function CardManagement() {
  const [dialogType, setDialogType] = useState(null);
  const { cards, fetchCards, deleteCard } = useCardStore();
  const { rooms, fetchRooms } = useRoomStore();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchCards();
    fetchRooms();
  }, [fetchCards, fetchRooms]);

  function handleOpenDialog(type) {
    setDialogType(type);
  }

  function handleCloseDialog() {
    setDialogType(null);
    setSelectedItem(null);
  }

  const headerColumns = [
    {
      key: "nickname",
      label: "Nickname",
      render: (item) => (
        <p className="font-semibold text-sm text-gray-800 dark:text-white">
          {item.nickname}
        </p>
      ),
    },
    {
      key: "cardSerial",
      label: "Card Serial",
      render: (item) => (
        <p className="text-sm text-gray-700 dark:text-white">
          {item.cardSerial}
        </p>
      ),
    },
    {
      key: "roomId",
      label: "Room",
      render: (item) => {
        const room = rooms.find((r) => r.id === item.roomId);
        return (
          <p className="text-sm text-gray-700 dark:text-white">
            {room?.roomNumber || "N/A"}
          </p>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusBadge status={item.status} />,
    },
  ];

  const filterBy = [
    {
      key: "status",
      label: "Status",
      options: ["all", "active", "inactive"],
      getValue: (item) => item.status,
    },
  ];

  const handleOpenDialogOption = (type, item) => {
    setDialogType(type);
    setSelectedItem(item);
  };

  const handleDeleteCard = () => {
    if (selectedItem) {
      deleteCard(selectedItem.id)
        .then(fetchCards)
        .catch((error) => console.error("Error deleting card:", error))
        .finally(handleCloseDialog);
    }
  };

  return (
    <Layout>
      <Table
        headerTitle="Card Management"
        headerDescription="Manage all room access cards in the hotel."
        primaryButtonText="Add Card"
        primaryOnClick={() => handleOpenDialog("add")}
        headerColumns={headerColumns}
        data={cards}
        filterBy={filterBy}
        filterLabel="Status"
        tableActions={[
          {
            label: "Edit",
            onClick: (item) => handleOpenDialogOption("edit", item),
          },
          {
            label: "Delete",
            onClick: (item) => handleOpenDialogOption("delete", item),
          },
        ]}
        customSearchFn={(item, lowerSearch) => {
          const room = rooms.find((r) => r.id === item.roomId);
          return (
            item.nickname?.toLowerCase().includes(lowerSearch) ||
            item.cardSerial?.toLowerCase().includes(lowerSearch) ||
            room?.roomNumber?.toLowerCase().includes(lowerSearch)
          );
        }}
      />

      {dialogType === "add" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="Add New Card">
          <AddCardForm onClose={handleCloseDialog} rooms={rooms} />
        </ReusableDialog>
      )}

      {dialogType === "edit" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="Edit Card">
          <EditCardForm onClose={handleCloseDialog} card={selectedItem} rooms={rooms} />
        </ReusableDialog>
      )}

      {dialogType === "delete" && (
        <ReusableDialog isOpen={true} onClose={handleCloseDialog} title="Delete Card">
          <ConfirmationForm
            title="Delete Card"
            description={`Are you sure you want to delete the card "${selectedItem?.nickname}"?`}
            onClose={handleCloseDialog}
            onClick={handleDeleteCard}
            confirmText="Delete"
            cancelText="Cancel"
          />
        </ReusableDialog>
      )}
    </Layout>
  );
}
