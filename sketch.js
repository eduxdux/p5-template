
function createWeightedSelector(e) {
  const t = [];
  for (const a of e)
    for (let e = 0; e < a.weight; e++)
      t.push(a.value);
  return function () {
    // return t[Math.floor(Math.random() * t.length)]
    return t[nfaRandom(0, t.length - 1)]
  }
}



//console.log(rnd_btw(0, 1250))

let palette,bg_color,dark,pal_name;

const pickPaleta = createWeightedSelector([
  {
    weight: 1,
    value: "Primary"
  },
  {
    weight: 1,
    value: "Outono"
  },
  {
    weight: 1,
    value: "Rubro"
  },
  {
    weight: 1,
    value: "Munch"
  },
  {
    weight: 0,
    value: "CMYK"
  },
  {
    weight: 0,
    value: "Riso"
  },
  {
    weight: 1,
    value: "Moon"
  },
  {
    weight: 1,
    value: "Blueness"
  },
  {
    weight: 1,
    value: "Redness"
  },
  {
    weight: 1,
    value: "Yellowness"
  },
  {
    weight: 1,
    value: "Greeness"
  },
  {
    weight: 1,
    value: "Pinkness"
  },
  {
    weight: 1,
    value: "Purpleness"
  },
  {
      weight: 1,
      value: "BW"
    },
]);

let corzinha = pickPaleta();

switch (corzinha) {
  case "Primary":
    palette = ["#EDC917", "#0B0C0C", "#FD3E4D", "#6886DC"],
      bg_color = ["#F9F8DC", "#F9EDD6"],
      dark = false,
      pal_name = "Primary"
    break;

  case "Outono":
    palette = ['#053043', '#F37247', '#FDAF3A'],
      bg_color = ['#F2F2F2', '#FFF1E0', '#F2E7C4'],
      dark = false,
      pal_name = "Outono"
    break;

  case "Rubro":
    palette = ["#0F0F0F", "#F22233","#0F0F0F", "#F22233","#fff"],
      bg_color = ["#F4D075", "#FFF1E0"],
      dark = false,
      pal_name = "Rubro"
    break;

  case "Munch":
    palette = ["#4278A1", "#E69352", "#EDB830", "#E4512F", "#272A2A"],
      bg_color = ["#F4D075", "#FFF1E0"],
      dark = false,
      pal_name = "Munch"
    break;

  case "CMYK":
    palette = ["cyan", "magenta", "yellow", "black"],
      bg_color = [ "#FFF1E0"],
      dark = false,
      pal_name = "CMYK"
    break;

  case "Riso":
    palette = ["#1851BB", "#F7AFE1", "#39104A", "#FF3F00", "#F3D701"],
      bg_color = ["#E8E7E3", "#FFF1E0"],
      dark = false,
      pal_name = "Riso"
    break;

  case "Moon":
    palette = ['#F1F0F2', '#F2BF5E', '#F3D701', '#59A8D9',"#edf2f4"],
      bg_color = ['#121212', '#00181F', '#000C17', '#011629', '#012340'],
      dark = true,
      pal_name = "Moon"
    break;

  case "Blueness":
    bg_color = ['#caf0f8', '#fefae0', '#edf2f4', "#FFF",'#03071e'],
      palette = ['#023e8a', '#0077b6', '#0096c7', '#3a86ff', '#00b4d8'],
      dark = true,
      pal_name = "Blueness"
    break;

  case "Redness":
    bg_color = ['#F7AFE1', '#121212', '#ffffff', '#e5e5e5', "#fca311"],
      palette = ['#d90429', '#ef233c', '#d62828', '#e71d36','#ffffff','#F7AFE1'],
      dark = true,
      pal_name = "Redness"
    break;

  case "Yellowness":
    bg_color = ['#ffffff', '#000000', '#F7A411', "#fefae0","#FFF79F"],
      palette = ['#ffba08', '#f48c06', '#fca311', '#ffd60a', '#ffc300'],
      dark = true,
      pal_name = "Yellowness"
    break;

  case "Greeness":
    bg_color = ['#ffffff', '#000000', '#001928', '#143601', "#00c49a"],
      palette = ['#8ac926', '#a5be00', '#4f772d', '#008000', '#538d22'],
      dark = true,
      pal_name = "Greeness"
    break;
  case "Pinkness":
    bg_color = ['#ffffff', '#38040e', '#fae0e4', '#fff1e6', "#dfe7fd"],
      palette = ['#fb6376', '#e27396', '#ff70a6', '#ff6392', '#ff0a54'],
      dark = true,
      pal_name = "Pinkness"
    break;
  case "Purpleness":
    bg_color = ['#ffffff', '#e0c1e4', '#9264a7', '#d8b9d9', '#f3e9f1'];
    palette = ['#7e43a3', '#9a4db8', '#b273c9', '#ca99d5','#4c1d95'];
    dark = true;
    pal_name = "Purpleness";
    break;
    case "BW":
      palette = ['#ddd', '#141414'];
      bg_color = ["#E8E7E3", "#FFF1E0"];
      dark = false;
      pal_name = "+- Monochrome";
      break;

}

