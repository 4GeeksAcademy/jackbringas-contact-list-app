import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactCard = ({ contact, onDelete }) => {
  const { dispatch } = useGlobalReducer();

  // Si el contacto no tiene imagen, usamos una aleatoria de pravatar
  const getImage = (contact) => {
    if (contact.image) return contact.image;
    const fallback = Math.floor(Math.random() * 70) + 1;
    return `https://i.pravatar.cc/150?img=${fallback}`;
  };

  return (
    <div className="card mb-3 p-3">
      <div className="d-flex align-items-center">
        <img
          src={getImage(contact)}
          alt={contact.name}
          className="rounded-circle me-3"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />

        <div className="flex-grow-1">
          <h5>{contact.name}</h5>
          <p className="mb-1">📍 {contact.address || "No address available"}</p>
          <p className="mb-1">📞 {contact.phone || "No phone available"}</p>
          <p className="mb-1">✉️ {contact.email || "No email available"}</p>
        </div>

        <div className="d-flex gap-2">
          <Link to="/submit">
            <button
              className="icon-btn neon-icon"
              onClick={() =>
                dispatch({ type: "set_single_contact", payload: contact })
              }
            >
              ✏️
            </button>
          </Link>

          <button
            className="icon-btn neon-icon"
            onClick={() => onDelete(contact.id)}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};
