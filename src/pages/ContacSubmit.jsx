import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate, Link } from "react-router-dom";

export const ContactSubmit = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (store.singleContact && store.singleContact.id) {
      setName(store.singleContact.name || "");
      setPhone(store.singleContact.phone || "");
      setEmail(store.singleContact.email || "");
      setAddress(store.singleContact.address || "");
      setImage(store.singleContact.image || "");
    }
  }, [store.singleContact]);

  const clearForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setImage("");
    dispatch({ type: "set_single_contact", payload: {} });
  };

  const createContact = () => {
    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        address,
        agenda_slug: "jackbringas"
      })
    };

    fetch("https://playground.4geeks.com/contact/agendas/jackbringas/contacts", options)
      .then(async resp => {
        const result = await resp.json();
        if (!resp.ok) {
          console.error("Server error:", result);
          alert("Error: " + (result?.msg || result?.detail || "Unknown error"));
          return;
        }
        alert("Contact created successfully!");
        clearForm();
        navigate("/");
      })
      .catch(error => {
        console.error("Network error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  const updateContact = () => {
    const id = store.singleContact.id;
    if (!id) {
      alert("Missing contact ID for update.");
      return;
    }

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email,
        address,
        agenda_slug: "jackbringas"
      })
    };

    fetch(`https://playground.4geeks.com/contact/agendas/jackbringas/contacts/${id}`, options)
      .then(async resp => {
        const result = await resp.json();
        if (!resp.ok) {
          console.error("Server error:", result);
          alert("Error: " + (result?.msg || result?.detail || "Unknown error"));
          return;
        }
        alert("Contact updated successfully!");
        clearForm();
        navigate("/");
      })
      .catch(error => {
        console.error("Network error:", error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="container mt-4">
      <h2>{store.singleContact.id ? "Edit Contact" : "Add New Contact"}</h2>

      <input className="form-control my-2" onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" />
      <input className="form-control my-2" onChange={(e) => setPhone(e.target.value)} value={phone} type="text" placeholder="Phone number" />
      <input className="form-control my-2" onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" />
      <input className="form-control my-2" onChange={(e) => setAddress(e.target.value)} value={address} type="text" placeholder="Address" />
      <input className="form-control my-2" onChange={(e) => setImage(e.target.value)} value={image} type="text" placeholder="Picture URL" />

      {store.singleContact.id ? (
        <button className="btn btn-pink mt-3" onClick={updateContact}>
          Update Contact
        </button>
      ) : (
        <button className="btn btn-pink mt-3" onClick={createContact}>
          Create Contact
        </button>
      )}

   <div className="mt-3">
       <Link to="/" className="back-link">← Back to Contacts</Link>
   </div>

    </div>
  );
};
