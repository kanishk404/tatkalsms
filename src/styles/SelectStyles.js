export const CountrSelectStyle ={
    control: (base, state) => ({
      ...base,
      background: "#242424",
      border:"none",
      borderRadius:"10px",
      outline:"none",
      width:"90%",
      height:"3rem",
      
      cursor:"pointer",
      marginBottom :"40px"
    
    
    }),
    menuList:(base,state)=>({
      ...base,
     
           background: "#242424",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#DEBA85', 
      fontSize:"1.2rem"
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
      }
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
        color:"#FFE6C0"
      }),
    control: (base, state) => ({
      ...base,
      background: "#242424",
      border:"none",
      borderRadius:"10px",
      outline:"none",
      width:"90%",
      height:"3rem",
      color:"white",
      cursor:"pointer",
     
     
    
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
      fontSize:"1rem"
    }),
   
    option:(base,state)=>({
      width:"100%",
      cursor:"pointer",
      padding:"20px",
      border:"none",
      boderRadius:"10px",
      
      ":hover":{
        backgroundColor:'#433218',
      }
    }),
    input: (provided) => ({
      ...provided,
      caretColor: '#FFE6C0',
      fontSize:"20px",
      color:"#FFE6C0",
      paddingLeft:"10px"
    }),
    
  
  }