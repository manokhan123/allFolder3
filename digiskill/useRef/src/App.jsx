//===== input focus  directly  =======//

// import React, { useEffect, useRef } from "react";

// function App() {
//   const inputRef = useRef();

//   useEffect(() => {
//     inputRef.current.focus();
//   }, []);

//   return (
//     <>
//       <input ref={inputRef} placeholder="Enter name" />
//     </>
//   );
// }

// export default App;

// ==== input focus through button  ====//

// import React, { useRef } from "react";

// function App() {
//   const inputRef = useRef();

//   const handleFocus = () => {
//     inputRef.current.focus();
//   };

//   return (
//     <>
//       <input ref={inputRef} placeholder="Enter name" />
//       <button onClick={handleFocus}>Focus</button>
//     </>
//   );
// }

// export default App;

// ===  Re render ko rokna ========//

// import React, { useRef } from "react";

// function App() {
//   const countRef = useRef(0);

//   const increase = () => {
//     countRef.current = countRef.current + 1;

//     console.log(countRef.current);
//   };

//   return (
//     <>
//       <h1>Open Console</h1>
//       <button onClick={increase}>Increase</button>
//     </>
//   );
// }

// export default App;

// ==== previous value remember =====//

import React, { useEffect, useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const previousCount = useRef();

  useEffect(() => {
    previousCount.current = count;
  }, [count]);

  return (
    <>
      <h1>Current: {count}</h1>

      <h2>Previous: {previousCount.current}</h2>

      <button onClick={() => setCount(count + 1)}>Increase</button>
    </>
  );
}

export default App;
