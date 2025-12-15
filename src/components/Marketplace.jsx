import { useState, useMemo, useEffect, useRef } from 'react';
import './Marketplace.css';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
    <path d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.96H.957C.348 6.175 0 7.55 0 9s.348 2.825.957 4.04l3.007-2.333z" fill="#FBBC05"/>
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.96L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
  </svg>
);

const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

const TimesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="20" height="20">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="#3b82f6" width="100" height="100">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
  </svg>
);

const LocationPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="#8898aa" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const WatermarkIcon = () => (
  <svg width="92" height="92" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.1196 19.1196C14.7457 23.4934 7.65427 23.4934 3.2804 19.1196C-1.09347 14.7457 -1.09347 7.65427 3.2804 3.2804C7.65428 -1.09347 14.7457 -1.09347 19.1196 3.2804C23.4934 7.65428 23.4934 14.7457 19.1196 19.1196ZM2.9384 12.7228L4.06641 12.8921C4.18761 12.7189 4.32544 12.5539 4.47991 12.3995C4.63438 12.245 4.79932 12.1072 4.97252 11.986L4.85596 11.0442C4.84462 10.9526 4.90255 10.8677 4.99212 10.8446L6.95172 10.3387C7.04129 10.3156 7.13548 10.3612 7.17311 10.446L7.57557 11.3525C7.98243 11.4042 8.38375 11.5217 8.76222 11.7049L9.56874 11.1126C9.64304 11.0581 9.74604 11.0659 9.81121 11.1311L11.2696 12.5895C11.3348 12.6547 11.3426 12.7577 11.2881 12.832L10.6519 13.6984C10.7968 14.0443 10.8888 14.4062 10.9277 14.7717L11.9547 15.2275C12.0394 15.2652 12.0851 15.3594 12.062 15.449L11.5561 17.4086C11.533 17.4982 11.448 17.5561 11.3565 17.5447L10.2101 17.4028C10.108 17.5383 9.99528 17.6682 9.87199 17.7915C9.74871 17.9149 9.61876 18.0275 9.48327 18.1296L9.63168 19.4532C12.2688 19.9518 15.0987 19.1806 17.1396 17.1396C19.1806 15.0988 19.9518 12.2689 19.4532 9.63173L18.1296 9.48322C18.0274 9.61872 17.9147 9.74867 17.7915 9.87195C17.6682 9.99524 17.5383 10.1079 17.4028 10.21L17.5446 11.3564C17.5559 11.448 17.498 11.5329 17.4084 11.5561L15.4488 12.0619C15.3592 12.085 15.2651 12.0394 15.2275 11.9546L14.7716 10.9277C14.406 10.8887 14.0441 10.7967 13.6983 10.6518L12.8319 11.288C12.7576 11.3426 12.6546 11.3348 12.5894 11.2696L11.131 9.81119C11.0659 9.746 11.058 9.643 11.1126 9.5687L11.7048 8.76218C11.5216 8.38371 11.4041 7.98239 11.3525 7.57552L10.4459 7.17307C10.3612 7.13544 10.3155 7.04124 10.3386 6.95168L10.8445 4.99208C10.8676 4.90251 10.9525 4.84458 11.0441 4.85592L11.9859 4.97248C12.1071 4.79927 12.2449 4.63434 12.3994 4.47987C12.5539 4.32539 12.7188 4.18756 12.892 4.06637L12.7476 2.94298C10.1164 2.45225 7.29592 3.2247 5.2603 5.2603C3.23108 7.28953 2.45712 10.0987 2.9384 12.7228Z" fill="white"/>
  </svg>
);

