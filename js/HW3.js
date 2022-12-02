// Name: Theophilus Opoku 
// Email: Theophilus_OpokuAfriyie@student.uml.edu
// Web Design Multiplication Table
// 
// 


var inputForm = document.getElementById('inputForm');
var multTable = document.getElementById('multTable');
var tableHolder = document.getElementById('tableHolder');

tableHolder.style.visibility = "hidden";//keeps table hidden till created
var build = ''; //empty holder for table

var inputValidated = false;
errors = document.getElementById('error');
var errormsg = [];  //empty holder for error message






const validateInputs = () => {
    inputValidated = true;
    errormsg.splice(0, errormsg.length);
    //gets input from form
    mincol = document.getElementById('mincol');
    maxcol = document.getElementById('maxcol');
    minrow = document.getElementById('minrow');
    maxrow = document.getElementById('maxrow');

    //Error Validation set between -100 to 100
    if (mincol.value > 101 || mincol.value < -101 || maxcol.value > 101 || maxcol.value < -101 || minrow.value > 101 || minrow.value < -101 ||maxrow.value > 101 || maxrow.value < -101){
        errormsg.push('Numbers must be between -100 and 100!');
        inputValidated = false;
        return;
    }

    if (parseInt(maxcol.value) <= parseInt(mincol.value) || parseInt(maxrow.value) <= parseInt(minrow.value)){
        errormsg.push('Minimum values must be less than the Maximum values!');
        inputValidated = false;
        return;
    }else{
    errormsg.splice(0, errormsg.length);
    errors.innerText = '';
    }

};


inputForm.addEventListener("submit", (e) => { //creates table upon recieving enter or submit clicked
    e.preventDefault();
    validateInputs();
    build = ''
    multTable.innerHTML = ''
    if (inputValidated == false){
        errors.innerText = errormsg.join(' ,');
    }else{
        console.log("form was valid");
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
        }
        tableHolder.style.visibility = "visible";
        multTable.innerHTML = build;
    }

})

