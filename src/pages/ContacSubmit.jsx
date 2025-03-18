import React, { useState } from "react";

export const ContactSubmit = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState(""); 

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

        fetch("https://playground.4geeks.com/contact/agendas/username/contacts", options)
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
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
            <input onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Phone" />
            <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
            <input onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" />
            <button onClick={submitContact}>Submit</button>
        </div>
    );
};
