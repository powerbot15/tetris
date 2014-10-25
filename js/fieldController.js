define(['jquery', 'figure'], function($, Figure){

    function FieldController(){
        this.fieldCells = [];
        this.init();
        console.log('Field created');
    }

    FieldController.prototype.init = function (){
        var cells = $('.cell');
        for(var i = 0; i < 20; i++){
            this.fieldCells[i] = Array.apply(null, new Array(10)).map(Number.prototype.valueOf, 0);
        }
    };

    return FieldController;
});
