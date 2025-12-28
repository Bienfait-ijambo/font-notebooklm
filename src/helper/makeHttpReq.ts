import { apiUrl } from "@/config/get-env"

export type HttpVerbType = 'GET' | 'POST' | 'PUT' | 'DELETE'
// export function makeHttpReq<T>(verb: HttpVerbType, endpoint: string, input?: T) {

//     return new Promise(async (resolve, reject) => {

//         try {
//             const res = await fetch(`${apiUrl}/api/v1/${endpoint}`, {
//                 method: verb,
//                 credentials: "include",
//                 headers: {
//                     accept: "application/json",
//                      "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(input)
//             })
//             if (!res.ok) throw new Error('failed to process this request')
//             const data = res.json()
//             resolve(data)
//         } catch (error) {

//             reject(error)

//         }


//     })
// }

export async function makeHttpReq<T>(verb: HttpVerbType, endpoint: string, input?: T) {
  try {
    const res = await fetch(`${apiUrl}/api/v1/${endpoint}`, {
      method: verb,
      credentials: "include",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: input ? JSON.stringify(input) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
      // Reject with the actual error from server
      return Promise.reject(data);
    }

    return data;
  } catch (error: any) {
    // If fetch itself fails (network error), reject with the error object
    return Promise.reject({
      message: error.message || "Network error",
      stack: error.stack,
    });
  }
}
