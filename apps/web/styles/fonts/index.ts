import localFont from 'next/font/local'

// pageFont({
//   isVariable: true,
// 	fontFamily: 'frama',
// 	baseFontFile: '//pangrampangram.com/cdn/shop/files/PPFrama-VariableVF_611ce1ac-1fc9-4ac5-9670-95c6a7189dba.woff2?v=14032124434870182691',
// 	italicFontFile: '',
//   defaultWeight: 580,
//   defaultStyle: 'normal',
//   defaultVariableProperties: 'slnt:0',
// 	fontSizeAdjust: ''
// })

// @font-face {
//   font-family: 'PPFramaText';
//   src: url('//pangrampangram.com/cdn/shop/files/PPFramaText-Variable.woff2?v=1795283411966734016') format('woff2');
//   font-weight: 290 690;
//   font-style: normal;
// }

const frama = localFont({
  src: './PPFrama-Variable.woff2',
  variable: "--font-frama",
  display: "swap",
  weight: "100 900",
  style: "normal"
})

export { frama }