const SpectingaLogo = () => (
  <svg width="140" height="25" viewBox="0 0 934 166" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0)">
      <path fillRule="evenodd" clipRule="evenodd" d="M141.69 141.69C109.276 174.103 56.7236 174.103 24.3101 141.69C-8.10338 109.276 -8.10338 56.7236 24.3101 24.3101C56.7237 -8.10338 109.276 -8.10338 141.69 24.3101C174.103 56.7237 174.103 109.276 141.69 141.69ZM21.7756 94.2852L30.135 95.5394C31.0332 94.2559 32.0546 93.0337 33.1993 91.8889C34.3441 90.7441 35.5664 89.7227 36.8499 88.8245L35.9861 81.8452C35.9021 81.1667 36.3314 80.5374 36.9952 80.366L51.5172 76.6172C52.181 76.4458 52.879 76.7841 53.1579 77.4124L56.1404 84.1305C59.1555 84.513 62.1296 85.3838 64.9343 86.7416L70.9112 82.3526C71.4618 81.9483 72.2251 82.0064 72.7081 82.4895L83.5159 93.2973C83.999 93.7803 84.0571 94.5436 83.6528 95.0942L78.9381 101.515C80.0119 104.078 80.6937 106.76 80.9824 109.469L88.5926 112.847C89.2208 113.126 89.5591 113.824 89.3877 114.488L85.6389 129.01C85.4675 129.674 84.8382 130.103 84.1597 130.019L75.6638 128.967C74.9073 129.971 74.0722 130.934 73.1585 131.848C72.2449 132.762 71.2819 133.597 70.2778 134.353L71.3776 144.162C90.9208 147.857 111.892 142.142 127.017 127.017C142.142 111.893 147.857 90.921 144.162 71.378L134.353 70.2774C133.596 71.2816 132.761 72.2446 131.848 73.1582C130.934 74.0719 129.971 74.907 128.967 75.6635L130.018 84.1593C130.102 84.8379 129.673 85.4672 129.009 85.6386L114.487 89.3874C113.823 89.5588 113.125 89.2205 112.847 88.5922L109.468 80.9822C106.759 80.6934 104.077 80.0116 101.514 78.9378L95.0936 83.6525C94.5431 84.0568 93.7797 83.9987 93.2967 83.5157L82.4889 72.7079C82.0059 72.2248 81.9478 71.4615 82.3521 70.9109L86.741 64.934C85.3833 62.1293 84.5125 59.1552 84.13 56.14L77.4118 53.1576C76.7836 52.8787 76.4453 52.1806 76.6167 51.5169L80.3655 36.9949C80.5369 36.3311 81.1662 35.9018 81.8447 35.9858L88.824 36.8496C89.7222 35.566 90.7435 34.3438 91.8883 33.199C93.0331 32.0542 94.2554 31.0328 95.5389 30.1347L94.4689 21.8096C74.9695 18.1729 54.068 23.8973 38.9826 38.9826C23.9446 54.0206 18.209 74.8383 21.7756 94.2852Z" fill="white"/>
      <path d="M231.659 126.474C224.516 126.474 217.583 125.32 210.86 123.012C204.242 120.598 198.622 117.188 194 112.781L202.666 96.8835C212.856 104.334 222.257 108.059 230.871 108.059C234.127 108.059 236.649 107.534 238.434 106.485C240.22 105.435 241.113 103.809 241.113 101.605C241.113 99.2969 239.905 97.6705 237.489 96.7261C235.073 95.6768 231.501 94.4701 226.774 93.106C220.471 91.0073 215.219 88.9612 211.017 86.9675C206.816 84.9738 203.664 82.5603 201.563 79.7272C199.462 76.894 198.412 73.1165 198.412 68.3945C198.412 60.1049 201.511 53.4418 207.708 48.405C213.906 43.2634 222.31 40.6925 232.919 40.6925C238.592 40.6925 244.107 41.5845 249.464 43.3683C254.926 45.1521 260.021 48.1427 264.748 52.34L254.979 68.0797C250.252 64.8269 246.05 62.4659 242.373 60.9968C238.697 59.5278 235.125 58.7933 231.659 58.7933C228.928 58.7933 226.617 59.3179 224.726 60.3673C222.835 61.3116 221.89 62.9906 221.89 65.404C221.89 67.7125 222.94 69.4439 225.041 70.5981C227.142 71.6474 230.398 72.8017 234.81 74.0609C241.533 76.0546 247.153 78.1007 251.67 80.1994C256.292 82.1931 259.706 84.7114 261.912 87.7545C264.223 90.6926 265.378 94.6275 265.378 99.5593C265.378 107.954 262.332 114.565 256.24 119.391C250.147 124.113 241.953 126.474 231.659 126.474Z" fill="white"/>
      <path d="M301.5 126.474C294.357 126.474 287.424 125.32 280.701 123.012C274.083 120.598 268.463 117.188 263.841 112.781L272.507 96.8835C282.697 104.334 292.098 108.059 300.712 108.059C303.968 108.059 306.49 107.534 308.275 106.485C310.061 105.435 310.954 103.809 310.954 101.605C310.954 99.2969 309.746 97.6705 307.33 96.7261C304.914 95.6768 301.342 94.4701 296.615 93.106C290.312 91.0073 285.06 88.9612 280.858 86.9675C276.657 84.9738 273.505 82.5603 271.404 79.7272C269.303 76.894 268.253 73.1165 268.253 68.3945C268.253 60.1049 271.352 53.4418 277.549 48.405C283.747 43.2634 292.151 40.6925 302.76 40.6925C308.433 40.6925 313.948 41.5845 319.305 43.3683C324.767 45.1521 329.862 48.1427 334.589 52.34L324.82 68.0797C320.093 64.8269 315.891 62.4659 312.214 60.9968C308.538 59.5278 304.966 58.7933 301.5 58.7933C298.769 58.7933 296.458 59.3179 294.567 60.3673C292.676 61.3116 291.731 62.9906 291.731 65.404C291.731 67.7125 292.781 69.4439 294.882 70.5981C296.983 71.6474 300.239 72.8017 304.651 74.0609C311.374 76.0546 316.994 78.1007 321.511 80.1994C326.133 82.1931 329.547 84.7114 331.753 87.7545C334.064 90.6926 335.219 94.6275 335.219 99.5593C335.219 107.954 332.173 114.565 326.081 119.391C319.988 124.113 311.794 126.474 301.5 126.474Z" fill="white"/>
      <path d="M380.5 126.474C373.357 126.474 366.424 125.32 359.701 123.012C353.083 120.598 347.463 117.188 342.841 112.781L351.507 96.8835C361.697 104.334 371.098 108.059 379.712 108.059C382.968 108.059 385.49 107.534 387.275 106.485C389.061 105.435 389.954 103.809 389.954 101.605C389.954 99.2969 388.746 97.6705 386.33 96.7261C383.914 95.6768 380.342 94.4701 375.615 93.106C369.312 91.0073 364.06 88.9612 359.858 86.9675C355.657 84.9738 352.505 82.5603 350.404 79.7272C348.303 76.894 347.253 73.1165 347.253 68.3945C347.253 60.1049 350.352 53.4418 356.549 48.405C362.747 43.2634 371.151 40.6925 381.76 40.6925C387.433 40.6925 392.948 41.5845 398.305 43.3683C403.767 45.1521 408.862 48.1427 413.589 52.34L403.82 68.0797C399.093 64.8269 394.891 62.4659 391.214 60.9968C387.538 59.5278 383.966 58.7933 380.5 58.7933C377.769 58.7933 375.458 59.3179 373.567 60.3673C371.676 61.3116 370.731 62.9906 370.731 65.404C370.731 67.7125 371.781 69.4439 373.882 70.5981C375.983 71.6474 379.239 72.8017 383.651 74.0609C390.374 76.0546 395.994 78.1007 400.511 80.1994C405.133 82.1931 408.547 84.7114 410.753 87.7545C413.064 90.6926 414.219 94.6275 414.219 99.5593C414.219 107.954 411.173 114.565 405.081 119.391C398.988 124.113 390.794 126.474 380.5 126.474Z" fill="white"/>
      <path d="M459.5 126.474C452.357 126.474 445.424 125.32 438.701 123.012C432.083 120.598 426.463 117.188 421.841 112.781L430.507 96.8835C440.697 104.334 450.098 108.059 458.712 108.059C461.968 108.059 464.49 107.534 466.275 106.485C468.061 105.435 468.954 103.809 468.954 101.605C468.954 99.2969 467.746 97.6705 465.33 96.7261C462.914 95.6768 459.342 94.4701 454.615 93.106C448.312 91.0073 443.06 88.9612 438.858 86.9675C434.657 84.9738 431.505 82.5603 429.404 79.7272C427.303 76.894 426.253 73.1165 426.253 68.3945C426.253 60.1049 429.352 53.4418 435.549 48.405C441.747 43.2634 450.151 40.6925 460.76 40.6925C466.433 40.6925 471.948 41.5845 477.305 43.3683C482.767 45.1521 487.862 48.1427 492.589 52.34L482.82 68.0797C478.093 64.8269 473.891 62.4659 470.214 60.9968C466.538 59.5278 462.966 58.7933 459.5 58.7933C456.769 58.7933 454.458 59.3179 452.567 60.3673C450.676 61.3116 449.731 62.9906 449.731 65.404C449.731 67.7125 450.781 69.4439 452.882 70.5981C454.983 71.6474 458.239 72.8017 462.651 74.0609C469.374 76.0546 474.994 78.1007 479.511 80.1994C484.133 82.1931 487.547 84.7114 489.753 87.7545C492.064 90.6926 493.219 94.6275 493.219 99.5593C493.219 107.954 490.173 114.565 484.081 119.391C477.988 124.113 469.794 126.474 459.5 126.474Z" fill="white"/>
      <path d="M538.5 126.474C531.357 126.474 524.424 125.32 517.701 123.012C511.083 120.598 505.463 117.188 500.841 112.781L509.507 96.8835C519.697 104.334 529.098 108.059 537.712 108.059C540.968 108.059 543.49 107.534 545.275 106.485C547.061 105.435 547.954 103.809 547.954 101.605C547.954 99.2969 546.746 97.6705 544.33 96.7261C541.914 95.6768 538.342 94.4701 533.615 93.106C527.312 91.0073 522.06 88.9612 517.858 86.9675C513.657 84.9738 510.505 82.5603 508.404 79.7272C506.303 76.894 505.253 73.1165 505.253 68.3945C505.253 60.1049 508.352 53.4418 514.549 48.405C520.747 43.2634 529.151 40.6925 539.76 40.6925C545.433 40.6925 550.948 41.5845 556.305 43.3683C561.767 45.1521 566.862 48.1427 571.589 52.34L561.82 68.0797C557.093 64.8269 552.891 62.4659 549.214 60.9968C545.538 59.5278 541.966 58.7933 538.5 58.7933C535.769 58.7933 533.458 59.3179 531.567 60.3673C529.676 61.3116 528.731 62.9906 528.731 65.404C528.731 67.7125 529.781 69.4439 531.882 70.5981C533.983 71.6474 537.239 72.8017 541.651 74.0609C548.374 76.0546 553.994 78.1007 558.511 80.1994C563.133 82.1931 566.547 84.7114 568.753 87.7545C571.064 90.6926 572.219 94.6275 572.219 99.5593C572.219 107.954 569.173 114.565 563.081 119.391C556.988 124.113 548.794 126.474 538.5 126.474Z" fill="white"/>
      <path d="M617.5 126.474C610.357 126.474 603.424 125.32 596.701 123.012C590.083 120.598 584.463 117.188 579.841 112.781L588.507 96.8835C598.697 104.334 608.098 108.059 616.712 108.059C619.968 108.059 622.49 107.534 624.275 106.485C626.061 105.435 626.954 103.809 626.954 101.605C626.954 99.2969 625.746 97.6705 623.33 96.7261C620.914 95.6768 617.342 94.4701 612.615 93.106C606.312 91.0073 601.06 88.9612 596.858 86.9675C592.657 84.9738 589.505 82.5603 587.404 79.7272C585.303 76.894 584.253 73.1165 584.253 68.3945C584.253 60.1049 587.352 53.4418 593.549 48.405C599.747 43.2634 608.151 40.6925 618.76 40.6925C624.433 40.6925 629.948 41.5845 635.305 43.3683C640.767 45.1521 645.862 48.1427 650.589 52.34L640.82 68.0797C636.093 64.8269 631.891 62.4659 628.214 60.9968C624.538 59.5278 620.966 58.7933 617.5 58.7933C614.769 58.7933 612.458 59.3179 610.567 60.3673C608.676 61.3116 607.731 62.9906 607.731 65.404C607.731 67.7125 608.781 69.4439 610.882 70.5981C612.983 71.6474 616.239 72.8017 620.651 74.0609C627.374 76.0546 632.994 78.1007 637.511 80.1994C642.133 82.1931 645.547 84.7114 647.753 87.7545C650.064 90.6926 651.219 94.6275 651.219 99.5593C651.219 107.954 648.173 114.565 642.081 119.391C635.988 124.113 627.794 126.474 617.5 126.474Z" fill="white"/>
      <path d="M696.5 126.474C689.357 126.474 682.424 125.32 675.701 123.012C669.083 120.598 663.463 117.188 658.841 112.781L667.507 96.8835C677.697 104.334 687.098 108.059 695.712 108.059C698.968 108.059 701.49 107.534 703.275 106.485C705.061 105.435 705.954 103.809 705.954 101.605C705.954 99.2969 704.746 97.6705 702.33 96.7261C699.914 95.6768 696.342 94.4701 691.615 93.106C685.312 91.0073 680.06 88.9612 675.858 86.9675C671.657 84.9738 668.505 82.5603 666.404 79.7272C664.303 76.894 663.253 73.1165 663.253 68.3945C663.253 60.1049 666.352 53.4418 672.549 48.405C678.747 43.2634 687.151 40.6925 697.76 40.6925C703.433 40.6925 708.948 41.5845 714.305 43.3683C719.767 45.1521 724.862 48.1427 729.589 52.34L719.82 68.0797C715.093 64.8269 710.891 62.4659 707.214 60.9968C703.538 59.5278 699.966 58.7933 696.5 58.7933C693.769 58.7933 691.458 59.3179 689.567 60.3673C687.676 61.3116 686.731 62.9906 686.731 65.404C686.731 67.7125 687.781 69.4439 689.882 70.5981C691.983 71.6474 695.239 72.8017 699.651 74.0609C706.374 76.0546 711.994 78.1007 716.511 80.1994C721.133 82.1931 724.547 84.7114 726.753 87.7545C729.064 90.6926 730.219 94.6275 730.219 99.5593C730.219 107.954 727.173 114.565 721.081 119.391C714.988 124.113 706.794 126.474 696.5 126.474Z" fill="white"/>
      <path d="M775.5 126.474C768.357 126.474 761.424 125.32 754.701 123.012C748.083 120.598 742.463 117.188 737.841 112.781L746.507 96.8835C756.697 104.334 766.098 108.059 774.712 108.059C777.968 108.059 780.49 107.534 782.275 106.485C784.061 105.435 784.954 103.809 784.954 101.605C784.954 99.2969 783.746 97.6705 781.33 96.7261C778.914 95.6768 775.342 94.4701 770.615 93.106C764.312 91.0073 759.06 88.9612 754.858 86.9675C750.657 84.9738 747.505 82.5603 745.404 79.7272C743.303 76.894 742.253 73.1165 742.253 68.3945C742.253 60.1049 745.352 53.4418 751.549 48.405C757.747 43.2634 766.151 40.6925 776.76 40.6925C782.433 40.6925 787.948 41.5845 793.305 43.3683C798.767 45.1521 803.862 48.1427 808.589 52.34L798.82 68.0797C794.093 64.8269 789.891 62.4659 786.214 60.9968C782.538 59.5278 778.966 58.7933 775.5 58.7933C772.769 58.7933 770.458 59.3179 768.567 60.3673C766.676 61.3116 765.731 62.9906 765.731 65.404C765.731 67.7125 766.781 69.4439 768.882 70.5981C770.983 71.6474 774.239 72.8017 778.651 74.0609C785.374 76.0546 790.994 78.1007 795.511 80.1994C800.133 82.1931 803.547 84.7114 805.753 87.7545C808.064 90.6926 809.219 94.6275 809.219 99.5593C809.219 107.954 806.173 114.565 800.081 119.391C793.988 124.113 785.794 126.474 775.5 126.474Z" fill="white"/>
      <path d="M854.5 126.474C847.357 126.474 840.424 125.32 833.701 123.012C827.083 120.598 821.463 117.188 816.841 112.781L825.507 96.8835C835.697 104.334 845.098 108.059 853.712 108.059C856.968 108.059 859.49 107.534 861.275 106.485C863.061 105.435 863.954 103.809 863.954 101.605C863.954 99.2969 862.746 97.6705 860.33 96.7261C857.914 95.6768 854.342 94.4701 849.615 93.106C843.312 91.0073 838.06 88.9612 833.858 86.9675C829.657 84.9738 826.505 82.5603 824.404 79.7272C822.303 76.894 821.253 73.1165 821.253 68.3945C821.253 60.1049 824.352 53.4418 830.549 48.405C836.747 43.2634 845.151 40.6925 855.76 40.6925C861.433 40.6925 866.948 41.5845 872.305 43.3683C877.767 45.1521 882.862 48.1427 887.589 52.34L877.82 68.0797C873.093 64.8269 868.891 62.4659 865.214 60.9968C861.538 59.5278 857.966 58.7933 854.5 58.7933C851.769 58.7933 849.458 59.3179 847.567 60.3673C845.676 61.3116 844.731 62.9906 844.731 65.404C844.731 67.7125 845.781 69.4439 847.882 70.5981C849.983 71.6474 853.239 72.8017 857.651 74.0609C864.374 76.0546 869.994 78.1007 874.511 80.1994C879.133 82.1931 882.547 84.7114 884.753 87.7545C887.064 90.6926 888.219 94.6275 888.219 99.5593C888.219 107.954 885.173 114.565 879.081 119.391C872.988 124.113 864.794 126.474 854.5 126.474Z" fill="white"/>
      <path d="M933.5 126.474C926.357 126.474 919.424 125.32 912.701 123.012C906.083 120.598 900.463 117.188 895.841 112.781L904.507 96.8835C914.697 104.334 924.098 108.059 932.712 108.059C935.968 108.059 938.49 107.534 940.275 106.485C942.061 105.435 942.954 103.809 942.954 101.605C942.954 99.2969 941.746 97.6705 939.33 96.7261C936.914 95.6768 933.342 94.4701 928.615 93.106C922.312 91.0073 917.06 88.9612 912.858 86.9675C908.657 84.9738 905.505 82.5603 903.404 79.7272C901.303 76.894 900.253 73.1165 900.253 68.3945C900.253 60.1049 903.352 53.4418 909.549 48.405C915.747 43.2634 924.151 40.6925 934.76 40.6925C940.433 40.6925 945.948 41.5845 951.305 43.3683C956.767 45.1521 961.862 48.1427 966.589 52.34L956.82 68.0797C952.093 64.8269 947.891 62.4659 944.214 60.9968C940.538 59.5278 936.966 58.7933 933.5 58.7933C930.769 58.7933 928.458 59.3179 926.567 60.3673C924.676 61.3116 923.731 62.9906 923.731 65.404C923.731 67.7125 924.781 69.4439 926.882 70.5981C928.983 71.6474 932.239 72.8017 936.651 74.0609C943.374 76.0546 948.994 78.1007 953.511 80.1994C958.133 82.1931 961.547 84.7114 963.753 87.7545C966.064 90.6926 967.219 94.6275 967.219 99.5593C967.219 107.954 964.173 114.565 958.081 119.391C951.988 124.113 943.794 126.474 933.5 126.474Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="934" height="166" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const brands = [
  { name: 'Case IH', count: 19 },
  { name: 'Claas', count: 31 },
  { name: 'Deutz-Fahr', count: 19 },
  { name: 'Fendt', count: 22 },
  { name: 'JCB', count: 34 },
  { name: 'John Deere', count: 53 },
  { name: 'Manitou', count: 16 },
  { name: 'Massey Ferguson', count: 34 },
  { name: 'Merlo', count: 9 },
  { name: 'New Holland', count: 30 },
  { name: 'Kubota', count: 12 },
  { name: 'McCormick', count: 8 },
  { name: 'Valtra', count: 15 },
  { name: 'Same', count: 7 },
  { name: 'Lamborghini', count: 5 },
  { name: 'Landini', count: 11 },
];

