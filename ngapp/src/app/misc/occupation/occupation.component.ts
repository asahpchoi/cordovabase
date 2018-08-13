import { Component,HostBinding, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel, FormControl } from '@angular/forms';

@Component({
  selector: 'app-occupation',
  templateUrl: './occupation.component.html',
  styleUrls: ['./occupation.component.css']
})
export class OccupationComponent implements OnInit {
 exp = true;

  @Input() occupationId: string;
  @Output() occupationIdChange: EventEmitter<string> = new EventEmitter<string>();
  mappedData;
  searchText;
  showSearch = false;
  input = {
    data:0
  };
  insureds = new FormControl();

  getInsuredLabel() {
    if(!this.insureds.value || this.insureds.value.length == 0)
      return "I am not insured"
    return 'insured'
  }

  showInsured() {
    if(!this.insureds.value)
      return "I am not insured"
    if(this.insureds.value.length == 2)
      return "Primary & Secondary Insured"
    if(this.insureds.value.length == 0)
      return "I am not insured"
    if(this.insureds.value[0] == "primary")
      return "Primary insured"
      if(this.insureds.value[0] == "secondary")
      return "Secondary insured"

    }

  constructor() { }
  select(id) {
    this.occupationId = id;
    this.showSearch = false;
  }
  update() {
    this.input.data++
  }
  change(event) {
    console.log(event)
  }
  search() {
    this.showSearch=true;
    this.searchText = '';
    setTimeout(() => {

       document.getElementById("searchText").focus();
    }, 200, true);

  }

 
  getOccupationName() {
    let data = this.mappedData.filter(x => x.id == this.occupationId);
 
    if(data.length == 0)
      return "Please Select";
    else
      return data[0].label;
  }

  ngOnInit() {
    this.mappedData = this.occupation.map(
      k => {
        return {
          id: k.id,
          label: this.labels[k.transId]
        }
      }
    )
  }


