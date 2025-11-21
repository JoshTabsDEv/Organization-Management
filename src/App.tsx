// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App









//......................
//sample, calculator
// import { useState } from "react";
// import "./App.css";

// function App() {
//   const [num1, setNum1] = useState<string>("");
//   const [num2, setNum2] = useState<string>("");
//   const [operation, setOperation] = useState<string>("add");
//   const [result, setResult] = useState<number | null>(null);

//   const calculate = () => {
//     const n1 = Number(num1);
//     const n2 = Number(num2);

//     if (isNaN(n1) || isNaN(n2)) {
//       alert("Please enter valid numbers");
//       return;
//     }

//     let res = 0;
//     switch (operation) {
//       case "add":
//         res = n1 + n2;
//         break;
//       case "subtract":
//         res = n1 - n2;
//         break;
//       case "multiply":
//         res = n1 * n2;
//         break;
//       case "divide":
//         if (n2 === 0) {
//           alert("Cannot divide by zero");
//           return;
//         }
//         res = n1 / n2;
//         break;
//       default:
//         return;
//     }
//     setResult(res);
//   };

//   return (
//     <>
//       <h1>Simple Calculator</h1>

//       <input
//         type="number"
//         value={num1}
//         onChange={(e) => setNum1(e.target.value)}
//         placeholder="First Number"
//         style={{ padding: "8px", marginRight: "10px" }}
//       />

//       <input
//         type="number"
//         value={num2}
//         onChange={(e) => setNum2(e.target.value)}
//         placeholder="Second Number"
//         style={{ padding: "8px", marginRight: "10px" }}
//       />    

//       <select
//         value={operation}
//         onChange={(e) => setOperation(e.target.value)}
//         style={{ padding: "8px", marginRight: "10px" }}
//       >
//         <option value="add">Add</option>
//         <option value="subtract">Subtract</option>
//         <option value="multiply">Multiply</option>
//         <option value="divide">Divide</option>
//       </select>

//       <button onClick={calculate} style={{ padding: "8px 12px" }}>
//         Calculate
//       </button>

//       {result !== null && (
//         <div style={{ marginTop: "20px" }}>
//           <p>
//             <strong>Result:</strong> {result}
//           </p>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;















//login
// import react, { useState } from "react";
// import "./App.css";

// // --- Types ---
// type User = {
//   username: string;
//   password: string;
// };

// type LoginResult = {
//   success: boolean;
//   message: string;
// };

// function App() {
//   // --- State ---
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loginResult, setLoginResult] = useState<LoginResult | null>(null);

//   // --- Function ---
//   function login(user: User): LoginResult {
//     if (user.username === "admin" && user.password === "1234") {
//       return { success: true, message: `Welcome, ${user.username}!` };
//     } else {
//       return { success: false, message: "Invalid username or password!" };
//     }
//   }

//   const handleLogin = () => {
//     const user: User = { username, password };
//     const result = login(user);
//     setLoginResult(result);
//   };

//   const handleLogout = () => {
//     setUsername("");
//     setPassword("");
//     setLoginResult(null);
//   };

//   // --- UI ---
//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       {!loginResult?.success ? (
//         <>
//           <h1>Login</h1>

//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             style={{ padding: "8px", marginBottom: "10px", display: "block", margin: "auto" }}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ padding: "8px", marginBottom: "10px", display: "block", margin: "auto" }}
//           />

//           <button onClick={handleLogin} style={{ padding: "8px 16px" }}>
//             Login
//           </button>

//           {loginResult && !loginResult.success && (
//             <p style={{ color: "red", marginTop: "10px" }}>{loginResult.message}</p>
//           )}
//         </>
//       ) : (
//         <>
//           <h1>{loginResult.message}</h1>
//           <button onClick={handleLogout} style={{ padding: "8px 16px" }}>
//             Logout
//           </button>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

















// .......
// Calculator tiwasaaaa...........mana
// import React, { useState } from "react";
// import "./App.css";

// function App() {
//   // --- State ---
//   const [num1, setNum1] = useState<string>("");
//   const [num2, setNum2] = useState<string>("");
//   const [result1, setResult1] = useState<CalcResult | null>(null);
//   const [operation, setOperation] = useState<Operation>("add");

//   // --- Types ---
//   type Addition = "add";
//   type Subtraction = "subtract";
//   type Multiplication = "multiply";
//   type Division = "divide";

//   type Operation = Addition | Subtraction | Multiplication | Division;

//   type CalcResult = {
//     n1: number;
//     n2: number;
//     operation: Operation;
//     value: number;
//   };

//   // --- Function ---
//   function calculate(n1: number, n2: number, op: Operation): CalcResult {
//     let value: number;

//     switch (op) {
//       case "add":
//         value = n1 + n2;
//         break;
//       case "subtract":
//         value = n1 - n2;
//         break;
//       case "multiply":
//         value = n1 * n2;
//         break;
//       case "divide":
//         if (n2 === 0) {
//           alert("Division by zero not allowed!");
//           value = NaN;
//         } else {
//           value = n1 / n2;
//         }
//         break;
//       default:
//         value = NaN;
//     }

//     return { n1, n2, operation: op, value };
//   }

//   // --- Handle Button ---
//   const handleCheck = () => {
//     const number1 = Number(num1);
//     const number2 = Number(num2);

//     if (isNaN(number1) || isNaN(number2)) {
//       alert("Please enter valid numbers");
//       return;
//     }

//     setResult1(calculate(number1, number2, operation));
//   };

//   // --- UI ---
//   return (
//     <>
//       <h1>Calculator</h1>

//       <input
//         type="number"
//         value={num1}
//         onChange={(e) => setNum1(e.target.value)}
//         placeholder="First number"
//         style={{ padding: "8px", marginRight: "10px" }}
//       />

//       <input
//         type="number"
//         value={num2}
//         onChange={(e) => setNum2(e.target.value)}
//         placeholder="Second number"
//         style={{ padding: "8px", marginRight: "10px" }}
//       />

//       <select
//         value={operation}
//         onChange={(e) =>
//           setOperation(e.target.value as Operation)
//         }
//         style={{ padding: "8px", marginRight: "10px" }}
//       >
//         <option value="add">Add</option>
//         <option value="subtract">Subtract</option>
//         <option value="multiply">Multiply</option>
//         <option value="divide">Divide</option>
//       </select>

//       <br />
//       <br />

//       <button onClick={handleCheck} style={{ padding: "8px 12px" }}>
//         Calculate
//       </button>

//       {result1 && (
//         <div style={{ marginTop: "20px" }}>
//           <p>
//             <strong>First Number:</strong> {result1.n1}
//           </p>
//           <p>
//             <strong>Second Number:</strong> {result1.n2}
//           </p>
//           <p>
//             <strong>Operation:</strong> {result1.operation}
//           </p>
//           <p>
//             <strong>Result:</strong>{" "}
//             {isNaN(result1.value) ? "Error" : result1.value}
//           </p>
//         </div>
//       )}
//     </>
//   );
// }

