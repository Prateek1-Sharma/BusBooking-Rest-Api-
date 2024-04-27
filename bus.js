const filter=document.querySelector("#filter");
function bookBus(event){
    event.preventDefault();
    const name=document.querySelector("#name");
    const email=document.querySelector("#email");
    const phone=document.querySelector("#phone");
    const busNo=document.querySelector("#bus_no");
    
    
 let bookings={
    username:name.value,
    useremail:email.value,
    userphone:phone.value,
    userbusno:busNo.value
 }
 axios.post("https://crudcrud.com/api/9ef65960e62946a48711346ae4077fff/busbook",bookings)
.then(response => {
    console.log("booking data created:", response.data);
    getBookings();
  })
.catch(error => {
    console.error("Error creating booking data:", error);

  });

}

filter.addEventListener("click",()=>{
    console.log("hi");
    getBookings();
})

window.addEventListener("DOMContentLoaded",()=>{

    getBookings()
  })
  function getBookings(){
    axios.get("https://crudcrud.com/api/9ef65960e62946a48711346ae4077fff/busbook")
    .then(response => {
      const ul=document.querySelector("ul");
      ul.innerHTML="";
        console.log("book data created:", response.data);
        for(let i=0;i<response.data.length;i++){
            if(filter.value=="All")
            {
                showBookings(response.data[i])
            }
        else
        {
            console.log(filter.value);
            console.log(response.data[i].userbusno);
        if(response.data[i].userbusno==filter.value)  
        showBookings(response.data[i])
        }
    }
      
      })
    .catch(error => {
        console.error("Error creating book data:", error);
      
      });
    }


    function showBookings(bookings)
{
    const li=`<li>${bookings.username}-${bookings.useremail}-${bookings.userphone}-${bookings.userbusno}
    <button type='button' class='del-btn' onclick="delBooking('${bookings._id}')">Delete</button>
    <button type='button'class='edit-btn' onclick="editBooking('${bookings._id}')">Edit</button></li>`;
    const ul=document.querySelector("ul");
    ul.innerHTML+=li;
}


function delBooking(deleteId){
    const ul=document.querySelector("ul");
    console.log("dele",deleteId);
    const li_to_del=event.target.parentElement;
    ul.removeChild(li_to_del); 
    axios.delete(`https://crudcrud.com/api/9ef65960e62946a48711346ae4077fff/busbook/${deleteId}`)
    .then((response) => {
        console.log("Deleted data :", response.data);
      })
    .catch((error) => {
        console.error("Error creating blog data:", error);
      
      });
    }

function editBooking(deleteId){
  axios.get(`https://crudcrud.com/api/9ef65960e62946a48711346ae4077fff/busbook/${deleteId}`)
    .then(response => {
        const bookData = response.data;
        // Populate input fields with existing blog data
        const name=document.querySelector("#name");
        const email=document.querySelector("#email");
        const phone=document.querySelector("#phone");
        const busNo=document.querySelector("#bus_no");
        
        name.value = bookData.username;
        email.value = bookData.useremail;
        phone.value = bookData.userphone;
        busNo.value =bookData.userbusno
        // Now you can edit the data and submit the changes
        // (You need to implement the editing functionality separately)
    })
    .catch(error => {
        console.error("Error fetching blog data for editing:", error);
    });
    const ul=document.querySelector("ul");
    const li_to_del=event.target.parentElement;
    ul.removeChild(li_to_del); 
    axios.delete(`https://crudcrud.com/api/9ef65960e62946a48711346ae4077fff/busbook/${deleteId}`)
    .then((response) => {
      console.log("book data created:", response.data);
    
    })
  .catch((error) => {
      console.error("Error creating book data:", error);
    
    });
      }

