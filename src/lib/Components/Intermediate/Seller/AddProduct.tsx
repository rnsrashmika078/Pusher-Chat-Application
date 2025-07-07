import React, { SetStateAction, useEffect, useRef, useState } from "react";
import MarketPlaceNav from "../NavBar/MarketPlaceNav";
import ImageUpload from "../ImageUpload/ImageUpload";
import axios from "axios";
import Loading from "../Loading/Loading";
import Notification from "../Notification/Notification";
import { edit } from "@cloudinary/url-gen/actions/animated";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../Redux/NotifySlicer";
import { useDispatch, useSelector } from "react-redux";
import Icons from "../Common/Icons";
import { storeState } from "../Redux/store";
import HeaderPlate from "../Common/HeaderPlate";

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
  isOpen: boolean;
}
const AddProduct: React.FC<params> = ({
  editing,
  setEditing,
  setRefresh,
  isOpen,
}) => {
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

  const [section, setSection] = useState<number>(1);
  return (
    <div className={``}>
      {loading && (
        <div className="z-1000 fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <Loading borderNone={true} label={"Adding Product..."} />
        </div>
      )}
      <div className="w-full" ref={currentRef}>
        <div className={`${editing ? "flex ml-10  mt-5" : ""}`}>
          {editing && <Icons name={"next"} />}
          <h1
            className={`${
              editing ? "ml-2 " : ""
            } fade-in uppercase text-green-600 text-2xl font-type font-bold`}
          ></h1>
        </div>

        <div className="py-2 mb-5  border-b border-gray-200"></div>
        <div className="h-auto md:h-[500px] lg:h-[500px] xl:h-[500px] w-full overflow-y-auto scrollbar-hidden">
          {/* Section 1 - Produt Image Upload  */}
          {section === 1 && (
            <section>
              <p className="font-type font-bold mb-5">Product Images</p>
              <div className="flex flex-col justify-center items-start font-type mt-5 mb-5">
                {/* <p className="font-type font-bold mb-5">Important</p>  */}
                <p>✅ Upload clear and high-quality images of your product.</p>
                <p>✅ Accepted formats: JPG, PNG. Max size: 5MB per image.</p>
                <p>
                  ✅ Add multiple images option will available soon to give
                  buyers a better view.
                </p>
                <p>✅ Make sure the images represent the actual product.</p>
              </div>
              <div
                className={`${
                  isOpen
                    ? "grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-4 xl:grid-cols-5"
                    : "grid grid-cols-2  sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-3"
                }`}
              >
                <ImageUpload
                  placeholder="Upload Main Product Image"
                  setImageURL={setImageURL}
                  Pending={pending}
                  editing={editing}
                  image={editing ? editing.image : undefined}
                />
                <ImageUpload
                  placeholder="Upload Second Product Image"
                  setImageURL={setImageURL}
                  Pending={pending}
                  editing={editing}
                  image={editing ? editing.image : undefined}
                />
                <ImageUpload
                  placeholder="Upload Third Product Image"
                  setImageURL={setImageURL}
                  Pending={pending}
                  editing={editing}
                  image={editing ? editing.image : undefined}
                />
                <ImageUpload
                  placeholder="Upload Fourth Product Image"
                  setImageURL={setImageURL}
                  Pending={pending}
                  editing={editing}
                  image={editing ? editing.image : undefined}
                />
                <ImageUpload
                  placeholder="Upload Optional Product Image"
                  setImageURL={setImageURL}
                  Pending={pending}
                  editing={editing}
                  image={editing ? editing.image : undefined}
                />
              </div>
            </section>
          )}
          {/* Section 1 ends here - Produt Image Upload  */}
          {/* <div className="py-2 mb-5  border-b border-gray-200"></div> */}

          <div className="mb-5  border-gray-200 w-1/2"></div>
          {/* Section 2 - Produt Details   */}
          {section === 2 && (
            <section>
              <p className="font-type font-bold mb-5">Product Details</p>
              <div className="grid grid-cols-1 gap-5 text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm">
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
            </section>
          )}
          {/* Section 2 ends here - Produt Details   */}

          {/* Section 4 Payment Methods */}
          {section === 4 && (
            <section>
              <p className="font-type font-bold mb-5">Payment Methods</p>
              <div className="font-type">
                <p>✅ Payment options are set based on your store settings.</p>
                <p>
                  ✅ If you want to change payment methods (e.g., Cash on
                  Delivery, Card, Bank Transfer), please update them in your
                  store settings.
                </p>
                <p>✅ All changes may require admin approval.</p>
                <p>
                  ✅ Once approved, new payment options will be available to
                  customers.
                </p>
              </div>
            </section>
          )}
          {/* Section 4 ends here - Payment Methods   */}

          {/* Section 3 Delievery Options */}
          {section === 3 && (
            <section>
              <div className="font-type">
                <p className="font-type font-bold mb-5">Delivery Options</p>
                <p>
                  ✅ Delivery options are based on the store details you
                  provided when creating your store.
                </p>
                <p>
                  ✅ If any changes are needed, please revisit your store and
                  update the delivery options.
                </p>
                <p>✅ Changes may require admin approval.</p>
                <p>✅ Once approved, your changes will appear immediately.</p>
              </div>
            </section>
          )}
          {/* Section 3 ends here - Delievery Options    */}

          {/* Section 5 Product Preview */}
          {section === 5 && (
            <section>
              <p className="font-type font-bold mb-5">Product Preview</p>
              <ProductReview product={productData} />
              <div>{productData.productName}</div>
            </section>
          )}
          {/* Section 3 ends here - Delievery Options    */}
        </div>
        <div className="py-2 mb-5  border-b border-gray-200"></div>
        <div className="flex justify-between px-4">
          <button
            disabled={section === 1}
            className={`p-2 font-type text-black rounded-sm hadow-2xl border border-gray-400  ${
              section === 1
                ? "bg-gray-50 text-gray-400 "
                : "bg-gray-200  hover:scale-105 transition-all hover:cursor-pointer"
            }`}
            onClick={() =>
              setSection((prev) => {
                if (prev > 1) {
                  return prev - 1;
                }
                return 1;
              })
            }
          >
            Previous
          </button>
          <div>{section}</div>
          <button
            disabled={section === 5}
            className={`p-2 font-type text-black rounded-sm hadow-2xl border border-gray-400  ${
              section === 5
                ? "bg-gray-50 text-gray-400 "
                : "bg-gray-200  hover:scale-105 transition-all hover:cursor-pointer"
            }`}
            onClick={() =>
              setSection((prev) => {
                if (prev < 5) {
                  return prev + 1;
                }
                return 1;
              })
            }
          >
            Next
          </button>
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
      </div>
    </div>
  );
};