// export default App;
















//.........................
//Custom Type
// import "./App.css";


// function App(){

//     let number:  number = 90;
    
//     let aira: { //object
//         name: String,
//         age: number
//     } = {name: "Wence", age: 68};

//     type aranzado = "Positive" | "Negative"; //custom type
//     let isNegative: aranzado = "Negative";
//     let isPositive: aranzado = "Positive";
//     let result: string = "";

//     if(isPositive == "Positive"){
//         result = "It's Positive";
//     }else {
//         result = "It's Negative";
//     }
 

// return(

//     <>
//     {number} , {aira.name} , {aira.age} , {result}
//     </>
// )
// }

// export default App;










//............
//Custom Type with intersection using specified types
// import  react, { useState } from "react";
// import "./App.css";


// function App(){

//     let number:  number = 90;
    
//     let aira: { //object
//         name: String,
//         age: number
//     } = {name: "Wence", age: 68};

//     type aranzado = "Positive" | "Negative"; //custom type
//     let isNegative: aranzado = "Negative";
//     let isPositive: aranzado = "Positive";
//     let result: string = "";

//     if(isPositive == "Positive"){
//         result = "It's Positive";
//     }else {
//         result = "It's Negative";
//     }
 
//     //intersection using specified types

//     type Person = {name: string, age: number};
//     type Employee = {id: number, department: string};
//     type employeeDetails  = Person & Employee;
//     const display: employeeDetails = {
//         name: "Wence", age: 10, id: 2025, department: ""
//     }

// //unknown
// // let value: unknown = "Jing";

// // if(typeof value === "string"){
// //     console.log("Correct");
// // }else {
// //     console.log("Incorrect")
// // }

// //never
// // function throwError(): never {
// //     throw new Error("An Error Occured!")
// // }


// //walay type ni nga fucntion because of void type that means walay types 
// function hello(message: string): void {
//     console.log(message);
// }
// console.log(hello("hi"));


// const [inputValue, setInputValue] = useState<string>("");
// const [result1, setResult1] = useState<AgeResult | null>(null); 



// type AgeCategory = "senior" | "adult";
// type AgeResult = {
//     age: number;
//     category: AgeCategory;
// };



// function identifyAge(age: number): AgeResult { 
//     let category:  AgeCategory = age >= 60 ? "senior" : "adult";
//     return {age, category};
// }

// const handleCheck = () => {
//     const age = Number(inputValue);
//      if (isNaN(age) || age < 0) {
//         alert("Please enter a valid age");
//         return;
//      }
//      setResult1(identifyAge(age));
// };


// return(

//     <>
//         <h1>Age Verifier</h1>
//         <input
//         type="number"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Enter Age "
//         style={{padding: "8px", marginRight: "10px", }}
//         />

//     <button onClick={handleCheck} style={{padding: "8px 12px"}}>Check</button>


//     {result?.age} {result?.category} 
//     {/* iftypescriptni, sa ubos kay sa react */}

//     {result1 && (
//         <div style={{marginTop: "20px"}}>
//             <p>
//                 <strong>Age:</strong> {result1.age}
//             </p>
//             <p>
//                 <strong>Category:</strong> {result1.category}
//             </p>
//         </div>
//     )}


//     {/* {number} , {aira.name} , {aira.age} , {result} , {display.name}, {display.age} <br/> */}
//     {/* {throwError()}  */}
//     {/* if kuhaon ni mawala tong name age etc. = throwError */}
//     </>

    
//     )
// }

// export default App;















// import react, { useState } from "react";
// import "./App.css";

// // --- Types ---
// type User = {
//   username: string;
//   password: string;
// };

// type LoginResult = {
//   success: boolean;
//   message: string;
// };


//  type Addition = "add";
//   type Subtraction = "subtract";
//   type Multiplication = "multiply";
//   type Division = "divide";

//   type Operation = Addition | Subtraction | Multiplication | Division;

//   type CalcResult = {
//     n1: number;
//     n2: number;
//     operation: Operation;
//     value: number;
//   };

// function App() {
//   // --- State ---
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loginResult, setLoginResult] = useState<LoginResult | null>(null);

//   const [num1, setNum1] = useState<string>("");
//   const [num2, setNum2] = useState<string>("");
//   const [result1, setResult1] = useState<CalcResult | null>(null);
//   const [operation, setOperation] = useState<Operation>("add");

  


//   // --- Function ---
//   function login(user: User): LoginResult {
//     if (user.username === "admin" && user.password === "1234") {
//       return { success: true, message: `Welcome, ${user.username}!` };
//     } else {
//       return { success: false, message: "Invalid username or password!" };
//     }
//   }

//   const handleLogin = () => {
//     const user: User = { username, password };
//     const result = login(user);
//     setLoginResult(result);
//   };

//   const handleLogout = () => {
//     setUsername("");
//     setPassword("");
//     setLoginResult(null);
//   };


//   function calculate(n1: number, n2: number, op: Operation): CalcResult {
//     let value: number;

//     switch (op) {
//       case "add":
//         value = n1 + n2;
//         break;
//       case "subtract":
//         value = n1 - n2;
//         break;
//       case "multiply":
//         value = n1 * n2;
//         break;
//       case "divide":
//         if (n2 === 0) {
//           alert("Division by zero not allowed!");
//           value = NaN;
//         } else {
//           value = n1 / n2;
//         }
//         break;
//       default:
//         value = NaN;
//     }

//     return { n1, n2, operation: op, value };
//   }

//   // --- Handle Button ---
//   const handleCheck = () => {
//     const number1 = Number(num1);
//     const number2 = Number(num2);

//     if (isNaN(number1) || isNaN(number2)) {
//       alert("Please enter valid numbers");
//       return;
//     }

//     setResult1(calculate(number1, number2, operation));
//   };


//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       {!loginResult?.success ? (
//         <>
//           <h1>Login</h1>

//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             style={{ padding: "8px", marginBottom: "10px", display: "block", margin: "auto" }}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ padding: "8px", marginBottom: "10px", display: "block", margin: "auto" }}
//           />

//           <button onClick={handleLogin} style={{ padding: "8px 16px" }}>
//             Login
//           </button>

//           {loginResult && !loginResult.success && (
//             <p style={{ color: "red", marginTop: "10px" }}>{loginResult.message}</p>
//           )}

//         </>
//       ) : (
//         <>

         

//           <h1>{loginResult.message}</h1>
//           {/* <button onClick={handleLogout} style={{ padding: "8px 16px" }}>
//             Logout
//           </button> */}


//            <h1>Calculator</h1>

//       <input
//         type="number"
//         value={num1}
//         onChange={(e) => setNum1(e.target.value)}
//         placeholder="First number"
//         style={{ padding: "8px", marginRight: "10px" }}
//       />

