// This component is dedicated to show the sellers added products only
import React, { SetStateAction, useEffect, useState } from "react";
import Icons from "../Common/Icons";
import MarketPlaceNav from "../NavBar/MarketPlaceNav.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading.tsx";
import AddProduct from "./AddProduct.tsx";
import Notification from "../Notification/Notification.tsx";
import { SetGlobalRefresh } from "../Redux/ProductsSlicer.ts";
import { useDispatch, useSelector } from "react-redux";
import { storeDispatch, storeState } from "../Redux/store.ts";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [message, setMessage] = useState<string>();
  const [refresh, setRefresh] = useState<boolean>(false);

  const shopName = "New Lanka PVT(LTD)";
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/api/auth/seller/allproducts/${shopName}`
        );
        if (res.status === 200) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setMessage(undefined);
          setProducts(res.data.allProducts);
          setLoading(false);
        }
      } catch (error) {
        alert(error);
      }
    };
    getAllProducts();
  }, [refresh]);

  useEffect(() => {
    if (editing === null) {
      window.scrollTo({ behavior: "smooth", top: 0 });
    }
  }, [editing]);
  return (
    <div className="">
      {editing ? (
        <AddProduct
          editing={editing}
          setEditing={setEditing}
          setRefresh={setRefresh}
        />
      ) : (
        <>
          {loading ? (
            <div className="">
              <Loading borderNone={false} label={"Getting Products..."} />
            </div>
          ) : (
            <Card
              filteredData={products}
              setEditing={setEditing}
              setMessage={setMessage}
            />
          )}
        </>
      )}
    </div>
  );
};
interface Product {
  _id: string;
  category: string;
  productName: string;
  quantityLabel: string;
  price: number;
  image: string | undefined;
  rating: number;
  location: string;
  description: string;
  manuf_date: string;
  expd_date: string;
  shopName: string;
}
interface params {
  filteredData: Product[];
  setEditing: React.Dispatch<React.SetStateAction<Product | null>>;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const handleAddTocart = (product: Product) => {
  alert(JSON.stringify(product));
};

const Card: React.FC<params> = ({ filteredData, setEditing, setMessage }) => {
  const globalRefresh = useSelector(
    (store: storeState) => store.products.refresh
  );
  const navigate = useNavigate();

  const dispatch = useDispatch<storeDispatch>();

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/auth/seller/deleteproduct/${id}`
      );

      if (res.status === 200) {
        setMessage(res.data.message);
        dispatch(SetGlobalRefresh(!globalRefresh));
      }
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <div className="z-0">
      <div className="border-b border-gray-200 mt-2 mb-3"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-8 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5">
        {filteredData && filteredData.length > 0 ? (
          filteredData?.map((p, i) => (
            <div key={i} className="border p-2 border-gray-300 rounded-sm">
              {/* <div className="relative group  border border-gray-200"> */}
              <div className="invisible group-hover:visible font-type absolute px-4 py-1">
                <p className="bg-white">Click Here See Full Description</p>
              </div>
              <div className="relative">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={`${p.image}`}
                    onClick={() => navigate(`/product/${p._id}`)}
                    className="hover:cursor-pointer transition-all w-[150px] h-[120px]  rounded-sm"
                    style={{
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></img>
                  <div className="flex flex-col items-start p-2">
                    <h1 className="text-2xl font-type">{p.productName}</h1>
                    <p className="text-type text-sm">{p.description}</p>

                    {/* Rating Visuals */}
                    <div className="text-2xl font-type">
                      Rs.{" "}
                      {p.price >= 999
                        ? String(p.price).slice(0, 1) +
                          "," +
                          String(p.price).slice(1, String(p.price).length)
                        : p.price}
                    </div>
                    <div className="flex justify-start items-start py-1">
                      {[...Array(p.rating)].map((_, i) => (
                        <Icons key={i} name="star-solid" />
                      ))}
                      {[...Array(5 - p.rating)].map((_, i) => (
                        <Icons key={i} name="star-outline" />
                      ))}
                    </div>
                    <div className="flex justify-start items-start py-1 gap-2">
                      <div>
                        <button
                          className={`text-white bg-blue-500 p-1 rounded-sm w-auto text-center hover:cursor-pointer hover:bg-[rgb(185,196,31)]`}
                          onClick={() => setEditing(p)}
                        >
                          <Icons name={"edit"} />
                        </button>
                      </div>
                      <div>
                        <button
                          className={`text-white bg-red-500 p-1 rounded-sm w-auto text-center hover:cursor-pointer hover:bg-[rgb(185,196,31)]`}
                          onClick={() => handleDeleteProduct(p._id)}
                        >
                          <Icons name={"delete"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="">
            <div className="relative flex text-center">
              <div className="flex flex-col">
                <p className="font-type">
                  Currently You have no active Products
                </p>
                <button
                  disabled={false}
                  className="p-3 bg-green-600 text-white font-bold font-type hover:cursor-pointer hover:scale-110 transition-all"
                  onClick={() => navigate("/add-product")}
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Products;
