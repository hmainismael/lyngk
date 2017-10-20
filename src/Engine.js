"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};

Lyngk.Engine = function () {

    var contentPlateauInitial = {};

    this.init = function () {
        var i,
            j = 0,
            nbIntersectionsRemplis = 0,
            coordinate = new Lyngk.Coordinates(''),
            coordinatesValid = coordinate.getValidCoordinates(),
            nbCoordinatesValid = coordinatesValid.length,
            colors = [Lyngk.Color.BLACK, Lyngk.Color.IVORY, Lyngk.Color.BLUE, Lyngk.Color.RED, Lyngk.Color.GREEN, Lyngk.Color.WHITE];

        for (i = 0; i < colors.length; i++) {
            var nbRepeatedColors = 0;
            while (nbRepeatedColors < 8 && nbIntersectionsRemplis < nbCoordinatesValid) {
                var coordinatesSplicedLength = coordinatesValid.length,
                    indiceTab = Math.floor((Math.random() * coordinatesSplicedLength) + 0),
                    c = coordinatesValid[indiceTab].charAt(0),
                    l = coordinatesValid[indiceTab].charAt(1),
                    intersection = new Lyngk.Intersection(c, l);

                intersection.setPiece(new Lyngk.Piece(colors[j]));
                contentPlateauInitial[coordinatesValid[indiceTab]] = intersection;
                nbRepeatedColors++;
                nbIntersectionsRemplis++;
                coordinatesValid.splice(indiceTab, 1);
            }
            j++;
        }
    }

    this.getPlateauInitial = function () {
        return contentPlateauInitial;
    }

};
