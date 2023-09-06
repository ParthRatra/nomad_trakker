import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Rating,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {RiDeleteBin6Line} from 'react-icons/ri'
// import { Link } from "react-router-dom";
import { remove } from "../../../redux/slices/Likeslice";

const Cartitem = ({ item }) => {
  const dispatch = useDispatch();

  const removefromcart = () => {
    dispatch(remove(item.location_id));
    console.log(dispatch(remove(item.location_id)));
    toast.error("Item removed from Wishlist");
  };

  // yh format hota piche hm bhar vala krke agye hai ab ek div and then card vala
  // <div>
  //   <div>
  //     <card>
  //     </card>
  //   </div>
  // </div>

  return (
    <>
      <div>
        <Card
          elevation={6}
          className="p-2 m-5 "
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardMedia
            style={{ height: "450px", objectFit: "cover" }}
            image={item.photo.images.large.url}
          />
          
          <CardContent>
            <Typography gutterBottom variant="h5">
              {item.name}
            </Typography>
            <div className="media">
              <Rating value={Number(item.rating)} readOnly />
              <Typography gutterBottom variant="subtitle1">
                {" "}
                out of {item.num_reviews} reviews
              </Typography>
            </div>
            <div className="media">
              <Typography variant="subtitle1">Ranking</Typography>
              <Typography gutterBottom variant="subtitle1">
                {item.ranking ? item.ranking.replace(/#/g, "") : ""}
              </Typography>
            </div>
            {item?.cuisine?.map((khana, index) => (
              <Chip
                key={index}
                size="small"
                label={khana.name}
                className="chip"
              />
            ))}
            <div className="address">
              <LocationOnIcon />
              {item?.address}
            </div>
            <div className="address">
              <PhoneIcon />
              {item?.phone}
            </div>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(item.web_url, "_blank")}
            >
              Trip Advisor
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(item.website, "_blank")}
            >
              Website
            </Button>
            <div >
            <button className='flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-2 px-[8px] text-pink-200 text-lg font-medium'
                    onClick={removefromcart}
                    >
                        <RiDeleteBin6Line/>
                        <span></span>
                    </button>
            </div>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default Cartitem;

// {/* <Card */}
// elevation={6}
// className="p-2 m-5 "
// style={{ height: "100%", display: "flex", flexDirection: "column" }}
// >
// <CardMedia
//   style={{ height: "450px", objectFit: "cover" }}
//   image={item.photo.images.large.url}
// />
// <CardContent>
//   <Typography gutterBottom variant="h5">
//     {item.name}
//   </Typography>
//   <div className="media">
//     <Rating value={Number(item.rating)} readOnly />
//     <Typography gutterBottom variant="subtitle1">
//       {" "}
//       out of {item.num_reviews} reviews
//     </Typography>
//   </div>
//   <div className="media">
//     <Typography variant="subtitle1">Ranking</Typography>
//     <Typography gutterBottom variant="subtitle1">
//       {item.ranking ? item.ranking.replace(/#/g, "") : ""}
//     </Typography>
//   </div>
//   {item?.cuisine?.map((khana, index) => (
//     <Chip key={index} size="small" label={khana.name} className="chip" />
//   ))}
//   <div className="address">
//     <LocationOnIcon />
//     {item?.address}
//   </div>
//   <div className="address">
//     <PhoneIcon />
//     {item?.phone}
//   </div>
// </CardContent>
// <CardActions>
//   <Button
//     size="small"
//     color="primary"
//     onClick={() => window.open(item.web_url, "_blank")}
//   >
//     Trip Advisor
//   </Button>
//   <Button
//     size="small"
//     color="primary"
//     onClick={() => window.open(item.website, "_blank")}
//   >
//     Website
//   </Button>
//   <button
//     className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold
//         text-[12px] p-1 px-2  uppercase
//         hover:bg-gray-700 max-w-max
//         hover:bg-gray-700 transition duration-300 ease-in"
//     onClick={removefromcart}
//   >
//     Remove Item
//   </button>
// </CardActions>
// </Card>