//       <input
//         type="number"
//         value={num2}
//         onChange={(e) => setNum2(e.target.value)}
//         placeholder="Second number"
//         style={{ padding: "8px", marginRight: "10px" }}
//       />

//       <select
//         value={operation}
//         onChange={(e) =>
//           setOperation(e.target.value as Operation)
//         }
//         style={{ padding: "8px", marginRight: "10px" }}
//       >
//         <option value="add">Add</option>
//         <option value="subtract">Subtract</option>
//         <option value="multiply">Multiply</option>
//         <option value="divide">Divide</option>
//       </select>

//       <br />
//       <br />

//       <button onClick={handleCheck} style={{ padding: "8px 12px" }}>
//         Calculate
//       </button>

//       {result1 && (
//         <div style={{ marginTop: "20px" }}>
//           <p>
//             <strong>First Number:</strong> {result1.n1}
//           </p>
//           <p>
//             <strong>Second Number:</strong> {result1.n2}
//           </p>
//           <p>
//             <strong>Operation:</strong> {result1.operation}
//           </p>
//           <p>
//             <strong>Result:</strong>{" "}
//             {isNaN(result1.value) ? "Error" : result1.value}
//           </p>
//         </div>
//       )}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;




   








//Grade Identifier w/ color
// import  react, { useState } from "react";
// import "./App.css";


// function App(){

  


// const [inputValue, setInputValue] = useState<string>("");
// const [result1, setResult1] = useState<GradeResult | null>(null); 




// type GradeCategory = "fail" | "needs improvement" | "satisfactory" | "excellent" | "not valid";
// type Colors = "red"| "blue" | "green" | "yellow" | "no color";


// type GradeResult = {
//   grade : number ;
//   color : Colors;
//   category : GradeCategory;
// };

// function identifyGrade (grade: number) : GradeResult{
//   let category : GradeCategory = 

//   grade <= 75 ? "fail" : 
//   grade <= 85 ? "needs improvement" :
//   grade <= 95 ? "satisfactory" :
//   grade <= 100 ? "excellent" : "not valid" ;


// let color : Colors = 
//   grade <= 75 ? "red" : 
//   grade <= 85 ? "blue" :
//   grade <= 95 ? "green" :
//   grade <= 100 ? "yellow" : "no color" ;


//   return {grade, color, category};

// }


// const handleCheck = () => {
//   const grade = Number(inputValue);
//   if(isNaN(grade) || grade <0 ){
//     alert("Please Enter a Valid Number!");
//     return;
// }
// setResult1(identifyGrade(grade));

// };


// return(

//     <>
//         <h1> Grade Verifier</h1>
//         <input
//         type="number"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Enter Grade "
//         style={{padding: "8px", marginRight: "10px", }}
//         />

//     <button onClick={handleCheck} style={{padding: "8px 12px"}}>Check</button>


//     {result1?.grade} {result1?.category} 
//     {/* iftypescriptni, sa ubos kay sa react */}

//     {result1 && (
//         <div style={{marginTop: "20px"}}>
//             <p>
//                 <strong>Grade:</strong> {result1.grade}
//             </p>
//             <p>
             
//                 <strong>Category:</strong>
               
//             </p>
//             <p style={{color: result1.color}}>
//                 {result1.category}
//             </p>
//         </div>
//     )}

//     </>

    
//     )
// }

// export default App;








//Prelim





// import React, { useState } from "react";
// import "./App.css";

// function App() {
  
//   const [height1, setHeight] = useState<string>("");
//   const [weight1, setWeight] = useState<string>("");
//   const [result1, setResult1] = useState<bmiresult | null>(null);


//   type bmicategory = "Underweight" | "Normal Weight" | "Overweight" | "Obese" | "Not Valid" ;
//   type colors = "red" | "green" | "orange" | "yellow" | "no color";
//   type tambag = "Eat Nutritious Food" | "Good job! Keep your BMI Normal" | "Apply Proper Diet" | "Apply Proper Diet and Exercise" | "X" ;


//   type bmiresult = {
//     height : number;
//     weight : number;
//     color : colors;
//     bmi : number;
//     category : bmicategory;
//     advice : tambag;

//   }



// // function calculatebmi (height: number, weight  :number) : bmiresult{
// //jusq formula c hic = h / 100;
// //c bmi = w / (hic * hic)

// function calculatebmi (height: number, weight : number) : bmiresult {
//   const bmi = (weight * 10000) / (height * height);

//   // const heightInMeters = height / 1000;
//   // const bmi = weight * 10000 / (heightInMeters * heightInMeters);


// //............

// //     if (bmi < 18.5) category = "Underweight";
// //     else if (bmi >= 18.5 && bmi < 24.9) category = "Normal Weight";
// //     else if (bmi >= 25 && bmi < 29.9) category = "Overweight";
// //     else if (bmi >= 30) category = "Obese";
// //     else category = "Invalid";

// //     return { bmi, category};
// //   }

// //...............


//  let category : bmicategory = 
//   bmi <= 18.5 ? "Underweight" : 
//   bmi >= 18.5 && bmi <= 24.9 ? "Normal Weight" :
//   bmi >= 25 && bmi <= 29.9 ? "Overweight" :
//   bmi >= 30 ? "Obese" : "Not Valid" ;


// let color : colors = 
//   bmi <= 18.5 ? "red" : 
//   bmi >=18.5 && bmi <= 24.9 ? "green" :
//   bmi >=25 && bmi <= 29.9 ? "orange" :
//   bmi >= 30 ? "yellow" : "no color" ;


//   let advice : tambag = 
//     bmi <= 18.5 ? "Eat Nutritious Food" : 
//     bmi >=18.5 && bmi <= 24.9 ? "Good job! Keep your BMI Normal" :
//     bmi >=25 && bmi <= 29.9 ? "Apply Proper Diet" :
//     bmi >= 30 ? "Apply Proper Diet and Exercise" : "X" ;


  
// return {height, weight, bmi : Number(bmi.toFixed(2)),category, color, advice };

//     }




// //............
// // const handleCheck = () => {
// //     const height2 = Number(height1);
// //     const weight2 = Number(weight1);


// //     if (bmi < 18.5) category = "Underweight";
// //     else if (bmi >= 18.5 && bmi < 24.9) category = "Healthy";
// //     else if (bmi >= 25 && bmi < 29.9) category = "Overweight";
// //     else if (bmi >= 30) category = "Obese";
// //     else category = "Invalid";

// //     return { weight, height, age, bmi, category };
// //   }



  
//   // const handleCheck = () => {
//   //   const height = Number(height1);
//   //   const weight = Number(weight1);
  

//   //   if (isNaN(weight) || (height) || ) {
//   //     alert("Please enter valid number");
//   //     return;
//   //   }

//   //   setResult1(calculatebmi(weight, height));
//   // };


// //....................


//   const handleLogout = () => {
//     setHeight("");
//     setWeight("");
//     setResult1(null);
//   };




// const handleCheck = () => {
//   const height = Number(height1);
//   const weight = Number(weight1);


