// Name: Theophilus Opoku 
// Email: Theophilus_OpokuAfriyie@student.uml.edu
// Web Design Multiplication Table
// 
// 



$(document).ready(function(){
    var inputForm = document.getElementById('inputForm');
    var multTable = document.getElementById('multTable');
    var tableHolder = document.getElementById('tableHolder');
    
    var build = ''; //empty holder for table
    
    var inputValidated = false;
    var errormsg = [];  //empty holder for error message
    tableHolder.style.visibility = "hidden";//keeps table hidden till created

    console.log("here");
    function onlyNumbers(str) {
        return /^[0-9]+$/.test(str);
    }


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





    $("#inputForm").on ('change submit', function(e){
        e.preventDefault();
        // $("#inputForm").validate({});
        // alert("The text has been changed.");
        $("#inputForm").validate(
            {
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

    });

    $("#inputForm").on ('submit', function(e){
    console.log('OUT');
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
    });
    





});
