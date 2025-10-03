// Her setter du alle ressurser (samme som tidligere)
const ressurser = { /* ... kopier alle mapper og pdf-lister her ... */ };

// Sjekk passord
function sjekkPassord() {
  var passord = document.getElementById("passord").value;
  if (passord === "hemmelig123") {
    alert("Velkommen! 🎉");
    document.getElementById("login").style.display = "none";
    document.getElementById("innhold").style.display = "block";
    document.getElementById("logoContainer").style.display = "flex";
    document.body.style.background = "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)";
  } else {
    alert("Feil passord!");
  }
}

// Vis mappeinnhold
function visMappe(mappeNavn, sti = null) {
  const mappeDiv = document.getElementById("mappeInnhold");
  mappeDiv.innerHTML = `<button id="tilbakeBtn" onclick="tilbakeTilHoved()">← Tilbake</button><h2>${mappeNavn}</h2>`;
  const innhold = sti ? sti : ressurser[mappeNavn];
  const ul = document.createElement("ul");

  if (Array.isArray(innhold)) {
    innhold.forEach(fil => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${fil.path}" target="_blank">${fil.name}</a>`;
      ul.appendChild(li);
    });
  } else {
    for (let undermappe in innhold) {
      const li = document.createElement("li");
      li.innerHTML = `<span style="cursor:pointer;color:#007bff;" onclick="visMappe('${undermappe}', ressurser['${mappeNavn}']['${undermappe}'])">${undermappe}</span>`;
      ul.appendChild(li);
    }
  }

  mappeDiv.appendChild(ul);
  document.getElementById("innhold").style.display = "none";
  mappeDiv.style.display = "block";
}

// Tilbake til hoved
function tilbakeTilHoved() {
  document.getElementById("innhold").style.display = "block";
  document.getElementById("mappeInnhold").style.display = "none";
}
