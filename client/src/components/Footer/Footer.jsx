import React from 'react';
import classes from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint hic odit voluptate impedit dolore sequi quidem labore laudantium suscipit itaque distinctio, accusamus inventore provident expedita ipsam consectetur veritatis unde maxime sit? Voluptas facilis molestias vero.</p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone: +123 456 7890</span>
          <span>Youtube: GetBackOutThere</span>
          <span>Facebook: GetBackOutThereEvents</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>United States</span>
          <span>Country: United States</span>
          <span>Current Location: Delaware</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer