import React, { SetStateAction, useEffect, useRef, useState } from "react";
import MarketPlaceNav from "../NavBar/MarketPlaceNav";
import ImageUpload from "../ImageUpload/ImageUpload";
import axios from "axios";
import Loading from "../Loading/Loading";
import Notification from "../Notification/Notification";
import { edit } from "@cloudinary/url-gen/actions/animated";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../Redux/NotifySlicer";
import { useDispatch } from "react-redux";

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
  editing: Product;
  setEditing: React.Dispatch<React.SetStateAction<Product | null>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddProduct: React.FC<params> = ({ editing, setEditing, setRefresh }) => {
  const [imageURL, setImageURL] = useState<string>();
  const [pending, setPending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>("");

  const dispatch = useDispatch();
  const [productData, setProductData] = useState<Product>({
    _id: "",
    category: "",
    productName: "",
    quantityLabel: "",
    price: 0,
    image: "",
    rating: 0,
    location: "",
    description: "",
    manuf_date: "",
    expd_date: "",
    shopName: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setErrors("");
    const { value, name } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const currentRef = useRef<HTMLDivElement>(null);

  const scrollTo = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleAddProduct = async () => {
    setErrors("");
    if (!productData.category) {
      setErrors("Category is required.");
      scrollTo();
      return;
    }
    if (!productData.productName) {
      setErrors("Product name is required.");
      scrollTo();
      return;
    }
    if (!productData.quantityLabel) {
      setErrors("Quantity label is required.");
      scrollTo();
      return;
    }
    if (!productData.price || productData.price <= 0) {
      setErrors("Price must be greater than 0.");
      scrollTo();
      return;
    }
    if (!productData.location) {
      setErrors("Location is required.");
      scrollTo();
      return;
    }
    if (!productData.description) {
      setErrors("Description is required.");
      scrollTo();
      return;
    }
    if (!productData.manuf_date) {
      setErrors("Manufactured date is required.");
      scrollTo();
      return;
    }
    if (!productData.expd_date) {
      setErrors("Expired date is required.");
      scrollTo();
      return;
    }
    if (!imageURL) {
      if (!productData.image) {
        setErrors("Product image is required.");
        scrollTo();
        return;
      }
    }

    if (!imageURL) {
      if (!productData.image) {
        return;
      }
    }
    if (imageURL || productData.image) {
      setPending(false);

      const finalData = {
        ...productData,
        image: imageURL,
        shopName: "New Lanka PVT(LTD)",
      };
      setProductData(finalData);
      try {
        setLoading(true);
        const url = editing
          ? `http://localhost:3000/api/auth/seller/updateproduct/${editing._id}`
          : `http://localhost:3000/api/auth/seller/addproduct`;
        const res = await axios.post(url, finalData);
        if (res.status === 200) {
          dispatch(
            setNotification({
              message: "Product Added successfully!",
              type: "success",
            })
          );
          setLoading(false);
          setSuccess(true);
          setRefresh((prev) => !prev);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setEditing(null);
        }
      } catch (error) {
        // alert(error);
      }
    }
  };

  useEffect(() => {
    if (editing) {
      setProductData(editing);
    }
  }, []);
  useEffect(() => {
    const time = setTimeout(() => {
      setSuccess(false);
    }, 5000);

    return () => clearTimeout(time);
  }, []);

  return (
    <div className={`bg-gray-100`}>
      {/* {success && (
        <div className="z-900 fixed top-25 -translate-x-1/2 -right-25">
          <Notification
            message={"New Product Added!"}
            handleClose={setSuccess}
          />
        </div>
      )} */}
      {loading && (
        <div className="z-1000 fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <Loading borderNone={true} label={"Adding Product..."} />
        </div>
      )}
      <div>
        <div className="sticky top-0 z-50 bg-white shadow-md">
          <MarketPlaceNav />
        </div>

        <div className="p-5" ref={currentRef}>
          <div className="border p-5 bg-gray-50 border-gray-200 rounded-sm">
            <h1 className="text-start font-type fade-in w-full font-bold  text-[rgb(64,166,55)] text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl">
              {editing ? "Edit Product " : "Add Product"}
            </h1>
            <p className="fade-in text-gray-600 text-sm font-type mt-2">
              🔥 Got fresh goods? Let’s get them listed and sold on FarmerNest!
            </p>

            <div className="py-2 mb-5  border-b border-gray-200"></div>
            <p className="font-type font-bold mb-5">Product Images</p>
            <div>
              <ImageUpload
                setImageURL={setImageURL}
                Pending={pending}
                image={editing ? editing.image : undefined}
              />
            </div>
            <div className="py-2 mb-5  border-b border-gray-200"></div>
            <p className="font-type font-bold">Product Details</p>
            <div className="mb-5  border-gray-200 w-1/2"></div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl: gap-5 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">
              {[
                { label: "Product name", key: "productName" },
                { label: "Price", key: "price" },
                { label: "Product Description", key: "description" },
                { label: "Location", key: "location" },
                { label: "Manufactured Date", key: "manuf_date" },
                { label: "Expired Date", key: "expd_date" },
              ].map((field, i) => (
                <div key={i} className="w-full flex justify-start font-type">
                  <label className="w-50 flex items-center">
                    {field.label}
                  </label>
                  <input
                    type={field.label.includes("Date") ? "date" : "text"}
                    placeholder={field.label}
                    value={productData[field.key]}
                    onChange={(e) => handleOnChange(e)}
                    name={field.key}
                    required
                    className={`pl-5 w-full border border-gray-200 p-2 rounded-2xl`}
                  ></input>
                </div>
              ))}
              <div>
                <select
                  name="quantityLabel"
                  value={productData.quantityLabel}
                  onChange={(e) => handleOnChange(e)}
                  required
                  className={`pl-5 w-full border border-gray-200 p-2 rounded-2xl font-type`}
                >
                  <option value="">Select Quantity Label</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                </select>
              </div>
              <div>
                <select
                  name="category"
                  required
                  value={productData.category}
                  onChange={(e) => handleOnChange(e)}
                  className={`pl-5 w-full border border-gray-200 p-2 rounded-2xl font-type`}
                >
                  <option value="">Select Category</option>
                  <option value="vegitable">Vegitable</option>
                  <option value="fruits">Fruits</option>
                  <option value="diary">Diary</option>
                </select>
              </div>
            </div>

            <div ref={currentRef}>
              {errors && (
                <div className="text-center p-5 mt-5">
                  <p className="font-type text-red-500 font-bold border-2 rounded-2xl w-1/2 m-auto">
                    {errors}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end p-5">
              <button
                className={`p-3 ${
                  imageURL || productData.image ? "bg-green-600" : "bg-gray-300"
                }  text-white font-bold font-type hover:cursor-pointer hover:scale-110 transition-all`}
                disabled={imageURL || productData.image ? false : true}
                onClick={handleAddProduct}
              >
                {editing ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
