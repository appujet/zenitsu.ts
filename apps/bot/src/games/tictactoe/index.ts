import { shuffleArray } from '../../utils/functions.js';
import { TicTacToePiece } from './constants.js';

export class TicTacToe {
    static winnablePositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    map = Array.from({ length: 9 }, () => TicTacToePiece.None);

    users: [string, string];

    winner?: string;

    draw?: boolean;

    lastTurn = 0;

    get turn() {
        // Math.abs(this.__lastTurn - 1)
        return this.lastTurn === 0
            ? 1
            : 0;
    }

    get piece() {
        return this.turn === 1
            ? TicTacToePiece.X
            : TicTacToePiece.O;
    }

    get finished() {
        return this.draw || this.winner !== undefined;
    }

    get user() {
        return this.users[this.turn];
    }

    constructor(users: [string, string]) {
        this.users = shuffleArray(users);
    }

    play(played: number, userId: string) {
        if (!this.canPlay(played, userId)) {
            throw new Error(`Can't play ${played}.`);
        }
        this.map[played] = this.piece;

        if (
            TicTacToe.winnablePositions.some((p) => p.every((x) => this.map[x] === TicTacToePiece.X)) ||
            TicTacToe.winnablePositions.some((p) => p.every((x) => this.map[x] === TicTacToePiece.O))
        ) {
            this.winner = this.user;
            return;
        }
        if (this.map.every((x) => x)) {
            this.draw = true;
            return;
        }
        this.lastTurn = this.turn;
    }

    canPlay(played: number, userId: string) {
        return (
            userId === this.user && this.map.at(played) === TicTacToePiece.None
        );
    }
}
