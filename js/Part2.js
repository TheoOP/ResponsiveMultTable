// Name: Theophilus Opoku 
// Email: Theophilus_OpokuAfriyie@student.uml.edu
// Web Design Multiplication Table
// 
// 



$(document).ready(function(){
    var multTable = document.getElementById('multTable');
    var tableHolder = document.getElementById('tableHolder');
    var tH = $('tableHolder');
    var ulHolder = $('#unorderedlistholder');

    var build = ''; //empty holder for table
    
    tableHolder.style.visibility = "hidden";//keeps table hidden till created

    function onlyNumbers(str) {
        return /^-?[0-9]+$/.test(str);
    }

    //rules methods for validation
    jQuery.validator.addMethod("isNum", function(value, element) {
        return this.optional(element) || (onlyNumbers(value));
    }, "* Input must be an integer not a decimal or other character");

    jQuery.validator.addMethod("insideValidRange", function(value, element) {
        return this.optional(element) || ((parseInt(value) > -101) && parseInt(value) < 101);
    }, "* Input must be between -100 and 100");

    jQuery.validator.addMethod("isGreaterThanMinCol", function(value, element) {
        return this.optional(element) || (parseInt(value) > parseInt(document.getElementById('mincol').value));
    }, "* Maximum Column value must be greater than Minimum Column value");

    jQuery.validator.addMethod("isGreaterThanMinRow", function(value, element) {
    return this.optional(element) || (parseInt(value) > parseInt(document.getElementById('minrow').value));
    }, "* Maximum Row value must be greater than Minimum Row value");


    //beginning two way binding with slider update when slider changes
    var colOut1 = $('#colOutput1');
    var colOut2 = $('#colOutput2');

    var arrow = $("#arrow");
    var slider1st = $("#slider1");
    slider1st.slider({
        range : true,
        min: -100,
        max: 100,
        values: [1, 10],
        slide: function (event, ui){
            colOut1.html(ui.values[0]);
            colOut2.html(ui.values[1]);
            $("#mincol").val(ui.values[0]);
            $("#maxcol").val(ui.values[1]);
            buildTable();
        },
        stop: function (event, ui){
            $("#mincol").val(ui.values[0]);
            $("#maxcol").val(ui.values[1]);
        }
    });

    colOut1.html(slider1st.slider('values',0));
    colOut2.html(slider1st.slider('values',1));
    $("#mincol").val(slider1st.slider('values',0));
    $("#maxcol").val(slider1st.slider('values',1));

    var rowOut1 = $('#rowOutput1');
    var rowOut2 = $('#rowOutput2');

    var arrow = $("#arrow");
    var slider2nd = $("#slider2");
    slider2nd.slider({
        range : true,
        min: -100,
        max: 100,
        values: [0, 5],
        slide: function (event, ui){
            rowOut1.html(ui.values[0]);
            rowOut2.html(ui.values[1]);
            $("#minrow").val(ui.values[0]);
            $("#maxrow").val(ui.values[1]);
            buildTable();
        },
        stop: function (event, ui){
            $("#minrow").val(ui.values[0]);
            $("#maxrow").val(ui.values[1]);
        }
    });
    rowOut1.html(slider2nd.slider('values',0));
    rowOut2.html(slider2nd.slider('values',1));
    $("#minrow").val(slider2nd.slider('values',0));
    $("#maxrow").val(slider2nd.slider('values',1));

    function buildTable(){  //creates table
        mincol = document.getElementById('mincol');
        maxcol = document.getElementById('maxcol');
        minrow = document.getElementById('minrow');
        maxrow = document.getElementById('maxrow');
        errors = document.getElementById('error');
        build = ''
        multTable.innerHTML = ''
    
        for(var i = parseInt(minrow.value) - 1; i <= parseInt(maxrow.value); i++){
            build += "<tr>"
            for (var j = parseInt(mincol.value) - 1; j<= parseInt(maxcol.value);j++){
                if(i == parseInt(minrow.value) - 1 && j == parseInt(mincol.value) - 1){ //Places a multiplication x in top left box
                    build += "<th>" + "X" +"</th>"
                    continue;
                }
                if(i == parseInt(minrow.value) - 1){//fills the top row
                    build += "<th>" + j +"</th>";
                    continue;
                }
                if(j == parseInt(mincol.value) - 1){//fills the left column
                    build += "<th>" + i +"</th>";
                    continue;
                }
                build += "<td>" + i * j +"</td>"; //fills remaining boxes with result of the row and col multiplied
            }
            
            tableHolder.style.visibility = "visible";
            multTable.innerHTML = build;
        }
    }





    $("#inputForm").on ('change submit', function(e){
        e.preventDefault();

        $("#inputForm").validate(   //input validation implemented as depicted in plugin documentation
            {
                errorPlacement: function(label, element) {
                    label.addClass('err');
                    label.insertAfter(element);
                },
                wrapper: 'div',
                rules : {
                    mincol: {
                        required: true,
                        isNum: true,
                        insideValidRange: true
                    },
                    maxcol: {
                        required: true,
                        isNum: true,
                        insideValidRange: true,
                        isGreaterThanMinCol: true
                    },
                    minrow: {
                        required: true,
                        isNum: true,
                        insideValidRange: true
                    },
                    maxrow: {
                        required: true,
                        isNum: true,
                        insideValidRange: true,
                        isGreaterThanMinRow: true   
                    }
                },
                messages : {
                    mincol: {
                        required: "This field is required. Please enter an integer value",
                        isNum: "Input must be an integer not a decimal or a string",
                        insideValidRange: "Minimum Column Value must be between -100 and 100"
                    },
                    maxcol: {
                        required: "This field is required. Please enter an integer value",
                        isNum: "Input must be an integer not a decimal or a string",
                        insideValidRange: "Maximum Column Value must be between -100 and 100",
                        isGreaterThanMinCol: "Maximum Column Value must be greater than Minimum Column Value"
                    },
                    minrow: {
                        required: "This field is required. Please enter an integer value",
                        isNum: "Input must be an integer not a decimal or a string",
                        insideValidRange: "Minimum Row Value must be between -100 and 100"
                    },
                    maxrow: {
                        required: "This field is required. Please enter an integer value",
                        isNum: "Input must be an integer not a decimal or a string",
                        insideValidRange: "Maximum Row Value must be between -100 and 100",
                        isGreaterThanMinRow: "Maximum Row Value must be greater than Minimum Row Value",        
                    },
                }
            }

        );


        //second part of two way binding (update when input is changed)
        slider1st.slider( "option", "values", [parseInt(document.getElementById('mincol').value), parseInt(document.getElementById('maxcol').value)]);
        colOut1.val(slider1st.slider('values',0));
        colOut2.val(slider1st.slider('values',1));
        $("#mincol").val(slider1st.slider('values',0));
        $("#maxcol").val(slider1st.slider('values',1));
        
        slider2nd.slider( "option", "values", [parseInt(document.getElementById('minrow').value), parseInt(document.getElementById('maxrow').value)]);   
        rowOut1.html(slider2nd.slider('values',0));
        rowOut2.html(slider2nd.slider('values',1));
        $("#minrow").val(slider2nd.slider('values',0));
        $("#maxrow").val(slider2nd.slider('values',1));
        if($("#inputForm").valid()){
            buildTable();
        };


    });


    var numTables = 0;
    $("#inputForm").on ('submit', function(e){ 
                 //process to save tables when submit is clicked
        if($("#inputForm").valid()){         
            var $div = $('table[id^="multTable"]:first');       
            var $clone = $div.clone().prop('id', 'multTable'+numTables );
            $div.after($clone);
            
            
            // $('div.tableHolder').append('<table id= "multTable'+ numTables+'"' + tableHolder.innerHTML + '</li>');
            buildTable();
            // var $tab = $('ul[id^="link"]:first');
            // var $tabClone = $tab.clone().prop('id', 'link'+numTables );
            // $tab.after($tabClone);


            if(numTables == 0){//process to add tab links to tables
                ulHolder.append('<li>' +'<a href="#multTable"> Current' + '</li>');        //append to tab list for first case
                ulHolder.append('<li>' +'<a href="#multTable0">' + ' Col('+ document.getElementById('mincol').value+' -> '+document.getElementById('maxcol').value +') x ' + 'Row(' + document.getElementById('minrow').value+' -> '+document.getElementById('maxrow').value + ')</li>');
            }else{
                ulHolder.append('<li>' +'<a href="#multTable'+ numTables+ '"> Col('+ document.getElementById('mincol').value+' -> '+document.getElementById('maxcol').value +') x ' + 'Row(' + document.getElementById('minrow').value+' -> '+document.getElementById('maxrow').value + ')</li>'); //append for remaining cases
            }
            numTables++;    //keep track of number of tables being created
        }    // $("#myTabs").tabs("load", "#multtable" + numTables);
        });
        $("#myTabs").tabs();



    

});
