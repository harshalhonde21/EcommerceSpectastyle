import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"
import "../CSS/PlaceOrder.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const PlaceOrder = () => {
  const location = useLocation();
  const totalCartValue = location.state.totalCartValue;
  const navigate = useNavigate();
  const goToOrder = () => {
    toast("Address Selected success!", {
      icon: "😄",
      style: {
        borderRadius: "rgb(189, 224, 254)",
        background: "rgb(70, 11, 70)",
        color: "rgb(255, 210, 255)",
      },
    });
    navigate("/address-payment-placeOrder/confirmOrder" , { state: { totalCartValue } })
  }

  const [userAddresses, setUserAddresses] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    country: "",
    state: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [updatedFormData, setUpdatedFormData] = useState({});
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "AntiguaDeps", "Argentina", "Armenia", "Australia",
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "BosniaHerzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "CapeVerde",
    "Central African Rep", "Chad", "Chile", "China", "Colombia","Congo", "CongoDemocraticRep", "CostaRica", "Croatia",
    "Cuba", "Cyprus", "CzechRepublic", "Denmark", "Djibouti", "Dominica", "DominicanRepublic", "EastTimor", "Ecuador", "Egypt",
    "ElSalvador", "EquatorialGuinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "GuineaBissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "NorthKorea", "SouthKorea", "Kuwait", "Kyrgyzstan", "Laos",
    "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall_Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
    "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
    "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian_Federation", "Rwanda", "St Kitts & Nevis",
    "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San_Marino", "Sao_Tome_Principe", "Saudi_Arabia", "Senegal", "Serbia",
    "Seychelles", "Sierra_Leone", "Singapore", "Slovakia", "Slovenia", "Solomon_Islands", "Somalia", "South Africa", "South_Sudan",
    "Spain", "Sri_Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Togo", "Tonga", "Trinidad_Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United_Arab_Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "VaticanCity", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];


  const stateData = {
    Afghanistan: ["Kabul","Badakhshan","Badghis","Baghlan","Balkh","Bamian","Farah","Faryab","Ghazni","Ghowr","Helmand","Herat","Jowzjan","Kabol","Kandahar","Kapisa","Khowst","Konar","Kondoz","Laghman","Lowgar","Nangarhar","Nimruz","Nurestan","Oruzgan","Paktia","Paktika","Parvan","Samangan","Sar-e Pol","Takhar","Vardak","Zabol"],
    Albania:["Tirana","Berat","Bulqize","Delvine","Devoll","Diber","Durres","Elbasan","Fier","Gjirokaster","Gramsh","Has","Kavaje","Kolonje","Korce","Kruje","Kucove","Kukes","Kurbin","Lezhe","Librazhd","Lushnje","Malesi e Madhe","Mallakaster","Mat","Mirdite","Peqin","Permet","Pogradec","Puke","Sarande","Shkoder","Skrapar","Tepelene","Tirane","Tropoje","Vlore"],
    Algeria: ["Algiers","Adrar","Ain Defla","Ain Temouchent","Alger","Annaba","Batna","Bechar","Bejaia","Biskra","Blida","Bordj Bou Arreridj","Bouira","Boumerdes","Chlef","Constantine","Djelfa","El Bayadh","El Oued","El Tarf","Ghardaia","Guelma","Illizi","Jijel","Khenchela","Laghouat","Mascara","Medea","Mila","Mostaganem","M\\'Sila","Naama","Oran","Ouargla","Oum el Bouaghi","Relizane","Saida","Setif","Sidi Bel Abbes","Skikda","Souk Ahras","Tamanghasset","Tebessa","Tiaret","Tindouf","Tipaza","Tissemsilt","Tizi Ouzou","Tlemcen"],
    Andorra: ["Andorra la Vella","Canillo","Encamp","La Massana","Escaldes-Engordany","Ordino","Sant Julia de Loria"],
    Angola: ["Luanda","","Bengo","Benguela","Bie","Cabinda","Cuando Cubango","Cuanza Norte","Cuanza Sul","Cunene","Huambo","Huila","Lunda Norte","Lunda Sul","Malanje","Moxico","Namibe","Uige","Zaire"],
    AntiguaDeps: ["Saint John","Barbuda","Redonda","Saint George","Saint Mary","Saint Paul","Saint Peter","Saint Philip"],
    Argentina: ["Buenos Aires","Catamarca","Chaco","Chubut","Cordoba","Corrientes","Entre Rios","Formosa","Jujuy","La Pampa","La Rioja","Mendoza","Misiones","Neuquen","Rio Negro","Salta","San Juan","San Luis","Santa Cruz","Santa Fe","Santiago del Estero","Tucuman"],
    Armenia: ["Yerevan","Aragatsotn","Ararat","Armavir","Geghark","unik","Kotayk","Lorri","Shirak","Syunik","Tavush"],
    Australia: ["Canberra","Australian Capital Territory","New South Wales","Northern Territory","Queensland","South Australia","Tasmania","Victoria","Western Australia"],
    Austria: ["Vienna","Burgenland","Kaernten","Niederoesterreich","Oberoesterreich","Salzburg","Steiermark","Tirol","Vorarlberg","Wien"],
    Azerbaijan: ["Baku (Baki)","Abseron","Agcabadi","Agdam","Agdas","Agstafa","Agsu","Ali Bayramli","Astara","Balakan","Barda","Beylaqan","Bilasuvar","Cabrayil","Calilabad","Daskasan","Davaci","Fuzuli","Gadabay","Ganca","Goranboy","Goycay","Haciqabul","Imisli","Ismayilli","Kalbacar","Kurdamir","Lacin","Lankaran","Lankaran","Lerik","Masalli","Mingacevir","Naftalan","Naxcivan","Neftcala","Oguz","Qabala","Qax","Qazax","Qobustan","Quba","Qubadli","Qusar","Saatli","Sabirabad","Saki","Saki","Salyan","Samaxi","Samkir","Samux","Siyazan","Sumqayit","Susa","Susa","Tartar","Tovuz","Ucar","Xacmaz","Xankandi","Xanlar","Xizi","Xocali","Xocavand","Yardimli","Yevlax","Yevlax","Zangilan","Zaqatala","Zardab"],
    Bahamas: ["Nassau","Acklins/Crooked Islands","Bimini","Cat Island","Exuma","Freeport","Fresh Creek","Governor\\'s Harbour","Green Turtle Cay","Harbour Island","High Rock","Inagua","Kemps Bay","Long Island","Marsh Harbour","Mayaguana","New Providence","Nichollstown/Berry Islands","Ragged Island","Rock Sound","Sandy Point","San Salvador/Rum Cay"],
    Bahrain: ["Manama","Al Hadd","Al Manamah","Al Mintaqah al Gharbiyah","Al Mintaqah al Wusta","Al Mintaqah ash Shamaliyah","Al Muharraq","Ar Rifa\\' wa al Mintaqah al Janubiyah","Jidd Hafs","Madinat Hamad","Madinat \\'Isa","Juzur Hawar","Sitrah"],
    Bangladesh: ["Dhaka","Barisal","Chittagong","Khulna","Rajshahi","Sylhet"],
    Barbados: ["Bridgetown","Christ Church","Saint Andrew","Saint George","Saint James","Saint John","Saint Joseph","Saint Lucy","Saint Michael","Saint Peter","Saint Philip","Saint Thomas"],
    Belarus: ["Minsk","Brest","Homyel\\'","Horad Minsk","","Hrodna","Mahilyow","Vitsyebsk"],
    Belgium: ["Brussels","","Antwerpen","Brabant Wallon"],
    Belize: ["Belmopan","","Belize","Cayo","Corozal","Orange Walk","Stann Creek","Toledo"],
    Benin: ["Porto-Novo","Alibori","Atakora","Atlantique","Borgou","Collines","Couffo","Donga","Littoral","Mono","Oueme","Plateau","Zou"],
    Bhutan: ["Thimphu","Bumthang","Chhukha","Chirang","Dagana","Gasa","Geylegphug","Ha","Lhuntshi","Mongar","Paro","Pemagatsel","Punakha","Samchi","Samdrup Jongkhar","Shemgang","Tashigang","Tongsa","Wangdi Phodrang","Yangtse"],
    Bolivia: ["La Paz","Sucre","","Chuquisaca","Cochabamba","Beni","Oruro","Pando","Potosi","Santa Cruz","Tarija"],
    BosniaHerzegovina: ["Sarajevo"],
    Botswana: ["Central", "Chobe", "Francistown", "Ghanzi", "Kgalagadi", "Kgatleng", "Kweneng", "Lobatse", "Ngamiland", "North-East", "Selebi-Pikwe", "South-East", "Southern"],
    Brazil: ["Brasilia","Acre","Alagoas","Amapa","Amazonas","Bahia","Ceara","Distrito Federal","Espirito Santo","Goias","Maranhao","Mato Grosso","Mato Grosso do Sul","Minas Gerais","Para","Paraiba","Parana","Pernambuco","Piaui","Rio de Janeiro","Rio Grande do Norte","Rio Grande do Sul","Rondonia","Roraima","Santa Catarina","Sao Paulo","Sergipe","Tocantins"],
    Brunei: ["Bandar Seri Begawan","","Belait","Brunei/Muara","Temburong","Tutong"],
    Bulgaria: ["Sofiya","Blagoevgrad","Burgas","Dobrich","Gabrovo","Khaskovo","Kurdzhali","Kyustendil","Lovech","Montana","Pazardzhik","Pernik","Pleven","Plovdiv","Razgrad","Ruse","Shumen","Silistra","Sliven","Smolyan","Sofiya-Grad","Stara Zagora","Turgovishte","Varna","Veliko Turnovo","Vidin","Vratsa","Yambol"],
    Burkina: ["Ouagadougou","Bale","Bam","Banwa","Bazega","Bougouriba","Boulgou","Boulkiemde","Comoe","Ganzourgou","Gnagna","Gourma","Houet","Ioba","Kadiogo","Kenedougou","Komandjari","Kompienga","Kossi","Koupelogo","Kouritenga","Kourweogo","Leraba","Loroum","Mouhoun","Nahouri","Namentenga","Nayala","Naumbiel","Oubritenga","Oudalan","Passore","Poni","Samentenga","Sanguie","Seno","Sissili","Soum","Sourou","Tapoa","Tuy","Yagha","Yatenga","Ziro","Zondomo","Zoundweogo"],
    Burundi: ["Bubanza", "Bujumbura", "Bururi", "Cankuzo", "Cibitoke", "Gitega", "Karuzi", "Kayanza", "Kirundo", "Makamba", "Muramvya", "Muyinga", "Mwaro", "Ngozi", "Rutana", "Ruyigi"],
    Cambodia: ["Phnom Penh","Banteay Mean Cheay","Batdambang","Kampong Cham","Kampong Chhnang","Kampong Spoe","Kampong Thum","Kampot","Kandal","Kaoh Kong","Keb","Kracheh","Mondol Kiri","Otdar Mean Cheay","Pailin","Pouthisat","Preah Seihanu (Sihanoukville)","Preah Vihear","Prey Veng","Rotanah Kiri","Siem Reab","Stoeng Treng","Svay Rieng","Takev"],
    Cameroon: ["Yaounde","Adamaoua","Centre","Est","Extreme-Nord","Littoral","Nord","Nord-Ouest","Ouest","Sud","Sud-Ouest"],
    Canada: ["Ottawa","Alberta","British Columbia","Manitoba","New Brunswick","Newfoundland and Labrador","Northwest Territories","Nova Scotia","Nunavut","Ontario","Prince Edward Island","Quebec","Saskatchewan","Yukon Territory"],
    CapeVerde: ["Praia","Boa Vista","Brava","Calheta","Maio","Mosteiros","Paul","Porto Novo","Ribeira Grande","Sal","Santa Catarina","Santa Cruz","Sao Domingos","Sao Nicolau","Sao Filipe","Sao Vicente","Tarrafal"],
    CentralAfricanRep: ["Bamingui-Bangoran", "Basse-Kotto", "Gribingui", "Haute-Kotto", "Haute-Sangha", "Haut-Mbomou", "Kemo-Gribingui", "Lobaye", "Mbomou", "Nana-Mambere", "Ombella-Mpoko", "Ouaka", "Ouham", "Ouham-Pende", "Sangha", "Vakaga"],
    Chad: ["Assongha", "Baguirmi", "Bahr El Gazal", "Bahr Koh", "Batha Oriental", "Batha Occidental", "Biltine", "Borkou", "Dababa", "Ennedi", "Guera", "Hadjer Lamis", "Kabia", "Kanem", "Lac", "Lac Iro", "Logone Occidental", "Logone Oriental", "Mandoul", "Mayo-Boneye", "Mayo-Dallah", "Monts de Lam", "Ouaddai", "Salamat", "Sila", "Tandjile Oriental", "Tandjile Occidental", "Tibesti"],
    Chile: ["Santiago","Antofagasta","Araucania","Atacama","Bio-Bio","Coquimbo","Los Lagos","Maule","Tarapaca","Valparaiso"],
    China: ["Beijing","Anhui","Chongqing","Fujian","Gansu","Guangdong","Guangxi","Guizhou","Hainan","Hebei","Heilongjiang","Henan","Hubei","Hunan","Jiangsu","Jiangxi","Jilin","Liaoning","Nei Mongol","Ningxia","Qinghai","Shaanxi","Shandong","Shanghai","Shanxi","Sichuan","Tianjin","Xinjiang","Xizang (Tibet)","Yunnan","Zhejiang"],
    Colombia: ["Bogota","Amazonas","Antioquia","Arauca","Atlantico","Bolivar","Boyaca","Caldas","Caqueta","Casanare","Cauca","Cesar","Choco","Cordoba","Cundinamarca","Guainia","Guaviare","Huila","La Guajira","Magdalena","Meta","Narino","Norte de Santander","Putumayo","Quindio","Risaralda","San Andres/Providencia","Santander","Sucre","Tolima","Valle del Cauca","Vaupes","Vichada"],
    Congo: ["Kinshasa","Bandundu","Bas-Congo","Equateur","Kasai-Occidental","Kasai-Oriental","Katanga","Maniema","Nord-Kivu","Orientale","Sud-Kivu"],
    CongoDemocraticRep: ["Brazzaville","Bouenza","Cuvette","Kouilou","Lekoumou","Likouala","Niari","Plateaux","Pool","Sangha"],
    CostaRica: ["San Jose","Alajuela","Cartago","Guanacaste","Heredia","Limon","Puntarenas"],
    Croatia: ["Zagreb","Bjelovarsko-Bilogorska","Brodsko-Posavska","Dubrovacko-Neretvanska","Istarska","Karlovacka","Koprivnicko-Krizevacka","Krapinsko-Zagorska","Licko-Senjska","Medimurska","Osjecko-Baranjska","Pozesko-Slavonska","Primorsko-Goranska","Sibensko-Kninska","Sisacko-Moslavacka","Splitsko-Dalmatinska","Varazdinska","Viroviticko-Podravska","Vukovarsko-Srijemska","Zadarska","Zagrebacka"],
    Cuba: ["Havana","Camaguey","Ciego de Avila","Cienfuegos","Ciudad de La Habana","Granma","Guantanamo","Holguin","Isla de la Juventud","La Habana","Las Tunas","Matanzas","Pinar del Rio","Sancti Spiritus","Santiago de Cuba","Villa Clara"],
    Cyprus: ["Nicosia","Famagusta","Kyrenia","Larnaca","Limassol","Paphos"],
    CzechRepublic: ["Prague (Praha)","Jihocesky","Jihomoravsky","Karlovarsky","Kralovehradecky","Liberecky","Moravskoslezsky","Olomoucky","Pardubicky","Plzensky","Stredocesky","Ustecky","Vysocina","Zlinsky"],
    Denmark: ["Copenhagen (Kobenhavn)","Arhus","Bornholm","Fredericksberg","Frederiksborg","Fyn","Kobenhavns","Nordjylland","Ribe","Ringkobing","Roskilde","Sonderjylland","Storstrom","Vejle","Vestsjalland","Viborg"],
    Djibouti: ["Djibouti","Ali Sabih","Dikhil","Obock","Tadjoura"],
    Dominica: ["Roseau","Saint Andrew","Saint David","Saint George","Saint John","Saint Joseph","Saint Luke","Saint Mark","Saint Patrick","Saint Paul","Saint Peter"],
    DominicanRepublic: ["Santo Domingo","Azua","Baoruco","Barahona","Dajabon","Distrito Nacional","Duarte","Elias Pina","El Seibo","Espaillat","Hato Mayor","Independencia","La Altagracia","La Romana","La Vega","Maria Trinidad Sanchez","Monsenor Nouel","Monte Cristi","Monte Plata","Pedernales","Peravia","Puerto Plata","Salcedo","Samana","Sanchez Ramirez","San Cristobal","San Juan","San Pedro de Macoris","Santiago","Santiago Rodriguez","Valverde"],
    EastTimor: ["Dili","Aileu","Ainaro","Baucau","Bobonaro (Maliana)","Cova-Lima (Suai)","Ermera","Lautem (Los Palos)","Liquica","Manatuto","Manufahi (Same)","Oecussi (Ambeno)","Viqueque"],
    Ecuador: ["Quito","Azuay","Bolivar","Canar","Carchi","Chimborazo","Cotopaxi","El Oro","Esmeraldas","Galapagos","Guayas","Imbabura","Loja","Los Rios","Manabi","Morona-Santiago","Napo","Orellana","Pastaza","Pichincha","Sucumbios","Tungurahua","Zamora-Chinchipe"],
    Egypt: ["Ad Daqahliyah", "Al Bahr al Ahmar", "Al Buhayrah", "Al Fayyum", "Al Gharbiyah", "Al Iskandariyah", "Al Isma'iliyah", "Al Jizah", "Al Minufiyah", "Al Minya", "Al Qahirah", "Al Qalyubiyah", "Al Wadi al Jadid", "Ash Sharqiyah", "As Suways", "Aswan", "Asyut", "Bani Suwayf", "Bur Sa'id", "Dumyat", "Janub Sina'", "Kafr ash Shaykh", "Matruh", "Qina", "Shamal Sina'", "Suhaj"],
    ElSalvador: ["San Salvador","Ahuachapan","Cabanas","Chalatenango","Cuscatlan","La Libertad","La Paz","La Union","Morazan","San Miguel","Santa Ana","San Vicente","Sonsonate","Usulutan"],
    EquatorialGuinea: ["Malabo","Annobon","Bioko Norte","Bioko Sur","Centro Sur","Kie-Ntem","Litoral","Wele-Nzas"],
    Eritrea: ["Central", "Anelba", "Southern Red Sea", "Northern Red Sea", "Southern", "Gash-Barka"],
    Estonia: ["Harjumaa (Tallinn)","Hiiumaa (Kardla)","Ida-Virumaa (Johvi)","Jarvamaa (Paide)","Jogevamaa (Jogeva)","Laanemaa (Haapsalu)","Laane-Virumaa (Rakvere)","Parnumaa (Parnu)","Polvamaa (Polva)","Raplamaa (Rapla)","Saaremaa (Kuressaare)","Tartumaa (Tartu)","Valgamaa (Valga)","Viljandimaa (Viljandi)","Vorumaa (Voru)"],
    Eswatini: ["Hhohho", "Lubombo", "Manzini", "Shiselweni"],
    Ethiopia: ["Addis Ababa", "Adis Abeba (Addis Ababa)", "Afar", "Amara", "Binshangul Gumuz", "Dire Dawa", "Gambela Hizboch", "Hareri Hizb", "Oromiya", "Sumale (Somali)", "Tigray", "YeDebub Biheroch Biheresebochna Hizboch"],
    Fiji: ["Suva","Central","Eastern","Northern","Rotuma","Western"],
    Finland: ["Helsinki","Aland","Etela-Suomen Laani","Ita-Suomen Laani","Lansi-Suomen Laani","Lappi","Oulun Laani"],
    France: ["Paris","Alsace","Aquitaine","Auvergne","Basse-Normandie","Bourgogne","Bretagne","Centre","Champagne-Ardenne","Corse","Franche-Comte","Haute-Normandie","Ile-de-France","Languedoc-Roussillon","Limousin","Lorraine","Midi-Pyrenees","Nord-Pas-de-Calais","Pays de la Loire","Picardie","Poitou-Charentes","Provence-Alpes-Cote d\\'Azur","Rhone-Alpes"],
    Gabon: ["Libreville"],
    Gambia: ["Banjul", "Lower River", "Central River", "Upper River", "North Bank", "Western"],
    Georgia: ["T'bilisi","Bat'umi","Chiat'ura","Gori","Guria","Imereti","Kakheti","K'ut'aisi","Kvemo Kartli","Mtskheta-Mtianeti","P'ot\\'i","Racha-Lechkhumi/Kvemo Svaneti","Rust\\'avi","Samegrelo/Zemo Svaneti","Samtskhe-Javakheti","Shida Kartli","Sokhumi","Tqibuli","Tsqaltubo","Zugdidi"],
    Germany: ["Berlin","Baden-Wuerttemberg","Bayern","Berlin","Brandenburg","Bremen","Hamburg","Hessen","Mecklenburg-Vorpommern","Niedersachsen","Nordrhein-Westfalen","Rheinland-Pfalz","Saarland","Sachsen","Sachsen-Anhalt","Schleswig-Holstein","Thueringen"],
    Ghana: ["Ashanti", "Brong-Ahafo", "Central", "Eastern", "Northern", "Upper East", "Upper West", "Volta", "Western"],
    Greece: ["Athens","Agion Oros (Mt. Athos)","Achaia","Aitolia kai Akarmania","Argolis","Arkadia","Arta","Attiki","Chalkidiki","Chanion","Chios","Dodekanisos","Drama","Evros","Evrytania","Evvoia","Florina","Fokidos","Fthiotis","Grevena","Ileia","Imathia","Ioannina","Irakleion","Karditsa","Kastoria","Kavala","Kefallinia","Kerkyra","Kilkis","Korinthia","Kozani","Kyklades","Lakonia","Larisa","Lasithi","Lefkas","Lesvos","Magnisia","Messinia","Pella","Pieria","Preveza","Rethynnis","Rodopi","Samos","Serrai","Thesprotia","Thessaloniki","Trikala","Voiotia","Xanthi","Zakynthos"],
    Grenada: ["Saint George's","Carriacou/Petit Martinique","Saint Andrew","Saint David","Saint John","Saint Mark","Saint Patrick"],
    Guatemala: ["Guatemala","Alta Verapaz","Baja Verapaz","Chimaltenango","Chiquimula","El Progreso","Escuintla","Guatemala","Huehuetenango","Izabal","Jalapa","Jutiapa","Peten","Quetzaltenango","Quiche","Retalhuleu","Sacatepequez","San Marcos","Santa Rosa","Solola","Suchitepequez","Totonicapan","Zacapa"],
    Guinea: ["Beyla", "Boffa", "Boke", "Coyah", "Dabola", "Dalaba", "Dinguiraye", "Dubreka", "Faranah", "Forecariah", "Fria", "Gaoual", "Gueckedou", "Kankan", "Kerouane", "Kindia", "Kissidougou", "Koubia", "Koundara", "Kouroussa", "Labe", "Lelouma", "Lola", "Macenta", "Mali", "Mamou", "Mandiana", "Nzerekore", "Pita", "Siguiri", "Telimele", "Tougue", "Yomou"],
    GuineaBissau: ["Bafata", "Biombo", "Bolama/Bijagos", "Cacheu", "Gabu", "Oio", "Quinara", "Tombali"],
    Guyana: ["Georgetown","Barima-Waini","Cuyuni-Mazaruni","Demerara-Mahaica","East Berbice-Corentyne","Essequibo Islands-West Demerara","Mahaica-Berbice","Pomeroon-Supenaam","Potaro-Siparuni","Upper Demerara-Berbice","Upper Takutu-Upper Essequibo"],
    Haiti: ["Port-au-Prince","Artibonite","Centre","Grand 'Anse","Nord","Nord-Est","Nord-Ouest","Ouest","Sud","Sud-Est"],
    Honduras: ["Tegucigalpa","Atlantida","Choluteca","Colon","Comayagua","Copan","Cortes","El Paraiso","Francisco Morazan","Gracias a Dios","Intibuca","Islas de la Bahia","La Paz","Lempira","Ocotepeque","Olancho","Santa Barbara","Valle","Yoro"],
    Hungary: ["Budapest","Bacs-Kiskun","Baranya","Bekes","Bekescsaba","Borsod-Abauj-Zemplen","Csongrad","Debrecen","Dunaujvaros","Eger","Fejer","Gyor","Gyor-Moson-Sopron","Hajdu-Bihar","Heves","Hodmezovasarhely","Jasz-Nagykun-Szolnok","Kaposvar","Kecskemet","Komarom-Esztergom","Miskolc","Nagykanizsa","Nograd","Nyiregyhaza","Pecs","Pest","Somogy","Sopron","Szabolcs-Szatmar-Bereg","Szeged","Szekesfehervar","Szolnok","Szombathely","Tatabanya","Tolna","Vas","Veszprem","Veszprem","Zala","Zalaegerszeg"],
    Iceland: ["Reykjavik","Akranes","Akureyri","Arnessysla","Austur-Bardhastrandarsysla","Austur-Hunavatnssysla","Austur-Skaftafellssysla","Borgarfjardharsysla","Dalasysla","Eyjafjardharsysla","Gullbringusysla","Hafnarfjordhur","Husavik","Isafjordhur","Keflavik","Kjosarsysla","Kopavogur","Myrasysla","Neskaupstadhur","Nordhur-Isafjardharsysla","Nordhur-Mulasys-la","Nordhur-Thingeyjarsysla","Olafsfjordhur","Rangarvallasysla","Saudharkrokur","Seydhisfjordhur","Siglufjordhur","Skagafjardharsysla","Snaefellsnes-og Hnappadalssysla","Strandasysla","Sudhur-Mulasysla","Sudhur-Thingeyjarsysla","Vesttmannaeyjar","Vestur-Bardhastrandarsysla","Vestur-Hunavatnssysla","Vestur-Isafjardharsysla","Vestur-Skaftafellssysla"],
    India: ["New Delhi","Andaman/Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chhattisgarh","Dadra/Nagar Haveli","Daman/Diu","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu/Kashmir","Jharkhand","Karnataka","Kerala","Lakshadweep","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Orissa","Pondicherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Tripura","Uttaranchal","Uttar Pradesh","West Bengal"],
    Indonesia: ["Jakarta","Aceh","Bali","Banten","Bengkulu","Gorontalo","Jakarta Raya","Jambi","Jawa Barat","Jawa Tengah","Jawa Timur","Kalimantan Barat","Kalimantan Selatan","Kalimantan Tengah","Kalimantan Timur","Kepulauan Bangka Belitung","Lampung","Maluku","Maluku Utara","Nusa Tenggara Barat","Nusa Tenggara Timur","Papua","Riau","Sulawesi Selatan","Sulawesi Tengah","Sulawesi Tenggara","Sulawesi Utara","Sumatera Barat","Sumatera Selatan","Sumatera Utara","Yogyakarta"],
    Iran: ["Tehran","Ardabil","Azarbayjan-e Gharbi","Azarbayjan-e Sharqi","Bushehr","Chahar Mahall va Bakhtiari","Esfahan","Fars","Gilan","Golestan","Hamadan","Hormozgan","Ilam","Kerman","Kermanshah","Khorasan","Khuzestan","Kohkiluyeh va Buyer Ahmad","Kordestan","Lorestan","Markazi","Mazandaran","Qazvin","Qom","Semnan","Sistan va Baluchestan","Yazd","Zanjan"],
    Iraq: ["Baghdad","Al Anbar","Al Basrah","Al Muthanna","Al Qadisiyah","An Najaf","Arbil","As Sulaymaniyah","At Ta\\'mim","Babil","Dahuk","Dhi Qar","Diyala","Karbala\\'","Maysan","Ninawa","Salah ad Din","Wasit"],
    Ireland: ["Dublin","Carlow","Cavan","Clare","Cork","Donegal","Galway","Kerry","Kildare","Kilkenny","Laois","Leitrim","Limerick","Longford","Louth","Mayo","Meath","Monaghan","Offaly","Roscommon","Sligo","Tipperary","Waterford","Westmeath","Wexford","Wicklow"],
    Israel: ["Jerusalem","Central","Haifa","Northern","Southern","Tel Aviv"],
    Italy: ["Rome","Abruzzi","Basilicata","Calabria","Campania","Emilia-Romagna","Friuli-Venezia Giulia","Lazio","Liguria","Lombardia","Marche","Molise","Piemonte","Puglia","Sardegna","Sicilia","Toscana","Trentino-Alto Adige","Umbria","Valle d\\'Aosta","Veneto"],
    Jamaica: ["Kingston","Clarendon","Hanover","Manchester","Portland","Saint Andrew","Saint Ann","Saint Catherine","Saint Elizabeth","Saint James","Saint Mary","Saint Thomas","Trelawny","Westmoreland"],
    Japan: ["Tokyo","Aichi","Akita","Aomori","Chiba","Ehime","Fukui","Fukuoka","Fukushima","Gifu","Gumma","Hiroshima","Hokkaido","Hyogo","Ibaraki","Ishikawa","Iwate","Kagawa","Kagoshima","Kanagawa","Kochi","Kumamoto","Kyoto","Mie","Miyagi","Miyazaki","Nagano","Nagasaki","Nara","Niigata","Oita","Okayama","Okinawa","Osaka","Saga","Saitama","Shiga","Shimane","Shizuoka","Tochigi","Tokushima","Tokyo","Tottori","Toyama","Wakayama","Yamagata","Yamaguchi","Yamanashi"],
    Jordan: ["Amman","Ajlun","Al 'Aqabah","Al Balqa'","Al Karak","Al Mafraq","At Tafilah","Az Zarqa'","Irbid","Jarash","Ma'an","Madaba"],
    Kazakhstan: ["Astana","Almaty","Almaty","Aqmola","Aqtobe","Astana","Atyrau","Batys Qazaqstan","Bayqongyr","Mangghystau","Ongtustik Qazaqstan","Pavlodar","Qaraghandy","Qostanay","Qyzylorda","Shyghys Qazaqstan","Soltustik Qazaqstan","Zhambyl"],
    Kenya: ["Central", "Coast", "Eastern", "Nairobi Area", "North Eastern", "Nyanza", "Rift Valley", "Western"],
    Kiribati: ["Tarawa","Abaiang","Abemama","Aranuka","Arorae","Banaba","Beru","Butaritari","Gilberts (Central)","Gilberts (Northern)","Gilberts (Southern)","Kanton","Kiritimati","Kuria","Line Islands","Maiana","Makin","Marakei","Nikunau","Nonouti","Onotoa","Phoenix Islands","Tabiteuea","Tabuaeran","Tamana","Teraina'"],
    NorthKorea: ["P'yongyang","Chagang-do","Hamgyong-bukto","Hamgyong-namdo","Hwanghae-bukto","Hwanghae-namdo","Kaesong-si","Kangwon-do","Najin Sonbong-si","Namp\\'o-si","P\\'yongan-bukto","P\\'yongan-namdo","P\\'yongyang-si","Yanggang-do"],
    SouthKorea: ["Seoul","Cheju-do","Cholla-bukto","Cholla-namdo","Ch\\'ungch\\'ong-bukto","Ch\\'ungch\\'ong-namdo","Inch\\'on-gwangyoksi","Kangwon-do","Kwangju-gwangyoksi","Kyonggi-do","Kyongsang-bukto","Kyongsang-namdo","Pusan-gwangyoksi","Soul-t\\'ukpyolsi","Taegu-gwangyoksi","Taejon-gwangyoksi","Ulsan-gwangyoksi'"],
    Kuwait: ["Kuwait","Al Ahmadi","Al Farwaniyah","Al 'Asimah","Al Jahra'","Hawalli"],
    Kyrgyzstan: ["Bishkek Shaary","Batken Oblasty","Chuy Oblasty (Bishkek)","Jalal-Abad Oblasty","Naryn Oblasty","Osh Oblasty","Talas Oblasty","Ysyk-Kol Oblasty (Karakol)"],
    Laos: ["Vientiane","Attapu","Bokeo","Bolikhamxai","Champasak","Houaphan","Khammouan","Louangnamtha","Louangphabang","Oudomxai","Phongsali","Salavan","Savannakhet","Viangchan","Viangchan","Xaignabouli","Xaisomboun","Xekong","Xiangkhoang"],
    Latvia: ["Riga","Aizkraukles","Aluksnes","Balvu","Bauskas","Cesu","Daugavpils","Daugavpils","Dobeles","Gulbenes","Jekabpils","Jelgava","Jelgavas","Jurmala","Kraslavas","Kuldigas","Liepaja","Liepajas","Limbazu","Ludzas","Madonas","Ogres","Preilu","Rezekne","Rezeknes","Riga","Rigas","Saldus","Talsu","Tukuma","Valkas","Valmieras","Ventspils","Ventspils"],
    Lebanon: ["Beirut","Beyrouth","Beqaa","Liban-Nord","Liban-Sud","Mont-Liban","Nabatiye"],
    Lesotho: ["Berea", "Butha-Buthe", "Leribe", "Mafeteng", "Mohale's Hoek", "Mokhotlong", "Qacha's Nek", "Quthing", "Thaba-Tseka"],
    Liberia: ["Bomi", "Bong", "Gbarpolu", "Grand Bassa", "Grand Cape Mount", "Grand Gedeh", "Grand Kru", "Lofa", "Margibi", "Maryland", "Montserrado", "Nimba", "River Cess", "River Gee", "Sinoe"],
    Libya: ["Ajdabiya", "Al 'Aziziyah", "Al Fatih", "Al Jabal al Akhdar", "Al Jufrah", "Al Khums", "Al Kufrah", "An Nuqat al Khams", "Ash Shati'", "Awbari", "Az Zawiyah", "Banghazi", "Darnah", "Ghadamis", "Gharyan", "Misratah", "Murzuq", "Sabha", "Sawfajjin", "Surt", "Tarabulus", "Tarhunah", "Tubruq", "Yafran", "Zlitan"],
    Liechtenstein: ["Vaduz","Balzers","Eschen","Gamprin","Mauren","Planken","Ruggell","Schaan","Schellenberg","Triesen","Triesenberg"],
    Lithuania: ["Vilnius","Alytaus","Kauno","Klaipedos","Marijampoles","Panevezio","Siauliu","Taurages","Telsiu","Utenos"],
    Luxembourg: ["Luxembourg","Diekirch","Grevenmacher"],
    Macedonia: ["Skopje","Aracinovo","Bac","Belcista","Berovo","Bistrica","Bitola","Blatec","Bogdanci","Bogomila","Bogovinje","Bosilovo","Brvenica","Cair","Capari","Caska","Cegrane","Centar","Centar Zupa","Cesinovo","Cucer-Sandevo","Debar","Delcevo","Delogozdi","Demir Hisar","Demir Kapija","Dobrusevo","Dolna Banjica","Dolneni","Dorce Petrov","Drugovo","Dzepciste","Gazi Baba","Gevgelija","Gostivar","Gradsko","Ilinden","Izvor","Jegunovce","Kamenjane","Karbinci","Karpos","Kavadarci","Kicevo","Kisela Voda","Klecevce","Kocani","Konce","Kondovo","Konopiste","Kosel","Kratovo","Kriva Palanka","Krivogastani","Krusevo","Kuklis","Kukurecani","Kumanovo","Labunista","Lipkovo","Lozovo","Lukovo","Makedonska Kamenica","Makedonski Brod","Mavrovi Anovi","Meseista","Miravci","Mogila","Murtino","Negotino","Negotino-Polosko","Novaci","Novo Selo","Oblesevo","Ohrid","Orasac","Orizari","Oslomej","Pehcevo","Petrovec","Plasnica","Podares","Prilep","Probistip","Radovis","Rankovce","Resen","Rosoman","Rostusa","Samokov","Saraj","Sipkovica","Sopiste","Sopotnica","Srbinovo","Star Dojran","Staravina","Staro Nagoricane","Stip","Struga","Strumica","Studenicani","Suto Orizari","Sveti Nikole","Tearce","Tetovo","Topolcani","Valandovo","Vasilevo","Velesta","Veles","Vevcani","Vinica","Vitoliste","Vranestica","Vrapciste","Vratnica","Vrutok","Zajas","Zelenikovo","Zeleno","Zitose","Zletovo","Zrnovci"],
    Madagascar: ["Antananarivo","Antsiranana","Fianarantsoa","Mahajanga","Toamasina","Toliara"],
    Malawi: ["Northern", "Central","Southern" ],
    Malaysia: ["Kuala Lumpur","Johor","Kedah","Kelantan","Labuan","Melaka","Negeri Sembilan","Pahang","Perak","Perlis","Pulau Pinang","Putrajaya","Sabah","Sarawak","Selangor","Terengganu","Wilayah Persekutuan"],
    Maldives: ["Maale","Alifu","Baa","Dhaalu","Faafu","Gaafu Alifu","Gaafu Dhaalu","Gnaviyani","Haa Alifu","Haa Dhaalu","Kaafu","Laamu","Lhaviyani","Meemu","Noonu","Raa","Seenu","Shaviyani","Thaa","Vaavu"],
    Mali: ["Bamako","Gao","Kayes","Kidal","Koulikoro","Mopti","Segou","Sikasso","Tombouctou"],
    Malta: ["Valletta"],
    Marshall_Islands: ["Ebeye","Jaluit","Delap-Uliga-Djarrit"],
    Mauritania: ["Nouakchott","Adrar","Assaba","Brakna","Dakhlet Nouadhibou","Gorgol","Guidimaka","Hodh Ech Chargui","Hodh El Gharbi","Inchiri","Tagant","Tiris Zemmour","Trarza"],
    Mauritius: ["Port Louis","Agalega Islands","Black River","Cargados Carajos Shoals","Flacq","Grand Port","Moka","Pamplemousses","Plaines Wilhems","Riviere du Rempart","Rodrigues","Savanne"],
    Mexico: ["Mexico (Distrito Federal)","Aguascalientes","Baja California","Baja California Sur","Campeche","Chiapas","Chihuahua","Coahuila de Zaragoza","Colima","Durango","Guanajuato","Guerrero","Hidalgo","Jalisco","Michoacan de Ocampo","Morelos","Nayarit","Nuevo Leon","Oaxaca","Puebla","Queretaro de Arteaga","Quintana Roo","San Luis Potosi","Sinaloa","Sonora","Tabasco","Tamaulipas","Tlaxcala","Veracruz-Llave","Yucatan","Zacatecas"],
    Micronesia: ["Palikir","Chuuk (Truk)","Kosrae","Pohnpei","Yap"],
    Moldova: ["Chisinau","Balti","Cahul","Chisinau","Chisinau","Edinet","Gagauzia","Lapusna","Orhei","Soroca","Stinga Nistrului","Tighina","Ungheni"],
    Monaco: ["Monaco","Fontvieille","La Condamine","Monaco-Ville","Monte-Carlo"],
    Mongolia: ["Ulaanbaatar","Arhangay","Bayanhongor","Bayan-Olgiy","Bulgan","Darhan Uul","Dornod","Dornogovi","Dundgovi","Dzavhan","Govi-Altay","Govi-Sumber","Hentiy","Hovd","Hovsgol","Omnogovi","Orhon","Ovorhangay","Selenge","Suhbaatar","Tov","Uvs"],
    Montenegro: ["Belgrade","Kosovo","Montenegro","Serbia","Vojvodina"],
    Morocco: ["Rabat","Ad Dakhla (Oued Eddahab)","Agadir","Al Hoceima","Azilal","Beni Mellal","Ben Slimane","Boujdour","Boulemane","Casablanca","Chaouen","El Jadida","El Kelaa des Sraghna","Er Rachidia","Essaouira","Es Smara","Fes","Figuig","Guelmim","Ifrane","Kenitra","Khemisset","Khenifra","Khouribga","Laayoune","Larache","Marrakech","Meknes","Nador","Ouarzazate","Oujda","Safi","Settat","Sidi Kacem","Tanger","Tan-Tan","Taounate","Taroudannt","Tata","Taza","Tetouan","Tiznit"],
    Mozambique: ["Maputo","Cabo Delgado","Gaza","Inhambane","Manica","Maputo","Nampula","Niassa","Sofala","Tete","Zambezia"],
    Myanmar: ["Rangoon","Ayeyarwady","Bago","Chin","Kachin","Kayin","Kayah","Magway","Mandalay","Mon","Rakhine","Sagaing","Shan","Tanintharyi","Yangon"],
    Namibia: ["Windhoek","Caprivi","Erongo","Hardap","Karas","Khomas","Kunene","Ohangwena","Okavango","Omaheke","Omusati","Oshana","Oshikoto","Otjozondjupa"],
    Nauru: ["Yaren","Aiwo","Anabar","Anetan","Anibare","Baiti","Boe","Buada","Denigomodu","Ewa","Ijuw","Meneng","Nibok","Uaboe"],
    Nepal: ["Kathmandu","Bagmati","Bheri","Dhawalagiri","Gandaki","Janakpur","Karnali","Kosi","Lumbini","Mahakali","Mechi","Narayani","Rapti","Sagarmatha","Seti"],
    Netherlands: ["Amsterdam","The Hague","","Drenthe","Flevoland","Friesland","Gelderland","Groningen","Limburg","Noord-Brabant","Noord-Holland","Overijssel","Utrecht","Zeeland","Zuid-Holland"],
    New_Zealand: ["Wellington","Akaroa","Amuri","Ashburton","Auckland","Banks Peninsula","Bay of Islands","Bay of Plenty","Bruce","Buller","Canterbury","Carterton","Chatham Islands","Cheviot","Christchurch","Clifton","Clutha","Cook","Dannevirke","Dunedin","Egmont","Eketahuna","Ellesmere","Eltham","Eyre","Far North","Featherston","Franklin","Gisborne","Golden Bay","Gore","Great Barrier Island","Grey","Hamilton","Hastings","Hauraki Plains","Hawera","Hawke\\'s Bay","Heathcote","Hikurangi","Hobson","Hokianga","Horowhenua","Hurunui","Hutt","Inangahua","Inglewood","Invercargill","Kaikoura","Kaipara","Kairanga","Kapiti Coast","Kawerau","Kiwitea","Lake","Mackenzie","Malvern","Manaia","Manawatu","Mangonui","Maniototo","Manukau","Marlborough","Masterton","Matamata","Matamata Piako","Mount Herbert","Napier","Nelson","Nelson","New Plymouth","Northland","North Shore","Ohinemuri","Opotiki","Oroua","Otago","Otamatea","Otorohanga","Oxford","Palmerston North","Pahiatua","Papakura","Paparua","Patea","Piako","Pohangina","Porirua","Queenstown Lakes","Raglan","Rangiora","Rangitikei","Rodney","Rotorua","Ruapehu","Runanga","Saint Kilda","Selwyn","Silverpeaks","Southland","South Taranaki","South Waikato","South Wairarapa","Stewart Island","Stratford","Strathallan","Taranaki","Tararua","Tasman","Taumarunui","Taupo","Tauranga","Thames Coromandel","Timaru","Tuapeka","Upper Hutt","Vincent","Waiapu","Waiheke","Waihemo","Waikato","Waikohu","Waimairi","Waimarino","Waimate","Waimate West","Waimea","Waipa","Waipawa","Waipukurau","Wairarapa South","Wairewa","Wairoa","Waitakere","Waitaki","Waitomo","Waitotara","Wallace","Wanganui","Wanganui-Manawatu","Waverley","West Coast","Western Bay of Plenty","Westland","Whakatane","Whangarei","Whangaroa","Woodville"],
    Nicaragua: ["Managua","Boaco","Carazo","Chinandega","Chontales","Esteli","Granada","Jinotega","Leon","Madriz","Managua","Masaya","Matagalpa","Nueva Segovia","Rio San Juan","Rivas","Atlantico Norte","Atlantico Sur"],
    Niger: ["Niamey","Agadez","Diffa","Dosso","Maradi","Tahoua","Tillaberi","Zinder"],
    Nigeria: ["Abuja","Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nassarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"],
    Norway: ["Oslo","Akershus","Aust-Agder","Buskerud","Finnmark","Hedmark","Hordaland","More og Romsdal","Nordland","Nord-Trondelag","Oppland","Ostfold","Rogaland","Sogn og Fjordane","Sor-Trondelag","Telemark","Troms","Vest-Agder","Vestfold"],
    Oman: ["Muscat","Ad Dakhiliyah","Al Batinah","Al Wusta","Ash Sharqiyah","Az Zahirah","Musandam","Zufar"],
    Pakistan: ["Islamabad","Balochistan","Federally Administered Tribal Areas","North-West Frontier Province","Punjab","Sindh"],
    Palau: ["Koror","Aimeliik","Airai","Angaur","Hatobohei","Kayangel","Melekeok","Ngaraard","Ngarchelong","Ngardmau","Ngatpang","Ngchesar","Ngeremlengui","Ngiwal","Peleliu","Sonsoral"],
    Palestine: [ "Jerusalem","Bethlehem","Beit Jala","Beit Sahour","Hebron","Sabastia","Jericho","Ramallah & El-Bireh","Nablus","Tulkarem","Jenin","Gaza","Rafah","Khan Younis"],
    Panama: ["Panama","Bocas del Toro","Chiriqui","Cocle","Colon","Darien","Herrera","Los Santos","San Blas","Veraguas"],
    Papua_New_Guinea: ["Port Moresby","Bougainville","Central","Chimbu","Eastern Highlands","East New Britain","East Sepik","Enga","Gulf","Madang","Manus","Milne Bay","Morobe","National Capital","New Ireland","Northern","Sandaun","Southern Highlands","Western","Western Highlands","West New Britain"],
    Paraguay: ["Asuncion","Alto Paraguay","Alto Parana","Amambay","Boqueron","Caaguazu","Caazapa","Canindeyu","Central","Concepcion","Cordillera","Guaira","Itapua","Misiones","Neembucu","Paraguari","Presidente Hayes","San Pedro"],
    Peru: ["Lima","Amazonas","Ancash","Apurimac","Arequipa","Ayacucho","Cajamarca","Callao","Cusco","Huancavelica","Huanuco","Ica","Junin","La Libertad","Lambayeque","Loreto","Madre de Dios","Moquegua","Pasco","Piura","Puno","San Martin","Tacna","Tumbes","Ucayali"],
    Philippines: ["Manila","Oriental","North Cotabato","Northern Samar","Nueva Ecija","Nueva Vizcaya","Olongapo","Ormoc","Oroquieta","Ozamis","Pagadian","Palawan","Palayan","Pampanga","Pangasinan","Pasay","Puerto Princesa","Quezon","Quezon City","Quirino","Rizal","Romblon","Roxas","Samar","San Carlos (Negros Occidental)","San Carlos (Pangasinan)","San Jose","San Pablo","Silay","Siquijor","Sorsogon","South Cotabato","Southern Leyte","Sultan Kudarat","Sulu","Surigao","Surigao del Norte","Surigao del Sur","Tacloban","Tagaytay","Tagbilaran","Tangub","Tarlac","Tawi-Tawi","Toledo","Trece Martires","Zambales","Zamboanga","Zamboanga del Norte","Zamboanga del Sur"],
    Poland: ["Warsaw","Dolnoslaskie","Kujawsko-Pomorskie","Lodzkie","Lubelskie","Lubuskie","Malopolskie","Mazowieckie","Opolskie","Podkarpackie","Podlaskie","Pomorskie","Slaskie","Swietokrzyskie","Warminsko-Mazurskie","Wielkopolskie","Zachodniopomorskie"],
    Portugal: ["Lisbon","Aveiro","Acores (Azores)","Beja","Braga","Braganca","Castelo Branco","Coimbra","Evora","Faro","Guarda","Leiria","Lisboa","Madeira","Portalegre","Porto","Santarem","Setubal","Viana do Castelo","Vila Real","Viseu"],
    Qatar: ["Doha","Ad Dawhah","Al Ghuwayriyah","Al Jumayliyah","Al Khawr","Al Wakrah","Ar Rayyan","Jarayan al Batinah","Madinat ash Shamal","Umm Salal"],
    Romania: ["Bucharest (Bucuresti)","Alba","Arad","Arges","Bacau","Bihor","Bistrita-Nasaud","Botosani","Braila","Brasov","Buzau","Calarasi","Caras-Severin","Cluj","Constanta","Covasna","Dimbovita","Dolj","Galati","Gorj","Giurgiu","Harghita","Hunedoara","Ialomita","Iasi","Ilfov","Maramures","Mehedinti","Mures","Neamt","Olt","Prahova","Salaj","Satu Mare","Sibiu","Suceava","Teleorman","Timis","Tulcea","Vaslui","Vilcea","Vrancea"],
    Russian_Federation: ["Moskva (Moscow)","Adygeya (Maykop)","Aginskiy Buryatskiy (Aginskoye)","Altay (Gorno-Altaysk)","Altayskiy (Barnaul)","Amurskaya (Blagoveshchensk)","Arkhangel\\'skaya","Astrakhanskaya","Bashkortostan (Ufa)","Belgorodskaya","Bryanskaya","Buryatiya (Ulan-Ude)","Chechnya (Groznyy)","Chelyabinskaya","Chitinskaya","Chukotskiy (Anadyr\\')","Chuvashiya (Cheboksary)","Dagestan (Makhachkala)","Evenkiyskiy (Tura)","Ingushetiya (Nazran\\')","Irkutskaya","Ivanovskaya","Kabardino-Balkariya (Nal\\'chik)","Kaliningradskaya","Kalmykiya (Elista)","Kaluzhskaya","Kamchatskaya (Petropavlovsk-Kamchatskiy)","Karachayevo-Cherkesiya (Cherkessk)","Kareliya (Petrozavodsk)","Kemerovskaya","Khabarovskiy","Khakasiya (Abakan)","Khanty-Mansiyskiy (Khanty-Mansiysk)","Kirovskaya","Komi (Syktyvkar)","Koryakskiy (Palana)","Kostromskaya","Krasnodarskiy","Krasnoyarskiy","Kurganskaya","Kurskaya","Leningradskaya","Lipetskaya","Magadanskaya","Mariy-El (Yoshkar-Ola)","Mordoviya (Saransk)","Moskovskaya","Murmanskaya","Nenetskiy (Nar\\'yan-Mar)","Nizhegorodskaya","Novgorodskaya","Novosibirskaya","Omskaya","Orenburgskaya","Orlovskaya (Orel)","Penzenskaya","Permskaya","Komi-Permyatskiy (Kudymkar)","Primorskiy (Vladivostok)","Pskovskaya","Rostovskaya","Ryazanskaya","Sakha (Yakutiya)","Sakhalinskaya (Yuzhno-Sakhalinsk)","Samarskaya","Sankt-Peterburg (Saint Petersburg)","Saratovskaya","Severnaya Osetiya-Alaniya [North Ossetia] (Vladikavkaz)","Smolenskaya","Stavropol\\'skiy","Sverdlovskaya (Yekaterinburg)","Tambovskaya","Tatarstan (Kazan\\')","Taymyrskiy (Dudinka)","Tomskaya","Tul\\'skaya","Tverskaya","Tyumenskaya","Tyva (Kyzyl)","Udmurtiya (Izhevsk)","Ul\\'yanovskaya","Ust\\'-Ordynskiy Buryatskiy (Ust\\'-Ordynskiy)","Vladimirskaya","Volgogradskaya","Vologodskaya","Voronezhskaya","Yamalo-Nenetskiy (Salekhard)","Yaroslavskaya","Yevreyskaya"],
    Rwanda: ["Kigali","Butare","Byumba","Cyangugu","Gikongoro","Gisenyi","Gitarama","Kibungo","Kibuye","Ruhengeri","Umutara"],
    St_Kitts_Nevis: ["Basseterre","Christ Church Nichola Town","St. Anne Sandy Point","St. George Basseterre","St. George Gingerland","St. James Windward","St. John Capesterre","St. John Figtree","St. Mary Cayon","St. Paul Capesterre","St. Paul Charlestown","St. Peter Basseterre","St. Thomas Lowland","St. Thomas Middle Island","Trinity Palmetto Point"],
    St_Lucia: ["Castries","Anse-la-Raye","Castries","Choiseul","Dauphin","Dennery","Gros-Islet","Laborie","Micoud","Praslin","Soufriere","Vieux-Fort"],
    Saint_Vincent_the_Grenadines: ["Kingstown","Charlotte","Grenadines","Saint Andrew","Saint David","Saint George","Saint Patrick"],
    Samoa: ["Apia","A\\'ana","Aiga-i-le-Tai","Atua","Fa\\'asaleleaga","Gaga\\'emauga","Gagaifomauga","Palauli","Satupa\\'itea","Tuamasaga","Va\\'a-o-Fonoti","Vaisigano"],
    San_Marino: ["San Marino","Acquaviva","Borgo Maggiore","Chiesanuova","Domagnano","Faetano","Fiorentino","Monte Giardino","Serravalle"],
    Sao_Tome_Principe: ["Sao Tome","Principe"],
    Saudi_Arabia: ["Riyadh","Al Bahah","Al Hudud ash Shamaliyah","Al Jawf","Al Madinah","Al Qasim","Ar Riyad","Ash Sharqiyah (Eastern Province)","\\'Asir","Ha\\'il","Jizan","Makkah","Najran","Tabuk"],
    Senegal: ["Dakar","Diourbel","Fatick","Kaolack","Kolda","Louga","Matam","Saint-Louis","Tambacounda","Thies","Ziguinchor"],
    Serbia: ["Belgrade","Kosovo","Montenegro","Serbia","Vojvodina"],
    Seychelles: ["Victoria","Anse aux Pins","Anse Boileau","Anse Etoile","Anse Louis","Anse Royale","Baie Lazare","Baie Sainte Anne","Beau Vallon","Bel Air","Bel Ombre","Cascade","Glacis","Grand\\' Anse (on Mahe)","Grand\\' Anse (on Praslin)","La Digue","La Riviere Anglaise","Mont Buxton","Mont Fleuri","Plaisance","Pointe La Rue","Port Glaud","Saint Louis","Takamaka"],
    Sierra_Leone: ["Freetown","Eastern","Northern","Southern","Western"],    
    Slovakia: ["Bratislava","Banskobystricky","Kosicky","Nitriansky","Presovsky","Trenciansky","Trnavsky","Zilinsky"],
    Slovenia: ["Ljubljana","Ajdovscina","Beltinci","Bled","Bohinj","Borovnica","Bovec","Brda","Brezice","Brezovica","Cankova-Tisina","Celje","Cerklje na Gorenjskem","Cerknica","Cerkno","Crensovci","Crna na Koroskem","Crnomelj","Destrnik-Trnovska Vas","Divaca","Dobrepolje","Dobrova-Horjul-Polhov Gradec","Dol pri Ljubljani","Domzale","Dornava","Dravograd","Duplek","Gorenja Vas-Poljane","Gorisnica","Gornja Radgona","Gornji Grad","Gornji Petrovci","Grosuplje","Hodos Salovci","Hrastnik","Hrpelje-Kozina","Idrija","Ig","Ilirska Bistrica","Ivancna Gorica","Izola","Jesenice","Jursinci","Kamnik","Kanal","Kidricevo","Kobarid","Kobilje","Kocevje","Komen","Koper","Kozje","Kranj","Kranjska Gora","Krsko","Kungota","Kuzma","Lasko","Lenart","Lendava","Litija","Ljubno","Ljutomer","Logatec","Loska Dolina","Loski Potok","Luce","Lukovica","Majsperk","Maribor","Medvode","Menges","Metlika","Mezica","Miren-Kostanjevica","Mislinja","Moravce","Moravske Toplice","Mozirje","Murska Sobota","Muta","Naklo","Nazarje","Nova Gorica","Novo Mesto","Odranci","Ormoz","Osilnica","Pesnica","Piran","Pivka","Podcetrtek","Podvelka-Ribnica","Postojna","Preddvor","Ptuj","Puconci","Race-Fram","Radece","Radenci","Radlje ob Dravi","Radovljica","Ravne-Prevalje","Ribnica","Rogasevci","Rogaska Slatina","Rogatec","Ruse","Semic","Sencur","Sentilj","Sentjernej","Sentjur pri Celju","Sevnica","Sezana","Skocjan","Skofja Loka","Skofljica","Slovenj Gradec","Slovenska Bistrica","Slovenske Konjice","Smarje pri Jelsah","Smartno ob Paki","Sostanj","Starse","Store","Sveti Jurij","Tolmin","Trbovlje","Trebnje","Trzic","Turnisce","Velenje","Velike Lasce","Videm","Vipava","Vitanje","Vodice","Vojnik","Vrhnika","Vuzenica","Zagorje ob Savi","Zalec","Zavrc","Zelezniki","Ziri","Zrece"],
    Somalia: ["Mogadishu","Awdal","Bakool","Banaadir","Bari","Bay","Galguduud","Gedo","Hiiraan","Jubbada Dhexe","Jubbada Hoose","Mudug","Nugaal","Sanaag","Shabeellaha Dhexe","Shabeellaha Hoose","Sool","Togdheer","Woqooyi Galbeed"],
    South_Africa: ["Pretoria","Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Mpumalanga","North-West","Northern Cape","Northern Province/Limpopo","Western Cape"],
    Spain: ["Madrid","Andalucia","Aragon","Asturias","Baleares (Balearic Islands)","Ceuta","Canarias (Canary Islands)","Cantabria","Castilla-La Mancha","Castilla y Leon","Cataluna","Communidad Valencian","Extremadura","Galicia","La Rioja","Melilla","Murcia","Navarra","Pais Vasco (Basque Country)"],
    Sri_Lanka: ["Colombo","Central","North Central","Northern","Eastern","North Western","Sabaragamuwa","Southern","Uva","Western"],
    Sudan: ["Khartoum","A\\'ali an Nil","Al Bahr al Ahmar","Al Buhayrat","Al Jazirah","Al Khartum","Al Qadarif","Al Wahdah","An Nil al Abyad","An Nil al Azraq","Ash Shamaliyah","Bahr al Jabal","Gharb al Istiwa\\'iyah","Gharb Bahr al Ghazal","Gharb Darfur","Gharb Kurdufan","Janub Darfur","Janub Kurdufan","Junqali","Kassala","Nahr an Nil","Shamal Bahr al Ghazal","Shamal Darfur","Shamal Kurdufan","Sharq al Istiwa\\'iyah","Sinnar","Warab"],
    Suriname: ["Paramaribo","Brokopondo","Commewijne","Coronie","Marowijne","Nickerie","Para","Saramacca","Sipaliwini","Wanica"],
    Sweden: ["Stockholm","Blekinge","Dalarnas","Gavleborgs","Gotlands","Hallands","Jamtlands","Jonkopings","Kalmar","Kronobergs","Norrbottens","Orebro","Ostergotlands","Skane","Sodermanlands","Uppsala","Varmlands","Vasterbottens","Vasternorrlands","Vastmanlands","Vastra Gotalands"],
    Switzerland: ["Bern","Aargau","Appenzell Ausser-Rhoden","Appenzell Inner-Rhoden","Basel-Landschaft","Basel-Stadt","Fribourg","Geneve","Glarus","Graubunden","Jura","Luzern","Neuchatel","Nidwalden","Obwalden","Sankt Gallen","Schaffhausen","Schwyz","Solothurn","Thurgau","Ticino","Uri","Valais","Vaud","Zug","Zurich"],
    Syria: ["Damascus","Al Hasakah","Al Ladhiqiyah","Al Qunaytirah","Ar Raqqah","As Suwayda\\'","Dar\\'a","Dayr az Zawr","Dimashq","Halab","Hamah","Hims","Idlib","Rif Dimashq","Tartus"],
    Taiwan: ["Taipei","Chang-hua","Chia-i","Chi-lung","Chung-hsing-hsin-ts\\'un","Hsin-chu","Hua-lien","I-lan","Kao-hsiung","Miao-li","Nan-t\\'ou","P\\'eng-hu","P\\'ing-tung","T\\'ai-chung","T\\'ai-nan","T\\'ai-pei","T\\'ai-tung","T\\'ao-yuan/Yun-lin"],
    Tajikistan: ["Dushanbe","Viloyati Mukhtori Kuhistoni Badakhshon","Viloyati Khatlon","Viloyati Sughd"],
    Tanzania: ["Dodoma","Arusha","Dar es Salaam","Iringa","Kagera","Kigoma","Kilimanjaro","Lindi","Mara","Mbeya","Morogoro","Mtwara","Mwanza","Pemba North","Pemba South","Pwani","Rukwa","Ruvuma","Shinyanga","Singida","Tabora","Tanga","Zanzibar Central/South","Zanzibar North","Zanzibar Urban/West"],
    Thailand: ["Bangkok","Amnat Charoen","Ang Thong","Buriram","Chachoengsao","Chai Nat","Chaiyaphum","Chanthaburi","Chiang Mai","Chiang Rai","Chon Buri","Chumphon","Kalasin","Kamphaeng Phet","Kanchanaburi","Khon Kaen","Krabi","Lampang","Lamphun","Loei","Lop Buri","Mae Hong Son","Maha Sarakham","Mukdahan","Nakhon Nayok","Nakhon Pathom","Nakhon Phanom","Nakhon Ratchasima","Nakhon Sawan","Nakhon Si Thammarat","Nan","Narathiwat","Nong Bua Lamphu","Nong Khai","Nonthaburi","Pathum Thani","Pattani","Phangnga","Phatthalung","Phayao","Phetchabun","Phetchaburi","Phichit","Phitsanulok","Phra Nakhon Si Ayutthaya","Phrae","Phuket","Prachin Buri","Prachuap Khiri Khan","Ranong","Ratchaburi","Rayong","Roi Et","Sa Kaeo","Sakon Nakhon","Samut Prakan","Samut Sakhon","Samut Songkhram","Sara Buri","Satun","Sing"],
    Togo: ["Lome","De La Kara","Des Plateaux","Des Savanes","Centrale","Maritime"],
    Tonga: ["Nuku'alofa","Ha\\'apai","Tongatapu","Vava\\'u'"],    
    Tunisia: ["Tunis","Ariana","Beja","Ben Arous","Bizerte","El Kef","Gabes","Gafsa","Jendouba","Kairouan","Kasserine","Kebili","Mahdia","Medenine","Monastir","Nabeul","Sfax","Sidi Bou Zid","Siliana","Sousse","Tataouine","Tozeur","Zaghouan"],
    Turkey: ["Ankara","Adana","Adiyaman","Afyon","Agri","Aksaray","Amasya","Antalya","Ardahan","Artvin","Aydin","Balikesir","Bartin","Batman","Bayburt","Bilecik","Bingol","Bitlis","Bolu","Burdur","Bursa","Canakkale","Cankiri","Corum","Denizli","Diyarbakir","Duzce","Edirne","Elazig","Erzincan","Erzurum","Eskisehir","Gaziantep","Giresun","Gumushane","Hakkari","Hatay","Icel","Igdir","Isparta","Istanbul","Izmir","Kahramanmaras","Karabuk","Karaman","Kars","Kastamonu","Kayseri","Kilis","Kirikkale","Kirklareli","Kirsehir","Kocaeli","Konya","Kutahya","Malatya","Manisa","Mardin","Mugla","Mus","Nevsehir","Nigde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Sanliurfa","Siirt","Sinop","Sirnak","Sivas","Tekirdag","Tokat","Trabzon","Tunceli","Usak","Van","Yalova","Yozgat","Zonguldak  Buri","Sisaket","Songkhla","Sukhothai","Suphan Buri","Surat Thani","Surin","Tak","Trang","Trat","Ubon Ratchathani","Udon Thani","Uthai Thani","Uttaradit","Yala","Yasothon"],
    Turkmenistan: ["Ashgabat","Ahal Welayaty","Balkan Welayaty","Dasoguz Welayaty","Labap Welayaty","Mary Welayaty"],
    Tuvalu: ["Fongafale"],
    Uganda: ["Kampala","Adjumani","Apac","Arua","Bugiri","Bundibugyo","Bushenyi","Busia","Gulu","Hoima","Iganga","Jinja","Kabale","Kabarole","Kaberamaido","Kalangala","Kamuli","Kamwenge","Kanungu","Kapchorwa","Kasese","Katakwi","Kayunga","Kibale","Kiboga","Kisoro","Kitgum","Kotido","Kumi","Kyenjojo","Lira","Luwero","Masaka","Masindi","Mayngc","Mbale","Mbarara","Moroto","Moyo","Mpigi","Mubende","Mukono","Nakapiripiti","Nakasongola","Nebbi","Ntungamo","Pader","Pallisa","Rakai","Rukungiri","Sembabule","Sironko","Soroti","Tororo","Wakiso","Yumbe"],
    Ukraine: ["Kiev (Kyyiv)","Cherkas\\'ka (Cherkasy)","Chernihivs\\'ka (Chernihiv)","Chernivets\\'ka (Chernivtsi)","Dnipropetrovs\\'ka (Dnipropetrovs\\'k)","Donets\\'ka (Donets\\'k)","Ivano-Frankivs\\'ka (Ivano-Frankivs\\'k)","Izmail (Izmayl)","Kharkivs\\'ka (Kharkiv)","Khersons\\'ka (Kherson)","Khmel\\'nyts\\'ka (Khmel\\'nyts\\'kyy)","Kirovohrads\\'ka (Kirovohrad)","Luhans\\'ka (Luhans\\'k)","L\\'vivs\\'ka (L\\'viv)","Mykolayivs\\'ka (Mykolayiv)","Odes\\'ka (Odesa)","Poltavs\\'ka (Poltava)","Avtonomna Respublika Krym","Rivnens\\'ka (Rivne)","Sevastopol\\'","Sums\\'ka (Sumy)","Ternopil\\'s\\'ka (Ternopil\\')","Vinnyts\\'ka (Vinnytsya)","Volyns\\'ka (Luts\\'k)","Zakarpats\\'ka (Uzhhorod)","Zaporiz\\'ka (Zaporizhzhya)","Zhytomyrs\\'ka (Zhytomyr)"],
    United_Arab_Emirates: ["Abu Dhabi","\\'Ajman","Al Fujayrah","Ash Shariqah (Sharjah)","Dubayy (Dubai)","Ra\\'s al Khaymah","Umm al Quain"],
    United_Kingdom: ["England","Wales","Scotland","Northern Ireland"],
    United_States: ["Washington DC","Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Georgia","Kentucky","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusets","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],
    Uruguay: ["Montevideo","Artigas","Canelones","Cerro Largo","Colonia","Durazno","Flores","Florida","Lavalleja","Maldonado","Paysandu","Rio Negro","Rivera","Rocha","Salto","San Jose","Soriano","Tacuarembo","Treinta y Tres"],
    Uzbekistan: ["Tashkent (Toshkent)","Andijon Viloyati","Buxoro Viloyati","Farg\\'ona Viloyati","Jizzax Viloyati","Namangan Viloyati","Navoiy Viloyati","Qashqadaryo Viloyati (Qarshi)","Qaraqalpog\\'iston Respublikasi","Samarqand Viloyati","Sirdaryo Viloyati (Guliston)","Surxondaryo Viloyati (Termiz)","Toshkent Shahri","Toshkent Viloyati","Xorazm Viloyati (Urganch)"],
    Vanuatu: ["Port-Vila","Malampa","Penama","Sanma","Shefa","Tafea","Torba"],
    Vatican_City: ["Vatican"],
    Venezuela: ["Caracas","Amazonas","Anzoategui","Apure","Aragua","Barinas","Bolivar","Carabobo","Cojedes","Delta Amacuro","Dependencias Federales","Distrito Federal","Falcon","Guarico","Lara","Merida","Miranda","Monagas","Nueva Esparta","Portuguesa","Sucre","Tachira","Trujillo","Vargas","Yaracuy","Zulia"],
    Vietnam: ["Hanoi","An Giang","Bac Giang","Bac Kan","Bac Lieu","Bac Ninh","Ba Ria-Vung Tau","Ben Tre","Binh Dinh","Binh Duong","Binh Phuoc","Binh Thuan","Ca Mau","Can Tho","Cao Bang","Dac Lak","Da Nang","Dong Nai","Dong Thap","Gia Lai","Ha Giang","Hai Duong","Hai Phong","Ha Nam","Ha Noi","Ha Tay","Ha Tinh","Hoa Binh","Ho Chi Minh","Hung Yen","Khanh Hoa","Kien Giang","Kon Tum","Lai Chau","Lam Dong","Lang Son","Lao Cai","Long An","Nam Dinh","Nghe An","Ninh Binh","Ninh Thuan","Phu Tho","Phu Yen","Quang Binh","Quang Nam","Quang Ngai","Quang Ninh","Quang Tri","Soc Trang","Son La","Tay Ninh","Thai Binh","Thai Nguyen","Thanh Hoa","Thua Thien-Hue","Tien Giang","Tra Vinh","Tuyen Quang","Vinh Long","Vinh Phuc","Yen Bai"],
    Yemen: ["Sanaa","Abyan","'Adan","Al Bayda'","Al Hudaydah","Al Jawf","Al Mahrah","Al Mahwit","Dhamar","Hadramawt","Hajjah","Ibb","Lahij","Ma'rib","Sa'dah","San'a'","Shabwah","Ta'izz"],
    Zambia: ["Lusaka","Central","Copperbelt","Eastern","Luapula","Lusaka","Northern","North-Western","Southern","Western"],
    Zimbabwe: ["Harare","Bulawayo","Manicaland","Mashonaland Central","Mashonaland East","Mashonaland West","Masvingo","Matabeleland North","Matabeleland South","Midlands"]
};

  const handleCountryChange = (event) => {
    setFormData({ ...formData, country: event.target.value, state: "" });
  };

  const handleStateChange = (event) => {
    setFormData({ ...formData, state: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;

    try {
      const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/user-address/addAddress/${userId}`;
      const response = await axios.post(apiUrl, formData);

      if (response.status === 201) {
        toast("Address Added success! Reload to show to address", {
          icon: "😄",
          style: {
            borderRadius: "rgb(189, 224, 254)",
            background: "rgb(70, 11, 70)",
            color: "rgb(255, 210, 255)",
          },
        });
        // navigate("/address-payment-placeOrder/confirmOrder");
      } else {
        console.error("Error adding address.");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Clear the form data for nice harshal
    setFormData({
      address: "",
      city: "",
      pincode: "",
      phoneNumber: "",
      country: "",
      state: "",
    });
  };

  const handleEditClick = (address) => {
    setEditMode(true);
    setUpdatedFormData({ ...address });
    setSelectedAddressId(address._id);
  };

  const handleSaveClick = async () => {
    if (selectedAddressId) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData._id;

      try {
        const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/user-address/updateAddress/${userId}/${selectedAddressId}`;
        const response = await axios.put(apiUrl, updatedFormData);

        if (response.status === 200) {
          toast("Address updated success!", {
            icon: "😄",
            style: {
              borderRadius: "rgb(189, 224, 254)",
              background: "rgb(70, 11, 70)",
              color: "rgb(255, 210, 255)",
            },
          });
          setEditMode(false);
          setSelectedAddressId(null);
          fetchUserAddresses();
        } else {
          console.error("Error updating address.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const deleteAddress = async (addressId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;

    try {
      const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/user-address/deleteAddress/${userId}/${addressId}`;
      const response = await axios.delete(apiUrl);

      if (response.status === 200) {
        toast("Address Deleted success!", {
          icon: "😞",
          style: {
            borderRadius: "rgb(189, 224, 254)",
            background: "rgb(70, 11, 70)",
            color: "rgb(255, 210, 255)",
          },
        });
        fetchUserAddresses();
      } else {
        console.error("Error deleting address.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserAddresses = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    try {
      const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/user-address/getAddresses/${userId}`;
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setUserAddresses(response.data);
        localStorage.setItem("Address", JSON.stringify(response.data));
      } else {
        console.error("Error fetching addresses.");
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <Fragment>
      <h1 style={{ position: "relative", top: '8rem' }}>Place Order</h1>
      <div className="PlaceOrder-outer-container">
        <form className="form-submit" onSubmit={handleSubmit}>
          <input
            style={{
              width: "100%",
              border: "3px solid rgb(189, 224, 254)",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />

          <input
            style={{
              width: "100%",
              border: "3px solid rgb(189, 224, 254)",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />

          <input
            style={{
              width: "100%",
              border: "3px solid rgb(189, 224, 254)",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Pin Code"
            value={formData.pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            required
          />

      <PhoneInput
      style={{
        width: "100%",
        border: "3px solid rgb(189, 224, 254)",
        backgroundColor: "rgb(256,212,252)",
        borderRadius: "5px",
      }}
        inputProps={{
          name: 'phone',
          required: true,
          autoFocus: true
        }}
      />

          <select
            value={formData.country}
            onChange={handleCountryChange}
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          {formData.country && (
            <select
              value={formData.state}
              onChange={handleStateChange}
              required
            >
              <option value="" disabled>
                Select State
              </option>
              {stateData[formData.country].map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          )}

          <button id="btn-order" type="submit">
            Submit
          </button>
        </form>

        <div className="right-container-dataShow">
          <h1 className="dataShow-heading">Select the Address</h1>
          {userAddresses.map((address, index) => (
            <div className="dataShow-address" key={index}>
              {editMode && selectedAddressId === address._id ? (
                <div>
                  <input
                  style={{border:"2px solid rgb(70, 11, 70)", width:'100%', marginBottom:'0.5px'}}
                    type="text"
                    value={updatedFormData.address}
                    onChange={(e) =>
                      setUpdatedFormData({
                        ...updatedFormData,
                        address: e.target.value,
                      })
                    }
                  />
                  <input
                  style={{border:"2px solid rgb(70, 11, 70)", width:'100%', marginBottom:'0.5px'}}
                    type="text"
                    value={updatedFormData.city}
                    onChange={(e) =>
                      setUpdatedFormData({
                        ...updatedFormData,
                        city: e.target.value,
                      })
                    }
                  />
                  <input
                  style={{border:"2px solid rgb(70, 11, 70)", width:'100%', marginBottom:'0.5px'}}
                    type="text"
                    value={updatedFormData.pincode}
                    onChange={(e) =>
                      setUpdatedFormData({
                        ...updatedFormData,
                        pincode: e.target.value,
                      })
                    }
                  />
                  <input
                  style={{border:"2px solid rgb(70, 11, 70)", width:'100%', marginBottom:'0.5px'}}
                    type="text"
                    value={updatedFormData.phoneNumber}
                    onChange={(e) =>
                      setUpdatedFormData({
                        ...updatedFormData,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <Fragment>
                  <h5 className="address">Address: {address.address}</h5>
                  <h5 className="city">City: {address.city}</h5>
                  <h5 className="pinCode">Pin Code: {address.pincode}</h5>
                  <h5 className="phoneNumber">Phone Number: {address.phoneNumber}</h5>
                </Fragment>
              )}
              <h5 className="country">Country: {address.country}</h5>
              <h5 className="state">State: {address.state}</h5>
              {editMode && selectedAddressId === address._id ? (
                <button onClick={handleSaveClick}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(address)}>Edit</button>
              )}
              <button onClick={() => deleteAddress(address._id)}>Delete</button>
              <button onClick={goToOrder}>Order With Address</button> 
              <h6 style={{border:'2px solid red', display:'none'}}>value :{totalCartValue}</h6>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PlaceOrder;