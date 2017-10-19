"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var contentPlateauInitial = {};

    this.init = function () {
        var i,
            j = 0,
            coordinate = new Lyngk.Coordinates(''),
            coordinatesValid = coordinate.getValidCoordinates();

        for (i = 0; i < coordinatesValid.length; i++) {
            var intersection = new Lyngk.Intersection(coordinatesValid[i]);
            intersection.setPiece(new Lyngk.Piece(Lyngk.Color.BLUE));

            contentPlateauInitial[coordinatesValid[i]] = { state : intersection.getState() };
        }
    }

    this.getPlateauInitial = function () {
        return contentPlateauInitial;
    }
};
