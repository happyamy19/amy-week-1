const base64Prefix = "data:image/png;base64, ";

function y1k3s() {
  let name1 = document.getElementById("name1").value;
  if(name1 != ""){
    getCatPhoto(name1)
    }
}

function getCatPhoto(name1) {
    try{
        let url = "https://amybitcamp.azurewebsites.net/api/twocatz";
      fetch(url, {
        headers: {
          name1: name1,
          name2: name1,
          name3: name1,
          name4: name1
        }
      })
.then(response => {
        return response.json()
      })
      .then(data => {
        console.log(name1)
        document.getElementById("image1").src  = base64Prefix + data.cat1
document.getElementById("image2").src  = base64Prefix + data.cat2
document.getElementById("image3").src  = base64Prefix + data.cat3
document.getElementById("image4").src  = base64Prefix + data.cat4
        });
    }
      catch(err){
        alert(err);
      }
    } 


// function y1k3s() {
//     let name1 = document.getElementById("name1").value;
//     let endpoint1 = getCatPhoto(name1) + name1;
//     const base64Prefix = "data:image/png;base64, ";
//     if(name1 != ""){
//         document.getElementById("image1").src = base64Prefix + endpoint1; // call to the api
//         
//     }

//     let name2 = document.getElementById("name2").value;
//     let endpoint2 = getCatPhoto(name2) + name2;
//     if(name2 != ""){
//         document.getElementById("image2").src = base64Prefix + endpoint2; // call to the api
//         
//     }

//     let name3 = document.getElementById("name3").value;
//     let endpoint3 = getCatPhoto(name3) + name3;
//     if(name3 != ""){
//         document.getElementById("image3").src = base64Prefix + endpoint3; // call to the api
//         
//     }

//     let name4 = document.getElementById("name4").value;
//     let endpoint4 = getCatPhoto(name4) + name4;
//     if(name4 != ""){
//         document.getElementById("image4").src = base64Prefix + endpoint4; // call to the api
//         
//     }
// }

// function getCatPhoto(name) {
//     try{
//         let url = "https://amybitcamp.azurewebsites.net/api/twocatz";
//       fetch(url, {
//         headers: {
//           "name": name
//         }
//       })
//       .then(response => {
//         return response.json()
//       })
//       .then(data => {
//         console.log(data);
//         });
//     }
//       catch(err){
//         alert(err);
//       }
//     } 




// // paste
// // let name2 = document.getElementById("name2").value;
// //     let endpoint2 = getCatPhoto(name2) + name2;
// //     if(name2 != ""){
// //         document.getElementById("image2").src = base64Prefix + endpoint2; // call to the api
// //         
// //     }

// //     let name3 = document.getElementById("name3").value;
// //     let endpoint3 = getCatPhoto(name3) + name3;
// //     if(name3 != ""){
// //         document.getElementById("image3").src = base64Prefix + endpoint3; // call to the api
// //         
// //     }

// //     let name4 = document.getElementById("name4").value;
// //     let endpoint4 = getCatPhoto(name4) + name4;
// //     if(name4 != ""){
// //         document.getElementById("image4").src = base64Prefix + endpoint4; // call to the api
// //     }