const DRUGS = [
  { name: 'Paracetamol 500mg', salt: 'Acetaminophen', stock: 120, expiry: '2026-03-01', category: 'Analgesic' },
  { name: 'Ibuprofen 200mg', salt: 'Ibuprofen', stock: 80, expiry: '2025-11-15', category: 'NSAID' },
  { name: 'Amoxicillin 500mg', salt: 'Amoxicillin', stock: 60, expiry: '2026-07-20', category: 'Antibiotic' },
  { name: 'Azithromycin 250mg', salt: 'Azithromycin', stock: 42, expiry: '2025-12-12', category: 'Antibiotic' },
  { name: 'Cetirizine 10mg', salt: 'Cetirizine', stock: 150, expiry: '2027-01-01', category: 'Antihistamine' },
  { name: 'Metformin 500mg', salt: 'Metformin', stock: 90, expiry: '2026-04-18', category: 'Antidiabetic' },
  { name: 'Omeprazole 20mg', salt: 'Omeprazole', stock: 75, expiry: '2026-08-10', category: 'PPI' },
  { name: 'Amlodipine 5mg', salt: 'Amlodipine', stock: 110, expiry: '2025-10-05', category: 'Antihypertensive' },
  { name: 'Atorvastatin 10mg', salt: 'Atorvastatin', stock: 70, expiry: '2026-02-14', category: 'Statin' },
  { name: 'Dolo 650', salt: 'Acetaminophen', stock: 200, expiry: '2027-05-30', category: 'Analgesic' }
];

const SUPPLIERS = [
  { name: 'Apollo Distribution', contact: '+91 98765 43210', status: 'Active' },
  { name: 'MedPlus Wholesale', contact: '+91 99876 54321', status: 'Active' },
  { name: 'HealthCare Corp', contact: '+91 91234 56789', status: 'Onboarding' }
];

const SUPPLIES = [
  { po: 'PO-24001', supplier: 'Apollo Distribution', eta: '2025-10-03', status: 'In Transit' },
  { po: 'PO-24002', supplier: 'MedPlus Wholesale', eta: '2025-09-27', status: 'Delivered' },
  { po: 'PO-24003', supplier: 'HealthCare Corp', eta: '2025-10-12', status: 'Pending' }
];

function renderTables() {
  const drugsTbody = document.getElementById('drugsTable');
  const supTbody = document.getElementById('suppliersTable');
  const suppliesTbody = document.getElementById('suppliesTable');
  if (drugsTbody) {
    drugsTbody.innerHTML = DRUGS.map(d => `<tr><td>${d.name}</td><td>${d.salt}</td><td>${d.stock}</td><td>${d.expiry}</td></tr>`).join('');
  }
  if (supTbody) {
    supTbody.innerHTML = SUPPLIERS.map(s => `<tr><td>${s.name}</td><td>${s.contact}</td><td>${s.status}</td></tr>`).join('');
  }
  if (suppliesTbody) {
    suppliesTbody.innerHTML = SUPPLIES.map(s => `<tr><td>${s.po}</td><td>${s.supplier}</td><td>${s.eta}</td><td>${s.status}</td></tr>`).join('');
  }
}

function setupAutosuggest() {
  const input = document.getElementById('drugSearch');
  const box = document.getElementById('suggestions');
  if (!input || !box) return;
  const normalize = (s) => s.toLowerCase();
  const itemsFrom = (q) => {
    if (!q) return [];
    const n = normalize(q);
    return DRUGS.filter(d =>
      d.name.toLowerCase().includes(n) ||
      d.salt.toLowerCase().includes(n) ||
      (d.category && d.category.toLowerCase().includes(n))
    ).slice(0, 8);
  };

  let activeIndex = -1;
  const render = (list) => {
    if (!list.length) { box.classList.remove('show'); box.innerHTML = ''; return; }
    box.innerHTML = list.map((d, i) => `<div class="item${i===activeIndex?' active':''}" data-name="${d.name}"><strong>${d.name}</strong> <span class="muted">${d.salt} • ${d.category}</span></div>`).join('');
    box.classList.add('show');
  };

  input.addEventListener('input', () => { activeIndex = -1; render(itemsFrom(input.value.trim())); });
  input.addEventListener('keydown', (e) => {
    const list = itemsFrom(input.value.trim());
    if (['ArrowDown','ArrowUp','Enter','Escape'].includes(e.key)) e.preventDefault();
    if (e.key === 'ArrowDown') { activeIndex = Math.min(activeIndex + 1, list.length - 1); render(list); }
    if (e.key === 'ArrowUp') { activeIndex = Math.max(activeIndex - 1, 0); render(list); }
    if (e.key === 'Enter') {
      const pick = list[activeIndex] || list[0];
      if (pick) { input.value = pick.name; box.classList.remove('show'); }
    }
    if (e.key === 'Escape') { box.classList.remove('show'); }
  });
  box.addEventListener('click', (e) => {
    const el = e.target.closest('.item');
    if (!el) return;
    input.value = el.dataset.name;
    box.classList.remove('show');
  });
  document.addEventListener('click', (e) => { if (!box.contains(e.target) && e.target !== input) box.classList.remove('show'); });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTables();
  setupAutosuggest();
});



