import React from "react";
import styles from "./header.module.scss";
import { Image } from "react-bootstrap";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <CustomContainer>
        <div className={styles.wrap}>
          <div>
            {/* <Link href="/"> */}
              <Image src="/logo/logo_h.png" fluid width={200} alt="logo" />
            {/* </Link> */}
          </div>
          {/* <nav>srg</nav> */}
        </div>
      </CustomContainer>
    </header>
  );
};

export default Header;
