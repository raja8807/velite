import React from "react";
import styles from "./footer.module.scss";
import CustomContainer from "@/components/ui/custom_container/custom_container";
import { Col, Image, Row } from "react-bootstrap";
import Link from "next/link";
import PAGES from "@/constants/pages";
import SocialMedia from "@/components/social_media/social_media";
import { ArrowRight } from "react-bootstrap-icons";

export const DownloadSection = ({ isAbout }) => {
  return (
    <Col xs={12} md={6} lg={3}>
      <div className={`${styles.sec} ${styles.sec1}`}>
        {/* <h4>Download Raido</h4> */}
        {/* <DownloadButtons isHeader /> */}
        {isAbout && <br />}
        <h4>Follow Us On</h4>
        <SocialMedia variant={isAbout && 2} />
      </div>
    </Col>
  );
};

const Footer = () => {
  const PRODUCTS = [
    {
      id: "MANGO",
      name: "Find a Job",
    },
    {
      id: "LYCHEE",
      name: "Post a Job",
    },
    {
      id: "STRAWBERRY",
      name: "Jobthalam Careers ",
    },
    {
      id: "services",
      name: "More Services ",
    },
  ];

  return (
    <footer className={styles.footer}>
      <CustomContainer>
        <Row>
          <Col xs={12} md={6} lg={5}>
            <div className={`${styles.sec} ${styles.sec1}`}>
              <Image src="/logo/logo_f_v.png" alt="logo" width={250} className={styles.logo}/>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum
                ad quos ratione asperiores qui molestiae itaque amet et
                reiciendis magni vel incidunt dolor libero, inventore,
                voluptatibus deserunt doloribus optio sit?
              </p>
            </div>
          </Col>
          <Col xs={6} md={6} lg={2}>
            <div className={`${styles.sec} ${styles.sec2}`}>
              <h4>Quick Links</h4>
              {PAGES.map((p) => {
                if (!p.isPortal) {
                  return (
                    <p key={p.name} className={styles.links}>
                      <Link href={p.href}>
                        <span>
                          <ArrowRight />
                          &nbsp;
                        </span>
                        {p.name}
                      </Link>
                    </p>
                  );
                }
              })}
            </div>
          </Col>
          <Col xs={6} md={6} lg={2}>
            <div className={`${styles.sec} ${styles.sec2}`}>
              <h4>Useful Links</h4>
              {PRODUCTS.map((p, i) => (
                <p key={p.name} className={styles.links}>
                  <Link href={`/services?t=${i}`}>
                    <span>
                      <ArrowRight />
                      &nbsp;
                    </span>
                    {p.name}
                  </Link>
                </p>
              ))}
            </div>
          </Col>

          <DownloadSection />
        </Row>
        <hr />
      </CustomContainer>
    </footer>
  );
};

export default Footer;
