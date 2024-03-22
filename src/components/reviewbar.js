import React, { useEffect } from 'react';
import './index.css'; // Import your CSS file here

const Review = () => {
  useEffect(() => {
    let ratings = [];

    const stars = document.querySelectorAll(".ratings span");
    const products = document.querySelectorAll(".ratings");

    for(let star of stars){
      star.addEventListener("click", function(){
        let children = star.parentElement.children;
        for(let child of children){
          if(child.getAttribute("data-clicked")){
            return false;
          }
        }
        
        this.setAttribute("data-clicked","true");
        let rating = this.dataset.rating;
        let productId = this.parentElement.dataset.productid;
        let data = {
          "rating": rating,
          "product-id": productId,
        };
        ratings.push(data);
        localStorage.setItem("rating", JSON.stringify(ratings));
      });
    }

    if(localStorage.getItem("rating")){
      ratings = JSON.parse(localStorage.getItem("rating"));
      for(let rating of ratings){
        for(let product of products){
          if(product.dataset.productid === rating["product-id"]){
            let reverse = Array.from(product.children).reverse();
            let index = parseInt(rating["rating"]) - 1;
            reverse[index].setAttribute("data-clicked", "true");
          }
        }
      }
    }
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div className="container6 review">
      <h1>Assignment Feedback</h1>
      <form action="/submit" method="post">
        <div className="message-container">
          <div className="grader">
            <input type="radio" name="grades" className="circle" placeholder="1" value="1"/>1
            <input type="radio" name="grades" className="circle" placeholder="2" value="2"/>2
            <input type="radio" name="grades" className="circle" placeholder="3" value="3"/>3
            <input type="radio" name="grades" className="circle" placeholder="4" value="4"/>4
            <input type="radio" name="grades" className="circle" placeholder="5" value="5"/>5
            <input type="radio" name="grades" className="circle" placeholder="6" value="6"/>6
            <input type="radio" name="grades" className="circle" placeholder="7" value="7"/>7
            <input type="radio" name="grades" className="circle" placeholder="8" value="8"/>8
            <input type="radio" name="grades" className="circle" placeholder="9" value="9"/>9
            <input type="radio" name="grades" className="circle" placeholder="10" value="10"/>10
          </div>

          <h4>Remarks for the student</h4>
          <input type="text" name="remark" id="remarks" placeholder="Enter your remarks"/>
          <input type="submit" id="submit"/>
        </div>
      </form>
      <div className="modal" id="myModal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>File is successfully uploaded</p>
          <img src="tenor.gif" alt="success"/>
        </div>
      </div>
    </div>
  );
}

export default Review;
