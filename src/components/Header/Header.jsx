import React, { useState,useEffect,useMemo } from "react";
import "./Header.css";
import { FcSearch } from "react-icons/fc";
import { Autocomplete } from "@react-google-maps/api";
import { Typography, Box } from "@mui/material";
import { SiYourtraveldottv } from "react-icons/si";
import { BsFillHeartFill } from "react-icons/bs";
import { InputBase } from "@mui/material";
import { Link } from "react-router-dom";
import { fetchCartData } from "../../services/operations/likeApi";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProfileDown from "../ProfileDown/ProfileDown";

const Header = ({ setcoordinating }) => {
  // importing reducers

  const { tokenpara } = useSelector((state) => state.auth);
// YHI CHIJ MAINE CART.JS MAI KRI HAI 
  const [likecart, setlikecart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0); 

  
    // here mai axios.get and .fetch isliye nhi use kr rhe because vo hm function mai kr ke aye hia apiservice mai 
    const datacartfetch =async()=>{
      try{
          const response = await fetchCartData(tokenpara)
          setlikecart(response)
          setCartItemCount(response.length);
          console.log(response)
      }
      catch(error)
      {
        console.error('Error fetching cart data:', error);
      }
    }

    useEffect(() => {
      datacartfetch()
    }, [cartItemCount])


  console.log("tokenpara ehich is token at header", tokenpara);
  
  const {likeElemets} = useSelector((state) => state.like);

  const [Autocompleting, setAutocomplete] = useState(null);
  const onloading = (autoC) => {
    setAutocomplete(autoC);
  };

  // conditional rendering of Search bar
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";

  const handlePlaceSelected = () => {
    const place = Autocompleting.getPlace();
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setcoordinating({ lat, lng });
    }
  };

  const handleClickSearch = () => {
    // DOM MANUPLATION
    let inputElement = document.getElementById("input");
    if (inputElement) {
      inputElement.click();
    }
  };

  // const memoizedCartItemCount = useMemo(() => likecart.length, [likecart.length]);

  return (
    <>
      <div className="bg-newpink h-14 ">
        <div className="flex justify-between w-11/12 max-w-maxContent items-center m-auto  p-2 drop-shadow-2xl ">
          <Link to="/">
            <Box className="flex items-center gap-x-2 ml-6">
              <SiYourtraveldottv style={{ fontSize: "40px", color: "white" }} />
              <Typography
                className="typo"
                style={{ color: "white" }}
                fontSize={"20px"}
              >
                Nomad_Trakker
              </Typography>
            </Box>
          </Link>
          {/* flex mtlb ek hi row mai krdo flex column ek ke niche ek */}

          {isHomeRoute && (
            <div className="search ">
              <label htmlFor="input" onClick={handleClickSearch}>
                <FcSearch style={{ cursor: "pointer", fontSize: "30px" }} />
              </label>
              <Autocomplete
                onLoad={onloading}
                onPlaceChanged={handlePlaceSelected}
              >
                <InputBase
                  className="inputBase"
                  placeholder="Search......"
                  style={{ color: "black" }}
                  id="input"
                />
              </Autocomplete>
            </div>
          )}

          {/**********cart /LOGIN/LOGOUT/DELTEBUTTON */}

          <div>
            <ul className="flex items-center gap-x-4 ">
              {tokenpara === null && (
                <li>
                  <Link to="/login">
                    <button className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-md border border-richblack-700">
                      Login
                    </button>
                  </Link>
                </li>
              )}
              {tokenpara === null && (
                <li>
                  <Link to="/signup">
                    <button className="text-richblack-5 bg-richblack-800 py-[8px] px-[12px] rounded-[8px] border border-richblack-700">
                      Signup
                    </button>
                  </Link>
                </li>
              )}
              {tokenpara !== null && (
                <li>
                  <Link to="/dashboard/cart">
                    <div className="relative">
                      <BsFillHeartFill className="text-2xl text-white" />
                      {/* nhi toh 0 bhi show hoga */}
                      {cartItemCount> 0 && (
                        <span  className="absolute -top-1 -right-2 bg-red-500 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white" >
                          {cartItemCount}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              )}
              {tokenpara !== null && (
                <div className="flex items-center">
                  <ProfileDown />
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

// const [inputValue, setInputValue] = useState('');
// const [selectedPlace, setSelectedPlace] = useState('');
// const{setlogin}=useContext(GlobalContext)