//   if(height <= 0 || weight <= 0 ){
//     alert ("Please enter a valid height and weight!");
//     return;
//   }

// setResult1(calculatebmi(height, weight));

// };





//   return (
//     <>
//       <h1>BMI</h1>

//       <input
//         type="number"
//         value={height1}
//         onChange={(e) => setHeight(e.target.value)}
//         placeholder="Height"
//         style={{ padding: "8px", marginRight: "10px" }}
//       />

//       <input
//         type="number"
//         value={weight1}
//         onChange={(e) => setWeight(e.target.value)}
//         placeholder="Weight"
//         style={{ padding: "8px", marginRight: "10px" }}
//       />

//       <br />
//       <br />

//       <button onClick={handleCheck} style={{ padding: "8px 12px" , marginRight : "15px"}}>
//         Calculate
//       </button>



//       <button onClick={handleLogout} style={{ padding: "8px 16px" }}>
//              Clear
//            </button>

//       {result1 && (
//         <div style={{ marginTop: "20px" }}>
//           {/* <p>
//             <strong>Weight:</strong> {result1. weight}
//           </p>
//           <p> 
//             <strong>Height:</strong> {result1.height}
//           </p> */}
//           <p>
//             <strong>Your BMI:</strong> {result1.bmi}
//           </p>
//           <strong>Status:</strong>
//           <p style={{color: result1.color}}>
//             {result1.category}
//             <br></br>
//           </p>
//           <p>Tip:  {result1.advice}</p>


          
//         </div>

        
//       )}
//     </>
//   );
// }

// export default App;















//notes midterm
 //dropdown

// import React, { useState } from "react";

// export default function Calculator() {
//   const [num1, setNum1] = useState<number>(0);
//   const [num2, setNum2] = useState<number>(0);
//   const [operation, setOperation] = useState<string>("add");
//   const [result, setResult] = useState<string>("");

//   // math operations
//   const add = (x: number, y: number) => x + y;
//   const subtract = (x: number, y: number) => x - y;
//   const multiply = (x: number, y: number) => x * y;
//   const divide = (x: number, y: number) => (y !== 0 ? x / y : NaN);

//   const handleCalculate = () => {
//     let res: number;

//     switch (operation) {
//       case "add":
//         res = add(num1, num2);
//         break;
//       case "subtract":
//         res = subtract(num1, num2);
//         break;
//       case "multiply":
//         res = multiply(num1, num2);
//         break;
//       case "divide":
//         res = num2 !== 0 ? divide(num1, num2) : NaN;
//         break;
//       default:
//         res = NaN;
//     }

//     setResult(isNaN(res) ? "Error: Invalid operation" : `Result: ${res}`);
//   };

//   return (
//     <>
//       <h1>Simple Calculator</h1>
//       <div>
//         <label htmlFor="num1">Enter Number 1:</label>
//         <input
//           type="number"
//           value={num1}
//           onChange={(e) => setNum1(Number(e.target.value))}
//         />

//         <br />
//         <br />

//         <label htmlFor="num2">Enter Number 2:</label>
//         <input
//           type="number"
//           value={num2}
//           onChange={(e) => setNum2(Number(e.target.value))}
//         />

//         <br />
//         <br />

//         <label htmlFor="operation">Choose Operation: </label>
//         <select
//           id="operation"
//           value={operation}
//           onChange={(e) => setOperation(e.target.value)}
//         >
//           <option value="add">Add</option>
//           <option value="subtract">Subtract</option>
//           <option value="multiply">Multiply</option>
//           <option value="divide">Divide</option>
//         </select>

//         <br />
//         <br />

//         <button onClick={handleCalculate}>Calculate</button>

//         <br />
//         <br />

//         <h2>{result}</h2>
//       </div>
//     </>
//   );
// }





//notes gyapon midterm
//di dropdown
// import React, { useState } from "react";

// export default function Calculator() {
//   const [num1, setNum1] = useState<number>(0);
//   const [num2, setNum2] = useState<number>(0);
//   const [result, setResult] = useState<string>("");

//   // math operations
//   const add = (x: number, y: number) => x + y;
//   const subtract = (x: number, y: number) => x - y;
//   const multiply = (x: number, y: number) => x * y;
//   const divide = (x: number, y: number) => (y !== 0 ? x / y : NaN);

//   // handlers
//   const handleAdd = () => setResult(`Result: ${add(num1, num2)}`);
//   const handleSubtract = () => setResult(`Result: ${subtract(num1, num2)}`);
//   const handleMultiply = () => setResult(`Result: ${multiply(num1, num2)}`);
//   const handleDivide = () =>
//     setResult(num2 !== 0 ? `Result: ${divide(num1, num2)}` : "Error: Divide by 0");

//   return (
//     <>
//       <h1>Simple Calculator</h1>
//       <div>
//         <label htmlFor="num1">Enter Number 1:</label>
//         <input
//           type="number"
//           value={num1}
//           onChange={(e) => setNum1(Number(e.target.value))}
//         />

//         <br />
//         <br />

//         <label htmlFor="num2">Enter Number 2:</label>
//         <input
//           type="number"
//           value={num2}
//           onChange={(e) => setNum2(Number(e.target.value))}
//         />

//         <br />
//         <br />

//         <button onClick={handleAdd}>Add</button>
//         <button onClick={handleSubtract}>Subtract</button>
//         <button onClick={handleMultiply}>Multiply</button>
//         <button onClick={handleDivide}>Divide</button>

//         <br />
//         <br />

//         <h2>{result}</h2>
//       </div>
//     </>
//   );
// }























// //Midterm niiiiii start

// import React, {useState } from 'react';
// import './App.css';

// export default function App() {

//   //Optional Parameter
//   interface Book {
//     title : string,
//     author: string,
//     year?: number;
//   }
//  //? = optional properties

//   const validBook: Book = {
//     title: "Typescript Learning",
//     author: "Best Shop",
//     // year: 2023
//   };


//   //Readonly properties
//   interface Person {
//     readonly age: number,
//     readonly status: string
//   }


//   //kung kuhaon ng readonly sa age , dili na mo error ag age (still ma change gyapon iyang output)
// const PersonDetails: Person = {
//   age: 10,
//   status: "Taken"
// }


// //Function Types

// interface MathOperation{
//   (x:number, y:number): number;
// }

// const add: MathOperation = (x,y) => x + y;
// const subtract: MathOperation = (x,y) => x - y;

// const resultAdd = add (5,5);
// const resultSubtraction = subtract (5,5);

// const[num1, setNum1] = useState<number>(0);
// const[num2, setNum2] = useState<number>(0);
// const[result, setResult] = useState<string>("");

// const handleChangeAdd = () => {
//   setResult(`Result: ${add(num1,num2)}`);

// }

// interface Animal {
//   name: string
// }
//  interface Dog extends Animal{
//   breed: string
//  }

// const details: Dog = {
//   name: "Doggo",
//   breed: "Aspin"
// }