const models = [
  '526-56 AGRI',
  '531-70 Agri Super',
  '538-60 AGRI SUPER',
  '5435',
  '6155M',
  '6155R',
  '7230R',
  'Agrotron 150',
  'Axion 830',
  'Scorpion 746',
  '211 Vario TMS',
  '2706',
  '3415',
  '4066R',
  '4709',
  '4709M',
  '5075E',
  '5105D',
  '516 Profi Plus',
  '525-60 Agri Plus',
  '532-70 Agri Super',
  '535-125',
  '535-125 HiViz',
  '536-60 Agri Plus',
  '536-60 Agri Super',
  '536-70 AGRISUPER',
  '536-95 AGRIXTRA DualTech VT',
  '538-60 AGRI XTRA DualTech VT',
  '538-70 AGRISUPER DualTech VT',
  '540-140 HI-VIZ',
  '541-70 AGRIPRO',
  '541-70 AGRISUPER',
  '542-70 AgriPro',
  '542-70 Agri Super',
  '542-70 AGRISUPER DualTechVT',
  '542-70 AGRIXTRA',
  '542-70 AGRIXTRA DualTech VT',
  '5445',
  '5455',
  '5610',
  '5611',
  '5612 Dyna 6',
  '5710',
  '5711',
  '5713S',
  '6115R',
  '6120',
  '6120R',
  '6130R',
  '6130 TTV',
  '6135 C RVshift Warrior',
  '6150.4',
  '6180 TTV',
  '6190R',
  '6195M',
  '620 Vario Profi+',
  '6215R',
  '6230',
  '6250R',
  '6330',
  '6430 Premium',
  '6460',
  '6480',
  '6530 Premium',
  '6630 Premium',
  '6713S',
  '6820',
  '6830 Premium',
  '6920',
  '6930 Premium',
  '6R150',
  '6R 150',
  '6R155',
  '6R185',
  '6R 195',
  '6R 250',
  '6S.155',
  '714 Vario',
  '716 Vario',
  '720 Vario',
  '724 Gen7',
  '724 Profi Plus',
  '7250R',
  '7250 TTV',
  '7280R',
  '728 Vario',
  '7310R',
  '7610',
  '7618',
  '7718S',
  '7718S Exclusive',
  '7720',
  '7720S',
  '7720S Exclusive',
  '7726S',
  '7730',
  '7810',
  '7820',
  '7R 350',
  '7S 210',
  '818 Vario TMS',
  '828 Vario',
  '8345R',
  '8R 410',
  '8S.205',
  '8S.305',
  '942 Vario',
  '9620RX',
  'Agri Farmer 30.9',
  'Agri Pivot T60',
  'Agri Star 40.8 EVO2',
  'Agrotron 110',
  'Agrotron 130',
  'Agrotron K420',
  'Agrotron M610',
  'Agrotron M620',
  'Agrovector 29.6',
  'Apollo 25.6',
  'Arion 430',
  'Arion 610',
  'Arion 630',
  'Arion 650',
  'Arion 650 CMATIC',
  'Arion 660',
  'Axion 810',
  'Axion 930',
  'Axos 340',
  'CR9080',
  'Dedalus 26.6',
  'Farmall 105C',
  'Fastrac 8330',
  'Favorit 712 Vario',
  'G135',
  'IDEAL 9T',
  'KT276',
  'KT356',
  'KT357',
  'KT407',
  'Lamborghini R3 EVO 100',
  'LM5040',
  'LM5060 Plus',
  'M7173 Premium',
  'Magnum 225',
  'Magnum 280 CVX AFS',
  'Magnum 400 Rowtrac',
  'MF 8947',
  'MLT 627 Turbo',
  'MLT 629 Elite',
  'MLT 630-105',
  'MLT 630-115',
  'MLT 630-115 V',
  'MLT 635-130 PS+',
  'MLT 733-115',
  'MLT 737-130 PS+ Premium',
  'MLT 741-120 H LSU',
  'MLT 741-120 LSU PS',
  'MLT 741-140 V+',
  'MLT 741-140 V+ Elite',
  'MT 1440 Easy',
  'MT 1840',
  'MT 625 H',
  'MTX120',
  'MTX200',
  'MXM155',
  'N134',
  'N163',
  'Optum 300 CVX AFS Connect',
  'Panoramic P 32.6 Plus',
  'Puma 150',
  'Puma 155',
  'Puma 165 CVX',
  'Puma 175',
  'Puma 185',
  'Puma 200',
  'Puma 200 CVX AFS Connect',
  'Puma 240',
  'Rogator 655',
  'Rotana 160 V',
  'S294',
  'Scorpion 6030 Compact',
  'Scorpion 6035',
  'Scorpion 7030',
  'Scorpion 7035',
  'Scorpion 7044',
  'Scorpion 7055',
  'Scorpion 732',
  'Scorpion 9040 Plus',
  'Scorpion 9055',
  'T162',
  'T202',
  'T36.120SL',
  'T4.105 N',
  'T4512',
  'T4.75S',
  'T5.120',
  'T5.90',
  'T6.155',
  'T6.180',
  'T6.180 AC Blue Power',
  'T7030',
  'T7.185',
  'T7.200 CVT',
  'T7.220',
  'T7.225',
  'T7.245',
  'T7.315',
  'T7.315 HD',
  'T8020',
  'T8030',
  'Targo K 50',
  'TD5.105',
  'TF 35.7 CS-120',
  'TF 35.7 CS-140',
  'TF 38.10 CS-140',
  'TF 38.7 CS-120',
  'TF 42.7 CS-145',
  'TF 45.11 T-CS-170-CVTRONIC',
  'TH330 B',
  'TH7.42 Elite',
  'TH 8043',
  'TH9.35 Elite',
  'TL30.60',
  'TL 470',
  'TL90A',
  'TM155',
  'TM175',
  'TM220',
  'TM 220',
  'TM220 Agri',
  'TM 320',
  'TM420',
  'TS100A',
  'Turbofarmer P 34.7 Top',
  'Vestrum 100 CVX',
  'Vestrum 120 CVX',
  'X7.660',
  'X7.670',
  'Xerion 3300',
  'XTX200 XtraSpeed',
].map(name => ({ name, count: Math.floor(Math.random() * 50) + 1 })); // Add random counts for display