export default AddProduct;

const ProductReview: React.FC<{ product: Product }> = (prop) => {
  const userData = useSelector((store: storeState) => store.user.user);
  return (
    <div className=" bg-white">
      <div className=" bg-white shadow-2xl border border-gray-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mx-0 sm:mx-0 md:mx-25 lg:mx-60 xl:mx-20">
        <div
          className="flex flex-col justify-start items-center p-5"
          // onClick={() => setToggleImageView((prev) => !prev)}
        >
          {false ? (
            <div className="transition-all z-900 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark w-full h-full bg-black ">
              <img src={localStorage.getItem("url")!}></img>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <img
                src={localStorage.getItem("url")!}
                className="border-2 border-gray-400 h-[250px]"
              ></img>
              <div className="grid grid-cols-4 sm:grid-cols-4  md:grid-cols-4  lg: xl:  gap-2 justify-center place-items-center items-center">
                <img
                  src={localStorage.getItem("url")!}
                  className="border-2 border-gray-400 h-[50px]"
                ></img>
                <img
                  src={localStorage.getItem("url")!}
                  className="border-2 border-gray-400 h-[50px]"
                ></img>
                <img
                  src={localStorage.getItem("url")!}
                  className="border-2 border-gray-400 h-[50px]"
                ></img>
                <img
                  src={localStorage.getItem("url")!}
                  className="border-2 border-gray-400 h-[50px]"
                ></img>
              </div>
            </div>
          )}
        </div>

        <div className="p-5">
          <h1 className="font-type flex justify-start text-sm text-gray-500 my-2">
            Product Description
          </h1>

          <h1 className="font-type flex justify-start text-2xl">
            {prop.product?.productName}
          </h1>
          <p className="font-display flex justify-start text-sm">
            {prop.product?.description}
          </p>
          <div className=" flex justify-start text-sm items-center ">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="hover:fill-amber-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`transition-all size-6 text-yellow-500 ${
                    i < (prop.product?.rating || 0)
                      ? "fill-yellow-500"
                      : "fill-transparent"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              </div>
            ))}
          </div>
          <div className="border-gray-200 border-b-2"></div>
          <div className="py-5 -mb-4">
            {/* <h1 className="font-type flex justify-start text-3xl text-orange-500">
              Rs. {modifiedPrice}
            </h1> */}
          </div>
          <div className="">
            <h1 className="flex font-type  justify-start text-xs">
              <span className="w-22 font-bold">Harvest Date: </span>
              {prop.product?.manuf_date}
            </h1>
          </div>
          <div className="">
            <h1 className="flex font-type  justify-start text-xs">
              <span className="w-22 font-bold">Expire Date:</span>{" "}
              {prop.product?.expd_date}
            </h1>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="font-type flex justify-start text-sm text-gray-500">
              Product Location
            </h1>
            <p className="ml-2 font-display flex justify-start text-sm items-center">
              <Icons name={"location"} />{" "}
              <span className="mx-2 text-display text-[16px]">
                {prop.product?.location}
              </span>
            </p>
            <h1 className="font-type flex justify-start text-sm text-gray-500">
              Delivery Option
            </h1>
            <p className="ml-2 font-display flex justify-start text-sm items-center ">
              <Icons name={"cash"} />{" "}
              <span className="mx-2 text-display text-[16px]">
                Cash on Delivery
              </span>
            </p>
            <div className="flex flex-col ">
              <h1 className="font-type flex justify-start text-sm text-gray-500">
                Sold by
              </h1>
              <div className="flex">
                <p className="ml-2 font-display flex justify-start text-sm items-center">
                  <Icons name={"warehouse"} />{" "}
                  <span className="mx-2 text-display text-[16px]">
                    {/* {userData?.shopName} */}
                  </span>
                </p>
                <button
                  className={`p-3 
               bg-red-600
              text-white font-bold font-type hover:cursor-pointer hover:scale-110 transition-all`}
                >
                  {"Chat"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