// console.log(details)



// interface Box<T> {
//   value: T,
  
  
// }


// //pwede rani hahahahah
// // interface Box<randomword> {
// //   value: randomword,
  
  
// // }


// const stringBox: Box<string> = {
//   value: "Hello, Jandy",
  
// }

// const stringBox1:  Box<number> = {
//   value: 90,
// }


// console.log(stringBox.value)



// //type assertion,,,,in short gi override diay
// let x: unknown = 'hello';
// console.log((x as string).length)



// //const assertion
// //if naay as const = readonly, di ma modify
// //di ka affect sa run time

// // let myArray = [1,2,3] as const;
// // myArray.push(4);


// // let myArray2 = myArray;
// // myArray2.push(7);


// // let aira = {
// //   bf: "Jander",
// //   gender: "bayot"
// // } as const

// // let ans = aira.bf = "Jose";

// // let ans2 : number | string;



// function divide({dividend, divisor} : {dividend: number, divisor: number}){
//   return dividend / divisor;
// }

// function far(value: number, exponent: number = 10){
//   return value ** exponent
// }


// //rest parameter = number type array....any extra numbers passed will be collected into an array
// //reduce is an array method that processes each element in an array and “reduces” it to a single value.
// function addition(num1: number, num2: number,...rest: number[]){
//   return num1 + num2 + rest.reduce((x,y) => x + y, 0);
// }

// console.log("hehe : ",  addition(2,3))

// console.log(far(10))







// //............................

// // interface MathOperation {
// //   (x: number, y: number): number;
// // }

// // const add: MathOperation = (x, y) => x + y;
// // const subtract: MathOperation = (x, y) => x - y;

// // function divide({ dividend, divisor }: { dividend: number; divisor: number }) {
// //   return dividend / divisor;
// // }

// // function far(value: number, exponent: number = 10) {
// //   return value ** exponent;
// // }

// // function addition(num1: number, num2: number, ...rest: number[]) {
// //   return num1 + num2 + rest.reduce((x, y) => x + y, 0);
// // }

// class Calculator {
//   add = add;
//   subtract = subtract;
//   divide = divide;
//   power = far;
//   sum = addition;
// }

// // --------------------
// // Example ni
// // --------------------
// const calc = new Calculator();

// console.log("Add:", calc.add(5, 3));              // 8
// console.log("Subtract:", calc.subtract(10, 4));  // 6
// console.log("Divide:", calc.divide({ dividend: 20, divisor: 5 })); // 4
// console.log("Power:", calc.power(2, 3));         // 8
// console.log("Default Power:", calc.power(2));    // 1024 (2^10)
// console.log("Sum:", calc.sum(1, 2, 3, 4, 5));    // 15


// //......................................................



// return (


//   <>
//   {/* <h1>{PersonDetails.age = 90} {PersonDetails.status}</h1> */}

//   <h1>Sample</h1>
//   <div>
//     <label htmlFor="num1">Enter Number 1:</label>
//     <input
//       type="number"
//       value={num1}
//       onChange={(e) => setNum1(Number(e.target.value))}
//       />

//       <br></br>
      
//       <br></br>

//       <label htmlFor="num1">Enter Number 2:</label>
//     <input
//       type="number"
//       value={num2}
//       onChange={(e) => setNum2(Number(e.target.value))}
//       />

//       <br></br>
      
//       <br></br>

//       <button type='submit' onClick={handleChangeAdd}>Result</button>
//       <br></br>
     
//       <br></br>

//     {result}
    
//   </div>

//   </>
// )

// }
//difference of types and interface =  interface allow define multiple interface alteration, types do not support merging/inheritance....isearch nalang ni uy



















//..............
//notes midterm
 //dropdown

// import React, { useState } from "react";

// export default function Calculator() {
//   const [num1, setNum1] = useState<number>(0);
//   const [num2, setNum2] = useState<number>(0);
//   const [operation, setOperation] = useState<string>("add");
//   const [result, setResult] = useState<string>("");

//   // math operations
//   const add = (x: number, y: number) => x + y;
//   const subtract = (x: number, y: number) => x - y;
//   const multiply = (x: number, y: number) => x * y;
//   const divide = (x: number, y: number) => (y !== 0 ? x / y : NaN);

//   const handleCalculate = () => {
//     let res: number;

//     switch (operation) {
//       case "add":
//         res = add(num1, num2);
//         break;
//       case "subtract":
//         res = subtract(num1, num2);
//         break;
//       case "multiply":
//         res = multiply(num1, num2);
//         break;
//       case "divide":
//         res = num2 !== 0 ? divide(num1, num2) : NaN;
//         break;
//       default:
//         res = NaN;
//     }

//     setResult(isNaN(res) ? "Error: Invalid operation" : `Result: ${res}`);
//   };

//   return (
//     <>
//       <h1>Simple Calculator</h1>
//       <div>
//         <label htmlFor="num1">Enter Number 1:</label>
//         <input
//           type="number"
//           value={num1}
//           onChange={(e) => setNum1(Number(e.target.value))}
//         />

//         <br />
//         <br />

//         <label htmlFor="num2">Enter Number 2:</label>
//         <input
//           type="number"
//           value={num2}
//           onChange={(e) => setNum2(Number(e.target.value))}
//         />

//         <br />
//         <br />

//         <label htmlFor="operation">Choose Operation: </label>
//         <select
//           id="operation"
//           value={operation}
//           onChange={(e) => setOperation(e.target.value)}
//         >
//           <option value="add">Add</option>
//           <option value="subtract">Subtract</option>
//           <option value="multiply">Multiply</option>
//           <option value="divide">Divide</option>
//         </select>

//         <br />
//         <br />

//         <button onClick={handleCalculate}>Calculate</button>

//         <br />
//         <br />

//         <h2>{result}</h2>
//       </div>
//     </>
//   );
// }





//notes gyapon midterm
//di dropdown
// import React, { useState } from "react";

// export default function Calculator() {
//   const [num1, setNum1] = useState<number>(0);
//   const [num2, setNum2] = useState<number>(0);
//   const [result, setResult] = useState<string>("");

//   // math operations
//   const add = (x: number, y: number) => x + y;
//   const subtract = (x: number, y: number) => x - y;
//   const multiply = (x: number, y: number) => x * y;
//   const divide = (x: number, y: number) => (y !== 0 ? x / y : NaN);

//   // handlers
//   const handleAdd = () => setResult(`Result: ${add(num1, num2)}`);
//   const handleSubtract = () => setResult(`Result: ${subtract(num1, num2)}`);
//   const handleMultiply = () => setResult(`Result: ${multiply(num1, num2)}`);
//   const handleDivide = () =>
//     setResult(num2 !== 0 ? `Result: ${divide(num1, num2)}` : "Error: Divide by 0");

