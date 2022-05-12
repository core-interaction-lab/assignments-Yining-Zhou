var blocks = [
    [
      [1, 1],
      [1, 1],
    ],

    [[2, 2, 2, 2]],

    [
      [0, 3, 0],
      [3, 3, 3],
    ],

    [
      [5, 0, 0, 0],
      [5, 5, 5, 5],
    ],
    [
      [0, 0, 0, 5],
      [5, 5, 5, 5],
    ],
    [
      [5, 5, 5, 5],
      [0, 0, 0, 5],
    ],

    [
      [5, 5, 5, 5],
      [5, 0, 0, 0],
    ],
    [
      [0, 4],
      [0, 4],
      [0, 4],
      [4, 4],
    ],
    [
      [4, 4],
      [0, 4],
      [0, 4],
      [0, 4],
    ],
    [
      [4, 4],
      [4, 0],
      [4, 0],
      [4, 0],
    ],

    [
      [4, 0],
      [4, 0],
      [4, 0],
      [4, 4],
    ],

    [[2], [2], [2], [2]],

    [
      [3, 0],
      [3, 3],
      [3, 0],
    ],

    [
      [0, 3],
      [3, 3],
      [0, 3],
    ],

    [
      [3, 3, 3],
      [0, 3, 0],
    ],
  ],
  currentBlocks = [],
  lowerEdges = blocks.map((block) => {
    return block[0].map((c, i) => {
      for (var j = 0; j < block.length; j++) {
        if (block[block.length - 1 - j][i] > 0) return block.length - 1 - j;
      }
    });
  });

function genArr(len, item) {
  return "s"
    .repeat(len)
    .split("")
    .map((s) => JSON.parse(JSON.stringify(item)));
}

function random(max) {
  return Math.floor(Math.random() * max);
}

var size = 40;
var playGround = genArr(size, genArr(size, 0)),
  cellToBlock = genArr(size, genArr(size, 0)); 

var playgroundWrapper = document.getElementById("playground"),
  rows = [];

for (var i = 0; i < size; i++) {
  var newRow = document.createElement("div");
  newRow.className = "row";
  playgroundWrapper.appendChild(newRow);
  rows.push(newRow);
}

setInterval(drawGround, 50);
drawGround();

function drawRow(el, data) {
  el.innerHTML = "";
  for (var o of data) {
    var cell = document.createElement("div");
    cell.className = "cell cell-" + o;
    el.appendChild(cell);
  }
}

function drawGround() {
  setGround();
  for (var i in playGround) {
    drawRow(rows[i], playGround[i]);
  }
}

function setGround() {
  playGround = genArr(size, genArr(size, 0));
  cellToBlock = genArr(size, genArr(size, 0));
  var blocksToRemove = new Set();

  for (var block of currentBlocks) {
    var canDrop = block.pos[0] + block.height < size;
    if (
      block.pos[1] > 0 &&
      playGround[block.pos[0] + block.lowerEdge[0]] &&
      playGround[block.pos[0] + block.lowerEdge[0]][block.pos[1] - 1] ==
        block.color
    ) {
      canDrop = false;
      blocksToRemove.add(block);
      blocksToRemove.add(
        cellToBlock[block.pos[0] + block.lowerEdge[0]][block.pos[1] - 1]
      );
      showBoom(block.pos[0] + block.lowerEdge[0], block.pos[1]);
    }

    if (
      block.pos[1] + block.width < size - 1 &&
      playGround[block.pos[0] + block.lowerEdge[block.width - 1]] &&
      playGround[block.pos[0] + block.lowerEdge[block.width - 1]][
        block.pos[1] + block.width
      ] == block.color
    ) {
      canDrop = false;
      blocksToRemove.add(block);
      blocksToRemove.add(
        cellToBlock[block.pos[0] + block.lowerEdge[block.width - 1]][
          block.pos[1] + block.width
        ]
      );
      showBoom(
        block.pos[0] + block.lowerEdge[block.width - 1],
        block.pos[1] + block.width - 1
      );
    }
    for (var i = 0; i < block.width; i++) {
      var cellBelow =
        playGround[block.pos[0] + block.lowerEdge[i] + 1] &&
        playGround[block.pos[0] + block.lowerEdge[i] + 1][block.pos[1] + i];
      if (cellBelow) {
        canDrop = false;
        if (cellBelow == block.color) {
          blocksToRemove.add(block);
          blocksToRemove.add(
            cellToBlock[block.pos[0] + block.lowerEdge[i] + 1][block.pos[1] + i]
          );
          showBoom(block.pos[0] + block.lowerEdge[i], block.pos[1] + i);
        }
      }
    }
    canDrop && block.pos[0]++;
    drawBlock(block, playGround);
  }
  currentBlocks = currentBlocks.filter((block) => !blocksToRemove.has(block));
}

function drawBlock(block, playGround) {
  for (var i in block.cells) {
    for (var j in block.cells[i]) {
      if (block.cells[i][j] > 0 && Number(i) + block.pos[0] >= 0) {
        playGround[Number(i) + block.pos[0]][Number(j) + block.pos[1]] =
          block.cells[i][j];
        cellToBlock[Number(i) + block.pos[0]][Number(j) + block.pos[1]] = block;
      }
    }
  }
}

function showBoom(row, col) {
  var newBoom = new Image(),
    cell = rows[row].childNodes[col];
  var position = cell.getBoundingClientRect();
  newBoom.classList.add("boom");
  newBoom.src = "boom.png";
  newBoom.setAttribute(
    "style",
    "top: " + position.top + "px; left: " + position.left + "px;"
  );
  document.body.appendChild(newBoom);
  setTimeout(() => newBoom.remove(), 1000);
}

document.getElementById("txt-input").addEventListener("input", function () {
  var randomIndex = random(blocks.length);
  var randomBlock = blocks[randomIndex];
  var newBlock = {
    pos: [-randomBlock.length, random(size + 1 - randomBlock[0].length)],
    cells: randomBlock,
    lowerEdge: lowerEdges[randomIndex],
    width: randomBlock[0].length,
    height: randomBlock.length,
    color: randomBlock[0].find((c) => c != 0),
  };
  currentBlocks.push(newBlock);
});

document.getElementById("refresh").addEventListener("click", function () {
  currentBlocks = [];
});
