"use client";
import style from './card.module.css';

export default function Card({ children } : any) {

  return (
    <section className={style.mainHeaderContainer}>
      {children}
    </section>
  );
}