//   return (
//     <>
//       <h1>Simple Calculator</h1>
//       <div>
//         <label htmlFor="num1">Enter Number 1:</label>
//         <input
//           type="number"
//           value={num1}
//           onChange={(e) => setNum1(Number(e.target.value))}
//         />

//         <br />
//         <br />

//         <label htmlFor="num2">Enter Number 2:</label>
//         <input
//           type="number"
//           value={num2}
//           onChange={(e) => setNum2(Number(e.target.value))}
//         />

//         <br />
//         <br />

//         <button onClick={handleAdd}>Add</button>
//         <button onClick={handleSubtract}>Subtract</button>
//         <button onClick={handleMultiply}>Multiply</button>
//         <button onClick={handleDivide}>Divide</button>

//         <br />
//         <br />

//         <h2>{result}</h2>
//       </div>
//     </>
//   );
// }







//const Calculate=()=<{
// let res: number;
//switch(operation){
//case "add":
//res = add(num1,num2);
//}
//}



  // const AdminDashboard = ({ user }: { user: User }) => (
   // <AdminDashboard user={user} />


















//kani activity


// import React, { useState } from "react";
// import './App.css';


// interface What {
//   name: string;
//   type: "admin" | "guest";
// }


// interface MathOperation {
//   (x: number, y: number): number;
// }

// export default function App() {

//   const [name, setName] = useState<string>("");
//   const [type, setType] = useState<"admin" | "guest">("guest");
//   const [user, setUser] = useState<What | null>(null);


//   const [num1, setNum1] = useState<number>(0);
//   const [num2, setNum2] = useState<number>(0);
//   const [result, setResult] = useState<string>("");

  
// const handleLogin =()=> {
//   if(name.trim() !== ""){
//     setUser({name,type});
//   }else{
//     alert ("Please enter a name!");
//   }
// };

// const handleLogout =()=>{
//   setUser(null);
//   setName("");
//   setType("guest");
//   setType("admin");
// };



// // const add: MathOperation = (x, y) => x + y;
// // // const subtract: MathOperation = (x, y) => x - y;

// // const add = (x:number, y: number) => x + y;
// // const subtract = (x:number, y:number) => x - y;
// // const multiply = (x:number, y: number) => x * y;
// // const divide = (x:number, y: number) => (y !== 0 ? x / y : NaN);


// const add:MathOperation = (x,y) => x+y;
// const subtract:MathOperation = (x,y) => x-y;
// const multiply:MathOperation = (x,y) => x*y;
// const divide:MathOperation = (x,y) => (y !== 0 ? x/y : NaN);


// const Addni =()=> (setResult(`Result: ${add(num1,num2)}`));
// const Subtractni =()=> (setResult(`Result: ${subtract(num1,num2)}`));
// const Multiplyni =()=> (setResult(`Result: ${multiply(num1,num2)}`));
// const Divideni =()=> (setResult(num2 !== 0? `Result: ${divide(num1,num2)}` : "Result: Wrong ka et!"));

// const handleClear=()=>{
//   setNum1(0);
//   setNum2(0);
// }


//   return (

//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       {!user ? (
//         <div>
//           <h2 style={{color: "yellow"}}>Login</h2>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <br />
//           <br></br>
//           <select
//             value={type}
//             onChange={(e) => setType(e.target.value as "admin" | "guest")}
//           >

//             <option value="admin">Admin</option>
//             <option value="guest">Guest</option>
//           </select>
//           <br /><br></br>
//           <button onClick={handleLogin}>Login</button>
//         </div>
//       ) : user.type === "admin" ? (
       
//         <div>
//          <h1>Simple Calculator</h1>

//         <label htmlFor="num1">Enter Number 1:</label>
//         <input
//           type="number"
//           value={num1}
//           onChange={(e) => setNum1((Number(e.target.value)as unknown) as number)}
//         />
       

//         <br />
//         <br />

//         <label htmlFor="num2">Enter Number 2:</label>
//         <input
//           type="number"
//           value={num2}
//           onChange={(e) =>  setNum2((Number(e.target.value) as unknown) as number)}
//         />

//         <br />
//         <br />

//         <button onClick={Addni}>Add</button>
//         <button onClick={Subtractni}>Subtract</button>
//         <button onClick={Multiplyni}>Multiply</button>
//         <button onClick={Divideni}>Divide</button>
//         <br></br><br></br>
//         <button onClick={handleClear}>Clear</button>


//         <br />
//         <br />

//         <h2>{result}</h2>


//          <button onClick={handleLogout}>Logout</button>
//       </div>


//       ) : user.type === "guest" ? (

//          <div>
//           <h2>Hello, {user.name} </h2>
//           <p>You are logged in as: {user.type}</p>
//           <h3 style={{ color: "white" }}>You are not allowed here</h3>

//           <button onClick={handleLogout}>Logout</button>
//         </div>
        
//       ) : null
//       }
//     </div>
//   );
// }








//...............................


//another example
// import { useState } from "react";
// import './App.css';

// const words = ["dog", "cat", "banana", "carrot", "elephant", "robot"];

// function App() {
//   const [lastLetter, setLastLetter] = useState("t");

//   const filteredWords = words.filter((w) =>
//     w.toLowerCase().endsWith(lastLetter.toLowerCase())
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h3>Word Ending Filter</h3>

//       <p>
//         Ends with:{" "}
//         <input
//           type="text"
//           maxLength={1}
//           value={lastLetter}
//           onChange={(e) => setLastLetter(e.target.value)}
//         />
//       </p>

//       <h4>Words:</h4>
//       {filteredWords.map((w, i) => (
//         <p key={i}>{w}</p>
//       ))}
//     </div>
//   );
// }

// export default App;


//w = parameter in each function = is a placeholder variable that holds in each function



//...............................





//another example of filter

// import { useState } from "react";
// import './App.css';

// const names = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank"];

// function App() {
//   const [letter, setLetter] = useState("A");

//   const filteredNames = names.filter((n) =>
//     n.toLowerCase().startsWith(letter.toLowerCase())
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h3>Alphabet Filter</h3>

//       <select value={letter} onChange={(e) => setLetter(e.target.value)}>
//         <option value="A">A</option>
//         <option value="B">B</option>
//         <option value="C">C</option>
//         <option value="D">D</option>
//       </select>

//       <h4>Names:</h4>
//       {filteredNames.length > 0 ? (
//         filteredNames.map((n, i) => <p key={i}>{n}</p>)
//       ) : (
//         <p>No names found.</p>
//       )}
//     </div>
//   );
// }

// export default App;








//...............................




//another example of filter

// import { useState } from "react";
// import './App.css';

// interface Event {
//   id: number;
//   title: string;
//   date: string; // ISO format
// }

// const events: Event[] = [
//   { id: 1, title: "Conference", date: "2025-09-20" },
//   { id: 2, title: "Workshop", date: "2025-09-15" },
//   { id: 3, title: "Hackathon", date: "2025-10-01" },
// ];

// function App() {
//   const [showUpcoming, setShowUpcoming] = useState(true);

