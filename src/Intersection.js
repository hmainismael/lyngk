"use strict";

Lyngk.State = {VACANT: 0, ONE_PIECE: 1, STACK: 2, FULL_STACK: 3};

Lyngk.Intersection = function (c, l) {

    var etat = Lyngk.State.VACANT;

    this.getState = function () {
        return etat;
    }
};
