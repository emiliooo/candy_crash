window.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector(".grid")
  let randomColors = ['red', 'blue', 'yellow', 'dark', 'purpure', 'green', 'pink', 'orange', 'white'];
  let width = 8;
  let squares = [];
  let startColor;
  let startID;
  createElements();

  function createElements() {
    for (let i = 0; i < width * width; i++) {
      var el = document.createElement('div');
      randomNumber = Math.floor(Math.random() * Math.floor(randomColors.length - 1));
      el.setAttribute('id', i)
      el.setAttribute('draggable', true)
      el.style.backgroundColor = randomColors[randomNumber]
      grid.appendChild(el)
      squares.push(el)
    }
  }

  squares.forEach(events => {
    document.getElementById(events.id).addEventListener('dragstart', dragstart)
  })

  squares.forEach(events => {
    document.getElementById(events.id).addEventListener('drop', dragdrop)
  })

  squares.forEach(events => {
    document.getElementById(events.id).addEventListener('dragover', dragover)
  })

  function dragdrop(e) {
    e.preventDefault();
    const dropColor = squares[this.id].style.backgroundColor;
    const startedID = parseInt(startID)
    let validMoves = [startedID - 1, startedID + 1, startedID + width, startedID - width];

    let isDroppedValid = validMoves.includes(parseInt(this.id))
    if (isDroppedValid) {
      squares[this.id].setAttribute("style", "background-color:" + startColor);
      squares[startID].setAttribute("style", "background-color:" + dropColor);
    } else {
      console.log('errr')
    }
  }

  function dragover(e) {
    e.preventDefault();
  }

  function dragstart() {
    startColor = squares[this.id].style.backgroundColor;
    startID = this.id;
  }

  function checkRowThree() {
    for (i = 0; i < 61; i++) {
      let rowOfTree = [i, i + 1, i + 2];
      let decicatedColor = squares[i].style.backgroundColor;

      if (rowOfTree.every(index => squares[index].style.backgroundColor === decicatedColor)) {
        rowOfTree.forEach(index => {
          squares[index].style.backgroundColor = 'white';
        })
      }
    }
  }

  function checkColumnThree() {
    for (i = 0; i < 41; i++) {
      let columnOfTree = [i, i + width, i + width * 2];
      let decicatedColor = squares[i].style.backgroundColor;

      if (columnOfTree.every(index => squares[index].style.backgroundColor === decicatedColor)) {
        columnOfTree.forEach(index => {
          squares[index].style.backgroundColor = 'white';
        })
      }
    }
  }

  function whiteMoveUp() {
    for( i = 0; i < 55 ; i++) {
      if(squares[i + width].style.backgroundColor === 'white' ) {
          squares[i + width].style.backgroundColor = squares[i].style.backgroundColor;
          squares[i].style.backgroundColor = 'white'
      }
    }
  }

  window.setInterval(() => {
    whiteMoveUp();
    checkRowThree();
    checkColumnThree();
  }, 200)

});