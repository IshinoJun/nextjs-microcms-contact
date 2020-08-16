import { NextPage } from "next";
import * as React from "react";
import Link from "next/link";
import style from "./index.module.scss";

const Home: NextPage = () => {
  return <Link  href="/contact" as={`/contact`} className={style.bold}>Hello contact!</Link>;
};

export default Home;
