import { useEffect } from "react";

// Replace with your actual Meta Pixel ID
const META_PIXEL_ID = "REPLACE_WITH_YOUR_PIXEL_ID";

const MetaPixel = () => {
  useEffect(() => {
    if (META_PIXEL_ID === "REPLACE_WITH_YOUR_PIXEL_ID") return;

    const consent = localStorage.getItem("cookie_consent");

    // Initialize Meta Pixel
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      
      fbq('consent', '${consent === "accepted" ? "grant" : "revoke"}');
      fbq('init', '${META_PIXEL_ID}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);

    // Add noscript pixel
    const noscript = document.createElement("noscript");
    const img = document.createElement("img");
    img.height = 1;
    img.width = 1;
    img.style.display = "none";
    img.src = `https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.body.appendChild(noscript);

    return () => {
      script.remove();
      noscript.remove();
    };
  }, []);

  return null;
};

export default MetaPixel;