//   const today = new Date();
//   const filteredEvents = events.filter((e) => {
//     const eventDate = new Date(e.date);
//     return showUpcoming ? eventDate >= today : eventDate < today;
//   });

//   return (
//     <div style={{ padding: "20px" }}>
//       <h3>Event Date Filter</h3>

//       <button onClick={() => setShowUpcoming(true)}>Upcoming Events</button>
//       <button onClick={() => setShowUpcoming(false)}>Past Events</button>

//       <h4>Events:</h4>
//       {filteredEvents.map((e) => (
//         <p key={e.id}>
//           {e.title} — {e.date}
//         </p>
//       ))}
//     </div>
//   );
// }

// export default App;





//...............................



//another example of filter 2

// import { useState } from "react";
// import './App.css';

// interface Item {
//   id: number;
//   name: string;
//   category: string;
// }

// const items: Item[] = [
//   { id: 1, name: "Apple", category: "Fruit" },
//   { id: 2, name: "Banana", category: "Fruit" },
//   { id: 3, name: "Carrot", category: "Vegetable" },
//   { id: 4, name: "Lettuce", category: "Vegetable" },
//   { id: 5, name: "Chicken", category: "Meat" },
// ];

// function App() {
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category) // remove if already selected
//         : [...prev, category] // add if not selected
//     );
//   };

//   const filteredItems = items.filter(
//     (item) =>
//       selectedCategories.length === 0 || selectedCategories.includes(item.category)
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h3>Category Filter</h3>

//       <label>
//         <input
//           type="checkbox"
//           onChange={() => handleCategoryChange("Fruit")}
//         />{" "}
//         Fruit
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           onChange={() => handleCategoryChange("Vegetable")}
//         />{" "}
//         Vegetable
//       </label>
//       <label>
//         <input
//           type="checkbox"
//           onChange={() => handleCategoryChange("Meat")}
//         />{" "}
//         Meat
//       </label>

//       <h4>Filtered Items:</h4>
//       {filteredItems.map((item) => (
//         <p key={item.id}>
//           {item.name} ({item.category})
//         </p>
//       ))}
//     </div>
//   );
// }

// export default App;



//...............................




//another example for filter

// import { useState } from "react";
//import './App.css';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// const products: Product[] = [
//   { id: 1, name: "Laptop", price: 55000 },
//   { id: 2, name: "Phone", price: 25000 },
//   { id: 3, name: "Headphones", price: 2000 },
//   { id: 4, name: "Keyboard", price: 1500 },
//   { id: 5, name: "Monitor", price: 8000 },
// ];

// function App() {
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(100000);

//   const filteredProducts = products.filter(
//     (p) => p.price >= minPrice && p.price <= maxPrice
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h3>Price Range Filter</h3>

//       <p>
//         Min Price:{" "}
//         <input
//           type="number"
//           value={minPrice}
//           onChange={(e) => setMinPrice(Number(e.target.value))}
//         />
//       </p>

//       <p>
//         Max Price:{" "}
//         <input
//           type="number"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(Number(e.target.value))}
//         />
//       </p>

//       <h4>Filtered Products:</h4>
//       {filteredProducts.length > 0 ? (
//         filteredProducts.map((p) => (
//           <p key={p.id}>
//             {p.name} - ₱{p.price}
//           </p>
//         ))
//       ) : (
//         <p>No products found in this range.</p>
//       )}
//     </div>
//   );
// }

// export default App;


//.......................




// import { useState } from "react";
// import './App.css';

// // Define the Item interface with a method
// interface Item {
//   id: number;
//   name: string;
//   category: string;
//   getLabel: () => string;
// }

// // Factory function to create an item
// const createItem = (id: number, name: string, category: string): Item => {
//   return {
//     id,
//     name,
//     category,
//     getLabel: () => `${name} (${category})`,
//   };
// };

// export default function App() {
//   const [items, setItems] = useState<Item[]>([
//     createItem(1, "Laptop", "Electronics"),
//     createItem(2, "Shirt", "Clothing"),
//     createItem(3, "Phone", "Electronics"),
//   ]);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [newName, setNewName] = useState("");
//   const [newCategory, setNewCategory] = useState("Electronics");

//   // Add function
//   const addItem = () => {
//     if (!newName.trim()) return;
//     const newItem = createItem(items.length + 1, newName, newCategory);
//     setItems([...items, newItem]);
//     setNewName("");
//   };

//   // Filter + Search
//   const filteredItems = items.filter((item) => {
//     const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
//     const matchesFilter = filter === "All" || item.category === filter;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h2>Search, Filter & Add Items</h2>

//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search items..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ marginRight: "10px" }}
//       />

//       {/* Filter Dropdown */}
//       <select value={filter} onChange={(e) => setFilter(e.target.value)}>
//         <option value="All">All</option>
//         <option value="Electronics">Electronics</option>
//         <option value="Clothing">Clothing</option>
//       </select>

//       <h3>Add Item</h3>
//       <input
//         type="text"
//         placeholder="Item name"
//         value={newName}
//         onChange={(e) => setNewName(e.target.value)}
//         style={{ marginRight: "10px" }}
//       />
//       <select
//         value={newCategory}
//         onChange={(e) => setNewCategory(e.target.value)}
//         style={{ marginRight: "10px" }}
//       >
//         <option value="Electronics">Electronics</option>
//         <option value="Clothing">Clothing</option>
//       </select>
//       <button onClick={addItem}>Add</button>

//       <h3>Results</h3>
//       <ul>
//         {filteredItems.map((item) => (
//           <li key={item.id}>{item.getLabel()}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }



//...............................



//   };




  // const handleInputChange = (id: number, value: string) => {
  //   setInputs((prev) => ({ ...prev, [id]: value }));
  // };



  
  // const handleUpdateDescription = (id: number) => {
  //   const updatedescription = inputs[id];
  //   if (!updatedescription?.trim()) 
  //     return;
  //   setItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, description: updatedescription } : item
  //     )
  //   );
  //   setInputs((prev) => ({ ...prev, [id]: "" }));
  // };



  // const naur = (item: Item) => {
  //   if (!query.trim()) 
  //     return false;
  //   return item.name.toLowerCase().includes(query.toLowerCase());
  // };









//Pre-assessment code
// import { useState } from "react";
// import './App.css';

// interface Item {
//   id: number;
//   name: string;
//   category: string;
//   getLabel: () => string;
// }
// const createItem = (id: number, name: string, category: string
// ): Item => {
//   return {
//     id,
//     name,
//     category,
//     getLabel: () => `${name} is a ${category}`,
//   };
// };

// const items: Item[] = [
//   createItem(1, "Apple", "Fruit"),
//   createItem(2, "Banana", "Fruit"),
//   createItem(3, "Carrot", "Vegetable"),
// ];

// function App() {
//   const [query, setQuery] = useState("");

//   const filtered = items.filter((item) =>
//     item.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h3>Map & Filter with Interface Method</h3>




