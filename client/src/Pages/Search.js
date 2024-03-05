import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
             <div className="card m-2" style={{ width: "17rem", height: "25rem" }} key={p._id}>
             <img style={{ width: "15rem", maxHeight: "23rem", minHeight: "12rem", alignContent: "center", marginLeft: "1rem", marginTop: "1rem" }}
               src={`/api/v1/product/product-photo/${p._id}`}
               className="card-img-top"
               alt={p.name}
             />
             <div className="card-body">
               <h5 className="card-title">{p.name}</h5>
               <p className="card-text">{p.description.substring(0, 20)}...</p>
               <p className="card-text">₹{p.price}</p>
               <button className='btn btn-primary ms-1'>More Details</button>
               <button className='btn btn-secondary ms-2'>Add to Cart</button>
             </div>
           </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;