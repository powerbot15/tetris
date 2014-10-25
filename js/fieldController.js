define(['jquery', 'figure'], function($, Figure){

    function FieldController(){
        this.fieldCells = new Array(20);

        this.init();
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
                    active : false
                });
                cellCounter++;
            }
        }

        for(var i = 0; i < 10; i++){
            this.fieldCells[0][i].cell.addClass('active');
        }
        for(var i = 0; i < 20; i++){
            this.fieldCells[i][0].cell.addClass('active');
        }

    };

    return FieldController;
});
