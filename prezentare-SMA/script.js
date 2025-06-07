
function openContractOverlay() {
  document.getElementById('contractOverlayDiagram').style.display = 'flex';
}

function closeContractOverlay() {
  document.getElementById('contractOverlayDiagram').style.display = 'none';


  document.querySelectorAll('#contractOverlayDiagram .sub-circle').forEach(el => el.remove());
  document.querySelectorAll('#contractOverlayDiagram line').forEach(el => el.remove());
  document.getElementById('mainCircleOverlay').innerHTML = 'Structura<br>Contractului';
  document.getElementById('mainCircleOverlay').onclick = () => revealCirclesOverlay(document.getElementById('mainCircleOverlay'));
}

function revealCirclesOverlay(button) {
  const centerX = 325;
  const centerY = 325;
  const radius = 270;
  const container = document.querySelector('#contractOverlayDiagram .circle-container');
  const linesGroup = document.querySelector('#contractOverlayDiagram #lines');

  const data = [
    { title: "Identificarea părților", desc: "în această secțiune sunt identificate părțile care participă la contract" },
    { title: "Termeni", desc: "un contract constă dintr-un număr de termeni care corespund sarcinilor şi obligaţiilor..." },
    { title: "Considerații", desc: "reprezintă drepturi, interese sau beneficii acordate unei părţi" },
    { title: "Clauze de excludere", desc: "clauze care exclud sau limitează drepturi" },
    { title: "Clauze de terminare", desc: "permit fiecărei părţi să încheie contractul" },
    { title: "Clauze de remediere", desc: "intervin în cazul rezilierii neplanificate" },
    { title: "Clauze de arbitraj", desc: "dispute soluționate prin arbitraj, nu instanță" }
  ];

  button.innerHTML = 'Structura<br>Contractului';
  button.style.cursor = 'default';
  button.onclick = null;

  data.forEach((item, i) => {
    setTimeout(() => {
      const angle = (360 / data.length) * i - 90;
      const rad = angle * (Math.PI / 180);
      const x = centerX + radius * Math.cos(rad);
      const y = centerY + radius * Math.sin(rad);

      const div = document.createElement('div');
      div.className = 'sub-circle show';
      div.style.left = `${x}px`;
      div.style.top = `${y}px`;
      div.innerHTML = `<div class='sub-label'><strong>${item.title}</strong><br><span>${item.desc}</span></div>`;
      container.appendChild(div);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", centerX);
      line.setAttribute("y1", centerY);
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
      line.classList.add("show");
      linesGroup.appendChild(line);
    }, i * 1000);
  });
}

function revealCircles(button) {
  const centerX = 325;
  const centerY = 325;
  const radius = 270;
  const container = document.querySelector('.circle-container');
  const linesGroup = document.getElementById('lines');

  const data = [
    { title: "Identificarea părților", desc: "în această secțiune sunt identificate părțile care participă la contract" },
    { title: "Termeni", desc: "un contract constă dintr-un număr de termeni care corespund sarcinilor şi obligaţiilor care trebuie făcute de fiecare parte. Sunt două clase importante de termeni: garanţii şi condiţii." },
    { title: "Considerații", desc: "reprezintă anumite drepturi, interese sau beneficii acordate unei anumite părţi" },
    { title: "Clauze de excludere", desc: "o clauză care exclude sau limitează dreptul unei părţi" },
    { title: "Clauze de terminare", desc: "aceste clauze asigură posibilitatea fiecărei părţi de a termina contractul" },
    { title: "Clauze de remediere", desc: "acestea reglementează situaţia în cazul terminării anormale a unui contract" },
    { title: "Clauze de arbitraj", desc: "acestea rezolvă disputele care pot apărea între părţi şi care pot fi arbitrate şi de alte instanţe, nu doar de cele judecătoreşti" }
  ];

  button.innerHTML = 'Structura<br>Contractului';
  button.style.cursor = 'default';
  button.onclick = null;

  data.forEach((item, i) => {
    setTimeout(() => {
      const angle = (360 / data.length) * i - 90;
      const rad = angle * (Math.PI / 180);
      const x = centerX + radius * Math.cos(rad);
      const y = centerY + radius * Math.sin(rad);

      const div = document.createElement('div');
      div.className = 'sub-circle show';
      div.style.left = `${x}px`;
      div.style.top = `${y}px`;
      div.innerHTML = `<div class='sub-label'><strong>${item.title}</strong><br><span>${item.desc}</span></div>`;
      container.appendChild(div);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", centerX);
      line.setAttribute("y1", centerY);
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
      line.classList.add("show");
      linesGroup.appendChild(line);
    }, i * 1000);
  });
}

  function toggleStep(el) {
    const desc = el.querySelector('.step-desc');
    const isVisible = desc.style.display === 'block';

    document.querySelectorAll('.step-desc').forEach(d => d.style.display = 'none');

    if (!isVisible) {
      desc.style.display = 'block';
    }
  }

  const gearTexts = [
  "Execuția. Este faza care corespunde executării unui contract. Este de așteptat ca în faza de execuție să fie respectați termenii stabiliți.",
  "Un contract poate fi încheiat prin acordul ambelor părți sau prin intervenția legii. Aceasta apare când circumstanțele externe fac imposibilă continuarea contractului.",
  "Terminarea anormală apare când una dintre părți nu își respectă obligațiile contractuale. Aceasta poate duce la litigii sau la rezilierea forțată a contractului."
];

function activateGear(index, el) {
  const box = document.getElementById("gearInfoBox");

  el.classList.remove("animate");
  void el.offsetWidth;
  el.classList.add("animate");

  const titles = ['Execuție', 'Acordul ambelor părți', 'Intervenția legii'];
  box.innerHTML = `<strong>${titles[index]}:</strong> ${gearTexts[index]}`;
  box.style.display = "block"; 
}

document.querySelectorAll(".accordion-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    const isVisible = content.style.display === "block";
    document.querySelectorAll(".accordion-content").forEach(c => c.style.display = "none");
    content.style.display = isVisible ? "none" : "block";
  });
});