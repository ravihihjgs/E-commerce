import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet"

import  { Toaster } from 'react-hot-toast';

const Layout = ({children,title, description, keywords, author}) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />

        {children}
      </main>
      <Footer />

    </>
  );
};

Layout.defaultProps={
  title:'Artifuldtitches-Shop now',
  description:"Hand Made Jwellery Products",
  keywords:'Bracelet Earring Pandent',
  author:'Ravi Ranjan kumar',
}

export default Layout
