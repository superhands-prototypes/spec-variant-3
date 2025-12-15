import { useState, useRef, useEffect } from 'react';
import './SignupForm.css';

// Comprehensive list of countries with codes and flag emojis
const countries = [
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', dialCode: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', dialCode: '+33', name: 'France', flag: '🇫🇷' },
  { code: 'IT', dialCode: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', dialCode: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', dialCode: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'BE', dialCode: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: 'CH', dialCode: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'AT', dialCode: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: 'SE', dialCode: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', dialCode: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', dialCode: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', dialCode: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: 'PL', dialCode: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: 'IE', dialCode: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: 'PT', dialCode: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: 'GR', dialCode: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: 'CZ', dialCode: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HU', dialCode: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: 'RO', dialCode: '+40', name: 'Romania', flag: '🇷🇴' },
  { code: 'BG', dialCode: '+359', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'HR', dialCode: '+385', name: 'Croatia', flag: '🇭🇷' },
  { code: 'SK', dialCode: '+421', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', dialCode: '+386', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'EE', dialCode: '+372', name: 'Estonia', flag: '🇪🇪' },
  { code: 'LV', dialCode: '+371', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LT', dialCode: '+370', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'JP', dialCode: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: 'CN', dialCode: '+86', name: 'China', flag: '🇨🇳' },
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'KR', dialCode: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: 'SG', dialCode: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: 'MY', dialCode: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'TH', dialCode: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: 'ID', dialCode: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'PH', dialCode: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: 'VN', dialCode: '+84', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'NZ', dialCode: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'ZA', dialCode: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: 'EG', dialCode: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: 'AE', dialCode: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'SA', dialCode: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'IL', dialCode: '+972', name: 'Israel', flag: '🇮🇱' },
  { code: 'TR', dialCode: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: 'RU', dialCode: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: 'BR', dialCode: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: 'MX', dialCode: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: 'AR', dialCode: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', dialCode: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', dialCode: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: 'PE', dialCode: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: 'VE', dialCode: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'EC', dialCode: '+593', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'UY', dialCode: '+598', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'PY', dialCode: '+595', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'BO', dialCode: '+591', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'CR', dialCode: '+506', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'PA', dialCode: '+507', name: 'Panama', flag: '🇵🇦' },
  { code: 'GT', dialCode: '+502', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'HN', dialCode: '+504', name: 'Honduras', flag: '🇭🇳' },
  { code: 'NI', dialCode: '+505', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'SV', dialCode: '+503', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'DO', dialCode: '+1', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'CU', dialCode: '+53', name: 'Cuba', flag: '🇨🇺' },
  { code: 'JM', dialCode: '+1', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'TT', dialCode: '+1', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: 'BB', dialCode: '+1', name: 'Barbados', flag: '🇧🇧' },
  { code: 'BS', dialCode: '+1', name: 'Bahamas', flag: '🇧🇸' },
  { code: 'BZ', dialCode: '+501', name: 'Belize', flag: '🇧🇿' },
  { code: 'GY', dialCode: '+592', name: 'Guyana', flag: '🇬🇾' },
  { code: 'SR', dialCode: '+597', name: 'Suriname', flag: '🇸🇷' },
  { code: 'GF', dialCode: '+594', name: 'French Guiana', flag: '🇬🇫' },
  { code: 'FK', dialCode: '+500', name: 'Falkland Islands', flag: '🇫🇰' },
  { code: 'IS', dialCode: '+354', name: 'Iceland', flag: '🇮🇸' },
  { code: 'LU', dialCode: '+352', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MT', dialCode: '+356', name: 'Malta', flag: '🇲🇹' },
  { code: 'CY', dialCode: '+357', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'MC', dialCode: '+377', name: 'Monaco', flag: '🇲🇨' },
  { code: 'AD', dialCode: '+376', name: 'Andorra', flag: '🇦🇩' },
  { code: 'SM', dialCode: '+378', name: 'San Marino', flag: '🇸🇲' },
  { code: 'VA', dialCode: '+39', name: 'Vatican City', flag: '🇻🇦' },
  { code: 'LI', dialCode: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'AL', dialCode: '+355', name: 'Albania', flag: '🇦🇱' },
  { code: 'BA', dialCode: '+387', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: 'MK', dialCode: '+389', name: 'North Macedonia', flag: '🇲🇰' },
  { code: 'ME', dialCode: '+382', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'RS', dialCode: '+381', name: 'Serbia', flag: '🇷🇸' },
  { code: 'XK', dialCode: '+383', name: 'Kosovo', flag: '🇽🇰' },
  { code: 'UA', dialCode: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'BY', dialCode: '+375', name: 'Belarus', flag: '🇧🇾' },
  { code: 'MD', dialCode: '+373', name: 'Moldova', flag: '🇲🇩' },
  { code: 'GE', dialCode: '+995', name: 'Georgia', flag: '🇬🇪' },
  { code: 'AM', dialCode: '+374', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AZ', dialCode: '+994', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'KZ', dialCode: '+7', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'UZ', dialCode: '+998', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'TM', dialCode: '+993', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'TJ', dialCode: '+992', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'KG', dialCode: '+996', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'MN', dialCode: '+976', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'AF', dialCode: '+93', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'PK', dialCode: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'BD', dialCode: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'LK', dialCode: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'NP', dialCode: '+977', name: 'Nepal', flag: '🇳🇵' },
  { code: 'BT', dialCode: '+975', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'MV', dialCode: '+960', name: 'Maldives', flag: '🇲🇻' },
  { code: 'MM', dialCode: '+95', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'KH', dialCode: '+855', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'LA', dialCode: '+856', name: 'Laos', flag: '🇱🇦' },
  { code: 'BN', dialCode: '+673', name: 'Brunei', flag: '🇧🇳' },
  { code: 'TL', dialCode: '+670', name: 'Timor-Leste', flag: '🇹🇱' },
  { code: 'TW', dialCode: '+886', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'HK', dialCode: '+852', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'MO', dialCode: '+853', name: 'Macau', flag: '🇲🇴' },
  { code: 'BN', dialCode: '+673', name: 'Brunei', flag: '🇧🇳' },
  { code: 'FJ', dialCode: '+679', name: 'Fiji', flag: '🇫🇯' },
  { code: 'PG', dialCode: '+675', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'NC', dialCode: '+687', name: 'New Caledonia', flag: '🇳🇨' },
  { code: 'PF', dialCode: '+689', name: 'French Polynesia', flag: '🇵🇫' },
  { code: 'WS', dialCode: '+685', name: 'Samoa', flag: '🇼🇸' },
  { code: 'TO', dialCode: '+676', name: 'Tonga', flag: '🇹🇴' },
  { code: 'VU', dialCode: '+678', name: 'Vanuatu', flag: '🇻🇺' },
  { code: 'SB', dialCode: '+677', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: 'KI', dialCode: '+686', name: 'Kiribati', flag: '🇰🇮' },
  { code: 'TV', dialCode: '+688', name: 'Tuvalu', flag: '🇹🇻' },
  { code: 'NR', dialCode: '+674', name: 'Nauru', flag: '🇳🇷' },
  { code: 'PW', dialCode: '+680', name: 'Palau', flag: '🇵🇼' },
  { code: 'FM', dialCode: '+691', name: 'Micronesia', flag: '🇫🇲' },
  { code: 'MH', dialCode: '+692', name: 'Marshall Islands', flag: '🇲🇭' },
  { code: 'KE', dialCode: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: 'TZ', dialCode: '+255', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'UG', dialCode: '+256', name: 'Uganda', flag: '🇺🇬' },
  { code: 'RW', dialCode: '+250', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'ET', dialCode: '+251', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'SO', dialCode: '+252', name: 'Somalia', flag: '🇸🇴' },
  { code: 'DJ', dialCode: '+253', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'ER', dialCode: '+291', name: 'Eritrea', flag: '🇪🇷' },
  { code: 'SD', dialCode: '+249', name: 'Sudan', flag: '🇸🇩' },
  { code: 'SS', dialCode: '+211', name: 'South Sudan', flag: '🇸🇸' },
  { code: 'LY', dialCode: '+218', name: 'Libya', flag: '🇱🇾' },
  { code: 'TN', dialCode: '+216', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'DZ', dialCode: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: 'MA', dialCode: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: 'EH', dialCode: '+212', name: 'Western Sahara', flag: '🇪🇭' },
  { code: 'MR', dialCode: '+222', name: 'Mauritania', flag: '🇲🇷' },
  { code: 'ML', dialCode: '+223', name: 'Mali', flag: '🇲🇱' },
  { code: 'NE', dialCode: '+227', name: 'Niger', flag: '🇳🇪' },
  { code: 'TD', dialCode: '+235', name: 'Chad', flag: '🇹🇩' },
  { code: 'SN', dialCode: '+221', name: 'Senegal', flag: '🇸🇳' },
  { code: 'GM', dialCode: '+220', name: 'Gambia', flag: '🇬🇲' },
  { code: 'GW', dialCode: '+245', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'GN', dialCode: '+224', name: 'Guinea', flag: '🇬🇳' },
  { code: 'SL', dialCode: '+232', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'LR', dialCode: '+231', name: 'Liberia', flag: '🇱🇷' },
  { code: 'CI', dialCode: '+225', name: 'Ivory Coast', flag: '🇨🇮' },
  { code: 'BF', dialCode: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'GH', dialCode: '+233', name: 'Ghana', flag: '🇬🇭' },
  { code: 'TG', dialCode: '+228', name: 'Togo', flag: '🇹🇬' },
  { code: 'BJ', dialCode: '+229', name: 'Benin', flag: '🇧🇯' },
  { code: 'NG', dialCode: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'CM', dialCode: '+237', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'CF', dialCode: '+236', name: 'Central African Republic', flag: '🇨🇫' },
  { code: 'GQ', dialCode: '+240', name: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: 'GA', dialCode: '+241', name: 'Gabon', flag: '🇬🇦' },
  { code: 'CG', dialCode: '+242', name: 'Republic of the Congo', flag: '🇨🇬' },
  { code: 'CD', dialCode: '+243', name: 'DR Congo', flag: '🇨🇩' },
  { code: 'AO', dialCode: '+244', name: 'Angola', flag: '🇦🇴' },
  { code: 'ZM', dialCode: '+260', name: 'Zambia', flag: '🇿🇲' },
  { code: 'ZW', dialCode: '+263', name: 'Zimbabwe', flag: '🇿🇼' },
  { code: 'BW', dialCode: '+267', name: 'Botswana', flag: '🇧🇼' },
  { code: 'NA', dialCode: '+264', name: 'Namibia', flag: '🇳🇦' },
  { code: 'LS', dialCode: '+266', name: 'Lesotho', flag: '🇱🇸' },
  { code: 'SZ', dialCode: '+268', name: 'Eswatini', flag: '🇸🇿' },
  { code: 'MW', dialCode: '+265', name: 'Malawi', flag: '🇲🇼' },
  { code: 'MZ', dialCode: '+258', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'MG', dialCode: '+261', name: 'Madagascar', flag: '🇲🇬' },
  { code: 'MU', dialCode: '+230', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'SC', dialCode: '+248', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'KM', dialCode: '+269', name: 'Comoros', flag: '🇰🇲' },
  { code: 'YT', dialCode: '+262', name: 'Mayotte', flag: '🇾🇹' },
  { code: 'RE', dialCode: '+262', name: 'Réunion', flag: '🇷🇪' },
  { code: 'IO', dialCode: '+246', name: 'British Indian Ocean Territory', flag: '🇮🇴' },
  { code: 'SH', dialCode: '+290', name: 'Saint Helena', flag: '🇸🇭' },
  { code: 'ST', dialCode: '+239', name: 'São Tomé and Príncipe', flag: '🇸🇹' },
  { code: 'CV', dialCode: '+238', name: 'Cape Verde', flag: '🇨🇻' },
  { code: 'GW', dialCode: '+245', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'IR', dialCode: '+98', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', dialCode: '+964', name: 'Iraq', flag: '🇮🇶' },
  { code: 'JO', dialCode: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: 'LB', dialCode: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'SY', dialCode: '+963', name: 'Syria', flag: '🇸🇾' },
  { code: 'YE', dialCode: '+967', name: 'Yemen', flag: '🇾🇪' },
  { code: 'OM', dialCode: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: 'QA', dialCode: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: 'BH', dialCode: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'KW', dialCode: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'AF', dialCode: '+93', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'UZ', dialCode: '+998', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'TM', dialCode: '+993', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'TJ', dialCode: '+992', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'KG', dialCode: '+996', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'MN', dialCode: '+976', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'KP', dialCode: '+850', name: 'North Korea', flag: '🇰🇵' },
  { code: 'BN', dialCode: '+673', name: 'Brunei', flag: '🇧🇳' },
  { code: 'TL', dialCode: '+670', name: 'Timor-Leste', flag: '🇹🇱' },
  { code: 'PG', dialCode: '+675', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'FJ', dialCode: '+679', name: 'Fiji', flag: '🇫🇯' },
  { code: 'NC', dialCode: '+687', name: 'New Caledonia', flag: '🇳🇨' },
  { code: 'PF', dialCode: '+689', name: 'French Polynesia', flag: '🇵🇫' },
  { code: 'WS', dialCode: '+685', name: 'Samoa', flag: '🇼🇸' },
  { code: 'TO', dialCode: '+676', name: 'Tonga', flag: '🇹🇴' },
  { code: 'VU', dialCode: '+678', name: 'Vanuatu', flag: '🇻🇺' },
  { code: 'SB', dialCode: '+677', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: 'KI', dialCode: '+686', name: 'Kiribati', flag: '🇰🇮' },
  { code: 'TV', dialCode: '+688', name: 'Tuvalu', flag: '🇹🇻' },
  { code: 'NR', dialCode: '+674', name: 'Nauru', flag: '🇳🇷' },
  { code: 'PW', dialCode: '+680', name: 'Palau', flag: '🇵🇼' },
  { code: 'FM', dialCode: '+691', name: 'Micronesia', flag: '🇫🇲' },
  { code: 'MH', dialCode: '+692', name: 'Marshall Islands', flag: '🇲🇭' },
].filter((country, index, self) => 
  index === self.findIndex(c => c.code === country.code)
).sort((a, b) => a.name.localeCompare(b.name));

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 8" width="12" height="8">
    <path fill="#5f6e95" d="m6 7.375-6-6L1.075.3 6 5.25 10.925.325 12 1.4z"></path>
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 12" width="8" height="12">
    <path fill="currentColor" d="m1.4 0-1.075 1.075L5.25 6 .325 10.925 1.4 12l6-6z"></path>
  </svg>
);

const CheckboxUnchecked = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
    <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
      <path fill="#D9D9D9" d="M0 0h24v24H0z"></path>
    </mask>
    <g mask="url(#a)">
      <path fill="#5f6e95" d="M3.5 20.5v-17h17v17zM5 19h14V5H5z"></path>
    </g>
  </svg>
);

const CheckboxChecked = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
    <mask id="a" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
      <path fill="#D9D9D9" d="M0 0h24v24H0z"></path>
    </mask>
    <g mask="url(#a)">
      <path fill="#2e44ed" d="M3.5 20.5v-17h17v17zM5 19h14V5H5z"></path>
      <path fill="#2e44ed" d="M10.6 16.2l-3.65-3.65 1.05-1.05 2.6 2.6 5.95-5.95 1.05 1.05z"></path>
    </g>
  </svg>
);

