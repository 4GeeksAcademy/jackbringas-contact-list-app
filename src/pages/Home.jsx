import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";
import { ContactSubmit } from "./ContactSubmit.jsx";


export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const createAgenda = () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: "username",
        id: 0,
      }),
    };

    fetch("https://playground.4geeks.com/contact/agendas/username", options)
      .then((resp) => {
        if (!resp.ok) {
          console.log("Failed to create it, man. Don't know what to tell you...");
        } else {
          getData();
        }
        return resp.json();
      })
      .then((data) => console.log("Agenda created!", data))
      .catch((error) => console.error("Error creating agenda:", error));
  };

  const getData = () => {
    fetch("https://playground.4geeks.com/contact/agendas/username/contacts")
      .then((resp) => {
        console.log("Get data response:", resp);
        if (!resp.ok) {
          createAgenda();
          return null;
        } else {
          return resp.json();
        }
      })
      .then((data) => {
        if (data) {
          console.log("Get data:", data);
        
        }
      })
      .catch((error) => console.error("Error getting data:", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo Baby" />
      </p>
      
      <ContactSubmit />
    </div>
  );
};
