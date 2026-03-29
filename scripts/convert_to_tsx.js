const fs = require('fs');
const path = require('path');

function convertHtmlToJsx(html) {
  let jsx = html;
  
  // HTML Comments -> JSX Comments
  jsx = jsx.replace(/<!--(.*?)-->/gs, '{/*$1*/}');
  
  // class to className
  jsx = jsx.replace(/class="/g, 'className="');
  
  // SVG attributes
  jsx = jsx.replace(/stroke-width="/g, 'strokeWidth="');
  jsx = jsx.replace(/stroke-linecap="/g, 'strokeLinecap="');
  jsx = jsx.replace(/stroke-linejoin="/g, 'strokeLinejoin="');
  jsx = jsx.replace(/stroke-miterlimit="/g, 'strokeMiterlimit="');
  jsx = jsx.replace(/fill-rule="/g, 'fillRule="');
  jsx = jsx.replace(/clip-rule="/g, 'clipRule="');
  jsx = jsx.replace(/viewbox="/g, 'viewBox="');
  jsx = jsx.replace(/patternunits="/g, 'patternUnits="');
  jsx = jsx.replace(/preserveaspectratio="/g, 'preserveAspectRatio="');
  
  // Inline styles
  // Handles style="font-variation-settings: 'FILL' 1;"
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
    // Basic parser for specific style seen in Stitch
    if (styleString.includes('font-variation-settings')) {
        let val = styleString.substring(styleString.indexOf(':') + 1).trim();
        if (val.endsWith(';')) val = val.slice(0, -1);
        return `style={{ fontVariationSettings: "${val.replace(/'/g, "\\'")}" }}`;
    }
    return match; // fallback
  });

  // Self closing tags format
  jsx = jsx.replace(/<img(.*?)>/g, (match, content) => {
      // Avoid breaking if it's already self closed somehow
      if(content.trim().endsWith('/')) return match; 
      return `<img${content}/>`;
  });
  jsx = jsx.replace(/<input(.*?)>/g, (match, content) => {
      if(content.trim().endsWith('/')) return match; 
      return `<input${content}/>`;
  });
  jsx = jsx.replace(/<br>/g, '<br/>');

  return jsx;
}

function processPage(name, sourceFile, destFile) {
  const fullHtml = fs.readFileSync(path.join('stitch_designs', sourceFile), 'utf8');
  let navEnd = fullHtml.indexOf('</nav>');
  let footerStart = fullHtml.indexOf('<footer');
  
  if (navEnd !== -1 && footerStart !== -1) {
    let mainContent = fullHtml.substring(navEnd + 6, footerStart).trim();
    let jsxContent = convertHtmlToJsx(mainContent);
    
    // Some html from stitch starts with <main> or has a wrapper, in Home its section
    const componentCode = `export default function ${name}() {\n  return (\n    <main>\n      ${jsxContent}\n    </main>\n  );\n}\n`;
    
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.writeFileSync(destFile, componentCode);
    console.log(`Processed ${name}`);
  }
}

function processLayout() {
   const homeHtml = fs.readFileSync(path.join('stitch_designs', 'home.html'), 'utf8');
   
   // Extract Navbar
   let navStart = homeHtml.indexOf('<nav');
   let navEndPos = homeHtml.indexOf('</nav>') + 6;
   let navHtml = homeHtml.substring(navStart, navEndPos);
   
   // Extract Footer
   let footerStart = homeHtml.indexOf('<footer');
   let footerEndPos = homeHtml.indexOf('</footer>') + 9;
   let footerHtml = homeHtml.substring(footerStart, footerEndPos);
   
   const navJsx = convertHtmlToJsx(navHtml);
   const footerJsx = convertHtmlToJsx(footerHtml);
   
   fs.writeFileSync('src/components/Navbar.tsx', `export default function Navbar() {\n  return (\n    ${navJsx}\n  );\n}\n`);
   fs.writeFileSync('src/components/Footer.tsx', `export default function Footer() {\n  return (\n    ${footerJsx}\n  );\n}\n`);
   console.log('Processed Layout Components');
}

// Convert all pages
processPage('HomePage', 'home.html', 'src/app/page.tsx');
processPage('CoursesPage', 'courses.html', 'src/app/courses/page.tsx');
processPage('AboutPage', 'about.html', 'src/app/about/page.tsx');
processPage('BlogPage', 'blog.html', 'src/app/blog/page.tsx');
processPage('ContactPage', 'contact.html', 'src/app/contact/page.tsx');

// Process Navbar and footer using the ones from home.html
processLayout();
