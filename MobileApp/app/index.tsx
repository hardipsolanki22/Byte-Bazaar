import React, { useEffect } from "react";
import {  Redirect } from "expo-router";
import { ROUTES_PATH } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { currentUser } from "@/features/authSlice";
import { getHeroBanners } from "@/features/heroBannerSlice";
import { getCategories } from "@/features/categorySlice";
import { getProducts } from "@/features/productSlice";
import AppLoader from "@/components/AppLoader";
import { getUserCart } from "@/features/cartSlice";

const index = () => {
  const dispatch = useAppDispatch();
  const { appInitialized, isAuthenticated ,userData} = useAppSelector( (state) => state.users);
  const { loading: categoriesLoading } = useAppSelector((state) => state.categories);
  const { loading: heroBannerLoading } = useAppSelector((state) => state.heroBanners);
  const { loading: productsLoading } = useAppSelector((state) => state.products);

  useEffect(() => {
    (dispatch(currentUser()),
      dispatch(getCategories()),
      dispatch(getHeroBanners()),
      dispatch(getProducts()));
      dispatch(getUserCart());
  }, [dispatch]);

  if (!appInitialized || categoriesLoading === "pending" || heroBannerLoading === "pending" || productsLoading === "pending") return <AppLoader />;

  if (isAuthenticated && userData) return <Redirect href={ROUTES_PATH.home} />;
  else return <Redirect href={ROUTES_PATH.auth.LOGIN} />;
};

export default index;
