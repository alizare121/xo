import React, {Component} from 'react';
export class XO extends Component{
    state = {
        board: [],
        boardSize: 3 ,
        count :0
    };

    makeBoard = () => {
        if (this.state.boardSize < 3) {
            alert("The size of the board is less than 3*3 !! \n Please change the size !!");
        } else {
             let initialBoard = [];
            for (let i = 0; i < this.state.boardSize; i++) {
                let row = [];
                for (let j = 0; j < this.state.boardSize; j++) {
                    row.push('')
                }
                initialBoard.push(row)
            }
            this.setState({
                board: initialBoard,
                count : 0
            })
        }
    };

    play = (row, col) => {
         let count = this.state.count ;
        const hPlayer = "X";
        const pcPlayer = "O";
        let n = this.state.boardSize;
        let i = n ;
        let j = n;
        let size = n*n;
        //const player = this.state.isX ? 'X' : "O";
        const board = this.state.board;
        // let isPlayerChanged = false;
        if(!board[row][col]){
            board[row][col] = hPlayer;
            count += 1;
            console.log(count , 'x');
            let r = Math.floor(Math.random()*i);
            let c = Math.floor(Math.random()*j);
            console.log(row , col);
            console.log(r , c);
            while (board[r][c] && count < size){
                r = Math.floor(Math.random()*i);
                c = Math.floor(Math.random()*j);
                console.log(r , c);
            }
            board[r][c] = pcPlayer;
            count +=1;
            console.log(count , 'o');
            console.log(board);
        }
        if (count > size){
            setTimeout(function(){alert('Game is Finish'); }, 200);
            setTimeout(() => {this.makeBoard()}, 300);
        }
        this.setState({
            board,
            count
          // isX: isPlayerChanged ? !this.state.isX : this.state.isX
        }, () =>
            this.checkWinner(),
        );
    };

winX () {
    setTimeout(function(){alert('winner is X'); }, 100);
    setTimeout(() => {this.makeBoard()}, 300);
}
winO () {
        setTimeout(function(){alert('winner is O'); }, 100);
        setTimeout(() => {this.makeBoard()}, 300);
    }
    checkWinner = () => {
        //const player = this.state.isX ? 'X' : "O";
       let board = this.state.board;
        let data ;
        let n = this.state.boardSize;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                data = board[i][j];
                if (board[i][j+1] === data) {
                    j++;
                }
                data = board[i][j+1];
                if (board[i][j] !== data) {
                    break
                }
                else if (board[i][j =n-1] === data) {
                    if (data === 'X') { this.winX()}
                    else if (data === 'O') {this.winO() }
                }
            }
        }

        for (let j = 0; j < n; j++) {
            for (let i = 0; i < n; i++) {
                data = board[i][j];
                if (board[i+1][j] === data) {
                    i++;
                }
                data = board[i+1][j];
                if (board[i][j] !== data) {
                    break
                }
                else if (board[i=n-1][j] === data) {
                    if (data === 'X') { this.winX()}
                    else if (data === 'O') {this.winO() }
                }
            }
        }

        for (let i = 0; i < n; i++) {
                data = board[i][i];
                if (board[i+1][i+1] === data) {
                    i++;
                }
            data = board[i+1][i+1];
                if (board[i][i] !== data) {
                    break
                }
                else if (board[i=n-1][i = n-1] === data) {
                    if (data === 'X') { this.winX()}
                    else if (data === 'O') {this.winO() }
                }
        }

        for (let i = 0; i < n; i++) {
            data = board[i][n-1-i];
            if (board[i+1][n-1-i-1] === data) {
                i++;
            }
            data = board[i+1][n-1-i-1];
            if (board[i][n-1-i] !== data) {
                break
            }
            else if (board[i=n-1][n-1-i] === data) {
                if (data === 'X') { this.winX()}
                else if (data === 'O') {this.winO() }
            }
        }
    };

    componentDidMount() {
        this.makeBoard()
    }

    render() {
        const {board, boardSize} = this.state;
        //const player = isX ? "X" : "O";
        return (
            <div>
                <input type="text" value={boardSize} onChange={e => this.setState({boardSize: e.target.value})}/>
                <button onClick={this.makeBoard}>Change Board Size</button>
                <p>You are: X </p>
                <p>Computer is: O </p>
                
                <table className="xo-table">
                    <tbody>
                    {
                        board.map((row, i) => {
                            return <tr key={i}>
                                {
                                    row.map((col, j) => {
                                        return <td key={j} onClick={() => this.play(i, j)}>{col}</td>
                                    })
                                }
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}