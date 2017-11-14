'use strict';

var LyngkTestCase = TestCase("LyngkTestCase");

LyngkTestCase.prototype.testStory1 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);

    assertFalse(coordinates.is_valid());
};

LyngkTestCase.prototype.testStory2 = function () {
    var i, j, numberCoordinates = 0;
    var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    for (i = 1; i < 10; i++) {
        for (j = 0; j < letters.length; j++) {
            var coordinate = new Lyngk.Coordinates(letters[j], i);
            if (coordinate.is_valid() == true) {
                numberCoordinates++;
            }
        }
    }
    assertEquals(43,numberCoordinates);
}

LyngkTestCase.prototype.testStory3 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);

    assertString(coordinates.is_string());
}

LyngkTestCase.prototype.testStory4 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);

    assertString(coordinates.is_string());
}

LyngkTestCase.prototype.testStory5 = function () {
    var coordinates = new Lyngk.Coordinates('A', 1);

    var coordinatesCloned = coordinates.clone();

    assertEquals(coordinates.is_string(), coordinatesCloned.is_string());
}

LyngkTestCase.prototype.testStory6 = function () {
    var coordinates = new Lyngk.Coordinates('A', 3);
    var coordinates2 = new Lyngk.Coordinates('A', 4);

    if (coordinates.is_valid() == true && coordinates2.is_valid() == true)
        assertNotEquals(coordinates.hash(), coordinates2.hash());
}

LyngkTestCase.prototype.testStory7 = function () {
    var intersection = new Lyngk.Intersection('A',3);

    assertEquals(intersection.getState(),Lyngk.State.VACANT);
}

LyngkTestCase.prototype.testStory8 = function () {
    var intersection = new Lyngk.Intersection('A',3);
    var piece = new Lyngk.Piece(Lyngk.Color.BLUE);

    intersection.setPiece(piece);

    assertEquals(intersection.getColor(),Lyngk.Color.BLUE);
    assertEquals(intersection.getState(),Lyngk.State.ONE_PIECE);
}

LyngkTestCase.prototype.testStory9 = function () {
    var intersection = new Lyngk.Intersection('A', 3);
    var pieceBleue = new Lyngk.Piece(Lyngk.Color.BLUE);
    var pieceRouge = new Lyngk.Piece(Lyngk.Color.RED);

    intersection.setPiece(pieceBleue);
    intersection.setPiece(pieceRouge);

    assertEquals(intersection.getColor(), Lyngk.Color.RED);
    assertEquals(intersection.getState(), Lyngk.State.STACK);
}

LyngkTestCase.prototype.testStory10 = function () {
    var intersection = new Lyngk.Intersection('A', 3);
    var pieceBleue = new Lyngk.Piece(Lyngk.Color.BLUE);

    for (var i = 0; i < 5; i++) {
        intersection.setPiece(pieceBleue);
    }

    assertEquals(intersection.getState(), Lyngk.State.FULL_STACK);
}

LyngkTestCase.prototype.testStory11 = function () {
    var coordinates = new Lyngk.Coordinates(''),
        validCoordinates = coordinates.getValidCoordinates(),
        engine = new Lyngk.Engine(),
        plateau,
        i = 0,
        nbIntersections = 0;

    engine.init();
    plateau = engine.getPlateauInitial();

    for (i = 0; i < Object.keys(plateau).length; i++) {
        var stateIntersection = plateau[validCoordinates[i]].getState();
        assertEquals(stateIntersection, Lyngk.State.ONE_PIECE);
        nbIntersections++;
    }
    assertEquals(nbIntersections, 43);
}

LyngkTestCase.prototype.testStory12 = function () {
    var coordinates = new Lyngk.Coordinates(''),
        validCoordinates = coordinates.getValidCoordinates(),
        engine = new Lyngk.Engine(),
        plateau,
        i = 0,
        nbIntersections = 0,
        repartitionColor = false,
        nbEachColor = {'black': 0, 'ivory': 0, 'blue': 0, 'red': 0, 'green': 0, 'white': 0};

    engine.init();
    plateau = engine.getPlateauInitial();

    for (i = 0; i < Object.keys(plateau).length; i++) {
        var stateIntersection = plateau[validCoordinates[i]].getState(),
            colorIntersection = plateau[validCoordinates[i]].getColor();
        switch (colorIntersection) {
            case 0 : nbEachColor.black ++; break;
            case 1 : nbEachColor.ivory ++; break;
            case 2 : nbEachColor.blue ++; break;
            case 3 : nbEachColor.red ++; break;
            case 4 : nbEachColor.green ++; break;
            case 5 : nbEachColor.white ++; break;
            default : ; break;
        }
        assertEquals(stateIntersection, Lyngk.State.ONE_PIECE);
        nbIntersections++;
    }

    if (nbEachColor.black == 8 && nbEachColor.ivory == 8 && nbEachColor.blue == 8 && nbEachColor.red == 8 &&nbEachColor.green == 8 && nbEachColor.white == 3) {
        repartitionColor = true;
    }

    assertTrue(repartitionColor);
    assertEquals(nbIntersections, 43);
}

