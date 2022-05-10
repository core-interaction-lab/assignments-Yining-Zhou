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
      [4, 0, 0, 0],
      [4, 4, 4, 4],
    ],
    [
      [0, 0, 0, 4],
      [4, 4, 4, 4],
    ],
    [
      [4, 4, 4, 4],
      [0, 0, 0, 4],
    ],

    [
      [4, 4, 4, 4],
      [4, 0, 0, 0],
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

    [[5], [5], [5], [5]],

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
  currentBlocks = [];

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
var playGround = genArr(size, genArr(size, 0));

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
  var blockToRemove = [];
  for (var block of currentBlocks) {
    if (block.pos[0] + block.cells.length < size) {
      var lowerEdge = block.cells[0].map((c, i) => {
        for (var j = 0; j < block.cells.length; j++) {
          if (block.cells[block.cells.length - 1 - j][i] > 0) return j;
        }
      });
      var canDrop = true;
      for (var i = 0; i < block.cells[0].length; i++) {
        if (
          playGround[block.pos[0] + block.cells.length - lowerEdge[i]] &&
          playGround[block.pos[0] + block.cells.length - lowerEdge[i]][
            block.pos[1] + i
          ]
        ) {
          canDrop = false;
          if (
            playGround[block.pos[0] + block.cells.length - lowerEdge[i]][
              block.pos[1] + i
            ] == block.cells[block.cells.length - lowerEdge[i] - 1][i]
          ) {
            blockToRemove.push(block);
          }
        }
      }
      canDrop && block.pos[0]++;
    }
    drawBlock(block, playGround);
  }
  currentBlocks = currentBlocks.filter(
    (block) => blockToRemove.indexOf(block) == -1
  );
}

function drawBlock(block, playGround) {
  for (var i in block.cells) {
    for (var j in block.cells[i]) {
      block.cells[i][j] > 0 &&
        Number(i) + block.pos[0] >= 0 &&
        (playGround[Number(i) + block.pos[0]][Number(j) + block.pos[1]] =
          block.cells[i][j]);
    }
  }
}

document.getElementById("txt-input").addEventListener("input", function () {
  var randomBlock = blocks[random(15)];
  var newBlock = {
    pos: [-randomBlock.length, random(size + 1 - randomBlock[0].length)],
    cells: randomBlock,
  };
  currentBlocks.push(newBlock);
});
