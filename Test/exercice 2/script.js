const users = [
  {
    _id: "ab12ex",
    username: "Alex",
    email: "alex@alex.com",
    password: "123123",
    createdAt: "17/05/2019 9:00 AM",
    isLoggedIn: false,
  },
  {
    _id: "fg12cy",
    username: "Asab",
    email: "asab@asab.com",
    password: "123456",
    createdAt: "17/05/2019 9:30 AM",
    isLoggedIn: true,
  },
  {
    _id: "zwf8md",
    username: "Brook",
    email: "brook@brook.com",
    password: "123111",
    createdAt: "17/05/2019 9:45 AM",
    isLoggedIn: true,
  },
  {
    _id: "eefamr",
    username: "Martha",
    email: "martha@martha.com",
    password: "123222",
    createdAt: "17/05/2019 9:50 AM",
    isLoggedIn: false,
  },
  {
    _id: "ghderc",
    username: "Thomas",
    email: "thomas@thomas.com",
    password: "123333",
    createdAt: "17/05/2019 10:00 AM",
    isLoggedIn: false,
  },
];

const products = [
  {
    _id: "eedfcf",
    name: "mobile phone",
    description: "Huawei Honor",
    price: 200,
    ratings: [
      { userId: "fg12cy", rate: 5 },
      { userId: "zwf8md", rate: 4.5 },
      { userId: "Afaf", rate: 2 },
    ],
    likes: [],
  },
  {
    _id: "aegfal",
    name: "Laptop",
    description: "MacPro: System Darwin",
    price: 2500,
    ratings: [],
    likes: ["fg12cy"],
  },
  {
    _id: "hedfcg",
    name: "TV",
    description: "Smart TV:Procaster",
    price: 400,
    ratings: [{ userId: "fg12cy", rate: 5 }],
    likes: ["fg12cy"],
  },
];
///////////////////////////////////////////////////////////////
//USERS//
//SignUp
function signUp(newUser, users) {
  // check if the user already exists
  const userExists = users.find((u) => u.email === newUser.email);

  if (userExists) {
    return {
      success: false,
      message: "User already exists",
    };
  }

  /////////////////////////////////////////////////////////////////////

  // if user doesn't exist, add new user
  const NewUser = {
    _id: Math.random().toString(36).substr(2, 9),
    username: newUser.username,
    email: newUser.email,
    password: newUser.password,
    createdAt: new Date().toLocaleString(),
  };
  users.push(NewUser);
  return {
    success: true,
    user: NewUser,
  };
}
// testing the function (signUp)
const newUser = {
  username: "Raouf",
  email: "raouflazouni99@gmail.com",
  password: "**************",
};
console.log(signUp(newUser, users));
console.log(signUp(newUser, users));

//////////////////////////////////////////////////////////////////////////

//SignIn
function signIn(users, user) {
  // check if the user exists
  const userExists = users.find((u) => u.email === user.email);
  if (!userExists) {
    return {
      success: false,
      message: "User does not exist",
    };
  }
  // if user exists, check if password is correct
  if (userExists.password === user.password) {
    return {
      success: true,
      user: userExists,
      message: "User logged in",
    };
  }
  return {
    success: false,
    message: "Password is incorrect",
  };
}
//testing the function (signIn)
console.log(signIn(users, newUser));

//////////////////////////////////////////////////////////////////////

//PRODUCTS
//rate product
function rateProduct(productId, userId, rate) {
  //first - checking if user exists
  const userExists = users.find((u) => u._id === userId);
  if (!userExists) {
    return {
      success: false,
      message: "User does not exist",
    };
  }
  //second - checking if the product exists
  const productExists = products.find((u) => u._id === productId);
  if (!productExists) {
    return {
      success: false,
      message: "Product does not exist",
    };
  } else {
    products.map((u) => {
      if (u._id == productId) {
        u.ratings.push({ userId: userId, rate: rate });
      }
    });
  }
}
//testing the rateProduct function
rateProduct("eedfcf", "ghderc", 1);
console.log(products);

/////////////////////////////////////////////////////////////////////////

//AVERAGE RATING
function averageRating(utilisateur, userid) {
  // check if the user exists first
  const userExist = utilisateur.find((u) => u._id === userid);
  if (!userExist) {
    return {
      success: false,
      message: "User does not exist",
    };
  }
  let sum = 0;
  let count = 0;
  userExist.ratings.forEach((r) => {
    sum += r.rate;
    count++;
  });
  return {
    success: true,
    average: sum / count,
  };
}
//testing the function (averageRating)
console.log(averageRating(products, "eedfcf"));

//////////////////////////////////////////////////////////////////////

//like product
function likeProduct(productId, userId) {
  //first - checking if user exists
  const userExists = users.find((u) => u._id === userId);
  if (!userExists) {
    return {
      success: false,
      message: "User does not exist",
    };
  }
  //second - checking if the product exists
  const productExists = products.find((u) => u._id === productId);
  if (!productExists) {
    return {
      success: false,
      message: "Product does not exist",
    };
  } else {
    products.map((u) => {
      if (u._id == productId) {
        u.likes.push(userId);
      }
    });
  }
}
// testing the likeProduct function
likeProduct("eedfcf", "ghderc");
console.log(products);