// UK and EU locations
const locations = [
  'London, UK', 'Manchester, UK', 'Birmingham, UK', 'Leeds, UK', 'Glasgow, UK',
  'Edinburgh, UK', 'Liverpool, UK', 'Bristol, UK', 'Sheffield, UK', 'Cardiff, UK',
  'Berlin, EU', 'Paris, EU', 'Amsterdam, EU', 'Brussels, EU', 'Dublin, EU',
  'Frankfurt, EU', 'Munich, EU', 'Hamburg, EU', 'Cologne, EU', 'Rotterdam, EU'
];

// Country codes with flags
const countries = [
  { flag: '🇬🇧', code: '+44', name: 'United Kingdom' },
  { flag: '🇺🇸', code: '+1', name: 'United States' },
  { flag: '🇨🇦', code: '+1', name: 'Canada' },
  { flag: '🇦🇺', code: '+61', name: 'Australia' },
  { flag: '🇩🇪', code: '+49', name: 'Germany' },
  { flag: '🇫🇷', code: '+33', name: 'France' },
  { flag: '🇮🇹', code: '+39', name: 'Italy' },
  { flag: '🇪🇸', code: '+34', name: 'Spain' },
  { flag: '🇳🇱', code: '+31', name: 'Netherlands' },
  { flag: '🇧🇪', code: '+32', name: 'Belgium' },
  { flag: '🇦🇹', code: '+43', name: 'Austria' },
  { flag: '🇨🇭', code: '+41', name: 'Switzerland' },
  { flag: '🇸🇪', code: '+46', name: 'Sweden' },
  { flag: '🇳🇴', code: '+47', name: 'Norway' },
  { flag: '🇩🇰', code: '+45', name: 'Denmark' },
  { flag: '🇫🇮', code: '+358', name: 'Finland' },
  { flag: '🇵🇱', code: '+48', name: 'Poland' },
  { flag: '🇮🇪', code: '+353', name: 'Ireland' },
  { flag: '🇵🇹', code: '+351', name: 'Portugal' },
  { flag: '🇬🇷', code: '+30', name: 'Greece' },
  { flag: '🇨🇿', code: '+420', name: 'Czech Republic' },
  { flag: '🇭🇺', code: '+36', name: 'Hungary' },
  { flag: '🇷🇴', code: '+40', name: 'Romania' },
  { flag: '🇧🇬', code: '+359', name: 'Bulgaria' },
  { flag: '🇭🇷', code: '+385', name: 'Croatia' },
  { flag: '🇸🇰', code: '+421', name: 'Slovakia' },
  { flag: '🇸🇮', code: '+386', name: 'Slovenia' },
  { flag: '🇱🇹', code: '+370', name: 'Lithuania' },
  { flag: '🇱🇻', code: '+371', name: 'Latvia' },
  { flag: '🇪🇪', code: '+372', name: 'Estonia' },
  { flag: '🇷🇺', code: '+7', name: 'Russia' },
  { flag: '🇺🇦', code: '+380', name: 'Ukraine' },
  { flag: '🇹🇷', code: '+90', name: 'Turkey' },
  { flag: '🇯🇵', code: '+81', name: 'Japan' },
  { flag: '🇨🇳', code: '+86', name: 'China' },
  { flag: '🇮🇳', code: '+91', name: 'India' },
  { flag: '🇰🇷', code: '+82', name: 'South Korea' },
  { flag: '🇸🇬', code: '+65', name: 'Singapore' },
  { flag: '🇲🇾', code: '+60', name: 'Malaysia' },
  { flag: '🇹🇭', code: '+66', name: 'Thailand' },
  { flag: '🇵🇭', code: '+63', name: 'Philippines' },
  { flag: '🇮🇩', code: '+62', name: 'Indonesia' },
  { flag: '🇻🇳', code: '+84', name: 'Vietnam' },
  { flag: '🇳🇿', code: '+64', name: 'New Zealand' },
  { flag: '🇿🇦', code: '+27', name: 'South Africa' },
  { flag: '🇧🇷', code: '+55', name: 'Brazil' },
  { flag: '🇲🇽', code: '+52', name: 'Mexico' },
  { flag: '🇦🇷', code: '+54', name: 'Argentina' },
  { flag: '🇨🇱', code: '+56', name: 'Chile' },
  { flag: '🇨🇴', code: '+57', name: 'Colombia' },
  { flag: '🇵🇪', code: '+51', name: 'Peru' },
  { flag: '🇦🇪', code: '+971', name: 'United Arab Emirates' },
  { flag: '🇸🇦', code: '+966', name: 'Saudi Arabia' },
  { flag: '🇮🇱', code: '+972', name: 'Israel' },
  { flag: '🇪🇬', code: '+20', name: 'Egypt' },
  { flag: '🇳🇬', code: '+234', name: 'Nigeria' },
  { flag: '🇰🇪', code: '+254', name: 'Kenya' },
].sort((a, b) => a.name.localeCompare(b.name));

