import { FN_DATA } from "./arrayFnData.js";
import { writeToFile } from "./fileHelpers.js";
import { toCartesian, toXC, zoneToXc } from "./helpers.js";

const STARTING_CELL = "H33";
const BORDER_LEFT_STYLE = "1";
const BORDER_BOTTOM_STYLE = "7";
const BORDER_BOTTOM_LEFT_STYLE = "8";
const STYLE_BOLD = "12";

export const rangeReference = /^[A-Z]+[0-9]+:[A-Z]+[0-9]+$/;

class Main {
    cells = [];
    execute() {
        const startingCol = toCartesian(STARTING_CELL).col;
        let currentRow = toCartesian(STARTING_CELL).row;
        for (let fn in FN_DATA) {
            const data = FN_DATA[fn];
            fn = fn.replaceAll("_", ".")

            let currentCol = startingCol;
            const headerRow = currentRow;
            const contentRow = currentRow + 1;
            const { DATA, RESULT, ARGS } = data;
            const cellsForFn = [];

            // Function name
            cellsForFn.push(this.createCell(currentCol, contentRow, fn));
            currentCol++;

            // IF (done at the end, just reserve the col)
            currentCol++;

            // DATA
            const dataDims = this.getDims(DATA);
            const dataCol = currentCol;
            if (dataDims.cols > 0) {
                cellsForFn.push(this.createCell(currentCol, headerRow, "Arguments"));
                const dataCells = this.dataToCells(DATA, currentCol, contentRow);
                cellsForFn.push(...dataCells);
                currentCol += dataDims.cols;
            }

            // Function call
            const resultDims = this.getDims(RESULT);
            const fnCol = currentCol;
            cellsForFn.push(this.createCell(currentCol, headerRow, "Results"));
            const args = this.parseArgs(ARGS, dataCol, contentRow, dataDims);
            const fnCall = "=" + fn + "(" + args + ")";
            cellsForFn.push(this.createCell(currentCol, contentRow, fnCall));
            currentCol += resultDims.cols;

            // EXPECTED
            cellsForFn.push(this.createCell(currentCol, headerRow, "Expected"));
            const expectedCol = currentCol;
            const resultCells = this.dataToCells(RESULT, currentCol, contentRow);
            cellsForFn.push(...resultCells);
            currentCol += resultDims.cols;

            // IF
            const ifCol = startingCol + 1;
            const ifContent = this.generateIfFormula(contentRow, fnCol, expectedCol, resultDims);
            cellsForFn.push(this.createCell(ifCol, contentRow, ifContent));

            // Headers Borders
            for (let col = startingCol; col < currentCol; col++) {
                const xc = toXC(col, headerRow);
                const cell = cellsForFn.find((cell) => cell.xc === xc);
                if (cell) {
                    cell.border = BORDER_BOTTOM_LEFT_STYLE;
                } else {
                    cellsForFn.push({ xc, border: BORDER_BOTTOM_STYLE });
                }
            }

            const nOfRows = Math.max(dataDims.rows, resultDims.rows);

            // Data borders
            for (let col = startingCol; col < currentCol; col++) {
                if (!(col === dataCol || col === expectedCol || col === fnCol)) {
                    continue;
                }
                for (let row = contentRow; row < contentRow + nOfRows; row++) {
                    const xc = toXC(col, row);
                    const cell = cellsForFn.find((cell) => cell.xc === xc);
                    if (cell) {
                        cell.border = BORDER_LEFT_STYLE;
                    } else {
                        cellsForFn.push({ xc, border: BORDER_LEFT_STYLE });
                    }
                }
            }

            cellsForFn.sort((a, b) => a.xc.localeCompare(b.xc, undefined, {numeric: true, sensitivity: 'base'}));
            this.cells.push(...cellsForFn);
            currentRow += nOfRows + 2;
        }
    }

    dataToCells(data, startingCol, startingRow) {
        const cells = [];
        for (let row = 0; row < data.length; row++) {
            for (let col = 0; col < data[row].length; col++) {
                const xc = toXC(startingCol + col, startingRow + row);
                cells.push(this.createCellFromXc(xc, data[row][col]));
            }
        }
        return cells;
    }

    getDims(data) {
        const rows = data.length;
        const cols = data[0].length;
        return { cols, rows };
    }

    createCell(col, row, content, style) {
        const xc = toXC(col, row);
        const cell = { xc, content };
        if (style === "bold") {
            cell.style = STYLE_BOLD;
        }
        return cell;
    }

    createCellFromXc(xc, content) {
        return { xc, content };
    }

    cellToString(cell) {
        const data = [];
        if (cell.content !== undefined) {
            data.push(`content: '${cell.content}'`);
        }
        if (cell.border) {
            data.push(`border: '${cell.border}'`);
        }
        if (cell.style) {
            data.push(`style: '${cell.style}'`);
        }
        return `${cell.xc}: { ${data.join(", ")} }`;
    }

    generateIfFormula(row, colOfResults, colOfExpected, dims) {
        const andConditions = [];
        for (let i = 0; i < dims.rows; i++) {
            for(let j = 0; j < dims.cols; j++) {
                const xcResult = toXC(colOfResults + j, row + i);
                const xcExpected = toXC(colOfExpected + j, row + i);
                andConditions.push(`${xcResult}=${xcExpected}`);
            }
        }
        return `=IF(AND(${andConditions.join(", ")}), 1, 0)`;
    }

    parseArgs(args, dataCol, contentRow, dataDims) {
        const parsedArgs = [];
        for (const arg of args) {
            if (arg === "$") {
                const zone = {
                    top: contentRow,
                    bottom: contentRow + dataDims.rows - 1,
                    left: dataCol,
                    right: dataCol + dataDims.cols - 1,
                };
                parsedArgs.push(zoneToXc(zone));
            } else if (typeof arg === "string" && arg.startsWith("$COL_")) {
                const index = parseInt(arg.split("_")[1]);
                const zone = {
                    top: contentRow,
                    bottom: contentRow + dataDims.rows - 1,
                    left: dataCol + index,
                    right: dataCol + index,
                };
                parsedArgs.push(zoneToXc(zone));
            } else if (typeof arg === "string" && arg.startsWith("$ROW_")) {
                const index = parseInt(arg.split("_")[1]);
                const zone = {
                    top: contentRow + index,
                    bottom: contentRow + index,
                    left: dataCol,
                    right: dataCol + dataDims.cols - 1,
                };
                parsedArgs.push(zoneToXc(zone));
            } else if (typeof arg === "string" && !arg.match(rangeReference)) {
                parsedArgs.push(`"${arg}"`);
            } else {
                parsedArgs.push(arg);
            }
        }
        return parsedArgs.join(", ");
    }

    getDemoData() {
        const cellStrs = [];
        for (const cell of this.cells) {
            cellStrs.push(this.cellToString(cell));
        }
        return cellStrs.join(",\n") + ",";
    }
}
const main = new Main();
main.execute();

const demoData = main.getDemoData();
writeToFile("results/demoData.json", demoData);