LyngkTestCase.prototype.testStory13 = function () {
    var engine = new Lyngk.Engine(),
        plateau;

    engine.init();
    plateau = engine.getPlateauInitial();

    var keysPlateau = Object.keys(plateau);
    for(var i in keysPlateau){
        assertEquals(plateau[keysPlateau[i]].getHauteur(), 1);
    }
}

LyngkTestCase.prototype.testStory14 = function () {
    var engine = new Lyngk.Engine(),
        plateau,
        couleurPile = [];

    engine.init();
    plateau = engine.getPlateauInitial();

    var keysPlateau = Object.keys(plateau);
    for(var i in keysPlateau){
        assertEquals(plateau[keysPlateau[i]].getHauteur(), 1);
        couleurPile[keysPlateau[i]] = plateau[keysPlateau[i]].getColor();
    }

    for(var i in keysPlateau){
        assertEquals(couleurPile[keysPlateau[i]], plateau[keysPlateau[i]].getColor());
    }
}

LyngkTestCase.prototype.testStory15 = function () {
    var engine = new Lyngk.Engine(),
        plateau;

    engine.init();
    plateau = engine.getPlateauInitial();

    var couleurA3 = plateau['A3'].getColor();
    engine.move(plateau['A3'],plateau['B3']);

    assertEquals(plateau['A3'].getHauteur(), 0);
    assertEquals(plateau['B3'].getHauteur(), 2);
    assertEquals(plateau['B3'].getColor(), couleurA3);
}

LyngkTestCase.prototype.testStory16 = function () {
    var engine = new Lyngk.Engine(),
        plateau;

    engine.init();
    plateau = engine.getPlateauInitial();

    engine.move(plateau['A3'], plateau['B3']);
    var couleurB3 = plateau['B3'].getColor();
    engine.move(plateau['B3'], plateau['B2']);

    assertEquals(plateau['B3'].getHauteur(), 0);
    assertEquals(plateau['B2'].getHauteur(), 3);
    assertEquals(plateau['B2'].getColor(), couleurB3);
}

LyngkTestCase.prototype.testStory17 = function () {
    var engine = new Lyngk.Engine(),
        plateau;

    engine.init();
    plateau = engine.getPlateauInitial();

    engine.move(plateau['B2'], plateau['B3']);
    assertEquals(plateau['B2'].getHauteur(), 0);
    assertEquals(plateau['B3'].getHauteur(), 2);

    engine.move(plateau['B3'], plateau['B2']);
    assertEquals(plateau['B2'].getHauteur(), 0);
    assertEquals(plateau['B3'].getHauteur(), 2);
}

LyngkTestCase.prototype.testStory18 = function () {
    var engine = new Lyngk.Engine(),
        plateau;

    engine.init();
    plateau = engine.getPlateauInitial();

    var etatB3 = plateau['B3'].getHauteur();
    var etatC2 = plateau['C2'].getHauteur();

    engine.move(plateau['B3'], plateau['C2']);
    assertEquals(plateau['C2'].getHauteur(), etatC2);
    assertEquals(plateau['B3'].getHauteur(), etatB3);
}

LyngkTestCase.prototype.testStory19 = function () {
    var engine = new Lyngk.Engine(),
        plateau;

    engine.init();
    plateau = engine.getPlateauInitial();

    engine.move(plateau['I7'], plateau['H6']);
    engine.move(plateau['H6'], plateau['H5']);

    var etat = plateau['H5'].getState();
    engine.move(plateau['H5'], plateau['H8']);
    engine.move(plateau['H5'], plateau['F8']);
    engine.move(plateau['H5'], plateau['F3']);

    assertEquals(plateau['H5'].getState(), etat);
}

LyngkTestCase.prototype.testStory20 = function () {
    var engine = new Lyngk.Engine(),
        plateau;

    engine.init();
    plateau = engine.getPlateauInitial();

    engine.move(plateau['B4'], plateau['B3']);
    engine.move(plateau['B3'], plateau['B2']);
    engine.move(plateau['B2'], plateau['C2']);
    engine.move(plateau['C2'], plateau['D2']);

    var etat = plateau['D2'].getHauteur();
    engine.move(plateau['D2'], plateau['E2']);

    assertEquals(plateau['D2'].getHauteur(), etat);
}
