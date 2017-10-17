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
    var piece = new Lyngk.Piece(Lyngk.Color.IVORY);

    intersection.setPiece(piece);

    assertEquals(intersection.getColor(),Lyngk.Color.IVORY);
    assertEquals(intersection.getState(),Lyngk.State.ONE_PIECE);
}