// Helper component to render country flag emoji
const CountryFlag = ({ flag }) => (
  <span style={{ fontSize: '18px', lineHeight: '1' }}>{flag}</span>
);

function TextInput({ label, type = 'text', placeholder, required, value, onChange, name, error, onBlur, isValid }) {
  const isCompleted = value && value.trim() !== '' && !error;
  
  return (
    <div className="text-input">
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
          className={`${error ? 'input-error' : ''} ${isCompleted ? 'input-completed' : ''}`}
        />
        {isCompleted && (
          <span className="input-checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

function PhoneInput({ value, onChange, countryCode, onCountryChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country) => {
    if (onCountryChange) {
      onCountryChange(country.code);
    }
    setIsOpen(false);
  };

  return (
    <div className="phone-input">
      <label>Mobile phone</label>
      <div className="phone-wrapper">
        <div className="country-selector-wrapper" ref={dropdownRef}>
          <div 
            className={`country-selector ${isOpen ? 'country-selector--open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="country-selected">
              <CountryFlag flag={selectedCountry.flag} />
              <span>{selectedCountry.dialCode}</span>
            </div>
            <div className={`chevron ${isOpen ? 'chevron--up' : ''}`}>
              <ChevronDown />
            </div>
          </div>
          {isOpen && (
            <div className="country-dropdown">
              <div className="country-list">
                {countries.map((country) => (
                  <div
                    key={country.code}
                    className={`country-option ${selectedCountry.code === country.code ? 'country-option--selected' : ''}`}
                    onClick={() => handleCountrySelect(country)}
                  >
                    <span className="country-text">{country.name} ({country.dialCode})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="phone-field">
          <input
            type="tel"
            placeholder="Mobile phone"
            required
            pattern="[0-9]+"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

function Switch({ label, checked, onChange }) {
  return (
    <div className={`switch ${checked ? 'switch--active' : ''}`} onClick={onChange}>
      <div className="switch-toggle" role="checkbox" aria-checked={checked}>
        <span className="switch-toggle__background"></span>
        <span className="switch-toggle__indicator"></span>
      </div>
      <span className="switch__label">{label}</span>
    </div>
  );
}

function Checkbox({ checked, onChange, children }) {
  return (
    <div className="checkbox-input">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label onClick={onChange}>
        {checked ? <CheckboxChecked /> : <CheckboxUnchecked />}
        <span>{children}</span>
      </label>
    </div>
  );
}

export default function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [countryCode, setCountryCode] = useState('GB');
  const [whatsapp, setWhatsapp] = useState(false);
  const [sms, setSms] = useState(true);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName || formData.fullName.trim() === '') {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phone || formData.phone.trim() === '') {
      newErrors.phone = 'Mobile phone is required';
    }
    
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || formData.password.trim() === '') {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    setErrors(newErrors);
    // Mark all fields as touched to show errors
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      password: true
    });
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = formData.fullName && formData.phone && formData.email && formData.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    // Validate individual field on blur
    if (!formData[name] || formData[name].trim() === '') {
      setErrors(prev => ({ ...prev, [name]: `${name === 'fullName' ? 'Full name' : name === 'phone' ? 'Mobile phone' : name.charAt(0).toUpperCase() + name.slice(1)} is required` }));
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    } else if (name === 'password' && formData.password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
    } else {
      // Clear error if field is valid
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isFieldValid = (name) => {
    const value = formData[name];
    if (!value || value.trim() === '') return false;
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false;
    if (name === 'password' && value.length < 8) return false;
    return !errors[name];
  };

  return (
    <div className="signup-screen screen">
      <div className="auth-layout">
        <div className="auth-header">
          <h2>Buy machinery at dealer-only prices</h2>
          <p className="auth-description">Enter your details to access our stock today</p>
        </div>

        <div className="auth-content">
          <form className="signup-form" onSubmit={handleSubmit}>
            <TextInput
              label="Full name"
              placeholder="Full name"
              required
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
              onBlur={() => handleBlur('fullName')}
            />

            <PhoneInput
              value={formData.phone}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, phone: e.target.value }));
                if (errors.phone) {
                  setErrors(prev => ({ ...prev, phone: '' }));
                }
              }}
              countryCode={countryCode}
              onCountryChange={setCountryCode}
              error={errors.phone}
              onBlur={() => handleBlur('phone')}
            />

            <TextInput
              label="Email"
              type="email"
              placeholder="Email"
              required
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              onBlur={() => handleBlur('email')}
            />

            <TextInput
              label={
                <>
                  Password <span className="label-regular">(Min 8 Characters)</span>
                </>
              }
              type="password"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              onBlur={() => handleBlur('password')}
            />

            <div className="notifications-section">
              <h3 className="notifications-title">Notifications about new sales</h3>
              <div className="notifications-switches">
                <Switch
                  label="WhatsApp"
                  checked={whatsapp}
                  onChange={() => {
                    if (!whatsapp) setSms(false);
                    setWhatsapp(!whatsapp);
                  }}
                />
                <Switch
                  label="SMS"
                  checked={sms}
                  onChange={() => {
                    if (!sms) setWhatsapp(false);
                    setSms(!sms);
                  }}
                />
              </div>
            </div>

            <button type="submit" className="button primary" disabled={!isFormValid}>
              Get Started
              <ChevronRight />
            </button>

            <div className="terms-section">
              <p className="terms-text">
                By clicking Get Started you agree to the{' '}
                <a href="/terms-conditions" target="_blank" className="link">
                  Terms & conditions
                </a>{' '}
                and the{' '}
                <a href="/privacy-policy" target="_blank" className="link">
                  Privacy policy
                </a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
