////zare_nk_050525_okk(1)
import type { NextConfig } from "next";

const nextConfig03: NextConfig = {
  async redirects() {
    return [
      {
        source: "/folder226",        // The path redirect from
        destination: "/folder02",     // The path redirect to
        permanent: true,      // Permanent redirecting
      },
      ////zare_nk_050520_added_st
      {
        source: "/about",        //zare_nk_050520_nokteh(meghdare url ke behesh morajee mishe)
        destination: "/page-not-found",        //zare_nk_050520_nokteh(meghdare url ke az morajee behesh hedayat mishim)  ////zare_nk_050520_nokteh(age 
        //// bejaye /page-not-found meghdare /asghar ya har lafzi ke dar /src/app/ vojood nadarad safheye /not-found namayesh dadeh mishe(vali chon meghdare
        ////  destination dar urle browser namayesh dadeh mishe baraye khanaeiye bishtar az lafze  lafze /page-not-found estefadeh kardam))
        permanent: true,      // Permanent redirecting
      },
      {
        source: "/folder01",        //zare_nk_050520_nokteh(meghdare url ke behesh morajee mishe)
        destination: "/page-not-found",        //zare_nk_050520_nokteh(meghdare url ke az morajee behesh hedayat mishim)  ////zare_nk_050520_nokteh(age 
        //// bejaye /page-not-found meghdare /asghar ya har lafzi ke dar /src/app/ vojood nadarad safheye /not-found namayesh dadeh mishe(vali chon meghdare
        ////  destination dar urle browser namayesh dadeh mishe baraye khanaeiye bishtar az lafze  lafze /page-not-found estefadeh kardam))
        permanent: true,      // Permanent redirecting
      },
      {
        source: "/folder02",        //zare_nk_050520_nokteh(meghdare url ke behesh morajee mishe)
        destination: "/page-not-found",        //zare_nk_050520_nokteh(meghdare url ke az morajee behesh hedayat mishim)  ////zare_nk_050520_nokteh(age 
        //// bejaye /page-not-found meghdare /asghar ya har lafzi ke dar /src/app/ vojood nadarad safheye /not-found namayesh dadeh mishe(vali chon meghdare
        ////  destination dar urle browser namayesh dadeh mishe baraye khanaeiye bishtar az lafze  lafze /page-not-found estefadeh kardam))
        permanent: true,      // Permanent redirecting
      },
      ////zare_nk_050520_added_end
    ];
  },

  images: {
    domains: ['www.w3schools.com', 'www.tutorialspoint.com', 'www.netafraz.com'],
  },
};

export default nextConfig03;