import React, { useEffect, useState } from 'react';
import './index.css'; // Import your CSS file here
import StarRating from './StarRating';

const Review = () => {
  

  const [status, setStatus] = useState("");
  const [acceptarr,setAccept] = useState([]);

  const handleStatus = (e) => {
    e.preventDefault();
    const taskId = parseInt(e.target.name)
    const status = e.target.value
    let flag = 1;
    acceptarr.map((ele) => {
      if(ele.taskId === taskId){
        ele.status = status
        flag = 0;
      }
    })
    if(flag){
      setAccept([...acceptarr, {taskId, status}])
    }
    console.log(acceptarr)
  }
  
  useEffect(() => {
    localStorage.setItem('acceptarr',JSON.stringify(acceptarr))
  },[acceptarr])

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
  }, []); 

  const [assi, setAssi] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('assignment'));
    setAssi(items || []); 
  }, []);

  return (
    <div className="container4 cal">
      <div className='content'>
        <div className="left-section">
        <div className="question-statement">
        <h2>Review Assignments</h2>
        <div className="reviewtable">
          <table>
            <thead>
              <tr>
                <th>Task Id</th>
                <th>Mentee Id</th>
                <th>Mentee Name</th>
                <th>Submitted file</th>
              
              
              </tr>
            </thead>
            <tbody>
              {assi.map((ele) => (
                <tr key={ele.taskId}>
                  <td>{ele.taskId}</td>
                  <td>{ele.title}</td>
                  <td>{ele.menteeId}</td>
                  <td>{ele.file}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      <form action="/submit" method="post" className='FeedbackForm'>
      <div className="right-section">
                    <div className="turn-in-assignment">
                    <h2>Give Feedback</h2>
                    
                    <div className='starsgazzing'>
                    <StarRating/>
                    </div>
                  
                             <div className="form-group">
                                <label htmlFor="name">TaskId:</label>
                                <input type="text" id="TaskId" name="TaskId" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">MenteeId:</label>
                                <input type="text" id="MenteeId" name="MenteeId" required />
                            </div>
                            <div className="form-group add-guests">
                                <textarea id="reviews" name="reviews" rows="4" cols="50" placeholder="Please share your feedback for the assignment in brief"></textarea>
                            </div>


                
                       
                    </div>
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
    </div>
    
  );
}

export default Review;