console.log(palette)

const vertLut = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  // Invertendo apenas a coordenada x da textura para correção horizontal
  vTexCoord = vec2(aTexCoord.x, 1.0 - aTexCoord.y);
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
`;


const fragLut = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uImage;
uniform sampler2D uText1;
uniform sampler2D uText2;
uniform sampler2D uText3;
uniform sampler2D uText4;
uniform sampler2D uTextVacio;

varying vec2 vTexCoord;

void main() {
  vec4 pixel = texture2D(uImage, vTexCoord);
  
  // Verificar se o pixel é transparente
  if (pixel.a < 0.01) {
    gl_FragColor = pixel; // Mantém o pixel original se for quase transparente
    return;
  }

  float luminosity = 0.3 * pixel.r + 0.59 * pixel.g + 0.11 * pixel.b;

  vec4 lutColor;
  if (luminosity <= 0.01) { 
    lutColor = texture2D(uTextVacio, vTexCoord); // Preto absoluto
  } else if (luminosity < 0.25) { 
    lutColor = texture2D(uText1, vTexCoord); // Faixa para uText1
  } else if (luminosity < 0.50) { 
    lutColor = texture2D(uText2, vTexCoord); // Faixa para uText2
  } else if (luminosity < 0.75) { 
    lutColor = texture2D(uText3, vTexCoord); // Faixa para uText3
  } else {
    lutColor = texture2D(uText4, vTexCoord); // Faixa para uText4
  }

  gl_FragColor = vec4(lutColor.rgb, lutColor.a);
}
`

let distortFrag = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float freq;
uniform float amp;
uniform float randseed;  // Certifique-se de passar isso como uniform no JavaScript

uniform sampler2D u_image;

// As funções 'random' e 'noise' fornecidas
const float PHI = 1.61803398875;

float random(in vec2 xy) {
    return fract(tan(distance(xy * PHI, xy) * fract(randseed / 100. + 10.)) * xy.x);
}

float noise(in vec2 p) {
    vec2 id = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(random(id + vec2(0.0, 0.0)), 
                   random(id + vec2(1.0, 0.0)), u.x),
               mix(random(id + vec2(0.0, 1.0)), 
                   random(id + vec2(1.0, 1.0)), u.x), 
               u.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    // Adicionar ruído para modificar a amplitude da distorção
    float noiseFactor = noise(st * freq);

    // Aplicar distorção sinoidal nas coordenadas
    float xDistortion = (amp + noiseFactor) * sin(st.y * freq + u_time);
    float yDistortion = (amp + noiseFactor) * sin(st.x * freq + u_time);

    st.x += xDistortion;
    st.y += yDistortion;

    // Pegar a cor da textura com as coordenadas distorcidas
    vec4 color = texture2D(u_image, st);

    gl_FragColor = color;
}



