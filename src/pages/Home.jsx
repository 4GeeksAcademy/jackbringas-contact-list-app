import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { ContactCard } from "./ContactCard.jsx";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const getImage = (contact) => {
    if (contact.image) return contact.image;
    const fallback = Math.floor(Math.random() * 70) + 1;
    return `https://i.pravatar.cc/150?img=${fallback}`;
  };

  const getData = () => {
    fetch("https://playground.4geeks.com/contact/agendas/jackbringas/contacts")
      .then((resp) => {
        if (!resp.ok) {
          console.error("Failed to fetch contacts.");
          return null;
        }
        return resp.json();
      })
      .then((data) => {
        if (data) {
          dispatch({ type: "set_contact_list", payload: data.contacts });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    const setupAgenda = async () => {
      try {
        await fetch("https://playground.4geeks.com/contact/agendas/jackbringas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Error creating agenda:", error);
      }

      getData();
    };

    setupAgenda();
  }, []);

  const deleteContact = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact? 🗑️");
    if (!confirmDelete) return;

    try {
      const resp = await fetch(`https://playground.4geeks.com/contact/agendas/jackbringas/contacts/${id}`, {
        method: "DELETE",
      });

      if (resp.ok) {
        alert("Contact successfully deleted ✅");
        getData();
      } else {
        const errorData = await resp.json();
        alert("Failed to delete contact: " + errorData.msg);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("An unexpected error occurred while deleting the contact.");
    }
  };

  return (
    <div className="container my-4">
      {store.contactList.length > 0 ? (
        store.contactList.map((item, index) => (
          <ContactCard key={index} contact={item} onDelete={deleteContact} />
        ))
      ) : (
        <p className="text-center">No contacts found.</p>
      )}
    </div>
  );
};
