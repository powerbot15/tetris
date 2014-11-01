define(['jquery', 'figure'], function ($, Figure){

    function FieldController(){
        this.fieldCells = new Array(20);
        this.speed = 10;
        this.speedHimanize = 1;
        this.speedCounter = 0;
        this.currentStage = 10000;
        this.init();
        this.playerScore = 0;
        this.figure = new Figure();
        this.paintFigure();
        console.log('Field created');
        this.handleKeyMoves();
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
        //this.checkCollectedLines();
        this.gameCycleStart();
    };

    FieldController.prototype.refreshField = function (){
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

    FieldController.prototype.clearFigure = function (){
      this.paintFigure({clear : true});
    };

    FieldController.prototype.paintFigure = function (options){
        var figureCoords = this.figure.getCoordinates(),
            classMethod = options && options.clear ? 'removeClass' : 'addClass';

        for(var i = 0; i < figureCoords.length; i++){
            this.fieldCells[figureCoords[i].y][figureCoords[i].x].cell[classMethod]('active');
            this.fieldCells[figureCoords[i].y][figureCoords[i].x].active = !this.fieldCells[figureCoords[i].y][figureCoords[i].x].active;
        }
    };

    FieldController.prototype.canFigureMove = function (direction){

        var coordinatesToCheck = this.figure.getCoordinates();
        this.clearFigure();
        for(var i = 0; i < coordinatesToCheck.length; i++){
            if(direction === 'left'){
                coordinatesToCheck[i].x--;
                if(coordinatesToCheck[i].x < 0){
                    this.paintFigure();
                    return false;
                }
            }
            if(direction === 'right'){
                coordinatesToCheck[i].x++;
                if(coordinatesToCheck[i].x > 9){
                    this.paintFigure();
                    return false;
                }
            }
            if(direction === 'down'){
               if(++coordinatesToCheck[i].y > 19){
                   this.paintFigure();
                   //this.figure = new Figure();
                   return false;
               }
            }
            if(direction === 'new'){
                //check as is(new figure)
            }

        }
        if(direction === "rotate"){
            this.figure.rotate();
            coordinatesToCheck = this.figure.getCoordinates();
        }
        for (var i = 0; i < this.fieldCells.length; i++){
            for(var j = 0; j < this.fieldCells[i].length; j++){
                for(var k = 0; k < coordinatesToCheck.length; k++){
                    if(this.fieldCells[coordinatesToCheck[k].y][coordinatesToCheck[k].x].active){
                        if(direction === 'rotate'){
                            this.figure.resetRotate();
                        }
                        this.paintFigure();

                        return false;
                    }
                }
            }
        }
        if(direction === 'rotate'){
            this.figure.resetRotate();
        }
        this.paintFigure();
        return true;
    };

    FieldController.prototype.canFigureRotate = function(){
        //this.figure.rotate();

    };

    FieldController.prototype.checkCollectedLines = function (){
        var collectedRows = [];
        for(var i = 0; i < this.fieldCells.length; i++){
            var collected = true;
            for(var j = 0; j < this.fieldCells[i].length; j++){
                if(!this.fieldCells[i][j].active){
                    collected = false;
                    break;
                }
            }
            if(collected){
                collectedRows.push(i);
            }
        }
        if(collectedRows.length == 1){
            this.playerScore += 100;
        }
        else{
            if(collectedRows.length == 2){
                this.playerScore += 300;
            }
            else{
                if(collectedRows.length == 3){
                    this.playerScore += 500;
                }
                else{
                    if(collectedRows.length == 4){
                        this.playerScore += 1000;
                    }
                }
            }
        }
        $('.scores>.value').html(this.playerScore);
        $('.speed>.value').html(this.speedHimanize);
        collectedRows.length > 0 ? this.removeCollectedRows(collectedRows) : this.removeCollectedRows();
        if(this.playerScore > this.currentStage && this.playerScore < 100000){

            this.speed--;
            this.speedHimanize++;
            this.currentStage += 10000
        }
    };

    FieldController.prototype.removeCollectedRows = function (indexes){
        if(!(indexes && indexes.length > 0)){console.log('No lines collected'); return;}

        var row, column;
        for(var i = 0; i < indexes.length; i++){
            for(row = indexes[i]; row >= 0; row--){
                if(row == 0){
                    for(column = 0; column < this.fieldCells[row].length; column++){
                        this.fieldCells[row][column].active = 0;
                    }
                }
                else{
                    for(column = 0; column < this.fieldCells[row].length; column++){
                        this.fieldCells[row][column].active = this.fieldCells[row - 1][column].active;
                    }
                }
            }
        }
        this.refreshField();
    };

    FieldController.prototype.handleKeyMoves = function(){
        var self = this;
        $('body').on('keydown', function(event){
            if(event.keyCode == 37){
                if(this.canFigureMove('left')){
                    this.clearFigure();
                    this.figure.move('left');
                    this.paintFigure();
                }
            }
            if(event.keyCode == 39){
                if(this.canFigureMove('right')){
                    this.clearFigure();
                    this.figure.move('right');
                    this.paintFigure();
                }
            }
            if(event.keyCode == 40){
                if(this.canFigureMove('down')){
                    this.clearFigure();
                    this.figure.move('down');
                    this.paintFigure();
                }
                else{
                    this.checkCollectedLines();
                    this.refreshField();
                    this.figure = new Figure();
                    this.paintFigure();
                }

            }
            if(event.keyCode == 38){
                if(this.canFigureMove('rotate')){
                    this.clearFigure();
                    this.figure.rotate();
                    this.paintFigure();
                }
            }

        }.bind(this));
    };

    FieldController.prototype.gameCycleStart = function (){
        var self = this;
        setInterval(function(){
            self.speedCounter++;
            if(self.speedCounter < self.speed){
                self.speedCounter++;
                return;
            }
            self.speedCounter = 0;
            if(self.canFigureMove('down')){
                self.clearFigure();
                self.figure.move('down');
                self.paintFigure();
                self.refreshField();

            }
            else{
                self.checkCollectedLines();
                self.refreshField();
                self.figure = new Figure();
                self.paintFigure();
            }
        }, 100);
    };

    return FieldController;
});
