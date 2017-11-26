"use strict";

// enums definition
Lyngk.Color = {BLACK: 0, IVORY: 1, BLUE: 2, RED: 3, GREEN: 4, WHITE: 5};
Lyngk.Player = {ONE: 1, TWO: 2};

Lyngk.Engine = function () {
    var contentPlateau = {};
    var currentPlayer = Lyngk.Player.ONE;

    this.init = function () {
        var i,
            j = 0,
            nbIntersectionsRemplis = 0,
            coordinate = new Lyngk.Coordinates(''),
            coordinatesValid = coordinate.getValidCoordinates(),
            nbCoordinatesValid = coordinatesValid.length,
            nbRepeatedColors,
            colors = [Lyngk.Color.BLACK, Lyngk.Color.IVORY, Lyngk.Color.BLUE, Lyngk.Color.RED, Lyngk.Color.GREEN, Lyngk.Color.WHITE];
        for (i = 0; i < colors.length; i += 1) {
            nbRepeatedColors = 0;
            while (nbRepeatedColors < 8 && nbIntersectionsRemplis < nbCoordinatesValid) {
                var indiceTab = this.getIndiceTab(coordinatesValid.length),
                    colonne = coordinatesValid[indiceTab].charAt(0),
                    ligne = coordinatesValid[indiceTab].charAt(1),
                    intersection = new Lyngk.Intersection(colonne, ligne);
                intersection.setPiece(new Lyngk.Piece(colors[j]));
                contentPlateau[coordinatesValid[indiceTab]] = intersection;
                nbRepeatedColors += 1;
                nbIntersectionsRemplis += 1;
                coordinatesValid.splice(indiceTab, 1);
            }
            j += 1;
        }
    };
    this.getIndiceTab = function (coordinatesLength) {
        Math.seedrandom('isidis-i2l');
        return Math.floor((Math.random() * coordinatesLength) + 0);
    };
    this.getPlateauInitial = function () {
        return contentPlateau;
    };
    this.move = function (intersectionDepart, intersectionArrivee) {
        var i,
            directionValid = this.checkDirection(intersectionDepart, intersectionArrivee),
            possibilityMove = this.checkPossibilityMove(intersectionDepart, intersectionArrivee),
            hauteurPileIsCorrect = this.checkHauteurPileIsCorrect(intersectionDepart, intersectionArrivee),
            intersectionArriveeIsEmpty = this.checkArrivalCoordinateNotEmpty(intersectionArrivee),
            notRepeatedColors = this.checkRepeatedColorsPile(intersectionDepart, intersectionArrivee);
        if (intersectionArriveeIsEmpty && directionValid && possibilityMove && hauteurPileIsCorrect && notRepeatedColors) {
            for (i = 0; i < intersectionDepart.getHauteur(); i += 1) {
                intersectionArrivee.setPiece(intersectionDepart.getPiecesPosees()[i]);
            }
            intersectionDepart.removePile();
        }
    };
    this.checkArrivalCoordinateNotEmpty = function (intersectionArrivee) {
        return intersectionArrivee.getState() !== Lyngk.State.VACANT;
    };
    this.checkDirection = function (intersectionDepart, intersectionArrivee) {
        var colonneIntersectionDepart = intersectionDepart.getIntersection().charAt(0);
        var ligneIntersectionDepart = intersectionDepart.getIntersection().charAt(1);

        var colonneIntersectionArrivee = intersectionArrivee.getIntersection().charAt(0);
        var ligneIntersectionArrivee = intersectionArrivee.getIntersection().charAt(1);

        var deltaColonne = colonneIntersectionArrivee.charCodeAt(0) - colonneIntersectionDepart.charCodeAt(0);
        var deltaLigne = ligneIntersectionArrivee - ligneIntersectionDepart;

        return deltaColonne === deltaLigne || colonneIntersectionDepart === colonneIntersectionArrivee || ligneIntersectionArrivee === ligneIntersectionDepart;
    };
    this.checkPossibilityMove = function (a, b) {
        var deltaC = this.getValueAsciiColonne(b) - this.getValueAsciiColonne(a);
        var deltaL = this.getLigneOfIntersection(b) - this.getLigneOfIntersection(a);
        if (this.checkDeltaIsValid(deltaC, deltaL)) {
            deltaC = this.getValueDelta(deltaC);
            deltaL = this.getValueDelta(deltaL);
            var i = this.getValueAsciiColonne(a) + deltaC,
                j = this.getLigneOfIntersection(a) + deltaL;
            while (i !== this.getValueAsciiColonne(b) || j !== this.getLigneOfIntersection(b)) {
                if (this.checkArrivalCoordinateNotEmpty(contentPlateau[String.fromCharCode(65 + i) + j])) {
                    return false;
                }
                i += deltaC;
                j += deltaL;
            }
        }
        return true;
    };
    this.getValueAsciiColonne = function (coordonnee) {
        return (coordonnee.getIntersection().charAt(0).charCodeAt(0)) - 65;
    };
    this.getLigneOfIntersection = function (coordonnee) {
        return parseInt(coordonnee.getIntersection().charAt(1));
    };
    this.checkDeltaIsValid = function (deltaC, deltaL) {
        return (deltaC === deltaL) || (deltaL === 0 && deltaC !== 0) || (deltaL !== 0 && deltaC === 0);
    };
    this.getValueDelta = function (delta) {
        if (delta > 0) {
            delta = 1;
        } else if (delta < 0) {
            delta = -1;
        } else {
            delta = 0;
        }
        return delta;
    };
    this.checkHauteurPileIsCorrect = function (intersectionDepart, intersectionArrivee) {
        var coordIntersectionDepart = intersectionDepart.getIntersection().toString();
        var coordIntersectionArrivee = intersectionArrivee.getIntersection().toString();
        var stateCoordIntersectionDepart = contentPlateau[coordIntersectionDepart].getHauteur();
        var stateCoordIntersectionArrivee = contentPlateau[coordIntersectionArrivee].getHauteur();

        var moveImpossibleIfOnePiece = stateCoordIntersectionDepart === 1 && stateCoordIntersectionArrivee > 1;
        var moveImpossiblePieceOnPile = stateCoordIntersectionArrivee + stateCoordIntersectionDepart > 5;
        var moveImpossibleHigherPile = stateCoordIntersectionArrivee > stateCoordIntersectionDepart;
        return !moveImpossiblePieceOnPile && !moveImpossibleIfOnePiece && !moveImpossibleHigherPile;
    };
    this.checkRepeatedColorsPile = function (intersectionDepart, intersectionArrivee) {
        var colorsDepart = [], colorsArrivee = [];
        intersectionDepart.getPiecesPosees().forEach(function(element) {
            if (element !== Lyngk.Color.WHITE) {
                colorsDepart.push(element);
            }
        });
        intersectionArrivee.getPiecesPosees().forEach(function(element) {
            if (element !== Lyngk.Color.WHITE) {
                colorsArrivee.push(element);
            }
        });

        var colorsDuplicated = [];
        colorsDepart.forEach(function (element) {
            if (colorsArrivee.indexOf(element) > -1) {
                colorsDuplicated.push(element);
            }
        });
        return colorsDuplicated.length === 0;
    };
    this.getCurrentPlayer = function () {
        return currentPlayer;
    };
};
