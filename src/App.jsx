import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import "./App.scss";
import Cell from "./cell/Cell";
let AREA = 2500;
let aliveCells = [
	[1, 1],
	[1, 2],
	[2, 1],
	[2, 2],
	[3, 3],
	[3, 4],
	[4, 3],
	[4, 4],
];

let firstRun = false;
function App() {
	let [cells, setCells] = useState([]);
	const createCelles = useCallback(
		function () {
			const squares = [];
			for (let i = 0; i < AREA; i++) {
				let row = i + 1;
				let column = 1;
				while (row > 50) {
					row -= 50;
					column++;
				}

				const cellData = {
					row: row,
					column: column,
					id: i.toString(),
					setIsAlive() {
						// if (
						// 	aliveCells.some(
						// 		(cordinates) =>
						// 			cordinates[0] == this.row && cordinates[1] === this.column
						// 	)
						// ) {
						// 	this.isAlive = true;
						// 	return;
						// }
						// this.isAlive = false;
						this.isAlive = Math.floor(Math.random() * 2) === 0 ? false : true;
					},
				};
				cellData.setIsAlive();
				squares.push(cellData);
			}
			setCells(squares);
		},
		[setCells]
	);

	useEffect(() => {
		createCelles();
		console.log("hi");
	}, [createCelles]);

	setTimeout(function () {
		const alives = cells.filter((cell) => cell.isAlive === true);
		const newCells = cells.map((cell) => {
			let aliveCounter = 0;
			let cordinates = [];
			let startCordinates = { row: cell.row - 1, column: cell.column - 1 };
			let endCordinates = { row: cell.row + 1, column: cell.column + 1 };

			while (startCordinates.row <= endCordinates.row) {
				while (startCordinates.column <= endCordinates.column) {
					cordinates.push({
						row: startCordinates.row,
						column: startCordinates.column,
					});
					++startCordinates.column;
				}
				++startCordinates.row;
				startCordinates.column = cell.column - 1;
			}
			cordinates.splice(4, 1);
			cordinates.forEach((cordinate) => {
				if (
					alives.some(
						(alive) =>
							alive.row == cordinate.row && alive.column == cordinate.column
					)
				) {
					aliveCounter++;
				}
			});
			if (aliveCounter === 3) return { ...cell, aliveCounter, isAlive: true };
			if (aliveCounter === 2 || aliveCounter === 3)
				return { ...cell, aliveCounter };
			if (aliveCounter < 2) {
				return { ...cell, aliveCounter, isAlive: false };
			}
			if (aliveCounter > 3) return { ...cell, aliveCounter, isAlive: false };
		});

		setCells(newCells);
	}, 1000);
	console.log("render");
	return (
		<div className="container">
			<div className="cells-container">
				{cells.map(({ isAlive, id }) => (
					<Cell isAlive={isAlive} key={id} />
				))}
			</div>
		</div>
	);
}

export default App;
