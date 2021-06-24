let root = document.getElementById('root')

const player = (name, sign) => {
    return {name, sign}
}

const gameBoard = (() => {
    
    let board = new Array(9);

    let layout = document.createElement('div');
    layout.id = ('layout');

    for (i = 0; i < board.length; i++){
            board[i] = ''
        }        
        board.forEach((item, index) => {
            const square = document.createElement('div');
            square.className = 'square'
            square.id = index
            layout.appendChild(square)
            square.addEventListener('click',()=>selectSquare(index));
        })

        root.appendChild(layout);


    const selectSquare = (index) => {
       const selected = document.getElementById(index);
       selected.classList.add(playGame.activePlayer.sign);
       selected.setAttribute('data', playGame.activePlayer.name);
       board[index]=playGame.activePlayer.sign;
       playGame.checkWinner();
       playGame.changePlayer();
       playGame.remainingSquares += -1;
       selected.style.pointerEvents = 'none'
       console.log(playGame.remainingSquares)
    
    }
    


    return {board}
})();

const playGame = (() => {

    const playerOne = player('Player 1', 'X');
    const playerTwo = player('Player 2', 'O');

    let activePlayer = playerOne;
    let winner = null
    let remainingSquares = 9

    let win = [
        [0,1,2],
        [0,4,8],
        [0,3,6],
        [2,4,6],
        [1,4,7],
        [2,5,8],
        [3,4,5],
        [6,7,8]
    ]

    function changePlayer(){
        if (this.activePlayer === playerOne) {
            this.activePlayer = playerTwo
        } else {
            this.activePlayer = playerOne
        }   
    }

    function checkWinner(){
        if (remainingSquares > 0){
            win.forEach((item, index) =>{
                if(gameBoard.board[item[0]] === this.activePlayer.sign && gameBoard.board[item[1]] === this.activePlayer.sign && gameBoard.board[item[2]] === this.activePlayer.sign){
                    winner = this.activePlayer.name;

                    let winDiv = document.createElement('div')
                    root.appendChild(winDiv)

                    let announceWin = document.createElement('h2')
                    announceWin.textContent =`${winner} is the winner!`
                    announceWin.id = 'announceWin'
                    winDiv.appendChild(announceWin)

                    const squares = document.getElementsByClassName('square')
                    console.log(squares)

                    for(i=0; i<squares.length; i++){
                        squares[i].style.pointerEvents='none'
                    }
                }
            })
        } else if(remainingSquares == 0 && winner == null){
            let winDiv = document.createElement('div')
            root.appendChild(winDiv)

            let announceWin = document.createElement('h2')
            announceWin.textContent ='Tie Game!'
            announceWin.id = 'announceWin'
            winDiv.appendChild(announceWin)
        }
    }

    
    return{
        activePlayer,
        changePlayer,
        remainingSquares,
        checkWinner
    }
})();


const button = document.getElementById('newGame')
button.addEventListener('click', () => location.reload())




