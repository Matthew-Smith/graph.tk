var rowCount = 0;
var currentSelection = 0;


$(document).ready(function() {
    var table = document.createElement('table');
    table.className="selectableTable";

    var thead = document.createElement('thead');
    thead.innerHTML ='<tr> <th>Icon</th> <th>User</th> <th>Last Guess</th> <th>Modified</th> </tr>';

    var tbody = document.createElement('tbody');
    tbody.id = 'loadBody';

    table.appendChild(thead);
    table.appendChild(tbody);

    $('#tableDiv').append(table);

    var insertButton = document.getElementById('insertButton');
    insertButton.addEventListener('click', newListItemEvent, false);


    var submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', function() {
        alert(getSelectedRow());
    }, false);
});

function getSelectedRow() {
    if(currentSelection != 0) {
        return currentSelection;
    }
    else {
        return 'Nothing Selected';
    }
}

function newListItemEvent() {
    addListItem('http://graph.tk#r<sin(4theta)','Matthew Smith', 'r<sin(\\theta)', '12', 'September', '1988');
}

function addListItem(iconSrc, creator, lastGuess, day, month, year){
    rowCount++;
    var tr = document.createElement('tr');
    tr.id = rowCount;
    if(rowCount%2==0) {
        tr.className = 'even';
    }
    var icon = document.createElement('td');
    var minigraph = document.createElement('iframe');
    minigraph.style.height = '64px';
    minigraph.style.width = '128px';
    minigraph.setAttribute('frameborder', '0px');
    minigraph.setAttribute('src',iconSrc);
    icon.appendChild(minigraph);

    var name = document.createElement('td');
    name.innerHTML = creator;

    var equation = document.createElement('td');
    $('<span/>').mathquill().appendTo(equation).mathquill('latex',lastGuess);

    var date = document.createElement('td');
    date.appendChild(createDate(day, month, year));

    tr.appendChild(icon);
    tr.appendChild(name);
    tr.appendChild(equation);
    tr.appendChild(date);

    $("#loadBody").append(tr);

    tr.addEventListener('click', rowEvent, false);

}

function rowEvent() {
    if( $(this).is( '.selectedRow' ) ) {
        $(this).removeClass('selectedRow');
        currentSelection = 0;
    } else {
        if(currentSelection != 0) {
            $('.selectedRow').removeClass('selectedRow');
        }
        $(this).addClass('selectedRow');
        currentSelection = this.id;
    }
}

function createDate(day, month, year) {
    var date = document.createElement('div');
    date.className = 'date';

    var dd = document.createElement('span');
    dd.className = 'day';
    dd.innerHTML = day;

    var mm = document.createElement('span');
    mm.className = 'month';
    mm.innerHTML = month;

    var yy = document.createElement('span');
    yy.className = 'year';
    yy.innerHTML = year;

    date.appendChild(dd);
    date.appendChild(mm);
    date.appendChild(yy);

    return date;
}