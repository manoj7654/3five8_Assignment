const bookingForm = document.getElementById('bookingForm');
const startTimeInput = document.getElementById('startTime');
const endTimeInput = document.getElementById('endTime');
const amount=document.getElementById("amount")

//  for finding time difference
 const timeDifference=(startTime,endTime)=>{
    const [hour1,minutes1]=startTime.split(":").map(Number)
    const [hour2,minutes2]=endTime.split(":").map(Number);
  
    // finding total minutes
    let totalMinutes1=hour1*60+minutes1;
    let totalMinutes2=hour2*60+minutes2
  
    // total difference in minutes
    let totalDifferenceInMinutes=totalMinutes2-totalMinutes1
  

    if(totalDifferenceInMinutes<0){
      totalDifferenceInMinutes+=24*60
    }
  // Convert the time difference to hours
  const differenceInHours = totalDifferenceInMinutes / 60;
  
  return differenceInHours;
 }

// update amount
const updateAmount=()=>{
    const facility = document.getElementById("facility").value;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
  
  let Amount=0;
      //  for clubhouse finding amount
      if(facility=="Clubhouse"){
        if(startTime>="10:00"&& endTime<="16:00"){
          Amount+=timeDifference(startTime,endTime)*100
        }else if(startTime>="16:00"&& endTime<="22:00"){
          Amount+=timeDifference(startTime,endTime)*500
          
        }
      }
  
  //  for tennis court finding amount
      if(facility=="Tennis Court"){
          Amount+=timeDifference(startTime,endTime)*50
      }
  amount.value=Amount.toString()
}

// Listen for changes in the start time and end time inputs
startTimeInput.addEventListener('change', updateAmount);
endTimeInput.addEventListener('change', updateAmount);

   bookingForm.addEventListener('submit', async (e) => {
   e.preventDefault();

   const facility=document.getElementById("facility").value;
   const date=document.getElementById("date").value;
   const startTime=startTimeInput.value;
   const endTime=endTimeInput.value;

// for loader
const submitBtn = document.getElementById("submitBtn");
submitBtn.classList.add("loading");

setTimeout(() => {
  // Once the process is complete, remove the loading class
  submitBtn.classList.remove("loading");
  
  
}, 2000); // Simulating a 2-second delay. Replace this with your actual async process.

  let obj={
    facility,
    date,
    startTime,
    endTime
  }

  const result = await fetch('https://facilitybooking-rxhl.onrender.com/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  const data = await result.json();
  amount.value=data.Amount
  if (result.ok) {
    alert(`Booking successful. Amount: Rs. ${data.Amount}`);
  } else {
    alert(data.message);
  }
});