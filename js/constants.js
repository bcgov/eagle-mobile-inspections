// Roles
export const ROLE_ADMIN = 'Admin'

// Date Formats
export const DATE_FULL_MONTH_DAY_YEAR = 'MMMM d, yyyy' // February 5, 2019
export const DATE_SHORT_MONTH_DAY_YEAR = 'MMM d, yyyy' // Feb 5, 2019
export const DATE_YEAR_SHORT_MONTH_DAY = 'yyyy-MMM-dd' // 2019-Feb-05
export const DATE_ISO_8601 = 'yyyy-MM-dd' // 2019-02-05
export const DATE_TIME_ISO_8601 = "yyyy-MM-dd'T'HH:mm:ss" // 2019-02-05T19:02:07
export const DATE_TIME_READABLE = "MMMM d, yyyy 'at' h:mm:ss a" // February 5, 2019 at 7:02:07 PM
export const DATE_ZULU = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'" // 2019-02-05T19:02:07.321Z

// Auth states
export const AUTH_SIGNED_IN = 'signedIn'
export const AUTH_SIGNED_OUT = 'signedOut'
export const AUTH_SIGN_IN = 'signIn'
export const AUTH_SIGN_UP = 'signUp'
export const AUTH_CONFIRM_SIGN_UP = 'confirmSignUp'
export const AUTH_CONFIRM_SIGN_IN = 'confirmSignIn'
export const AUTH_REQUIRE_NEW_PASSWORD = 'requireNewPassword'
export const AUTH_TOTP_SETUP = 'TOTPSetup'

// API
export const API_ADMIN = 'AdministratorAPI'

export const GST = 0.05
export const PST = 0.07