// Generate random timestamp within last 30 days
const generateTimestamp = () => {
  const now = Date.now();
  const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
  const randomTime = Math.random() * (now - thirtyDaysAgo) + thirtyDaysAgo;
  return new Date(randomTime);
};

// Available tractor images
const tractorImages = [
  '/arion-tractor-1.jpg',
  '/john-tractor-1.jpg',
  '/massey-tractor-1.jpg',
];

// Get random tractor image for a vehicle
const getRandomTractorImage = (id) => {
  // Use vehicle id as seed for consistent randomness per vehicle
  return tractorImages[id % tractorImages.length];
};

// Generate random blur amount (8px to 15px)
const getRandomBlur = (id) => {
  const seed = id * 7;
  return 8 + (seed % 8); // 8px to 15px
};

// Generate random opacity (0.5 to 0.8)
const getRandomOpacity = (id) => {
  const seed = id * 11;
  return 0.5 + ((seed % 4) * 0.1); // 0.5, 0.6, 0.7, or 0.8
};

// Generate random scale (1.05 to 1.2)
const getRandomScale = (id) => {
  const seed = id * 13;
  return 1.05 + ((seed % 4) * 0.05); // 1.05, 1.1, 1.15, or 1.2
};

// Generate random horizontal position (-10% to 10%)
const getRandomPositionX = (id) => {
  const seed = id * 17;
  return -10 + ((seed % 21) * 1); // -10% to 10%
};

