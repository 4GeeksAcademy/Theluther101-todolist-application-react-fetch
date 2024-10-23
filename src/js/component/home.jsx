import React, { useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
const [ inputValue, setInputValue] = useState("");
const [ Todos, setTodos] = useState([]);

	return (
		<div className="container">
			<h1>My Todos</h1>
			<ul>
				<li>
					<input 
					  type="text"
					  onChange={(e) => setInputValue(e.target.value)}
					  value={inputValue}
					  onKeyPress={(e) => {
						 if (e.key === "Enter") {
							setTodos(Todos.concat([inputValue]));
							setInputValue("");
						}
					  }}
					  placeholder="What do you need to do ?"></input>
				</li>
				{Todos.map((item, index) => (
					<li>
						{item}{" "}
						<i class="fas fa-trash-alt"
						onClick={() =>
							setTodos(
								Todos.filter(
									(t, currentIndex) =>
										index != currentIndex
								)
							)
						}></i>
					</li>
				))}
			</ul>
			<div>{Todos.length} tasks</div>
		</div>
	);
};

export default Home;
