function postCalculate() {
  fetch('calc', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'calc': document.getElementById("equate").value
    })
  }).then(function(res) {
    if (res.ok) {
      return res.json()
    }
  }).then(function(data) {
    if (data.value == null) {
      document.getElementById("result").innerHTML = "Div by zero!";
      document.getElementById("equate").value = ""
      document.getElementById("operation").style.display = "none";
    }
    else {
      var prevOp = document.getElementById("operation")
      document.getElementById("result").innerHTML = data.value;
      if (prevOp.innerHTML == "=") {
        document.getElementById("equate").value = ""
      }
      else {
        if (prevOp.innerHTML == "÷") {
          document.getElementById("equate").value = data.value + "/"
        }
        else if (prevOp.innerHTML == "x") {
          document.getElementById("equate").value = data.value + "*"
        }
        else {
          document.getElementById("equate").value = data.value + prevOp.innerHTML;
        }
      }
    }
    
  })
}

function addDigit(e) {
  var dest = document.getElementById("equate")
  var prevOp = document.getElementById("operation")
  var res = document.getElementById("result")
  if (dest.value.replace("*","x").replace("/","÷") == res.innerHTML + prevOp.innerHTML || dest.value == "") {
    res.innerHTML = e.innerHTML
  }
  else {
    res.innerHTML += e.innerHTML
  }
  dest.value = dest.value + e.innerHTML
  prevOp.style.display = "none";
}

function produceCalc(e) {
  if (document.getElementById("equate").value != "") {
    var operator = e.innerHTML
    var prevOp = document.getElementById("operation")
    prevOp.innerHTML = operator
    prevOp.style.display = "inline-block";
    postCalculate()
  }
}

function clearError() {
  var dest = document.getElementById("equate")
  var prevOp = document.getElementById("operation")
  var res = document.getElementById("result")
  if (dest.value == "" || prevOp.innerHTML == "=") {
    clearAll()
  }
  else {
    eqArray = dest.value.split(prevOp.innerHTML)
    res.innerHTML = eqArray[0]
    dest.value = eqArray[0] + prevOp.innerHTML
    prevOp.style.display = "inline-block";
  }
}

function clearAll() {
  var res = document.getElementById("result").innerHTML = "0"
  document.getElementById("equate").value = ""
  document.getElementById("operation").style.display = "none";
}