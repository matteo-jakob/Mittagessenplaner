// const loginButton = document.getElementById("submit-btn");
// loginButton.addEventListener("click", checkLogin);
// // CHANGE BUTTON TO CORRECT ELEMENT

// function checkLogin(ev) {
//   ev.preventDefault();

//   const name = document.getElementById("login-name").value;
//   const pw = document.getElementById("login-pw").value;
//   var payload = {
//     username: name,
//     password: pw,
//   };
//   console.log("Client sendet body zu server: " + JSON.stringify(payload));

//   fetch("http://localhost:3069/login", {
//     method: "POST",
//     headers: { "Content-type": "application/json" },
//     body: JSON.stringify(payload),
//   })
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.err == false && response.login == true) {
//         alert("You successfully logged in");
//         var tokenJSON = response.token;

//         /* =========== JWS Authorization =========== */

//         console.log("initializing auth...");
//         var payloadAuth = {
//           token: tokenJSON,
//         };
//         console.log("Sending token: " + tokenJSON);
//         fetch("http://localhost:3069/auth", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payloadAuth),
//         })
//           .then((response) => response.json())
//           .then((response) => {
//             if (!response.err) {
//               enableFeatures();
//             } else {
//               alert(
//                 "Auth response Error: " + response.err + " msg: " + response.msg
//               );
//             }
//           });
//       } else if (response.err) {
//         alert(`There was an error\n
//         ${response.msg}`);
//       } else {
//         alert("Failed to Log in");
//       }
//     });
// }

// function enableFeatures() {}
