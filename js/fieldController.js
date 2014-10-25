define(['jquery', 'figure'], function($, Figure){

    function FieldController(){
        this.fieldCells = new Array(20);

        this.init();
        this.figure = new Figure();
        this.paintFigure();
        console.log('Field created');
    }

    FieldController.prototype.init = function (){
        var cells = $('.cell'),
            cellCounter = 0;
        for(var i = 0; i < 20; i++){
            this.fieldCells[i]= [];
            for(var j = 0; j < 10; j++){
                this.fieldCells[i].push({
                    cell : cells.eq(cellCounter),
                    active : 0
                });
                cellCounter++;
            }
        }
        this.refreshField();

    };

    FieldController.prototype.refreshField = function(){
        for(var i = 0; i < this.fieldCells.length; i++){
            for(var j = 0; j < this.fieldCells[i].length; j++){
                if(this.fieldCells[i][j].active){
                    this.fieldCells[i][j].cell.addClass('active');
                }
                else{
                    this.fieldCells[i][j].cell.removeClass('active');
                }
            }
        }
    };

    FieldController.prototype.paintFigure = function(clear){
        var figureCoords = this.figure.getCoordinates(),
            classMethod = clear ? 'removeClass' : 'addClass';

        for(var i = 0; i < figureCoords.length; i++){
            for(var j = 0; j < figureCoords.length; j++){
                if(figureCoords[i][j].active){
                    this.fieldCells[figureCoords[i][j].y][figureCoords[i][j].x].cell[classMethod]('active');
                }
            }
        }
    };

    return FieldController;
});
