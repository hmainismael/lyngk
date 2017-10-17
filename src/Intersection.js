"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c, l) {

    var etat = Lyngk.State.VACANT;
    var piecesPosees = [];

    this.getState = function () {
        return etat;
    }

    this.getColor = function () {
        return piecesPosees[piecesPosees.length - 1].getColor();
    }

    this.setPiece = function (piece) {
        piecesPosees.push(piece);
        etat++;
    }
};
