const cities=['Dubai','Sharjah','Ajman','Abu Dhabi','Umm Al Quwain','Ras Al Khaimah','Fujairah','Al Ain'];
const types=['Apartment Move','Villa Move','Office Move','Furniture Move','Packing Only','Loading & Unloading','Storage','Other'];
const plans=[
{id:'essential',name:'ESSENTIAL MOVE',price:720,sub:'Cost-effective moving for studios and light apartment relocations.',for:'Studio & 1 BHK Apartments',features:['3-Ton Closed Truck','2 Professional Movers','Loading & Unloading','Basic Furniture Handling','Safe Transportation']},
{id:'standard',name:'STANDARD MOVE',price:1100,sub:'Complete moving solution with disassembly, assembly and packing materials.',for:'2 to 3 BHK Apartments & Townhouses',features:['3-Ton Closed Truck','Professional Movers','Loading & Unloading','Furniture Dismantling','Furniture Assembly','Packing Boxes','Appliance Handling','Safe Transportation'],popular:true},
{id:'premium',name:'PREMIUM MOVE',price:1260,sub:'Turnkey white-glove relocation with full packing and handyman assistance.',for:'Villas, Large Apartments & Executive Offices',features:['3-Ton Closed Truck','Professional Moving Team','Full Packing','Furniture Dismantling','Furniture Assembly','Appliance Connection','Boxes','Handyman Support','Wall Mounting / Curtain Rod Support']}
];
const services=[
['Home Moving','Complete residential relocation with end-to-end packing and transport.','Residential'],
['Villa Moving','Professional villa shifting with careful handling and heavy furniture care.','Residential'],
['Apartment Moving','Fast and organized apartment relocation following building rules.','Residential'],
['Office Relocation','Move office furniture and equipment with minimum business disruption.','Commercial'],
['Packing Services','Professional packing for household, kitchenware and fragile items.','Specialized'],
['Furniture Moving','Safe transportation of individual furniture pieces or complete sets.','Specialized'],
['Loading & Unloading','Professional loading and unloading teams equipped with safety gear.','Manpower'],
['Furniture Assembly','Dismantling and reassembly of beds, wardrobes, desks and shelves.','Handyman'],
['Appliance Handling','Safe handling and positioning of refrigerators, washers and cookers.','Technical'],
['Storage Solutions','Short-term and long-term secure storage support in UAE.','Facility'],
['Handyman Services','Installation, curtain rods, TV wall brackets and setup assistance.','Handyman']
];
const why=[
['👥','Professional Moving Team','Trained movers who handle your items with care and discipline.'],
['🛡','Safe & Secure Handling','Protective packing, furniture padding and secured transportation.'],
['▣','Transparent Pricing','Clear quotes with service and VAT breakdowns.'],
['◷','On-Time Service','Prompt arrival and coordinated moving schedules.'],
['📦','Complete Moving Solutions','Packing, transport, assembly and setup in one service.'],
['☎','Customer Support','Direct phone and WhatsApp assistance throughout your move.'],
['🚚','Modern Transportation','Clean enclosed trucks for safer transportation.'],
['✓','Quality Focus','Organized service from planning through delivery.']
];
const $=s=>document.querySelector(s);
document.addEventListener('DOMContentLoaded',()=>{
  $('#quoteForm [name=fromCity]').innerHTML=cities.map(x=>`<option>${x}</option>`).join('');
  $('#quoteForm [name=toCity]').innerHTML=cities.map(x=>`<option>${x}</option>`).join('');
  $('#moveType').innerHTML=types.map(x=>`<option>${x}</option>`).join('');
  $('#pricingCards').innerHTML=plans.map(p=>`<article class="plan ${p.popular?'popular':''}">${p.popular?'<span class="badge">MOST POPULAR</span>':''}<small class="eyebrow">${p.for}</small><h3>${p.name}</h3><p>${p.sub}</p><div class="price">AED ${p.price.toLocaleString()} <small>starting</small></div><ul>${p.features.map(f=>`<li>${f}</li>`).join('')}</ul><button class="btn full" onclick="bookPlan('${p.id}')">Select Plan</button></article>`).join('');
  $('#serviceCards').innerHTML=services.map(s=>`<article class="service-card"><small>${s[2]}</small><h3>${s[0]}</h3><p>${s[1]}</p><button class="text-btn" onclick="scrollToQuote()">Request Service →</button></article>`).join('');
  $('#whyCards').innerHTML=why.map(x=>`<article class="why-card"><div class="icon">${x[0]}</div><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('');
  ['#floor','#distance','#boxes','#packing','#assembly','#appliance','#lift','#calcType','#property'].forEach(s=>$(s)?.addEventListener('input',calc));
  calc();
  const d=$('#quoteForm [name=date]'); d.min=new Date().toISOString().slice(0,10);
  $('#quoteForm').addEventListener('submit',submitQuote);
});
function toggleMenu(){const n=$('#nav');n.style.display=n.style.display==='flex'?'none':'flex';n.style.position='absolute';n.style.top='68px';n.style.left='0';n.style.right='0';n.style.padding='18px';n.style.background='#0b0d11';n.style.flexDirection='column'}
function scrollToQuote(type){if(type){$('#moveType').value=type;$('#calcType').value=type==='Office Move'?'Office Move':type}$('#quote').scrollIntoView({behavior:'smooth'});}
function calc(){
 let base={Studio:650,'1 Bedroom':800,'2 Bedroom':1100,'3 Bedroom':1350,'4+ Bedroom Villa':1650,'Commercial Office':1450}[$('#property').value]||1000;
 let distance=Math.max(0,(+$('#distance').value||15)-15)*8, floor=Math.max(0,(+$('#floor').value||1)-1)*40, boxes=(+$('#boxes').value||0)*12;
 if($('#calcType').value==='Villa Move')base+=250;
 if($('#calcType').value==='Office Move')base+=250;
 if($('#calcType').value==='Furniture Move')base=Math.min(base,800);
 if($('#packing').checked)base+=250;
 if($('#assembly').checked)base+=200;
 if($('#appliance').checked)base+=100;
 if(!$('#lift').checked)base+=150;
 const total=Math.round((base+distance+floor+boxes)*1.05);
 $('#total').textContent='AED '+total.toLocaleString();
 return total;
}
function bookPlan(id){const p=plans.find(x=>x.id===id);openModal(`<div class="success"><div class="check">✓</div><span class="eyebrow">PLAN SELECTED</span><h2>${p.name}</h2><p>${p.sub}</p><div class="ref">Starting from AED ${p.price.toLocaleString()}</div><button class="btn full" onclick="closeModal();scrollToQuote('${p.name.includes('VILLA')?'Villa Move':'Apartment Move'}')">Continue to Quote</button></div>`);}
function bookEstimate(){const total=calc();openModal(`<div class="success"><div class="check">✓</div><span class="eyebrow">ESTIMATE READY</span><h2>Your Estimated Move Cost</h2><div class="ref">AED ${total.toLocaleString()} incl. estimated VAT</div><p>Complete the quote form so our team can review access, inventory and schedule before confirming your final price.</p><button class="btn full" onclick="closeModal();scrollToQuote()">Continue to Quote</button></div>`);}
function makeRef(){const d=new Date(),pad=n=>String(n).padStart(2,'0');return `AB${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}${Math.floor(100+Math.random()*900)}`;}
function submitQuote(e){
 e.preventDefault();const fd=new FormData(e.target), ref=makeRef();
 const booking={id:ref,referenceNumber:ref,customerName:`${fd.get('firstName')} ${fd.get('lastName')}`,phone:fd.get('mobile'),email:fd.get('email'),moveType:fd.get('moveType'),pickupAddress:`${fd.get('pickup')}, ${fd.get('fromCity')}`,dropoffAddress:`${fd.get('dropoff')}, ${fd.get('toCity')}`,preferredDate:fd.get('date'),timeSlot:fd.get('time'),planName:`${fd.get('moveType')} (${fd.get('rooms')})`,totalAmount:fd.get('moveType')==='Villa Move'?1450:1100,paymentMethod:'Quote Assessment (Under Review)',status:'pending',createdAt:new Date().toISOString()};
 const list=JSON.parse(localStorage.getItem('ab_movers_bookings')||'[]');list.unshift(booking);localStorage.setItem('ab_movers_bookings',JSON.stringify(list));
 const wa=`https://wa.me/971543017540?text=${encodeURIComponent(`Hello AB+ Movers, I submitted a quote request. Reference #${ref}. Please confirm my move.`)}`;
 openModal(`<div class="success"><div class="check">✓</div><span class="eyebrow">BOOKING RECEIVED</span><h2>Thank You!</h2><p>Your relocation request has been submitted for review.</p><div class="ref">Reference #${ref}</div><p><b>${booking.customerName}</b><br>${booking.preferredDate} • ${booking.timeSlot}<br>${booking.planName}</p><div class="modal-actions"><a class="wa" href="${wa}" target="_blank">Send Reference To WhatsApp</a><a href="tel:+971543017540">Call Muhammad Bilal</a><button onclick="closeModal()">Return to Website</button><button onclick="showBookings()">View My Saved Bookings</button></div></div>`);
 e.target.reset();$('#quoteForm [name=fromCity]').value='Dubai';$('#quoteForm [name=toCity]').value='Dubai';
}
function showBookings(){
 const list=JSON.parse(localStorage.getItem('ab_movers_bookings')||'[]');
 openModal(`<span class="eyebrow">BOOKING LOOKUP</span><h2>Your Saved Bookings</h2>${list.length?list.map(b=>`<div class="ref"><b>#${b.referenceNumber}</b><br><span style="color:#cbd1d9;font-size:12px">${b.customerName} • ${b.moveType}<br>${b.preferredDate} • ${b.status}</span></div>`).join(''):'<p>No saved bookings on this device.</p>'}<button class="btn full" onclick="closeModal()">Close</button>`);
}
function openModal(html){$('#modalContent').innerHTML=html;$('#modal').classList.add('show')}
function closeModal(){$('#modal').classList.remove('show')}
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
