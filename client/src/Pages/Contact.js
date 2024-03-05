import React from 'react'
import Layout from '../components/Layout/Layout'
import { BiLogoGmail, BiSolidPhoneCall, BiLogoInstagramAlt } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us-Artifulstitches"}>
      <div className="row contactUs ">
        <div className="col-md-6 ">
          <img
            src="/images/image1.jpg"
            alt="contactus"
            style={{ width: "86%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2 ">
            Any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3 ">
            <BiLogoGmail /> : artifulstitches@gmail.com
          </p>
          <p className="mt-3">
            <BiSolidPhoneCall /> : 6284515046
          </p>
          <p className="mt-3">
            <BiLogoInstagramAlt /> : @artifulstitches
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
