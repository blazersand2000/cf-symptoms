import { ref } from 'vue';

export default function useHttp() {
async function request(method: 'GET' | 'POST', url: string, body = null) {
    const data = ref();
    const error = ref();

    try {
      const options = body
        ? {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }
        : { method };

      const response = await fetch(url, options);
      if (response.ok) {
         data.value = await response.json();
      } else {
         error.value = new Error(`${response.status} ${response.statusText}`);
      } 
    } catch (err) {
      error.value = (err as Error).message;
    }

    return { data, error };
  }

  function get(url: string) {
    return request('GET', url);
  }

  function post(url: string, body: any) {
    return request('POST', url, body);
  }

  return { get, post };
}