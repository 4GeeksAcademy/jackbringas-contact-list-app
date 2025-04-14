import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [contactList, setContactsList] = useState([]);

  const createAgenda = () => {
    fetch("https://playground.4geeks.com/contact/agendas/jackbringas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => {
        if (!resp.ok) {
          console.error("Failed to create agenda.");
        } else {
          getData();
        }
        return resp.json();
      })
      .then((data) => console.log("Agenda created!", data))
      .catch((error) => console.error("Error creating agenda:", error));
  };

  const getData = () => {
    fetch("https://playground.4geeks.com/contact/agendas/jackbringas/contacts")
      .then((resp) => {
        if (!resp.ok) {
          createAgenda();
          return null;
        }
        return resp.json();
      })
      .then((data) => {
        dispatch({ type: "set_contact_list", payload: data.contacts });

        if (data) {
          setContactsList(data.contacts);
        }
      })
      .catch((error) => console.error("Error getting data:", error));
  };

  useEffect(() => {
    getData();
  }, []);

 
  const defaultImages = {
    "Aaron": "https://media.istockphoto.com/id/1200677760/es/foto/retrato-de-apuesto-joven-sonriente-con-los-brazos-cruzados.jpg?s=612x612&w=0&k=20&c=RhKR8pxX3y_YVe5CjrRnTcNFEGDryD2FVOcUT_w3m4w=",
  };

  return (
    <div className="text-center mt-5">
      <Link to="/submit">
        <button className="btn btn-success">Add New Contact</button>
      </Link>

      <div className="container">
        {store.contactList.length > 0 ? (
          store.contactList.map((item, index) => (
            <div className="card my-2 p-3" key={index}>
              <div className="d-flex align-items-center">
                <img
                  src={defaultImages[item.name] || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="rounded-circle me-3"
                  style={{ width: "110px", height: "110px", objectFit: "cover" }}
                />
                <div>
                  <h5>{item.name}</h5>
                  <div>{item.phone || "No phone available"}</div>
                  <div>{item.email || "No email available"}</div>
                  <div>{item.address || "No address available"}</div>
                  <Link to="/submit">
                    <button
                      onClick={
                      ()=>{
                        dispatch({type:"set_single_contact", payload: item})

                      }}
                    >Edit</button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </div>
    </div>
  );
};
