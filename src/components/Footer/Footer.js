/**
 * Created by jonirrings on 16/12/27.
 */
import React from 'react';
import withStyle from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

function Footer() {
  return (
    <footer className={s.footer}>
      <span className={s.copyRight}>&copy; 2017  All rights reserved.</span>
      <span className={s.copyRight}>
        <a
          href="https://github.com/mcc108/mcno"
          target="_blank"
          rel="noopener noreferrer"
        >
                Mcno
              </a>
            &nbsp;theme by &#64;&nbsp;
            <a href="https://congm.in" target="_blank" rel="noopener noreferrer">Cong Min</a></span>
    </footer>
  );
}

export default withStyle(s)(Footer);