// Generate random vertical position (-10% to 10%)
const getRandomPositionY = (id) => {
  const seed = id * 19;
  return -10 + ((seed % 21) * 1); // -10% to 10%
};

const vehicles = [
  { id: 1, model: 'Claas Arion 430', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(1) },
  { id: 2, model: 'John Deere 6155R', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(2) },
  { id: 3, model: 'John Deere 8R 410', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(3) },
  { id: 4, model: 'Massey Ferguson 7718S', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(4) },
  { id: 5, model: 'Claas Scorpion 746', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(5) },
  { id: 6, model: 'John Deere 7810', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(6) },
  { id: 7, model: 'John Deere 6330', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(7) },
  { id: 8, model: 'Deutz-Fahr Agrotron 150', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(8) },
  { id: 9, model: 'Fendt IDEAL 9T', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(9) },
  { id: 10, model: 'Claas Scorpion 6035', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(10) },
  { id: 11, model: 'Claas Arion 630', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(11) },
  { id: 12, model: 'New Holland T5.120', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(12) },
  { id: 13, model: 'John Deere 6230', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(13) },
  { id: 14, model: 'Case IH Vestrum 100 CVX', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(14) },
  { id: 15, model: 'Manitou MLT 630-105', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(15) },
  { id: 16, model: 'Massey Ferguson 5445', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(16) },
  { id: 17, model: 'Fendt 714 Vario', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(17) },
  { id: 18, model: 'Case IH Magnum 280 CVX AFS', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(18) },
  { id: 19, model: 'Manitou MLT 629 Elite', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(19) },
  { id: 20, model: 'Massey Ferguson 6S.155', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(20) },
  { id: 21, model: 'Fendt 720 Vario', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(21) },
  { id: 22, model: 'John Deere 6830 Premium', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(22) },
  { id: 23, model: 'JCB 538-70 AGRISUPER DualTech VT', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(23) },
  { id: 24, model: 'JCB 542-70 Agri Super', location: locations[Math.floor(Math.random() * locations.length)], timestamp: generateTimestamp(), image: getRandomTractorImage(24) },
];

