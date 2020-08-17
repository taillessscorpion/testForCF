///// 1. NESTED ARRAY
const nestedArray = array => {
    let handledArray = []
    for(let i = 0; i < array.length; ++i) {
        if(Array.isArray(array[i]) === true) {
            arrayChild = nestedArray(array[i])
            handledArray = handledArray.concat(arrayChild)
        } else {
            handledArray.push(array[i])
        }
    }
    return handledArray
}


//// 2. SUDOKU CHECK
var sudokuArrayTrue = [
    [1, 3, 2, 5, 4, 6, 9, 8, 7],
    [4,6,5,8,7,9,3,2,1],
    [7,9,8,2,1,3,6,5,4],
    [9,2,1,4,3,5,8,7,6],
    [3,5,4,7,6,8,2,1,9],
    [6,8,7,1,9,2,5,4,3],
    [5,7,6,9,8,1,4,3,2],
    [2,4,3,6,5,7,1,9,8],
    [8,1,9,3,2,4,7,6,5],
]
var sudokuArrayFalse = [
    [1,3,2,5,5,6,9,8,7],
    [3,6,5,8,7,9,3,2,1],
    [7,9,8,2,1,3,6,5,4],
    [9,2,1,4,3,5,8,7,6],
    [3,5,4,7,6,8,2,1,9],
    [6,8,7,1,9,2,5,4,3],
    [5,7,6,9,8,1,4,3,2],
    [2,4,3,6,5,7,1,9,8],
    [8,1,9,3,2,4,7,6,5],
]

const checkBlock = block => {
    const blockChildrenContainer = []
    for(let i = 0; i< block.length; ++i) {
        if(i === 0) blockChildrenContainer.push(block[i])
        else {
            for(let z = 0; z < blockChildrenContainer.length; ++z) {
                if(block[i] != blockChildrenContainer[z]) {
                    if(z === blockChildrenContainer.length - 1) {
                        blockChildrenContainer.push(block[i])
                        break
                    }
                } else if (block[i] === blockChildrenContainer[z]) {
                    return false
                }
            }
        }
    }
    return true
}
const checkBlockRow = blockRow => {
    const block1 = []
    const block2 = []
    const block3 = []
    for(let b = 0; b < 3; ++b) {
        for(let i = 0; i < blockRow.length; ++i) {
            block1.push(blockRow[i][b])
            block2.push(blockRow[i][b+3])
            block3.push(blockRow[i][b+6])
        }
    }
    const check1 = checkBlock(block1)
    const check2 = checkBlock(block2)
    const check3 = checkBlock(block3)
    if(check1 == true && check2 == true && check3 == true) return true
    return false
}
const checkSudokusBlock = grid => {
    const checkRow1 = checkBlockRow(grid.slice(0,3))
    const checkRow2 = checkBlockRow(grid.slice(3,6))
    const checkRow3 = checkBlockRow(grid.slice(6,9))
    if(checkRow1 == true && checkRow2 == true && checkRow3 == true) return true
    return false
}
const checkSudokusCol = grid => {
    for(let c = 0; c < grid[0].length; ++c) {
        const gridColContainer = []
        for(let i = 0; i < grid.length; ++i) {
            if(i === 0) gridColContainer.push(grid[i][c])
            else {
                for(let z = 0; z < gridColContainer.length; ++z) {
                    if(grid[i][c] != gridColContainer[z]) {
                        if(z === gridColContainer.length - 1) {
                            gridColContainer.push(grid[i][c])
                            break
                        }
                    } else if (grid[i][c] === gridColContainer[z]) {
                        return false
                    }
                }
            }
        }
    }
    return true
}
const checkSudokusRow = grid => {
    for(let i = 0; i < grid.length; ++i) {
        const gridRowContainer = []
        for(let c = 0; c < grid[i].length; ++c) {
            if(c === 0) {
                gridRowContainer.push(grid[i][c])
            } else {
                for(let z = 0; z < gridRowContainer.length; ++z) {
                    if(grid[i][c] != gridRowContainer[z]) {
                        if(z === gridRowContainer.length - 1) {
                            gridRowContainer.push(grid[i][c])
                            break
                        }
                    } else if (grid[i][c] === gridRowContainer[z]) {
                        return false
                    }
                }
            }
        }
    }
    return true
}
const checkSudoku = grid => {
    var checkedResult = false
    if(Array.isArray(grid) === true && grid.length === 9) {
        for(let i = 0; i < grid.length; ++i) {
            //// check every grid[i] is array
            if(Array.isArray(grid[i]) === true && grid[i].length === 9) {
                if(i === grid.length - 1) {
                    /// all gird's children is array
                    checkedResult = checkSudokusRow(grid)
                    if(checkedResult === true) {
                        /// all grid's row is correct
                        checkedResult = checkSudokusCol(grid)
                        if(checkedResult === true) {
                            //// all grid's column is correct
                            checkedResult = checkSudokusBlock(grid)
                        } else return checkedResult ///// false
                    } else return checkedResult ///// false
                }
            } else return checkedResult ///// false
        }
    }
    return checkedResult
}