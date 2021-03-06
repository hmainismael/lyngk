"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c, l) {

    var etat = Lyngk.State.VACANT;
    var piecesPosees = [];
    var coordinatesT = new Lyngk.Coordinates(c, l);

    this.getState = function () {
        if (etat >= Lyngk.State.FULL_STACK) {
            etat = Lyngk.State.FULL_STACK;
        }
        return etat;
    };

    this.getColor = function () {
        return piecesPosees[piecesPosees.length - 1].getColor();
    };

    this.setPiece = function (piece) {
        piecesPosees.push(piece);
        etat += 1;
    };

    this.getHauteur = function () {
        return piecesPosees.length;
    };

    this.removePile = function () {
        piecesPosees = [];
        etat = Lyngk.State.VACANT;
    };

    this.getPiecesPosees = function () {
        return piecesPosees;
    };

    this.getIntersection = function () {
        return coordinatesT.toString();
    };
};
