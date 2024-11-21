const cities = [
    // Afghanistan
    { id: 1, name: 'Kabul', countryId: 1, description: 'Capital of Afghanistan' },

    // Albania
    { id: 2, name: 'Tirana', countryId: 2, description: 'Capital of Albania' },

    // Algeria
    { id: 3, name: 'Algiers', countryId: 3, description: 'Capital of Algeria' },

    // Andorra
    { id: 4, name: 'Andorra la Vella', countryId: 4, description: 'Capital of Andorra' },

    // Angola
    { id: 5, name: 'Luanda', countryId: 5, description: 'Capital of Angola' },

    // Antigua and Barbuda
    { id: 6, name: 'St. John\'s', countryId: 6, description: 'Capital of Antigua and Barbuda' },

    // Argentina
    { id: 7, name: 'Buenos Aires', countryId: 7, description: 'Capital of Argentina' },

    // Armenia
    { id: 8, name: 'Yerevan', countryId: 8, description: 'Capital of Armenia' },

    // Australia
    { id: 9, name: 'Canberra', countryId: 9, description: 'Capital of Australia' },

    // Austria
    { id: 10, name: 'Vienna', countryId: 10, description: 'Capital of Austria' },

    // Azerbaijan
    { id: 11, name: 'Baku', countryId: 11, description: 'Capital of Azerbaijan' },

    // Bahamas
    { id: 12, name: 'Nassau', countryId: 12, description: 'Capital of Bahamas' },

    // Bahrain
    { id: 13, name: 'Manama', countryId: 13, description: 'Capital of Bahrain' },

    // Bangladesh
    { id: 14, name: 'Dhaka', countryId: 14, description: 'Capital of Bangladesh' },

    // Barbados
    { id: 15, name: 'Bridgetown', countryId: 15, description: 'Capital of Barbados' },

    // Belarus
    { id: 16, name: 'Minsk', countryId: 16, description: 'Capital of Belarus' },

    // Belgium
    { id: 17, name: 'Brussels', countryId: 17, description: 'Capital of Belgium' },

    // Belize
    { id: 18, name: 'Belmopan', countryId: 18, description: 'Capital of Belize' },

    // Benin
    { id: 19, name: 'Porto-Novo', countryId: 19, description: 'Capital of Benin' },

    // Bhutan
    { id: 20, name: 'Thimphu', countryId: 20, description: 'Capital of Bhutan' },

    // Bolivia
    { id: 21, name: 'Sucre', countryId: 21, description: 'Capital of Bolivia (constitutional)' },
    { id: 22, name: 'La Paz', countryId: 21, description: 'Seat of government and executive capital of Bolivia' },

    // Bosnia and Herzegovina
    { id: 23, name: 'Sarajevo', countryId: 22, description: 'Capital of Bosnia and Herzegovina' },

    // Botswana
    { id: 24, name: 'Gaborone', countryId: 23, description: 'Capital of Botswana' },

    // Brazil
    { id: 25, name: 'Brasília', countryId: 24, description: 'Capital of Brazil' },

    // Brunei
    { id: 26, name: 'Bandar Seri Begawan', countryId: 25, description: 'Capital of Brunei' },

    // Bulgaria
    { id: 27, name: 'Sofia', countryId: 26, description: 'Capital of Bulgaria' },

    // Burkina Faso
    { id: 28, name: 'Ouagadougou', countryId: 27, description: 'Capital of Burkina Faso' },

    // Burundi
    { id: 29, name: 'Gitega', countryId: 28, description: 'Capital of Burundi' },

    // Côte d'Ivoire
    { id: 30, name: 'Yamoussoukro', countryId: 29, description: 'Capital of Côte d\'Ivoire' },

    // Cabo Verde
    { id: 31, name: 'Praia', countryId: 30, description: 'Capital of Cabo Verde' },

    // Cambodia
    { id: 32, name: 'Phnom Penh', countryId: 31, description: 'Capital of Cambodia' },

    // Cameroon
    { id: 33, name: 'Yaoundé', countryId: 32, description: 'Capital of Cameroon' },

    // Canada
    { id: 34, name: 'Ottawa', countryId: 33, description: 'Capital of Canada' },

    // Central African Republic
    { id: 35, name: 'Bangui', countryId: 34, description: 'Capital of Central African Republic' },

    // Chad
    { id: 36, name: 'N\'Djamena', countryId: 35, description: 'Capital of Chad' },

    // Chile
    { id: 37, name: 'Santiago', countryId: 36, description: 'Capital of Chile' },

    // China
    { id: 38, name: 'Beijing', countryId: 37, description: 'Capital of China' },

    // Colombia
    { id: 39, name: 'Bogotá', countryId: 38, description: 'Capital of Colombia' },

    // Comoros
    { id: 40, name: 'Moroni', countryId: 39, description: 'Capital of Comoros' },

    // Congo (Congo-Brazzaville)
    { id: 41, name: 'Brazzaville', countryId: 40, description: 'Capital of Congo (Congo-Brazzaville)' },

    // Congo (Congo-Kinshasa)
    { id: 42, name: 'Kinshasa', countryId: 41, description: 'Capital of Congo (Congo-Kinshasa)' },

    // Costa Rica
    { id: 43, name: 'San José', countryId: 42, description: 'Capital of Costa Rica' },

    // Croatia
    { id: 44, name: 'Zagreb', countryId: 43, description: 'Capital of Croatia' },

    // Cuba
    { id: 45, name: 'Havana', countryId: 44, description: 'Capital of Cuba' },

    // Cyprus
    { id: 46, name: 'Nicosia', countryId: 45, description: 'Capital of Cyprus' },

    // Czechia (Czech Republic)
    { id: 47, name: 'Prague', countryId: 46, description: 'Capital of Czechia (Czech Republic)' },

    // Denmark
    { id: 48, name: 'Copenhagen', countryId: 47, description: 'Capital of Denmark' },

    // Djibouti
    { id: 49, name: 'Djibouti', countryId: 48, description: 'Capital of Djibouti' },

    // Dominica
    { id: 50, name: 'Roseau', countryId: 49, description: 'Capital of Dominica' },

    // Dominican Republic
    { id: 51, name: 'Santo Domingo', countryId: 50, description: 'Capital of Dominican Republic' },

    // East Timor (Timor-Leste)
    { id: 52, name: 'Dili', countryId: 51, description: 'Capital of East Timor (Timor-Leste)' },

    // Ecuador
    { id: 53, name: 'Quito', countryId: 52, description: 'Capital of Ecuador' },

    // Egypt
    { id: 54, name: 'Cairo', countryId: 53, description: 'Capital of Egypt' },

    // El Salvador
    { id: 55, name: 'San Salvador', countryId: 54, description: 'Capital of El Salvador' },

    // Equatorial Guinea
    { id: 56, name: 'Malabo', countryId: 55, description: 'Capital of Equatorial Guinea' },

    // Eritrea
    { id: 57, name: 'Asmara', countryId: 56, description: 'Capital of Eritrea' },

    // Estonia
    { id: 58, name: 'Tallinn', countryId: 57, description: 'Capital of Estonia' },

    // Eswatini (fmr. "Swaziland")
    { id: 59, name: 'Mbabane', countryId: 58, description: 'Administrative capital of Eswatini' },
    { id: 60, name: 'Lobamba', countryId: 58, description: 'Legislative capital of Eswatini' },

    // Ethiopia
    { id: 61, name: 'Addis Ababa', countryId: 59, description: 'Capital of Ethiopia' },

    // Fiji
    { id: 62, name: 'Suva', countryId: 60, description: 'Capital of Fiji' },

    // Finland
    { id: 63, name: 'Helsinki', countryId: 61, description: 'Capital of Finland' },

    // France
    { id: 64, name: 'Paris', countryId: 62, description: 'Capital of France' },

    // Gabon
    { id: 65, name: 'Libreville', countryId: 63, description: 'Capital of Gabon' },

    // Gambia
    { id: 66, name: 'Banjul', countryId: 64, description: 'Capital of Gambia' },

    // Georgia
    { id: 67, name: 'Tbilisi', countryId: 65, description: 'Capital of Georgia' },

    // Germany
    { id: 68, name: 'Berlin', countryId: 66, description: 'Capital of Germany' },

    // Ghana
    { id: 69, name: 'Accra', countryId: 67, description: 'Capital of Ghana' },

    // Greece
    { id: 70, name: 'Athens', countryId: 68, description: 'Capital of Greece' },

    // Grenada
    { id: 71, name: 'St. George\'s', countryId: 69, description: 'Capital of Grenada' },

    // Guatemala
    { id: 72, name: 'Guatemala City', countryId: 70, description: 'Capital of Guatemala' },

    // Guinea
    { id: 73, name: 'Conakry', countryId: 71, description: 'Capital of Guinea' },

    // Guinea-Bissau
    { id: 74, name: 'Bissau', countryId: 72, description: 'Capital of Guinea-Bissau' },

    // Guyana
    { id: 75, name: 'Georgetown', countryId: 73, description: 'Capital of Guyana' },

    // Haiti
    { id: 76, name: 'Port-au-Prince', countryId: 74, description: 'Capital of Haiti' },

    // Holy See
    { id: 77, name: 'Vatican City', countryId: 75, description: 'Capital of Holy See' },

    // Honduras
    { id: 78, name: 'Tegucigalpa', countryId: 76, description: 'Capital of Honduras' },

    // Hungary
    { id: 79, name: 'Budapest', countryId: 77, description: 'Capital of Hungary' },

    // Iceland
    { id: 80, name: 'Reykjavík', countryId: 78, description: 'Capital of Iceland' },

    // India
    { id: 81, name: 'New Delhi', countryId: 79, description: 'Capital of India' },

    // Indonesia
    { id: 82, name: 'Jakarta', countryId: 80, description: 'Capital of Indonesia' },

    // Iran
    { id: 83, name: 'Tehran', countryId: 81, description: 'Capital of Iran' },

    // Iraq
    { id: 84, name: 'Baghdad', countryId: 82, description: 'Capital of Iraq' },

    // Ireland
    { id: 85, name: 'Dublin', countryId: 83, description: 'Capital of Ireland' },

    // Israel
    { id: 86, name: 'Jerusalem', countryId: 84, description: 'Capital of Israel' },

    // Italy
    { id: 87, name: 'Rome', countryId: 85, description: 'Capital of Italy' },

    // Jamaica
    { id: 88, name: 'Kingston', countryId: 86, description: 'Capital of Jamaica' },

    // Japan
    { id: 89, name: 'Tokyo', countryId: 87, description: 'Capital of Japan' },

    // Jordan
    { id: 90, name: 'Amman', countryId: 88, description: 'Capital of Jordan' },

    // Kazakhstan
    { id: 91, name: 'Astana', countryId: 89, description: 'Capital of Kazakhstan' },

    // Kenya
    { id: 92, name: 'Nairobi', countryId: 90, description: 'Capital of Kenya' },

    // Kiribati
    { id: 93, name: 'Tarawa', countryId: 91, description: 'Capital of Kiribati' },

    // Korea (North)
    { id: 94, name: 'Pyongyang', countryId: 92, description: 'Capital of North Korea' },

    // Korea (South)
    { id: 95, name: 'Seoul', countryId: 93, description: 'Capital of South Korea' },

    // Kosovo
    { id: 96, name: 'Pristina', countryId: 94, description: 'Capital of Kosovo' },

    // Kuwait
    { id: 97, name: 'Kuwait City', countryId: 95, description: 'Capital of Kuwait' },

    // Kyrgyzstan
    { id: 98, name: 'Bishkek', countryId: 96, description: 'Capital of Kyrgyzstan' },

    // Laos
    { id: 99, name: 'Vientiane', countryId: 97, description: 'Capital of Laos' },

    // Latvia
    { id: 100, name: 'Riga', countryId: 98, description: 'Capital of Latvia' },

    // Lebanon
    { id: 101, name: 'Beirut', countryId: 99, description: 'Capital of Lebanon' },

    // Lesotho
    { id: 102, name: 'Maseru', countryId: 100, description: 'Capital of Lesotho' },

    // Liberia
    { id: 103, name: 'Monrovia', countryId: 101, description: 'Capital of Liberia' },

    // Libya
    { id: 104, name: 'Tripoli', countryId: 102, description: 'Capital of Libya' },

    // Liechtenstein
    { id: 105, name: 'Vaduz', countryId: 103, description: 'Capital of Liechtenstein' },

    // Lithuania
    { id: 106, name: 'Vilnius', countryId: 104, description: 'Capital of Lithuania' },

    // Luxembourg
    { id: 107, name: 'Luxembourg City', countryId: 105, description: 'Capital of Luxembourg' },

    // Madagascar
    { id: 108, name: 'Antananarivo', countryId: 106, description: 'Capital of Madagascar' },

    // Malawi
    { id: 109, name: 'Lilongwe', countryId: 107, description: 'Capital of Malawi' },

    // Malaysia
    { id: 110, name: 'Kuala Lumpur', countryId: 108, description: 'Capital of Malaysia' },

    // Maldives
    { id: 111, name: 'Malé', countryId: 109, description: 'Capital of Maldives' },

    // Mali
    { id: 112, name: 'Bamako', countryId: 110, description: 'Capital of Mali' },

    // Malta
    { id: 113, name: 'Valletta', countryId: 111, description: 'Capital of Malta' },

    // Marshall Islands
    { id: 114, name: 'Majuro', countryId: 112, description: 'Capital of Marshall Islands' },

    // Mauritania
    { id: 115, name: 'Nouakchott', countryId: 113, description: 'Capital of Mauritania' },

    // Mauritius
    { id: 116, name: 'Port Louis', countryId: 114, description: 'Capital of Mauritius' },

    // Mexico
    { id: 117, name: 'Mexico City', countryId: 115, description: 'Capital of Mexico' },

    // Micronesia
    { id: 118, name: 'Palikir', countryId: 116, description: 'Capital of Micronesia' },

    // Moldova
    { id: 119, name: 'Chișinău', countryId: 117, description: 'Capital of Moldova' },

    // Monaco
    { id: 120, name: 'Monaco', countryId: 118, description: 'Capital of Monaco' },

    // Mongolia
    { id: 121, name: 'Ulaanbaatar', countryId: 119, description: 'Capital of Mongolia' },

    // Montenegro
    { id: 122, name: 'Podgorica', countryId: 120, description: 'Capital of Montenegro' },

    // Morocco
    { id: 123, name: 'Rabat', countryId: 121, description: 'Capital of Morocco' },

    // Mozambique
    { id: 124, name: 'Maputo', countryId: 122, description: 'Capital of Mozambique' },

    // Myanmar
    { id: 125, name: 'Naypyidaw', countryId: 123, description: 'Capital of Myanmar' },

    // Namibia
    { id: 126, name: 'Windhoek', countryId: 124, description: 'Capital of Namibia' },

    // Nauru
    { id: 127, name: 'Yaren', countryId: 125, description: 'Capital of Nauru' },

    // Nepal
    { id: 128, name: 'Kathmandu', countryId: 126, description: 'Capital of Nepal' },

    // Netherlands
    { id: 129, name: 'Amsterdam', countryId: 127, description: 'Capital of Netherlands' },

    // New Zealand
    { id: 130, name: 'Wellington', countryId: 128, description: 'Capital of New Zealand' },

    // Nicaragua
    { id: 131, name: 'Managua', countryId: 129, description: 'Capital of Nicaragua' },

    // Niger
    { id: 132, name: 'Niamey', countryId: 130, description: 'Capital of Niger' },

    // Nigeria
    { id: 133, name: 'Abuja', countryId: 131, description: 'Capital of Nigeria' },

    // North Macedonia
    { id: 134, name: 'Skopje', countryId: 132, description: 'Capital of North Macedonia' },

    // Norway
    { id: 135, name: 'Oslo', countryId: 133, description: 'Capital of Norway' },

    // Oman
    { id: 136, name: 'Muscat', countryId: 134, description: 'Capital of Oman' },

    // Pakistan
    { id: 137, name: 'Islamabad', countryId: 135, description: 'Capital of Pakistan' },

    // Palau
    { id: 138, name: 'Ngerulmud', countryId: 136, description: 'Capital of Palau' },

    // Panama
    { id: 139, name: 'Panama City', countryId: 137, description: 'Capital of Panama' },

    // Papua New Guinea
    { id: 140, name: 'Port Moresby', countryId: 138, description: 'Capital of Papua New Guinea' },

    // Paraguay
    { id: 141, name: 'Asunción', countryId: 139, description: 'Capital of Paraguay' },

    // Peru
    { id: 142, name: 'Lima', countryId: 140, description: 'Capital of Peru' },

    // Philippines
    { id: 143, name: 'Manila', countryId: 141, description: 'Capital of Philippines' },

    // Poland
    { id: 144, name: 'Warsaw', countryId: 142, description: 'Capital of Poland' },

    // Portugal
    { id: 145, name: 'Lisbon', countryId: 143, description: 'Capital of Portugal' },

    // Qatar
    { id: 146, name: 'Doha', countryId: 144, description: 'Capital of Qatar' },

    // Romania
    { id: 147, name: 'Bucharest', countryId: 145, description: 'Capital of Romania' },

    // Russia
    { id: 148, name: 'Moscow', countryId: 146, description: 'Capital of Russia' },

    // Rwanda
    { id: 149, name: 'Kigali', countryId: 147, description: 'Capital of Rwanda' },

    // Saint Kitts and Nevis
    { id: 150, name: 'Basseterre', countryId: 148, description: 'Capital of Saint Kitts and Nevis' },

    // Saint Lucia
    { id: 151, name: 'Castries', countryId: 149, description: 'Capital of Saint Lucia' },

    // Saint Vincent and the Grenadines
    { id: 152, name: 'Kingstown', countryId: 150, description: 'Capital of Saint Vincent and the Grenadines' },

    // Samoa
    { id: 153, name: 'Apia', countryId: 151, description: 'Capital of Samoa' },

    // San Marino
    { id: 154, name: 'San Marino', countryId: 152, description: 'Capital of San Marino' },

    // Sao Tome and Principe
    { id: 155, name: 'São Tomé', countryId: 153, description: 'Capital of São Tomé and Principe' },

    // Saudi Arabia
    { id: 156, name: 'Riyadh', countryId: 154, description: 'Capital of Saudi Arabia' },

    // Senegal
    { id: 157, name: 'Dakar', countryId: 155, description: 'Capital of Senegal' },

    // Serbia
    { id: 158, name: 'Belgrade', countryId: 156, description: 'Capital of Serbia' },

    // Seychelles
    { id: 159, name: 'Victoria', countryId: 157, description: 'Capital of Seychelles' },

    // Sierra Leone
    { id: 160, name: 'Freetown', countryId: 158, description: 'Capital of Sierra Leone' },

    // Singapore
    { id: 161, name: 'Singapore', countryId: 159, description: 'Capital of Singapore' },

    // Slovakia
    { id: 162, name: 'Bratislava', countryId: 160, description: 'Capital of Slovakia' },

    // Slovenia
    { id: 163, name: 'Ljubljana', countryId: 161, description: 'Capital of Slovenia' },

    // Solomon Islands
    { id: 164, name: 'Honiara', countryId: 162, description: 'Capital of Solomon Islands' },

    // Somalia
    { id: 165, name: 'Mogadishu', countryId: 163, description: 'Capital of Somalia' },

    // South Africa
    { id: 166, name: 'Pretoria', countryId: 164, description: 'Capital of South Africa (administrative)' },

    // South Sudan
    { id: 167, name: 'Juba', countryId: 165, description: 'Capital of South Sudan' },

    // Spain
    { id: 168, name: 'Madrid', countryId: 166, description: 'Capital of Spain' },

    // Sri Lanka
    { id: 169, name: 'Sri Jayawardenepura Kotte', countryId: 167, description: 'Capital of Sri Lanka (administrative)' },

    // Sudan
    { id: 170, name: 'Khartoum', countryId: 168, description: 'Capital of Sudan' },

    // Suriname
    { id: 171, name: 'Paramaribo', countryId: 169, description: 'Capital of Suriname' },

    // Sweden
    { id: 172, name: 'Stockholm', countryId: 170, description: 'Capital of Sweden' },

    // Switzerland
    { id: 173, name: 'Bern', countryId: 171, description: 'Capital of Switzerland' },

    // Syria
    { id: 174, name: 'Damascus', countryId: 172, description: 'Capital of Syria' },

    // Taiwan
    { id: 175, name: 'Taipei', countryId: 173, description: 'Capital of Taiwan' },

    // Tajikistan
    { id: 176, name: 'Dushanbe', countryId: 174, description: 'Capital of Tajikistan' },

    // Tanzania
    { id: 177, name: 'Dodoma', countryId: 175, description: 'Capital of Tanzania' },

    // Thailand
    { id: 178, name: 'Bangkok', countryId: 176, description: 'Capital of Thailand' },

    // Timor-Leste
    { id: 179, name: 'Dili', countryId: 177, description: 'Capital of Timor-Leste' },

    // Togo
    { id: 180, name: 'Lomé', countryId: 178, description: 'Capital of Togo' },

    // Tonga
    { id: 181, name: 'Nukuʻalofa', countryId: 179, description: 'Capital of Tonga' },

    // Trinidad and Tobago
    { id: 182, name: 'Port of Spain', countryId: 180, description: 'Capital of Trinidad and Tobago' },

    // Tunisia
    { id: 183, name: 'Tunis', countryId: 181, description: 'Capital of Tunisia' },

    // Turkey
    { id: 184, name: 'Ankara', countryId: 182, description: 'Capital of Turkey' },

    // Turkmenistan
    { id: 185, name: 'Ashgabat', countryId: 183, description: 'Capital of Turkmenistan' },

    // Tuvalu
    { id: 186, name: 'Funafuti', countryId: 184, description: 'Capital of Tuvalu' },

    // Uganda
    { id: 187, name: 'Kampala', countryId: 185, description: 'Capital of Uganda' },

    // Ukraine
    { id: 188, name: 'Kyiv', countryId: 186, description: 'Capital of Ukraine' },

    // United Arab Emirates
    { id: 189, name: 'Abu Dhabi', countryId: 187, description: 'Capital of United Arab Emirates' },

    // United Kingdom
    { id: 190, name: 'London', countryId: 188, description: 'Capital of United Kingdom' },

    // United States
    { id: 191, name: 'Washington, D.C.', countryId: 189, description: 'Capital of United States' },

    // Uruguay
    { id: 192, name: 'Montevideo', countryId: 190, description: 'Capital of Uruguay' },

    // Uzbekistan
    { id: 193, name: 'Tashkent', countryId: 191, description: 'Capital of Uzbekistan' },

    // Vanuatu
    { id: 194, name: 'Port Vila', countryId: 192, description: 'Capital of Vanuatu' },

    // Venezuela
    { id: 195, name: 'Caracas', countryId: 193, description: 'Capital of Venezuela' },

    // Vietnam
    { id: 196, name: 'Hanoi', countryId: 194, description: 'Capital of Vietnam' },

    // Yemen
    { id: 197, name: 'Sana\'a', countryId: 195, description: 'Capital of Yemen' },

    // Zambia
    { id: 198, name: 'Lusaka', countryId: 196, description: 'Capital of Zambia' },

    // Zimbabwe
    { id: 199, name: 'Harare', countryId: 197, description: 'Capital of Zimbabwe' }
]
  
export default cities;
