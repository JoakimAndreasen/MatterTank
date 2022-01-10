//generate maze "Iterative implementation" at https://en.wikipedia.org/wiki/Maze_generation_algorithm 
function generateMaze() {
    xSize = grid.length;
    ySize = grid[0].length;
    //start at random cell
    let start = grid[0][0];
    start.visited = true;
    let stack = [];
    stack.push(start);
    while(stack.length > 0) { 
        let current = stack.pop();
        let neighbors = [];
        //get neighbors
        if(current.x > 0) {
            neighbors.push(grid[current.x-1][current.y]);
        }
        if(current.x < xSize-1) {
            neighbors.push(grid[current.x+1][current.y]);
        }
        if(current.y > 0) {
            neighbors.push(grid[current.x][current.y-1]);
        }
        if(current.y < ySize-1) {
            neighbors.push(grid[current.x][current.y+1]);
        }
        //pick random neighbor
        let neighbor = neighbors.filter(e => !e.visited);
        neighbor = neighbor[Math.floor(Math.random()*neighbor.length)];

        if(neighbor) {
            stack.push(current);
            if (current.x != neighbor.x) {
                current.removeWall(neighbor.x > current.x ? "right" : "left");
                neighbor.removeWall(neighbor.x < current.x ? "right" : "left");
            }
            if (current.y != neighbor.y) {
                current.removeWall(neighbor.y > current.y ? "bottom" : "top");
                neighbor.removeWall(neighbor.y < current.y ? "bottom" : "top");
            }

            neighbor.visited = true;
            stack.push(neighbor);
        } 
    }
}