export const DEFAULT_COORDS = { Easting: 0, Northing: 0, ZoneNumber: 999, ZoneLetter: 'ZZ' }
export const staticProjects = [{
  searchResults:
    [
      /* 1 */
      {
        _id: '58850ff0aaecd9001b8089c1',
        name: 'Keenleyside Powerplant'
      },

      /* 2 */
      {
        _id: '58850ff2aaecd9001b808bae',
        name: 'Seven Mile Generating Station Unit 4'
      },

      /* 3 */
      {
        _id: '58850ff4aaecd9001b808d9b',
        name: 'Waneta Generating Station Upgrade'
      },

      /* 4 */
      {
        _id: '58850ff6aaecd9001b808f88',
        name: 'Prosperity Gold-Copper'
      },

      /* 5 */
      {
        _id: '58850ff8aaecd9001b809175',
        name: 'Nazko Lava Quarry Extension'
      },

      /* 6 */
      {
        _id: '58850ffaaaecd9001b809362',
        name: 'Fiberco Pulp Mill Expansion'
      },

      /* 7 */
      {
        _id: '58850ffcaaecd9001b80954f',
        name: 'Crowsnest Co-generation Plant'
      },

      /* 8 */
      {
        _id: '58850ffeaaecd9001b80973c',
        name: 'Kamloops Energy Recovery'
      },

      /* 9 */
      {
        _id: '58851000aaecd9001b809929',
        name: 'Red Mountain Gold'
      },

      /* 10 */
      {
        _id: '58851002aaecd9001b809b16',
        name: 'Willow Creek'
      },

      /* 11 */
      {
        _id: '58851004aaecd9001b809d03',
        name: 'Elkhorn Quarry Extension'
      },

      /* 12 */
      {
        _id: '58851006aaecd9001b809ef0',
        name: 'Jumbo Glacier Resort'
      },

      /* 13 */
      {
        _id: '58851008aaecd9001b80a0dd',
        name: 'Red Chris Copper and Gold Mine'
      },

      /* 14 */
      {
        _id: '5885100aaaecd9001b80a2ca',
        name: 'Bronson Slope Gold and Copper Mine'
      },

      /* 15 */
      {
        _id: '5885100caaecd9001b80a4b7',
        name: 'Kemess South'
      },

      /* 16 */
      {
        _id: '5885100eaaecd9001b80a6a4',
        name: 'McGillivray Coal'
      },

      /* 17 */
      {
        _id: '58851010aaecd9001b80a891',
        name: 'Revelstoke Generating Station Unit 5'
      },

      /* 18 */
      {
        _id: '58851012aaecd9001b80aa7e',
        name: 'PAC-RIM Pipeline'
      },

      /* 19 */
      {
        _id: '58851014aaecd9001b80ac6b',
        name: 'Younger NGL Plant Expansion'
      },

      /* 20 */
      {
        _id: '58851016aaecd9001b80ae58',
        name: 'Lafarge Cement Plant Modernization'
      },

      /* 21 */
      {
        _id: '58851018aaecd9001b80b045',
        name: 'Crystal Peak Garnet'
      },

      /* 22 */
      {
        _id: '5885101aaaecd9001b80b232',
        name: 'Stave Falls Powerplant'
      },

      /* 23 */
      {
        _id: '5885101caaecd9001b80b41f',
        name: 'Melvin Creek/Cayoosh Mountain Resort'
      },

      /* 24 */
      {
        _id: '5885101eaaecd9001b80b60c',
        name: 'Greenville to Kincolith Road'
      },

      /* 25 */
      {
        _id: '58851020aaecd9001b80b7f9',
        name: 'Telkwa Coal'
      },

      /* 26 */
      {
        _id: '58851022aaecd9001b80b9e6',
        name: 'Trans Mountain Pipe Line Modification'
      },

      /* 27 */
      {
        _id: '58851024aaecd9001b80bbd3',
        name: 'Eskay Creek Mine Mill Expansion'
      },

      /* 28 */
      {
        _id: '58851026aaecd9001b80bdc0',
        name: 'Taylor Straddle Plant'
      },

      /* 29 */
      {
        _id: '58851028aaecd9001b80bfad',
        name: 'Taiga Forest Products Lumber Treatment Facility'
      },

      /* 30 */
      {
        _id: '5885102aaaecd9001b80c19a',
        name: 'Ring Border Gas Plant Expansion'
      },

      /* 31 */
      {
        _id: '5885102caaecd9001b80c387',
        name: 'Sulphurets Gold/Silver'
      },

      /* 32 */
      {
        _id: '5885102eaaecd9001b80c574',
        name: 'WGSI LNG Storage'
      },

      /* 33 */
      {
        _id: '58851030aaecd9001b80c761',
        name: 'Island Cogeneration'
      },

      /* 34 */
      {
        _id: '58851032aaecd9001b80c94e',
        name: 'Laredo Limestone'
      },

      /* 35 */
      {
        _id: '58851034aaecd9001b80cb3b',
        name: 'West Stoddart Gas Processing Facility'
      },

      /* 36 */
      {
        _id: '58851036aaecd9001b80cd28',
        name: 'Babkirk Special Waste Treatment Facility'
      },

      /* 37 */
      {
        _id: '58851038aaecd9001b80cf15',
        name: 'Mount Milligan Copper/Gold'
      },

      /* 38 */
      {
        _id: '5885103aaaecd9001b80d102',
        name: 'Southern Crossing Pipeline'
      },

      /* 39 */
      {
        _id: '5885103caaecd9001b80d2ef',
        name: 'Pingston Creek Hydroelectric'
      },

      /* 40 */
      {
        _id: '5885103eaaecd9001b80d4dc',
        name: 'Silvertip Silver/Lead/Zinc Mine'
      },

      /* 41 */
      {
        _id: '58851040aaecd9001b80d6c9',
        name: 'Stronsay Lead/Zinc'
      },

      /* 42 */
      {
        _id: '58851042aaecd9001b80d8b6',
        name: 'District of Chilliwack Groundwater Well'
      },

      /* 43 */
      {
        _id: '58851044aaecd9001b80daa3',
        name: 'Squamish Groundwater Well'
      },

      /* 44 */
      {
        _id: '58851046aaecd9001b80dc90',
        name: 'Cascade Heritage Power'
      },

      /* 45 */
      {
        _id: '58851049aaecd9001b80de7d',
        name: 'Mt. Polley Copper'
      },

      /* 46 */
      {
        _id: '5885104baaecd9001b80e06a',
        name: 'Lumby Muscovite'
      },

      /* 47 */
      {
        _id: '5885104daaecd9001b80e257',
        name: 'Royal Bay Evaluation'
      },

      /* 48 */
      {
        _id: '5885104eaaecd9001b80e444',
        name: 'Port Alberni Cogeneration'
      },

      /* 49 */
      {
        _id: '58851050aaecd9001b80e631',
        name: 'Maxhamish Pipeline'
      },

      /* 50 */
      {
        _id: '58851052aaecd9001b80e81e',
        name: 'Tom MacKay Lake Waste Rock & Tailings'
      },

      /* 51 */
      {
        _id: '58851055aaecd9001b80ea0b',
        name: 'Cariboo Gold'
      },

      /* 52 */
      {
        _id: '58851056aaecd9001b80ebf8',
        name: 'Tulsequah Chief Mine'
      },

      /* 53 */
      {
        _id: '58851058aaecd9001b80ede5',
        name: 'Kamloops Groundwater'
      },

      /* 54 */
      {
        _id: '5885105aaaecd9001b80efd2',
        name: 'Bulrush Natural Gas Production and Processing Facility'
      },

      /* 55 */
      {
        _id: '5885105caaecd9001b80f1bf',
        name: 'Caribou Gas Processing Plant'
      },

      /* 56 */
      {
        _id: '5885105eaaecd9001b80f3ac',
        name: 'Fort Nelson Electrical Generation'
      },

      /* 57 */
      {
        _id: '58851060aaecd9001b80f599',
        name: 'Highway Gas and Liquids Plant and Pipeline'
      },

      /* 58 */
      {
        _id: '58851062aaecd9001b80f786',
        name: 'Jedney Gas Processing Plant and Pipeline Facilities'
      },

      /* 59 */
      {
        _id: '58851064aaecd9001b80f973',
        name: 'Jedney Gas Plant & Pipeline Expansion'
      },

      /* 60 */
      {
        _id: '58851067aaecd9001b80fb60',
        name: 'Bodie Waste Dump'
      },

      /* 61 */
      {
        _id: '58851069aaecd9001b80fd4d',
        name: 'Cougar South/Main Pits and West Spoil Coal'
      },

      /* 62 */
      {
        _id: '5885106baaecd9001b80ff3a',
        name: 'Huckleberry Copper and Gold Mine'
      },

      /* 63 */
      {
        _id: '5885106daaecd9001b810127',
        name: 'Kwoiek Creek Hydroelectric'
      },

      /* 64 */
      {
        _id: '5885106faaecd9001b810314',
        name: 'Peace Valley Oriented Strand Board'
      },

      /* 65 */
      {
        _id: '58851071aaecd9001b810501',
        name: 'Bamberton Town Development'
      },

      /* 66 */
      {
        _id: '58851073aaecd9001b8106ee',
        name: 'Brilliant Powerplant Expansion'
      },

      /* 67 */
      {
        _id: '58851075aaecd9001b8108db',
        name: 'McMahon Co-Generation'
      },

      /* 68 */
      {
        _id: '58851077aaecd9001b810ac8',
        name: 'Boundary Lake Sour Gas Plant'
      },

      /* 69 */
      {
        _id: '58851079aaecd9001b810cb5',
        name: 'Line Creek Coal'
      },

      /* 70 */
      {
        _id: '5885107baaecd9001b810ea2',
        name: 'Inland Pacific Connector'
      },

      /* 71 */
      {
        _id: '5885107daaecd9001b81108f',
        name: 'Burnaby Lake Rejuvenation Program'
      },

      /* 72 */
      {
        _id: '5885107eaaecd9001b81127c',
        name: 'North Lakeside Well'
      },

      /* 73 */
      {
        _id: '58851081aaecd9001b811469',
        name: 'Basal Aquifer Dewatering'
      },

      /* 74 */
      {
        _id: '58851083aaecd9001b811656',
        name: 'Forrest Kerr Hydroelectric'
      },

      /* 75 */
      {
        _id: '58851085aaecd9001b811843',
        name: 'Wolverine Coal Mine'
      },

      /* 76 */
      {
        _id: '58851087aaecd9001b811a30',
        name: 'Cranbrook Deep Wells'
      },

      /* 77 */
      {
        _id: '58851089aaecd9001b811c1d',
        name: 'Silverberry Secure Landfill'
      },

      /* 78 */
      {
        _id: '5885108baaecd9001b811e0a',
        name: 'Eagle Rock Quarry'
      },

      /* 79 */
      {
        _id: '5885108daaecd9001b811ff7',
        name: 'Port Alberni Generation'
      },

      /* 80 */
      {
        _id: '5885108faaecd9001b8121e4',
        name: 'Stewart Bulk Terminals Wharf Expansion'
      },

      /* 81 */
      {
        _id: '58851091aaecd9001b8123d1',
        name: 'Sea-To-Sky Highway Upgrade'
      },

      /* 82 */
      {
        _id: '58851093aaecd9001b8125be',
        name: 'Vancouver Island Generation'
      },

      /* 83 */
      {
        _id: '58851095aaecd9001b8127ab',
        name: 'South Fraser Perimeter Road'
      },

      /* 84 */
      {
        _id: '58851097aaecd9001b812998',
        name: 'Coursier Dam Decommissioning'
      },

      /* 85 */
      {
        _id: '58851099aaecd9001b812b85',
        name: 'Canada Line Rapid Transit'
      },

      /* 86 */
      {
        _id: '5885109baaecd9001b812d72',
        name: 'Hart Water Supply Improvements Fishtrap Island Collector Well'
      },

      /* 87 */
      {
        _id: '5885109daaecd9001b812f5f',
        name: 'Vancouver Convention Centre Expansion'
      },

      /* 88 */
      {
        _id: '5885109faaecd9001b81314c',
        name: 'Ashcroft Ranch Landfill'
      },

      /* 89 */
      {
        _id: '588510a1aaecd9001b813339',
        name: 'Deltaport Third Berth'
      },

      /* 90 */
      {
        _id: '588510a3aaecd9001b813526',
        name: 'Container Terminal 2'
      },

      /* 91 */
      {
        _id: '588510a5aaecd9001b813713',
        name: 'New Fraser River Crossing'
      },

      /* 92 */
      {
        _id: '588510a7aaecd9001b813900',
        name: 'Sustut Copper'
      },

      /* 93 */
      {
        _id: '588510a8aaecd9001b813aed',
        name: 'Raising of Sooke Reservoir Dam by One Metre'
      },

      /* 94 */
      {
        _id: '588510aaaaecd9001b813cda',
        name: 'Cape Scott Wind Farm'
      },

      /* 95 */
      {
        _id: '588510acaaecd9001b813ec7',
        name: 'Waneta Hydroelectric Expansion'
      },

      /* 96 */
      {
        _id: '588510aeaaecd9001b8140b4',
        name: 'Chemainus Wells Water Supply'
      },

      /* 97 */
      {
        _id: '588510b0aaecd9001b8142a1',
        name: 'Hills Bar Aggregate Quarrying'
      },

      /* 98 */
      {
        _id: '588510b2aaecd9001b81448e',
        name: "NorskeCanada's Crofton De-Inking Plant"
      },

      /* 99 */
      {
        _id: '588510b4aaecd9001b81467b',
        name: 'Morrison Copper/Gold'
      },

      /* 100 */
      {
        _id: '588510b6aaecd9001b814868',
        name: 'Orca Sand and Gravel'
      },

      /* 101 */
      {
        _id: '588510b8aaecd9001b814a55',
        name: 'Kemess North Copper-Gold Mine'
      },

      /* 102 */
      {
        _id: '588510baaaecd9001b814c42',
        name: 'Prince George Wood Residue Fired Cogeneration'
      },

      /* 103 */
      {
        _id: '588510bcaaecd9001b814e2f',
        name: 'Holberg Wind Energy'
      },

      /* 104 */
      {
        _id: '588510beaaecd9001b81501c',
        name: 'NaiKun Offshore Wind Energy'
      },

      /* 105 */
      {
        _id: '588510c0aaecd9001b815209',
        name: 'Whistler Nordic Centre'
      },

      /* 106 */
      {
        _id: '588510c2aaecd9001b8153f6',
        name: 'Chilliwack Well 9'
      },

      /* 107 */
      {
        _id: '588510c4aaecd9001b8155e3',
        name: 'Red Chris Porphyry Copper-Gold Mine'
      },

      /* 108 */
      {
        _id: '588510c6aaecd9001b8157d0',
        name: 'Galore Creek Copper-Gold-Silver'
      },

      /* 109 */
      {
        _id: '588510c8aaecd9001b8159bd',
        name: 'South Meager Geothermal'
      },

      /* 110 */
      {
        _id: '588510caaaecd9001b815baa',
        name: 'Trend Coal'
      },

      /* 111 */
      {
        _id: '588510ccaaecd9001b815d97',
        name: 'Dunkley Lumber Mill Expansion'
      },

      /* 112 */
      {
        _id: '588510cdaaecd9001b815f84',
        name: 'Kitimat LNG Terminal'
      },

      /* 113 */
      {
        _id: '588510d0aaecd9001b816171',
        name: 'East Toba River Montrose Creek Hydroelectric'
      },

      /* 114 */
      {
        _id: '588510d2aaecd9001b81635e',
        name: 'Mount Klappan Coal'
      },

      /* 115 */
      {
        _id: '588510d4aaecd9001b81654b',
        name: 'Port Mann/Highway 1'
      },

      /* 116 */
      {
        _id: '588510d6aaecd9001b816738',
        name: 'Swamp Point Aggregate Mine'
      },

      /* 117 */
      {
        _id: '588510d8aaecd9001b816925',
        name: 'Nahwitti Wind Farm'
      },

      /* 118 */
      {
        _id: '588510daaaecd9001b816b12',
        name: 'Vancouver Island Transmission Reinforcement'
      },

      /* 119 */
      {
        _id: '588510dcaaecd9001b816cff',
        name: 'Upper Harrison Water Power'
      },

      /* 120 */
      {
        _id: '588510deaaecd9001b816eec',
        name: 'Brule Mine'
      },

      /* 121 */
      {
        _id: '588510e0aaecd9001b8170d9',
        name: 'Cogburn Magnesium'
      },

      /* 122 */
      {
        _id: '588510e2aaecd9001b8172c6',
        name: 'Terrace Green Street Well'
      },

      /* 123 */
      {
        _id: '588510e4aaecd9001b8174b3',
        name: 'Bear River Gravel'
      },

      /* 124 */
      {
        _id: '588510e5aaecd9001b8176a0',
        name: 'Dokie Wind Energy'
      },

      /* 125 */
      {
        _id: '588510e8aaecd9001b81788d',
        name: 'Wartenbe Wind Energy'
      },

      /* 126 */
      {
        _id: '588510eaaaecd9001b817a7a',
        name: 'Ruby Creek Molybdenum'
      },

      /* 127 */
      {
        _id: '588510ecaaecd9001b817c67',
        name: 'Coquihalla Pass Resort Development'
      },

      /* 128 */
      {
        _id: '588510eeaaecd9001b817e54',
        name: 'Davidson'
      },

      /* 129 */
      {
        _id: '588510f0aaecd9001b818041',
        name: 'Highland Valley Centre for Sustainable Waste Management'
      },

      /* 130 */
      {
        _id: '588510f2aaecd9001b81822e',
        name: 'Kutcho Copper-Zinc-Silver-Gold Mine'
      },

      /* 131 */
      {
        _id: '588510f4aaecd9001b81841b',
        name: 'Horizon Mine Coal'
      },

      /* 132 */
      {
        _id: '588510f5aaecd9001b818608',
        name: 'Hermann Mine'
      },

      /* 133 */
      {
        _id: '588510f8aaecd9001b8187f5',
        name: 'Vancouver Island Cable'
      },

      /* 134 */
      {
        _id: '588510f9aaecd9001b8189e2',
        name: 'Bear Mountain Wind Park'
      },

      /* 135 */
      {
        _id: '588510fbaaecd9001b818bcf',
        name: 'Vintage Landing Resort and Wellness Village'
      },

      /* 136 */
      {
        _id: '588510fdaaecd9001b818dbc',
        name: 'Pacific Trail Pipelines'
      },

      /* 137 */
      {
        _id: '588510ffaaecd9001b818fa9',
        name: 'Sechelt Carbonate'
      },

      /* 138 */
      {
        _id: '58851101aaecd9001b819196',
        name: 'Lodgepole Coal Mine'
      },

      /* 139 */
      {
        _id: '58851103aaecd9001b819383',
        name: 'McGregor/Herrick Hydroelectric'
      },

      /* 140 */
      {
        _id: '58851105aaecd9001b819570',
        name: 'Europa Creek Hydroelectric'
      },

      /* 141 */
      {
        _id: '58851107aaecd9001b81975d',
        name: 'Mackenzie Green Energy Centre'
      },

      /* 142 */
      {
        _id: '58851109aaecd9001b81994a',
        name: 'Princeton Power'
      },

      /* 143 */
      {
        _id: '5885110baaecd9001b819b37',
        name: 'Cranbrook Airport Expansion'
      },

      /* 144 */
      {
        _id: '5885110caaecd9001b819d24',
        name: 'Wapiti Power Development'
      },

      /* 145 */
      {
        _id: '5885110eaaecd9001b819f11',
        name: 'Pembina Condensate Pipeline'
      },

      /* 146 */
      {
        _id: '58851110aaecd9001b81a0fe',
        name: 'Highland Valley Copper Refinery'
      },

      /* 147 */
      {
        _id: '58851112aaecd9001b81a2eb',
        name: 'Glacier/Howser'
      },

      /* 148 */
      {
        _id: '58851114aaecd9001b81a4d8',
        name: 'Schaft Creek Mine'
      },

      /* 149 */
      {
        _id: '58851115aaecd9001b81a6c5',
        name: 'Babkirk Secure Landfill'
      },

      /* 150 */
      {
        _id: '58851117aaecd9001b81a8b2',
        name: 'Mt. Milligan Copper-Gold'
      },

      /* 151 */
      {
        _id: '5885111aaaecd9001b81aa9f',
        name: 'Garibaldi at Squamish'
      },

      /* 152 */
      {
        _id: '5885111caaecd9001b81ac8c',
        name: 'Gething Coal'
      },

      /* 153 */
      {
        _id: '5885111daaecd9001b81ae79',
        name: 'Peejay Secure Landfill'
      },

      /* 154 */
      {
        _id: '5885111faaecd9001b81b066',
        name: 'Klinaklini Hydroelectric'
      },

      /* 155 */
      {
        _id: '58851121aaecd9001b81b253',
        name: 'Interior-Lower Mainland Transmission'
      },

      /* 156 */
      {
        _id: '58851123aaecd9001b81b440',
        name: 'Upper Pitt River Water Power'
      },

      /* 157 */
      {
        _id: '58851125aaecd9001b81b62d',
        name: 'Banks Island North Wind Energy'
      },

      /* 158 */
      {
        _id: '58851127aaecd9001b81b81a',
        name: 'GM Shrum Generating Station Upgrade'
      },

      /* 159 */
      {
        _id: '58851129aaecd9001b81ba07',
        name: 'Northern Rockies Secure Landfill'
      },

      /* 160 */
      {
        _id: '5885112baaecd9001b81bbf4',
        name: 'Giscome Quarry and Lime Plant'
      },

      /* 161 */
      {
        _id: '5885112daaecd9001b81bde1',
        name: 'Mount Clifford Wind Energy'
      },

      /* 162 */
      {
        _id: '5885112eaaecd9001b81bfce',
        name: 'Tumbler Ridge Wind Energy'
      },

      /* 163 */
      {
        _id: '58851130aaecd9001b81c1bb',
        name: 'Meikle Wind Energy'
      },

      /* 164 */
      {
        _id: '58851133aaecd9001b81c3a8',
        name: 'Northwest Transmission Line'
      },

      /* 165 */
      {
        _id: '58851135aaecd9001b81c595',
        name: 'Wildmare Wind Energy'
      },

      /* 166 */
      {
        _id: '58851137aaecd9001b81c782',
        name: 'Upper Toba Valley Hydroelectric'
      },

      /* 167 */
      {
        _id: '58851139aaecd9001b81c96f',
        name: 'Thunder Mountain Wind'
      },

      /* 168 */
      {
        _id: '5885113baaecd9001b81cb5c',
        name: 'Hackney Hills Wind'
      },

      /* 169 */
      {
        _id: '5885113caaecd9001b81cd49',
        name: 'Smithers Regional Airport Runway Expansion'
      },

      /* 170 */
      {
        _id: '5885113eaaecd9001b81cf36',
        name: 'Crab/Europa Hydroelectric Development'
      },

      /* 171 */
      {
        _id: '58851140aaecd9001b81d123',
        name: 'Nascall River Hydroelectric'
      },

      /* 172 */
      {
        _id: '58851142aaecd9001b81d310',
        name: 'Roman Coal Mine'
      },

      /* 173 */
      {
        _id: '58851144aaecd9001b81d4fd',
        name: 'Mount George Wind Park'
      },

      /* 174 */
      {
        _id: '58851146aaecd9001b81d6ea',
        name: 'Mount Kathleen Wind Park'
      },

      /* 175 */
      {
        _id: '58851148aaecd9001b81d8d7',
        name: 'Quality Wind'
      },

      /* 176 */
      {
        _id: '5885114aaaecd9001b81dac4',
        name: 'Narrows Inlet Hydro'
      },

      /* 177 */
      {
        _id: '5885114caaecd9001b81dcb1',
        name: 'Ryan River Hydro'
      },

      /* 178 */
      {
        _id: '5885114eaaecd9001b81de9e',
        name: 'Bute Inlet Hydroelectric'
      },

      /* 179 */
      {
        _id: '58851150aaecd9001b81e08b',
        name: 'Bevan Avenue Wells Groundwater Supply Development'
      },

      /* 180 */
      {
        _id: '58851152aaecd9001b81e278',
        name: 'Mica Generating Station Unit 5'
      },

      /* 181 */
      {
        _id: '58851154aaecd9001b81e465',
        name: 'Mica Generating Station Unit 6'
      },

      /* 182 */
      {
        _id: '58851156aaecd9001b81e652',
        name: 'KSM'
      },

      /* 183 */
      {
        _id: '58851158aaecd9001b81e83f',
        name: '29694 Marshall Road Extension'
      },

      /* 184 */
      {
        _id: '58851159aaecd9001b81ea2c',
        name: 'Big Silver Creek Waterpower'
      },

      /* 185 */
      {
        _id: '5885115baaecd9001b81ec19',
        name: 'Tretheway Creek Waterpower'
      },

      /* 186 */
      {
        _id: '5885115eaaecd9001b81ee06',
        name: 'Shovel Creek Waterpower'
      },

      /* 187 */
      {
        _id: '58851160aaecd9001b81eff3',
        name: 'Statlu Creek Waterpower'
      },

      /* 188 */
      {
        _id: '58851161aaecd9001b81f1e0',
        name: "Tsilhqot'in Power Development"
      },

      /* 189 */
      {
        _id: '58851163aaecd9001b81f3cd',
        name: 'Kamloops Airport Expansion'
      },

      /* 190 */
      {
        _id: '58851165aaecd9001b81f5ba',
        name: 'Kokish River Hydroelectric'
      },

      /* 191 */
      {
        _id: '58851167aaecd9001b81f7a7',
        name: 'Harper Creek'
      },

      /* 192 */
      {
        _id: '58851169aaecd9001b81f994',
        name: 'Cache Creek Landfill Extension'
      },

      /* 193 */
      {
        _id: '5885116baaecd9001b81fb81',
        name: 'Black Mountain Reservoir'
      },

      /* 194 */
      {
        _id: '5885116daaecd9001b81fd6e',
        name: 'Hawkeye Energy Corporation Green Energy Grid'
      },

      /* 195 */
      {
        _id: '5885116faaecd9001b81ff5b',
        name: 'Marten Ridge Wind Energy'
      },

      /* 196 */
      {
        _id: '58851170aaecd9001b820148',
        name: 'Kinskuch Hydro'
      },

      /* 197 */
      {
        _id: '58851172aaecd9001b820335',
        name: 'Nicomen Wind Energy'
      },

      /* 198 */
      {
        _id: '58851174aaecd9001b820522',
        name: 'Cabin Gas Plant'
      },

      /* 199 */
      {
        _id: '58851176aaecd9001b82070f',
        name: 'Heritage Secure Landfill'
      },

      /* 200 */
      {
        _id: '58851178aaecd9001b8208fc',
        name: 'Ruddock Creek Mine'
      },

      /* 201 */
      {
        _id: '5885117aaaecd9001b820ae9',
        name: 'Mount McDonald Wind Power'
      },

      /* 202 */
      {
        _id: '5885117caaecd9001b820cd6',
        name: 'Vancouver Airport Fuel Delivery'
      },

      /* 203 */
      {
        _id: '5885117eaaecd9001b820ec3',
        name: 'Chu Molybdenum Mine'
      },

      /* 204 */
      {
        _id: '58851180aaecd9001b8210b0',
        name: 'Evergreen Line Rapid Transit'
      },

      /* 205 */
      {
        _id: '58851182aaecd9001b82129d',
        name: 'Gold River Power'
      },

      /* 206 */
      {
        _id: '58851184aaecd9001b82148a',
        name: 'Raven Underground Coal'
      },

      /* 207 */
      {
        _id: '58851185aaecd9001b821677',
        name: 'Line Creek Operations Phase II'
      },

      /* 208 */
      {
        _id: '58851188aaecd9001b821864',
        name: 'Rocky Creek Energy'
      },

      /* 209 */
      {
        _id: '58851189aaecd9001b821a51',
        name: 'CCS Sunrise Secure Landfill'
      },

      /* 210 */
      {
        _id: '5885118baaecd9001b821c3e',
        name: 'Burnco Aggregate'
      },

      /* 211 */
      {
        _id: '5885118daaecd9001b821e2b',
        name: 'Kitsault Mine'
      },

      /* 212 */
      {
        _id: '5885118faaecd9001b822018',
        name: 'Upper Lillooet Hydro'
      },

      /* 213 */
      {
        _id: '58851191aaecd9001b822205',
        name: 'Central South Mine'
      },

      /* 214 */
      {
        _id: '58851193aaecd9001b8223f2',
        name: 'GM Shrum Units 1 to 5 TRP'
      },

      /* 215 */
      {
        _id: '58851195aaecd9001b8225df',
        name: 'McLymont Creek Hydroelectric'
      },

      /* 216 */
      {
        _id: '58851197aaecd9001b8227cc',
        name: 'Ajax Mine'
      },

      /* 217 */
      {
        _id: '58851199aaecd9001b8229b9',
        name: 'Squamish Oceanfront Park Development'
      },

      /* 218 */
      {
        _id: '5885119aaaecd9001b822ba6',
        name: 'Debolt Saline Water'
      },

      /* 219 */
      {
        _id: '5885119caaecd9001b822d93',
        name: 'Murray River Coal'
      },

      /* 220 */
      {
        _id: '5885119eaaecd9001b822f80',
        name: 'Richmond Island Milltown Marina and Boatyard'
      },

      /* 221 */
      {
        _id: '588511a0aaecd9001b82316d',
        name: 'Site C Clean Energy'
      },

      /* 222 */
      {
        _id: '588511a2aaecd9001b82335a',
        name: 'James White Park Wells'
      },

      /* 223 */
      {
        _id: '588511a4aaecd9001b823547',
        name: 'Spanish Mountain Gold'
      },

      /* 224 */
      {
        _id: '588511a6aaecd9001b823734',
        name: 'Fording River Operations Swift'
      },

      /* 225 */
      {
        _id: '588511a8aaecd9001b823921',
        name: 'Kingsvale to Oliver Natural Gas Pipeline Reinforcement'
      },

      /* 226 */
      {
        _id: '588511aaaaecd9001b823b0e',
        name: 'Dawson Creek Liquid Nitrogen Plant'
      },

      /* 227 */
      {
        _id: '588511acaaecd9001b823cfb',
        name: 'Mainland Coast Bottled Water'
      },

      /* 228 */
      {
        _id: '588511aeaaecd9001b823ee8',
        name: 'Wolverine Secure Landfill'
      },

      /* 229 */
      {
        _id: '588511afaaecd9001b8240d5',
        name: 'Fortune Creek Gas'
      },

      /* 230 */
      {
        _id: '588511b1aaecd9001b8242c2',
        name: 'UBC Okanagan Geoexchange'
      },

      /* 231 */
      {
        _id: '588511b3aaecd9001b8244af',
        name: 'Carbon Creek Coal Mine'
      },

      /* 232 */
      {
        _id: '588511b5aaecd9001b82469c',
        name: 'Farrell Creek 88-I South Gas Plant'
      },

      /* 233 */
      {
        _id: '588511b7aaecd9001b824889',
        name: 'Westcoast Connector Gas Transmission'
      },

      /* 234 */
      {
        _id: '588511b9aaecd9001b824a76',
        name: 'Sundance Wind'
      },

      /* 235 */
      {
        _id: '588511bbaaecd9001b824c63',
        name: 'Taylor Wind'
      },

      /* 236 */
      {
        _id: '588511bdaaecd9001b824e50',
        name: 'Air Liquide Liquid Nitrogen Plant'
      },

      /* 237 */
      {
        _id: '588511bfaaecd9001b82503d',
        name: 'Echo Hill Coal'
      },

      /* 238 */
      {
        _id: '588511c0aaecd9001b82522a',
        name: 'Blackwater Gold'
      },

      /* 239 */
      {
        _id: '588511c3aaecd9001b825417',
        name: 'Nulki Hills Wind'
      },

      /* 240 */
      {
        _id: '588511c4aaecd9001b825604',
        name: 'Coastal GasLink Pipeline'
      },

      /* 241 */
      {
        _id: '588511c6aaecd9001b8257f1',
        name: 'Bingay Main Coal'
      },

      /* 242 */
      {
        _id: '588511c8aaecd9001b8259de',
        name: 'Sukunka Coal Mine'
      },

      /* 243 */
      {
        _id: '588511caaaecd9001b825bcb',
        name: 'Brucejack Gold Mine'
      },

      /* 244 */
      {
        _id: '588511ccaaecd9001b825db8',
        name: 'Pacific NorthWest LNG'
      },

      /* 245 */
      {
        _id: '588511ceaaecd9001b825fa5',
        name: 'Kootenay West Mine'
      },

      /* 246 */
      {
        _id: '588511d0aaecd9001b826192',
        name: 'LNG Canada Export Terminal'
      },

      /* 247 */
      {
        _id: '588511d2aaecd9001b82637f',
        name: 'Dawson Liquids Extraction'
      },

      /* 248 */
      {
        _id: '588511d4aaecd9001b82656c',
        name: 'Revelstoke Generating Station Unit 6'
      },

      /* 249 */
      {
        _id: '588511d6aaecd9001b826759',
        name: 'Arctos Anthracite'
      },

      /* 250 */
      {
        _id: '588511d7aaecd9001b826946',
        name: 'Prince Rupert LNG'
      },

      /* 251 */
      {
        _id: '588511d9aaecd9001b826b33',
        name: 'Prince Rupert Gas Transmission'
      },

      /* 252 */
      {
        _id: '588511dbaaecd9001b826d20',
        name: 'Pacific Northern Gas Looping'
      },

      /* 253 */
      {
        _id: '588511ddaaecd9001b826f0d',
        name: 'Eagle Mountain - Woodfibre Gas Pipeline'
      },

      /* 254 */
      {
        _id: '588511dfaaecd9001b8270fa',
        name: 'Westham Canoe Pass Tidal Marsh'
      },

      /* 255 */
      {
        _id: '588511e1aaecd9001b8272e7',
        name: 'Woodfibre LNG'
      },

      /* 256 */
      {
        _id: '588511e3aaecd9001b8274d4',
        name: 'Roberts Bank Terminal 2'
      },

      /* 257 */
      {
        _id: '588511e5aaecd9001b8276c1',
        name: 'Encana 4-26 Refrigeration'
      },

      /* 258 */
      {
        _id: '588511e6aaecd9001b8278ae',
        name: 'Kemess Underground'
      },

      /* 259 */
      {
        _id: '588511e8aaecd9001b827a9b',
        name: 'Baldy Ridge Extension'
      },

      /* 260 */
      {
        _id: '588511eaaaecd9001b827c88',
        name: 'Terminal A Extension'
      },

      /* 261 */
      {
        _id: '588511edaaecd9001b827e75',
        name: 'North Thompson Emergency Water Intake'
      },

      /* 262 */
      {
        _id: '588511eeaaecd9001b828062',
        name: 'Aurora LNG Digby Island'
      },

      /* 263 */
      {
        _id: '588511f0aaecd9001b82824f',
        name: 'Aurora LNG Grassy Point'
      },

      /* 264 */
      {
        _id: '588511f2aaecd9001b82843c',
        name: 'Grassy Point LNG'
      },

      /* 265 */
      {
        _id: '588511f4aaecd9001b828629',
        name: 'Encana 8-21 Refrigeration'
      },

      /* 266 */
      {
        _id: '588511f6aaecd9001b828816',
        name: 'Aley Mine'
      },

      /* 267 */
      {
        _id: '588511f8aaecd9001b828a03',
        name: 'Coal Mountain Phase 2'
      },

      /* 268 */
      {
        _id: '588511f9aaecd9001b828bf0',
        name: 'Crown Mountain Coking Coal'
      },

      /* 269 */
      {
        _id: '588511fbaaecd9001b828ddd',
        name: 'Progress Town North Gas'
      },

      /* 270 */
      {
        _id: '588511fdaaecd9001b828fca',
        name: 'WCC LNG'
      },

      /* 271 */
      {
        _id: '588511ffaaecd9001b8291b7',
        name: 'George Massey Tunnel Replacement'
      },

      /* 272 */
      {
        _id: '58851201aaecd9001b8293a4',
        name: 'Red Willow Wind'
      },

      /* 273 */
      {
        _id: '58851203aaecd9001b829591',
        name: 'Isle Pierre Wind'
      },

      /* 274 */
      {
        _id: '58851204aaecd9001b82977e',
        name: 'Northeast British Columbia (NEBC) Expansion'
      },

      /* 275 */
      {
        _id: '58851207aaecd9001b82996b',
        name: 'Saturn 15-27 Sweet Gas Plant'
      },

      /* 276 */
      {
        _id: '58851208aaecd9001b829b58',
        name: 'WesPac Tilbury Marine Jetty'
      },

      /* 277 */
      {
        _id: '5885120aaaecd9001b829d45',
        name: 'Red Mountain Underground Gold'
      },

      /* 278 */
      {
        _id: '5885120caaecd9001b829f32',
        name: 'Point Grey Tidal Marsh'
      },

      /* 279 */
      {
        _id: '5885120eaaecd9001b82a11f',
        name: 'South Arm Jetty Tidal Marsh'
      },

      /* 280 */
      {
        _id: '58851210aaecd9001b82a30c',
        name: 'Steveston Island Tidal Marsh'
      },

      /* 281 */
      {
        _id: '58851211aaecd9001b82a4f9',
        name: 'Tsawwassen Eelgrass'
      },

      /* 282 */
      {
        _id: '58851213aaecd9001b82a6e6',
        name: 'Campbell River Water Supply'
      },

      /* 283 */
      {
        _id: '58851215aaecd9001b82a8d3',
        name: 'Michel Coal'
      },

      /* 284 */
      {
        _id: '58851217aaecd9001b82aac0',
        name: 'Pacific Future Energy Refinery'
      },

      /* 285 */
      {
        _id: '58851218aaecd9001b82acad',
        name: 'Seabird Island'
      },

      /* 286 */
      {
        _id: '5885121aaaecd9001b82ae9a',
        name: 'Enbridge Northern Gateway'
      },

      /* 287 */
      {
        _id: '5885121caaecd9001b82b087',
        name: 'North Montney Mainline Pipeline'
      },

      /* 288 */
      {
        _id: '5885121eaaecd9001b82b274',
        name: 'Trans Mountain Expansion'
      },

      /* 289 */
      {
        _id: '58851220aaecd9001b82b461',
        name: 'Towerbirch Expansion'
      },

      /* 290 */
      {
        _id: '58851221aaecd9001b82b64e',
        name: 'Kitimat Clean Refinery'
      },

      /* 291 */
      {
        _id: '58851223aaecd9001b82b83b',
        name: 'Meadows Quarry'
      },

      /* 292 */
      {
        _id: '58851225aaecd9001b82ba28',
        name: 'McMillan Island Erosion'
      },

      /* 293 */
      {
        _id: '58851227aaecd9001b82bc15',
        name: 'Pattullo Bridge Replacement'
      },

      /* 294 */
      {
        _id: '58851229aaecd9001b82be02',
        name: 'More Creek Hydroelectric'
      },

      /* 295 */
      {
        _id: '5893ca49d3cfab001dff71b7',
        name: 'Kinskuch Hydroelectric'
      },

      /* 296 */
      {
        _id: '58990017d334ee001d608bbd',
        name: 'Demonstration Project'
      },

      /* 297 */
      {
        _id: '59679ade3acbf9001de7ea8b',
        name: 'Progress Energy Lily Dam'
      },

      /* 298 */
      {
        _id: '59679fb7b39e86001d983372',
        name: 'Progress Energy Town Dam'
      },

      /* 299 */
      {
        _id: '5a2ee33d4cb5340019a726a3',
        name: 'Comox Valley Water Treatment'
      },

      /* 300 */
      {
        _id: '5a5f74456bec4f0019f94c5b',
        name: 'Quesnel Water Wells'
      },

      /* 301 */
      {
        _id: '5ad63efad5d8710024fc71ea',
        name: 'Environmental Assessment Revitalization'
      },

      /* 302 */
      {
        _id: '5b48c85211a87a0024ac25e1',
        name: 'Prince Rupert Terminal'
      },

      /* 303 */
      {
        _id: '5b61e3726952ca0024cf687c',
        name: 'Vopak Pacific Canada'
      },

      /* 304 */
      {
        _id: '5b856fba4174df00245b1df1',
        name: 'Revelstoke Sand and Gravel Pits'
      },

      /* 305 */
      {
        _id: '5b905af23965330024d5b706',
        name: 'Tenas Coal'
      },

      /* 306 */
      {
        _id: '5bd33fd8e3a27a0024581f03',
        name: 'Kwispaa LNG'
      },

      /* 307 */
      {
        _id: '5c0022513c44800024872266',
        name: 'Wonowon Landfill'
      },

      /* 308 */
      {
        _id: '5c35249ec45524002403a89f',
        name: 'Fraser River Forcemain Crossing'
      },

      /* 309 */
      {
        _id: '5c50eee297a31e0024f07c1f',
        name: 'Centerm Expansion'
      },

      /* 310 */
      {
        _id: '5c82a7f3f7883500246b2f33',
        name: 'Delta Grinding Facility'
      },

      /* 311 */
      {
        _id: '5cd9b4b56a15600025df0cc8',
        name: 'Highland Valley Copper 2040 Extension'
      },

      /* 312 */
      {
        _id: '5cd9b7f66a15600025df0dd3',
        name: 'Bethlehem Extension'
      }
    ]
}]
