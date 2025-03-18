import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, {useEffect} from 'react'
import {Test} from "test"

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	const createAgenda = ()=>{
		const option = {
			method:"POST",
			headers:{
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				"slug": "username",
				"id": 0
			  })
		}
		fetch("https://playground.4geeks.com/contact/agendas/username",option)
		.then((resp)=>{
			if(resp.ok == false){
				console.log("failed create it man, dont wht to tell you....")
			}
			else{
				getData()
			}
			return resp.json()
		})
		.then((data)=> console.log("agenda created! ", data))
	}

	const getData = ()=>{
		fetch("https://playground.4geeks.com/contact/agendas/username/contacts")
		.then((resp)=> {
			console.log("get data resp: ",resp)
			if(resp.ok == false){
				createAgenda()
			}
			else{
				return resp.json()
			}
		})
		.then((data)=>console.log("get data: ",data))
	}

<test />











	useEffect(()=>{
		getData();
	},[])
	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
}; 