import { BASE_URL } from "./api";

  interface ICreateOrder{
    customer:{
        name:string;
        email:string;
    }
    items:any[];
  }

  export  const createOrder = async (data:ICreateOrder) => {
    debugger
    const options: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data) 
      };
    try {
      const response = await fetch(`${BASE_URL}/orders`, options);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();  
      return result;
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error); 
      throw error;
    }
  };
  
  