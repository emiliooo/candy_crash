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
  

    console.log(squares)
  }


  squares.forEach(events => {
    document.getElementById(events.id).addEventListener('mousedown', mousedown);
  })


  squares.forEach(events => {
    document.getElementById(events.id).addEventListener('dragstart', dragstart)
  })

  squares.forEach(events => {
    document.getElementById(events.id).addEventListener('dragleave', dragleave)
  })

  squares.forEach(events => {
    document.getElementById(events.id).addEventListener('dragend', dragend)
  })

  squares.forEach(events => {
    document.getElementById(events.id).addEventListener('drop', dragdrop)
  })

  squares.forEach(events => {
    document.getElementById(events.id).addEventListener('dragover', dragover)
  })

  function dragend() {
    console.log(this.id, 'dragend')
  }

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

  function dragleave() {
    console.log(this.id, 'dragover')

  }

  function dragstart() {
    console.log(this.id, 'dragstart')
    startColor = squares[this.id].style.backgroundColor;
    startID = this.id;

  }


  function mousedown() {
    console.log(this.id, 'downd')

  }

  function checkRowThree() {
    for (i = 0; i < 61; i++) {
      let rowOfTree = [i, i + 1, i + 2];
      let decicatedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === 'white';

      if (rowOfTree.every(index => squares[index].style.backgroundColor === decicatedColor  ))  {
        rowOfTree.forEach(index => {
          squares[index].style.backgroundColor = 'white';
        })
       }
    }
  }

  function checkRowDown() {
    for (i = 0; i < 61; i++) {
      let rowOfTree = [i, i + 8, i + 16];
      let decicatedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === 'white';

      if (rowOfTree.every(index => squares[index].style.backgroundColor === decicatedColor  ))  {
        rowOfTree.forEach(index => {
          squares[index].style.backgroundColor = 'white';
        })
       }
    }
  }

  
  window.setInterval( () => {
    checkRowThree()
  },200)

  window.setInterval( () => {
    checkRowDown()
  },200)



});