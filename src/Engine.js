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

    this.move = function(intersectionDepart, intersectionArrivee) {
        var directionValid = this.checkDirection(intersectionDepart, intersectionArrivee);
        var possibilityMove = this.checkPossibilityMove(intersectionDepart, intersectionArrivee);
        var hauteurPileIsCorrect = this.checkHauteurPileIsCorrect(intersectionDepart, intersectionArrivee);
        if(intersectionArrivee.getState() != Lyngk.State.VACANT && directionValid && possibilityMove && hauteurPileIsCorrect) {
            for (var i = 0; i < intersectionDepart.getHauteur(); i++) {
                intersectionArrivee.setPiece(intersectionDepart.getPiecesPosees()[i]);
            }
            intersectionDepart.removePile();
        }
    }

    this.checkDirection = function(intersectionDepart, intersectionArrivee) {
        var colonneIntersectionDepart = intersectionDepart.getIntersection().charAt(0);
        var ligneIntersectionDepart = intersectionDepart.getIntersection().charAt(1);

        var colonneIntersectionArrivee = intersectionArrivee.getIntersection().charAt(0);
        var ligneIntersectionArrivee = intersectionArrivee.getIntersection().charAt(1);

        var temp = colonneIntersectionArrivee.charCodeAt(0) - colonneIntersectionDepart.charCodeAt(0);
        var temp2 = ligneIntersectionArrivee - ligneIntersectionDepart;

        if(temp == temp2 || colonneIntersectionDepart == colonneIntersectionArrivee || ligneIntersectionArrivee == ligneIntersectionDepart){
            return true;
        } else {
            return false;
        }
    }

    this.checkPossibilityMove = function (a, b) {
        var deltaC = (b.getIntersection().charAt(0).charCodeAt(0) - 65) - (a.getIntersection().charAt(0).charCodeAt(0) - 65);
        var deltaL = b.getIntersection().charAt(1)-a.getIntersection().charAt(1);

        if ( (deltaC == deltaL) || (deltaL == 0 && deltaC != 0 ) || (deltaL != 0 && deltaC == 0 )) {

            if (deltaC > 0) deltaC = 1;
            if (deltaC < 0) deltaC = -1;
            if (deltaL > 0) deltaL = 1;
            if (deltaL < 0) deltaL = -1;

            var i = (a.getIntersection().charAt(0).charCodeAt(0)- 65)+ deltaC;
            var j = parseInt(a.getIntersection().charAt(1)) + deltaL;
            var ok = true;
            while (ok && (i != (b.getIntersection().charAt(0).charCodeAt(0)-65) || j != parseInt(b.getIntersection().charAt(1)))) {
                var intersection = String.fromCharCode(65+i) + j;
                if (contentPlateauInitial[intersection].getState() != Lyngk.State.VACANT) ok = false;

                i += deltaC;
                j += deltaL;
            }
        }
        return ok;
    }

    this.checkHauteurPileIsCorrect = function (intersectionDepart, intersectionArrivee) {
        var coordIntersectionDepart = intersectionDepart.getIntersection().toString();
        var coordIntersectionArrivee = intersectionArrivee.getIntersection().toString();

        if(contentPlateauInitial[coordIntersectionArrivee].getHauteur() + contentPlateauInitial[coordIntersectionDepart].getHauteur() > 5){
            return false;
        }
        return true;
    }
};
