define(['jquery'],function($){

    function Figure(){
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
            },
            leftLine :{
                topLeft : {x : 3, y : 0},
                points : [
                    [1, 1, 0],
                    [0, 1, 0],
                    [0, 1, 0]
                ]
            },
            rightLine :{
                topLeft : {x : 3, y : 0},
                points : [
                    [0, 1, 1],
                    [0, 1, 0],
                    [0, 1, 0]
                ]
            }


        };

        var primitiveNames = ['square', 'line', 'trident', 'leftUpBlock', 'rightUpBlock', 'leftLine', 'rightLine'];
        var figurePrimitiveIndex = Math.round(Math.random() * 6);
        this.figure = FIGURE_PRIMITIVES[primitiveNames[figurePrimitiveIndex]];
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

    };

    Figure.prototype.getCoordinates = function(){
        var coordinates = [];

        for(var i = 0; i < this.figure.points.length; i++){
            for(var j = 0; j < this.figure.points[i].length; j++){
                if(this.figure.points[i][j]){
                    coordinates.push({
                        //active : this.figure.points[i][j],
                        x : this.figure.topLeft.x + j,
                        y : this.figure.topLeft.y + i
                    });
                }
            }
        }
        return coordinates;
    };
    /**
     * @param direction Move direction, accepts string 'left'|'right'|'down'
     */
    Figure.prototype.move = function move(direction){
        switch(direction){
            case 'left' :
                this.figure.topLeft.x--;
                break;
            case 'right' :
                this.figure.topLeft.x++;
                break;
            case 'down' :
            //fall through
            default:
                this.figure.topLeft.y++;

        }
    };
    return Figure;

});