`

function floNfaRandom(){
  return (nfaRandom(0, 1000))/1000;
}
function rnd_btw(min, max) {
  return floNfaRandom() * (max - min) + min;
}

function selectRandomElement(array) {
  if (!array.length) {
    throw new Error("Array is empty");
  }
  const index = nfaRandom(Math.random() * array.length);
  return array[index];
}

function rnd_int(inicial, final) {
  return parseInt(nfaRandom(inicial, final));
}

let decisions = [];
let cnv = {
  width: 1500,
  height: 1500,
}

let espacamento = cnv.width * (rnd_btw(0.9,5)/100);
let blockCnv, lutCanvas, lutShader, textura1, textura2, textura3, textura4, cgVacio, stripeCanvas,gCnv,distortShader, distortCnv,strokeCnv;
let paleta1 = ["#ed3441", "#ffb03b", "#36acf5", "#ffd630", "#084e86"];
//let palette = ['#053043', '#F37247', '#FDAF3A']

function setup() {
  createCanvas(cnv.width, cnv.height);

  blockCnv = createGraphics(cnv.width, cnv.height);
  strokeCnv = createGraphics(cnv.width, cnv.height);
  gCnv = createGraphics(cnv.width, cnv.height);
  stripeCanvas = createGraphics(cnv.width, cnv.height);
  lutCanvas = createGraphics(width, height, WEBGL);
  distortCnv = createGraphics(cnv.width, cnv.height, WEBGL);
  lutShader = lutCanvas.createShader(vertLut, fragLut);
  distortShader = distortCnv.createShader(vertLut, distortFrag);

  textura1 = createGraphics(cnv.width, cnv.height);
  textura2 = createGraphics(cnv.width, cnv.height);
  textura3 = createGraphics(cnv.width, cnv.height);
  textura4 = createGraphics(cnv.width, cnv.height);
  cgVacio = createGraphics(cnv.width, cnv.height);

  textura1.background(paleta1[0]);
  textura2.background(paleta1[1]);
  textura3.background(paleta1[3]);
  textura4.background(paleta1[4]);
  cgVacio.background("#000");


  drawRandom(textura1,0,0,width,height)
  drawRandom(textura2,0,0,width,height)
  drawRandom(textura3,0,0,width,height)
  drawRandom(textura4,0,0,width,height)

  
  noLoop();   
}

function draw() {
    console.log(espacamento)
    background(255);
    repeatVertical(blockCnv,espacamento, espacamento, cnv.height - espacamento*2 , cnv.width - espacamento*2,false);
    drawStripes(stripeCanvas, min(cnv.width, cnv.height)*random(0.25, 0.5));
    repeatVertical(strokeCnv, espacamento, espacamento, cnv.height - espacamento * 2, cnv.width - espacamento * 2, true);

    distortCnv.shader(distortShader);
    distortShader.setUniform('u_resolution', [width, height]);
    distortShader.setUniform('u_time', millis() / 1000.0);
    distortShader.setUniform('freq', rnd_int(1,7));  // Ajuste conforme necessário
    distortShader.setUniform('amp', 0.05);   // Ajuste conforme necessário
    distortShader.setUniform('u_image', stripeCanvas); // Passar a imagem para o shader
    distortShader.setUniform('randseed', rnd_int(0,99999));
    distortCnv.rect(0, 0, width, height);

    gCnv.clear();  
    gCnv.fill(255);
    //gCnv.rect(espacamento, espacamento, cnv.width - espacamento*2, cnv.height - espacamento*2);
   
   
    //gCnv.blendMode(DARKEST);
    gCnv.image(blockCnv, 0, 0);
    gCnv.image(distortCnv, espacamento, espacamento, cnv.width - espacamento*2, cnv.height - espacamento*2);
    // image(blockCnv, 0, 0);


    lutCanvas.shader(lutShader);
    lutShader.setUniform('uImage', gCnv);
    lutShader.setUniform('uText1', textura1);
    lutShader.setUniform('uText2', textura2);
    lutShader.setUniform('uText3', textura3);
    lutShader.setUniform('uText4', textura4);
    lutShader.setUniform('uTextVacio', cgVacio);

    lutCanvas.rect(0, 0, width, height);
    
     //image(blockCnv, 0, 0);
    image(lutCanvas, 0, 0);
    granulate(12);
    // image(strokeCnv, 0, 0);
   // image(gCnv, 0, 0);

    //image(distortCnv, 0, 0);
    //image(stripeCanvas, 0, 0);
  
  // Tell the NFA system to finish the NFT generation with it's traits
  nfaFinish([
    {
      trait_type: "Palette",
      value: pal_name,
    },
  ]);


}
function repeatVertical(g, x, y, width, height, onlyStroke) {
  g.push();
  g.translate(x, y);
  g.noFill(); // Não preencher por padrão
  if (!onlyStroke) {
    g.noStroke(); // Não ter contorno se não for onlyStroke
  } else {
    g.stroke(0); // Cor do contorno se for onlyStroke
    g.strokeWeight(5); // Espessura do contorno
  }
  
  let currentHeight = 0;
  while (currentHeight < height) {
    const size = rnd_int(0.15 * height, 0.65 * height) - 1;
    const remainingHeight = height - currentHeight;
    const blockHeight = Math.min(remainingHeight, size);
    createSubdividedRectangles(g, 0, currentHeight, width, blockHeight, onlyStroke);
    currentHeight += size;
  }

  g.pop();
}


function createSubdividedRectangles(g, px, py, sizx, sizy,onlyStroke) {
  const sizes = [0.125, 0.25, 0.375, 0.5, 0.675, 0.75];
  let x = px;
  let widthLeft = sizx;

  while (widthLeft > 0) {
    let width = g.random(sizes) * sizx;
    width = Math.min(width, widthLeft);

    pushSubdivide(g, x, py, width, sizy,onlyStroke);

    x += width;
    widthLeft -= width;
  }
}

function pushSubdivide(g, x, y, width, height,onlyStroke) {
  g.push();
  g.translate(x, y);

  let isVertical = g.random() < 0.5;
  const split = isVertical ? width / 2 : height / 2;

  for (let i = 0; i < 2; i++) {
    if (!onlyStroke) {
      g.fill(rnd_btw(0, 255), 255); // Usar fill se não for onlyStroke
    }
    else{
      g.noFill();
      g.stroke(0);
    }
    
    if (isVertical) {
      g.rect(i * split, 0, (i === 0 ? split : width - split), height);
    } else {
      g.rect(0, i * split, width, (i === 0 ? split : height - split));
    }
  }

  g.pop();
}

function drawStripes(g, stripeSize) {
  g.push();
  g.noStroke()
  
  // Determinar a orientação das listras
  const orientation = ['vertical', 'horizontal'][Math.floor(g.random(2))];

  if (orientation === 'vertical') {
    for (let x = 0; x < g.width; x += stripeSize) {
      g.fill(rnd_btw(0, 255),60);
      g.rect(x, 0, stripeSize, g.height);
    }
  } else if (orientation === 'horizontal') {
    for (let y = 0; y < g.height; y += stripeSize) {
      g.fill(rnd_btw(0, 255),60);
      g.rect(0, y, g.width, stripeSize);
    }
  }

  g.pop();
}

function drawRandom(cg, px, py, sizx, sizy) {
  cg.push();
  cg.translate(px, py);
  cg.noStroke();
  let minsiz = Math.min(sizx, sizy);
  cg.drawingContext.filter = 'blur(75px)';

  // Escolhe duas cores aleatórias da paleta
  let color1 = random(palette);
  let color2 = random(palette);
  while (color2 === color1) { // Garante que as duas cores sejam diferentes
    color2 = random(palette);
  }

  for (let i = 0; i < 750; i++) {
    // Alterna aleatoriamente entre as duas cores
    cg.fill(random([color1, color2]));
    cg.rect(random(0, sizx), random(0, sizy), random(minsiz * 0.15, minsiz * 0.35));
  }

  cg.pop();
}

function granulate(gA) {
  loadPixels();
  let d = pixelDensity();
  let halfImage = 4 * (width * d) * (height * d);
  for (let i = 0; i < halfImage; i += 4) {
    grainAmount = random(-gA, gA);
    pixels[i] = pixels[i] + gA;
    pixels[i + 1] = pixels[i + 1] + grainAmount;
    pixels[i + 2] = pixels[i + 2] + grainAmount;
    pixels[i + 3] = pixels[i + 3] + grainAmount;
  }
  updatePixels();
}

function keyPressed() {
  if (key == "s") {
    saveCanvas("output", "png");
  }
}