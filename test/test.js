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
