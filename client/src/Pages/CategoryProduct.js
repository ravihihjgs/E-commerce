import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../Style/HomePage.css";
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      // console.log(params.slug)
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
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
                  <button className='btn btn-primary ms-1 ' onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className='btn btn-secondary ms-2'>Add to Cart</button>
                     
                    </div>
                  </div>
                
              ))}
            </div>
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;