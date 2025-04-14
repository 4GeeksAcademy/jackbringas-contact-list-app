import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactSubmit = () => {
    const{store, dispatch}= useGlobalReducer()

    const [name, setName] = useState(store.singleContact.name);
    const [phone, setPhone] = useState(store.singleContact.phone);
    const [email, setEmail] = useState(store.singleContact.email);
    const [address, setAddress] = useState(store.singleContact.address); 

    const submitContact = () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
                address: address
            })
        };

        fetch("https://playground.4geeks.com/contact/agendas/jackbringas/contacts", options)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Failed to create contact");
                }
                return resp.json();
            })
            .then((data) => {
                console.log("Contact created!", data);
            })
            .catch((error) => {
                console.error("Error creating contact:", error);
            });
    };

    const updateContact = (id) => {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                phone: phone,
                email: email,
                address: address
            })
        };

        fetch("https://playground.4geeks.com/contact/agendas/jackbringas/contacts/"+id, options)
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Failed to create contact");
                }
                return resp.json();
            })
            .then((data) => {
                console.log("Contact created!", data);
            })
            .catch((error) => {
                console.error("Error creating contact:", error);
            });
    };
    return (
        <div>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" />
            <input onChange={(e) => setPhone(e.target.value)} value={phone}  type="text" placeholder="Phone" />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
            <input onChange={(e) => setAddress(e.target.value)} value={address}  type="text" placeholder="Address" />
            <button onClick={submitContact}>Submit</button>


            <button onClick={()=>updateContact(store.singleContact.id)}> Update Contact</button>


        </div>
    );
};
