const ressurser = {
  "Vaksinasjon": [
    { name: "Registrering av vaksiner.pdf", path: "Vaksinasjon/Aposys registrering av vaksiner.pdf" }
  ],
  "Viktige lover og forskrifter": [
    { name: "Bransjestandard.pdf", path: "Viktige lover og forskrifter/Bransjestandard.pdf" }
  ],
  "Aposys": {
    "Kundeportalen": [
      { name: "Kundeportalen.pdf", path: "Aposys/Kundeportalen/Kundeportalen.pdf" }
    ]
  },
  "Veiledning i apotek": {
    "Hudpleie": [
      { name: "Dermalogica.pdf", path: "Veiledning i apotek/Hudpleie/Dermalogica.pdf" }
    ]
  }
};

function sjekkPassord() {
  const passord = document.getElementById("passord").value;
  if (passord === "hemmelig123") {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("innhold").classList.remove("hidden");
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "#f5f5f5";
  } else {
    alert("Feil passord!");
  }
}

document.getElementById('loginBtn').addEventListener('click', sjekkPassord);
document.getElementById('passord').addEventListener('keypress', e => {
  if (e.key === 'Enter') sjekkPassord();
});

function visMappe(mappeNavn, sti = null) {
  const mappeDiv = document.getElementById("mappeInnhold");
  mappeDiv.innerHTML = `<button id="tilbakeBtn">Tilbake</button><h2>${mappeNavn}</h2>`;

  const innhold = sti || ressurser[mappeNavn];
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
      li.innerHTML = `<span class="undermappe" data-navn="${undermappe}">${undermappe}</span>`;
      ul.appendChild(li);
    }
  }

  mappeDiv.appendChild(ul);
  document.getElementById("innhold").classList.add("hidden");
  mappeDiv.classList.remove("hidden");

  document.getElementById("tilbakeBtn").addEventListener('click', () => {
    mappeDiv.classList.add("hidden");
    document.getElementById("innhold").classList.remove("hidden");
  });

  document.querySelectorAll('.undermappe').forEach(el => {
    el.addEventListener('click', () => {
      visMappe(el.dataset.navn, innhold[el.dataset.navn]);
    });
  });
}

document.querySelectorAll('.mappe').forEach(el => {
  el.addEventListener('click', () => {
    visMappe(el.dataset.mappe);
  });
});
