import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import TOKEN_DETAILS from "../config/index.js";
import fetch from "node-fetch";
import User from "../models/user.model.js";

const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      const { name, email, phone, password, isAdmin } = req.body;
      const userExist = await User.findOne({ email });

      const users = await User.find();

      const phoneNumberExist = users.some((user) => user.phone == phone);
      if (phoneNumberExist) {
        return res.status(400).send({ message: "Phone number already exists" });
      } else if (userExist) {
        return res.status(400).send({ message: "Email already exists" });
      } else {
        const userCreated = await User.create({
          name,
          email,
          phone,
          password,
          isAdmin,
        });

        res.status(201).send({
          success: true,
          data: userCreated,
          message: "user registred successfully",
        });
      }
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).send({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // if validation errros exist <<<<<<<<<<<<<<<
      return res.status(400).send({ errors: errors.array() });
    } else {
      const { email, password } = req.body;
      const userExist = await User.findOne({ email });

      if (!userExist) {
        return res.status(400).send({
          message: "Invalid Credentials",
        });
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          userExist.password
        );

        if (isPasswordMatch) {
          res.status(200).send({
            success: true,
            access_token: await userExist.generateAccessToken(),
            refresh_token: await userExist.generateRefreshToken(),
            message: "user login successfully",
            userId: userExist._id.toString(),
            user: {
              _id: userExist._id.toString(),
              name: userExist?.name,
              email: userExist?.email,
              shop: userExist?.shop,
              access_token: userExist?.access_token,
            },
          });
        } else {
          return res.status(401).send({
            message: "Invalid email or passoword",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};

const userDetails = async (req, res) => {
  try {
    const userExist = await User.findById({ _id: req.user.userId });
    if (!userExist) {
      return res.status(400).send({
        message: "User not found",
      });
    } else {
      res.status(200).send({
        success: true,
        user: userExist,
        message: "user found successfully",
      });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).send({ msg: error });
  }
};

const refreshToken = async (req, res) => {
  const token = req.body.refresh_token;
  if (!token) {
    return res.status(200).send({
      success: false,
      message: "A token is required for authorization",
    });
  }
  try {
    const decodedUser = jwt.verify(token, TOKEN_DETAILS.REFRESH_SECRET_KEY);
    if (decodedUser) {
      const token = jwt.sign(
        {
          userId: decodedUser?.userId.toString(),
        },
        TOKEN_DETAILS.JWT_SECRET_KEY,
        {
          expiresIn: TOKEN_DETAILS.ACCESS_TOKEN_EXPIRATION_TIME,
        }
      );

      return res.status(200).send({
        access_token: token,
        message: "new token generated successfully",
      });
    } else {
      return res.send({ message: "invalid token" });
    }
  } catch (error) {
    return res.status(400).send({ message: "invalid token" });
  }
};

const verifyStoreCredentials = async (req, res) => {
  try {
    const { store, access_token } = req.body;
    if (store && access_token) {
      const response = await fetch(
        `https://${store}/admin/api/2024-01/shop.json`,
        {
          headers: {
            "X-Shopify-Access-Token": access_token,
          },
        }
      );

      if (response?.status === 200) {
        const { shop } = await response.json();

        const shop_name = shop.myshopify_domain
          ? shop.myshopify_domain.replace(".myshopify.com", "")
          : "";

        res.status(200).send({
          shop: shop_name,
          code: shop.myshopify_domain === store ? "SUCCESS" : "INAVALID_STORE",
          access_token: access_token,
        });
      } else if (response?.status === 401) {
        res.status(200).send({
          code: "AUTHORIZATION",
        });
      } else {
        res.status(200).send({
          code: "AUTHORIZATION",
        });
      }
    }
  } catch (error) {
    res.send({
      code: "NOT_FOUND",
    });
  }
};

const getStoreConfiguration = async (req, res) => {
  try {
    const { shop, access_token } = req.body;
    if (shop && access_token) {
      const response = await fetch(
        `https://${shop}.myshopify.com/admin/api/2024-01/shop.json`,
        {
          headers: {
            "X-Shopify-Access-Token": access_token,
          },
        }
      );
      if (response?.status === 200) {
        const { shop: shop_data } = await response.json();
        res.status(200).send({
          currency: shop_data?.currency,
          code:
            shop_data?.myshopify_domain === `${shop}.myshopify.com`
              ? "SUCCESS"
              : "INAVALID_STORE",
        });
      } else if (response?.status === 401) {
        res.status(200).send({
          code: "AUTHORIZATION",
        });
      }
    }
  } catch (error) {
    if (error?.code === "ENOTFOUND") {
      res.send({
        code: "NOT_FOUND",
      });
    }
  }
};

const updateUser = async (req, res) => {
  try {
    const { shop, access_token } = req.body;

    if (shop) {
      const userUpdated = await User.findByIdAndUpdate(
        { _id: req.user.userId },
        { shop, access_token: access_token }
      );
      if (!userUpdated) {
        return res.status(400).send({
          message: "User not found",
        });
      } else {
        res.status(200).send({
          success: true,
          user: userUpdated,
        });
      }
    } else {
      res.send({ message: "store name is required" });
    }
  } catch (error) {
    console.log(error, "error");
    res.status(500).send({ msg: error });
  }
};

const requestProducts = async (_req, res) => {
  const { keyword, rating, currency, page = 1 } = _req.query;
  const session = res.locals.shopify.session;
  if (!keyword) {
    return res
      .status(400)
      .json({ status: "failed", data: "keyword is required parameter" });
  }

  const searchUrl = encodeURIComponent(
    `https://www.aliexpress.com/w/wholesale-${replaceSpaces(
      keyword,
      "-"
    )}.html?catId=0&SearchText=${replaceSpaces(keyword, "+")}&page=${page}${
      rating === "true" ? "&isFavorite=y" : ""
    }`
  );

  try {
    const result = await scrapflyService.requestScrapfly(searchUrl, {
      tryCount: 6,
      parser: aliexpressListParser(),
      session,
      currency,
    });
    return result
      ? res.status(200).json({ status: "success", data: result })
      : res.status(500).json({
          status: "failed",
          data: "Not found",
        });
  } catch (error) {
    return res.status(500).json({ status: "failed", data: error.message });
  }
};

function aliexpressListParser(htmlRow) {
  const $ = cheerio.load(htmlRow);
  const scriptWithData = $('script:contains("window._dida_config_")')
    .first()
    .html();
  const regex = /_init_data_\s*=\s*{\s*data:\s*({.+}) }/;
  const match = scriptWithData.match(regex);
  if (match) {
    const jsonData = JSON.parse(match[1]);
    const rawData = jsonData.data.root.fields;
    if (rawData.pageInfo.success) {
      const products =
        rawData.mods.itemList?.content.map((item) => ({
          title: item.title?.displayTitle,
          price: item.prices?.salePrice?.formattedPrice,
          rating: item?.evaluation?.starRating,
          productId: item.productId,
          image: "https:" + item.image.imgUrl,
          detailsUrl:
            "https://www.aliexpress.com" +
            (item.productDetailUrl ?? `/item/${item.productId}.html`),
        })) ?? [];
      return {
        products: products,
        page: rawData.pageInfo.page,
        pageLimit: 60,
      };
    } else {
      return false;
    }
  } else {
    throw new Error("Data not found in script tag.");
  }
}

export {
  login,
  register,
  userDetails,
  refreshToken,
  verifyStoreCredentials,
  updateUser,
  getStoreConfiguration,
  requestProducts,
};