//       <p>
//         Search:{" "}
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button onClick={() => setQuery("")}>Clear</button>
//       </p>

//       {filtered.map((item) => (
//         <p key={item.id}>{item.getLabel()}</p>




//       ))}
//     </div>
//   );
// }

// export default App;











//Midterm Exam




// const [originalItems] = useState<Item[]>(initialItems);


// const handleGoBack = (id: number) => {
//     const original = originalItems.find((item) => item.id === id);
//     if (!original) return;
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, description: original.description } : item
//       )
//     );














// import { useState } from "react";
// import "./App.css";

// interface Item {
//   id: number;
//   name: string;
//   category: string;
//   description?: string;
//   getLabel: () => string;
// }

// const createItem = (
//   id: number,
//   name: string,
//   category: string,
//   description?: string
// ): Item => {
//   return {
//     id,
//     name,
//     category,
//     description,
//     getLabel: () => `${category}`,
//   };
// };

// const initialItems: Item[] = [
//   createItem(1, "Apple", "fruit","  A red fruit"),
//   createItem(2, "Banana","fruit" ,"A yellow fruit"),
//   createItem(3, "Carrot", "vegetable" ,"An orange vegetable"),
// ];



// function App() {
  
//   const [query, setQuery] = useState("");
//   const [items, setItems] = useState<Item[]>(initialItems);
//   const [inputs, setInputs] = useState<{ [key: number]: string }>({});



//   const filtered = items.filter((item) =>
//     item.name.toLowerCase().includes(query.toLowerCase())
//   );




//   const handleInputChange = (id: number, value: string) => {
//     setInputs ((prev) => ({...prev, [id]: value}));

//   };




//   const handleUpdateDescription = (id:number) => {
//     const updatedescription = inputs[id];
//     if(!updatedescription?.trim())
//       return;
//     setItems ((prev)=>
//       prev.map ((item)=> 
//         item.id === id ? {...item, description: updatedescription}: item
//   )
//     );
//     setInputs((prev)=> ({...prev, [id]: ""}));
//   };




//   const naur = (item: Item) => {
//     if(!query.trim())
//       return;
//     return item.name.toLowerCase().includes(query.toLowerCase());
//   };





//   return (
//     <div style={{ padding: "20px"}}>
//       <h3>Midterm Exam | Search and update item using array</h3>

//       <p>
//         Search:{" "}
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button onClick={() => setQuery("")}>Clear</button>
//       </p>

//       {filtered.map((item) => (
//         <div key={item.id} style={{ marginBottom: "15px"}}>
        
//           <p>
//             {item.name}
//           </p>

//           {/* <p>{item.description ?? item.getLabel()}</p> */}
//            {/* <p>{item.getLabel()}</p> */}
//           <p>{item.description}</p>
         
        
//           <input
//             type="text"
//             placeholder="Enter new description"
//             value={inputs[item.id] ?? ""}
//             disabled={!naur(item)}
//             onChange={(e) => handleInputChange(item.id, e.target.value)}
//           />
//           <button onClick={() => handleUpdateDescription(item.id)} 
//           disabled={!naur(item)}
//           >
//             Update
//           </button>
         



//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;




























//semi-final




// import React, { useState } from "react";
// import './App.css'
// type User = {
//   username: string;
//   password: string;
// };

// const users: User[] = [
//   { username: "admin", password: "1234" },
//   { username: "guest", password: "guest" },
// ];

// export default function LoginForm() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = () => {
//     const user = users.find(
//       (u) => u.username === username && u.password === password
//     );
//     if (user) {
//       setMessage(`✅ Welcome, ${username}!`);
//     } else {
//       setMessage("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="login">
//       <h2>Login</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />
//       <br />
//       <button onClick={handleLogin}>Login</button>
//       <p>{message}</p>
//     </div>
//   );
// }







//app.tsx
//semifinal - ref start

// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login";
// import Dashboard from './pages/dashboard'
// import Register from "./register";

// export default function App() {
//   const fullname = localStorage.getItem("fullname");

//   return (

//     <Routes>
//       <Route
//         path = "/"
//         element = {fullname ? <Navigate to = "dashboard"/> : <Login />}
//       />
//       <Route
//         path = "dashboard"
//         element = {fullname ? <Dashboard /> : <Navigate to = "/" />}
//       />
//     </Routes>
//   )
// }


//app.tsx
//ref end







//kani




// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login";
// import Dashboard from "./pages/dashboard";
// import Register from "./pages/register"; 
// import GuestDashboard from "./pages/guestdashboard"; 

// export default function App() {
//   const fullname = localStorage.getItem("fullname");

//   return (
//     <Routes>
//       {/* Default route — if user is logged in, go to Dashboard; otherwise, go to Login */}
//       <Route
//         path="/"
//         element={fullname ? <Navigate to="dashboard" /> : <Login />}
//       />

//       {/* Registration Page */}
//       <Route path="register" element={<Register />} />

//       {/* Dashboard — protected route */}
//       <Route
//         path="dashboard"
//         element={fullname ? <Dashboard /> : <Navigate to="/" />}


//       />
//     </Routes>
//   );
// }



//kani  












// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login";
// import Dashboard from "./pages/dashboard"; // for admin
// import GuestDashboard from "./pages/guestdashboard"; // for student
// import Register from "./pages/register";

// export default function App() {
//   const fullname = localStorage.getItem("fullname");
//   const role = localStorage.getItem("role");

//   return (
//     <Routes>
//       {/* Default route — if logged in, redirect based on role */}
//       <Route
//         path="/"
//         element={
//           fullname ? (
//             role === "admin" ? (
//               <Navigate to="/dashboard" />
//             ) : (
//               <Navigate to="/guestdashboard" />
//             )
//           ) : (
//             <Login />
//           )
//         }
//       />

//       {/* Registration Page */}
//       <Route path="register" element={<Register />} />

//       {/* Admin Dashboard */}
//       <Route
//         path="dashboard"
//         element={
//           fullname && role === "admin" ? <Dashboard /> : <Navigate to="/" />
//         }
//       />

//       {/* Student/Guest Dashboard */}
//       <Route
//         path="guestdashboard"
//         element={
//           fullname && role === "student" ? (
//             <GuestDashboard />
//           ) : (
//             <Navigate to="/" />
//           )
//         }
//       />
//     </Routes>
//   );
// }










import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./login";
import Dashboard from "./Pages/dashboard";
import GuestDashboard from "./Pages/guestdashboard";
import Register from "./Pages/register";

export default function App() {
  const fullname = localStorage.getItem("fullname");
  const role = localStorage.getItem("role");

  return (
    <Routes>
      <Route
        path="/"
        element={
          fullname ? (
            role === "admin" ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/guestdashboard" replace />
            )
          ) : (
            <Login />
          )
        }
      />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/guestdashboard" element={<GuestDashboard/>} />
        <Route path="/register" element={<Register />} />
    </Routes>
  );
}





































