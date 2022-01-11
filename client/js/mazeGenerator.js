//seed from string : xmur3
function seedFromString(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    } return function() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}
//random function from seed
function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

function randomSeededFunction(seed) {
    var seed = seedFromString(seed);
    return mulberry32(seed());
}
//generate maze "Iterative implementation" at https://en.wikipedia.org/wiki/Maze_generation_algorithm 
function generateMaze(grid, randomFunction=Math.random) {
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

        neighbor = neighbor[Math.floor(randomFunction()*neighbor.length)];

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