  labels = {
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
  occupation = [
    {
      "id": "1",
      "transId": "OCC0001"
    }, {
      "id": "2",
      "transId": "OCC0002"
    }, {
      "id": "3",
      "transId": "OCC0003"
    }, {
      "id": "4",
      "transId": "OCC0004"
    }, {
      "id": "5",
      "transId": "OCC0005"
    }, {
      "id": "6",
      "transId": "OCC0006"
    }, {
      "id": "7",
      "transId": "OCC0007"
    }, {
      "id": "8",
      "transId": "OCC0008"
    }, {
      "id": "9",
      "transId": "OCC0009"
    }, {
      "id": "10",
      "transId": "OCC0010"
    }, {
      "id": "11",
      "transId": "OCC0011"
    }, {
      "id": "12",
      "transId": "OCC0012"
    }, {
      "id": "13",
      "transId": "OCC0013"
    }, {
      "id": "14",
      "transId": "OCC0014"
    }, {
      "id": "15",
      "transId": "OCC0015"
    }, {
      "id": "16",
      "transId": "OCC0016"
    }, {
      "id": "17",
      "transId": "OCC0017"
    }, {
      "id": "18",
      "transId": "OCC0018"
    }, {
      "id": "19",
      "transId": "OCC0019"
    }, {
      "id": "20",
      "transId": "OCC0020"
    }, {
      "id": "21",
      "transId": "OCC0021"
    }, {
      "id": "22",
      "transId": "OCC0022"
    }, {
      "id": "23",
      "transId": "OCC0023"
    }, {
      "id": "24",
      "transId": "OCC0024"
    }, {
      "id": "25",
      "transId": "OCC0025"
    }, {
      "id": "26",
      "transId": "OCC0026"
    }, {
      "id": "27",
      "transId": "OCC0027"
    }, {
      "id": "28",
      "transId": "OCC0028"
    }, {
      "id": "29",
      "transId": "OCC0029"
    }, {
      "id": "30",
      "transId": "OCC0030"
    }, {
      "id": "31",
      "transId": "OCC0031"
    }, {
      "id": "32",
      "transId": "OCC0032"
    }, {
      "id": "33",
      "transId": "OCC0033"
    }, {
      "id": "34",
      "transId": "OCC0034"
    }, {
      "id": "35",
      "transId": "OCC0035"
    }, {
      "id": "36",
      "transId": "OCC0036"
    }, {
      "id": "37",
      "transId": "OCC0037"
    }, {
      "id": "38",
      "transId": "OCC0038"
    }, {
      "id": "39",
      "transId": "OCC0039"
    }, {
      "id": "40",
      "transId": "OCC0040"
    }, {
      "id": "41",
      "transId": "OCC0041"
    }, {
      "id": "42",
      "transId": "OCC0042"
    }, {
      "id": "43",
      "transId": "OCC0043"
    }, {
      "id": "44",
      "transId": "OCC0044"
    }, {
      "id": "45",
      "transId": "OCC0045"
    }, {
      "id": "46",
      "transId": "OCC0046"
    }, {
      "id": "47",
      "transId": "OCC0047"
    }, {
      "id": "48",
      "transId": "OCC0048"
    }, {
      "id": "49",
      "transId": "OCC0049"
    }, {
      "id": "50",
      "transId": "OCC0050"
    }, {
      "id": "51",
      "transId": "OCC0051"
    }, {
      "id": "52",
      "transId": "OCC0052"
    }, {
      "id": "53",
      "transId": "OCC0053"
    }, {
      "id": "54",
      "transId": "OCC0054"
    }, {
      "id": "55",
      "transId": "OCC0055"
    }, {
      "id": "56",
      "transId": "OCC0056"
    }, {
      "id": "57",
      "transId": "OCC0057"
    }, {
      "id": "58",
      "transId": "OCC0058"
    }, {
      "id": "59",
      "transId": "OCC0059"
    }, {
      "id": "60",
      "transId": "OCC0060"
    }, {
      "id": "61",
      "transId": "OCC0061"
    }, {
      "id": "62",
      "transId": "OCC0062"
    }, {
      "id": "63",
      "transId": "OCC0063"
    }, {
      "id": "64",
      "transId": "OCC0064"
    }, {
      "id": "65",
      "transId": "OCC0065"
    }, {
      "id": "66",
      "transId": "OCC0066"
    }, {
      "id": "67",
      "transId": "OCC0067"
    }, {
      "id": "68",
      "transId": "OCC0068"
    }, {
      "id": "69",
      "transId": "OCC0069"
    }, {
      "id": "70",
      "transId": "OCC0070"
    }, {
      "id": "71",
      "transId": "OCC0071"
    }, {
      "id": "72",
      "transId": "OCC0072"
    }, {
      "id": "73",
      "transId": "OCC0073"
    }, {
      "id": "74",
      "transId": "OCC0074"
    }, {
      "id": "75",
      "transId": "OCC0075"
    }, {
      "id": "76",
      "transId": "OCC0076"
    }, {
      "id": "77",
      "transId": "OCC0077"
    }, {
      "id": "78",
      "transId": "OCC0078"
    }, {
      "id": "79",
      "transId": "OCC0079"
    }, {
      "id": "80",
      "transId": "OCC0080"
    }, {
      "id": "81",
      "transId": "OCC0081"
    }, {
      "id": "82",
      "transId": "OCC0082"
    }, {
      "id": "83",
      "transId": "OCC0083"
    }, {
      "id": "84",
      "transId": "OCC0084"
    }, {
      "id": "85",
      "transId": "OCC0085"
    }, {
      "id": "86",
      "transId": "OCC0086"
    }, {
      "id": "87",
      "transId": "OCC0087"
    }, {
      "id": "88",
      "transId": "OCC0088"
    }, {
      "id": "89",
      "transId": "OCC0089"
    }, {
      "id": "90",
      "transId": "OCC0090"
    }, {
      "id": "91",
      "transId": "OCC0091"
    }, {
      "id": "92",
      "transId": "OCC0092"
    }, {
      "id": "93",
      "transId": "OCC0093"
    }, {
      "id": "94",
      "transId": "OCC0094"
    }, {
      "id": "95",
      "transId": "OCC0095"
    }, {
      "id": "96",
      "transId": "OCC0096"
    }, {
      "id": "97",
      "transId": "OCC0097"
    }, {
      "id": "98",
      "transId": "OCC0098"
    }, {
      "id": "99",
      "transId": "OCC0099"
    }, {
      "id": "100",
      "transId": "OCC0100"
    }, {
      "id": "101",
      "transId": "OCC0101"
    }, {
      "id": "102",
      "transId": "OCC0102"
    }, {
      "id": "103",
      "transId": "OCC0103"
    }, {
      "id": "104",
      "transId": "OCC0104"
    }, {
      "id": "105",
      "transId": "OCC0105"
    }, {
      "id": "106",
      "transId": "OCC0106"
    }, {
      "id": "107",
      "transId": "OCC0107"
    }, {
      "id": "108",
      "transId": "OCC0108"
    }, {
      "id": "109",
      "transId": "OCC0109"
    }, {
      "id": "110",
      "transId": "OCC0110"
    }, {
      "id": "111",
      "transId": "OCC0111"
    }, {
      "id": "112",
      "transId": "OCC0112"
    }, {
      "id": "113",
      "transId": "OCC0113"
    }, {
      "id": "114",
      "transId": "OCC0114"
    }, {
      "id": "115",
      "transId": "OCC0115"
    }, {
      "id": "116",
      "transId": "OCC0116"
    }, {
      "id": "117",
      "transId": "OCC0117"
    }, {
      "id": "118",
      "transId": "OCC0118"
    }, {
      "id": "119",
      "transId": "OCC0119"
    }, {
      "id": "120",
      "transId": "OCC0120"
    }, {
      "id": "121",
      "transId": "OCC0121"
    }, {
      "id": "122",
      "transId": "OCC0122"
    }, {
      "id": "123",
      "transId": "OCC0123"
    }, {
      "id": "124",
      "transId": "OCC0124"
    }, {
      "id": "125",
      "transId": "OCC0125"
    }, {
      "id": "126",
      "transId": "OCC0126"
    }, {
      "id": "127",
      "transId": "OCC0127"
    }, {
      "id": "128",
      "transId": "OCC0128"
    }, {
      "id": "129",
      "transId": "OCC0129"
    }, {
      "id": "130",
      "transId": "OCC0130"
    }, {
      "id": "131",
      "transId": "OCC0131"
    }, {
      "id": "132",
      "transId": "OCC0132"
    }, {
      "id": "133",
      "transId": "OCC0133"
    }, {
      "id": "134",
      "transId": "OCC0134"
    }, {
      "id": "135",
      "transId": "OCC0135"
    }, {
      "id": "136",
      "transId": "OCC0136"
    }, {
      "id": "137",
      "transId": "OCC0137"
    }, {
      "id": "138",
      "transId": "OCC0138"
    }, {
      "id": "139",
      "transId": "OCC0139"
    }, {
      "id": "140",
      "transId": "OCC0140"
    }, {
      "id": "141",
      "transId": "OCC0141"
    }, {
      "id": "142",
      "transId": "OCC0142"
    }, {
      "id": "143",
      "transId": "OCC0143"
    }, {
      "id": "144",
      "transId": "OCC0144"
    }, {
      "id": "145",
      "transId": "OCC0145"
    }, {
      "id": "146",
      "transId": "OCC0146"
    }, {
      "id": "147",
      "transId": "OCC0147"
    }, {
      "id": "148",
      "transId": "OCC0148"
    }, {
      "id": "149",
      "transId": "OCC0149"
    }, {
      "id": "150",
      "transId": "OCC0150"
    }, {
      "id": "151",
      "transId": "OCC0151"
    }, {
      "id": "152",
      "transId": "OCC0152"
    }, {
      "id": "153",
      "transId": "OCC0153"
    }, {
      "id": "154",
      "transId": "OCC0154"
    }, {
      "id": "155",
      "transId": "OCC0155"
    }, {
      "id": "156",
      "transId": "OCC0156"
    }, {
      "id": "157",
      "transId": "OCC0157"
    }, {
      "id": "158",
      "transId": "OCC0158"
    }, {
      "id": "159",
      "transId": "OCC0159"
    }, {
      "id": "160",
      "transId": "OCC0160"
    }, {
      "id": "161",
      "transId": "OCC0161"
    }, {
      "id": "162",
      "transId": "OCC0162"
    }, {
      "id": "163",
      "transId": "OCC0163"
    }, {
      "id": "164",
      "transId": "OCC0164"
    }, {
      "id": "165",
      "transId": "OCC0165"
    }, {
      "id": "166",
      "transId": "OCC0166"
    }, {
      "id": "167",
      "transId": "OCC0167"
    }, {
      "id": "168",
      "transId": "OCC0168"
    }, {
      "id": "169",
      "transId": "OCC0169"
    }, {
      "id": "170",
      "transId": "OCC0170"
    }, {
      "id": "171",
      "transId": "OCC0171"
    }, {
      "id": "172",
      "transId": "OCC0172"
    }, {
      "id": "173",
      "transId": "OCC0173"
    }, {
      "id": "174",
      "transId": "OCC0174"
    }, {
      "id": "175",
      "transId": "OCC0175"
    }, {
      "id": "176",
      "transId": "OCC0176"
    }, {
      "id": "177",
      "transId": "OCC0177"
    }, {
      "id": "178",
      "transId": "OCC0178"
    }, {
      "id": "179",
      "transId": "OCC0179"
    }, {
      "id": "180",
      "transId": "OCC0180"
    }, {
      "id": "181",
      "transId": "OCC0181"
    }, {
      "id": "182",
      "transId": "OCC0182"
    }, {
      "id": "183",
      "transId": "OCC0183"
    }, {
      "id": "184",
      "transId": "OCC0184"
    }, {
      "id": "185",
      "transId": "OCC0185"
    }, {
      "id": "186",
      "transId": "OCC0186"
    }, {
      "id": "187",
      "transId": "OCC0187"
    }, {
      "id": "188",
      "transId": "OCC0188"
    }, {
      "id": "189",
      "transId": "OCC0189"
    }, {
      "id": "190",
      "transId": "OCC0190"
    }, {
      "id": "191",
      "transId": "OCC0191"
    }, {
      "id": "192",
      "transId": "OCC0192"
    }, {
      "id": "193",
      "transId": "OCC0193"
    }, {
      "id": "194",
      "transId": "OCC0194"
    }, {
      "id": "195",
      "transId": "OCC0195"
    }, {
      "id": "196",
      "transId": "OCC0196"
    }, {
      "id": "197",
      "transId": "OCC0197"
    }, {
      "id": "198",
      "transId": "OCC0198"
    }, {
      "id": "199",
      "transId": "OCC0199"
    }, {
      "id": "200",
      "transId": "OCC0200"
    }, {
      "id": "201",
      "transId": "OCC0201"
    }, {
      "id": "202",
      "transId": "OCC0202"
    }, {
      "id": "203",
      "transId": "OCC0203"
    }, {
      "id": "204",
      "transId": "OCC0204"
    }, {
      "id": "205",
      "transId": "OCC0205"
    }, {
      "id": "206",
      "transId": "OCC0206"
    }, {
      "id": "207",
      "transId": "OCC0207"
    }, {
      "id": "208",
      "transId": "OCC0208"
    }, {
      "id": "209",
      "transId": "OCC0209"
    }, {
      "id": "210",
      "transId": "OCC0210"
    }, {
      "id": "211",
      "transId": "OCC0211"
    }, {
      "id": "212",
      "transId": "OCC0212"
    }, {
      "id": "213",
      "transId": "OCC0213"
    }, {
      "id": "214",
      "transId": "OCC0214"
    }, {
      "id": "215",
      "transId": "OCC0215"
    }, {
      "id": "216",
      "transId": "OCC0216"
    }, {
      "id": "217",
      "transId": "OCC0217"
    }, {
      "id": "218",
      "transId": "OCC0218"
    }, {
      "id": "219",
      "transId": "OCC0219"
    }, {
      "id": "220",
      "transId": "OCC0220"
    }, {
      "id": "221",
      "transId": "OCC0221"
    }, {
      "id": "222",
      "transId": "OCC0222"
    }, {
      "id": "223",
      "transId": "OCC0223"
    }, {
      "id": "224",
      "transId": "OCC0224"
    }, {
      "id": "225",
      "transId": "OCC0225"
    }, {
      "id": "226",
      "transId": "OCC0226"
    }, {
      "id": "227",
      "transId": "OCC0227"
    }, {
      "id": "228",
      "transId": "OCC0228"
    }, {
      "id": "229",
      "transId": "OCC0229"
    }, {
      "id": "230",
      "transId": "OCC0230"
    }, {
      "id": "231",
      "transId": "OCC0231"
    }, {
      "id": "232",
      "transId": "OCC0232"
    }, {
      "id": "233",
      "transId": "OCC0233"
    }, {
      "id": "234",
      "transId": "OCC0234"
    }, {
      "id": "235",
      "transId": "OCC0235"
    }, {
      "id": "236",
      "transId": "OCC0236"
    }, {
      "id": "237",
      "transId": "OCC0237"
    }, {
      "id": "238",
      "transId": "OCC0238"
    }, {
      "id": "239",
      "transId": "OCC0239"
    }, {
      "id": "240",
      "transId": "OCC0240"
    }, {
      "id": "241",
      "transId": "OCC0241"
    }, {
      "id": "242",
      "transId": "OCC0242"
    }, {
      "id": "243",
      "transId": "OCC0243"
    }, {
      "id": "244",
      "transId": "OCC0244"
    }, {
      "id": "245",
      "transId": "OCC0245"
    }, {
      "id": "246",
      "transId": "OCC0246"
    }, {
      "id": "247",
      "transId": "OCC0247"
    }, {
      "id": "248",
      "transId": "OCC0248"
    }, {
      "id": "249",
      "transId": "OCC0249"
    }, {
      "id": "250",
      "transId": "OCC0250"
    }, {
      "id": "251",
      "transId": "OCC0251"
    }, {
      "id": "252",
      "transId": "OCC0252"
    }, {
      "id": "253",
      "transId": "OCC0253"
    }, {
      "id": "254",
      "transId": "OCC0254"
    }, {
      "id": "255",
      "transId": "OCC0255"
    }, {
      "id": "256",
      "transId": "OCC0256"
    }, {
      "id": "257",
      "transId": "OCC0257"
    }, {
      "id": "258",
      "transId": "OCC0258"
    }, {
      "id": "259",
      "transId": "OCC0259"
    }, {
      "id": "260",
      "transId": "OCC0260"
    }, {
      "id": "261",
      "transId": "OCC0261"
    }, {
      "id": "262",
      "transId": "OCC0262"
    }, {
      "id": "263",
      "transId": "OCC0263"
    }, {
      "id": "264",
      "transId": "OCC0264"
    }, {
      "id": "265",
      "transId": "OCC0265"
    }, {
      "id": "266",
      "transId": "OCC0266"
    }, {
      "id": "267",
      "transId": "OCC0267"
    }, {
      "id": "268",
      "transId": "OCC0268"
    }, {
      "id": "269",
      "transId": "OCC0269"
    }, {
      "id": "270",
      "transId": "OCC0270"
    }, {
      "id": "271",
      "transId": "OCC0271"
    }, {
      "id": "272",
      "transId": "OCC0272"
    }, {
      "id": "273",
      "transId": "OCC0273"
    }, {
      "id": "274",
      "transId": "OCC0274"
    }, {
      "id": "275",
      "transId": "OCC0275"
    }, {
      "id": "276",
      "transId": "OCC0276"
    }, {
      "id": "277",
      "transId": "OCC0277"
    }, {
      "id": "278",
      "transId": "OCC0278"
    }, {
      "id": "279",
      "transId": "OCC0279"
    }, {
      "id": "280",
      "transId": "OCC0280"
    }, {
      "id": "281",
      "transId": "OCC0281"
    }, {
      "id": "282",
      "transId": "OCC0282"
    }, {
      "id": "283",
      "transId": "OCC0283"
    }, {
      "id": "284",
      "transId": "OCC0284"
    }, {
      "id": "285",
      "transId": "OCC0285"
    }, {
      "id": "286",
      "transId": "OCC0286"
    }, {
      "id": "287",
      "transId": "OCC0287"
    }, {
      "id": "288",
      "transId": "OCC0288"
    }, {
      "id": "289",
      "transId": "OCC0289"
    }, {
      "id": "290",
      "transId": "OCC0290"
    }, {
      "id": "291",
      "transId": "OCC0291"
    }, {
      "id": "292",
      "transId": "OCC0292"
    }, {
      "id": "293",
      "transId": "OCC0293"
    }, {
      "id": "294",
      "transId": "OCC0294"
    }, {
      "id": "295",
      "transId": "OCC0295"
    }, {
      "id": "296",
      "transId": "OCC0296"
    }, {
      "id": "297",
      "transId": "OCC0297"
    }, {
      "id": "298",
      "transId": "OCC0298"
    }, {
      "id": "299",
      "transId": "OCC0299"
    }, {
      "id": "300",
      "transId": "OCC0300"
    }, {
      "id": "301",
      "transId": "OCC0301"
    }, {
      "id": "302",
      "transId": "OCC0302"
    }, {
      "id": "303",
      "transId": "OCC0303"
    }, {
      "id": "304",
      "transId": "OCC0304"
    }, {
      "id": "305",
      "transId": "OCC0305"
    }, {
      "id": "306",
      "transId": "OCC0306"
    }, {
      "id": "307",
      "transId": "OCC0307"
    }, {
      "id": "308",
      "transId": "OCC0308"
    }, {
      "id": "309",
      "transId": "OCC0309"
    }, {
      "id": "310",
      "transId": "OCC0310"
    }, {
      "id": "311",
      "transId": "OCC0311"
    }, {
      "id": "312",
      "transId": "OCC0312"
    }, {
      "id": "313",
      "transId": "OCC0313"
    }, {
      "id": "314",
      "transId": "OCC0314"
    }, {
      "id": "315",
      "transId": "OCC0315"
    }, {
      "id": "316",
      "transId": "OCC0316"
    }, {
      "id": "317",
      "transId": "OCC0317"
    }, {
      "id": "318",
      "transId": "OCC0318"
    }, {
      "id": "319",
      "transId": "OCC0319"
    }, {
      "id": "320",
      "transId": "OCC0320"
    }, {
      "id": "321",
      "transId": "OCC0321"
    }, {
      "id": "322",
      "transId": "OCC0322"
    }, {
      "id": "323",
      "transId": "OCC0323"
    }, {
      "id": "324",
      "transId": "OCC0324"
    }, {
      "id": "325",
      "transId": "OCC0325"
    }, {
      "id": "326",
      "transId": "OCC0326"
    }, {
      "id": "327",
      "transId": "OCC0327"
    }, {
      "id": "328",
      "transId": "OCC0328"
    }, {
      "id": "329",
      "transId": "OCC0329"
    }, {
      "id": "330",
      "transId": "OCC0330"
    }, {
      "id": "331",
      "transId": "OCC0331"
    }, {
      "id": "332",
      "transId": "OCC0332"
    }, {
      "id": "333",
      "transId": "OCC0333"
    }, {
      "id": "334",
      "transId": "OCC0334"
    }, {
      "id": "335",
      "transId": "OCC0335"
    }, {
      "id": "336",
      "transId": "OCC0336"
    }, {
      "id": "337",
      "transId": "OCC0337"
    }, {
      "id": "338",
      "transId": "OCC0338"
    }, {
      "id": "339",
      "transId": "OCC0339"
    }, {
      "id": "340",
      "transId": "OCC0340"
    }, {
      "id": "341",
      "transId": "OCC0341"
    }, {
      "id": "342",
      "transId": "OCC0342"
    }, {
      "id": "343",
      "transId": "OCC0343"
    }, {
      "id": "344",
      "transId": "OCC0344"
    }, {
      "id": "345",
      "transId": "OCC0345"
    }, {
      "id": "346",
      "transId": "OCC0346"
    }, {
      "id": "347",
      "transId": "OCC0347"
    }, {
      "id": "348",
      "transId": "OCC0348"
    }, {
      "id": "349",
      "transId": "OCC0349"
    }, {
      "id": "350",
      "transId": "OCC0350"
    }, {
      "id": "351",
      "transId": "OCC0351"
    }, {
      "id": "352",
      "transId": "OCC0352"
    }, {
      "id": "353",
      "transId": "OCC0353"
    }, {
      "id": "354",
      "transId": "OCC0354"
    }, {
      "id": "355",
      "transId": "OCC0355"
    }, {
      "id": "356",
      "transId": "OCC0356"
    }, {
      "id": "357",
      "transId": "OCC0357"
    }, {
      "id": "358",
      "transId": "OCC0358"
    }, {
      "id": "359",
      "transId": "OCC0359"
    }, {
      "id": "360",
      "transId": "OCC0360"
    }, {
      "id": "361",
      "transId": "OCC0361"
    }, {
      "id": "362",
      "transId": "OCC0362"
    }, {
      "id": "363",
      "transId": "OCC0363"
    }, {
      "id": "364",
      "transId": "OCC0364"
    }, {
      "id": "365",
      "transId": "OCC0365"
    }, {
      "id": "366",
      "transId": "OCC0366"
    }, {
      "id": "367",
      "transId": "OCC0367"
    }, {
      "id": "368",
      "transId": "OCC0368"
    }, {
      "id": "369",
      "transId": "OCC0369"
    }, {
      "id": "370",
      "transId": "OCC0370"
    }, {
      "id": "371",
      "transId": "OCC0371"
    }, {
      "id": "372",
      "transId": "OCC0372"
    }, {
      "id": "373",
      "transId": "OCC0373"
    }, {
      "id": "374",
      "transId": "OCC0374"
    }, {
      "id": "375",
      "transId": "OCC0375"
    }
  ];

}
