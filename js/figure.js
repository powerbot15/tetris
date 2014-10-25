define(['jquery'],function($){
    var FIGURE_PRIMITIVES = {
        square : {
            topLeft : {x : 4, y : 0},
            points : [
                [1, 1],
                [1, 1]
            ]
        },

        line : {
            topLeft : {x : 3, y : 0},
            points : [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ]
        },
        trident : {
            topLeft : {x : 3, y : 0},
            points : [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ]
        },
        leftUpBlock : {
            topLeft : {x : 4, y : 0},
            points : [
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0]
            ]

        },
        rightUpBlock : {
            topLeft : {x : 4, y : 0},
            points : [
                [0, 1, 0],
                [1, 1, 0],
                [1, 0, 0]
            ]
        }

    };
    function Figure(){
        this.figure = FIGURE_PRIMITIVES.trident;
        this.rotateMatrix = new Array(this.figure.points.length);
        for(var i = 0; i < this.rotateMatrix.length; i++){
            this.rotateMatrix[i] = new Array(this.figure.points.length);
            for(var j = 0; j < this.rotateMatrix[i].length; j++){
                this.rotateMatrix[i][j] = 0;
            }
        }
    }

    Figure.prototype.rotate = function(){
        var length = this.figure.points.length;
        //for(var i = 0; i < this.figure.points.length; i++){
        //    for(var j = 0; j < this.figure.points.length; j++){
        //        this.rotateMatrix[j][i] = this.figure.points[i][j];
        //    }
        //}
        //console.dir(this.rotateMatrix);
        for(var i=0;i<length;i++){
            for(var j=0;j<length;j++){
                this.rotateMatrix[j][length-1-i] = this.figure.points[i][j];
            }
        }
        for(var i = 0; i < length; i++){
            for(var j = 0; j < length; j++){
                this.figure.points[i][j] = this.rotateMatrix[i][j];
            }
        }

        //console.dir(this.rotateMatrix);
        //TNEW[j][n-1-i]=TOLD[i][j];
    };

    Figure.prototype.getCoordinates = function(){
        var coordinates = new Array(this.figure.points.length);

        for(var i = 0; i < coordinates.length; i++){
            coordinates[i] = new Array(this.figure.points.length);
            for(var j = 0; j < coordinates[i].length; j++){
                coordinates[i][j] = {
                    active : this.figure.points[i][j],
                    x : this.figure.topLeft.x + j,
                    y : this.figure.topLeft.y + i
                };
            }
        }
        return coordinates;
    };
    return Figure;

});