export default function Marketplace({ onBecomeDealerClick }) {
  const [priceRange, setPriceRange] = useState([0, 274000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [selectedModels, setSelectedModels] = useState([]);
  const [modelSearchQuery, setModelSearchQuery] = useState('');
  const [showAllModels, setShowAllModels] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [activeSlider, setActiveSlider] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({ flag: '🇬🇧', code: '+44', name: 'United Kingdom' });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = useState('');
  const countryDropdownRef = useRef(null);
  const [showScrollModal, setShowScrollModal] = useState(false);
  const [email, setEmail] = useState('');

  // Handle scroll to show/hide modal
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
      
      // Show modal when scrolled halfway down (50%)
      if (scrollPercentage >= 0.5) {
        setShowScrollModal(true);
      } else {
        // Hide modal when scrolled back to top
        setShowScrollModal(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
        setCountrySearchQuery('');
      }
    };

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!countrySearchQuery) return countries;
    const query = countrySearchQuery.toLowerCase();
    return countries.filter(country =>
      country.name.toLowerCase().includes(query) ||
      country.code.includes(query) ||
      country.flag.includes(query)
    );
  }, [countrySearchQuery]);

  // Filter brands based on search query
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(brandSearchQuery.toLowerCase())
  );

  // Display filtered brands (with show more/less functionality)
  // Show random 5 brands initially to suggest they're popular
  const displayedBrands = useMemo(() => {
    if (showAllBrands) {
      return filteredBrands;
    }
    if (filteredBrands.length <= 5) {
      return filteredBrands;
    }
    // Show random 5 from filtered brands to suggest they're popular
    const shuffled = [...filteredBrands].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [showAllBrands, filteredBrands]);

  // Filter models based on search query
  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(modelSearchQuery.toLowerCase())
  );

  // Display filtered models (with show more/less functionality)
  // Show random 5 models initially to suggest they're popular
  const displayedModels = useMemo(() => {
    if (showAllModels) {
      return filteredModels;
    }
    if (filteredModels.length <= 5) {
      return filteredModels;
    }
    // Show random 5 from filtered models to suggest they're popular
    const shuffled = [...filteredModels].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [showAllModels, filteredModels]);
  const totalVehicles = 296;
  const vehiclesPerPage = 24;
  
  // Calculate filtered vehicle count based on active filters
  const hasActiveFilters = selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 274000;
  
  // Calculate filtered count based on active filters
  // When brands are selected, estimate based on brand counts
  // When price range is adjusted, estimate based on price distribution
  let filteredVehicleCount = totalVehicles;
  
  if (selectedBrands.length > 0) {
    // Estimate: sum of selected brand counts
    const selectedBrandCounts = brands
      .filter(brand => selectedBrands.includes(brand.name))
      .reduce((sum, brand) => sum + brand.count, 0);
    filteredVehicleCount = Math.min(filteredVehicleCount, selectedBrandCounts);
  }
  
  if (priceRange[0] > 0 || priceRange[1] < 274000) {
    // Estimate: price range reduces available vehicles
    // Simple estimation: reduce by percentage of range used
    const priceRangePercent = ((priceRange[1] - priceRange[0]) / 274000) * 100;
    filteredVehicleCount = Math.floor(filteredVehicleCount * (priceRangePercent / 100));
  }
  
  // If both filters are active, use the more restrictive one
  if (selectedBrands.length > 0 && (priceRange[0] > 0 || priceRange[1] < 274000)) {
    const brandCount = brands
      .filter(brand => selectedBrands.includes(brand.name))
      .reduce((sum, brand) => sum + brand.count, 0);
    const priceEstimate = Math.floor(totalVehicles * ((priceRange[1] - priceRange[0]) / 274000));
    filteredVehicleCount = Math.min(brandCount, priceEstimate);
  }
  
  const displayCount = hasActiveFilters ? Math.max(1, filteredVehicleCount) : totalVehicles;
  
  const totalPages = Math.ceil(displayCount / vehiclesPerPage);

  // Format timestamp as "X hours/days ago"
  const formatTimestamp = (date) => {
    const now = Date.now();
    const diffMs = now - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffHours < 1) {
      return 'Less than an hour ago';
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else {
      const diffWeeks = Math.floor(diffDays / 7);
      return `${diffWeeks} ${diffWeeks === 1 ? 'week' : 'weeks'} ago`;
    }
  };

  // Sort vehicles based on sortBy selection
  const sortedVehicles = useMemo(() => {
    const sorted = [...vehicles];
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      case 'oldest':
        return sorted.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      case 'price-low':
        // For now, keep original order (price not available)
        return sorted;
      case 'price-high':
        // For now, keep original order (price not available)
        return sorted;
      default:
        return sorted;
    }
  }, [sortBy]);

  const handleBrandToggle = (brandName) => {
    setSelectedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
  };

  const handleModelToggle = (modelName) => {
    setSelectedModels(prev =>
      prev.includes(modelName)
        ? prev.filter(m => m !== modelName)
        : [...prev, modelName]
    );
  };

  const MIN_PRICE_DIFFERENCE = 10000; // Minimum £10,000 difference between min and max

  const handleMinPriceChange = (e) => {
    setActiveSlider('min');
    const value = parseInt(e.target.value);
    const maxValue = priceRange[1];
    // Ensure min doesn't exceed max and maintains minimum distance
    if (value <= maxValue - MIN_PRICE_DIFFERENCE) {
      setPriceRange([value, maxValue]);
    } else {
      // If too close, push max up
      setPriceRange([value, Math.min(274000, value + MIN_PRICE_DIFFERENCE)]);
    }
  };

  const handleMaxPriceChange = (e) => {
    setActiveSlider('max');
    const value = parseInt(e.target.value);
    const minValue = priceRange[0];
    // Ensure max doesn't go below min and maintains minimum distance
    if (value >= minValue + MIN_PRICE_DIFFERENCE) {
      setPriceRange([minValue, value]);
    } else {
      // If too close, push min down
      setPriceRange([Math.max(0, value - MIN_PRICE_DIFFERENCE), value]);
    }
  };

  const handleMinPriceInputChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(0, Math.min(274000, value));
    const maxValue = priceRange[1];
    if (clampedValue <= maxValue - MIN_PRICE_DIFFERENCE) {
      setPriceRange([clampedValue, maxValue]);
    } else {
      setPriceRange([clampedValue, Math.min(274000, clampedValue + MIN_PRICE_DIFFERENCE)]);
    }
  };

  const handleMaxPriceInputChange = (e) => {
    const value = parseInt(e.target.value) || 274000;
    const clampedValue = Math.max(0, Math.min(274000, value));
    const minValue = priceRange[0];
    if (clampedValue >= minValue + MIN_PRICE_DIFFERENCE) {
      setPriceRange([minValue, clampedValue]);
    } else {
      setPriceRange([Math.max(0, clampedValue - MIN_PRICE_DIFFERENCE), clampedValue]);
    }
  };

  return (
    <div className="marketplace">
      <div className="marketplace-wrapper">
        {/* Main Content */}
        <div className="marketplace-content">
          {/* Filters Sidebar */}
          <aside className="marketplace-filters">
            <h2 className="filters-heading">Filter by</h2>
            
            {/* Search Bar */}
            <div className="marketplace-search">
              <div className="marketplace-search-wrapper">
                <SearchIcon className="marketplace-search-icon" />
                <input
                  type="text"
                  placeholder="Search by make and model"
                  className="marketplace-search-input"
                />
              </div>
            </div>
            <div className="filter-section">
              <h3 className="filter-title">By price range</h3>
              <div className="price-range">
                <div className="price-range-slider-container">
                  <div 
                    className="price-range-track"
                    style={{
                      left: `${(priceRange[0] / 274000) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / 274000) * 100}%`
                    }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max="274000"
                    step="1000"
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    onMouseDown={(e) => {
                      setActiveSlider('min');
                      e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                      setActiveSlider('min');
                      e.stopPropagation();
                    }}
                    onMouseUp={() => setActiveSlider(null)}
                    onTouchEnd={() => setActiveSlider(null)}
                    className={`price-range-slider price-range-slider-min ${activeSlider === 'min' ? 'active' : ''}`}
                  />
                  <input
                    type="range"
                    min="0"
                    max="274000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    onMouseDown={(e) => {
                      setActiveSlider('max');
                      e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                      setActiveSlider('max');
                      e.stopPropagation();
                    }}
                    onMouseUp={() => setActiveSlider(null)}
                    onTouchEnd={() => setActiveSlider(null)}
                    className={`price-range-slider price-range-slider-max ${activeSlider === 'max' ? 'active' : ''}`}
                  />
                </div>
                <div className="price-range-labels">
                  <div className="price-input-wrapper">
                    <span className="price-symbol-static">£</span>
                    <input
                      type="number"
                      min="0"
                      max="274000"
                      value={priceRange[0]}
                      onChange={handleMinPriceInputChange}
                      className="price-range-input"
                    />
                  </div>
                  <div className="price-input-wrapper">
                    <span className="price-symbol-static">£</span>
                    <input
                      type="number"
                      min="0"
                      max="274000"
                      value={priceRange[1]}
                      onChange={handleMaxPriceInputChange}
                      className="price-range-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Brands</h3>
              <div className="filter-search">
                <div className="filter-search-wrapper">
                  <SearchIcon className="filter-search-icon" />
                  <input
                    type="text"
                    placeholder="Search brands"
                    className="filter-search-input"
                    value={brandSearchQuery}
                    onChange={(e) => setBrandSearchQuery(e.target.value)}
                  />
                  {brandSearchQuery && (
                    <button
                      type="button"
                      className="filter-search-clear"
                      onClick={() => setBrandSearchQuery('')}
                      aria-label="Clear search"
                    >
                      <TimesIcon />
                    </button>
                  )}
                </div>
              </div>
              <div className="brand-list">
                {displayedBrands.length > 0 ? (
                  displayedBrands.map((brand) => (
                    <label key={brand.name} className="brand-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand.name)}
                        onChange={() => handleBrandToggle(brand.name)}
                      />
                      <span className="brand-name">{brand.name}</span>
                      <span className="brand-count">({brand.count})</span>
                    </label>
                  ))
                ) : (
                  <p className="no-brands-message">No brands found</p>
                )}
              </div>
              {filteredBrands.length > 5 && (
                <button
                  className="show-more-link"
                  onClick={() => setShowAllBrands(!showAllBrands)}
                >
                  {showAllBrands ? 'Show less' : `Show ${filteredBrands.length - 5} more`}
                </button>
              )}
            </div>

            <div className="filter-section">
              <h3 className="filter-title">Models</h3>
              <div className="filter-search">
                <div className="filter-search-wrapper">
                  <SearchIcon className="filter-search-icon" />
                  <input
                    type="text"
                    placeholder="Search models"
                    className="filter-search-input"
                    value={modelSearchQuery}
                    onChange={(e) => setModelSearchQuery(e.target.value)}
                  />
                  {modelSearchQuery && (
                    <button
                      type="button"
                      className="filter-search-clear"
                      onClick={() => setModelSearchQuery('')}
                      aria-label="Clear search"
                    >
                      <TimesIcon />
                    </button>
                  )}
                </div>
              </div>
              <div className="brand-list">
                {displayedModels.length > 0 ? (
                  displayedModels.map((model) => (
                    <label key={model.name} className="brand-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedModels.includes(model.name)}
                        onChange={() => handleModelToggle(model.name)}
                      />
                      <span className="brand-name">{model.name}</span>
                      <span className="brand-count">({model.count})</span>
                    </label>
                  ))
                ) : (
                  <p className="no-brands-message">No models found</p>
                )}
              </div>
              {filteredModels.length > 5 && (
                <button
                  className="show-more-link"
                  onClick={() => setShowAllModels(!showAllModels)}
                >
                  {showAllModels ? 'Show less' : `Show ${filteredModels.length - 5} more`}
                </button>
              )}
            </div>
          </aside>

          {/* Listings Area */}
          <div className="marketplace-listings">
            {/* Summary and Sort */}
            <div className="listings-header">
              <div className="listings-summary">
                <h2 className="listings-title">All {displayCount} Vehicles</h2>
              </div>
              <div className="listings-sort">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Promotional Card */}
            <div className="promotional-card">
              <h3 className="promotional-heading">Never miss a deal</h3>
              <p className="promotional-subheading">Get price alerts directly to your phone</p>
              
              <div className="promotional-phone-input">
                <label className="promotional-label">Enter your mobile number</label>
                <div className="phone-input-row">
                  <div className="phone-input-wrapper">
                    <div className="country-code-selector-wrapper" ref={countryDropdownRef}>
                      <div 
                        className="country-code-selector"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                      >
                        <span className="flag-emoji">{selectedCountry.flag}</span>
                        <span className="country-code">{selectedCountry.code}</span>
                        <ChevronDown className={`country-code-chevron ${showCountryDropdown ? 'open' : ''}`} />
                      </div>
                      {showCountryDropdown && (
                        <div className="country-dropdown">
                          <div className="country-dropdown-search">
                            <SearchIcon className="country-search-icon" />
                            <input
                              type="text"
                              placeholder="Search country..."
                              className="country-search-input"
                              value={countrySearchQuery}
                              onChange={(e) => setCountrySearchQuery(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              onFocus={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div className="country-dropdown-list">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country, index) => (
                                <div
                                  key={`${country.code}-${country.name}-${index}`}
                                  className={`country-dropdown-item ${selectedCountry.code === country.code && selectedCountry.flag === country.flag ? 'selected' : ''}`}
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setShowCountryDropdown(false);
                                    setCountrySearchQuery('');
                                  }}
                                >
                                  <span className="country-item-flag">{country.flag}</span>
                                  <span className="country-item-code">{country.code}</span>
                                  <span className="country-item-name">{country.name}</span>
                                </div>
                              ))
                            ) : (
                              <div className="country-dropdown-item no-results">
                                <span>No countries found</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      placeholder="Mobile phone"
                      className="phone-input"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <button
                    className="promotional-button"
                    onClick={() => setShowNotificationModal(true)}
                  >
                    Get price alerts
                    <ArrowRight className="promotional-button-arrow" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notification Settings Modal */}
            {showNotificationModal && (
              <div className="modal-overlay" onClick={() => setShowNotificationModal(false)}>
                <div className="notification-modal" onClick={(e) => e.stopPropagation()}>
                  <h3 className="notification-modal-heading">Notifications about new sales</h3>
                  
                  <div className="notification-options">
                    <div className="notification-option">
                      <span className="notification-label">WhatsApp</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={whatsappEnabled}
                          onChange={(e) => setWhatsappEnabled(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="notification-option">
                      <span className="notification-label">SMS</span>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={smsEnabled}
                          onChange={(e) => setSmsEnabled(e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  </div>

                  <button
                    className="notification-modal-done"
                    onClick={() => {
                      setShowNotificationModal(false);
                      onBecomeDealerClick();
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Vehicle Grid */}
            <div className="vehicles-grid">
              {sortedVehicles.map((vehicle) => (
                <div 
                  key={vehicle.id} 
                  className="vehicle-card"
                  onClick={() => setShowScrollModal(true)}
                >
                  <div className="vehicle-image-placeholder">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.model}
                      className="vehicle-placeholder-image"
                      style={{
                        filter: `blur(${getRandomBlur(vehicle.id)}px)`,
                        opacity: getRandomOpacity(vehicle.id),
                        transform: `scale(${getRandomScale(vehicle.id)}) translate(${getRandomPositionX(vehicle.id)}%, ${getRandomPositionY(vehicle.id)}%)`,
                      }}
                    />
                    <div className="vehicle-watermark">
                      <WatermarkIcon />
                    </div>
                  </div>
                  <h3 className="vehicle-model">{vehicle.model}</h3>
                  <div className="vehicle-meta">
                    <LocationPinIcon className="vehicle-location-icon" />
                    <span className="vehicle-location-text">{vehicle.location}</span>
                    <span className="vehicle-meta-separator">•</span>
                    <span className="vehicle-timestamp">{formatTimestamp(vehicle.timestamp)}</span>
                  </div>
                  <div className="vehicle-price-placeholder">
                    <span className="price-symbol">£</span>
                    <span className="price-block"></span>
                    <span className="price-block"></span>
                    <span className="price-block"></span>
                    <span className="price-comma">,</span>
                    <span className="price-block"></span>
                    <span className="price-block"></span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              {totalPages > 5 && (
                <>
                  <span className="pagination-ellipsis">...</span>
                  <button
                    className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              {currentPage < totalPages && (
                <button
                  className="pagination-arrow"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <ArrowRight />
                </button>
              )}
            </div>

            {/* Request Machinery Section */}
            <div className="request-machinery">
              <p className="request-text">
                Can't find what you're looking for?
              </p>
              <p className="request-subtext">
                Try adjusting your search or filter options, or click the button below to tell us what you're looking for.
              </p>
              <button className="request-button">
                Request machinery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Modal */}
      {showScrollModal && (
        <div className="scroll-modal-overlay" onClick={() => {
          setShowScrollModal(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <div className="scroll-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="scroll-modal-close"
              onClick={() => setShowScrollModal(false)}
              aria-label="Close modal"
            >
              <TimesIcon />
            </button>
            <div className="scroll-modal-icon">
              <LockIcon />
            </div>
            <h3 className="scroll-modal-heading">Sign up to view prices, photos and condition reports</h3>
            <div className="scroll-modal-buttons">
              <button 
                className="scroll-modal-button google-button"
                onClick={onBecomeDealerClick}
              >
                <GoogleIcon />
                Sign up with Google
              </button>
              <div className="scroll-modal-divider">
                <span className="scroll-modal-divider-line"></span>
                <span className="scroll-modal-divider-text">or</span>
                <span className="scroll-modal-divider-line"></span>
              </div>
              <div className="scroll-modal-email-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="scroll-modal-email-input"
                />
                <button 
                  className="scroll-modal-button email-button"
                  onClick={onBecomeDealerClick}
                >
                  <ArrowRight className="scroll-modal-button-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

