import Constants from "../Constants";

class ApiCaller {
  private static async callApi(url: string, options: RequestOptions = { method: 'GET' }): Promise<any> {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }





  static async getData(endPoint: string) {

    const options: RequestOptions = {
      method: 'GET',
      headers: Constants.getHeader()
    };

    const url = Constants.BASE_URL + endPoint

    try {
      const data = await ApiCaller.callApi(url, options);
      console.log('Data:', data);
      return data;
      
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  static async postData() {
    const payload = { /* Your POST data here */ };
    const options: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await ApiCaller.callApi('https://api.example.com/post', options);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

}



// Define the types used
type HttpMethod = 'GET' | 'POST';

interface RequestOptions {
  method: HttpMethod;
  headers?: HeadersInit;
  body?: BodyInit;
}


export default ApiCaller;