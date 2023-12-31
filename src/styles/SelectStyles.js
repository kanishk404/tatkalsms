

export const CountrSelectStyle ={
    control: (base, state) => ({
      ...base,
      background: "#242424",
      border:"none",
      borderRadius:"10px",
      outline:"none",
      width:"90%",
      height:"2.1rem",
      
      cursor:"pointer",
      marginBottom :"40px",
    
      "@media screen and (max-width: 1500px)": {
        height:"2rem",
    },
    "@media screen and (max-width: 1000px)": {
      height:"1.8rem",
  },
    }),
    menuList:(base,state)=>({
      ...base,
     
           background: "#242424",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#DEBA85', 
      "@media screen and (max-width: 1500px)": {
        fontSize:"16px",
    },
      "@media screen and (max-width: 1000px)": {
        fontSize:"14px",
    },
    }),
    menu: (base) => ({
      ...base,
      width: "90%", 
    }),
    input: (provided) => ({
      ...provided,
      caretColor: 'transparent',
    }),
    option:(base,state)=>({
      width:"100%",
      cursor:"pointer",
      padding:"20px",
      border:"none",
      boderRadius:"10px",
      ":hover":{
        backgroundColor:'#433218',
      },
      "@media screen and (max-width: 1500px)": {
        fontSize:"16px",
        padding:"12px"
    },
      "@media screen and (max-width: 1000px)": {
        fontSize:"14px",
        padding:"9px"
    },
      
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '20px',
        color:"#FFE6C0"
      }),
    
  
  }


  export const ServiceSelectStyles = {

    menu: (base) => ({
      ...base,
      width: "90%", 
     
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '16px',
        color:"#FFE6C0",
        "@media screen and (max-width: 1500px)": {
          fontSize:"14px",
      },
        "@media screen and (max-width: 1000px)": {
          fontSize:"12px",
      },
      }),
    control: (base, state) => ({
      ...base,
      background: "#242424",
      border:"none",
      borderRadius:"10px",
      outline:"none",
      width:"90%",
      height:"2.8rem",
      color:"white",
      cursor:"pointer",
     
      "@media screen and (max-width: 1500px)": {
        height:"2rem"
    },
      "@media screen and (max-width: 1000px)": {
        height:"1.8rem",
    },
    
    }),
    menuList:(base,state)=>({
      ...base,
     
      background: "#242424",
      '&::-webkit-scrollbar': {
        width: '0.4em',
      },
      '&::-webkit-scrollbar-track': {
        background: 'transparent',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'transparent',
      },
      overflowY: 'scroll',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#DEBA85', 
      fontSize:"1rem",
      "@media screen and (max-width: 1500px)": {
        fontSize:"16px",
    },
      "@media screen and (max-width: 1000px)": {
        fontSize:"14px",
    },
    }),
   
    option:(base,state)=>({
      width:"100%",
      cursor:"pointer",
      padding:"20px",
      border:"none",
      boderRadius:"10px",
      
      ":hover":{
        backgroundColor:'#433218',
      },
      "@media screen and (max-width: 1500px)": {
        fontSize:"16px",
        padding:"12px"
    },
      "@media screen and (max-width: 1000px)": {
        fontSize:"14px",
        padding:"9px"
    },
    }),
    input: (provided) => ({
      ...provided,
      caretColor: '#FFE6C0',
      fontSize:"20px",
      color:"#FFE6C0",
      paddingLeft:"10px"
    }),
    
  
  }