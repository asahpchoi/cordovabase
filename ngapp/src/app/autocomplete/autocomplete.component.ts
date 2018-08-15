import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  items = [];
  searchText;
  selectItem;
  selectItems = [];
  selecting = false;
  labels;
  fullList;
  searching = false;

  sel = {
    searchText: ''
  };

  addressmaster = {};

  getMatchItems() {
   if(!this.fullList || this.sel.searchText == '') return;
 
    return this.fullList.filter(
      x => x.display.toLowerCase().includes(this.sel["searchText"].toLowerCase())
    ).filter((x,i) => i<10)
  }

  getPDisplay(code) {
    return this.addressmaster["provinces"].find(
      x => x.value == code
    ).display
  }

  getDDisplay(code, provinceId) {
    return this.addressmaster["districts"].find(
      x => x.value == code && provinceId == x.provinceId
    ).display
  }

  getdistricts() {
    if(!this.addressmaster["districts"]) return;
    return this.addressmaster["districts"].filter(
      x => x.provinceId == this.sel["p"]
    );

  }
  getwards() {
    if(!this.addressmaster["wards"]) return;
    return this.addressmaster["wards"].filter(
      x => x.provinceId == this.sel["p"] && x.districtId == this.sel["d"]
    );
  }
  delete(i) {
    let idx = this.selectItems.indexOf(i);
    this.selectItems.splice(idx, 1);
  }
  pick(i) {

    this.selectItems.push(i);
    this.selecting = false;

  }
  select() {
    this.selectItem = null;
    this.searchText = "";
    this.selecting = true;
    setTimeout(
      () => {
        document.getElementById('searchText').focus();
      }, 100, true
    )
  }

  constructor(private http: HttpClient) {

  }

  loaditems() {
    return Object.keys(this.labels)
      .filter(x => !this.selectItems.includes(x)
      )
      .filter(x => this.labels[x].toLowerCase().includes(this.searchText.toLowerCase()))
      .filter(
        (x, i) => i < 5
      )
  }

  ngOnInit() {
    this.http.get('/assets/address.json').subscribe(
      d => {
        //console.log(d)
        this.addressmaster = d;
        this.fullList = [...this.addressmaster["provinces"], ...this.addressmaster["districts"], ...this.addressmaster["wards"]];
      }
    )

    this.labels = {
      "OCC0001": "Administration - Accountant",
      "OCC0002": "Administration - Actuary",
      "OCC0003": "Administration - Advocate & Solicitor",
      "OCC0004": "Administration - Bank Clerks/ Teller",
      "OCC0005": "Administration - Bank Manager",
      "OCC0006": "Administration - Book-keeper",
      "OCC0007": "Administration - Business Consultant",
      "OCC0008": "Administration - Clerk",
      "OCC0009": "Administration - Coroner",
      "OCC0010": "Administration - Economist",
      "OCC0011": "Administration - Engineers (administration duties only)",
      "OCC0012": "Administration - Executives (administration duties only)",
      "OCC0013": "Administration - Interpreter",
      "OCC0014": "Administration - Judge",
      "OCC0015": "Administration - Lawyer",
      "OCC0016": "Administration - Librarian",
      "OCC0017": "Administration - Lecturer",
      "OCC0018": "Administration - Management Consultant",
      "OCC0019": "Administration - Office Manager",
      "OCC0020": "Administration - Secretary",
      "OCC0021": "Administration - Statistician",
      "OCC0022": "Administration - Tax Consultant",
      "OCC0023": "Administration - Telephone/ TelexOperator",
      "OCC0024": "Administration - Typist",
      "OCC0025": "Advertising - Assistant",
      "OCC0026": "Advertising - Copy -Writer",
      "OCC0027": "Advertising - Signboard painter (indoor)",
      "OCC0028": "Advertising - Signboard erector (outdoor)",
      "OCC0029": "Aerial Erectors - Working at height up to 50 ft",
      "OCC0030": "Aerial Erectors - Working at height greater than 50 ft",
      "OCC0031": "Aerial Erectors - Roofers, Tilers, Bricklayers greater than 30 ft",
      "OCC0032": "Aerial Erectors - House Painter",
      "OCC0033": "Airport - Air Traffic Controller",
      "OCC0034": "Airport - Announcer",
      "OCC0035": "Airport - Aviation Inspector",
      "OCC0036": "Airport - Bagage Handler/ Porter",
      "OCC0037": "Airport - Flight Attendant (Major Airline)",
      "OCC0038": "Airport - Freight Handler",
      "OCC0039": "Airport - Fueling Attendant",
      "OCC0040": "Airport - Ground Hostess",
      "OCC0041": "Airport - Manager (Administrative only)",
      "OCC0042": "Airport - Mechanic and Maintenance",
      "OCC0043": "Airport - Plane Cleaner or Washer",
      "OCC0044": "Airport - Pilot (Major Airlines)",
      "OCC0045": "Antique Dealer",
      "OCC0046": "Architectual - Architect (Aministrative duties only)",
      "OCC0047": "Architectual - Civil Engineer",
      "OCC0048": "Architectual - Draughtsman",
      "OCC0049": "Architectual - Surveyor (Outdoor)",
      "OCC0050": "Airconditioning Installation/ Repairer",
      "OCC0051": "Armed Forces - Office Duties Only",
      "OCC0052": "Armed Forces - Techinical Duties",
      "OCC0053": "Armed Forces - Special Air Services/ Commandos",
      "OCC0054": "Armed Forces - Bomb Disposal",
      "OCC0055": "Armed Forces - Chemical Warfare",
      "OCC0056": "Armed Forces - Mine Sweeper",
      "OCC0057": "Armed Forces - Mine Layer, parachuting",
      "OCC0058": "Armed Forces - Gliding",
      "OCC0059": "Armed Forces - Underwater activities",
      "OCC0060": "Armed Forces - Navy - Shore duties only",
      "OCC0061": "Armed Forces - Navy - Seagoing",
      "OCC0062": "Armed Forces - Navy - Submarines",
      "OCC0063": "Armed Forces - Navy - Divers",
      "OCC0064": "Armed Forces - Airforce - No aviation involved",
      "OCC0065": "Artis - Commercial Designer",
      "OCC0066": "Artis - Freelance, Painter, Sculptors",
      "OCC0067": "Athletes",
      "OCC0068": "Automobile - Dealer (Administration)",
      "OCC0069": "Automobile - Sales",
      "OCC0070": "Automobile - Assembler",
      "OCC0071": "Automobile - Machinist",
      "OCC0072": "Automobile - Welder (Not high rise)",
      "OCC0073": "Automobile - Mechanic",
      "OCC0074": "Automobile - Carpark Attendant",
      "OCC0075": "Automobile - Gas Station Attendant",
      "OCC0076": "Automobile - Driving Instructor",
      "OCC0077": "Baby Sister at Nursery",
      "OCC0078": "Baby Sister at Home",
      "OCC0079": "Bakeries / Biscuits - Baker, Doug-mixer, Packer",
      "OCC0080": "Bakeries / Biscuits - Proprietor",
      "OCC0081": "Bank -  Manager",
      "OCC0082": "Bank - Executive",
      "OCC0083": "Bank - Clerical Staff (Aministration)",
      "OCC0084": "Bank  - Armed Guards",
      "OCC0085": "Bank - Armoured Car Driver",
      "OCC0086": "Bank - Bill Collector",
      "OCC0087": "Bar/ Coffee House - Manager",
      "OCC0088": "Bar/ Coffee House - Bartender",
      "OCC0089": "Bar/ Coffee House - Captain",
      "OCC0090": "Bar/ Coffee House - Waiter/ Waitress",
      "OCC0091": "Bar/ Coffee House - Cashier",
      "OCC0092": "Bar/ Coffee House - Bar Hostess",
      "OCC0093": "Bar/ Coffee House - Bouncer",
      "OCC0094": "Barber/ Hairdresser",
      "OCC0095": "Bath/ Sauna - Guard/ Attendant",
      "OCC0096": "Bath/ Sauna - Receptionist, Cashier",
      "OCC0097": "Bath/ Sauna - Masseur/  Masseuse",
      "OCC0098": "Beautician",
      "OCC0099": "Beverage Manufacturer",
      "OCC0100": "Bicycle Manaufacturer",
      "OCC0101": "Billard Center Attendant/ Cashier",
      "OCC0102": "Blacksmith & Tooldresser",
      "OCC0103": "Boot & Shoe Maker/ Repairer",
      "OCC0104": "Boxer",
      "OCC0105": "Building & Construction - Airhammer Operator",
      "OCC0106": "Building & Construction - Asphalt Layer (Road, Roofing)",
      "OCC0107": "Blaster",
      "OCC0108": "Bricklayer - Bulldozer Operator",
      "OCC0109": "Bricklayer - Cableman",
      "OCC0110": "Bricklayer - Carpenter",
      "OCC0111": "Bricklayer - Carver",
      "OCC0112": "Bricklayer - Cement Worker",
      "OCC0113": "Bricklayer - Cesspool Sewer Worker",
      "OCC0114": "Bricklayer - Concrete Mixer Operator",
      "OCC0115": "Bricklayer - Contractor/ Subcontractor",
      "OCC0116": "Bricklayer - Crane Operator",
      "OCC0117": "Bricklayer - Demolition Worker",
      "OCC0118": "Bricklayer - Ditch Digger",
      "OCC0119": "Bricklayer - Driller",
      "OCC0120": "Bricklayer - Electrician",
      "OCC0121": "Bricklayer - Excavator",
      "OCC0122": "Bricklayer - Explosive Handler",
      "OCC0123": "Bricklayer - Labourer",
      "OCC0124": "Bricklayer - Fitter",
      "OCC0125": "Bricklayer - Mason",
      "OCC0126": "Bricklayer - Plasterer",
      "OCC0127": "Bricklayer - Plumber",
      "OCC0128": "Bricklayer - Sawyer",
      "OCC0129": "Bricklayer - Steam Roller Driver",
      "OCC0130": "Bricklayer - Structural Steel Erectors",
      "OCC0131": "Bricklayer - Supervisory Personnel",
      "OCC0132": "Bricklayer - Surveyor",
      "OCC0133": "Bricklayer - Tractor Driver",
      "OCC0134": "Bricklayer - Underground Worker",
      "OCC0135": "Bricklayer - Welder",
      "OCC0136": "Building & Maintainance - Cleaner",
      "OCC0137": "Building & Maintainance - Elevator Installer & Repairman",
      "OCC0138": "Cleaner - Janitor",
      "OCC0139": "Butcher/ Slaughters",
      "OCC0140": "Buyer/ Merchaniser",
      "OCC0141": "Carpenter",
      "OCC0142": "Carpet Layer",
      "OCC0143": "Casino Card Dealer/ Cashier",
      "OCC0144": "Cement/ Gypsum & Lime",
      "OCC0145": "Chef/ Baker/ Cook",
      "OCC0146": "Chemist",
      "OCC0147": "Chinese Bone Stetter/ Chiropracto",
      "OCC0148": "Clergyman (not missionary)",
      "OCC0149": "Coffee Shop Assistant",
      "OCC0150": "Computer Programmer/ Analyst",
      "OCC0151": "Computer - Keypunch Operator",
      "OCC0152": "Decorator - Interior Designer",
      "OCC0153": "Detective/ Private Investigator",
      "OCC0154": "Diver ",
      "OCC0155": "Dockyard Workers - Container Terminal Operators",
      "OCC0156": "Dockyard Workers - Cargo Handling Labourer",
      "OCC0157": "Dockyard Workers - Stevedore / Forklife Operator",
      "OCC0158": "Dockyard Workers - Harbour Pilot",
      "OCC0159": "Dog Groomer",
      "OCC0160": "Domestic Servant/ Helper",
      "OCC0161": "Driver - Ambulance",
      "OCC0162": "Driver - Amoured Car Driver",
      "OCC0163": "Driver - Bus",
      "OCC0164": "Driver - Chauffeur",
      "OCC0165": "Driver - Courier - not on Motocycles",
      "OCC0166": "Driver - Courier - on Motorcycles",
      "OCC0167": "Driver - Driving Instructors",
      "OCC0168": "Driver - Garbage Collection",
      "OCC0169": "Driver - Petrol/ Petroleum Products",
      "OCC0170": "Driver - Removalist",
      "OCC0171": "Driver - Taxi",
      "OCC0172": "Driver - Tow Truck",
      "OCC0173": "Driver - Truck & Van",
      "OCC0174": "Dry Cleaning Industry",
      "OCC0175": "Electrical Industry - Electrician - domestic",
      "OCC0176": "Electrical Industry - Electrician - industrial high voltage",
      "OCC0177": "Electrical Industry - Power Station Worker",
      "OCC0178": "Electrical Industry - Linesman",
      "OCC0179": "Engravers",
      "OCC0180": "Entertainment Industry - Model",
      "OCC0181": "Entertainment Industry - Actor/ Actress",
      "OCC0182": "Entertainment Industry - Choreographer/ Dancer",
      "OCC0183": "Entertainment Industry - Film Director/ Editor/ Producer & Scriptwriter",
      "OCC0184": "Entertainment Industry - Stuntman",
      "OCC0185": "Entertainment Industry - Technician/ Cameraman",
      "OCC0186": "Entertainment Industry - Lighting Crew",
      "OCC0187": "Entertainment Industry - Engineer",
      "OCC0188": "Entertainment Industry - Musician",
      "OCC0189": "Entertainment Industry - Newsreader/ Announcer/ Commentator",
      "OCC0190": "Entertainment Industry - Singer",
      "OCC0191": "Entertainment Industry - Cinema Projectionist",
      "OCC0192": "Entertainment Industry - Stage Manager",
      "OCC0193": "Entertainment Industry - Scene & Set Painter",
      "OCC0194": "Exterminator & Fumigator",
      "OCC0195": "Factory Worker  - Non-hazardous light industry",
      "OCC0196": "Factory Worker  - Manual worker",
      "OCC0197": "Farmer",
      "OCC0198": "Firemen",
      "OCC0199": "Fisherman - Onshore, lake, pond",
      "OCC0200": "Fisherman - Offshore",
      "OCC0201": "Fitness Centre - Aerobic Teacher",
      "OCC0202": "Fitter",
      "OCC0203": "Florist",
      "OCC0204": "Furniture Maker/ Carpenter",
      "OCC0205": "Garbage Collector",
      "OCC0206": "Gardener, Landscaper",
      "OCC0207": "Gas Workers - Inspector, meter reader",
      "OCC0208": "Gas Workers - Maintenance worker, installer",
      "OCC0209": "Gas Workers - Pipelayer",
      "OCC0210": "Geologist",
      "OCC0211": "Glass Industry Worker",
      "OCC0212": "Glue and Adhesive Manufacturer",
      "OCC0213": "Greyhound Trainer",
      "OCC0214": "Hawker",
      "OCC0215": "Herbalist",
      "OCC0216": "Horse Racing - Breeder",
      "OCC0217": "Horse Racing - Jockey",
      "OCC0218": "Horse Racing - Riding Instructor",
      "OCC0219": "Horse Racing - Trainer",
      "OCC0220": "Horticulturist",
      "OCC0221": "Hotel - Bartender",
      "OCC0222": "Hotel - Bellboy",
      "OCC0223": "Hotel - Chambermaid/ Housekeeper",
      "OCC0224": "Hotel - Porter/ Doorman",
      "OCC0225": "Hotel - Kitchen Helper",
      "OCC0226": "Hotel - Captain",
      "OCC0227": "Hotel - Waiter/ Waitress",
      "OCC0228": "Hotel - Chef",
      "OCC0229": "Housewife",
      "OCC0230": "Janitor",
      "OCC0231": "Jeweller - Dealer",
      "OCC0232": "Jeweller - Skilled Worker, Cutter, Polisher",
      "OCC0233": "Journalist - local",
      "OCC0234": "Journalist - overseas",
      "OCC0235": "Laboratory - Analyst, Assistant",
      "OCC0236": "Laboratory - Attendant, Technician",
      "OCC0237": "Laboratory Chemist",
      "OCC0238": "Laboratory - Research Officer",
      "OCC0239": "Lathe Operator",
      "OCC0240": "Life Guard",
      "OCC0241": "Life Attendant",
      "OCC0242": "Lithographer",
      "OCC0243": "Locksmith",
      "OCC0244": "Manicurist",
      "OCC0245": "Marble, Mosaic, Terrazzo Worker",
      "OCC0246": "Marine Industry - Passenger/ Container Ship-Officer",
      "OCC0247": "Marine Industry - Passenger/ Container Ship-Crew",
      "OCC0248": "Marine Industry - Salvage Vessel",
      "OCC0249": "Martial Arts Instructor",
      "OCC0250": "Merchant - Retail",
      "OCC0251": "Merchant - Travel Involved",
      "OCC0252": "Medical - Administrator",
      "OCC0253": "Medical - Acupuncturist",
      "OCC0254": "Medical - Anesthetist",
      "OCC0255": "Medical - Chemist/ Pharmacist",
      "OCC0256": "Medical - Chiropractor",
      "OCC0257": "Medical - Dental Surgeon",
      "OCC0258": "Medical - Dietitian",
      "OCC0259": "Medical - Doctor/ Physician",
      "OCC0260": "Medical - Hospital Assistant",
      "OCC0261": "Medical - Matron/ Midwife",
      "OCC0262": "Medical - Nurishing Aids",
      "OCC0263": "Medical - Nurses General",
      "OCC0264": "Medical - Nurses Mental",
      "OCC0265": "Medical - Optometrist",
      "OCC0266": "Medical - Ophthalmologist",
      "OCC0267": "Medical - Orthodontist",
      "OCC0268": "Medical - Pathologist",
      "OCC0269": "Medical - Physiotherapist",
      "OCC0270": "Medical - Psychologist",
      "OCC0271": "Medical - Radiographer",
      "OCC0272": "Medical - Radiologist",
      "OCC0273": "Medical - Surgeon",
      "OCC0274": "Messenger, Delivery Van",
      "OCC0275": "Metal Industry - Supervisor",
      "OCC0276": "Metal Industry - Sheet Metal Worker",
      "OCC0277": "Metal Industry - Electroplater",
      "OCC0278": "Metal Industry - Fitter and Turner",
      "OCC0279": "Metal Industry - Scrap Dealer",
      "OCC0280": "Meteorologist",
      "OCC0281": "Mining Industry - Surface worker, no explosive",
      "OCC0282": "Mining Industry - Surface worker, using explosive",
      "OCC0283": "Mining Industry - Underground worker",
      "OCC0284": "Moneylender",
      "OCC0285": "Newspaper Editor, Office Clerk",
      "OCC0286": "Newspaper Reporter, Photographer",
      "OCC0287": "Metal industry - Other workers",
      "OCC0288": "Oil & gas Industries - Onshore workers -  Engineer, lab technician",
      "OCC0289": "Oil & gas Industries - Onshore workers - Tool pusher, crane driver",
      "OCC0290": "Oil & gas Industries - Onshore workers - Derrickman, Driller, Labourer",
      "OCC0291": "Oil & gas Industries - Onshore workers - geologist",
      "OCC0292": "Oil & gas Industry - Offshore workers - Geologist",
      "OCC0293": "Oil & gas Industry - Offshore workers - Engineer, Lab technican",
      "OCC0294": "Oil & gas Industry - Offshore workers - Tool pusher, crane driver",
      "OCC0295": "Oil & gas Industry - Offshore workers - Derrickman, Driller, Labourer",
      "OCC0296": "Oil & gas Industries - Onshore workers - Pipeline worker",
      "OCC0297": "Oil & gas Industries - Onshore workers - Refinery worker",
      "OCC0298": "Paint Manufacturing - Supervisor",
      "OCC0299": "Paint Manufacturing -  Blender, color card maker",
      "OCC0300": "Paper & Pulp Industry worker",
      "OCC0301": "Pawnbroker",
      "OCC0302": "Pest control",
      "OCC0303": "Photo studio photographer",
      "OCC0304": "Photo studio proprietor",
      "OCC0305": "Plastic Industry worker",
      "OCC0306": "Pottery & Ceramic worker",
      "OCC0307": "Plumber",
      "OCC0308": "Police - Superintendant, Officer",
      "OCC0309": "Police - Motorcycle Police",
      "OCC0310": "Police - Mobile Squad",
      "OCC0311": "Police - Bomb Disposal",
      "OCC0312": "Police - Criminla Investigation Dept",
      "OCC0313": "Postman",
      "OCC0314": "Printing & Publishing - Manager",
      "OCC0315": "Printing & Publishing - Other workers",
      "OCC0316": "Prison Warden",
      "OCC0317": "Quarries - Blaster",
      "OCC0318": "Quarries - Jackhammer Operator, Driller",
      "OCC0319": "Raiway - Office worker, Inspector",
      "OCC0320": "Raiway - Track worker",
      "OCC0321": "Raiway - Train Driver & Porter",
      "OCC0322": "Raiway - Guard",
      "OCC0323": "Raiway - Signalman",
      "OCC0324": "Restaurant - Manager, Supervisor",
      "OCC0325": "Restaurant - Chef, Cook",
      "OCC0326": "Restaurant - Kitchen hand",
      "OCC0327": "Restaurant - Waiter, Waitress",
      "OCC0328": "Restaurant - Bar Staff",
      "OCC0329": "Sales - Indoor",
      "OCC0330": "Sales - Light Goods/ Service (Outdoor)",
      "OCC0331": "Secutity Guard, Night Watchman",
      "OCC0332": "Ship,Boat Building & Dry Dock - Coordinator Admin.",
      "OCC0333": "Ship,Boat Building & Dry Dock - Carpenter",
      "OCC0334": "Ship,Boat Building & Dry Dock - Foreman, Supervisor",
      "OCC0335": "Ship,Boat Building & Dry Dock - Labourer",
      "OCC0336": "Social / Welfare worker - field job",
      "OCC0337": "Street sweeper",
      "OCC0338": "Stockbroker - Office",
      "OCC0339": "Stockbroker - Floor Trader",
      "OCC0340": "Sandblasters",
      "OCC0341": "Sanitation Services - Garbage Collector",
      "OCC0342": "Sanitation Services - Incinerator Operator",
      "OCC0343": "Student",
      "OCC0344": "Surveyor",
      "OCC0345": "Teacher - Professor, Principal",
      "OCC0346": "Teacher - Academic Teacher",
      "OCC0347": "Teacher - Vocational Trade, Physical",
      "OCC0348": "Teacher - Childcare Center",
      "OCC0349": "Textile Industry - Supervisor",
      "OCC0350": "Textile Industry - Mechanic",
      "OCC0351": "Textile Industry - Bleacher, Dye Mixer",
      "OCC0352": "Textile Industry - Tailor, Seamstress",
      "OCC0353": "Timber Industry - Tree Fellers",
      "OCC0354": "Tool Maker",
      "OCC0355": "Tobacco, Cigar & Cigarettes - Supevisor",
      "OCC0356": "Tobacco, Cigar & Cigarettes - Machine Operator",
      "OCC0357": "Traffic Warden",
      "OCC0358": "Traffic Lane Painter",
      "OCC0359": "Undertaker",
      "OCC0360": "Upholsterer",
      "OCC0361": "Veterinary - Domestic Pets",
      "OCC0362": "Veterinary - Large Animals",
      "OCC0363": "Watchmaker and Repairer",
      "OCC0364": "Warehouse Worker",
      "OCC0365": "Window Cleaner - Up to 50 ft",
      "OCC0366": "Window Cleaner - Above 50 ft",
      "OCC0367": "Zoo keeper",
      "OCC0368": "Building & Maintainance - Janitor",
      "OCC0369": "Toll Pusher - Crane driver",
      "OCC0370": "Infant/ Pre-school children",
      "OCC0371": "Retiree",
      "OCC0372": "Unemployed",
      "OCC0373": "Tourist guide",
      "OCC0374": "Manual laborer",
      "OCC0375": "Other",
    }

  }



}
