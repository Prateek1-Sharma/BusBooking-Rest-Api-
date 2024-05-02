const filter = document.querySelector("#filter");

async function bookBus(event) {
    event.preventDefault();
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const busNo = document.querySelector("#bus_no");

    const bookings = {
        username: name.value,
        useremail: email.value,
        userphone: phone.value,
        userbusno: busNo.value
    };

    try {
        const response = await axios.post("https://crudcrud.com/api/ac7ab394db65468f881f179c0acce7d8/busbook", bookings);
        console.log("Booking data created:", response.data);
        await getBookings();
    } catch (error) {
        console.error("Error creating booking data:", error);
    }
}

filter.addEventListener("click", () => {
    console.log("hi");
    getBookings();
});

window.addEventListener("DOMContentLoaded", () => {
    getBookings();
});

async function getBookings() {
    try {
        const response = await axios.get("https://crudcrud.com/api/ac7ab394db65468f881f179c0acce7d8/busbook");
        const ul = document.querySelector("ul");
        ul.innerHTML = "";
        console.log("Booking data:", response.data);
        for (let i = 0; i < response.data.length; i++) {
            if (filter.value === "All") {
                showBookings(response.data[i]);
            } else {
                console.log(filter.value);
                console.log(response.data[i].userbusno);
                if (response.data[i].userbusno === filter.value) {
                    showBookings(response.data[i]);
                }
            }
        }
    } catch (error) {
        console.error("Error fetching booking data:", error);
    }
}

function showBookings(bookings) {
    const li = `<li>${bookings.username}-${bookings.useremail}-${bookings.userphone}-${bookings.userbusno}
    <button type='button' class='del-btn' onclick="delBooking('${bookings._id}')">Delete</button>
    <button type='button' class='edit-btn' onclick="editBooking(event,'${bookings._id}')">Edit</button></li>`;
    const ul = document.querySelector("ul");
    ul.innerHTML += li;
}

async function delBooking(deleteId) {
    const ul = document.querySelector("ul");
    console.log("Delete", deleteId);
    const li_to_del = event.target.parentElement;
    ul.removeChild(li_to_del);
    try {
        const response = await axios.delete(`https://crudcrud.com/api/ac7ab394db65468f881f179c0acce7d8/busbook/${deleteId}`);
        console.log("Deleted data:", response.data);
    } catch (error) {
        console.error("Error deleting booking data:", error);
    }
}

async function editBooking(event,deleteId) {
    try {
        const response = await axios.get(`https://crudcrud.com/api/ac7ab394db65468f881f179c0acce7d8/busbook/${deleteId}`);
        const bookData = response.data;
        const name = document.querySelector("#name");
        const email = document.querySelector("#email");
        const phone = document.querySelector("#phone");
        const busNo = document.querySelector("#bus_no");

        name.value = bookData.username;
        email.value = bookData.useremail;
        phone.value = bookData.userphone;
        busNo.value = bookData.userbusno;
    } catch (error) {
        console.error("Error fetching booking data for editing:", error);
    }
    
    const ul = document.querySelector("ul");
    const li_to_del = event.target.parentElement;
    ul.removeChild(li_to_del);

    try {
        const response = await axios.delete(`https://crudcrud.com/api/ac7ab394db65468f881f179c0acce7d8/busbook/${deleteId}`);
        console.log("Deleted data:", response.data);
    } catch (error) {
        console.error("Error deleting booking data:", error);
    }
}
