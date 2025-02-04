import React, { useState,useEffect } from "react";
import {
  Search,
  Star,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Save,
  LogOut
} from "lucide-react";
import { FaRegSave } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../assets/Mealmindlogo.jpg";
import { HashLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { div } from "framer-motion/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaListUl } from "react-icons/fa";
import { FaGalacticSenate } from "react-icons/fa6";
import {PulseLoader} from "react-spinners"
import {getMealInfo} from "../Appwrite/fetchMealInfo"
import { useDispatch,useSelector } from "react-redux";
// import { getSavedMealData } from "../Appwrite/fetchMealInfo";
// import {addMealToFavorites} from "../Redux/getSavedmealSlice".
import {addMealToFavorites} from "../Redux/getSavedmealSlice"
import {saveFoodImageToStorage} from "../Appwrite/auth"
import {getUserID,setUserID} from "../Appwrite/UserKiID"
import { account } from "../Appwrite/AppwriteConfig";
import {addMealToCart} from "../Redux/AddToCartSlice.js"
import {saveFoodMealsToDatabase,LogoutUser} from "../Appwrite/auth.js"
import { storage } from "../Appwrite/AppwriteConfig";
import conf from "../Appwrite/Conf.js"

const ITEMS_PER_PAGE = 10;

const MealMindHomepage = () => {
  const [darkMode, setDarkMode] = useState(false);
  // const [logo, setLogo] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading] = useState(false)
  const [loadingforitems,setLoadingforitems] = useState(false)
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [isHover,setIsHover] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemId2, setSelectedItemId2] = useState(null);
  const [imageUrl,setImageUrl] = useState(null)
  // const [userId,setUserId] = useState('')
  const dispatch = useDispatch()
  const fileID = useSelector((state) => state.getFileId.GetFileId)
  const userKiId = getUserID()
  // console.log("userKiId from MainHome:",userKiId)
  const UserId = useSelector((state) => state.getFileId.GetUserId)

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true)
      try {
        const currentUser = await account.get();
        const imagePreviewUrl = storage.getFilePreview(conf.appwriteUsersAvatarsBucketID, fileID, 500, 500)
        if (currentUser) {
          setUserID(currentUser.$id);
          setImageUrl(imagePreviewUrl)
        }
      } catch (error) {
        console.error("Error checking user:", error);
      }finally{
        setLoading(false)
      }
    };

    checkUser();
  
  }, [])

  useEffect(() => {
    window.onload = () => {
      alert("You got Logged out kindly do registeration again to get authenticated");
    };
  }, []);

  const navigate = useNavigate()

  if(loading){
    if (loading) {
      return (
        <div className="loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-50">
          <HashLoader color="#00ffc6" />
        </div>
      );
    }
  }

  const ImageSaveToCart = async(Id) => {
    console.log("Clicked item ID:", Id);
    setSelectedItemId2(Id);
     
    // Ensure meals exist
    if (!meals || meals.length === 0) {
      console.log("No meals available");
      return;
    }

    // const userId = getUserID();
    if (!UserId) {
    console.error("No user ID found. User might not be logged in.");
    return;
  }
  console.log("Original array length:", meals.length);

  // Filter meals based on clicked ID
  const selectedMeal = meals.find((meal) => meal.id === Id);
    if (!selectedMeal) {
      console.error("Meal not found");
      return;
    }
  if (selectedMeal.length > 0) {
     dispatch(addMealToCart(selectedMeal[0])); // This sends a single object
  }
  try {
    const savefoodAddToCarttoDB = await saveFoodMealsToDatabase(selectedMeal?.title,selectedMeal.image,UserId)
    if(savefoodAddToCarttoDB){
      console.log("Image successfully savve to addToCartCollection(MainHome.jsx)",savefoodAddToCarttoDB)
    }
    dispatch(addMealToCart(selectedMeal));
    toast.success("Meal Added to cart")
  } catch (error) {
    console.log("Error while saving food details to add to cart collection (MainHome.jsx):",error.message)
    toast.error("Failed To Add Meal To Cart")
  }
}

  const LoginPage = async() => {
    try {
      const userloggedOut = await LogoutUser()
      if(userloggedOut){
        navigate("/home")
      }
    } catch (error) {
      console.log("User not get logged out",error.message)
    }
  }
  

  const meals = [
    {
      id: 1,
      image: "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
      title: "BeaverTails",
      category: "Dessert",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Water",quantity:'1/2 cup '}, {name:"Yeast",quantity:'2 parts '}, {name:"Sugar",quantity:'1/2 cup '}, {name:"Milk",quantity:'1/2 cup '}, {name:"Butter",quantity:'6 tblsp'}, {name:"Eggs",quantity:2}, {name:"Salt",quantity:'1 ½ tsp'}, {name:"Flour",quantity:'2-1/2 cups'}, {name:"Oil",quantity:'for frying'}, {name:"Lemon",quantity:'garnish'}, {name:"Sugar",quantity:'garnish'}, {name:"Cinnamon",quantity:'garnish'},],
      idMeal:52928,
      youtube_Url:"https://www.youtube.com/watch?v=2G07UOqU2e8",
      Instruction:"In the bowl of a stand mixer, add warm water, a big pinch of sugar and yeast. Allow to sit until frothy.\r\nInto the same bowl, add 1/2 cup sugar, warm milk, melted butter, eggs and salt, and whisk until combined.\r\nPlace a dough hook on the mixer, add the flour with the machine on, until a smooth but slightly sticky dough forms.\r\nPlace dough in a bowl, cover with plastic wrap, and allow to proof for 1 1/2 hours.\r\nCut dough into 12 pieces, and roll out into long oval-like shapes about 1/4 inch thick that resemble a beaver’s tail.\r\nIn a large, deep pot, heat oil to 350 degrees. Gently place beavertail dough into hot oil and cook for 30 to 45 seconds on each side until golden brown.\r\nDrain on paper towels, and garnish as desired. Toss in cinnamon sugar, in white sugar with a squeeze of lemon, or with a generous slathering of Nutella and a handful of toasted almonds. Enjoy!"
    },
    {
      id: 2,
      image: "https://www.themealdb.com/images/media/meals/1550441882.jpg",
      title: "Breakfast Potatoes",
      category: "Breakfast",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Potatoes",quantity:'3 Medium'}, {name:"Olive Oil",quantity:'1 tbs'}, {name:"Bacon",quantity:'2 strips'}, {name:"Garlic Clove",quantity:'Minced '}, {name:"Maple Syrup",quantity:'1 tbs'}, {name:"Parsley",quantity:'Garnish'}, {name:"Salt",quantity:'Pinch'}, {name:"Pepper",quantity:'Pinch'}, {name:"Allspice",quantity:'To taste'},],
      idMeal:52965,
      youtube_Url:"https://www.youtube.com/watch?v=BoD0TIO9nE4",
      Instruction:"Before you do anything, freeze your bacon slices that way when you're ready to prep, it'll be so much easier to chop!\r\nWash the potatoes and cut medium dice into square pieces. To prevent any browning, place the already cut potatoes in a bowl filled with water.\r\nIn the meantime, heat 1-2 tablespoons of oil in a large skillet over medium-high heat. Tilt the skillet so the oil spreads evenly.\r\nOnce the oil is hot, drain the potatoes and add to the skillet. Season with salt, pepper, and Old Bay as needed.\r\nCook for 10 minutes, stirring the potatoes often, until brown. If needed, add a tablespoon more of oil.\r\nChop up the bacon and add to the potatoes. The bacon will start to render and the fat will begin to further cook the potatoes. Toss it up a bit! The bacon will take 5-6 minutes to crisp.\r\nOnce the bacon is cooked, reduce the heat to medium-low, add the minced garlic and toss. Season once more. Add dried or fresh parsley. Control heat as needed.\r\nLet the garlic cook until fragrant, about one minute.\r\nJust before serving, drizzle over the maple syrup and toss. Let that cook another minute, giving the potatoes a caramelized effect.\r\nServe in a warm bowl with a sunny side up egg!"
    },
    {
      id: 3,
      image: "https://www.themealdb.com/images/media/meals/wpputp1511812960.jpg",
      title: "Canadian Butter Tarts",
      category: "Lunch",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Shortcrust Pastry",quantity:'375g'}, {name:"Eggs",quantity:'2 large'}, {name:"Muscovado Sugar",quantity:'175g'}, {name:"Raisins",quantity:'100g '}, {name:"Vanilla Extract",quantity:'1 tsp '}, {name:"Butter",quantity:'50g'}, {name:"Single Cream",quantity:'4 tsp'}, {name:"Walnuts",quantity:'50g'},],
      idMeal:52923,
      youtube_Url:"https://www.youtube.com/watch?v=WUpaOGghOdo",
      Instruction:"Preheat the oven to fan 170C/ conventional 190C/gas 5. Roll out the pastry on a lightly floured surface so it’s slightly thinner than straight from the pack. Then cut out 18-20 rounds with a 7.5cm fluted cutter, re-rolling the trimmings. Use the rounds to line two deep 12-hole tart tins (not muffin tins). If you only have a regular-sized, 12-hole tart tin you will be able to make a few more slightly shallower tarts.\r\nBeat the eggs in a large bowl and combine with the rest of the ingredients except the walnuts. Tip this mixture into a pan and stir continuously for 3-4 minutes until the butter melts, and the mixture bubbles and starts to thicken. It should be thick enough to coat the back of a wooden spoon. Don’t overcook, and be sure to stir all the time as the mixture can easily burn. Remove from the heat and stir in the nuts.\r\nSpoon the filling into the unbaked tart shells so it’s level with the pastry. Bake for 15-18 minutes until set and pale golden. Leave in the tin to cool for a few minutes before lifting out on to a wire rack. Serve warm or cold."
    },
    {
      id: 4,
      image: "https://www.themealdb.com/images/media/meals/uttupv1511815050.jpg",
      title: "Montreal Smoked Meat",
      category: "Lunch",
      country:"Canadian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Beef Brisket",quantity:1}, {name:"Salt",quantity:'3 tbs'}, {name:"Black Pepper",quantity:'3 tbs'}, {name:"Coriander",quantity:'1 tbs'}, {name:"Sugar",quantity:'1 tbs'}, {name:"Bay Leaf",quantity:'1 tsp '}, {name:"Cloves",quantity:'1 tsp '}, {name:"Black Pepper",quantity:'3 tbs'}, {name:"Coriander",quantity:'1 tbs'}, {name:"Paprika",quantity:'1 tbs'}, {name:"Garlic",quantity:'1 tbs'}, {name:"Onion",quantity:'1 tbs'}, {name:"Dill",quantity:'1 tbs'}, {name:"English Mustard",quantity:'1 tsp '}, {name:"Celery Salt",quantity:'1 tbs'}, {name:"Red Pepper Flakes",quantity:'1 tsp '},],
      idMeal:52927,
      youtube_Url:"https://www.youtube.com/watch?v=g5oCDoyxbBk",
      Instruction:"To make the cure, in a small bowl mix together salt, pink salt, black pepper, coriander, sugar, bay leaf, and cloves. Coat entire brisket with the cure and place in an extra-large resealable plastic bag. Place in the coldest part of the refrigerator and cure for 4 days, flipping brisket twice a day.\r\nRemove brisket from bag and wash as much cure off as possible under cold running water. Place brisket in a large container and fill with water and let soak for 2 hours, replacing water every 30 minutes. Remove from water and pat dry with paper towels.\r\nTo make the rub, mix together black pepper, coriander, paprika, garlic powder, onion powder, dill weed, mustard, celery seed, and crushed red papper in a small bowl. Coat entire brisket with the rub.\r\nFire up smoker or grill to 225 degrees, adding chunks of smoking wood chunks when at temperature. When wood is ignited and producing smoke, place brisket in, fat side up, and smoke until an instant read thermometer registers 165 degrees when inserted into thickest part of the brisket, about 6 hours.\r\nTransfer brisket to large roasting pan with V-rack. Place roasting pan over two burners on stovetop and fill with 1-inch of water. Bring water to a boil over high heat, reduce heat to medium, cover roasting pan with aluminum foil, and steam brisket until an instant read thermometer registers 180 degrees when inserted into thickest part of the meat, 1 to 2 hours, adding more hot water as needed.\r\nTransfer brisket to cutting board and let cool slightly. Slice and serve, preferably on rye with mustard."
    }
    ,
    {
      id: 5,
      image: "https://www.themealdb.com/images/media/meals/vwuprt1511813703.jpg",
      title: "Nanaimo Bars",
      category: "Lunch",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Custard",quantity:'125g'}, {name:"Caster Sugar",quantity:'50g'}, {name:"Cocoa",quantity:'5 tbs'}, {name:"Egg",quantity:'1 beaten'}, {name:"Digestive Biscuits",quantity:'200g shredded'}, {name:"Desiccated Coconut",quantity:'100g '}, {name:"Almonds",quantity:'50g'}, {name:"Butter",quantity:'100g '}, {name:"Double Cream",quantity:'4 tbs'}, {name:"Custard Powder",quantity:'3 tbs'}, {name:"Icing Sugar",quantity:'250g'}, {name:"Dark Chocolate",quantity:'150g'}, {name:"Butter",quantity:'50g'},],
      idMeal:52924,
      youtube_Url:"https://www.youtube.com/watch?v=MMrE4I1ZtWo",
      Instruction:"Start by making the biscuit base. In a bowl, over a pan of simmering water, melt the butter with the sugar and cocoa powder, stirring occasionally until smooth. Whisk in the egg for 2 to 3 mins until the mixture has thickened. Remove from heat and mix in the biscuit crumbs, coconut and almonds if using, then press into the base of a lined 20cm square tin. Chill for 10 mins.\r\nFor the middle layer, make the custard icing; whisk together the butter, cream and custard powder until light and fluffy, then gradually add the icing sugar until fully incorporated. Spread over the bottom layer and chill in the fridge for at least 10 mins until the custard is no longer soft.\r\nMelt the chocolate and butter together in the microwave, then spread over the chilled bars and put back in the fridge. Leave until the chocolate has fully set (about 2 hrs). Take the mixture out of the tin and slice into squares to serve."
    }
    ,
    {
      id: 6,
      image: "https://www.themealdb.com/images/media/meals/yyrrxr1511816289.jpg",
      title: "Pate Chinois",
      category: "Lunch",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Potatoes",quantity:'4 cups '}, {name:"Butter",quantity:'60ml'}, {name:"Milk",quantity:'½ cup '}, {name:"Minced Beef",quantity:'450g'}, {name:"Onion",quantity:'1 finely chopped '}, {name:"Creamed Corn",quantity:'500ml'}, {name:"Paprika",quantity:'to taste'}, {name:"Parsley",quantity:'to taste'}, {name:"Salt",quantity:'Dash'}, {name:"Pepper",quantity:'Dash'},],
      idMeal:52930,
      youtube_Url:"https://www.youtube.com/watch?v=QRFqnLkEv3I",
      Instruction:"In a large pot of salted water, cook the potatoes until they are very tender. Drain.\r\nWith a masher, coarsely crush the potatoes with at least 30 ml (2 tablespoons) of butter. With an electric mixer, purée with the milk. Season with salt and pepper. Set aside.\r\nWith the rack in the middle position, preheat the oven to 190 °C (375 °F).\r\nIn a large skillet, brown the onion in the remaining butter. Add the meat and cook until golden brown. Season with salt and pepper. Remove from the heat.\r\nLightly press the meat at the bottom of a 20-cm (8-inch) square baking dish. Cover with the corn and the mashed potatoes. Sprinkle with paprika and parsley.\r\nBake for about 30 minutes. Finish cooking under the broiler. Let cool for 10 minutes."
    }
    ,
    {
      id: 7,
      image: "https://www.themealdb.com/images/media/meals/yqqqwu1511816912.jpg",
      title: "Pouding chomeur",
      category: "Brunch",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Butter",quantity:'½ cup '}, {name:"Sugar",quantity:'1 cup '}, {name:"Eggs",quantity:2}, {name:"Vanilla Extract",quantity:'1 tsp'}, {name:"Flour",quantity:'2 cups '}, {name:"Baking Powder",quantity:'1 tsp '}, {name:"Milk",quantity:'1 1/4 cup'}, {name:"Maple Syrup",quantity:'1 1/2 cup '}, {name:"Brown Sugar",quantity:'1 1/2 cup '}, {name:"Single Cream",quantity:'1 1/2 cup '}, {name:"Butter",quantity:'1/3 cup'}],
      idMeal:52932,
      youtube_Url:"https://www.youtube.com/watch?v=WFvj71RZYPc",
      Instruction:"In a large bowl, with an electric mixer, mix the butter and sugar till the mix is light.\r\nAdd eggs and vanilla and mix.\r\nIn another bowl, mix flour and baking powder.\r\nAlternate flour mix and milk to the butter mix.\r\nPour into a 13 inch by 9 inch greased pan.\r\nMAPLE SAUCE.\r\nIn a large casserole, bring to boil the syrup, brown sugar, cream and butter and constantly stir.\r\nReduce heat and and gently cook 2 minutes or till sauce has reduced a little bit.\r\nPour sauce gently over cake.\r\nBake at 325°f (160°c) about 35 minutes or till cake is light brown and when toothpick inserted comes out clean."
    }
    ,
    {
      id: 8,
      image: "https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg",
      title: "Poutine",
      category: "Brunch",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Vegetable Oil",quantity:'Dash'}, {name:"Beef Gravy",quantity:'1 Can'}, {name:"Potatoes",quantity:'5 thin cut'}, {name:"Cheese Curds",quantity:'2 cups '}],
      idMeal:52804,
      youtube_Url:"https://www.youtube.com/watch?v=UVAMAoA2_WU",
      Instruction:"Heat oil in a deep fryer or deep heavy skillet to 365°F (185°C).\r\nWarm gravy in saucepan or microwave.\r\nPlace the fries into the hot oil, and cook until light brown, about 5 minutes.\r\nRemove to a paper towel lined plate to drain.\r\nPlace the fries on a serving platter, and sprinkle the cheese over them.\r\nLadle gravy over the fries and cheese, and serve immediately."
    }
    ,
    {
      id: 9,
      image: "https://www.themealdb.com/images/media/meals/ruwpww1511817242.jpg",
      title: "Rappie Pie",
      category: "Dessert",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Butter",quantity:'2 tbs'}, {name:"Onions",quantity:'2 chopped'}, {name:"Chicken Stock",quantity:'4 qt '}, {name:"Chicken Breast",quantity:'1.5kg '}, {name:"Potatoes",quantity:'4kg'}, {name:"Salt",quantity:"2 tbs"}, {name:"Black Pepper",quantity:"1tbsp"},],
      idMeal:52933,
      youtube_Url:"https://www.youtube.com/watch?v=Ys2kZnTVXAM",
      Instruction:"Preheat oven to 400 degrees F (200 degrees C). Grease a 10x14x2-inch baking pan.\r\nHeat margarine in a skillet over medium heat; stir in onion. Cook and stir until onion has softened and turned translucent, about 5 minutes. Reduce heat to low and continue to cook and stir until onion is very tender and dark brown, about 40 minutes more.\r\nBring chicken broth to a boil in a large pot; stir in chicken breasts, reduce heat, and simmer until chicken is no longer pink at the center, about 20 minutes. Remove from heat. Remove chicken breasts to a plate using a slotted spoon; reserve broth.\r\nJuice potatoes with an electric juicer; place dry potato flesh into a bowl and discard juice. Stir salt and pepper into potatoes; stir in enough reserved broth to make the mixture the consistency of oatmeal. Set remaining broth aside.\r\nSpread half of potato mixture evenly into the prepared pan. Lay cooked chicken breast evenly over potatoes; scatter caramelized onion evenly over chicken. Spread remaining potato mixture over onions and chicken to cover.\r\nBake in the preheated oven until golden brown, about 1 hour. Reheat chicken broth; pour over individual servings as desired."
    }
    ,
    {
      id: 10,
      image: "https://www.themealdb.com/images/media/meals/xxtsvx1511814083.jpg",
      title: "Split Pea Soup",
      category: "Brunch",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Ham",quantity:'1kg'}, {name:"Peas",quantity:'200g (soaked overnight)'}, {name:"Onions",quantity:'2 chopped'}, {name:"Carrots",quantity:'2 chopped '}, {name:"Bay Leaves",quantity:2}, {name:"Celery",quantity:"1 chopped"}, {name:"Frozen Peas",quantity:"300g"}, {name:"Bread",quantity:"to serve"}],
      idMeal:52925,
      youtube_Url:"https://www.youtube.com/watch?v=qdhWz7qAaCU",
      Instruction:"Put the gammon in a very large pan with 2 litres water and bring to the boil. Remove from the heat and drain off the water – this helps to get rid of some of the saltiness. Recover with 2 litres cold water and bring to the boil again. Put everything but the frozen peas into the pan and bring to the boil. Reduce to a simmer and cook for 1½-2½ hrs, topping up the water as and when you need to, to a similar level it started at. As the ham cooks and softens, you can halve it if you want, so it is all submerged under the liquid. When the ham is tender enough to pull into shreds, it is ready.\r\nLift out the ham, peel off and discard the skin. While it is still hot (wear a clean pair of rubber gloves), shred the meat. Remove bay from the soup and stir in the frozen peas. Simmer for 1 min, then blend until smooth. Add a splash of water if too thick, and return to the pan to heat through if it has cooled, or if you are making ahead.\r\nWhen you are ready to serve, mix the hot soup with most of the ham – gently reheat if made ahead. Serve in bowls with the remaining ham scattered on top, and eat with crusty bread and butter."
    }
    ,
    {
      id: 11,
      image: "https://www.themealdb.com/images/media/meals/yrstur1511816601.jpg",
      title: "Sugar Pie",
      category: "Brunch",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Brown Sugar",quantity:'2 cups '}, {name:"Butter",quantity:'¼ cup'}, {name:"Eggs",quantity:2}, {name:"Vanilla Extract",quantity:'1 tsp '}, {name:"Salt",quantity:'1 tsp '}, {name:"Plain Flour",quantity:"½ cup "}, {name:"Milk",quantity:"1 1/2 cups "}],
      idMeal:52931,
      youtube_Url:"https://www.youtube.com/watch?v=uVQ66jiL-Dc",
      Instruction:"Preheat oven to 350 degrees F (175 degrees C). Grease a 9-inch pie dish.\r\nPlace the brown sugar and butter in a mixing bowl, and beat them together with an electric mixer until creamy and very well combined, without lumps. Beat in eggs, one at a time, incorporating the first egg before adding the next one. Add the vanilla extract and salt; beat the flour in, a little at a time, and then the milk, making a creamy batter. Pour the batter into the prepared pie dish.\r\nBake in the preheated oven for 35 minutes; remove pie, and cover the rim with aluminum foil to prevent burning. Return to oven, and bake until the middle sets and the top forms a crusty layer, about 15 more minutes. Let the pie cool to room temperature, then refrigerate for at least 1 hour before serving."
    }
    ,
    {
      id: 12,
      image: "https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg",
      title: "Timbits",
      category: "Dessert",
      country:"Canadian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Flour",quantity:'2 cups '}, {name:"Sugar",quantity:'1/3 cup'}, {name:"Baking Powder",quantity:'3 tsp'}, {name:"Salt",quantity:'½ tsp'}, {name:"Egg",quantity:'1 beaten'}, {name:"Milk",quantity:"¾ cup"}, {name:"Oil",quantity:"3 tbs"}, {name:"Oil",quantity:"for frying"}, {name:"Icing Sugar",quantity:"garnish"},],
      idMeal:52929,
      youtube_Url:"https://www.youtube.com/watch?v=fFLn1h80AGQ",
      Instruction:"Sift together dry ingredients.\r\nMix together wet ingredients and incorporate into dry. Stir until smooth.\r\nDrop by teaspoonfuls(no bigger) into hot oil (365 degrees, no hotter), turning after a few moments until golden brown on all sides.\r\nRemove and drain.\r\nRoll in cinnamon sugar while still warm and serve."
    }
    ,
    {
      id: 13,
      image: "https://www.themealdb.com/images/media/meals/ytpstt1511814614.jpg",
      title: "Tourtiere",
      category: "Dessert",
      country:"Canadian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Potatoes",quantity:'1 medium'}, {name:"Sunflower Oil",quantity:'1 tsp '}, {name:"TomaMinced Pork",quantity:'500g'}, {name:"Onion",quantity:'1 finely chopped '}, {name:"Garlic Clove",quantity:'1 finely chopped '}, {name:"Cinnamon",quantity:"¼ tsp"}, {name:"Allspice",quantity:"¼ tsp"}, {name:"Nutmeg",quantity:"¼ tsp"}, {name:"Vegetable Stock",quantity:"100ml"}, {name:"Shortcrust Pastry",quantity:"400g"}, {name:"Egg",quantity:"To Glaze"},],
      idMeal:52926,
      youtube_Url:"https://www.youtube.com/watch?v=A96hbwobKKs",
      Instruction:"Heat oven to 200C/180C fan/gas 6. Boil the potato until tender, drain and mash, then leave to cool. Heat the oil in a non-stick pan, add the mince and onion and quickly fry until browned. Add the garlic, spices, stock, plenty of pepper and a little salt and mix well. Remove from the heat, stir into the potato and leave to cool.\r\nRoll out half the pastry and line the base of a 20-23cm pie plate or flan tin. Fill with the pork mixture and brush the edges of the pastry with water. Roll out the remaining dough and cover the pie. Press the edges of the pastry to seal, trimming off the excess. Prick the top of the pastry case to allow steam to escape and glaze the top with the beaten egg.\r\nBake for 30 mins until the pastry is crisp and golden. Serve cut into wedges with a crisp green salad. Leftovers are good cold for lunch the next day, served with a selection of pickles."
    }
    ,
    {
      id: 14,
      image: "https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg",
      title: "Baingan Bharta",
      category: "Brunch",
      country: "Indian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Aubergine",quantity:'1 large'}, {name:"Onion",quantity:'½ cup '}, {name:"Tomatoes",quantity:'1 cup'}, {name:"Garlic",quantity:'6 cloves'}, {name:"Green Chilli",quantity:1}, {name:"Red Chilli Powder",quantity:"¼ teaspoon"}, {name:"Oil",quantity:"1.5 tablespoon"}, {name:"Coriander Leaves",quantity:"1 tablespoon chopped"}, {name:"salt",quantity:"as required"},],
      idMeal:52807,
      youtube_Url:"https://www.youtube.com/watch?v=-84Zz2EP4h4",
      Instruction:"Rinse the baingan (eggplant or aubergine) in water. Pat dry with a kitchen napkin. Apply some oil all over and\r\nkeep it for roasting on an open flame. You can also grill the baingan or roast in the oven. But then you won't get\r\nthe smoky flavor of the baingan. Keep the eggplant turning after a 2 to 3 minutes on the flame, so that its evenly\r\ncooked. You could also embed some garlic cloves in the baingan and then roast it.\r\n2. Roast the aubergine till its completely cooked and tender. With a knife check the doneness. The knife should slid\r\neasily in aubergines without any resistance. Remove the baingan and immerse in a bowl of water till it cools\r\ndown.\r\n3. You can also do the dhungar technique of infusing charcoal smoky flavor in the baingan. This is an optional step.\r\nUse natural charcoal for this method. Heat a small piece of charcoal on flame till it becomes smoking hot and red.\r\n4. Make small cuts on the baingan with a knife. Place the red hot charcoal in the same plate where the roasted\r\naubergine is kept. Add a few drops of oil on the charcoal. The charcoal would begin to smoke.\r\n5. As soon as smoke begins to release from the charcoal, cover the entire plate tightly with a large bowl. Allow the\r\ncharcoal smoke to get infused for 1 to 2 minutes. The more you do, the more smoky the baingan bharta will\r\nbecome. I just keep for a minute. Alternatively, you can also do this dhungar method once the baingan bharta is\r\ncooked, just like the way we do for Dal Tadka.\r\n6. Peel the skin from the roasted and smoked eggplant.\r\n7. Chop the cooked eggplant finely or you can even mash it.\r\n8. In a kadai or pan, heat oil. Then add finely chopped onions and garlic.\r\n9. Saute the onions till translucent. Don't brown them.\r\n10. Add chopped green chilies and saute for a minute.\r\n11. Add the chopped tomatoes and mix it well.\r\n12. Bhuno (saute) the tomatoes till the oil starts separating from the mixture.\r\n13. Now add the red chili powder. Stir and mix well.\r\n14. Add the chopped cooked baingan.\r\n15. Stir and mix the chopped baingan very well with the onion­tomato masala mixture.\r\n16. Season with salt. Stir and saute for some more 4 to 5 minutes more.\r\n17. Finally stir in the coriander leaves with the baingan bharta or garnish it with them. Serve Baingan Bharta with\r\nphulkas, rotis or chapatis. It goes well even with bread, toasted or grilled bread and plain rice or jeera rice."
    }
    ,
    {
      id: 15,
      image: "https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg",
      title: "Bread omelette",
      category: "Breakfast",
      country: "Indian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Bread",quantity:2}, {name:"Egg",quantity:2}, {name:"Salt",quantity:0.5},],
      idMeal:53076,
      youtube_Url:"",
      Instruction:"Make and enjoy"
    }
    ,
    {
      id: 16,
      image: "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
      title: "Chicken Handi",
      category: "Lunch",
      country: "Indian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Chicken",quantity:'1.2 kg'}, {name:"Onion",quantity:'5 thinly sliced'}, {name:"Tomatoes",quantity:'2 finely chopped'}, {name:"Garlic",quantity:'8 cloves chopped'}, {name:"Ginger paste",quantity:'1 tbsp'}, {name:"Vegetable oil",quantity:'¼ cup'}, {name:"Cumin seeds",quantity:'2 tsp'}, {name:"Coriander seeds",quantity:'3 tsp'}, {name:"Turmeric powder",quantity:'1 tsp'}, {name:"Chilli powder",quantity:'1 tsp'}, {name:"Green chilli",quantity:'2'}, {name:"Yogurt",quantity:'1 cup'}, {name:"Cream",quantity:'¾ cup'}, {name:"fenugreek",quantity:'3 tsp Dried'}, {name:"Garam masala",quantity:'1 tsp'}, {name:"Salt",quantity:'To taste'},],
      idMeal:52795,
      youtube_Url:"https://www.youtube.com/watch?v=IO0issT0Rmc",
      Instruction:"Take a large pot or wok, big enough to cook all the chicken, and heat the oil in it. Once the oil is hot, add sliced onion and fry them until deep golden brown. Then take them out on a plate and set aside.\r\nTo the same pot, add the chopped garlic and sauté for a minute. Then add the chopped tomatoes and cook until tomatoes turn soft. This would take about 5 minutes.\r\nThen return the fried onion to the pot and stir. Add ginger paste and sauté well.\r\nNow add the cumin seeds, half of the coriander seeds and chopped green chillies. Give them a quick stir.\r\nNext goes in the spices – turmeric powder and red chilli powder. Sauté the spices well for couple of minutes.\r\nAdd the chicken pieces to the wok, season it with salt to taste and cook the chicken covered on medium-low heat until the chicken is almost cooked through. This would take about 15 minutes. Slowly sautéing the chicken will enhance the flavor, so do not expedite this step by putting it on high heat.\r\nWhen the oil separates from the spices, add the beaten yogurt keeping the heat on lowest so that the yogurt doesn’t split. Sprinkle the remaining coriander seeds and add half of the dried fenugreek leaves. Mix well.\r\nFinally add the cream and give a final mix to combine everything well.\r\nSprinkle the remaining kasuri methi and garam masala and serve the chicken handi hot with naan or rotis. Enjoy!"
    }
    ,
    {
      id: 17,
      image: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
      title: "Dal fry",
      category: "Lunch",
      country: "Indian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Toor dal",quantity:'1 cup'}, {name:"Water",quantity:'2-1/2 cups'}, {name:"Salt",quantity:'1 tsp'}, {name:"Turmeric",quantity:'1/4 tsp'}, {name:"Ghee",quantity:'3 tbs'}, {name:"Chopped tomatoes",quantity:'1 cup'}, {name:" Cumin seeds",quantity:'1/2 tsp'}, {name:"Mustard Seeds",quantity:'1/2 tsp'}, {name:"Bay Leaf",quantity:2}, {name:"Green Chili",quantity:'1 tbs chopped'}, {name:"Ginger",quantity:'2 tsp shredded'}, {name:"Cilantro",quantity:'2 tbs '}, {name:"Red Pepper",quantity:'1/2 tsp'}, {name:"Salt",quantity:'1/2 tsp'}, {name:"Sugar",quantity:'1 tsp'}, {name:"Garam Masala",quantity:'1/4 tsp'},],
      idMeal:52785,
      youtube_Url:"https://www.youtube.com/watch?v=J4D855Q9-jg",
      Instruction:"Wash and soak toor dal in approx. 3 cups of water, for at least one hours. Dal will be double in volume after soaking. Drain the water.\r\nCook dal with 2-1/2 cups water and add salt, turmeric, on medium high heat, until soft in texture (approximately 30 mins) it should be like thick soup.\r\nIn a frying pan, heat the ghee. Add cumin seeds, and mustard seeds. After the seeds crack, add bay leaves, green chili, ginger and chili powder. Stir for a few seconds.\r\nAdd tomatoes, salt and sugar stir and cook until tomatoes are tender and mushy.\r\nAdd cilantro and garam masala cook for about one minute.\r\nPour the seasoning over dal mix it well and cook for another minute.\r\nServe with Naan."
    }
    ,
    {
      id: 18,
      image: "https://www.themealdb.com/images/media/meals/sywrsu1511463066.jpg",
      title: "Kidney Bean Curry",
      category: "Lunch",
      country: "Indian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Vegetable Oil",quantity:'1 tbls'}, {name:"Onion",quantity:'1 finely chopped '}, {name:"Garlic",quantity:'2 cloves chopped'}, {name:"Ginger",quantity:'1 part '}, {name:"Coriander",quantity:'1 Packet'}, {name:"Cumin",quantity:'1 tsp '}, {name:" Paprika",quantity:'1 tsp '}, {name:"Garam Masala",quantity:'2 tsp'}, {name:"Chopped Tomatoes",quantity:'400g'}, {name:"Kidney Beans",quantity:'400g'}, {name:"Basmati Rice",quantity:'to serve'},],
      idMeal:52868,
      youtube_Url:"https://www.youtube.com/watch?v=Tp_PMWvIKzo",
      Instruction:"Heat the oil in a large frying pan over a low-medium heat. Add the onion and a pinch of salt and cook slowly, stirring occasionally, until softened and just starting to colour. Add the garlic, ginger and coriander stalks and cook for a further 2 mins, until fragrant.\r\n\r\nAdd the spices to the pan and cook for another 1 min, by which point everything should smell aromatic. Tip in the chopped tomatoes and kidney beans in their water, then bring to the boil.\r\n\r\nTurn down the heat and simmer for 15 mins until the curry is nice and thick. Season to taste, then serve with the basmati rice and the coriander leaves."
    }
    ,
    {
      id: 19,
      image: "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg",
      title: "Lamb Biryani",
      category: "Lunch",
      country: "Indian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Cashew nuts",quantity:12}, {name:"Khus khus",quantity:'½ tbsp'}, {name:"Cumin seeds",quantity:'½ tbsp'}, {name:"Onions",quantity:'3 sliced thinly'}, {name:"Ginger garlic paste",quantity:'2 tsp'}, {name:"Garlic",quantity:'4 whole'}, {name:" Mint",quantity:'Leaves'}, {name:"Cilantro",quantity:'Leaves'}, {name:"Saffron",quantity:'½ tsp dissolved in ½ cup warm milk'}, {name:"Ghee",quantity:'2 tbsp'}, {name:"Basmati rice",quantity:'2 Cups'}, {name:"Full fat yogurt",quantity:'½ cup'}, {name:"Cumin Seeds",quantity:'1 tbsp'}, {name:"Bay leaf",quantity:'½'}, {name:"Cinnamon",quantity:'1 thin piece'}, {name:"Cloves",quantity:'3'}, {name:"Cardamom",quantity:'2'}, {name:"Lamb",quantity:'1 lb'}, {name:"Red Chilli powder",quantity:'1 tsp'}, {name:"Biryani masala",quantity:'1 tbsp'}, ],
      idMeal:52805,
      youtube_Url:"https://www.youtube.com/watch?v=r7SYVSG5nxo",
      Instruction:"Grind the cashew, poppy seeds and cumin seeds into a smooth paste, using as little water as possible. Set aside. \r\n\r\nDeep fry the sliced onions when it is hot. Don’t overcrowd the oil. When the onions turn light brown, remove from oil and drain on paper towel. The fried onion will crisp up as it drains. Also fry the cashewnuts till golden brown. Set aside.\r\n\r\nWash the rice and soak in water for twenty minutes.\r\nMeanwhile, take a big wide pan, add oil in medium heat, add the sliced onions, add the blended paste, to it add the green chillies, ginger garlic paste and garlic and fry for a minute.\r\nThen add the tomatoes and sauté them well till they are cooked and not mushy.\r\n\r\nThen to it add the red chilli powder, biryani powder, mint, coriander leaves and sauté them well.\r\nAdd the yogurt and mix well. I always move the skillet away from the heat when adding yogurt which prevents it from curdling.\r\n\r\nNow after returning the skillet back to the stove, add the washed lamb and salt and ½ cup water and mix well. Cook for 1 hour and cook it covered in medium low heat or put it in a pressure cooker for 6 whistles. If the water is not drained totally, heat it by keeping it open.\r\n\r\nTake another big pan, add thrice the cup of rice you use, and boil it. When it is boiling high, add the rice, salt and jeera and mix well. After 7 minutes exact or when the rice is 80% done. Switch off and drain the rice.\r\n\r\nNow, the layering starts. To the lamb, pat and level it. Add the drained hot rice on the top of it. Garnish with fried onions, ghee, mint, coriander leaves and saffron dissolved in milk.\r\n\r\nCover the dish and bake in a 350f oven for 15 minutes or till the cooked but not mushy. Or cook in the stove medium heat for 12 minutes and lowest heat for 5 minutes. And switch off. Mix and serve hot!\r\nNotes\r\n1. If you are cooking in oven, do make sure to cook in a big oven safe pan and cover it tight and then keep in oven for the final step.\r\n2. You can skip biryani masala if you don’t have and add just garam masala (1 tsp and red chilli powder – 3 tsp instead of 1 tsp)\r\n3. If it is spicy in the end, squeeze some lemon, it will reduce the heat and enhance the flavors also."
    }
    ,
    {
      id: 20,
      image: "https://www.themealdb.com/images/media/meals/vvstvq1487342592.jpg",
      title: "Lamb Rogan josh",
      category: "Lunch",
      country: "Indian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Onion",quantity:'2 quartered'}, {name:"Sunflower Oil",quantity:'4 tbsp'}, {name:"Garlic",quantity:'4 cloves'}, {name:"Ginger",quantity:'Thumb sized peeled and very finely grated'}, {name:"Madras Paste",quantity:'2 tbsp'}, {name:"Paprika",quantity:'2 tsp'}, {name:"cinnamon stick",quantity:1}, {name:"Cardamom",quantity:'6 bashed to break shells'}, {name:"Clove",quantity:4}, {name:"Bay Leaf",quantity:2}, {name:"Tomato Purée",quantity:'1 tbsp'}, {name:"Lamb",quantity:'1kg cubed'}, {name:"Greek yogurt",quantity:'150ml'}, {name:"Coriander",quantity:'Garnish chopped '}, ],
      idMeal:52808,
      youtube_Url:"https://www.youtube.com/watch?v=NZVo32n7iS8",
      Instruction:"\r\nPut the onions in a food processor and whizz until very finely chopped. Heat the oil in a large heavy-based pan, then fry the onion with the lid on, stirring every now and then, until it is really golden and soft. Add the garlic and ginger, then fry for 5 mins more.\r\nTip the curry paste, all the spices and the bay leaves into the pan, with the tomato purée. Stir well over the heat for about 30 secs, then add the meat and 300ml water. Stir to mix, turn down the heat, then add the yogurt.\r\nCover the pan, then gently simmer for 40-60 mins until the meat is tender and the sauce nice and thick. Serve scattered with coriander, with plain basmati or pilau rice."
    }
    ,
    {
      id: 21,
      image: "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg",
      title: "Matar Paneer",
      category: "Dessert",
      country: "Indian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Sunflower Oil",quantity:'1 tbls'}, {name:"Paneer",quantity:'225g'}, {name:"Ginger",quantity:2}, {name:"Cumin",quantity:'1 tsp '}, {name:"Turmeric",quantity:'1 tsp '}, {name:"Coriander",quantity:'1 tsp '}, {name:"Green Chilli",quantity:1}, {name:"Tomato",quantity:'4 large'}, {name:"Peas",quantity:'150g'}, {name:"Garam Masala",quantity:'1 tsp '}, {name:"Coriander",quantity:'Small bunch'}, {name:"Naan Bread",quantity:'to serve'}, ],
      idMeal:52865,
      youtube_Url:"https://www.youtube.com/watch?v=wlseYNqwLNs",
      Instruction:"Heat the oil in a frying pan over high heat until it’s shimmering hot. Add the paneer, then turn the heat down a little. Fry until it starts to brown at the edges, then turn it over and brown on each side – the paneer will brown faster than you think, so don’t walk away. Remove the paneer from the pan and drain on kitchen paper.\r\nPut the ginger, cumin, turmeric, ground coriander and chilli in the pan, and fry everything for 1 min. Add the tomatoes, mashing them with the back of a spoon and simmer everything for 5 mins until the sauce smells fragrant. Add a splash of water if it’s too thick. Season well. Add the peas and simmer for a further 2 mins, then stir in the paneer and sprinkle over the garam masala. Divide between two bowls, top with coriander leaves and serve with naan bread, roti or rice."
    }
    ,
    {
      id: 22,
      image: "https://www.themealdb.com/images/media/meals/yxsurp1511304301.jpg",
      title: "Nutty Chicken Curry",
      category: "Dessert",
      country: "Indian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Red Chilli",quantity:'1 large'}, {name:"Ginger",quantity:'0.5'}, {name:"Garlic",quantity:'1 large'}, {name:"Coriander",quantity:'Bunch'}, {name:"Sunflower Oil",quantity:'1 tbsp'}, {name:"Chicken Breasts",quantity:4}, {name:"Peanut Butter",quantity:'5 tblsp '}, {name:"Chicken Stock",quantity:'150ml'}, {name:"Greek Yogurt",quantity:'200g'}, ],
      idMeal:52851,
      youtube_Url:"https://www.youtube.com/watch?v=nSQNfZxOdeU",
      Instruction:"Finely slice a quarter of the chilli, then put the rest in a food processor with the ginger, garlic, coriander stalks and one-third of the leaves. Whizz to a rough paste with a splash of water if needed.\r\nHeat the oil in a frying pan, then quickly brown the chicken chunks for 1 min. Stir in the paste for another min, then add the peanut butter, stock and yogurt. When the sauce is gently bubbling, cook for 10 mins until the chicken is just cooked through and sauce thickened. Stir in most of the remaining coriander, then scatter the rest on top with the chilli, if using. Eat with rice or mashed sweet potato."
    }
    ,
    {
      id: 23,
      image: "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg",
      title: "Recheado Masala Fish",
      category: "Dinner",
      country: "Indian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Mackerel",quantity:4}, {name:"Red Chili",quantity:'18 dried'}, {name:"Ginger",quantity:'1 inch'}, {name:"Garlic",quantity:'8 cloves'}, {name:"Pepper",quantity:'1.5 tsp'}, {name:"Cumin",quantity:'1 tsp'}, {name:"Turmeric",quantity:'½ tsp'}, {name:"Cinnamon stick",quantity:''}, {name:"Clove",quantity:'4'}, {name:"Cardamom",quantity:2}, {name:"Sugar",quantity:'1 tbsp'}, {name:"Tamarind ball",quantity:'2 marble sized'}, {name:"Vinegar",quantity:'2.5 tbsp'},{name:"Oil",quantity:'for frying'},],
      idMeal:52809,
      youtube_Url:"https://www.youtube.com/watch?v=FXtCris37nE",
      Instruction:"Soak all the spices, ginger, garlic, tamarind pulp and kashmiri chilies except oil in vinegar.\r\nAdd sugar and salt.\r\nAlso add turmeric powder.\r\nCombine all nicely and marinate for 35-40 mins.\r\nGrind the mixture until soft and smooth. Add more vinegar if required but ensure the paste has to be thick so add vinegar accordingly. If the masala paste is thin then it would not stick to the fish.\r\nRinse the fish slit from the center and give some incision from the top. You could see the fish below for clarity.\r\nNow stuff the paste into the center and into the incision. Coat the entire fish with this paste. Marinate the fish for 30 mins.\r\nPlace oil in a shallow pan, once oil is quite hot shallow fry the stuffed mackerels.\r\nFry until golden brown from both sides\r\nServe the recheado mackerels hot with salad, lime wedges, rice and curry.\r\nNotes\r\n1. Ensure the masala paste is thick else the result won't be good.\r\n2. If you aren't able to find kashmiri chilies then use bedgi chilies or kashmiri red chili powder.\r\n3. You could use white vinegar or coconut vinegar.\r\n4. Any left over paste could be stored in the fridge for future use.\r\n5. Cinnamon could be avoided as it's a strong spice used generally for meat or chicken."
    }
    ,
    {
      id: 24,
      image: "https://www.themealdb.com/images/media/meals/1550441275.jpg",
      title: "Smoked Haddock Kedgeree",
      category: "Lunch",
      country: "Indian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Butter",quantity:'50g'}, {name:"Onion",quantity:'1 chopped'}, {name:"Cardamom",quantity:'3 Pods'}, {name:"Turmeric",quantity:'1/4 tsp'}, {name:"Cinnamon Stick",quantity:'1 small'}, {name:"Bay Leaf",quantity:'Sprigs of fresh'}, {name:"Basmati Rice",quantity:'450g'}, {name:"Chicken Stock",quantity:'1 Litre'}, {name:"Smoked Haddock",quantity:'750g'}, {name:"Eggs",quantity:3}, {name:"Parsley",quantity:'3 tblsp chopped'}, {name:"Lemon",quantity:'1 chopped'},],
      idMeal:52964,
      youtube_Url:"https://www.youtube.com/watch?v=QqdzDCWS4gQ",
      Instruction:"Melt 50g butter in a large saucepan (about 20cm across), add 1 finely chopped medium onion and cook gently over a medium heat for 5 minutes, until softened but not browned.\r\n\r\nStir in 3 split cardamom pods, ¼ tsp turmeric, 1 small cinnamon stick and 2 bay leaves, then cook for 1 minute.\r\n\r\nTip in 450g basmati rice and stir until it is all well coated in the spicy butter.\r\n\r\nPour in 1 litre chicken or fish stock, add ½ teaspoon salt and bring to the boil, stir once to release any rice from the bottom of the pan. Cover with a close-fitting lid, reduce the heat to low and leave to cook very gently for 12 minutes.\r\n\r\nMeanwhile, bring some water to the boil in a large shallow pan. Add 750g un-dyed smoked haddock fillet and simmer for 4 minutes, until the fish is just cooked. Lift it out onto a plate and leave until cool enough to handle.\r\n\r\nHard-boil 3 eggs for 8 minutes.\r\n\r\nFlake the fish, discarding any skin and bones. Drain the eggs, cool slightly, then peel and chop. \r\n\r\nUncover the rice and remove the bay leaves, cinnamon stick and cardamom pods if you wish to. Gently fork in the fish and the chopped eggs, cover again and return to the heat for 2-3 minutes, or until the fish has heated through.\r\n\r\nGently stir in almost all the 3 tbsp chopped fresh parsley, and season with a little salt and black pepper to taste. Serve scattered with the remaining parsley and garnished with 1 lemon, cut into wedges."
    }
    ,  
    {
      id: 25,
      image: "https://www.themealdb.com/images/media/meals/qptpvt1487339892.jpg",
      title: "Tandoori chicken",
      category: "Lunch",
      country: "Indian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"lemons",quantity:'2 Juice'}, {name:"paprika",quantity:'4 tsp'}, {name:"red onions",quantity:'2 finely chopped'}, {name:"chicken thighs",quantity:'16 skinnless'}, {name:"vegetable oil",quantity:'For brushing'}, {name:"Greek yogurt",quantity:'300ml '}, {name:"ginger",quantity:'large piece'}, {name:"garlic clove",quantity:4}, {name:"garam masala",quantity:'¾ tsp'}, {name:"ground cumin",quantity:'¾ tsp'}, {name:"chilli powder",quantity:'½ tsp'}, {name:"turmeric",quantity:'¼ tsp'},],
      idMeal:52806,
      youtube_Url:"https://www.youtube.com/watch?v=-CKvt1KNU74",
      Instruction:"Mix the lemon juice with the paprika and red onions in a large shallow dish. Slash each chicken thigh three times, then turn them in the juice and set aside for 10 mins.\r\nMix all of the marinade ingredients together and pour over the chicken. Give everything a good mix, then cover and chill for at least 1 hr. This can be done up to a day in advance.\r\nHeat the grill. Lift the chicken pieces onto a rack over a baking tray. Brush over a little oil and grill for 8 mins on each side or until lightly charred and completely cooked through."
    }
    // Chinese
    ,
    {
      id: 26,
      image: "https://www.themealdb.com/images/media/meals/1529444830.jpg",
      title: "Beef Lo Mein",
      category: "Dinner",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Beef",quantity:'1/2 lb'}, {name:"Salt",quantity:'pinch'}, {name:"Pepper",quantity:'pinch'}, {name:"Sesame Seed Oil",quantity:'2 tsp'}, {name:"Egg",quantity:'1/2 '}, {name:"Starch",quantity:'3 tbs'}, {name:"Oil",quantity:'5 tbs'}, {name:"Noodles",quantity:'1/4 lb'}, {name:"Onion",quantity:'1/2 cup '}, {name:"Minced Garlic",quantity:'1 tsp '}, {name:"Ginger",quantity:'1 tsp '}, {name:"Bean Sprouts",quantity:'1 cup '}, {name:"Mushrooms",quantity:'1 cup '}, {name:"Water",quantity:'1 cup '}, {name:"Oyster Sauce",quantity:'1 tbs'}, {name:"Sugar",quantity:'1 tsp '}, {name:"Soy Sauce",quantity:'1 tsp  '},],
      idMeal:52952,
      youtube_Url:"https://www.youtube.com/watch?v=ZT9LSsNXXe0",
      Instruction:"STEP 1 - MARINATING THE BEEF\r\nIn a bowl, add the beef, salt, 1 pinch white pepper, 1 Teaspoon sesame seed oil, 1/2 egg, corn starch,1 Tablespoon of oil and mix together.\r\nSTEP 2 - BOILING THE THE NOODLES\r\nIn a 6 qt pot add your noodles to boiling water until the noodles are submerged and boil on high heat for 10 seconds. After your noodles is done boiling strain and cool with cold water.\r\nSTEP 3 - STIR FRY\r\nAdd 2 Tablespoons of oil, beef and cook on high heat untill beef is medium cooked.\r\nSet the cooked beef aside\r\nIn a wok add 2 Tablespoon of oil, onions, minced garlic, minced ginger, bean sprouts, mushrooms, peapods and 1.5 cups of water or until the vegetables are submerged in water.\r\nAdd the noodles to wok\r\nTo make the sauce, add oyster sauce, 1 pinch white pepper, 1 teaspoon sesame seed oil, sugar, and 1 Teaspoon of soy sauce.\r\nNext add the beef to wok and stir-fry"
    }
    ,
    {
      id: 27,
      image: "https://www.themealdb.com/images/media/meals/1529446352.jpg",
      title: "Chicken Congee",
      category: "Dinner",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Chicken",quantity:'8 oz '}, {name:"Salt",quantity:'pinch'}, {name:"Pepper",quantity:'pinch'}, {name:"Ginger Cordial",quantity:'1 tsp '}, {name:"Ginger",quantity:'1 tsp '}, {name:"Spring Onions",quantity:'1 tbs'}, {name:"Rice",quantity:'1/2 cup'}, {name:"Water",quantity:'8 cups '}, {name:"Coriander",quantity:'2 oz '},],
      idMeal:52956,
      youtube_Url:"https://www.youtube.com/watch?v=kqEfk801E94",
      Instruction:"STEP 1 - MARINATING THE CHICKEN\r\nIn a bowl, add chicken, salt, white pepper, ginger juice and then mix it together well.\r\nSet the chicken aside.\r\nSTEP 2 - RINSE THE WHITE RICE\r\nRinse the rice in a metal bowl or pot a couple times and then drain the water.\r\nSTEP 2 - BOILING THE WHITE RICE\r\nNext add 8 cups of water and then set the stove on high heat until it is boiling. Once rice porridge starts to boil, set the stove on low heat and then stir it once every 8-10 minutes for around 20-25 minutes.\r\nAfter 25 minutes, this is optional but you can add a little bit more water to make rice porridge to make it less thick or to your preference.\r\nNext add the marinated chicken to the rice porridge and leave the stove on low heat for another 10 minutes.\r\nAfter an additional 10 minutes add the green onions, sliced ginger, 1 pinch of salt, 1 pinch of white pepper and stir for 10 seconds.\r\nServe the rice porridge in a bowl\r\nOptional: add Coriander on top of the rice porridge."
    }
    ,
    {
      id: 28,
      image: "https://www.themealdb.com/images/media/meals/1529446137.jpg",
      title: "Egg Drop Soup",
      category: "Dinner",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Chicken Stock",quantity:'3 cups '}, {name:"Salt",quantity:'1/4 tsp'}, {name:"Sugar",quantity:'1/4 tsp'}, {name:"Pepper",quantity:'pinch'}, {name:"Sesame Seed Oil",quantity:'1 tsp '}, {name:"Peas",quantity:'1/3 cup'}, {name:"Mushrooms",quantity:'1/3 cup'}, {name:"Cornstarch",quantity:'1 tbs'}, {name:"Water",quantity:'2 tbs'}, {name:"Spring Onions",quantity:'1/4 cup'},],
      idMeal:52955,
      youtube_Url:"https://www.youtube.com/watch?v=9XpzHm9QpZg",
      Instruction:"In a wok add chicken broth and wait for it to boil.\r\nNext add salt, sugar, white pepper, sesame seed oil.\r\nWhen the chicken broth is boiling add the vegetables to the wok.\r\nTo thicken the sauce, whisk together 1 Tablespoon of cornstarch and 2 Tablespoon of water in a bowl and slowly add to your soup until it's the right thickness.\r\nNext add 1 egg slightly beaten with a knife or fork and add it to the soup slowly and stir for 8 seconds\r\nServe the soup in a bowl and add the green onions on top."
    }
    ,
    {
      id: 29,
      image: "https://www.themealdb.com/images/media/meals/1529444113.jpg",
      title: "General Tso's Chicken",
      category: "Dessert",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Chicken Breast",quantity:'1 1/2 '}, {name:"Plain Flour",quantity:'3/4 cup '}, {name:"Egg",quantity:1}, {name:"Starch",quantity:'2 tbs'}, {name:"Baking Powder",quantity:'1 tbs'}, {name:"Salt",quantity:'1 tsp '}, {name:"Onion Salt",quantity:'1/2 tsp'}, {name:"Garlic Powder",quantity:'1/4 tsp '}, {name:"Water",quantity:'3/4 cup '}, {name:"Chicken Stock",quantity:'1/2 cup '}, {name:"Duck Sauce",quantity:'1/4 cup'}, {name:"Soy Sauce",quantity:'3 tbs'},{name:"Honey",quantity:'2 tbs'},{name:"Rice Vinegar",quantity:'1 tbs'},{name:"Sesame Seed Oil",quantity:'2 tbs'},{name:"Gochujang",quantity:'1/2 tbs'},{name:"Starch",quantity:'2 tbs'},{name:"Garlic",quantity:'1 clove'},{name:"Spring Onions",quantity:'2 chopped'},{name:"Ginger",quantity:'1 tsp '}],
      idMeal:52951,
      youtube_Url:"https://www.youtube.com/watch?v=wWGwz0iBmvU",
      Instruction:"DIRECTIONS:\r\nSTEP 1 - SAUCE\r\nIn a bowl, add 2 Cups of water, 2 Tablespoon soy sauce, 2 Tablespoon white vinegar, sherry cooking wine, 1/4 Teaspoon white pepper, minced ginger, minced garlic, hot pepper, ketchup, hoisin sauce, and sugar.\r\nMix together well and set aside.\r\nSTEP 2 - MARINATING THE CHICKEN\r\nIn a bowl, add the chicken, 1 pinch of salt, 1 pinch of white pepper, 2 egg whites, and 3 Tablespoon of corn starch\r\nSTEP 3 - DEEP FRY THE CHICKEN\r\nDeep fry the chicken at 350 degrees for 3-4 minutes or until it is golden brown and loosen up the chicken so that they don't stick together.\r\nSet the chicken aside.\r\nSTEP 4 - STIR FRY\r\nAdd the sauce to the wok and then the broccoli and wait until it is boiling.\r\nTo thicken the sauce, whisk together 2 Tablespoon of cornstarch and 4 Tablespoon of water in a bowl and slowly add to your stir-fry until it's the right thickness.\r\nNext add in the chicken and stir-fry for a minute and serve on a plate"
    }
    ,
    {
      id: 30,
      image: "https://www.themealdb.com/images/media/meals/1529445893.jpg",
      title: "Hot and Sour Soup",
      category: "Dessert",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Mushrooms",quantity:'1/3 cup'}, {name:"Wood Ear Mushrooms",quantity:'1/3 cup'}, {name:"Tofu",quantity:'2/3 Cup'}, {name:"Pork",quantity:'1/2 cup '}, {name:"Chicken Stock",quantity:'2-1/2 cups'}, {name:"Salt",quantity:'1/2 tsp'}, {name:"Sugar",quantity:'1/4 tsp'}, {name:"Sesame Seed Oil",quantity:'1 tsp '}, {name:"Pepper",quantity:'1/4 tsp'}, {name:"Hotsauce",quantity:'1/2 tsp'}, {name:"Vinegar",quantity:'1-½ cups'}, {name:"Soy Sauce",quantity:'1 tsp '},{name:"Cornstarch",quantity:'1 tbs'},{name:"Water",quantity:'2 tbs '},{name:"Spring Onions",quantity:'1/4 cup'}],
      idMeal:52954,
      youtube_Url:"https://www.youtube.com/watch?v=KgV9Zq3aSTo",
      Instruction:"STEP 1 - MAKING THE SOUP\r\nIn a wok add chicken broth and wait for it to boil.\r\nNext add salt, sugar, sesame seed oil, white pepper, hot pepper sauce, vinegar and soy sauce and stir for few seconds.\r\nAdd Tofu, mushrooms, black wood ear mushrooms to the wok.\r\nTo thicken the sauce, whisk together 1 Tablespoon of cornstarch and 2 Tablespoon of water in a bowl and slowly add to your soup until it's the right thickness.\r\nNext add 1 egg slightly beaten with a knife or fork and add it to the soup and stir for 8 seconds\r\nServe the soup in a bowl and add the bbq pork and sliced green onions on top."
    }
    ,
    {
      id: 31,
      image: "https://www.themealdb.com/images/media/meals/1525872624.jpg",
      title: "Kung Pao Chicken",
      category: "Dessert",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Sake",quantity:'2 tbs'}, {name:"Soy Sauce",quantity:'2 tbs '}, {name:"Sesame Seed Oil",quantity:'2 tbs'}, {name:"Corn Flour",quantity:'2 tbs'}, {name:"Water",quantity:'2 tbs'}, {name:"Chicken",quantity:'500g'}, {name:"Chilli Powder",quantity:'1 tbs'}, {name:"Rice Vinegar",quantity:'1 tsp '}, {name:"Brown Sugar",quantity:'1 tbs'}, {name:"Spring Onions",quantity:'4 Chopped'}, {name:"Garlic Clove",quantity:'6 cloves'}, {name:"Water Chestnut",quantity:'220g'},{name:"Peanuts",quantity:'100g '}],
      idMeal:52945,
      youtube_Url:"https://www.youtube.com/watch?v=QqdcCHQlOe0",
      Instruction:"Combine the sake or rice wine, soy sauce, sesame oil and cornflour dissolved in water. Divide mixture in half.\r\nIn a glass dish or bowl, combine half of the sake mixture with the chicken pieces and toss to coat. Cover dish and place in refrigerator for about 30 minutes.\r\nIn a medium frying pan, combine remaining sake mixture, chillies, vinegar and sugar. Mix together and add spring onion, garlic, water chestnuts and peanuts. Heat sauce slowly over medium heat until aromatic.\r\nMeanwhile, remove chicken from marinade and sauté in a large frying pan until juices run clear. When sauce is aromatic, add sautéed chicken and let simmer together until sauce thickens."
    }
    ,
    {
      id: 32,
      image: "https://www.themealdb.com/images/media/meals/1525873040.jpg",
      title: "Kung Po Prawns",
      category: "Dinner",
      country: "Chinese",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Prawns",quantity:'400g'}, {name:"Soy Sauce",quantity:'2 tbs '}, {name:"Tomato Puree",quantity:'1 tsp '}, {name:"Corn Flour",quantity:'1 tsp  '}, {name:"Caster Sugar",quantity:'1 tsp '}, {name:"Sunflower Oil",quantity:'1 tsp '}, {name:"Peanuts",quantity:'85g'}, {name:"Chilli",quantity:'3 Large'}, {name:"Brown Sugar",quantity:'1 tbs'}, {name:"Garlic Clove",quantity:'6 cloves'}, {name:"Water Chestnut",quantity:'450g'}, {name:"Ginger",quantity:'to taste'},],
      idMeal:52946,
      youtube_Url:"https://www.youtube.com/watch?v=ysiuZm9FIxs",
      Instruction:"Mix the cornflour and 1 tbsp soy sauce, toss in the prawns and set aside for 10 mins. Stir the vinegar, remaining soy sauce, tomato purée, sugar and 2 tbsp water together to make a sauce.\r\n\r\nWhen you’re ready to cook, heat a large frying pan or wok until very hot, then add 1 tbsp oil. Fry the prawns until they are golden in places and have opened out– then tip them out of the pan.\r\n\r\nHeat the remaining oil and add the peanuts, chillies and water chestnuts. Stir-fry for 2 mins or until the peanuts start to colour, then add the ginger and garlic and fry for 1 more min. Tip in the prawns and sauce and simmer for 2 mins until thickened slightly. Serve with rice."
    }
    ,
    {
      id: 33,
      image: "https://www.themealdb.com/images/media/meals/1525874812.jpg",
      title: "Ma Po Tofu",
      category: "Dessert",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Tofu",quantity:'450g'}, {name:"Minced Beef",quantity:'100g  '}, {name:"Sesame Seed Oil",quantity:'1/2 tbs'}, {name:"Doubanjiang",quantity:'1 1/2 tsp '}, {name:"Fermented Black Beans",quantity:'1/2 tsp'}, {name:"Pepper",quantity:'1 tbs'}, {name:"Salt",quantity:'1/2 tsp'}, {name:"Sichuan pepper",quantity:'1/2 tsp'}, {name:"Soy Sauce",quantity:'1 tbs'}, {name:"Water",quantity:'400ml'}, {name:"Olive Oil",quantity:'2 tbs'}, {name:"Scallions",quantity:'2 chopped'}, {name:"Spring Onions",quantity:4}, {name:"Garlic",quantity:'2 cloves chopped'}, {name:"Ginger",quantity:'4 sliced'}, {name:"Water",quantity:'2 1/2 tbs'},{name:"Cornstarch",quantity:'1 tbs'}],
      idMeal:52947,
      youtube_Url:"https://www.youtube.com/watch?v=IhwPQL9dFYc",
      Instruction:"Add a small pinch of salt and sesame oil to minced beef. Mix well and set aside.\r\nMix 1 tablespoon of cornstarch with 2 and ½ tablespoons of water in a small bowl to make water starch.\r\nCut tofu into square cubes (around 2cms). Bring a large amount of water to a boil and then add a pinch of salt. Slide the tofu in and cook for 1 minute. Move out and drain.\r\nGet a wok and heat up around 2 tablespoons of oil, fry the minced meat until crispy. Transfer out beef out and leave the oil in.\r\nFry doubanjiang for 1 minute over slow fire and then add garlic, scallion white, ginger and fermented black beans to cook for 30 seconds until aroma. Then mix pepper flakes in.\r\nAdd water to the seasonings and bring to boil over high fire. Gently slide the tofu cubes. Add light soy sauce and beef.Slow the heat after boiling and then simmer for 6-8 minutes. Then add chopped garlic greens.\r\nStir the water starch and then pour half of the mixture to the simmering pot. Wait for around 30 seconds and then pour the other half. You can slightly taste the tofu and add pinch of salt if not salty enough. By the way, if you feel it is too spicy, add some sugar can milder the taste. But be carefully as the broth is very hot at this point.\r\nTransfer out when almost all the seasonings stick to tofu cubes. Sprinkle Szechuan peppercorn powder (to taste)and chopped garlic greens if using.\r\nServe immediately with steamed rice."
    }
    ,
    {
      id: 34,
      image: "https://www.themealdb.com/images/media/meals/1529445434.jpg",
      title: "Shrimp Chow Fun",
      category: "Dinner",
      country: "Chinese",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Rice Stick Noodles",quantity:'1/2 bag'}, {name:"Prawns",quantity:'8 oz '}, {name:"Egg",quantity:'1/2  '}, {name:"Pepper",quantity:'pinch'}, {name:"Sesame Seed Oil",quantity:'2 tsp'}, {name:"Cornstarch",quantity:'2 tbs'}, {name:"Oil",quantity:'4 tbs'}, {name:"Minced Garlic",quantity:'1 tsp '}, {name:"Ginger",quantity:'1 tsp '}, {name:"Onion",quantity:'1/2 cup  '}, {name:"Bean Sprouts",quantity:'1 cup  '}, {name:"Spring Onions",quantity:'1/2 cup  '}, {name:"Cooking wine",quantity:'1 tbs '}, {name:"Oyster Sauce",quantity:'1 tbs '}, {name:"Sugar",quantity:'1/2 tbs '}, {name:"Vinegar",quantity:'1/2 tbs '},{name:"Soy Sauce",quantity:'1 tbs'}],
      idMeal:52953,
      youtube_Url:"https://www.youtube.com/watch?v=wzaTcpoFEaY",
      Instruction:"STEP 1 - SOAK THE RICE NOODLES\r\nSoak the rice noodles overnight untill they are soft\r\nSTEP 2 - BOIL THE RICE NOODLES\r\nBoil the noodles for 10-15 minutes and then rinse with cold water to stop the cooking process of the noodles.\r\nSTEP 3 -MARINATING THE SHRIMP\r\nIn a bowl add the shrimp, egg, 1 pinch of white pepper, 1 Teaspoon of sesame seed oil, 1 Tablespoon corn starch and 1 tablespoon of oil\r\nMix together well\r\nSTEP 4 - STIR FRY\r\nIn a wok add 2 Tablespoons of oil, shrimp and stir fry them until it is golden brown\r\nSet the shrimp aside\r\nAdd 1 Tablespoon of oil to the work and then add minced garlic, ginger and all of the vegetables.\r\nAdd the noodles to the wok\r\nNext add sherry cooking wine, oyster sauce, sugar, vinegar, sesame seed oil, 1 pinch white pepper, and soy sauce\r\nAdd back in the shrimp\r\nTo thicken the sauce, whisk together 1 Tablespoon of corn starch and 2 Tablespoon of water in a bowl and slowly add to your stir-fry until it's the right thickness."
    }
    ,
    {
      id: 35,
      image: "https://www.themealdb.com/images/media/meals/1529442316.jpg",
      title: "Sweet and Sour Pork",
      category: "Dinner",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Pork",quantity:'200g'}, {name:"Egg",quantity:'1'}, {name:"Water",quantity:'Dash '}, {name:"Salt",quantity:'1/2 tsp'}, {name:"Sugar",quantity:'1 tsp '}, {name:"Soy Sauce",quantity:'10g'}, {name:"Starch",quantity:'10g'}, {name:"Tomato Puree",quantity:'30g'}, {name:"Vinegar",quantity:'10g'}, {name:"Coriander",quantity:'Dash '},],
      idMeal:52949,
      youtube_Url:"https://www.youtube.com/watch?v=mdaBIhgEAMo",
      Instruction:"Preparation\r\n1. Crack the egg into a bowl. Separate the egg white and yolk.\r\n\r\nSweet and Sour Pork\r\n2. Slice the pork tenderloin into strips.\r\n\r\n3. Prepare the marinade using a pinch of salt, one teaspoon of starch, two teaspoons of light soy sauce, and an egg white.\r\n\r\n4. Marinade the pork strips for about 20 minutes.\r\n\r\n5. Put the remaining starch in a bowl. Add some water and vinegar to make a starchy sauce.\r\n\r\nSweet and Sour Pork\r\nCooking Instructions\r\n1. Pour the cooking oil into a wok and heat to 190°C (375°F). Add the marinated pork strips and fry them until they turn brown. Remove the cooked pork from the wok and place on a plate.\r\n\r\n2. Leave some oil in the wok. Put the tomato sauce and white sugar into the wok, and heat until the oil and sauce are fully combined.\r\n\r\n3. Add some water to the wok and thoroughly heat the sweet and sour sauce before adding the pork strips to it.\r\n\r\n4. Pour in the starchy sauce. Stir-fry all the ingredients until the pork and sauce are thoroughly mixed together.\r\n\r\n5. Serve on a plate and add some coriander for decoration."
    }
    ,
    {
      id: 36,
      image: "https://www.themealdb.com/images/media/meals/1529443236.jpg",
      title: "Szechuan Beef",
      category: "Dessert",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Beef",quantity:'1/2 lb'}, {name:"Salt",quantity:'1/2 tsp'}, {name:"Sesame Seed Oil",quantity:'1 tsp  '}, {name:"Pepper",quantity:'1 pinch'}, {name:"Egg White",quantity:1}, {name:"Starch",quantity:'3 tbs'}, {name:"Oil",quantity:'4 tbs'}, {name:"Ginger",quantity:'1 tsp '}, {name:"Garlic",quantity:'1 tsp '}, {name:"Onion",quantity:'3/4 cup '}, {name:"Carrots",quantity:'1/2 cup '}, {name:"Green Pepper",quantity:'3/4 cup '}, {name:"Celery",quantity:'1 cup '}, {name:"Mushrooms",quantity:'1 cup '}, {name:"Cooking wine",quantity:'1 tbs'}, {name:"Water",quantity:'1 cup '}, {name:"Oyster Sauce",quantity:'1 tbs'}, {name:"Hotsauce",quantity:'1/2 tsp'}, {name:"Sugar",quantity:'1 tsp '}, {name:"Soy Sauce",quantity:'1 tbs'}, ],
      idMeal:52950,
      youtube_Url:"https://www.youtube.com/watch?v=SQGZqZYz7Ms",
      Instruction:"STEP 1 - MARINATING THE BEEF\r\nIn a bowl, add the beef, salt, sesame seed oil, white pepper, egg white, 2 Tablespoon of corn starch and 1 Tablespoon of oil.\r\nSTEP 2 - STIR FRY\r\nFirst Cook the beef by adding 2 Tablespoon of oil until the beef is golden brown.\r\nSet the beef aside\r\nIn a wok add 1 Tablespoon of oil, minced ginger, minced garlic and stir-fry for few seconds.\r\nNext add all of the vegetables and then add sherry cooking wine and 1 cup of water.\r\nTo make the sauce add oyster sauce, hot pepper sauce, and sugar.\r\nadd the cooked beef and 1 spoon of soy sauce\r\nTo thicken the sauce, whisk together 1 Tablespoon of cornstarch and 2 Tablespoon of water in a bowl and slowly add to your stir-fry until it's the right thickness."
    }
    ,
    {
      id: 37,
      image: "https://www.themealdb.com/images/media/meals/1525876468.jpg",
      title: "Szechuan Beef",
      category: "Dinner",
      country: "Chinese",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Pork",quantity:'1lb'}, {name:"Garlic Clove",quantity:'3 chopped'}, {name:"Ginger",quantity:'1 tsp '}, {name:"Soy Sauce",quantity:'1 tbs'}, {name:"Sesame Seed Oil",quantity:'1 tsp '}, {name:"Carrots",quantity:'3 finely chopped'}, {name:"Celery",quantity:'3 finely chopped'}, {name:"Spring Onions",quantity:'6 chopped'}, {name:"Wonton Skin",quantity:'1 Packet'}, {name:"Oil",quantity:'Fry'}, {name:"Water",quantity:'Bottle'},],
      idMeal:52948,
      youtube_Url:"https://www.youtube.com/watch?v=9h9No18ZyCI",
      Instruction:"Combine pork, garlic, ginger, soy sauce, sesame oil, and vegetables in a bowl.\r\nSeparate wonton skins.\r\nPlace a heaping teaspoon of filling in the center of the wonton.\r\nBrush water on 2 borders of the skin, covering 1/4 inch from the edge.\r\nFold skin over to form a triangle, sealing edges.\r\nPinch the two long outside points together.\r\nHeat oil to 450 degrees and fry 4 to 5 at a time until golden.\r\nDrain and serve with sauce."
    }

    // Italian
    ,
    {
      id: 38,
      image: "https://www.themealdb.com/images/media/meals/1549542877.jpg",
      title: "Budino Di Ricotta",
      category: "Dinner",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Ricotta",quantity:'500g'}, {name:"Eggs",quantity:'4 large'}, {name:"Flour",quantity:'3 tbs'}, {name:"Sugar",quantity:'250g'}, {name:"Cinnamon",quantity:'1 tsp '}, {name:"Lemons",quantity:'Grated Zest of 2'}, {name:"Dark Rum",quantity:'5 tbs'}, {name:"Icing Sugar",quantity:'sprinking'},],
      idMeal:52961,
      youtube_Url:"https://www.youtube.com/watch?v=6dzd6Ra6sb4",
      Instruction:"Mash the ricotta and beat well with the egg yolks, stir in the flour, sugar, cinnamon, grated lemon rind and the rum and mix well. You can do this in a food processor. Beat the egg whites until stiff, fold in and pour into a buttered and floured 25cm cake tin. Bake in the oven at 180ºC/160ºC fan/gas 4 for about 40 minutes, or until it is firm.\r\n\r\nServe hot or cold dusted with icing sugar."
    }
    ,
    {
      id: 39,
      image: "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg",
      title: "Chicken Alfredo Primavera",
      category: "Lunch",
      country: "Italian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Butter",quantity:'2 tablespoons '}, {name:"Olive Oil",quantity:'3 tablespoons'}, {name:"Chicken",quantity:'5 boneless '}, {name:"Salt",quantity:'1 teaspoon'}, {name:"Squash",quantity:'1 cut into 1/2-inch cubes'}, {name:"Broccoli",quantity:'1 Head chopped'}, {name:"mushrooms",quantity:'8-ounce sliced'}, {name:"Pepper",quantity:'1 red'}, {name:"onion",quantity:'1 chopped'}, {name:"garlic",quantity:'3 cloves'}, {name:"red pepper flakes",quantity:'1/2 teaspoon'}, {name:"white wine",quantity:'1/2 cup'}, {name:"milk",quantity:'1/2 cup'}, {name:"heavy cream",quantity:'1/2 cup'}, {name:"Parmesan cheese",quantity:'1 cup grated'}, {name:"bowtie pasta",quantity:'16 ounces'}, {name:"Salt",quantity:'pinch'}, {name:"Pepper",quantity:'pinch '}, {name:"Parsley",quantity:'chopped'},],
      idMeal:52796,
      youtube_Url:"https://www.youtube.com/watch?v=qCIbq8HywpQ",
      Instruction:"Heat 1 tablespoon of butter and 2 tablespoons of olive oil in a large skillet over medium-high heat. Season both sides of each chicken breast with seasoned salt and a pinch of pepper. Add the chicken to the skillet and cook for 5-7 minutes on each side, or until cooked through.  While the chicken is cooking, bring a large pot of water to a boil. Season the boiling water with a few generous pinches of kosher salt. Add the pasta and give it a stir. Cook, stirring occasionally, until al dente, about 12 minutes. Reserve 1/2 cup of  pasta water before draining the pasta.  Remove the chicken from the pan and transfer it to a cutting board; allow it to rest. Turn the heat down to medium and dd the remaining 1 tablespoon of butter and olive oil to the same pan you used to cook the chicken. Add the veggies (minus the garlic) and red pepper flakes to the pan and stir to coat with the oil and butter (refrain from seasoning with salt until the veggies are finished browning). Cook, stirring often, until the veggies are tender, about 5 minutes. Add the garlic and a generous pinch of salt and pepper to the pan and cook for 1 minute.  Deglaze the pan with the white wine. Continue to cook until the wine has reduced by half, about 3 minutes. Stir in the milk, heavy cream, and reserved pasta water. Bring the mixture to a gentle boil and allow to simmer and reduce for 2-3 minutes. Turn off the heat and add the Parmesan cheese and cooked pasta. Season with salt and pepper to taste. Garnish with Parmesan cheese and chopped parsley, if desired. "
    }
    ,
    {
      id: 40,
      image: "https://www.themealdb.com/images/media/meals/usywpp1511189717.jpg",
      title: "Chilli prawn linguine",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Linguine Pasta",quantity:'280g '}, {name:"Sugar Snap Peas",quantity:'200g'}, {name:"Olive Oil",quantity:'2 tblsp '}, {name:"Garlic Clove",quantity:'2 cloves chopped'}, {name:"Red Chilli",quantity:'1 large'}, {name:"King Prawns",quantity:'24 Skinned'}, {name:"Cherry Tomatoes",quantity:12}, {name:"Basil Leaves",quantity:'Handful'}, {name:"Lettuce",quantity:'Leaves'}, {name:"Bread",quantity:'to serve'}, {name:"Fromage Frais",quantity:'2 tbsp'}, {name:"Lime",quantity:'Grated Zest of 2'}, {name:"Caster Sugar",quantity:'2 tsp'},],
      idMeal:52839,
      youtube_Url:"https://www.youtube.com/watch?v=SC17Mc70Db0",
      Instruction:"Mix the dressing ingredients in a small bowl and season with salt and pepper. Set aside.\r\n\r\nCook the pasta according to the packet instructions. Add the sugar snap peas for the last minute or so of cooking time.\r\n\r\nMeanwhile, heat the oil in a wok or large frying pan, toss in the garlic and chilli and cook over a fairly gentle heat for about 30 seconds without letting the garlic brown. Tip in the prawns and cook over a high heat, stirring frequently, for about 3 minutes until they turn pink.\r\n\r\nAdd the tomatoes and cook, stirring occasionally, for 3 minutes until they just start to soften. Drain the pasta and sugar snaps well, then toss into the prawn mixture. Tear in the basil leaves, stir, and season with salt and pepper.\r\n\r\nServe with salad leaves drizzled with the lime dressing, and warm crusty bread."
    }
    ,
    {
      id: 41,
      image: "https://www.themealdb.com/images/media/meals/0jv5gx1661040802.jpg",
      title: "Fettuccine Alfredo",
      category: "Dinner",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Fettuccine",quantity:'1 lb '}, {name:"Heavy Cream",quantity:'1/2 cup '}, {name:"Butter",quantity:'1/2 cup '}, {name:"Parmesan",quantity:'1/2 cup  '}, {name:"Parsley",quantity:'2 tbsp'}, {name:"Black Pepper",quantity:''},],
      idMeal:53064,
      youtube_Url:"https://www.youtube.com/watch?v=LPPcNPdq_j4",
      Instruction:"Cook pasta according to package instructions in a large pot of boiling water and salt. Add heavy cream and butter to a large skillet over medium heat until the cream bubbles and the butter melts. Whisk in parmesan and add seasoning (salt and black pepper). Let the sauce thicken slightly and then add the pasta and toss until coated in sauce. Garnish with parsley, and it's ready."
    }
    ,
    {
      id: 42,
      image: "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
      title: "Fettucine alfredo",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Clotted Cream",quantity:'227g '}, {name:"Butter",quantity:'25g'}, {name:"Corn Flour",quantity:'1 tsp '}, {name:"Parmesan Cheese",quantity:'100g '}, {name:"Nutmeg",quantity:'Grated'}, {name:"Fettuccine",quantity:'250g'}, {name:"Parsley",quantity:'Chopped'},],
      idMeal:52835,
      youtube_Url:"https://www.youtube.com/watch?v=FLEnwZvGzOE",
      Instruction:"In a medium saucepan, stir the clotted cream, butter and cornflour over a low-ish heat and bring to a low simmer. Turn off the heat and keep warm.\r\nMeanwhile, put the cheese and nutmeg in a small bowl and add a good grinding of black pepper, then stir everything together (don’t add any salt at this stage).\r\nPut the pasta in another pan with 2 tsp salt, pour over some boiling water and cook following pack instructions (usually 3-4 mins). When cooked, scoop some of the cooking water into a heatproof jug or mug and drain the pasta, but not too thoroughly.\r\nAdd the pasta to the pan with the clotted cream mixture, then sprinkle over the cheese and gently fold everything together over a low heat using a rubber spatula. When combined, splash in 3 tbsp of the cooking water. At first, the pasta will look wet and sloppy: keep stirring until the water is absorbed and the sauce is glossy. Check the seasoning before transferring to heated bowls. Sprinkle over some chives or parsley, then serve immediately."
    }
    ,
    {
      id: 43,
      image: "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
      title: "Lasagne",
      category: "Dessert",
      country: "Italian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Olive Oil",quantity:'1 tblsp '}, {name:"Bacon",quantity:'2'}, {name:"Onion",quantity:'1 finely chopped '}, {name:"Celery",quantity:'1 Stick'}, {name:"Carrots",quantity:'1 medium'}, {name:"Garlic",quantity:'2 cloves chopped'}, {name:"Minced Beef",quantity:'500g'}, {name:"Tomato Puree",quantity:'1 tbls'}, {name:"Chopped Tomatoes",quantity:'800g'}, {name:"Honey",quantity:'1 tblsp '}, {name:"Lasagne Sheets",quantity:'500g'}, {name:"Creme Fraiche",quantity:'400ml'}, {name:"Mozzarella Balls",quantity:'125g'}, {name:"Parmesan Cheese",quantity:'50g'}, {name:"Basil Leaves",quantity:'Topping'},],
      idMeal:52844,
      youtube_Url:"https://www.youtube.com/watch?v=gfhfsBPt46s",
      Instruction:"Heat the oil in a large saucepan. Use kitchen scissors to snip the bacon into small pieces, or use a sharp knife to chop it on a chopping board. Add the bacon to the pan and cook for just a few mins until starting to turn golden. Add the onion, celery and carrot, and cook over a medium heat for 5 mins, stirring occasionally, until softened.\r\nAdd the garlic and cook for 1 min, then tip in the mince and cook, stirring and breaking it up with a wooden spoon, for about 6 mins until browned all over.\r\nStir in the tomato purée and cook for 1 min, mixing in well with the beef and vegetables. Tip in the chopped tomatoes. Fill each can half full with water to rinse out any tomatoes left in the can, and add to the pan. Add the honey and season to taste. Simmer for 20 mins.\r\nHeat oven to 200C/180C fan/gas 6. To assemble the lasagne, ladle a little of the ragu sauce into the bottom of the roasting tin or casserole dish, spreading the sauce all over the base. Place 2 sheets of lasagne on top of the sauce overlapping to make it fit, then repeat with more sauce and another layer of pasta. Repeat with a further 2 layers of sauce and pasta, finishing with a layer of pasta.\r\nPut the crème fraîche in a bowl and mix with 2 tbsp water to loosen it and make a smooth pourable sauce. Pour this over the top of the pasta, then top with the mozzarella. Sprinkle Parmesan over the top and bake for 25–30 mins until golden and bubbling. Serve scattered with basil, if you like."
    }
    ,
    {
      id: 44,
      image: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg",
      title: "Mediterranean Pasta Salad",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"mozzarella balls",quantity:'200 g'}, {name:"baby plum tomatoes",quantity:'250 g'}, {name:"fresh basil",quantity:'1  bunch'}, {name:"farfalle",quantity:'350 g'}, {name:"extra virgin olive oil",quantity:'3  tablespoons'}, {name:"Green Olives",quantity:'40 g'}, {name:"tuna",quantity:'200 g'}, {name:"salt",quantity:'to taste'}, {name:"pepper",quantity:'to taste'},],
      idMeal:52777,
      youtube_Url:"https://www.youtube.com/watch?v=e52IL8zYmaE",
      Instruction:"Bring a large saucepan of salted water to the boil\r\nAdd the pasta, stir once and cook for about 10 minutes or as directed on the packet.\r\nMeanwhile, wash the tomatoes and cut into quarters. Slice the olives. Wash the basil.\r\nPut the tomatoes into a salad bowl and tear the basil leaves over them. Add a tablespoon of olive oil and mix.\r\nWhen the pasta is ready, drain into a colander and run cold water over it to cool it quickly.\r\nToss the pasta into the salad bowl with the tomatoes and basil.\r\nAdd the sliced olives, drained mozzarella balls, and chunks of tuna. Mix well and let the salad rest for at least half an hour to allow the flavours to mingle.\r\nSprinkle the pasta with a generous grind of black pepper and drizzle with the remaining olive oil just before serving."
    }
    ,
    {
      id: 45,
      image: "https://www.themealdb.com/images/media/meals/wwuqvt1487345467.jpg",
      title: "Osso Buco alla Milanese",
      category: "Lunch",
      country: "Italian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Veal",quantity:'4 meaty shanks'}, {name:"Flour",quantity:'½ cup'}, {name:"Olive Oil",quantity:'2 tablespoons  '}, {name:"Butter",quantity:'3 tablespoons'}, {name:"Onion",quantity:'1 medium chopped into ½-inch pieces'}, {name:"Carrot",quantity:'1 chopped into ½-inch pieces'}, {name:"Celery",quantity:'1 chopped into ½-inch pieces'}, {name:"Fennel",quantity:'1 bulb chopped into ½-inch pieces'}, {name:"Garlic",quantity:'3 cloves'}, {name:"Orange Zest",quantity:'2 strips'}, {name:"Marjoram",quantity:'1 ½ teaspoons'}, {name:"Bay Leaf",quantity:1}, {name:"Dry White Wine",quantity:'1 cup'}, {name:"Chicken Stock",quantity:'½ cup '}, {name:"Tomatoes",quantity:'1 cup chopped with juice'}, {name:"Parsley",quantity:'2 tablespoons chopped'}, {name:"Garlic",quantity:'1 teaspoon minced'}, {name:"Lemon Zest",quantity:'1 teaspoon grated '},],
      idMeal:52810,
      youtube_Url:"https://www.youtube.com/watch?v=9GUTC2Qwrf0",
      Instruction:"Heat the oven to 300 degrees.\r\nDredging the shanks: pour the flour into a shallow dish (a pie plate works nicely). Season the veal shanks on all sides with salt and pepper. One at a time, roll the shanks around in the flour coat, and shake and pat the shank to remove any excuses flour. Discard the remaining flour.\r\nBrowning the shanks: put the oil and 1 tablespoon of the butter in a wide Dutch oven or heavy braising pot (6 to 7 quart) and heat over medium-high heat. When the butter has melted and the oil is shimmering, lower the shanks into the pot, flat side down; if the shanks won’t fit without touching one another, do this in batches. Brown the shanks, turning once with tongs, until both flat sides are well caramelized, about 5 minutes per side. If the butter-oil mixture starts to burn, lower the heat just a bit. Transfer the shanks to a large platter or tray and set aside.\r\nThe aromatics: pour off and discard the fat from the pot. Wipe out any burnt bits with a damp paper towel, being careful not to remove any delicious little caramelized bits. Ad the remaining 2 tablespoons butter to the pot and melt it over medium heat. When the butter has stopped foaming, add the onion, carrot, celery, and fennel. Season with salt and pepper, stir, and cook the vegetables until they begin to soften but do not brown, about 6 minutes. Stir in the garlic, orange zest, marjoram, and bay leaf, and stew for another minute or two.\r\nThe braising liquid: add the wine, increase the heat to high, and bring to a boil. Boil, stirring occasionally, to reduce the wine by about half, 5 minutes. Add the stock and tomatoes, with their juice, and boil again to reduce the liquid to about 1 cup total, about 10 minutes.\r\nThe braise: Place the shanks in the pot so that they are sitting with the exposed bone facing up, and pour over any juices that accumulated as they sat. Cover with parchment paper, pressing down so the parchment nearly touches the veal and the edges hang over the sides of the pot by about an inch. Cover tightly with the lid, and slide into the lower part of the oven to braise at a gentle simmer. Check the pot after the first 15 minutes, and if the liquid is simmering too aggressively, lower the oven heat by 10 or 15 degrees. Continue braising, turning the shanks and spooning some pan juices over the top after the first 40 minutes, until the meat is completely tender and pulling away from the bone, about 2 hours.\r\nThe gremolata: While the shanks are braising, stir together the garlic, parsley, and lemon zest in a small bowl. Cover with plastic wrap and set aside in a cool place (or the refrigerator, if your kitchen is very warm.)\r\nThe finish: When the veal is fork-tender and falling away from the bone, remove the lid and sprinkle over half of the gremolata. Return the veal to the oven, uncovered, for another 15 minutes to caramelize it some.\r\nUsing a slotted spatula or spoon, carefully lift the shanks from the braising liquid, doing your best to keep them intact. The shanks will be very tender and threatening to fall into pieces, and the marrow will be wobbly inside the bones, so this can be a bit tricky. But if they do break apart, don’t worry, the flavor won’t suffer at all. Arrange the shanks on a serving platter or other large plate, without stacking, and cover with foil to keep warm.\r\nFinishing the sauce: Set the braising pot on top of the stove and evaluate the sauce: if there is a visible layer of fat floating on the surface, use a large spoon to skim it off and discard it. Taste the sauce for concentration of flavor. If it tastes a bit weak or flat, bring it to a boil over high heat, and boil to reduce the volume and intensify the flavor for 5 to 10 minutes. Taste again for salt and pepper. If the sauce wants more zip, stir in a teaspoon or two of the remaining gremolata.\r\nPortioning the veal shanks: if the shanks are reasonably sized, serve one per person. If the shanks are gargantuan or you’re dealing with modest appetites, pull apart the larger shanks, separating them at their natural seams, and serve smaller amounts. Be sure to give the marrow bones to whomever prizes them most.\r\nServing: Arrange the veal shanks on warm dinner plates accompanied by the risotto, if serving. Just before carrying the plates to the table, sprinkle on the remaining gremolata and then spoon over a generous amount of sauce – the contact with the hot liquid will aromatize the gremolata and perk up everyone’s appetite with the whiff of garlic and lemon."
    }
    ,
    {
      id: 46,
      image: "https://www.themealdb.com/images/media/meals/vvtvtr1511180578.jpg",
      title: "Pilchard puttanesca",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Spaghetti",quantity:'300g'}, {name:"Olive Oil",quantity:'1 tbls '}, {name:"Onion",quantity:'1 finely chopped '}, {name:"Garlic",quantity:'2 cloves minced'}, {name:"Red Chilli",quantity:1}, {name:"Tomato Puree",quantity:'1 tbls'}, {name:"Pilchards",quantity:'425g'}, {name:"Black Olives",quantity:'70g'}, {name:"Parmesan",quantity:'Shaved'},],
      idMeal:52837,
      youtube_Url:"https://www.youtube.com/watch?v=wqZzLAPmr9k",
      Instruction:"Cook the pasta following pack instructions. Heat the oil in a non-stick frying pan and cook the onion, garlic and chilli for 3-4 mins to soften. Stir in the tomato purée and cook for 1 min, then add the pilchards with their sauce. Cook, breaking up the fish with a wooden spoon, then add the olives and continue to cook for a few more mins.\r\n\r\nDrain the pasta and add to the pan with 2-3 tbsp of the cooking water. Toss everything together well, then divide between plates and serve, scattered with Parmesan."
    }
    ,
    {
      id: 47,
      image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      title: "Pizza Express Margherita",
      category: "Brunch",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Water",quantity:'150ml'}, {name:"Sugar",quantity:'1 tsp '}, {name:"Yeast",quantity:'15g'}, {name:"Plain Flour",quantity:'225g'}, {name:"Salt",quantity:'1 1/2 tsp '}, {name:"Olive Oil",quantity:'Drizzle'}, {name:"Passata",quantity:'80g'}, {name:"Mozzarella",quantity:'70g'}, {name:"Oregano",quantity:'Peeled and Sliced'}, {name:"Basil",quantity:'Leaves'}, {name:"Black Pepper",quantity:'Pinch'},],
      idMeal:53014,
      youtube_Url:"https://www.youtube.com/watch?v=Mt5lgUZRoUg",
      Instruction:"1 Preheat the oven to 230°C.\r\n\r\n2 Add the sugar and crumble the fresh yeast into warm water.\r\n\r\n3 Allow the mixture to stand for 10 – 15 minutes in a warm place (we find a windowsill on a sunny day works best) until froth develops on the surface.\r\n\r\n4 Sift the flour and salt into a large mixing bowl, make a well in the middle and pour in the yeast mixture and olive oil.\r\n\r\n5 Lightly flour your hands, and slowly mix the ingredients together until they bind.\r\n\r\n6 Generously dust your surface with flour.\r\n\r\n7 Throw down the dough and begin kneading for 10 minutes until smooth, silky and soft.\r\n\r\n8 Place in a lightly oiled, non-stick baking tray (we use a round one, but any shape will do!)\r\n\r\n9 Spread the passata on top making sure you go to the edge.\r\n\r\n10 Evenly place the mozzarella (or other cheese) on top, season with the oregano and black pepper, then drizzle with a little olive oil.\r\n\r\n11 Cook in the oven for 10 – 12 minutes until the cheese slightly colours.\r\n\r\n12 When ready, place the basil leaf on top and tuck in!"
    }
    ,
    {
      id: 48,
      image: "https://www.themealdb.com/images/media/meals/xrrwpx1487347049.jpg",
      title: "PRibollita",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"olive oil",quantity:'5 tablespoons'}, {name:"Onion",quantity:'1 chopped'}, {name:"Carrot",quantity:'1 chopped'}, {name:"Celery",quantity:'1 stalk chopped'}, {name:"Garlic",quantity:'1 tablespoon minced'}, {name:"Cannellini Beans",quantity:'2 cups'}, {name:"Canned tomatoes",quantity:1}, {name:"Water",quantity:'4 cups'}, {name:"Rosemary",quantity:'1 fresh sprig'}, {name:"Thyme",quantity:'1 fresh sprig'}, {name:"Kale",quantity:'1 pound chopped'}, {name:"Wholegrain Bread",quantity:'4 thick slices'}, {name:"Red Onion",quantity:'1 thinly sliced'}, {name:"Parmesan",quantity:'½ cup freshly grated'},],
      idMeal:52811,
      youtube_Url:"https://www.youtube.com/watch?v=BiQUYTBb6eQ",
      Instruction:"Put 2 tablespoons of the oil in a large pot over medium heat. When it’s hot, add onion, carrot, celery and garlic; sprinkle with salt and pepper and cook, stirring occasionally, until vegetables are soft, 5 to 10 minutes.\r\nHeat the oven to 500 degrees. Drain the beans; if they’re canned, rinse them as well. Add them to the pot along with tomatoes and their juices and stock, rosemary and thyme. Bring to a boil, then reduce heat so the soup bubbles steadily; cover and cook, stirring once or twice to break up the tomatoes, until the flavors meld, 15 to 20 minutes.\r\nFish out and discard rosemary and thyme stems, if you like, and stir in kale. Taste and adjust seasoning. Lay bread slices on top of the stew so they cover the top and overlap as little as possible. Scatter red onion slices over the top, drizzle with the remaining 3 tablespoons oil and sprinkle with Parmesan.\r\nPut the pot in the oven and bake until the bread, onions and cheese are browned and crisp, 10 to 15 minutes. (If your pot fits under the broiler, you can also brown the top there.) Divide the soup and bread among 4 bowls and serve."
    }
    ,
    {
      id: 49,
      image: "https://www.themealdb.com/images/media/meals/qtqvys1468573168.jpg",
      title: "Rigatoni with fennel sausage sauce",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"olive oil",quantity:'2½ tbsp'}, {name:"Italian fennel sausages",quantity:'6 cut into 1.5cm-thick slices'}, {name:"onion",quantity:'1 large peeled and chopped'}, {name:"fennel bulb",quantity:'1 trimmed and roughly chopped; reserve any fronds to garnish '}, {name:"smoky paprika",quantity:'½ tsp'}, {name:"garlic",quantity:'1 clove, peeled and sliced'}, {name:"fennel seeds",quantity:'2 tsp lightly toasted and then gently crushed'}, {name:"red wine",quantity:'100ml'}, {name:"chopped tomatoeschopped tomatoes",quantity:'400g tinned'}, {name:"caster sugar",quantity:'½ tsp'}, {name:"pitted black olives",quantity:'50g cut in half lengthways'}, {name:"rigatoni",quantity:'500g'}, {name:"pecorino",quantity:'30g roughly crumbled into 0.5cm pieces'}, {name:"anchovy fillet",quantity:'1  rinsed and patted dry'}, {name:"olive oil",quantity:'1 clove, peeled and crushed'}, {name:"basil leaves",quantity:'60ml'}, {name:"basil leaves",quantity:'50g torn'},],
      idMeal:52783,
      youtube_Url:"https://www.youtube.com/watch?v=45dpOfESxr8",
      Instruction:"Heat a tablespoon of oil in a large saute pan for which you have a lid. Add the sausage pieces and fry on a medium-high heat for 10 minutes, stirring regularly, until golden-brown all over. Transfer the sausages to a plate, then add the onion and fennel to the hot pan and fry for 15 minutes, stirring once in a while, until soft and caramelised; if the pan goes a bit dry, add a teaspoon or so of extra oil. Stir in the paprika, garlic and half the fennel seeds, fry for two minutes more, then pour on the wine and boil for 30 seconds, to reduce by half. Add the tomatoes, sugar, 100ml water, the seared sausage and half a teaspoon of salt, cover and simmer for 30 minutes; remove the lid after 10 minutes, and cook until the sauce is thick and rich. Remove from the heat, stir through the olives and remaining fennel seeds and set aside until you’re ready to serve.\r\n\r\nBring a large pot of salted water to a boil, add the pasta and cook for 12-14 minutes (or according to the instructions on the packet), until al dente. Meanwhile, reheat the sauce. Drain the pasta, return it to the pot, stir in a tablespoon of oil, then divide between the bowls. \r\n\r\nPut all the pesto ingredients except the basil in the small bowl of a food processor. Add a tablespoon of water and blitz to a rough paste. Add the basil, then blitz until just combined (the pesto has a much better texture if the basil is not overblended).\r\n\r\nSpoon over the ragù and top with a spoonful of pesto. Finish with a sprinkling of chopped fennel fronds, if you have any, and serve at once."
    }
    ,
    {
      id: 50,
      image: "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",
      title: "Salmon Prawn Risotto",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"butter",quantity:'50g/2oz'}, {name:"onion",quantity:'1 finely chopped '}, {name:"rice",quantity:'150g'}, {name:"white wine",quantity:'125ml '}, {name:"vegetable stock",quantity:'1 litre hot'}, {name:"lemon",quantity:'The juice and zest of one'}, {name:"King Prawns",quantity:'240g large'}, {name:"salmon",quantity:'150g'}, {name:"asparagus",quantity:'100g tips blanched briefly in boiling water'}, {name:"black pepper",quantity:'ground'}, {name:"Parmesan",quantity:'50g shavings'},],
      idMeal:52823,
      youtube_Url:"https://www.youtube.com/watch?v=V2PMvBv52IE",
      Instruction:"Melt the butter in a thick-based pan and gently cook the onion without colour until it is soft.\r\nAdd the rice and stir to coat all the grains in the butter\r\nAdd the wine and cook gently stirring until it is absorbed\r\nGradually add the hot stock, stirring until each addition is absorbed. Keep stirring until the rice is tender\r\nSeason with the lemon juice and zest, and pepper to taste. (there will probably be sufficient saltiness from the salmon to not need to add salt) Stir gently to heat through\r\nServe scattered with the Parmesan and seasonal vegetables.\r\nGrill the salmon and gently place onto the risotto with the prawns and asparagus"
    }
    ,
    {
      id: 51,
      image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
      title: "Spaghetti alla Carbonara",
      category: "Breakfast",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Spaghetti",quantity:'320g'}, {name:"Egg Yolks",quantity:6}, {name:"Salt",quantity:'As required'}, {name:"Bacon",quantity:'150g'}, {name:"Pecorino",quantity:'50g'},, {name:"Black Pepper",quantity:'As required'},],
      idMeal:52982,
      youtube_Url:"https://www.youtube.com/watch?v=_T6jkRvhlkk",
      Instruction:"STEP 1\r\nPut a large saucepan of water on to boil.\r\n\r\nSTEP 2\r\nFinely chop the 100g pancetta, having first removed any rind. Finely grate 50g pecorino cheese and 50g parmesan and mix them together.\r\n\r\nSTEP 3\r\nBeat the 3 large eggs in a medium bowl and season with a little freshly grated black pepper. Set everything aside.\r\n\r\nSTEP 4\r\nAdd 1 tsp salt to the boiling water, add 350g spaghetti and when the water comes back to the boil, cook at a constant simmer, covered, for 10 minutes or until al dente (just cooked).\r\n\r\nSTEP 5\r\nSquash 2 peeled plump garlic cloves with the blade of a knife, just to bruise it.\r\n\r\nSTEP 6\r\nWhile the spaghetti is cooking, fry the pancetta with the garlic. Drop 50g unsalted butter into a large frying pan or wok and, as soon as the butter has melted, tip in the pancetta and garlic.\r\n\r\nSTEP 7\r\nLeave to cook on a medium heat for about 5 minutes, stirring often, until the pancetta is golden and crisp. The garlic has now imparted its flavour, so take it out with a slotted spoon and discard.\r\n\r\nSTEP 8\r\nKeep the heat under the pancetta on low. When the pasta is ready, lift it from the water with a pasta fork or tongs and put it in the frying pan with the pancetta. Don’t worry if a little water drops in the pan as well (you want this to happen) and don’t throw the pasta water away yet.\r\n\r\nSTEP 9\r\nMix most of the cheese in with the eggs, keeping a small handful back for sprinkling over later.\r\n\r\nSTEP 10\r\nTake the pan of spaghetti and pancetta off the heat. Now quickly pour in the eggs and cheese. Using the tongs or a long fork, lift up the spaghetti so it mixes easily with the egg mixture, which thickens but doesn’t scramble, and everything is coated.\r\n\r\nSTEP 11\r\nAdd extra pasta cooking water to keep it saucy (several tablespoons should do it). You don’t want it wet, just moist. Season with a little salt, if needed.\r\n\r\nSTEP 12\r\nUse a long-pronged fork to twist the pasta on to the serving plate or bowl. Serve immediately with a little sprinkling of the remaining cheese and a grating of black pepper. If the dish does get a little dry before serving, splash in some more hot pasta water and the glossy sauciness will be revived."
    }
    ,
    {
      id: 52,
      image: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
      title: "Spaghetti Bolognese",
      category: "Dinner",
      country: "Italian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"onions",quantity:2}, {name:"garlic",quantity:'1tbsp'}, {name:"lean minced beef",quantity:'1 clove'}, {name:"mushrooms",quantity:'500g '}, {name:"dried oregano",quantity:'90g'},, {name:"tomatoes",quantity:'1tsp'}, {name:"hot beef stock",quantity:'400g can'}, {name:"tomato puree",quantity:'300ml'}, {name:"worcestershire sauce",quantity:'1tbsp'}, {name:"spaghetti",quantity:'1tbsp'}, {name:"parmesan",quantity:'350g'},],
      idMeal:52770,
      youtube_Url:"https://www.youtube.com/watch?v=-gF8d-fitkU",
      Instruction:"Put the onion and oil in a large pan and fry over a fairly high heat for 3-4 mins. Add the garlic and mince and fry until they both brown. Add the mushrooms and herbs, and cook for another couple of mins.\r\n\r\nStir in the tomatoes, beef stock, tomato ketchup or purée, Worcestershire sauce and seasoning. Bring to the boil, then reduce the heat, cover and simmer, stirring occasionally, for 30 mins.\r\n\r\nMeanwhile, cook the spaghetti in a large pan of boiling, salted water, according to packet instructions. Drain well, run hot water through it, put it back in the pan and add a dash of olive oil, if you like, then stir in the meat sauce. Serve in hot bowls and hand round Parmesan cheese, for sprinkling on top."
    }
    ,
    {
      id: 53,
      image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      title: "Spicy Arrabiata Penne",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"penne rigate",quantity:'1 pound'}, {name:"olive oil",quantity:'1/4 cup'}, {name:"garlic",quantity:'3 cloves'}, {name:"chopped tomatoes",quantity:'1 tin '}, {name:"red chilli flakes",quantity:'1/2 teaspoon'},, {name:"italian seasoning",quantity:'1/2 teaspoon'}, {name:"basil",quantity:'6 leaves'}, {name:"Parmigiano-Reggiano",quantity:'sprinkling'},],
      idMeal:52771,
      youtube_Url:"https://www.youtube.com/watch?v=1IszT_guI08",
      Instruction:"Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm."
    }
    ,
    {
      id: 54,
      image: "https://www.themealdb.com/images/media/meals/wspuvp1511303478.jpg",
      title: "Spinach & Ricotta Cannelloni",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Olive Oil",quantity:'3 tbsp'}, {name:"Garlic",quantity:'8 cloves chopped'}, {name:"Caster Sugar",quantity:'3 tbsp'}, {name:"Red Wine Vinegar",quantity:'2 tblsp '}, {name:"Chopped Tomatoes",quantity:'3 400g Cans'},, {name:"Basil Leaves",quantity:'Bunch'}, {name:"Mascarpone",quantity:'2 tubs'}, {name:"Milk",quantity:'3 tbsp'}, {name:"Parmesan",quantity:'85g'}, {name:"Mozzarella",quantity:'2 sliced'}, {name:"Spinach",quantity:'1kg'}, {name:"Parmesan",quantity:'100g '}, {name:"Ricotta",quantity:'3 tubs'}, {name:"Nutmeg",quantity:'pinch'}, {name:"Cannellini Beans",quantity:'400g'},],
      idMeal:52849,
      youtube_Url:"https://www.youtube.com/watch?v=rYGaEJjyLQA",
      Instruction:"First make the tomato sauce. Heat the oil in a large pan and fry the garlic for 1 min. Add the sugar, vinegar, tomatoes and some seasoning and simmer for 20 mins, stirring occasionally, until thick. Add the basil and divide the sauce between 2 or more shallow ovenproof dishes (see Tips for freezing, below). Set aside. Make a sauce by beating the mascarpone with the milk until smooth, season, then set aside.\r\n\r\nPut the spinach in a large colander and pour over a kettle of boiling water to wilt it (you may need to do this in batches). When cool enough to handle squeeze out the excess water. Roughly chop the spinach and mix in a large bowl with 100g Parmesan and ricotta. Season well with salt, pepper and the nutmeg.\r\n\r\nHeat oven to 200C/180C fan/gas 6. Using a piping bag or plastic food bag with the corner snipped off, squeeze the filling into the cannelloni tubes. Lay the tubes, side by side, on top of the tomato sauce and spoon over the mascarpone sauce. Top with Parmesan and mozzarella. You can now freeze the cannelloni, uncooked, or you can cook it first and then freeze. Bake for 30-35 mins until golden and bubbling. Remove from oven and let stand for 5 mins before serving."
    }
    ,
    {
      id: 55,
      image: "https://www.themealdb.com/images/media/meals/wxswxy1511452625.jpg",
      title: "Squash linguine",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Butternut Squash",quantity:'350g'}, {name:"Garlic",quantity:'3 parts '}, {name:"Olive Oil",quantity:'3 tbs'}, {name:"Linguine Pasta",quantity:'350g'}, {name:"Sage",quantity:'Small bunch'}, ],
      idMeal:52866,
      youtube_Url:"https://www.youtube.com/watch?v=xHZ-PoGwTLQ",
      Instruction:"Heat oven to 200C/180C fan/gas 6. Put the squash and garlic on a baking tray and drizzle with the olive oil. Roast for 35-40 mins until soft. Season.\r\nCook the pasta according to pack instructions. Drain, reserving the water. Use a stick blender to whizz the squash with 400ml cooking water. Heat some oil in a frying pan, fry the sage until crisp, then drain on kitchen paper. Tip the pasta and sauce into the pan and warm through. Scatter with sage."
    }
    ,
    {
      id: 56,
      image: "https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg",
      title: "Vegan Lasagna",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"green red lentils",quantity:'1 cups'}, {name:"carrot",quantity:1}, {name:"onion",quantity:1}, {name:"zucchini",quantity:'1 small'}, {name:"coriander",quantity:'sprinking'}, {name:"spinach",quantity:'150g'}, {name:"lasagne sheets",quantity:'10'}, {name:"vegan butter",quantity:'35g'}, {name:"flour",quantity:'4 tablespoons'}, {name:"soya milk",quantity:'300ml'}, {name:"mustard",quantity:'1.5 teaspoons'}, {name:"vinegar",quantity:'1 teaspoon'}, ],
      idMeal:52775,
      youtube_Url:"https://www.youtube.com/watch?v=VU8cXvlGbvc",
      Instruction:"1) Preheat oven to 180 degrees celcius. \r\n2) Boil vegetables for 5-7 minutes, until soft. Add lentils and bring to a gentle simmer, adding a stock cube if desired. Continue cooking and stirring until the lentils are soft, which should take about 20 minutes. \r\n3) Blanch spinach leaves for a few minutes in a pan, before removing and setting aside. \r\n4) Top up the pan with water and cook the lasagne sheets. When cooked, drain and set aside.\r\n5) To make the sauce, melt the butter and add the flour, then gradually add the soya milk along with the mustard and the vinegar. Cook and stir until smooth and then assemble the lasagne as desired in a baking dish. \r\n6) Bake in the preheated oven for about 25 minutes."
    }
    ,
    {
      id: 57,
      image: "https://www.themealdb.com/images/media/meals/qvrwpt1511181864.jpg",
      title: "Venetian Duck Ragu",
      category: "Dessert",
      country: "Italian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Olive Oil",quantity:'1 tbls'}, {name:"Duck Legs",quantity:4}, {name:"Onions",quantity:'2 finely chopped'}, {name:"Garlic",quantity:'2 cloves minced'}, {name:"Cinnamon",quantity:'2 tsp ground'}, {name:"Plain Flour",quantity:'2 tsp'}, {name:"Chopped Tomatoes",quantity:'250ml'}, {name:"Chicken Stock Cube",quantity:'800g'}, {name:"Rosemary",quantity:1}, {name:"Bay Leaves",quantity:'3 sprigs'}, {name:"Sugar",quantity:2}, {name:"Milk",quantity:'1 tsp '}, {name:"Paccheri Pasta",quantity:'2 tbs'}, {name:"Parmesan Cheese",quantity:'600g'}, ],
      idMeal:52838,
      youtube_Url:"https://www.youtube.com/watch?v=oWQDVgjB_Lw",
      Instruction:"Heat the oil in a large pan. Add the duck legs and brown on all sides for about 10 mins. Remove to a plate and set aside. Add the onions to the pan and cook for 5 mins until softened. Add the garlic and cook for a further 1 min, then stir in the cinnamon and flour and cook for a further min. Return the duck to the pan, add the wine, tomatoes, stock, herbs, sugar and seasoning. Bring to a simmer, then lower the heat, cover with a lid and cook for 2 hrs, stirring every now and then.\r\nCarefully lift the duck legs out of the sauce and place on a plate – they will be very tender so try not to lose any of the meat. Pull off and discard the fat, then shred the meat with 2 forks and discard the bones. Add the meat back to the sauce with the milk and simmer, uncovered, for a further 10-15 mins while you cook the pasta.\r\nCook the pasta following pack instructions, then drain, reserving a cup of the pasta water, and add the pasta to the ragu. Stir to coat all the pasta in the sauce and cook for 1 min more, adding a splash of cooking liquid if it looks dry. Serve with grated Parmesan, if you like."
    }
    ,
    {
      id: 58,
      image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
      title: "Corba",
      category: "Dessert",
      country: "Turkish",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Lentils",quantity:'1 cup '}, {name:"Onion",quantity:'1 large'}, {name:"Carrots",quantity:'1 large'}, {name:"Tomato",quantity:'1 tbs'}, {name:"Cumin",quantity:'2 tsp'}, {name:"Paprika",quantity:'1 tsp '}, {name:"Mint",quantity:'1/2 tsp'}, {name:"Thyme",quantity:'1/2 tsp'}, {name:"Black Pepper",quantity:'1/4 tsp'}, {name:"Red Pepper Flakes",quantity:'1/4 tsp'}, {name:"Vegetable Stock",quantity:'4 cups '}, {name:"Water",quantity:'1 cup '}, {name:"Sea Salt",quantity:'Pinch'}, ],
      idMeal:52977,
      youtube_Url:"https://www.youtube.com/watch?v=VVnZd8A84z4",
      Instruction:"Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week."
    }
    ,
    {
      id: 59,
      image: "https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg",
      title: "Kumpir",
      category: "Brunch",
      country: "Turkish",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Potatoes",quantity:'2 large'}, {name:"Butter",quantity:'2 tbs '}, {name:"Cheese",quantity:'150g'}, {name:"Onion",quantity:'1 large'}, {name:"Red Pepper",quantity:'1 large'}, {name:"Red Chilli Flakes",quantity:'Pinch'}, ],
      idMeal:52978,
      youtube_Url:"https://www.youtube.com/watch?v=IEDEtZ4UVtI",
      Instruction:"If you order kumpir in Turkey, the standard filling is first, lots of butter mashed into the potato, followed by cheese. There’s then a row of other toppings that you can just point at to your heart’s content – sweetcorn, olives, salami, coleslaw, Russian salad, allsorts – and you walk away with an over-stuffed potato because you got ever-excited by the choices on offer.\r\n\r\nGrate (roughly – you can use as much as you like) 150g of cheese.\r\nFinely chop one onion and one sweet red pepper.\r\nPut these ingredients into a large bowl with a good sprinkling of salt and pepper, chilli flakes (optional)."
    }
    ,
    {
      id: 60,
      image: "https://www.themealdb.com/images/media/meals/tvttqv1504640475.jpg",
      title: "Massaman Beef curry",
      category: "Dessert",
      country: "Thai",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Peanuts",quantity:'85g'}, {name:"Coconut cream",quantity:'400ml can'}, {name:"Massaman curry paste",quantity:'4 tbsp'}, {name:"Beef",quantity:'600g stewing cut into strips'}, {name:"Potatoes",quantity:'450g waxy'}, {name:"Onion",quantity:'1 cut thin wedges'}, {name:"Lime",quantity:'4 leaves'}, {name:"Cinnamon stick",quantity:'1'}, {name:"Tamarind paste",quantity:'1 tbsp'}, {name:"Brown sugar",quantity:'1 tbsp palm or soft light'}, {name:"Fish Sauce",quantity:'1 tbsp'}, {name:"chilli",quantity:'1 red deseeded and finely sliced, to serve'}, {name:"Jasmine Rice",quantity:'to serve'}, ],
      idMeal:52827,
      youtube_Url:"https://www.youtube.com/watch?v=mVxgZSCU9_g",
      Instruction:"Heat oven to 200C/180C fan/gas 6, then roast the peanuts on a baking tray for 5 mins until golden brown. When cool enough to handle, roughly chop. Reduce oven to 180C/160C fan/gas 4.\r\nHeat 2 tbsp coconut cream in a large casserole dish with a lid. Add the curry paste and fry for 1 min, then stir in the beef and fry until well coated and sealed. Stir in the rest of the coconut with half a can of water, the potatoes, onion, lime leaves, cinnamon, tamarind, sugar, fish sauce and most of the peanuts. Bring to a simmer, then cover and cook for 2 hrs in the oven until the beef is tender.\r\nSprinkle with sliced chilli and the remaining peanuts, then serve straight from the dish with jasmine rice."
    }
    ,
    {
      id: 61,
      image: "https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg",
      title: "Pad See Ew",
      category: "Dessert",
      country: "Thai",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"rice stick noodles",quantity:'6oz/180g'}, {name:"dark soy sauce",quantity:'2 tbsp '}, {name:"oyster sauce",quantity:'2 tbsp'}, {name:"soy sauce",quantity:'2 tsp'}, {name:"white vinegar",quantity:'2 tsp'}, {name:"sugar",quantity:'2 tsp'}, {name:"water",quantity:'2 tbsp'}, {name:"peanut oil",quantity:'2 tbsp'}, {name:"garlic",quantity:'2 cloves'}, {name:"Chicken",quantity:'1 cup '}, {name:"Egg",quantity:1}, {name:"Chinese broccoli",quantity:'4 cups'}, ],
      idMeal:52774,
      youtube_Url:"https://www.youtube.com/watch?v=Ohy1DELF4is",
      Instruction:"Mix Sauce in small bowl.\r\nMince garlic into wok with oil. Place over high heat, when hot, add chicken and Chinese broccoli stems, cook until chicken is light golden.\r\nPush to the side of the wok, crack egg in and scramble. Don't worry if it sticks to the bottom of the wok - it will char and which adds authentic flavour.\r\nAdd noodles, Chinese broccoli leaves and sauce. Gently mix together until the noodles are stained dark and leaves are wilted. Serve immediately!"
    }
    ,
    {
      id: 62,
      image: "https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg",
      title: "Thai Green Curry",
      category: "Dessert",
      country: "Thai",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"potatoes",quantity:'225g new'}, {name:"green beans",quantity:'100g '}, {name:"sunflower oil",quantity:'1 tbsp'}, {name:"garlic",quantity:'1 clove'}, {name:"Thai green curry paste",quantity:'4 tsp '}, {name:"coconut milk",quantity:'400ml'}, {name:"Thai fish sauce",quantity:'2 tsp'}, {name:"Sugar",quantity:'1 tsp'}, {name:"Chicken",quantity:'450g boneless'}, {name:"lime",quantity:'2 fresh kaffir leaves '}, {name:"basil",quantity:'handfull'}, {name:"Rice",quantity:'Boiled'}, ],
      idMeal:52814,
      youtube_Url:"https://www.youtube.com/watch?v=LIbKVpBQKJI",
      Instruction:"Put the potatoes in a pan of boiling water and cook for 5 minutes. Throw in the beans and cook for a further 3 minutes, by which time both should be just tender but not too soft. Drain and put to one side.\r\nIn a wok or large frying pan, heat the oil until very hot, then drop in the garlic and cook until golden, this should take only a few seconds. Don’t let it go very dark or it will spoil the taste. Spoon in the curry paste and stir it around for a few seconds to begin to cook the spices and release all the flavours. Next, pour in the coconut milk and let it come to a bubble.\r\nStir in the fish sauce and sugar, then the pieces of chicken. Turn the heat down to a simmer and cook, covered, for about 8 minutes until the chicken is cooked.\r\nTip in the potatoes and beans and let them warm through in the hot coconut milk, then add a lovely citrussy flavour by stirring in the shredded lime leaves (or lime zest). The basil leaves go in next, but only leave them briefly on the heat or they will quickly lose their brightness. Scatter with the lime garnish and serve immediately with boiled rice."
    }
    // Russian
    ,
    {
      id: 63,
      image: "https://www.themealdb.com/images/media/meals/svprys1511176755.jpg",
      title: "Beef stroganoff",
      category: "Dessert",
      country: "Russian",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Olive Oil",quantity:'1 tbls '}, {name:"Onions",quantity:1}, {name:"Garlic",quantity:'1 clove'}, {name:"Butter",quantity:'1 tbsp'}, {name:"Mushrooms",quantity:'250g'}, {name:"Beef Fillet",quantity:'500g'}, {name:"Plain Flour",quantity:'1tbsp'}, {name:"Creme Fraiche",quantity:'150g'}, {name:"English Mustard",quantity:'1 tbsp'}, {name:"Beef Stock",quantity:'100ml '}, {name:"Parsley",quantity:'Topping'}, ],
      idMeal:52834,
      youtube_Url:"https://www.youtube.com/watch?v=PQHgQX1Ss74",
      Instruction:"Heat the olive oil in a non-stick frying pan then add the sliced onion and cook on a medium heat until completely softened, so around 15 mins, adding a little splash of water if they start to stick at all. Crush in the garlic and cook for a 2-3 mins further, then add the butter. Once the butter is foaming a little, add the mushrooms and cook for around 5 mins until completely softened. Season everything well, then tip onto a plate.\r\nTip the flour into a bowl with a big pinch of salt and pepper, then toss the steak in the seasoned flour. Add the steak pieces to the pan, splashing in a little oil if the pan looks particularly dry, and fry for 3-4 mins, until well coloured. Tip the onions and mushrooms back into the pan. Whisk the crème fraîche, mustard and beef stock together, then pour into the pan. Cook over a medium heat for around 5 mins. Scatter with parsley, then serve with pappardelle or rice."
    }
    ,
    {
      id: 64,
      image: "https://www.themealdb.com/images/media/meals/0206h11699013358.jpg",
      title: "Blini Pancakes",
      category: "Dessert",
      country: "Russian",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Buckwheat",quantity:'1/2 cup '}, {name:"Flour",quantity:'2/3 Cup'}, {name:"Salt",quantity:'1/2 tsp'}, {name:"Yeast",quantity:'1 tsp '}, {name:"Milk",quantity:'1 cup '}, {name:"Butter",quantity:'2 tbs'}, {name:"Egg",quantity:'1 Seperated '}, ],
      idMeal:53080,
      youtube_Url:"https://www.youtube.com/watch?v=GsB8ZI5vREA",
      Instruction:"In a large bowl, whisk together 1/2 cup buckwheat flour, 2/3 cup all-purpose flour, 1/2 teaspoon salt, and 1 teaspoon yeast.\r\n\r\nMake a well in the center and pour in 1 cup warm milk, whisking until the batter is smooth.\r\n\r\nCover the bowl and let the batter rise until doubled, about 1 hour.\r\n\r\nEnrich and Rest the Batter\r\nStir 2 tablespoons melted butter and 1 egg yolk into the batter.\r\n\r\nIn a separate bowl, whisk 1 egg white until stiff, but not dry.\r\n\r\nFold the whisked egg white into the batter.\r\n\r\nCover the bowl and let the batter stand 20 minutes.\r\n\r\nPan-Fry the Blini\r\nHeat butter in a large nonstick skillet over medium heat.\r\n\r\nDrop quarter-sized dollops of batter into the pan, being careful not to overcrowd the pan. Cook for about 1 minute or until bubbles form.\r\n\r\nTurn and cook for about 30 additional seconds.\r\n\r\nRemove the finished blini onto a plate and cover them with a clean kitchen towel to keep warm. Add more butter to the pan and repeat the frying process with the remaining batter."
    }
    ,
    {
      id: 65,
      image: "https://www.themealdb.com/images/media/meals/60oc3k1699009846.jpg",
      title: "Cabbage Soup (Shchi)",
      category: "Breakfast",
      country: "Russian",
      isVeg: true,
      poster: "Hale Alex",
      ingredients: [{name:"Unsalted Butter",quantity:'3 tbs'}, {name:"Onion",quantity:'1 large'}, {name:"Cabbage",quantity:'1 medium'}, {name:"Carrots",quantity:1}, {name:"Celery",quantity:1}, {name:"Bay Leaf",quantity:1}, {name:"Vegetable Stock",quantity:'8 cups '}, {name:"Potatoes",quantity:'2 large'}, {name:"Tomatoes",quantity:'2 large'}, {name:"Sour Cream",quantity:'Garnish'} , {name:"Dill",quantity:'Garnish'} ],
      idMeal:53077,
      youtube_Url:"https://www.youtube.com/watch?v=lTjlbqGc_Y8",
      Instruction:"Add the butter to a large Dutch oven or other heavy-duty pot over medium heat. When the butter has melted, add the onion and sauté until translucent.\r\nAdd the cabbage, carrot, and celery. Sauté until the vegetables begin to soften, stirring frequently, about 3 minutes.\r\nAdd the bay leaf and vegetable stock and bring to a boil over high heat. Reduce the heat to low and simmer, covered, until the vegetables are crisp-tender, about 15 minutes.\r\nAdd the potatoes and bring it back to a boil over high heat. Reduce the heat to low and simmer, covered, until the potatoes are tender, about 10 minutes.\r\nAdd the tomatoes (or undrained canned tomatoes) and bring the soup back to a boil over high heat. Reduce the heat to low and simmer, uncovered, for 5 minutes. Season to taste with salt and pepper.\r\nemove and discard the bay leaf from the pot.\r\nServe topped with fresh sour cream and fresh dill."
    }
    ,
    {
      id: 66,
      image: "https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg",
      title: "Fish Soup (Ukha)",
      category: "Dessert",
      country: "Russian",
      isVeg: false,
      poster: "Rubian jhelaon",
      idMeal:53079,
      ingredients: [{name:"Olive Oil",quantity:'2 tbs'}, {name:"Onion",quantity:'1 sliced'}, {name:"Carrots",quantity:'2 medium'}, {name:"Fish Stock",quantity:'3 cups '}, {name:"Water",quantity:'3 cups '}, {name:"Potatoes",quantity:'4 large'}, {name:"Bay Leaf",quantity:3}, {name:"Cod",quantity:1}, {name:"Salmon",quantity:1} ],
      youtube_Url:"https://www.youtube.com/watch?v=cS3Yn-y5uVg",
      Instruction:"In a medium pot, heat the olive oil over medium-high heat. Add the onions and cook, stirring occasionally until the onions start to caramelize. Add the carrots and cook until the carrots start to soften, about 4 more minutes.\r\nAdd the stock, water, potatoes, bay leaves, and black peppercorns. Season with salt and bring to a boil. Reduce heat, cover and cook for 10 minutes. Add the millet and cook for 15 more minutes until millet and potatoes are cooked.\r\nGently add the fish cubes. Stir and bring the soup to a simmer. The fish will cook through very fast, so make sure to not overcook them. They are done when the flesh is opaque and flakes easily.\r\nGarnish the soup with chopped fresh dill or parsley before serving."
    }
    ,
    {
      id: 67,
      image: "https://www.themealdb.com/images/media/meals/kos9av1699014767.jpg",
      title: "Lamb Pilaf (Plov)",
      category: "Dessert",
      country: "Russian",
      isVeg: true,
      poster: "Pavel Durov",
      ingredients: [{name:"Lamb",quantity:'50g'}, {name:"Prunes",quantity:'120g'}, {name:"Lemon Juice",quantity:'1 tbs'}, {name:"Butter",quantity:'2 tbs'}, {name:"Onion",quantity:'1 chopped'}, {name:"Lamb",quantity:'450g'}, {name:"Garlic",quantity:'2 cloves'}, {name:"Vegetable Stock",quantity:'600ml'}, {name:"Rice",quantity:'2 cups '}, {name:"Saffron",quantity:'Pinch'},{name:"Parsley",quantity:'Garnish'} ],
      idMeal:53083,
      youtube_Url:"https://www.youtube.com/watch?v=rllQsUw1hFQ",
      Instruction:"Place the raisins and prunes into a small bowl and pour over enough water to cover. Add lemon juice and let soak for at least 1 hour. Drain. Roughly chop the prunes.\r\n\r\nMeanwhile, heat the butter in a large pan, add the onion, and cook for 5 minutes. Add cubed lamb, ground lamb, and crushed garlic cloves. Fry for 5 minutes, stirring constantly until browned.\r\n\r\nPour 2/3 cup (150 milliliters) of stock into the pan. Bring to a boil, then lower the heat, cover, and simmer for 1 hour, or until the lamb is tender.\r\n\r\nAdd the remaining stock and bring to a boil. Add rinsed long-grain white rice and a large pinch of saffron. Stir, then cover, and simmer for 15 minutes, or until the rice is tender.\r\n\r\nAdd the drained raisins, drained chopped prunes, and salt and pepper to taste. Heat through for a few minutes, then turn out onto a warmed serving dish and garnish with sprigs of flat-leaf parsley."
    }
    ,
    {
      id: 68,
      image: "https://www.themealdb.com/images/media/meals/ebvuir1699013665.jpg",
      title: "Potato Salad (Olivier Salad)",
      category: "Dessert",
      country: "Russian",
      isVeg: true,
      poster: "Riyan Alex",
      ingredients: [{name:"Potatoes",quantity:4}, {name:"Carrots",quantity:3}, {name:"Salt",quantity:'1 tbs'}, {name:"White Wine Vinegar",quantity:'1/2 tbs'}, {name:"Eggs",quantity:4}, {name:"Sausages",quantity:'7 oz '}, {name:"Dill",quantity:'4 oz '}, {name:"Peas",quantity:'1 can '}, {name:"Onions",quantity:4}, {name:"Mayonnaise",quantity:'1 cup '}, ],
      idMeal:53081,
      youtube_Url:"https://www.youtube.com/watch?v=RnsWwHcpKiY",
      Instruction:"Cut the potatoes and carrots into small uniform cubes.\r\nPlace them in a large pot and fill with water.\r\nAdd salt and vinegar. Bring it to a boil over medium high heat, and then reduce the heat to medium and continue to cook until the potatoes are cooked through, about 15 minutes. Drain the potatoes and let it cool to room temperature.\r\nMeanwhile, cut the sausage and pickles into small cubes, and chop the green onions.\r\nCut the hard-boiled eggs into small cubes as well.\r\nIf using fresh dill, chop them as well.\r\nIn a large bowl, combine potatoes, carrots, sausage, pickles, peas and green onions.\r\nAdd mayo and dill and mix until well combined.\r\nSalt and pepper to taste. Cover with a plastic wrap and refrigerate for at least 1 hour before serving."
    }
    ,
    {
      id: 69,
      image: "https://www.themealdb.com/images/media/meals/oe8rg51699014028.jpg",
      title: "Strawberries Romanoff",
      category: "Dessert",
      country: "Russian",
      isVeg: true,
      poster: "Clark Anderson",
      ingredients: [{name:"Strawberries",quantity:'2 pint '}, {name:"Sugar",quantity:'4 tbs'}, {name:"Grand Marnier",quantity:'4 tbs'}, {name:"Cream",quantity:'1 cup '}, {name:"Sour Cream",quantity:'1/4 cup'},],
      idMeal:53082,
      youtube_Url:"https://www.youtube.com/watch?v=ybWHc4Vi-xU",
      Instruction:"In a medium bowl, combine hulled and quartered strawberries, 4 Tbsp sugar and 4 Tbsp liqueur, stir to combine then cover and refrigerate at least 1 hour and up to 2 hours, stirring once or twice.\r\n\r\nTwo photos of cut strawberries in a bowl with one having sugar being added to the bowl Two photos of cut up strawberries for Strawberry Romanoff \r\n\r\nJust before serving, in a large mixing bowl, combine 1 cup cold heavy cream and 1/4 cup powdered sugar, and beat with an electric mixer until stiff peaks form. Using a spatula, fold in 1/4 cup sour cream just until well blended.\r\n\r\nTo serve, stir strawberries then divide between 6 serving glasses or bowls. You can spoon a little syrup over the berries if you like. You can also use this syrup to soak a cake. Spoon cream over strawberries, dividing evenly. You can also use an ice cream scoop with trigger release for a nice rounded puff of cream. Serve right away or chill and enjoy within 2 hours of assembly.\r\n\r\n"
    }
    // American
    ,
    {
      id: 70,
      image: "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
      title: "Banana Pancakes",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Banana",quantity:'1 large'}, {name:"Eggs",quantity:'2 medium'}, {name:"Baking Powder",quantity:'pinch'}, {name:"Vanilla Extract",quantity:'spinkling'}, {name:"Oil",quantity:'1 tsp '}, {name:"Pecan Nuts",quantity:'25g '},{name:"Raspberries",quantity:'125g'},],
      idMeal:52855,
      youtube_Url:"https://www.youtube.com/watch?v=kSKtb2Sv-_U",
      Instruction:"In a bowl, mash the banana with a fork until it resembles a thick purée. Stir in the eggs, baking powder and vanilla.\r\nHeat a large non-stick frying pan or pancake pan over a medium heat and brush with half the oil. Using half the batter, spoon two pancakes into the pan, cook for 1-2 mins each side, then tip onto a plate. Repeat the process with the remaining oil and batter. Top the pancakes with the pecans and raspberries."
    }
    ,
    {
      id: 71,
      image: "https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg",
      title: "BBQ Pork Sloppy Joes",
      category: "Dinner",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Potatoes",quantity:2}, {name:"Red Onions",quantity:1}, {name:"Garlic",quantity:'2 cloves'}, {name:"Lime",quantity:1}, {name:"Bread",quantity:2}, {name:"Pork",quantity:'1 lb '},{name:"Barbeque Sauce",quantity:''},{name:"Hotsauce",quantity:''},{name:"Tomato Ketchup",quantity:''},{name:"Sugar",quantity:''},{name:"Vegetable Oil",quantity:''},{name:"Salt",quantity:''},{name:"Pepper",quantity:''},],
      idMeal:52995,
      youtube_Url:"",
      Instruction:"1\r\n\r\nPreheat oven to 450 degrees. Wash and dry all produce. Cut sweet potatoes into ½-inch-thick wedges. Toss on a baking sheet with a drizzle of oil, salt, and pepper. Roast until browned and tender, 20-25 minutes.\r\n\r\n2\r\n\r\nMeanwhile, halve and peel onion. Slice as thinly as possible until you have ¼ cup (½ cup for 4 servings); finely chop remaining onion. Peel and finely chop garlic. Halve lime; squeeze juice into a small bowl. Halve buns. Add 1 TBSP butter (2 TBSP for 4) to a separate small microwave-safe bowl; microwave until melted, 30 seconds. Brush onto cut sides of buns.\r\n\r\n3\r\n\r\nTo bowl with lime juice, add sliced onion, ¼ tsp sugar (½ tsp for 4 servings), and a pinch of salt. Stir to combine; set aside to quick-pickle.\r\n\r\n4\r\n\r\nHeat a drizzle of oil in a large pan over medium-high heat. Add chopped onion and season with salt and pepper. Cook, stirring, until softened, 4-5 minutes. Add garlic and cook until fragrant, 30 seconds more. Add pork and season with salt and pepper. Cook, breaking up meat into pieces, until browned and cooked through, 4-6 minutes.\r\n\r\n5\r\n\r\nWhile pork cooks, in a third small bowl, combine BBQ sauce, pickling liquid from onion, 3 TBSP ketchup (6 TBSP for 4 servings), ½ tsp sugar (1 tsp for 4), and ¼ cup water (⅓ cup for 4). Once pork is cooked through, add BBQ sauce mixture to pan. Cook, stirring, until sauce is thickened, 2-3 minutes. Taste and season with salt and pepper.\r\n\r\n6\r\n\r\nMeanwhile, toast buns in oven or toaster oven until golden, 3-5 minutes. Divide toasted buns between plates and fill with as much BBQ pork as you’d like. Top with pickled onion and hot sauce. Serve with sweet potato wedges on the side."
    }
    ,
    {
      id: 72,
      image: "https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg",
      title: "Beef Brisket Pot Roast",
      category: "Dessert",
      country: "American",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Beef Brisket",quantity:'4-5 pound'}, {name:"Salt",quantity:'Dash'}, {name:"Onion",quantity:3}, {name:"Garlic",quantity:'5 cloves'}, {name:"Thyme",quantity:'1 Sprig'}, {name:"Rosemary",quantity:'1 sprig '},{name:"Bay Leaves",quantity:4},{name:"beef stock",quantity:'2 cups'},{name:"Carrots",quantity:'3 Large'},{name:"Mustard",quantity:'1 Tbsp'},{name:"Potatoes",quantity:'4 Mashed'},],
      idMeal:52812,
      youtube_Url:"https://www.youtube.com/watch?v=gh48wM6bPWQ",
      Instruction:"1 Prepare the brisket for cooking: On one side of the brisket there should be a layer of fat, which you want. If there are any large chunks of fat, cut them off and discard them. Large pieces of fat will not be able to render out completely.\r\nUsing a sharp knife, score the fat in parallel lines, about 3/4-inch apart. Slice through the fat, not the beef. Repeat in the opposite direction to make a cross-hatch pattern.\r\nSalt the brisket well and let it sit at room temperature for 30 minutes.\r\n \r\n2 Sear the brisket: You'll need an oven-proof, thick-bottomed pot with a cover, or Dutch oven, that is just wide enough to hold the brisket roast with a little room for the onions.\r\nPat the brisket dry and place it, fatty side down, into the pot and place it on medium high heat. Cook for 5-8 minutes, lightly sizzling, until the fat side is nicely browned. (If the roast seems to be cooking too fast, turn the heat down to medium. You want a steady sizzle, not a raging sear.)\r\nTurn the brisket over and cook for a few minutes more to brown the other side.\r\n\r\n3 Sauté the onions and garlic: When the brisket has browned, remove it from the pot and set aside. There should be a couple tablespoons of fat rendered in the pot, if not, add some olive oil.\r\nAdd the chopped onions and increase the heat to high. Sprinkle a little salt on the onions. Sauté, stirring often, until the onions are lightly browned, 5-8 minutes. Stir in the garlic and cook 1-2 more minutes.\r\n \r\n4 Return brisket to pot, add herbs, stock, bring to simmer, cover, cook in oven: Preheat the oven to 300°F. Use kitchen twine to tie together the bay leaves, rosemary and thyme.\r\nMove the onions and garlic to the sides of the pot and nestle the brisket inside. Add the beef stock and the tied-up herbs. Bring the stock to a boil on the stovetop.\r\nCover the pot, place the pot in the 300°F oven and cook for 3 hours. Carefully flip the brisket every hour so it cooks evenly.\r\n \r\n5 Add carrots, continue to cook: After 3 hours, add the carrots. Cover the pot and cook for 1 hour more, or until the carrots are cooked through and the brisket is falling-apart tender.\r\n6 Remove brisket to cutting board, tent with foil: When the brisket is falling-apart tender, take the pot out of the oven and remove the brisket to a cutting board. Cover it with foil. Pull out and discard the herbs.\r\n7 Make sauce (optional): At this point you have two options. You can serve as is, or you can make a sauce with the drippings and some of the onions. If you serve as is, skip this step.\r\nTo make a sauce, remove the carrots and half of the onions, set aside and cover them with foil. Pour the ingredients that are remaining into the pot into a blender, and purée until smooth. If you want, add 1 tablespoon of mustard to the mix. Put into a small pot and keep warm.\r\n8 Slice the meat across the grain: Notice the lines of the muscle fibers of the roast. This is the \"grain\" of the meat. Slice the meat perpendicular to these lines, or across the grain (cutting this way further tenderizes the meat), in 1/4-inch to 1/2-inch slices.\r\nServe with the onions, carrots and gravy. Serve with mashed, roasted or boiled potatoes, egg noodles or polenta."
    }
    ,
    {
      id: 73,
      image: "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
      title: "Big Mac",
      category: "Dinner",
      country: "American",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Minced Beef",quantity:'400g'}, {name:"Olive Oil",quantity:'2 tbs'}, {name:"Sesame Seed Burger Buns",quantity:2}, {name:"Onion",quantity:'Chopped'}, {name:"Iceberg Lettuce",quantity:'1/4  '}, {name:"Cheese",quantity:'2 sliced'},{name:"Dill Pickles",quantity:'2 large'},{name:"Mayonnaise",quantity:'1 cup '},{name:"White Wine Vinegar",quantity:'2 tsp'},{name:"Pepper",quantity:'Pinch'},{name:"Mustard",quantity:'2 tsp'},{name:"Onion Salt",quantity:'1 1/2 tsp '},{name:"Garlic Powder",quantity:'1 1/2 tsp  '},{name:"Paprika",quantity:'1/2 tsp'},],
      idMeal:53013,
      youtube_Url:"https://www.youtube.com/watch?v=C5J39YnnPsg",
      Instruction:"For the Big Mac sauce, combine all the ingredients in a bowl, season with salt and chill until ready to use.\r\n2. To make the patties, season the mince with salt and pepper and form into 4 balls using about 1/3 cup mince each. Place each onto a square of baking paper and flatten to form into four x 15cm circles. Heat oil in a large frypan over high heat. In 2 batches, cook beef patties for 1-2 minutes each side until lightly charred and cooked through. Remove from heat and keep warm. Repeat with remaining two patties.\r\n3. Carefully slice each burger bun into three acrossways, then lightly toast.\r\n4. To assemble the burgers, spread a little Big Mac sauce over the bottom base. Top with some chopped onion, shredded lettuce, slice of cheese, beef patty and some pickle slices. Top with the middle bun layer, and spread with more Big Mac sauce, onion, lettuce, pickles, beef patty and then finish with more sauce. Top with burger lid to serve.\r\n5. After waiting half an hour for your food to settle, go for a jog."
    }
    ,
    {
      id: 74,
      image: "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
      title: "Chick-Fil-A Sandwich",
      category: "Lunch",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Chicken Breast",quantity:1}, {name:"Pickle Juice",quantity:'1/4 cup'}, {name:"Egg",quantity:1}, {name:"Milk",quantity:'1/4 cup'}, {name:"Flour",quantity:'1/2 cup '}, {name:"Icing Sugar",quantity:'1 tbs'},{name:"Paprika",quantity:'1/2 tsp'},{name:"Salt",quantity:'1/2 tsp'},{name:"Black Pepper",quantity:'1/4 tsp'},{name:"Garlic Powder",quantity:'1/4 tsp'},{name:"Celery Salt",quantity:'1/4 tsp'},{name:"Cayenne Pepper",quantity:'1/2 tsp'},{name:"Olive Oil",quantity:'1 cup '},{name:"Sesame Seed Burger Buns",quantity:1},],
      idMeal:53016,
      youtube_Url:"https://www.youtube.com/watch?v=1WDesu7bUDM",
      Instruction:"Wrap the chicken loosely between plastic wrap and pound gently with the flat side of a meat tenderizer until about 1/2 inch thick all around.\r\nCut into two pieces, as even as possible.\r\nMarinate in the pickle juice for 30 minutes to one hour (add a teaspoon of Tabasco sauce now for a spicy sandwich).\r\nBeat the egg with the milk in a bowl.\r\nCombine the flour, sugar, and spices in another bowl.\r\nDip the chicken pieces each into the egg on both sides, then coat in flour on both sides.\r\nHeat the oil in a skillet (1/2 inch deep) to about 345-350.\r\nFry each cutlet for 2 minutes on each side, or until golden and cooked through.\r\nBlot on paper and serve on toasted buns with pickle slices."
    }
    ,
    {
      id: 75,
      image: "https://www.themealdb.com/images/media/meals/qrqywr1503066605.jpg",
      title: "Chicken Fajita Mac and Cheese",
      category: "Brunch",
      country: "American",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"macaroni",quantity:'500g'}, {name:"chicken stock",quantity:'2 cups '}, {name:"heavy cream",quantity:'1/2 cup '}, {name:"fajita seasoning",quantity:'1 packet'}, {name:"salt",quantity:'1 tsp'}, {name:"chicken breast",quantity:'3 diced'},{name:"olive oil",quantity:'2 tbsp'},{name:"onion",quantity:'1 small finely diced'},{name:"red pepper",quantity:'2 finely diced'},{name:"garlic",quantity:'2 cloves minced '},{name:"cheddar cheese",quantity:'1 cup'},{name:"parsley",quantity:'garnish chopped'},],
      idMeal:52818,
      youtube_Url:"https://www.youtube.com/watch?v=bwTSmLTZKNg",
      Instruction:"Fry your onion, peppers and garlic in olive oil until nicely translucent. Make a well in your veg and add your chicken. Add your seasoning and salt. Allow to colour slightly.\r\nAdd your cream, stock and macaroni.\r\nCook on low for 20 minutes. Add your cheeses, stir to combine.\r\nTop with roasted peppers and parsley.",
    }
    ,
    {
      id: 76,
      image: "https://www.themealdb.com/images/media/meals/rqvwxt1511384809.jpg",
      title: "Choc Chip Pecan Pie",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Plain Flour",quantity:'300g'}, {name:"Butter",quantity:'75g '}, {name:"Cream Cheese",quantity:'100g '}, {name:"Icing Sugar",quantity:'1 tbls'}, {name:"Butter",quantity:'150g'}, {name:"Maple Syrup",quantity:'200ml'},{name:"Light Brown Soft Sugar",quantity:'250g'},{name:"Dark Brown Soft Sugar",quantity:'100g '},{name:"Eggs",quantity:4},{name:"Vanilla Extract",quantity:'1 tsp '},{name:"Pecan Nuts",quantity:'400g'},{name:"Dark Chocolate Chips",quantity:'200g'},],
      idMeal:52856,
      youtube_Url:"https://www.youtube.com/watch?v=fDpoT0jvg4Y",
      Instruction:"First, make the pastry. Tip the ingredients into a food processor with 1 /4 tsp salt. Blend until the mixture resembles breadcrumbs. Drizzle 2-3 tsp cold water into the funnel while the blade is running – the mixture should start to clump together. Tip onto a work surface and bring together, kneading briefly into a ball. Pat into a disc, wrap in cling film, and chill for at least 20 mins. Heat oven to 200C/180C fan/gas 6.\r\n\r\nRemove the pastry from the fridge and leave at room temperature for 5 mins to soften. Flour the work surface, then unwrap the pastry and roll to a circle the thickness of a £1 coin. Use the pastry to line a deep, 23cm round fluted tin – mine was about 3cm deep. Press the pastry into the corners and up the sides, making sure there are no gaps. Leave 1cm pastry overhanging (save some of the pastry scraps for later). Line with baking parchment (scrunch it up first to make it more pliable) and fill with baking beans. Blind-bake for 15-20 mins until the sides are set, then remove the parchment and beans and return to the oven for 5 mins until golden brown. Trim the pastry so it’s flush with the top of the tin – a small serrated knife is best for this. If there are any cracks, patch them up with the pastry scraps.\r\n\r\nMeanwhile, weigh the butter, syrup and sugars into a pan, and add 1 /4 tsp salt. Heat until the butter has melted and the sugar dissolved, stirring until smooth. Remove from the heat and cool for 10 mins. Reduce oven to 160C/140C fan/gas 3.\r\n\r\nBeat the eggs in a bowl. Add the syrup mixture, vanilla and pecans, and mix until well combined. Pour half the mixture into the tart case, scatter over half the chocolate chips, then cover with the remaining filling and chocolate chips. Bake on the middle shelf for 50-55 mins until set. Remove from the oven and leave to cool, then chill for at least 2 hrs before serving."
    }
    ,
    {
      id: 77,
      image: "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
      title: "Chocolate Raspberry Brownies",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Dark Chocolate",quantity:'200g'}, {name:"Milk Chocolate",quantity:'100g '}, {name:"Salted Butter",quantity:'250g'}, {name:"Light Brown Soft Sugar",quantity:'400g'}, {name:"Eggs",quantity:'4 large'}, {name:"Plain Flour",quantity:'140g'},{name:"Cocoa",quantity:'50g'},{name:"Raspberries",quantity:'200g'},],
      idMeal:52860,
      youtube_Url:"https://www.youtube.com/watch?v=Pi89PqsAaAg",
      Instruction:"Heat oven to 180C/160C fan/gas 4. Line a 20 x 30cm baking tray tin with baking parchment. Put the chocolate, butter and sugar in a pan and gently melt, stirring occasionally with a wooden spoon. Remove from the heat.\r\nStir the eggs, one by one, into the melted chocolate mixture. Sieve over the flour and cocoa, and stir in. Stir in half the raspberries, scrape into the tray, then scatter over the remaining raspberries. Bake on the middle shelf for 30 mins or, if you prefer a firmer texture, for 5 mins more. Cool before slicing into squares. Store in an airtight container for up to 3 days."
    }
    ,
    {
      id: 78,
      image: "https://www.themealdb.com/images/media/meals/rvtvuw1511190488.jpg",
      title: "Clam chowder",
      category: "Breakfast",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Clams",quantity:'1½ kg'}, {name:"Butter",quantity:'50g'}, {name:"Bacon",quantity:'150g'}, {name:"Onion",quantity:'1 finely chopped '}, {name:"Thyme",quantity:'sprigs of fresh'}, {name:"Bay Leaf",quantity:1},{name:"Plain Flour",quantity:'1 tbls'},{name:"Milk",quantity:'150ml'},{name:"Double Cream",quantity:'150ml'},{name:"Potatoes",quantity:'2 medium'},{name:"Parsley",quantity:'Chopped'}],
      idMeal:52840,
      youtube_Url:"https://www.youtube.com/watch?v=fEN_fm6kX6k",
      Instruction:"Rinse the clams in several changes of cold water and drain well. Tip the clams into a large pan with 500ml of water. Cover, bring to the boil and simmer for 2 mins until the clams have just opened. Tip the contents of the pan into a colander over a bowl to catch the clam stock. When cool enough to handle, remove the clams from their shells – reserving a handful of empty shells for presentation if you want. Strain the clam stock into a jug, leaving any grit in the bottom of the bowl. You should have around 800ml stock.\r\nHeat the butter in the same pan and sizzle the bacon for 3-4 mins until it starts to brown. Stir in the onion, thyme and bay and cook everything gently for 10 mins until the onion is soft and golden. Scatter over the flour and stir in to make a sandy paste, cook for 2 mins more, then gradually stir in the clam stock then the milk and the cream.\r\nThrow in the potatoes, bring everything to a simmer and leave to bubble away gently for 10 mins or until the potatoes are cooked. Use a fork to crush a few of the potato chunks against the side of the pan to help thicken – you still want lots of defined chunks though. Stir through the clam meat and the few clam shells, if you've gone down that route, and simmer for a minute to reheat. Season with plenty of black pepper and a little salt, if needed, then stir through the parsley just before ladling into bowls or hollowed-out crusty rolls."
    }
    ,
    {
      id: 79,
      image: "https://www.themealdb.com/images/media/meals/b5ft861583188991.jpg",
      title: "French Onion Chicken with Roasted Carrots & Mashed Potatoes",
      category: "Dessert",
      country: "American",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Chicken Breasts",quantity:2}, {name:"Carrots",quantity:'12 ounces'}, {name:"Small Potatoes",quantity:5}, {name:"Onion",quantity:1}, {name:"Beef Stock",quantity:1}, {name:"Mozzarella",quantity:'1 1/2 cup '},{name:"Sour Cream",quantity:'2 tbsp'},{name:"Butter",quantity:''},{name:"Sugar",quantity:''},{name:"Vegetable Oil",quantity:''},{name:"Salt",quantity:''},{name:"Pepper",quantity:''}],
      idMeal:52996,
      youtube_Url:"",
      Instruction:"1\r\n\r\nPreheat oven to 425 degrees. Wash and dry all produce. Trim, peel, and cut carrots on a diagonal into ¼-inch-thick pieces. Dice potatoes into ½-inch pieces. Halve, peel, and thinly slice onion.\r\n\r\n2\r\n\r\nToss carrots on a baking sheet with a drizzle of oil, salt, and pepper. Roast until browned and tender, 15-20 minutes.\r\n\r\n3\r\n\r\nMeanwhile, place potatoes in a medium pot with enough salted water to cover by 2 inches. Bring to a boil and cook until tender, 12-15 minutes. Drain and return potatoes to pot; cover to keep warm.\r\n\r\n4\r\n\r\nWhile potatoes cook, heat a drizzle of oil in a large pan over medium-high heat. Add onion and cook, stirring occasionally, until lightly browned and softened, 8-10 minutes. Sprinkle with 1 tsp sugar (2 tsp for 4 servings). Stir in stock concentrate and 2 TBSP water (¼ cup for 4); season with salt and pepper. Cook until jammy, 2-3 minutes more. Turn off heat; transfer to a small bowl. Wash out pan.\r\n\r\n5\r\n\r\nPat chicken dry with paper towels; season all over with salt and pepper. Heat a drizzle of oil in pan used for onion over medium-high heat. Add chicken and cook until browned and cooked through, 5-6 minutes per side. In the last 1-2 minutes of cooking, top with caramelized onion and cheese. Cover pan until cheese melts. (If your pan doesn’t have a lid, cover with a baking sheet!)\r\n\r\n6\r\n\r\nHeat pot with drained potatoes over low heat; mash with sour cream, 2 TBSP butter (4 TBSP for 4 servings), salt, pepper, and a splash of water (or milk, for extra richness) until smooth. Divide chicken, roasted carrots, and mashed potatoes between plates."
    }
    ,
    {
      id: 80,
      image: "https://www.themealdb.com/images/media/meals/1543774956.jpg",
      title: "Fruit and Cream Cheese Breakfast Pastries",
      category: "Breakfast",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Cream Cheese",quantity:'1 1/4 oz '}, {name:"Sugar",quantity:'1 1/4 cup'}, {name:"Vanilla Extract",quantity:'1 teaspoon'}, {name:"Flour",quantity:''}, {name:"Puff Pastry",quantity:2}, {name:"Strawberries",quantity:''},{name:"Raspberries",quantity:'1/8 teaspoon'},{name:"Blackberries",quantity:''}],
      idMeal:52957,
      youtube_Url:"",
      Instruction:"Preheat oven to 400ºF (200ºC), and prepare two cookie sheets with parchment paper. In a bowl, mix cream cheese, sugar, and vanilla until fully combined. Lightly flour the surface and roll out puff pastry on top to flatten. Cut each sheet of puff pastry into 9 equal squares. On the top right and bottom left of the pastry, cut an L shape approximately ½ inch (1 cm) from the edge.\r\nNOTE: This L shape should reach all the way down and across the square, however both L shapes should not meet at the ends. Your pastry should look like a picture frame with two corners still intact.\r\nTake the upper right corner and fold down towards the inner bottom corner. You will now have a diamond shape.\r\nPlace 1 to 2 teaspoons of the cream cheese filling in the middle, then place berries on top.\r\nRepeat with the remaining pastry squares and place them onto the parchment covered baking sheet.\r\nBake for 15-20 minutes or until pastry is golden brown and puffed.\r\nEnjoy!\r\n"
    }
    ,
    {
      id: 81,
      image: "https://www.themealdb.com/images/media/meals/xutquv1505330523.jpg",
      title: "Grilled Mac and Cheese Sandwich",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Macaroni",quantity:'8 ounces (230 grams)'}, {name:"Plain Flour",quantity:'1/3 cup'}, {name:"Mustard Powder",quantity:'3/4 teaspoon'}, {name:"Garlic powder",quantity:'1/2 teaspoon'}, {name:"Kosher salt",quantity:'1/2 teaspoon'}, {name:"Black pepper",quantity:'1/2 teaspoon'},{name:"Cayenne pepper",quantity:'1/8 teaspoon'},{name:"Butter",quantity:'6 tablespoons (85 grams)'},{name:"Whole Milk",quantity:'1 1/2 cups (360 milliliters)'},{name:"Heavy Cream",quantity:'1 cup (240 milliliters)'},{name:"Monterey Jack Cheese",quantity:'1 pound (455 grams) '},{name:"Butter",quantity:'4 tablespoons (55 grams)'},{name:"garlic powder",quantity:'1 teaspoon'},{name:"Bread",quantity:'16 slices square'},{name:"Cheddar Cheese",quantity:'8 slices mild'},{name:"Colby Jack Cheese",quantity:'8 slices'},{name:"Butter",quantity:'4 tablespoons (55 grams)'}],
      idMeal:52829,
      youtube_Url:"https://www.youtube.com/watch?v=PYq31xLj-DY",
      Instruction:"Make the mac and cheese\r\n\r\n1. Bring a medium saucepan of generously salted water (you want it to taste like seawater) to a boil. Add the pasta and cook, stirring occasionally, until al dente, 8 to 10 minutes, or according to the package directions. The pasta should be tender but still chewy.\r\n2. While the pasta is cooking, in a small bowl, whisk together the flour, mustard powder, garlic powder, salt, black pepper, and cayenne pepper.\r\n3. Drain the pasta in a colander. Place the empty pasta pan (no need to wash it) over low heat and add the butter. When the butter has melted, whisk in the flour mixture and continue to cook, whisking frequently, until the mixture is beginning to brown and has a pleasant, nutty aroma, about 1 minute. Watch carefully so it does not scorch on the bottom of the pan.\r\n4. Slowly whisk the milk and cream into the flour mixture until everything is really well combined. Cook, whisking constantly, until the sauce is heated through and just begins to thicken, about 2 minutes. Remove from the heat. Gradually add the cheese while stirring constantly with a wooden spoon or silicone spatula and keep stirring until the cheese has melted into the sauce. Then stir in the drained cooked pasta.\r\n5. Line a 9-by-13-inch (23-by-33-centimeter) rimmed baking sheet with parchment paper or aluminum foil. Coat the paper or foil with nonstick cooking spray or slick it with butter. Pour the warm mac and cheese onto the prepared baking sheet and spread it evenly with a spatula. Coat another piece of parchment paper with cooking spray or butter and place it, oiled or buttered side down, directly on the surface of the mac and cheese. Refrigerate until cool and firm, about 1 hour.\r\n\r\nMake the grilled cheese\r\n6. Heat a large cast-iron or nonstick skillet over medium-low heat.\r\n7. In a small bowl, stir together the 4 tablespoons (55 grams) butter and garlic powder until well blended.\r\n8. Remove the mac and cheese from the refrigerator and peel off the top layer of parchment paper. Carefully cut into 8 equal pieces. Each piece will make 1 grilled mac and cheese sandwich. (You can stash each individual portion in a double layer of resealable plastic bags and refrigerate for up to 3 days or freeze it for up to 1 month.)\r\n9. Spread 3/4 teaspoon garlic butter on one side of each bread slice. Place half of the slices, buttered-side down, on a clean cutting board. Top each with one slice of Cheddar, then 1 piece of the mac and cheese. (Transfer from the baking sheet by scooting your hand or a spatula under each piece of mac and cheese and then flipping it over onto a sandwich.) Place 1 slice of Jack on top of each. Finish with the remaining bread slices, buttered-side up.\r\n10. Using a wide spatula, place as many sandwiches in the pan as will fit without crowding it. Cover and cook until the bottoms are nicely browned, about 4 minutes. Turn and cook until the second sides are browned, the cheese is melted, and the mac and cheese is heated through, about 4 minutes more.\r\n11. Repeat with the remaining ingredients. Cut the sandwiches in half, if desired, and serve."
    }
    ,
    {
      id: 82,
      image: "https://www.themealdb.com/images/media/meals/kvbotn1581012881.jpg",
      title: "Honey Balsamic Chicken with Crispy Broccoli & Potatoes",
      category: "Dinner",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Potatoes",quantity:'5'}, {name:"Broccoli",quantity:1}, {name:"Garlic",quantity:'2 cloves'}, {name:"Chicken Breast",quantity:2}, {name:"Balsamic Vinegar",quantity:''}, {name:"Honey",quantity:''},{name:"Honey",quantity:''},{name:"Chicken Stock",quantity:''},{name:"Butter",quantity:'1 tbsp'},{name:"Vegetable Oil",quantity:'1 tbsp'},{name:"Olive Oil",quantity:'1 tbsp'},],
      idMeal:52993,
      youtube_Url:"",
      Instruction:"2 Servings\r\n\r\n1. Preheat oven to 425 degrees. Wash and dry all produce. Cut potatoes into 1/2-inch-thick wedges. Toss on one side of a baking sheet with a drizzle of oil, salt, and pepper. (For 4 servings, spread potatoes out across entire sheet.) Roast on top rack for 5 minutes (we'll add the broccoli then). \r\n\r\n2. Meanwhile, cut broccoli florets into bite-size pieces, if necessary. Peel and finely chop garlic. In a small microwave-safe bowl, combine 1 TBSP olive oil (2 TBSP for 4 servings) and half the garlic. Microwave until garlic sizzles, 30 seconds. \r\n\r\n3. Once potatoes have roasted 5 minutes, remove sheet from oven and add broccoli to empty side; carefully toss with garlic oil, salt, and pepper. (For 4 servings, add broccoli to a second sheet.) Continue roasting until potatoes and broccoli are browned and crispy, 15-20 minutes more. \r\n\r\n4. While veggies roast, pat chicken dry with paper towels; season all over with salt and pepper. Heat a drizzle of oil in a large pan over medium-high heat. Add chicken and cook until browned and cooked through, 5-6 minutes per side. (If chicken browns too quickly, reduce heat to medium.) Turn off heat; set chicken aside to rest. Wash out pan. \r\n\r\n5. Heat pan used for chicken over medium-high heat. Add a drizzle of oil and remaining garlic; cook until fragrant, 30 seconds. Stir in vinegar, honey, stock concentrate, and 1/4 cup water (1/3 cup for 4 servings). Simmer until thick and glossy, 2-3 minutes. Remove from heat and stir in 1 TBSP butter (2 TBSP for 4). Season with salt and pepper. \r\n\r\n6. Return chicken to pan and turn to coat in glaze. Divide chicken, broccoli, and potatoes between plates. Spoon any remaining glaze over chicken and serve. "
    }
    ,
    {
      id: 83,
      image: "https://www.themealdb.com/images/media/meals/xrysxr1483568462.jpg",
      title: "Hot Chocolate Fudge",
      category: "Snacks",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Chocolate Chips",quantity:'2 cups'}, {name:"Heavy Cream",quantity:'2 tbs'}, {name:"Condensed Milk",quantity:'1 – 14-ounce can'}, {name:"Vanilla Extract",quantity:'1 tsp'}, {name:"White Chocolate Chips",quantity:'1-⅓ cups'}, {name:"Miniature Marshmallows",quantity:'1-½ cups'},],
      idMeal:52787,
      youtube_Url:"https://www.youtube.com/watch?v=oJvbsVSblfk",
      Instruction:"Line an 8-inch-square baking pan with wax paper or foil, and coat with non-stick spray.\r\nIn a microwave-safe bowl, combine the dark chocolate chips, heavy cream and half of the sweetened condensed milk. Microwave the dark chocolate mixture in 20-second intervals, stirring in between each interval, until the chocolate is melted.\r\nAdd the vanilla extract to the dark chocolate mixture and stir well until smooth.\r\nTransfer the dark chocolate mixture into the prepared pan and spread into an even layer.\r\nIn a separate bowl, combine the white chocolate chips with the remaining half of the sweetened condensed milk. Microwave the white chocolate mixture in 20-second intervals, stirring in between each interval, until the chocolate is melted.\r\nEvenly spread the white chocolate mixture on top of dark chocolate layer.\r\nTop the chocolate layers with the Mallow Bits or miniature marshmallows, and gently press them down.\r\nRefrigerate for 4 hours, or until set.\r\nRemove the fudge and wax paper from the pan. Carefully peel all of the wax paper from the fudge.\r\nCut the fudge into bite-sized pieces and serve."
    }
    ,
    {
      id: 84,
      image: "https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg",
      title: "Kentucky Fried Chicken",
      category: "Lunch",
      country: "American",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Chicken",quantity:'1 whole'}, {name:"Oil",quantity:'2 quarts neutral frying'}, {name:"Egg White",quantity:1}, {name:"Flour",quantity:'1 1/2 cups '}, {name:"Brown Sugar",quantity:'1 tablespoon'}, {name:"Salt",quantity:'1 tablespoon '}, {name:"paprika",quantity:'1 tablespoon'},{name:"onion salt",quantity:'2 teaspoons'},{name:"chili powder",quantity:'1 teaspoon'},{name:"black pepper",quantity:'1 teaspoon'},{name:"celery salt",quantity:'1/2 teaspoon'},{name:"sage",quantity:'1/2 teaspoon'},{name:"garlic powder",quantity:'1/2 teaspoon'},{name:"allspice",quantity:'1/2 teaspoon'},{name:"oregano",quantity:'1/2 teaspoon'},{name:"basil",quantity:'1/2 teaspoon'},{name:"marjoram",quantity:'1/2 teaspoon'}],
      idMeal:52813,
      youtube_Url:"https://www.youtube.com/watch?v=PTUxCvCz8Bc",
      Instruction:"Preheat fryer to 350°F. Thoroughly mix together all the spice mix ingredients.\r\nCombine spice mix with flour, brown sugar and salt.\r\nDip chicken pieces in egg white to lightly coat them, then transfer to flour mixture. Turn a few times and make sure the flour mix is really stuck to the chicken. Repeat with all the chicken pieces.\r\nLet chicken pieces rest for 5 minutes so crust has a chance to dry a bit.\r\nFry chicken in batches. Breasts and wings should take 12-14 minutes, and legs and thighs will need a few more minutes. Chicken pieces are done when a meat thermometer inserted into the thickest part reads 165°F.\r\nLet chicken drain on a few paper towels when it comes out of the fryer. Serve hot."
    }
    ,
    {
      id: 85,
      image: "https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg",
      title: "Key Lime Pie",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Digestive Biscuits",quantity:'300g'}, {name:"Butter",quantity:'150g'}, {name:"Condensed Milk",quantity:'400g '}, {name:"Egg Yolks",quantity:3}, {name:"Lime",quantity:4}, {name:"Double Cream",quantity:'300ml '}, {name:"Icing Sugar",quantity:'1 tbls'},{name:"Lime",quantity:'to serve'}],
      idMeal:52859,
      youtube_Url:"https://www.youtube.com/watch?v=q4Rz7tUkX9A",
      Instruction:"Heat the oven to 160C/fan 140C/gas 3. Whizz the biscuits to crumbs in a food processor (or put in a strong plastic bag and bash with a rolling pin). Mix with the melted butter and press into the base and up the sides of a 22cm loose-based tart tin. Bake in the oven for 10 minutes. Remove and cool.\r\nPut the egg yolks in a large bowl and whisk for a minute with electric beaters. Add the condensed milk and whisk for 3 minutes then add the zest and juice and whisk again for 3 minutes. Pour the filling into the cooled base then put back in the oven for 15 minutes. Cool then chill for at least 3 hours or overnight if you like.\r\nWhen you are ready to serve, carefully remove the pie from the tin and put on a serving plate. To decorate, softly whip together the cream and icing sugar. Dollop or pipe the cream onto the top of the pie and finish with extra lime zest."
    }
    ,
    {
      id: 86,
      image: "https://www.themealdb.com/images/media/meals/4i5cnx1587672171.jpg",
      title: "Krispy Kreme Donut",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Yeast",quantity:'1/4 ounce'}, {name:"Water",quantity:'1/4 cup'}, {name:"Water",quantity:'1 1/2 cups '}, {name:"Sugar",quantity:'1/2 cup '}, {name:"Salt",quantity:'1 tsp '}, {name:"Salt",quantity:2}, {name:"Shortening",quantity:'1/3 cup'},{name:"Flour",quantity:'5 drops'},{name:"Canola Oil",quantity:'Sprinking'},{name:"Milk",quantity:'1/2 cup'},{name:"Sugar",quantity:'2 cups '},{name:"Vanilla",quantity:'1 1/2 cups '},{name:"Boiling Water",quantity:'6 tablespoons'},{name:"Butter",quantity:' 1/3 cup'}],
      idMeal:53015,
      youtube_Url:"https://www.youtube.com/watch?v=SamYg6IUGOI",
      Instruction:"Dissolve yeast in warm water in 2 1/2-quart bowl. Add milk, sugar, salt, eggs, shortening and 2 cups flour. Beat on low for 30 seconds, scraping bowl constantly. Beat on medium speed for 2 minutes, scraping bowl occasionally. Stir in remaining flour until smooth. Cover and let rise until double, 50-60 minutes. (Dough is ready when indentation remains when touched.) Turn dough onto floured surface; roll around lightly to coat with flour. Gently roll dough 1/2-inch thick with floured rolling pin. Cut with floured doughnut cutter. Cover and let rise until double, 30-40 minutes.\r\nHeat vegetable oil in deep fryer to 350°. Slide doughnuts into hot oil with wide spatula. Turn doughnuts as they rise to the surface. Fry until golden brown, about 1 minute on each side. Remove carefully from oil (do not prick surface); drain. Dip the doughnuts into creamy glaze set on rack.\r\n\r\n\r\nGlaze: \r\nHeat butter until melted. Remove from heat. Stir in powdered sugar and vanilla until smooth. Stir in water, 1 tablespoon at a time, until desired consistency."
    }
    ,
    {
      id: 87,
      image: "https://www.themealdb.com/images/media/meals/xr0n4r1576788363.jpg",
      title: "Lasagna Sandwiches",
      category: "Brunch",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Sour Cream",quantity:'1/4 cup'}, {name:"Chopped Onion",quantity:'2 tbs'}, {name:"Dried Oregano",quantity:'1/2 tbs'}, {name:"Salt",quantity:'1/4 tsp'}, {name:"Bread",quantity:'8 slices'}, {name:"Bacon",quantity:'8 slices'}, {name:"Tomato",quantity:'8 slices'},{name:"Mozzarella",quantity:'4 slices'},{name:"Butter",quantity:'2 1/2 Tbs'}],
      idMeal:52987,
      youtube_Url:"",
      Instruction:"1. In a small bowl, combine the first four ingredients; spread on four slices of bread. Layer with bacon, tomato and cheese; top with remaining bread.\r\n\r\n2. In a large skillet or griddle, melt 2 tablespoons butter. Toast sandwiches until lightly browned on both sides and cheese is melted, adding butter if necessary.\r\n\r\nNutrition Facts\r\n1 sandwich: 445 calories, 24g fat (12g saturated fat), 66mg cholesterol, 1094mg sodium, 35g carbohydrate (3g sugars, 2g fiber), 21g protein."
    }
    ,
    {
      id: 88,
      image: "https://www.themealdb.com/images/media/meals/swttys1511385853.jpg",
      title: "New York cheesecake",
      category: "Breakfast",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Butter",quantity:'85g'}, {name:"Sour Cream",quantity:'140g'}, {name:"Sugar",quantity:'1tbsp'}, {name:"Cream Cheese",quantity:'900g'}, {name:"Caster Sugar",quantity:'250g'}, {name:"Plain Flour",quantity:'3 tbs'}, {name:"Lemon Juice",quantity:'1 ½ teaspoons'},{name:"Eggs",quantity:'3 Large'},],
      idMeal:52858,
      youtube_Url:"https://www.youtube.com/watch?v=tspdJ6hxqnc",
      Instruction:"Position an oven shelf in the middle of the oven. Preheat the oven to fan 160C/conventional 180C/gas 4. Line the base of a 23cm springform cake tin with parchment paper. For the crust, melt the butter in a medium pan. Stir in the biscuit crumbs and sugar so the mixture is evenly moistened. Press the mixture into the bottom of the pan and bake for 10 minutes. Cool on a wire rack while preparing the filling.\r\nFor the filling, increase the oven temperature to fan 200C/conventional 240C/gas 9. In a table top mixer fitted with the paddle attachment, beat the soft cheese at medium-low speed until creamy, about 2 minutes. With the mixer on low, gradually add the sugar, then the flour and a pinch of salt, scraping down the sides of the bowl and the paddle twice.\r\nSwap the paddle attachment for the whisk. Continue by adding the vanilla, lemon zest and juice. Whisk in the eggs and yolk, one at a time, scraping the bowl and whisk at least twice. Stir the 284ml carton of soured cream until smooth, then measure 200ml/7fl oz (just over 3⁄4 of the carton). Continue on low speed as you add the measured soured cream (reserve the rest). Whisk to blend, but don't over-beat. The batter should be smooth, light and somewhat airy.\r\nBrush the sides of the springform tin with melted butter and put on a baking sheet. Pour in the filling - if there are any lumps, sink them using a knife - the top should be as smooth as possible. Bake for 10 minutes. Reduce oven temperature to fan 90C/conventional 110C/gas 1⁄4 and bake for 25 minutes more. If you gently shake the tin, the filling should have a slight wobble. Turn off the oven and open the oven door for a cheesecake that's creamy in the centre, or leave it closed if you prefer a drier texture. Let cool in the oven for 2 hours. The cheesecake may get a slight crack on top as it cools.\r\nCombine the reserved soured cream with the 142ml carton, the sugar and lemon juice for the topping. Spread over the cheesecake right to the edges. Cover loosely with foil and refrigerate for at least 8 hours or overnight.\r\nRun a round-bladed knife around the sides of the tin to loosen any stuck edges. Unlock the side, slide the cheesecake off the bottom of the tin onto a plate, then slide the parchment paper out from underneath."
    }
    ,
    {
      id: 89,
      image: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
      title: "Pancakes",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Flour",quantity:'100g'}, {name:"Eggs",quantity:'2 large'}, {name:"Milk",quantity:'300ml '}, {name:"Sunflower Oil",quantity:'1 tbls'}, {name:"Sugar",quantity:'to serve'}, {name:"Raspberries",quantity:'to serve'}, {name:"Blueberries",quantity:'to serve'},],
      idMeal:52854,
      youtube_Url:"https://www.youtube.com/watch?v=LWuuCndtJr0",
      Instruction:"Put the flour, eggs, milk, 1 tbsp oil and a pinch of salt into a bowl or large jug, then whisk to a smooth batter. Set aside for 30 mins to rest if you have time, or start cooking straight away.\r\nSet a medium frying pan or crêpe pan over a medium heat and carefully wipe it with some oiled kitchen paper. When hot, cook your pancakes for 1 min on each side until golden, keeping them warm in a low oven as you go.\r\nServe with lemon wedges and sugar, or your favourite filling. Once cold, you can layer the pancakes between baking parchment, then wrap in cling film and freeze for up to 2 months."
    }
    ,
    {
      id: 90,
      image: "https://www.themealdb.com/images/media/meals/ssxvup1511387476.jpg",
      title: "Peach & Blueberry Grunt",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Corn Flour",quantity:'1 tsp'}, {name:"Orange",quantity:'Juice of 2 '}, {name:"Caster Sugar",quantity:'Zest of 1'}, {name:"Peaches",quantity:'2 tbs'}, {name:"Blueberries",quantity:6}, {name:"Self-raising Flour",quantity:'250g'}, {name:"Butter",quantity:'200g'}, {name:"Muscovado Sugar",quantity:'50g'},{name:"Cinnamon",quantity:'1 tsp  '},{name:"Milk",quantity:'6 tblsp'}],
      idMeal:52862,
      youtube_Url:"https://www.youtube.com/watch?v=SNeO28BCpsc",
      Instruction:"Heat oven to 190C/170C fan/gas 5. Butter a wide shallow ovenproof dish. Blend the cornflour with the orange zest and juice, and put in a large pan with the sugar. Halve, stone and slice the peaches and add to the pan. Bring slowly to the boil, stirring gently until the sauce is shiny and thickened, about 3-4 mins. Remove from the heat, stir in the blueberries and tip into the prepared dish.\r\nTip the flour into a mixing bowl and add the 50g butter. Rub the butter into the flour until it resembles fine breadcrumbs, then stir in half the sugar. Mix the remaining sugar with the cinnamon and set aside.\r\nAdd the milk to the dry ingredients and mix to a soft dough. Turn out onto a lightly floured surface and knead briefly. Roll out to an oblong roughly 16 x 24cm. Brush with melted butter and sprinkle evenly with the spicy sugar. Roll up from one long side and cut into 12 slices. Arrange around the top of the dish, leaving the centre uncovered.\r\nBake for 20-25 mins, until the topping is crisp and golden. Serve warm."
    }
    ,
    {
      id: 91,
      image: "https://www.themealdb.com/images/media/meals/qtuuys1511387068.jpg",
      title: "Peanut Butter Cheesecake",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Butter",quantity:'50g '}, {name:"Peanut Cookies",quantity:'175g '}, {name:"Gelatine Leafs",quantity:5}, {name:"Ricotta",quantity:'500g'}, {name:"Peanut Butter",quantity:'175g'}, {name:"Golden Syrup",quantity:'175g'}, {name:"Milk",quantity:'150ml'}, {name:"Double Cream",quantity:'275ml'},{name:"Light Brown Soft Sugar",quantity:'2 tblsp '},{name:"Peanut Brittle",quantity:'Crushed'}],
      idMeal:52861,
      youtube_Url:"https://www.youtube.com/watch?v=QSTsturcyL0",
      Instruction:"Oil and line a 20cm round loose- bottomed cake tin with cling film, making it as smooth as possible. Melt the butter in a pan. Crush the biscuits by bashing them in a bag with a rolling pin, then stir them into the butter until very well coated. Press the mixture firmly into the base of the tin and chill.\r\nSoak the gelatine in water while you make the filling. Tip the ricotta into a bowl, then beat in the peanut butter and syrup. Ricotta has a slightly grainy texture so blitz until smooth with a stick blender for a smoother texture if you prefer.\r\nTake the soaked gelatine from the water and squeeze dry. Put it into a pan with the milk and heat very gently until the gelatine dissolves. Beat into the peanut mixture, then tip onto the biscuit base. Chill until set.\r\nTo freeze, leave in the tin and as soon as it is solid, cover the surface with cling film, then wrap the tin with cling film and foil.\r\nTo defrost, thaw in the fridge overnight.\r\nTo serve, carefully remove from the tin. Whisk the cream with the sugar until it holds its shape, then spread on top of the cheesecake and scatter with the peanut brittle."
    }
    ,
    {
      id: 92,
      image: "https://www.themealdb.com/images/media/meals/1544384070.jpg",
      title: "Peanut Butter Cookies",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Peanut Butter",quantity:'1 cup '}, {name:"Sugar",quantity:'1/2 cup '}, {name:"Egg",quantity:'1'},],
      idMeal:52958,
      youtube_Url:"",
      Instruction:"Preheat oven to 350ºF (180ºC).\r\nIn a large bowl, mix together the peanut butter, sugar, and egg.\r\nScoop out a spoonful of dough and roll it into a ball. Place the cookie balls onto a nonstick baking sheet.\r\nFor extra decoration and to make them cook more evenly, flatten the cookie balls by pressing a fork down on top of them, then press it down again at a 90º angle to make a criss-cross pattern.\r\nBake for 8-10 minutes or until the bottom of the cookies are golden brown.\r\nRemove from baking sheet and cool.\r\nEnjoy!"
    }
    ,
    {
      id: 93,
      image: "https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg",
      title: "Pumpkin Pie",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Pumpkin",quantity:'750g'}, {name:"Shortcrust Pastry",quantity:'350g'}, {name:"Plain Flour",quantity:'Dusting'},{name:"Caster Sugar",quantity:'140g'},{name:"Salt",quantity:'½ tsp'},{name:"Nutmeg",quantity:'½ tsp'},{name:"Cinnamon",quantity:'1 tsp '},{name:"Eggs",quantity:'2 Beaten '},{name:"Butter",quantity:'25g'},{name:"Milk",quantity:'175g'},{name:"Icing Sugar",quantity:'1 tblsp '}],
      idMeal:52857,
      youtube_Url:"https://www.youtube.com/watch?v=hpapqEeb36k",
      Instruction:"Place the pumpkin in a large saucepan, cover with water and bring to the boil. Cover with a lid and simmer for 15 mins or until tender. Drain pumpkin; let cool.\r\nHeat oven to 180C/160C fan/gas 4. Roll out the pastry on a lightly floured surface and use it to line a 22cm loose-bottomed tart tin. Chill for 15 mins. Line the pastry with baking parchment and baking beans, then bake for 15 mins. Remove the beans and paper, and cook for a further 10 mins until the base is pale golden and biscuity. Remove from the oven and allow to cool slightly.\r\nIncrease oven to 220C/200C fan/gas 7. Push the cooled pumpkin through a sieve into a large bowl. In a separate bowl, combine the sugar, salt, nutmeg and half the cinnamon. Mix in the beaten eggs, melted butter and milk, then add to the pumpkin purée and stir to combine. Pour into the tart shell and cook for 10 mins, then reduce the temperature to 180C/160C fan/gas 4. Continue to bake for 35-40 mins until the filling has just set.\r\nLeave to cool, then remove the pie from the tin. Mix the remaining cinnamon with the icing sugar and dust over the pie. Serve chilled."
    }
    ,
    {
      id: 94,
      image: "https://www.themealdb.com/images/media/meals/ysqrus1487425681.jpg",
      title: "Roasted Eggplant With Tahini, Pine Nuts, and Lentils",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Olive Oil",quantity:'2 tablespoons'}, {name:"Carrots",quantity:'2 small cut into chunks'}, {name:"Celery",quantity:'2 small stalks'},{name:"Onion",quantity:'1 medium finely diced'},{name:"Garlic",quantity:'6 medium cloves sliced'},{name:"Brown Lentils",quantity:'12 ounces (340g)'},{name:"Bay Leaves",quantity:2},{name:"Water",quantity:'4 cups'},{name:"Salt",quantity:'Pinch'},{name:"Apple Cider Vinegar",quantity:'2 teaspoons (10ml)'},{name:"Pepper",quantity:'Pinch'},{name:"Egg Plants",quantity:'2 large'},{name:"Rosemary",quantity:'4 sprigs'},{name:"Pine nuts",quantity:'1/4 cup '},{name:"Parsley",quantity:'2 tablespoons'}],
      idMeal:52816,
      youtube_Url:"https://www.youtube.com/watch?v=HkywCtna9t0",
      Instruction:"For the Lentils: Adjust oven rack to center position and preheat oven to 450°F to prepare for roasting eggplant. Meanwhile, heat 2 tablespoons olive oil in a medium saucepan over medium heat until shimmering. Add carrots, celery, and onion and cook, stirring, until softened but not browned, about 4 minutes. Add garlic and cook, stirring, until fragrant, about 30 seconds. Add lentils, bay leaves, stock or water, and a pinch of salt. Bring to a simmer, cover with the lid partially ajar, and cook until lentils are tender, about 30 minutes. (Top up with water if lentils are at any point not fully submerged.) Remove lid, stir in vinegar, and reduce until lentils are moist but not soupy. Season to taste with salt and pepper, cover, and keep warm until ready to serve.\r\n\r\n2.\r\nFor the Eggplant: While lentils cook, cut each eggplant in half. Score flesh with the tip of a paring knife in a cross-hatch pattern at 1-inch intervals. Transfer to a foil-lined rimmed baking sheet, cut side up, and brush each eggplant half with 1 tablespoon oil, letting each brushstroke be fully absorbed before brushing with more. Season with salt and pepper. Place a rosemary sprig on top of each one. Transfer to oven and roast until completely tender and well charred, 25 to 35 minutes. Remove from oven and discard rosemary.\r\n\r\n3.\r\nTo Serve: Heat 2 tablespoons olive oil and pine nuts in a medium skillet set over medium heat. Cook, tossing nuts frequently, until golden brown and aromatic, about 4 minutes. Transfer to a bowl to halt cooking. Stir half of parsley and rosemary into lentils and transfer to a serving platter. Arrange eggplant halves on top. Spread a few tablespoons of tahini sauce over each eggplant half and sprinkle with pine nuts. Sprinkle with remaining parsley and rosemary, drizzle with additional olive oil, and serve."
    }
    ,
    {
      id: 95,
      image: "https://www.themealdb.com/images/media/meals/vtxyxv1483567157.jpg",
      title: "Rocky Road Fudge",
      category: "Dessert",
      country: "American",
      isVeg: true,
      poster: "Foodie Alex",
      ingredients: [{name:"Miniature Marshmallows",quantity:'2 cups'}, {name:"Chocolate Chips",quantity:'3 cups'}, {name:"Peanut Butter",quantity:'½ cup'},{name:"Vanilla Extract",quantity:'1 tsp'},{name:"Peanuts",quantity:'1 ¼ cups'}],
      idMeal:52786,
      youtube_Url:"https://www.youtube.com/watch?v=N1aJ3nEYXyg",
      Instruction:"Line an 8-inch-square baking pan with wax paper or foil, and coat with non-stick spray.\r\nPour ½ cup of the miniature marshmallows into the bottom of the lined baking dish.\r\nIn a microwave-safe bowl, combine the chocolate chips and peanut butter. Microwave the chocolate mixture in 20-second intervals, stirring in between each interval, until the chocolate is melted.\r\nAdd the vanilla extract and stir well, until smooth.\r\nReserve 2 tablespoons of the chopped almonds or peanuts, and set aside.\r\nFold 1 ½ cups of the miniature marshmallows and the remaining chopped nuts into the chocolate mixture.\r\nTransfer the chocolate mixture into the prepared pan and spread into an even layer. Immediately top with the reserved chopped nuts and the mallow bits or additional miniature marshmallows, if using.\r\nRefrigerate for 4 hours, or until set.\r\nRemove the fudge and wax paper from the pan. Carefully peel all of wax paper from the fudge.\r\nCut the fudge into bite-sized pieces and serve."
    }
    ,
    {
      id: 96,
      image: "https://www.themealdb.com/images/media/meals/1550440197.jpg",
      title: "Salmon Eggs Eggs Benedict",
      category: "Breakfast",
      country: "American",
      isVeg: false,
      poster: "Foodie Alex",
      ingredients: [{name:"Eggs",quantity:4}, {name:"White Wine Vinegar",quantity:'2 tbs'}, {name:"English Muffins",quantity:2},{name:"Butter",quantity:'To serve'},{name:"Smoked Salmon",quantity:'8 slices'},{name:"Lemon Juice",quantity:'2 tsp'},{name:"White Wine Vinegar",quantity:'2 tsp'},{name:"Egg",quantity:'3 Yolkes'},{name:"Unsalted Butter",quantity:'125g'}],
      idMeal:52962,
      youtube_Url:"https://www.youtube.com/watch?v=Woiiet4vQ58",
      Instruction:"First make the Hollandaise sauce. Put the lemon juice and vinegar in a small bowl, add the egg yolks and whisk with a balloon whisk until light and frothy. Place the bowl over a pan of simmering water and whisk until mixture thickens. Gradually add the butter, whisking constantly until thick – if it looks like it might be splitting, then whisk off the heat for a few mins. Season and keep warm.\r\n\r\nTo poach the eggs, bring a large pan of water to the boil and add the vinegar. Lower the heat so that the water is simmering gently. Stir the water so you have a slight whirlpool, then slide in the eggs one by one. Cook each for about 4 mins, then remove with a slotted spoon.\r\n\r\nLightly toast and butter the muffins, then put a couple of slices of salmon on each half. Top each with an egg, spoon over some Hollandaise and garnish with chopped chives."
    }
  ];


  // Filtering meals dynamically based on searchTerm
  const filteredMeals = meals.filter((meal) =>
    meal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

    // Get currently visible meals
  const visibleMeals = filteredMeals.slice(0, visibleItems);

  // Handle loading more items
  const handleLoadMore = () => {
    setLoadingforitems(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleItems(prev => prev + ITEMS_PER_PAGE);
      setLoadingforitems(false);
    }, 3000);
  };

  const getMealInfoByClickingOnButton = (meals) => {
    return getMealInfo(meals,dispatch)
  }

  // const MealSaveSuccess = (meals) => {
  //   toast.success("Meal Saved")
  //   dispatch(addMealToFavorites(meals))
  //   // return getSavedMealData(meals,dispatch)
  // }

  const handleFilter = async(id) => {
    console.log("Clicked item ID:", id);
    setSelectedItemId(id);
     
    // Ensure meals exist
    if (!meals || meals.length === 0) {
      console.log("No meals available");
      return;
    }

    // const userId = getUserID();
    if (!UserId) {
    console.error("No user ID found. User might not be logged in.");
    return;
  }

    console.log("Original array length:", meals.length);

    // Filter meals based on clicked ID
    const filteredMeals = meals.filter((meal) => meal.id === id);
    console.log("Filtered array length:", filteredMeals.length);
    console.log("The selected Filtered array is:", filteredMeals);
    toast.success("Meal Saved");
    // Dispatch the filtered result
    if (filteredMeals.length > 0) {
      dispatch(addMealToFavorites(filteredMeals[0])); // This sends a single object
    }
    try {
      const savefoodimagetostorage = await saveFoodImageToStorage(filteredMeals[0]?.title,filteredMeals[0]?.image,UserId,dispatch)
      if(savefoodimagetostorage){
        console.log("Image successfully get to storage(MainHome.jsx)")
      }
    } catch (error) {
      console.log("Error while saving food image pic to storage (MainHome.jsx):",error.message)
    }
    dispatch(addMealToFavorites(filteredMeals));
  };
  

  const SearchBar = ({ className }) => (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="text-black w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Search Meals ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 text-black border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>
  );

  return (
    <div
      className={`min-h-screen relative ${
        darkMode ? "bg-slate-900 text-white" : "bg-[#ffbb00b9]"
      }`}
      >
      <ToastContainer/>
      {/* Sticky Header */}
      <header className="sticky lw:rounded-b-2xl  rounded-b-3xl  top-0 z-50 bg-white dark:bg-slate-800 shadow-md">
        {/* Large Screen Header */}
        <div className="hidden lg:flex items-center justify-center p-4">
          <div className="absolute left-4 lg:block mb-1">
            <Link to="/home">
            <div className="flex justify-center items-center gap-2">
              <img
                src={logoImage}
                alt="MealMind Logo"
                className="w-10 h-10 rounded-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
              <span className="text-2xl font-bold text-orange-600">
                MealMind
              </span>
            </div>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4 w-full max-w-xl">
            <SearchBar />
          </div>

          <div className="absolute right-4 flex space-x-4">
            {/* <Link to="/favourites"> */}
            <Link to="/logout">
            <LogOut onClick={LoginPage} className="cursor-pointer text-slate-600 hover:text-teal-600"/>
            {/* <Star  /> */}
            </Link>
            {/* </Link> */}
            <Link to="/favourites">
            <Star className="cursor-pointer text-slate-600 hover:text-teal-600" />
            </Link>
             <Link to="/shopping">
            <ShoppingCart className="cursor-pointer text-slate-600 hover:text-teal-600" />
            </Link>
            <Link to="/profile">
            <User className="cursor-pointer text-slate-600 hover:text-teal-600" />
            </Link>
            {darkMode ? (
              <Sun
                onClick={() => setDarkMode(false)}
                className="cursor-pointer hover:text-yellow-500"
              />
            ) : (
              <Moon
                onClick={() => setDarkMode(true)}
                className="cursor-pointer text-gray-600 hover:text-blue-500"
              />
            )}
           
          </div>
        </div>

        {/* Tablet/Mid-Screen Header */}
        <div className="hidden md:block lg:hidden p-4">
          <div className="flex items-center justify-between mb-3">
            <Link to="/home">
            <div className="flex justify-center items-center gap-2">
              <img
                src={logoImage}
                alt="MealMind Logo"
                className="w-10 h-10 rounded-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
              <span className="text-2xl font-bold text-orange-600">
                MealMind
              </span>
            </div>
            </Link>
            <Menu
              className="cursor-pointer text-[#ffd504]"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
          <div className="mt-2">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden flex flex-col items-center p-4">
          <div className="w-full flex justify-between items-center mb-3">
            <Link to="/home">
            <div className="flex justify-center items-center gap-2">
              <img
                src={logoImage}
                alt="MealMind Logo"
                className="w-10 h-10 rounded-full object-cover transform hover:scale-110 transition-transform duration-300"
              />
              <span className="text-2xl font-bold text-orange-600">
                MealMind
              </span>
            </div>
            </Link>
            <Menu
              className="cursor-pointer text-[#7e0dff]"
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </div>
          <SearchBar />
        </div>
      </header>

      {/* Meal Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lq:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
        {visibleMeals.map((meal) => (
          <motion.div
            key={meal.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700"
          >
            <div className="relative">
              <img
                src={meal.image}
                alt={meal.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Star onClick={() => handleFilter(meal.id)} className="w-8 h-8 p-1.5 bg-white/80 rounded-full text-yellow-500 cursor-pointer hover:bg-white transition-colors duration-200" />
                <span>
                  <ShoppingCart onClick={() => ImageSaveToCart(meal.id)} className="w-8 h-8 p-1.5 bg-white/80 rounded-full text-teal-600 cursor-pointer hover:bg-white transition-colors duration-200" />
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                  {meal.title}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {meal.category}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-serif font-[700] text-[purple] bg-green-100">
                    {meal.country}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    meal.isVeg 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {meal.isVeg ? "Vegetarian" : "Non-Veg"}
                  </span>
                </div>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Posted by {meal.poster}
                </div>
              </div>
              <Link to="/ingredients">
                <button
                onClick={() => getMealInfoByClickingOnButton(meal)}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-200">
                  <FaListUl />
                  <span>View Ingredients</span>
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button - Only shown if there are more items */}
      {visibleItems < filteredMeals.length && (
        <div className="flex justify-center pb-8">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors duration-200 disabled:bg-teal-300"
          >
            {loadingforitems ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaListUl className="w-5 h-5" />
                </motion.div>
                <span><PulseLoader color="white" /></span>
              </>
            ) : (
              <>
                {/* <FaListUl className="w-5 h-5" /> */}
                <span>Load More</span>
              </>
            )}
          </button>
        </div>
      )}
      

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] flex items-end"
          >
            <motion.div
              initial={{ translateY: "100%" }}
              animate={{ translateY: 0 }}
              exit={{ translateY: "100%" }}
              className="w-full bg-[#ffc400] dark:bg-slate-800 rounded-t-2xl p-6 space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-teal-600">Menu</span>
                <X
                  className="cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              </div>
              <div className="space-y-4">
                <div
                onClick={LoginPage}
                className="flex items-center space-x-3 cursor-pointer">
                {/* <Link to="/favourites"> */}
                  <LogOut className="text-slate-600" />
                {/* </Link> */}
                  <span>Logout</span>
                </div>
                <div className="flex items-center space-x-3">
                <Link to="/favourites">
                  <Star className="text-slate-600" />
                </Link>
                  <span>Saved Meals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Link to="/shopping">
                  <ShoppingCart className="text-slate-600" />
                  </Link>
                  <span>Shopping List</span>
                </div>
                <div className="flex items-center space-x-3">
                <Link to="/profile">
                  <User className="text-slate-600" />
                </Link>
                  <span>Profile</span>
                </div>
                <div className="flex items-center space-x-3">
                  {darkMode ? (
                    <Sun
                      onClick={() => setDarkMode(false)}
                      className="text-yellow-500 cursor-pointer"
                    />
                  ) : (
                    <Moon
                      onClick={() => setDarkMode(true)}
                      className="text-blue-500 cursor-pointer"
                    />
                  )}
                  <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MealMindHomepage;
